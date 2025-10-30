---
title: "New Release - Snowball - All About the Restore"
date: 2017-02-23
lastmod: 2025-10-29
author: "Stuart"
slug: "snowball"
aliases:
  - /snowball/
  - /snowball/index.html
categories: [announcements]
tags: [backuprestore, disasterrecovery, dr]
draft: false
---

Just to confuse people, it's not Chrissy or Drew this time. My name's Stuart, and I've got a new dbatools release to tell you about; snowball.

## This Release Is All About Restores

DBAs spend a lot of time making sure backups work. Or at least they should, and if they aren't then putting their spare time to fixing up their CV is probably a good plan.

So we've got terabytes of SQL backups stashed away on disk. Brilliant, we're bombproof then aren't we? Well, are you sure those backups can be restored?

Part of a good backup strategy is proactively testing your backups by restoring. There are many benefits to doing this:

- **Practice** - You don't want to be restoring a complex production database for the first time when the excrement is hitting the fan. Your restore procedures should be as simple as possible, and you should be able to do them correctly without thinking.
- **Performance** - Just how long does it take to restore your production system? You can bet your boss would like to know
- **Trust** - You need to know you can trust your backups. Just because they've been written to disk doesn't mean everything's OK. Corruption still happens unfortunately. Did you spot it before it became a problem?
- **Confidence** - You need to know you've got all the backups you think you do. Sure someone's not removing transaction log backups before you're finished with them? A prod outage isn't the time to find out you need something from tape and the guy with the safe keys is tucked up in bed.

##### Then

T-SQL didn't make automating restores easy! Each databases restore had to be hand crafted to make sure that you could cope with files in different locations, differing backup locations, and all the other individual quirks we know and love. And if you'd lost your production msdb then it was a world of pain trying to piece together restore files.

Just imagine the pain if you're running a weekly full, night differential and 15 minute log backups. Trying to work out what you need is a real pain.

##### Not So Long Ago

PowerShell started making that a lot easier. By combining it's power in scanning the filesystem and talking to Sql Server it became easier to work out which files you needed and then queue them up for restore. But it still took quite a bit of patience to get it all working smoothly

##### Now

We're proud to announce that dbatools is making it as simple as we can to do restores.

## New Command - Restore-DbaDatabase

Restore-DbaDatabase ties together a lot of new features and is probably going to be your main interface with the new restore functions.

### Laying the Groundwork

For these examples we'll be using the following backup files:

{{< powershell-console >}}
PS C:\dbatools> Get-ChildItem .\backups\ | Sort-Object -Property LastWriteTime

    Directory: C:\dbatools\backups

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         09/02/2017     10:53        2775552 RestoreDemo_Full1.bak
-a----         09/02/2017     10:58          86528 RestoreDemo_Log2.trn
-a----         09/02/2017     11:03          86528 RestoreDemo_Log3.trn
-a----         09/02/2017     11:08         743936 RestoreDemo_Diff4.bak
-a----         09/02/2017     11:13        2841088 RestoreDemo_Full5.bak
-a----         09/02/2017     11:14          86528 RestoreDemo_Log6.trn
-a----         09/02/2017     11:15         612864 RestoreDemo_Diff7.bak
-a----         09/02/2017     11:15          86528 RestoreDemo_Log8.trn

PS C:\dbatools>
{{< /powershell-console >}}

This is a mix of Full, Differential and Log Backups.

### Getting Started

At it's simplest we can do the following:

```powershell
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups
```

This will **scan** all of the files in the folder C:\dbatools\backups and restore them onto the SQL Server instance localhost\sqlexpress2016, up to the most recent record in the backups.

{{< powershell-console >}}
PS C:\dbatools> Restore-DbaDatabase -SqlServer localhost\sqlexpress2016 -Path C:\dbatools\backups

SqlInstance              : localhost\sqlexpress2016
DatabaseName             : RestoreDemo
DatabaseOwner            :
RestoreComplete          : True
BackupFilesCount         : 1
RestoredFilesCount       : 2
NoRecovery               : True
BackupSizeMB             : 3
CompressedBackupSizeMB   : 3
BackupFile               : C:\dbatools\backups\RestoreDemo_Full5.bak
RestoredFile             : C:\dbatools\DbOriginalLocation\RestoreDemo.mdf;C:\dbatools\DbOriginalLocation\RestoreDemo.ldf
TSql                     :

