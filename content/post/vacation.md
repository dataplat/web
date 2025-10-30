---
title: "The Commands I Run Before Going on Vacation"
date: 2017-04-28
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "vacation"
aliases:
  - /vacation/
  - /vacation/index.html
categories: [announcements]
tags: [party]
draft: false
---

My favorite vacation ever was the time I visited Steve Jones' wardrobe. It bore a striking resemblance to Maui and even came with complimentary piña coladas.

![Image](/images/img_589659755f9a1.png)

The year was 2009. The sun was out, Colbie Caillat was on the radio and I hadn't mastered PowerShell yet, so I was left feeling frantic about the health of my SQL Server estate.

Now, though, I've got dbatools which allows me to quickly check the things that concern me most. Even with monitoring systems in place, who monitors the monitors? I want reassurance everything is as I expect.

## Before I Begin

Before I begin running these commands against every SQL Server in my organization, I get a list from my Central Management Server using [Get-DbaRegServer](https://dbatools.io/Get-DbaRegServer). This command will undergo a definite overhaul during the [1.0 makeover](https://dbatools.io/new-style/), but for now, I run the following to get a list from my **Central Management Server** on my server dedicated to SQL Server management.

Here are the servers in my Central Management server

![Image](/images/img_59026563464ff.png)

So I go and grab the instance names and add them to the variable $allservers. I actually do this in my $profile, but it works directly from the command line, of course.

```powershell
$allservers = Get-DbaRegServer -SqlInstance localhost
```

{{< powershell-console >}}
PS C:\github\dbatools> $allservers = Get-SqlRegisteredServerName -SqlInstance sql2014
PS C:\github\dbatools> $allservers
sql2000
sql2005
sql2005express\sqlexpress
sql2008
sql2008\sql2k8
sql2012
sql2014
PS C:\github\dbatools>
{{< /powershell-console >}}

Of course, $allservers can be a plain-text list of servers such as **$allservers = "sql2014","sql2016","etc"** or even a list of connected SMO servers if alternative credentials are needed. I'll get into that in the future when we introduce a few new commands that keep a local JSON database of your servers and credentials.

## Are Any Servers Running Low on Disk Space?

Next, I always try to keep at least 20% free disk space on my SQL Server drives (including C:) so I check to see if any fall below that threshold using [Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace).

```powershell
$allservers | Get-DbaDiskSpace | Where-Object PercentFree -lt 20
```

{{< powershell-console >}}
PS C:\github\dbatools> $allservers = Get-SqlRegisteredServerName -SqlInstance sql2014
PS C:\github\dbatools> $allservers | Get-DbaDiskSpace | Where-Object PercentFree -lt 20 | Format-Table -AutoSize

Server             Name Label SizeInGB FreeInGB PercentFree BlockSize
------             ---- ----- -------- -------- ----------- ---------
sql2005express\... C:\       59.9     7.47     10.47       4096
sql2008            C:\       59.9     8.41     14.03       4096

PS C:\github\dbatools>
{{< /powershell-console >}}

Here, I can easily see that two of my servers may need attention while I'm out of town.

## Have Any Jobs Failed in the Past 30 Days?

Failed jobs are the worst, especially if they're my backup jobs. Let's check failed jobs for the last 30 days using [Find-DbaAgentJob](https://dbatools.io/Find-DbaAgentJob) with either syntax below

```powershell
$allservers | Find-DbaAgentJob -Failed -Since (Get-Date).AddDays(-30)
$allservers | Find-DbaAgentJob -Failed -Since 1/5/2017
```

{{< powershell-console >}}
PS C:\github\dbatools> $allservers | Find-DbaAgentJob -Failed -Since 1/1/2017 | Format-Table -Wrap

SqlInstance JobName              LastRunDate      LastRunOutcome IsEnabled Category               Description
-----------                      -----------      -------------- --------- --------               -----------
MSSQLSERVER MSSQLSERVER 2017/04/13 12:00:00 AM Failed         True      Database Maintenance
MSSQLSERVER MSSQLSERVER 2017/03/27 12:00:00 AM Failed         True      Database Maintenance
MSSQLSERVER MSSQLSERVER 2017/04/06 12:00:00 AM Failed         True      Database Maintenance
MSSQLSERVER MSSQLSERVER 2017/03/30 12:00:00 AM Failed         True      Database Maintenance
MSSQLSERVER MSSQLSERVER 2017/04/06 12:00:00 AM Failed         True      [Uncategorized (Local)]
MSSQLSERVER MSSQLSERVER 2017/04/11 12:00:00 AM Failed         True      [Uncategorized (Local)]
MSSQLSERVER MSSQLSERVER 2017/03/23 12:00:00 AM Failed         True      Log Shipping
MSSQLSERVER MSSQLSERVER 2017/03/23 12:00:00 AM Failed         True      Log Shipping            LS Backup Job
MSSQLSERVER MSSQLSERVER 2017/04/13 12:00:00 AM Failed         True      Data Collector

PS C:\github\dbatools>
{{< /powershell-console >}}

Uh oh, looks like my log shipping isn't so healthy. Probably shouldn't go on vacation anytime soon 😭

## How About My Backups?

Next I check to ensure that my Fulls, Diffs and Logs are in order. My servers perform FULL backups once a week, DIFFs once a day, and LOG backups every 15 minutes. Let's check to ensure this is happening with [Get-DbaLastBackup](https://dbatools.io/Get-DbaLastBackup)

```powershell
$lastbackups = $allservers | Get-DbaLastBackup
$lastbackups | Where { $_.LastLogBackup -lt (Get-Date).AddMinutes(-15) -and $_.RecoveryModel -ne "Simple" }
$lastbackups | Where LastDiffBackup -lt (Get-Date).AddDays(-1)
$lastbackups | Where LastFullBackup -lt (Get-Date).AddDays(-7)
```

{{< powershell-console >}}
PS C:\github\dbatools> $lastbackups = $allservers | Get-DbaLastBackup
PS C:\github\dbatools> $lastbackups | Where { $_.LastLogBackup -lt (Get-Date).AddMinutes(-15) -and $_.RecoveryModel -ne 'Simple' }
PS C:\github\dbatools> $lastbackups | Where LastDiffBackup -lt (Get-Date).AddDays(-1)
PS C:\github\dbatools> $lastbackups | Where LastFullBackup -lt (Get-Date).AddDays(-7)
PS C:\github\dbatools>
{{< /powershell-console >}}

No results here is good; it means that all of my scheduled backups are working and no last backups were older than I expected 😊 If you're curious about the the output of Get-DbaLastBackup, it looks something like this

{{< powershell-console >}}
PS C:\github\dbatools> Get-DbaLastBackup -SqlInstance localhost | Format-Table -AutoSize

Server    Database         RecoveryModel LastFullBackup             LastDiffBackup             LastLogBackup              SinceFull SinceDiff SinceLog DatabaseCreated
------    --------         ------------- --------------             --------------             -------------              --------- --------- -------- ---------------
WORKSTATIONS FireFlyDW       Full 4/28/2017 1:19:14 AM 4/28/2017 1:19:47 AM 4/28/2017 2:00:01 AM 00:04:14  00:03:41  00:00:13 4/27/2017 2:10:53 PM
WORKSTATIONS master          Full 4/28/2017 1:18:44 AM 4/28/2017 1:19:50 AM 4/28/2017 2:00:01 AM 00:04:44  00:03:38  00:00:13 4/8/2003 9:13:36 AM
WORKSTATIONS model           Full 4/28/2017 1:18:45 AM 4/28/2017 1:19:49 AM                        00:04:43  00:03:39           10/14/2005 1:54:07 AM
WORKSTATIONS msdb            Full 4/28/2017 1:18:46 AM 4/28/2017 1:19:48 AM 4/28/2017 2:00:01 AM 00:04:42  00:03:40  00:00:13 4/8/2003 9:13:38 AM
WORKSTATIONS WORKSTATIONS tempdb          Simple                                                                                                          4/27/2017 2:17:24 PM

PS C:\github\dbatools>
{{< /powershell-console >}}

Also, if you're into backups as much as me, check out this post I wrote about [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup) called [building a dedicated backup test server](https://dbatools.io/dedicated-server/).

## Have Any Databases Been Failing Integrity Checks?

Next up! Such a great command - [Get-DbaLastGoodCheckDb](https://dbatools.io/Get-DbaLastGoodCheckDb). This function retrieves the last good CHECKDB of each database.

```powershell
$allservers | Get-DbaLastGoodCheckDb | Where LastGoodCheckDb -lt (Get-Date).AddDays(-1)
```

{{< powershell-console >}}
PS C:\github\dbatools> $allservers | Get-DbaLastGoodCheckDb | Where LastGoodCheckDb -lt (Get-Date).AddDays(-1) | Format-Table -AutoSize

SqlInstance       Database       DatabaseCreated          LastGoodCheckDb            DaysSinceDbCreated DaysSinceLastGoodCheckDb Status
-----------       --------       ---------------          ---------------            ------------------ ------------------------ ------
WORKSTATIONS MSSQLSERVER WORKSTATIONS master 4/8/2003 9:13:36 AM 1/11/2017 4:12:27 AM 47                 107                  Checkdb should be performed
WORKSTATIONS MSSQLSERVER WORKSTATIONS model  10/14/2005 1:54:07 AM                      30                                      New database, not checked yet
WORKSTATIONS MSSQLSERVER WORKSTATIONS msdb   4/8/2003 9:13:38 AM                      47                                      Checkdb should be performed
WORKSTATIONS MSSQLSERVER WORKSTATIONS NCI    1/12/2017 6:17:24 PM                      14                                      New database, not checked yet
WORKSTATIONS MSSQLSERVER WORKSTATIONS NCI2   1/12/2017 6:17:24 PM                      14                                      New database, not checked yet
WORKSTATIONS MSSQLSERVER WORKSTATIONS tempdb 4/12/2017 5:19:24 PM                      4                                       Checkdb should be performed

PS C:\github\dbatools>
{{< /powershell-console >}}

Oops! Looks like one of my servers is in really bad shape and CHECKDB hasn't been run on the databases or they've failed for a while. Better run a check so I can get to my 🍕!

## Speaking of Vacation

You may be wondering about the status of 1.0. It's coming along, albeit a little slower than we expected. One of the biggest reasons was that I had really bad burnout that lasted 1.5 months. I just couldn't get motivated. It started sometime in early March but I'm back at it now.

Burnout is nothing new to me, but I did have an epiphany this time around. My burnout isn't caused by excessive working and the need for a vacation. For me, burnout is caused by **absence of progress** . I was indeed stuck on a persistent issue and just hadn't progressed for nearly two weeks.

In the future, I'm going to ensure that I don't get stuck by allowing myself to move on, even if it means gifting the pesky task to someone else.

## World Tour

The reason I was reminded to do this post was because I'm gonna be out of town next week for [PSConf.eu](http://psconf.eu)! PSConf.eu is an awesome PowerShell conference where you're surrounded by great friends and Hefeweizen. "Let's all have a great time together" is one of the tenets of the conference and last year's conference was the best conference I'd ever been to.

The dbatools team will have a heavy presence there, too! I know that [Rob](https://blog.robsewell.com/), Stuart, [Fred](https://allthingspowershell.blogspot.com/), [André](http://clouddba.io/) and [William](http://clouddba.io/) will be there and I'm hoping a few others show up as well. Kinda like recently at SQLBits!

![Image](/images/vacation-sqlbits-team.jpg)

Dan Alexander, André Kamman, Mötz Jensen, Shane O'Neill,
Rob Sewell and Stephen Bennett (not pictured), Thomas LaRock (not pictured)

And if you're speaking about dbatools, let us know and we'll promote your session 🙏❤️

![Image](/images/img_59029a36e0a9e.png)

I left this small so you would click 😁

## Finishing Up

So here's a big ol' chunk of code you can paste into your environment. You'll have to customize it a lil' bit, but it's a good start.

```powershell
# Get all servers
$allservers = Get-DbaRegServer -SqlInstance localhost

# Check disk space
$allservers | Get-DbaDiskSpace | Where-Object PercentFree -lt 20

# Find failed jobs
$allservers | Find-DbaAgentJob -Failed -Since (Get-Date).AddDays(-30)
$allservers | Find-DbaAgentJob -Failed -Since 1/5/2017

# Check backups
$lastbackups = $allservers | Get-DbaLastBackup
$lastbackups | Where { $_.LastLogBackup -lt (Get-Date).AddMinutes(-15) -and $_.RecoveryModel -ne "Simple" }
$lastbackups | Where LastDiffBackup -lt (Get-Date).AddDays(-1)
$lastbackups | Where LastFullBackup -lt (Get-Date).AddDays(-7)

# Check integrity checks
$allservers | Get-DbaLastGoodCheckDb | Where LastGoodCheckDb -lt (Get-Date).AddDays(-1)
```

Do you have commands or routines you run before leaving town? I'm looking for ideas to add to my list.

Till next time (probably sometime next week)!

\- Chrissy
