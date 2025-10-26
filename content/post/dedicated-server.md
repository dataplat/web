---
title: "building a dedicated backup test server"
date: 2017-04-11
author: "Chrissy LeMaire"
slug: "dedicated-server"
aliases:
  - /dedicated-server/
  - /dedicated-server/index.html
categories: [announcements]
tags: [party]
draft: false
---

So, there's a [World Backup Day](http://www.worldbackupday.com/en/), but what about World Restore Day? We've all been told over and over, backups are useless if they can't be restored and verified. [Grant Fritchey](https://scarydba.com) has even yelled it at us a couple times.

<iframe width="280" height="157" src="https://www.youtube.com/embed/Ah0jabU9G8o" frameborder="0" allowfullscreen></iframe>

## Using dbatools to automate tests

dbatools makes it crazy easy to automate your backup testing, as demonstrated by [Sander Stad](http://www.sqlstad.nl/powershell/testing-your-backups-with-dbatools/), [Rob Sewell](https://sqldbawithabeard.com/2017/03/20/testing-your-sql-server-backups-the-easy-way-with-powershell-dbatools/) and [Anthony Nocentino](http://www.centiExcludeSystemLoginss.com/blog/sql/using-dbatools-for-automated-restore-and-checkdb/). It even [works on Linux](https://sqldbawithabeard.com/2017/03/27/test-your-sqlserver-backups-on-linux-with-powershell-and-dbatools/)!

In my environment, I have a server dedicated for testing SQL Server backups and use [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup). Here's how you can, too.

## First, centralize your SQL Server backups

I use and recommend Ola Hallengren's [SQL Server Maintenance Solution](https://ola.hallengren.com/) to centralize database backups. Every SQL Server in my estate backs up its databases to a write-only UNC share.

If you're required to backup locally, you can centralize your backups by automating the copy process from the SQL Servers' local disks to a network share using PowerShell's Copy-Item or robocopy. The reason this is required is because your dedicated test server must have access to the backups.

## Next, build your server

Even though I built my server in a pretty simplified manner, I still learned a couple things along the way.

#### Edition

The edition (Enterprise, Standard, Express, etc) should match the highest of edition in your estate. My initial test server was Standard edition and a number of my Enterprise backups failed to restore because they were using Enterprise features.

**Licensing**

- With regards to licensing, I recently spoke to Data Platform MVP [Joey D'Antoni](https://joeydantoni.com/) to get better clarification about required licensing. It appears that if you've got Software Assurance, creating a dedicated testing server for your backups would not require additional licenses, HOWEVER, you will have to skip the DBCC CHECKDB by specifying the **-NoCheck** parameter because CHECKDB is considered a "production offload process."

- Alternatively, the SQL Server 2016 licensing model basically says that "anything that isn't prod is free." This means that, even without Software Assurance, you can use SQL Server 2016 as your test restore server without additional license requirements. But again, CHECKDB is considered production and is not covered under this licensing model.

- Ultimately, licensing this type of server is a "[murky gray](https://www.littlekendra.com/2016/07/12/is-user-acceptance-testing-covered-under-developer-edition/#comment-1065806)" area and you should consult with your organization's licensing rep.

If you end up needing a higher edition of SQL Server, are properly licensed and the [configuration is supported](https://docs.microsoft.com/en-us/sql/database-engine/install-windows/supported-version-and-edition-upgrades), you can always [change your edition](https://blog.brankovucinec.com/2014/07/23/upgrade-from-sql-server-2014-express-to-standard-edition/).

#### Features

Remember if you've got a database with FIELSTREAM enabled, you must have FILESTREAM enabled on your test sever. Same goes for FULLTEXT indexes and other things I can't recall right now.

#### Service account

The SQL Server service account must have access to the centralized network share.

#### Disks

This was a lot of fun! I used Get-DbaDatabase to search all of my servers to easily find the largest database so that I could properly size my dedicated restore disk. I always keep a list of my SQL Servers as a variable in my $profile, so I just piped that. Check it:

```
$servers | Get-DbaDatabase | Select SqlInstance, Name, Size, Owner | Out-GridView
```

([Out-GridView](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.utility/out-gridview?f=255&MSPPError=-2147217396), or OGV, is a powerful PowerShell cmdlet that allows for easy sorting, searching and filtering.)

Searching 15 SQL Servers and 315 databases took less than 4 seconds! The size is in MB, and in this example screenshot, the largest database is BDTlog at 16GB. This includes both data and log files. In reality, my largest database was 500GB, so I created a 700GB expandable restore disk.

![sizes](https://pbs.twimg.com/media/C8e2CMKXYAA1W7R.jpg)

In my environment, I setup just one additional disk and placed both the data and logs on that disk. Test-DbaLastBackup allows you to specify different destination data and log drives, however, so you can create two additional drives instead of one if you prefer.

#### tempdb

If you're running the checks, you must also ensure you have enough space for tempdb to grow. It's possible to estimate how much space you'll need with `DBCC CHECKDB(0) WITH ESTIMATEONLY` (read more at [sqlskills.com](http://www.sqlskills.com/blogs/paul/how-does-dbcc-checkdb-with-estimateonly-work/)), but honestly, the estimation wasn't even close to accurate for me and I ran out of space. I ended up throwing an extra 50GB at tempdb, which sufficed.

## Update dbatools

So first, I literally updated Test-DbaLastBackup today, so make sure you are at least at version 0.8.946. This version is better in a variety of ways, but most importantly, it tests the entire available backup chain back to FULL and allows us to pipe in servers. **Update/Edit** It also fixes a bug from 0.8.946 that didn't calculate all the logs.

So first, run either `Update-Module -Name dbatools` (if you've installed dbatools from the Gallery) or `Update-dbatools` if you've used the installer script.

## Execute a one-liner

Next, it's time to create the script that can

1. Collect all of your SQL Server database names
2. Test your entire SQL Server estate
3. Convert your results to a [.NET DataTable](https://msdn.microsoft.com/en-us/library/system.data.datatable)
4. Write the results to a database

For my lab, I just keep a manual list of SQL Servers and all of them work with Windows authentication, so it greatly simplifies the process. Here's how I test every backup and log it to the database, all in one fell swoop.

```
$servers | Test-DbaLastBackup -Destination localhost -DataDirectory R:\ -LogDirectory R:\ | ConvertTo-DbaDataTable | Write-DbaDataTable -SqlInstance localhost -Table dbatools.dbo.lastbackuptests -AutoCreateTable
```

Let's break this command down

1. **$servers**: plain-text list of servers, though they could also be SMO server objects
2. **Test-DbaLastBackup**: performs all test restores and checkdbs on localhost. Restores both data and log files to the R:\ drive.
3. **ConvertTo-DbaDataTable**: Casts the results into a DataTable type (instead of being output to screen) so that they can be consumed by SQL Server
4. **Write-DbaDataTable**: Finally, the datatable is written to the dbatools database, to a table named **lastbackuptests**. If the table does not exist, it will be automatically created.

## The output!

Here is a screenshot of the output, which has been saved to a SQL Server database:

[![img](https://dbatools.io/wp-content/uploads/2017/04/img_58ecf0fbd28d9.png?w=800&ssl=1)](https://dbatools.io/wp-content/uploads/2017/04/img_58ecf0fbd28d9-full.png?ssl=1)

What's just so cool about this is that, in addition to the backup testing, I can also see how long a database will take to restore on a sub-optimized system, how long a CHECKDB will take and how long an entire instance would take to restore from backups.

Ultimately, it takes about 8 hours to test my entire SQL Server estate. I can check my results the next morning and rest easy knowing that my backups can be restored and the resulting data is corruption free!

## Scheduling

Test restores, like entire instance migrations, can be scheduled. Check out the post [scheduling a migration](https://dbatools.io/scheduling-a-migration/) for detailed instructions on scheduling PowerShell tasks.

You can even email yourself the results using [Send-MailMessage](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.utility/send-mailmessage). If you do go this route, ensure you assign the output of Test-DbaLastBackup to a variable so that you can use it to both write to SQL Server and email yourself ([ConvertTo-Html](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.utility/convertto-html) will probably be helpful here).

## Caveats

If you don't backup directly to centralized storage, you'll need to write your own version of Test-DbaLastBackup. [Get-DbaDbBackupHistory](https://dbatools.io/Get-DbaDbBackupHistory) -Last, [Restore-DbaDatabase](https://dbatools.io/Restore-DbaDatabase) and [Invoke-DbaQuery](https://dbatools.io/Invoke-DbaQuery) (for DBCC CHECKDB) will be helpful here.

Also, if you need to use alternative credentials to login to SQL Server, you'd need to do something like

```powershell
$credential = (Get-Credential sqladmin)
$localcredential = (Get-Credential ad\myadminacct)

foreach ($server in $servers) {
    Connect-DbaSqlServer -SqlInstance $server -SqlCredential $credential |
    Test-DbaLastBackup -Destination localhost -DataDirectory R:\ -LogDirectory R:\ -DestinationCredential $localcredential |
    ConvertTo-DbaDataTable |
    Write-DbaDataTable -SqlInstance sql2016 -Table tempdb.dbo.lastbackuptests -AutoCreateTable
}
```

## Video

Want to see [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup) in action? Check out this sample [video](https://www.youtube.com/embed/50xEuEZr6as). The output is a little outdated but you can still see how cool the whole thing is.

<iframe width="560" height="315" src="https://www.youtube.com/embed/50xEuEZr6as" frameborder="0" allowfullscreen></iframe>

## Conclusion

[Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup) simplifies one of a DBA's the most important tasks. It's also pretty fun! Impress your boss and your friends by rolling your very own dedicated testing solution.

\- Chrissy