SqlInstance              : localhost\sqlexpress2016
DatabaseName             : RestoreDemo
DatabaseOwner            :
RestoreComplete          : True
BackupFilesCount         : 1
RestoredFilesCount       : 2
NoRecovery               : True
BackupSizeMB             : 1
CompressedBackupSizeMB   : 1
BackupFile               : C:\dbatools\backups\RestoreDemo_Diff7.bak
RestoredFile             : C:\dbatools\DbOriginalLocation\RestoreDemo.mdf;C:\dbatools\DbOriginalLocation\RestoreDemo.ldf
TSql                     :

SqlInstance              : localhost\sqlexpress2016
DatabaseName             : RestoreDemo
DatabaseOwner            :
RestoreComplete          : True
BackupFilesCount         : 1
RestoredFilesCount       : 2
NoRecovery               : False
BackupSizeMB             : 0
CompressedBackupSizeMB   : 0
BackupFile               : C:\dbatools\backups\RestoreDemo_Log8.trn
RestoredFile             : C:\dbatools\DbOriginalLocation\RestoreDemo.mdf;C:\dbatools\DbOriginalLocation\RestoreDemo.ldf
TSql                     :


PS C:\dbatools>
{{< /powershell-console >}}

##### When We Say Scan, We Mean It Will Do the Following:

- All the files in that folder will be checked to see if they are SQL Server backups
- The header information from each file will be read
- The files will then be filtered down to a set that meets your requirements. In this example we will restore your database to the latest point in time contained in those backups. This means we will find:
- The most recent full backup in those files.
- Any differential backups taken since that full backup
- All Transaction backups taken since the last differential backup
- Then we check that we have an unbroken chain of LSNs to ensure we can restore your database
- Then we check that the versions of your backup and target SQL instance are compatible
- Once we're good to go we perform the restore, safe in the knowledge that it'll work
- Then we'll restore it for you

With our example backups, it will have restored RestoreDemo_Full5.bak, RestoreDemo_Diff7 and RestoreDemo_Log8.trn

As you can see, we also return a rich object with details about the restore. For the rest of the examples I'll be hiding the output by storing it in a variable, just to make the screenshots more readable.

### Specifying the Destination Directories

**By default, Restore-DbaDatabase will restore to the default data and log directories**, but maybe you want to move the data files around when you restore the database due to smaller drives:

```powershell
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups -DestinationDataDirectory c:\dbatools\RestoreLocation\
```

{{< powershell-console >}}
PS C:\dbatools> Get-ChildItem .\RestoreLocation\
PS C:\dbatools> $r = Restore-DbaDatabase -SqlServer localhost\sqlexpress2016 -Path C:\dbatools\backups -DestinationDataDirectory C:\dbatools\RestoreLocation\
PS C:\dbatools> Get-ChildItem .\RestoreLocation\

    Directory: C:\dbatools\RestoreLocation

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        10/02/2017        15:49        5242880 RestoreDemo.ldf
-a----        10/02/2017        15:49       10485760 RestoreDemo.mdf

PS C:\dbatools>
{{< /powershell-console >}}

This time, all database files (Log, Full Text, Data, etc) will be restored into the folder c:\dbatools\RestoreLocation folder

Or perhaps you want to separate logs and data files out, got you covered:

```powershell
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups -DestinationDataDirectory c:\dbatools\RestoreLocation -DestinationLogDirectory c:\dbatools\RestoreLogsLocation
```

All your data files end up in c:\dbatools\RestoreLocation and all your log files go into c:\dbatools\RestoreLogsLocation. Nice and easy

{{< powershell-console >}}
PS C:\dbatools> Get-ChildItem .\RestoreLocation\
PS C:\dbatools> Get-ChildItem .\RestoreLogsLocation\
PS C:\dbatools> $r = Restore-DbaDatabase -SqlServer localhost\sqlexpress2016 -Path C:\dbatools\backups -DestinationDataDirectory c:\dbatools\RestoreLocation -DestinationLogDirectory c:\dbatools\RestoreLogLocation
PS C:\dbatools> Get-ChildItem .\RestoreLocation\

    Directory: C:\dbatools\RestoreLocation

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        10/02/2017        15:53        5242880 RestoreDemo.ldf

PS C:\dbatools> Get-ChildItem .\RestoreLogLocation\

    Directory: C:\dbatools\RestoreLogLocation

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        10/02/2017        15:53       10485760 RestoreDemo.mdf

PS C:\dbatools>
{{< /powershell-console >}}

