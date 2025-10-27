---
title: "Remove-DbaDatabaseSafely"
slug: "Remove-DbaDatabaseSafely"
date: 2024-01-01
layout: "single"
author: "Rob Sewell (@SQLDBAWithBeard), sqldbawithabeard.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes databases after creating verified backups and testing restore procedures."
tags:
  - "Database"
  - "Delete"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDatabaseSafely.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDatabaseSafely"
draft: false
---

# Remove-DbaDatabaseSafely

| Property | Value |
| --- | --- |
| **Author** | Rob Sewell (@SQLDBAWithBeard), sqldbawithabeard.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDatabaseSafely](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDatabaseSafely.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDatabaseSafely](https://dataplat.github.io/boh#Remove-DbaDatabaseSafely).

## Synopsis

Removes databases after creating verified backups and testing restore procedures.

## Description

Performs a comprehensive database removal workflow that validates database integrity, creates verified backups, and tests restore procedures before permanently removing databases. This function runs DBCC CHECKDB to verify database health, creates a checksummed backup to a specified location, generates a SQL Agent job for automated restore testing, drops the original database, executes the restore job to verify backup integrity, performs another DBCC check on the restored database, and finally removes the test database.  
  
This process ensures that removed databases have reliable, tested backups that can be restored if needed later. The automated restore job remains available for future recovery operations, making this ideal for database decommissioning, environment cleanup, or compliance scenarios where you need proof that backups are valid before removing production data.  
  
With huge thanks to Grant Fritchey and his verify your backups video. Take a look, it's only 3 minutes long. http://sqlps.io/backuprant

## Syntax

```powershell
Remove-DbaDatabaseSafely
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-Destination] <DbaInstanceParameter>]
    [[-DestinationSqlCredential] <PSCredential>]
    [-NoDbccCheckDb]
    [-BackupFolder] <String>
    [[-CategoryName] <String>]
    [[-JobOwner] <String>]
    [-AllDatabases]
    [[-BackupCompression] <String>]
    [-ReuseSourceFolderStructure]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Remove-DbaDatabaseSafely -SqlInstance 'Fade2Black' -Database RideTheLightning -BackupFolder 'C:\MSSQL\Backup\Rationalised - DO NOT DELETE'
```

Performs a DBCC CHECKDB on database RideTheLightning on server Fade2Black. If there are no errors, the database is backup to the folder C:\MSSQL\Backup\Rationalised - DO NOT DELETE. Then, an Agent <br>
job to restore the database from that backup is created. The database is then dropped, the Agent job to restore it run, a DBCC CHECKDB run against the restored database, and then it is dropped again.<br>
Any DBCC errors will be written to your documents folder<br>

#####  Example:  2 

```powershell
PS C:\> $Database = 'DemoNCIndex','RemoveTestDatabase'
PS C:\> Remove-DbaDatabaseSafely -SqlInstance 'Fade2Black' -Database $Database -BackupFolder 'C:\MSSQL\Backup\Rationalised - DO NOT DELETE'
```

Performs a DBCC CHECKDB on two databases, 'DemoNCIndex' and 'RemoveTestDatabase' on server Fade2Black. Then, an Agent job to restore each database from those backups is created. The databases are <br>
then dropped, the Agent jobs to restore them run, a DBCC CHECKDB run against the restored databases, and then they are dropped again.<br>
Any DBCC errors will be written to your documents folder<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDatabaseSafely -SqlInstance 'Fade2Black' -Destination JusticeForAll -Database RideTheLightning -BackupFolder '\\BACKUPSERVER\BACKUPSHARE\MSSQL\Rationalised - DO NOT DELETE'
```

Performs a DBCC CHECKDB on database RideTheLightning on server Fade2Black. If there are no errors, the database is backup to the folder \\BACKUPSERVER\BACKUPSHARE\MSSQL\Rationalised - DO NOT DELETE . <br>
Then, an Agent job is created on server JusticeForAll to restore the database from that backup is created. The database is then dropped on Fade2Black, the Agent job to restore it on JusticeForAll is <br>
run, a DBCC CHECKDB run against the restored database, and then it is dropped from JusticeForAll.<br>
Any DBCC errors will be written to your documents folder<br>

#####  Example:  4 

```powershell
PS C:\> Remove-DbaDatabaseSafely -SqlInstance IronMaiden -Database $Database -Destination TheWildHearts -BackupFolder Z:\Backups -NoDbccCheckDb -JobOwner 'THEBEARD\Rob'
```

For the databases $Database on the server IronMaiden a DBCC CHECKDB will not be performed before backing up the databases to the folder Z:\Backups. Then, an Agent job is created on server <br>
TheWildHearts with a Job Owner of THEBEARD\Rob to restore each database from that backup using the instance's default file paths. The database(s) is(are) then dropped on IronMaiden, the Agent job(s) <br>
run, a DBCC CHECKDB run on the restored database(s), and then the database(s) is(are) dropped.<br>

#####  Example:  5 

```powershell
PS C:\> Remove-DbaDatabaseSafely -SqlInstance IronMaiden -Database $Database -Destination TheWildHearts -BackupFolder Z:\Backups
```

The databases $Database on the server IronMaiden will be backed up the to the folder Z:\Backups. Then, an Agent job is created on server TheWildHearts with a Job Owner of THEBEARD\Rob to restore each <br>
database from that backup using the instance's default file paths. The database(s) is(are) then dropped on IronMaiden, the Agent job(s) run, a DBCC CHECKDB run on the restored database(s), and then <br>
the database(s) is(are) dropped.<br>
If there is a DBCC Error, the function  will continue to perform rest of the actions and will create an Agent job with 'DBCCERROR' in the name and a Backup file with 'DBCCError' in the name.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -BackupFolder

Specifies the directory path where final database backups will be stored before deletion. Must be accessible by both source and destination server service accounts.  
Use a UNC path (like \\SERVER1\BACKUPS\) when source and destination servers are different, or a local path when using the same server for both operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies one or more databases to safely remove with validated backups. Accepts multiple database names as an array.  
Use this to target specific databases for removal, ensuring each gets a verified backup before deletion.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies the SQL Server instance where the SQL Agent restore job will be created and executed. Defaults to the same server as SqlInstance if not specified.  
Use this when you want to test database backups on a different server than where the original database exists, which is a best practice for backup validation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $SqlInstance |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance when different from SqlCredential. Accepts PowerShell credentials (Get-Credential).  
Use this when the destination server requires different authentication than the source server, common in cross-domain or different security context scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoDbccCheckDb

Skips the initial DBCC CHECKDB integrity check before creating the backup, reducing processing time.  
Use this only when you're confident about database integrity or when time constraints outweigh the risk of backing up a corrupt database.  
The function still runs DBCC on the restored test database, but corruption detection happens after backup creation.

| Property | Value |
| --- | --- |
| Alias | NoCheck |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -CategoryName

Sets the SQL Agent job category for the restore jobs that are created. Defaults to 'Rationalisation'.  
Use a custom category name to organize these restoration jobs separately from other maintenance jobs in SQL Agent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Rationalisation |

##### -JobOwner

Sets the owner account for the SQL Agent restore job that gets created. Defaults to the 'sa' login.  
Specify a different owner when you need the job to run under specific security context or when 'sa' is disabled in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AllDatabases

Removes all user databases from the source server, excluding system databases. Primarily used for server decommissioning scenarios.  
Use with caution and always specify a different Destination server to avoid removing databases from the same server that will test their backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BackupCompression

Controls backup compression behavior with values: Default, On, or Off. Default uses the server's backup compression configuration setting.  
Use 'On' to force compression for smaller backup files and reduced network traffic, or 'Off' when compression overhead outweighs benefits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Default |
| Accepted Values | Default,On,Off |

##### -ReuseSourceFolderStructure

Maintains the original database file paths and folder structure during the test restore operation on the destination server.  
Use this when you need to preserve specific drive layouts or when the destination server has matching drive structure to the source.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Continues the database removal process even when DBCC integrity checks detect corruption. Creates backups and jobs with 'DBCCERROR' naming to identify them.  
Use this only in emergency situations when you must remove a corrupt database and accept the risk of having potentially unusable backups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EnableException

By default, when something goes wrong we try to catch it, interpret it and give you a friendly warning message.  
This avoids overwhelming you with "sea of red" exceptions, but is inconvenient because it basically disables advanced scripting.  
Using this switch turns this "nice by default" feature off and enables you to catch exceptions with your own try/catch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