And if you want your restores to return to their original destinations, use the ReuseSourceFolderStructure switch:

```powershell
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups -ReuseSourceFolderStructure
```

If you really want to go to town with moving files around during the restore, then we offer the FileMapping parameter. To use this, you have to pass in a HashTable with a key/value pair for every file in the database you're restoring. The key is the logical name of your data file, and the value is the full path of where you want the file to be placed. For example:

```powershell
$FileStructure = @{
    'DataFile1'='c:\datafiles\datafile1.mdf'
    'DataFile2'='d:\datafiles\datafile2.mdf'
    'db_log'='e:\logfiles\db_log.ldf'
}
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups\FullBackup.bak -FileMapping $FileStructure -DatabaseName RestoredDatabase
```

### Restoring to Specific Point in Time

What if you don't want to restore to the latest point in time? Then you can use the RestoreTime parameter to say when you want to restore to. In our example I want to restore to just before the full backup RestoreDemo_Full5.bak

```powershell
$RestoreTime = Get-Date("01/01/2017 11:10")
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups -RestoreTime $RestoreTime
```

Now our file scan will work out which files it needs to use to perform this restore. By using the -Verbose switch we can see which ones it's picked:

{{< powershell-console >}}
PS C:\dbatools>
PS C:\dbatools> $RestoreTime = Get-Date("09/02/2017 11:10")
PS C:\dbatools> $r = Restore-DbaDatabase -SqlServer localhost\sqlexpress2016 -Path C:\dbatools\backups -RestoreTime $RestoreTime -Verbose
VERBOSE: Restore-DbaDatabase : Paths passed in
VERBOSE: Restore-DbaDatabase : Standard Directory
VERBOSE: Restore-DbaDatabase - Starting
VERBOSE: Restore-DbaDatabase - Checking Path
VERBOSE: Get-FilteredRestoreFile - Scanning C:\dbatools\backups\*
VERBOSE: Get-FilteredRestoreFile - Read File headers (Read-DBABackupHeader)
VERBOSE: Get-FilteredRestoreFile - Connect to localhost\sqlexpress2016
VERBOSE: Get-FilteredRestoreFile - 8 Files in Filter
VERBOSE: Get-FilteredRestoreFile - 1 database to process
VERBOSE: Get-FilteredRestoreFile - Find Newest Full backup
VERBOSE: Get-FilteredRestoreFile - Got a Full backup, now to find diffs if they exist
VERBOSE: Get-FilteredRestoreFile - Got a Full/Diff backups, now find all Tlogs after the last one
VERBOSE: Get-FilteredRestoreFile - Transaction Log backups found
VERBOSE: Get-FilteredRestoreFile - Returning Results to caller
VERBOSE: Restore-DbaDatabase - dbs to restore
VERBOSE: Restore-DbaDatabase - Starting FileSet
VERBOSE: Restore-DbaDatabase - Dbname set from backup = RestoreDemo
VERBOSE: Test-DbaLsnChain - Testing LSN Chain
VERBOSE: Test-DbaLsnChain - Passed LSN Chain checks
VERBOSE: Test-DbaRestoreVersion - RestoreVersion is 13
VERBOSE: Restore-DBFromFilteredArray - Starting
VERBOSE: Restore-DBFromFilteredArray - Restoring backup starting at LSN 34000000006800179 in C:\dbatools\backups\RestoreDemo_Full1.bak
VERBOSE: Restore-DBFromFilteredArray - Beginning Restore
VERBOSE: Restore-DBFromFilteredArray - restore action = Database
VERBOSE: Restore-DBFromFilteredArray - More files to restore, NoRecovery set
VERBOSE: Restore-DBFromFilteredArray - Performing restore action
VERBOSE: Restore-DBFromFilteredArray - Closing Server connection
VERBOSE: Restore-DBFromFilteredArray - Restoring backup starting at LSN 34000000021400005 in C:\dbatools\backups\RestoreDemo_Diff4.bak
VERBOSE: Restore-DBFromFilteredArray - Beginning Restore
VERBOSE: Restore-DBFromFilteredArray - restore action = Database
VERBOSE: Restore-DBFromFilteredArray - More files to restore, NoRecovery set
VERBOSE: Restore-DBFromFilteredArray - Performing restore action
VERBOSE: Restore-DBFromFilteredArray - Closing Server connection
VERBOSE: Restore-DBFromFilteredArray - Restoring backup starting at LSN 34000000019800001 in C:\dbatools\backups\RestoreDemo_Log6.trn
VERBOSE: Restore-DBFromFilteredArray - Beginning Restore
VERBOSE: Restore-DBFromFilteredArray - restore action = Log
VERBOSE: Restore-DBFromFilteredArray - Doing Recovery on last file
VERBOSE: Restore-DBFromFilteredArray - Performing restore action
VERBOSE: Restore-DBFromFilteredArray - Closing Server connection
VERBOSE: Restore-DbaDatabase - Database RestoreDemo restored

PS C:\dbatools>
{{< /powershell-console >}}

We can see it's restored RestoreDemo_Full1.bak, then RestoreDemo_Diff4, and finally used RestoreDemo_log6.trn to roll everything forward to the correct time.

### Replaying the Workload to Remote Lab

Next up, perhaps your developers want to investigate some problems they've been seeing on production. They'd love to have a copy of production on a test server, but from 2 hours ago so they can replay the workload. How about this:

```powershell
Restore-DbaDatabase -SqlInstance TestDbServer -Path \\Server1\backups\ProdDb -DestinationDataDirectory D:\data -RestoreTime (Get-Date).AddHours(-2)
```

What happens if the devs ask you to rereset the database? That's where the -WithReplace switch comes into play

```powershell
Restore-DbaDatabase -SqlInstance TestDbServer -Path \\Server1\backups\ProdDb -DestinationDataDirectory D:\data -RestoreTime (Get-Date).AddHours(-2) -WithReplace
```

Which will overwrite the existing database for you. Be careful with this switch, it will do exactly what you tell it to! And we'll remove all the users from the database, so that safety net isn't there

### Scripting Out to File

While helping your colleagues you'll have noticed that there is a little bit of time taken to process all the backups. You hear through the grapevine that this rollback is going to have to be done a couple of times while they work out what's wrong. So how about we generate the T-SQL scripts ahead of time, then you can just rerun those every time. Hey, you could even give them to the Devs to run!

```powershell
Restore-DbaDatabase -SqlInstance TestDbServer -Path \\Server1\backups\ProdDb -DestinationDataDirectory D:\data -RestoreTime (Get-Date).AddHours(-2) -WithReplace -OutputScriptOnly
```

This will generate all the T-Sql statements required to perform the requested action, but it won't restore the database. By using the -WithReplace switch, the function will return the T-SQL statements with the correct REPLACE sections, it will also script out the file moves for you. For example, using our example backups:

```powershell
$RestoreTime = Get-Date("09/02/2017 11:10")
Restore-DbaDatabase -SqlInstance localhost\sqlexpress2016 -Path C:\dbatools\backups -RestoreTime $RestoreTime -DestinationDataDirectory C:\dbatools\DestinationDirectory\ -WithReplace -OutputScriptOnly
```

produces the following T-SQL scripts:

```sql
RESTORE DATABASE [RestoreDemo] FROM DISK = N'C:\dbatools\backups\RestoreDemo_Full1.bak' WITH MOVE N'RestoreDemo' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.mdf', MOVE N'RestoreDemo_log' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.ldf', NORECOVERY, NOUNLOAD, REPLACE, STATS = 1, STOPAT = N'02/09/2017 11:10:00'
RESTORE DATABASE [RestoreDemo] FROM DISK = N'C:\dbatools\backups\RestoreDemo_Diff4.bak' WITH MOVE N'RestoreDemo' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.mdf', MOVE N'RestoreDemo_log' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.ldf', NORECOVERY, NOUNLOAD, REPLACE, STATS = 1, STOPAT = N'02/09/2017 11:10:00'
RESTORE LOG [RestoreDemo] FROM DISK = N'C:\dbatools\backups\RestoreDemo_Log6.trn' WITH MOVE N'RestoreDemo' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.mdf', MOVE N'RestoreDemo_log' TO N'C:\dbatools\DestinationDirectory\\RestoreDemo.ldf', NOUNLOAD, STATS = 1, STOPAT = N'02/09/2017 11:10:00'
```

Stash them away somewhere safe for when you need them. Or if you want to multi task then

```powershell
$Restore = Restore-DbaDatabase -SqlInstance TestDbServer -Path \\Server1\backups\ProdDb -DestinationDataDirectory D:\data -RestoreTime (Get-Date).AddHours(-2) -WithReplace -OutputScript
$Restore | Select-Object -Property Script
```

Will perform the restore and generate the T-Sql for you. Twice the productivity for only a few characters more.

All the examples above assume you've a single folder containing all your backups. If you have another way of splitting your backups, then you can pass in multiple folders to the path statement:

```powershell
Restore-DbaDatabase -SqlInstance MyRestoreSvr\Instance -Path e:\FullBackups\Database1, f:\LogBackups\Database1
```

### Yes, We Do Support Ola Hallengren's Maintenance Solution!

If you're running Ola Hallengren's maintenance solutions, then we've got that covered as well. Set your path to the top of your backup folder, and we'll do the rest.

```powershell
Restore-DbaDatabase -SqlInstance MyRestoreSvr\Instance -Path \\Server1\backups\ProdDb -MaintenanceSolutionBackup
```

This method has the benefit of being faster as we know which files are which, so can shortcut the reading of files before doing your restore.

### Using xp_dirtree

Maybe you don't have access to the backup files, but your SQL Server instance does. In that case we offer xp_dirtree functionality to process the files.

```powershell
Restore-DbaDatabase -SqlInstance MyRestoreSvr\Instance -Path \\Server1\backups\ProdDb -XpDirTree
```

You will need to have sysadmin permissions on the SQL instance to use the underlying xp_dirtree stored procedure

### Using the PowerShell Pipeline

And like all good PowerShell functions we take input from the pipeline, so if you want to pipe in files we'll take them!:

```powershell
Get-ChildItem c:\backups | Where-Object {$_.name -like 'ProdDb1*'} | Restore-DbaDatabase -SqlInstance MyRestoreSvr\Instance
```

And **coming next week** we'll be able to take pipeline from our own commands! Not sure where a database is backed up? We will be able to use Get-DbaBackupHistory to answer that.

```powershell
Get-DbaBackupHistory -SqlInstance ProdSrv1 -Database Finance1 | Restore-DbaDatabase -SqlInstance TestSrv1
```

This will query ProdSrv1 to get the backup history for the Finance1 database using Get-DbaBackupHistory, this will then be piped to the Restore-DbaDatabase function which will use this information to restore the Finance1 database onto TestSrv1. And you will also be able to apply all the normal Restore-DbaDatabase goodness:

```powershell
Get-DbaBackupHistory -SqlInstance ProdSrv1 -Database Finance1 | Restore-DbaDatabase -SqlInstance TestSrv1 -DestinationDataDirectory d:\DataDump -RestoreTime (Get-date).AddHours(-3)
```

### Restore-DbaDatabase Parameters

Up till now, all our examples have assumed you're only restoring a single database. But Restore-DbaDatabase will handle more than one backup at time.

Only certain parameters will work with multiple databases, as these are ones that can be applied to ALL databases passed in. Those parameters are:

- DestinationDirectory
- DestinationLogDirectory
- WithReplace
- Server
- Credential
- RestoreTime
- OutputScript
- OutputScriptOnly
- VerifyOnly

With our last example, this means we will be able to do:

```powershell
Get-DbaBackupHistory -SqlInstance ProdSrv1 -Database Finance1, HR, CRM | Restore-DbaDatabase -SqlInstance TestSrv1 -DestinationDataDirectory d:\DataDump -RestoreTime (Get-date).AddHours(-3)
```

And restore all 3 database from ProdSrv1 onto TestSrv1 in one fell swoop! This feature is coming this week or next.

### And, Just One Last Thing

So we've made it super easy to restore databases. But don't think we've forgotten that you have to create the backups first. Snowball also marks the first appearance of our new backup command Backup-DbaDatabase.

You want to perform a full backup of every database on an instance:

```powershell
Get-DbaDatabase -SqlInstance Server1 | Backup-DbaDatabase -Type Full -BackupDirectory \\Server2\share\DbBackups
```

and you're done!

This is the first release of this command, so keep checking back as we add more features. So please let us know what you'd like to see added in future releases

## Going Forward

This is the first release of this functionality, and we're looking at extending its capabilities over time. So we'd love to hear from you with your ideas for improvements. I'd also really like to hear about any unusual or different ways you can think of using this functionality.

And please, if you come across something that doesn't work, or doesn't make sense. Please come and talk to us. We hang out over on Slack at [sqlcommunity.slack.com](https://dbatools.io/slack) or you can report issues over at our Github repo at [github.com/dataplat/dbatools](https://github.com/dataplat/dbatools)

- Stuart


