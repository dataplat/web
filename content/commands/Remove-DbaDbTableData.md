---
title: "Remove-DbaDbTableData"
slug: "Remove-DbaDbTableData"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Performs batch deletion of table data while controlling transaction log growth during large-scale data removal operations."
tags:
  - "Table"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbTableData.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbTableData"
draft: false
---

# Remove-DbaDbTableData

| Property | Value |
| --- | --- |
| **Author** | Adam Lancaster, github.com/lancasteradam |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbTableData](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbTableData.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbTableData](https://dataplat.github.io/boh#Remove-DbaDbTableData).

## Synopsis

Performs batch deletion of table data while controlling transaction log growth during large-scale data removal operations.

## Description

Safely removes large amounts of table data without causing transaction log file growth issues that typically occur with single large DELETE operations. This command implements Aaron Bertrand's chunked deletion technique (https://sqlperformance.com/2013/03/io-subsystem/chunk-deletes) to break large deletions into manageable batches, preventing log file expansion and blocking issues.  
  
This is essential for DBAs who need to purge historical data, clean up audit tables, implement data retention policies, or remove test data without impacting database performance or running out of log space. The command automatically handles transaction log management based on your recovery model - taking log backups for Full/Bulk-logged recovery or performing checkpoints for Simple recovery.  
  
Foreign key constraints are respected and not temporarily disabled, so you need to delete from dependent tables first or ensure cascading deletes are configured. The command works with both on-premises SQL Server and Azure SQL Database, automatically adjusting log management strategies for each platform.  
  
Two deletion modes are supported:  
1. Simple table deletion using -Table and -BatchSize parameters where the DELETE statement is automatically generated  
2. Complex deletions with custom WHERE clauses, JOINs, or ORDER BY using the -DeleteSql parameter for advanced scenarios  
  
The command returns detailed metadata about the deletion process including row counts, timing information, and log backup details to help you monitor progress and performance.

## Syntax

```powershell
Remove-DbaDbTableData
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-BatchSize] <Int32>]
    [[-Table] <String>]
    [[-DeleteSql] <String>]
    [[-LogBackupPath] <String>]
    [[-LogBackupTimeStampFormat] <String>]
    [[-AzureBaseUrl] <String[]>]
    [[-AzureCredential] <String>]
    [[-InputObject] <Object[]>]
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
PS C:\> Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false
```

Removes all data from the dbo.Test table in the TestDb database on the local SQL instance. The deletes are done in batches of 1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -DeleteSql "DELETE TOP (1000000) deleteFromTable FROM dbo.Test deleteFromTable LEFT JOIN dbo.Test2 b ON deleteFromTable.Id = b.Id"
```

-LogBackupPath E:\LogBackups -Confirm:$false<br>
Removes data from the dbo.Test table in the TestDb database on the local SQL instance. When specifying -DeleteSql the DELETE statement needs to specify the TOP (N) clause. In this example the deletes <br>
are done in batches of 1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -Table dbo.Test -DeleteSql "WITH ToDelete AS (SELECT TOP (1000000) Id FROM dbo.Test ORDER BY Id DESC;) DELETE FROM ToDelete;"
```

-LogBackupPath E:\LogBackups -Confirm:$false<br>
Removes data from the dbo.Test table based on the DELETE statement specified in the -DeleteSql. The deletes occur in the TestDb database on the local SQL instance. The deletes are done in batches of <br>
1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -Database TestDb1, TestDb2  | Remove-DbaDbTableData -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false
```

Removes data from the dbo.Test table in the TestDb1 and TestDb2 databases on the local SQL instance. The deletes are done in batches of 1000000 rows each and the log backups are written to <br>
E:\LogBackups.<br>

#####  Example:  5 

```powershell
PS C:\> $server, $server2 | Remove-DbaDbTableData -Database TestDb -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false
```

Removes data from the dbo.Test table in the TestDb database on the SQL instances represented by $server and $server2. The deletes are done in batches of 1000000 rows each and the log backups are <br>
written to E:\LogBackups.<br>

#####  Example:  6 

```powershell
PS C:\> $server = Connect-DbaInstance -ConnectionString "Data Source=TCP:yourserver.database.windows.net,1433;MultipleActiveResultSets=False;Connect
```

Timeout=30;Encrypt=True;TrustServerCertificate=False;User Id=dbuser;Password=strongpassword;Database=TestDb"<br>
Remove-DbaDbTableData -SqlInstance $server -Database TestDb -Table dbo.Test -BatchSize 1000000 -Confirm:$false<br>
Removes data from the dbo.Test table in the TestDb database on the Azure SQL server yourserver.database.windows.net. The deletes are done in batches of 1000000 rows. Log backups are managed by Azure <br>
SQL. Note: for Azure SQL databases error 40552 could occur for large batch deletions: <br>
https://docs.microsoft.com/en-us/azure/azure-sql/database/troubleshoot-common-errors-issues#error-40552-the-session-has-been-terminated-because-of-excessive-transaction-log-space-usage<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

Specifies which databases to include in the table data removal operation. Accepts wildcards for pattern matching.  
If unspecified, all user databases on the instance will be processed, which means the same table deletion will occur across multiple databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BatchSize

Controls how many rows are deleted per batch to prevent transaction log growth and blocking issues. Defaults to 100,000 rows and accepts values between 1 and 1 billion.  
Use smaller batch sizes (10,000-50,000) for heavily indexed tables or when other users need access during the operation. Can only be used with -Table parameter.  
For Azure SQL databases, large batch sizes may trigger error 40552 due to transaction log space limits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100000 |

##### -Table

Specifies the fully qualified table name from which to delete data (e.g., dbo.CustomerHistory, Sales.OrderDetails).  
Use this for simple scenarios where you want to delete all rows from a table. For complex deletions with WHERE clauses or JOINs, use -DeleteSql instead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DeleteSql

Provides a custom DELETE statement for complex deletion scenarios involving WHERE clauses, JOINs, or ORDER BY conditions.  
Must include a TOP (N) clause to control batch size (e.g., "DELETE TOP (100000) FROM dbo.Orders WHERE OrderDate < '2020-01-01'").  
Use this when -Table parameter is insufficient for your deletion logic. Cannot be combined with -Table or -BatchSize parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogBackupPath

Specifies the directory path where transaction log backup files will be created during the deletion process.  
Required for databases in Full or Bulk-logged recovery models to prevent log file growth during large deletions. Only applies to on-premises SQL Server instances.  
The SQL Server service account must have write permissions to this directory. Not used for Simple recovery model or Azure SQL databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogBackupTimeStampFormat

Controls the timestamp format used in transaction log backup file names. Defaults to 'yyyyMMddHHmm' (e.g., 202312151430).  
Use Get-Date format strings to customize the naming pattern. Invalid formats will cause the operation to fail.  
Helps organize log backup files chronologically when performing multiple large deletion operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureBaseUrl

Specifies the Azure Storage container URL for storing transaction log backups during the deletion process.  
Use this when you need log backups stored in Azure Blob Storage instead of local file system storage.  
Cannot be combined with -LogBackupPath parameter. See Backup-DbaDatabase documentation for container URL format requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AzureCredential

Provides the credential name for authenticating to Azure Storage when using -AzureBaseUrl for log backups.  
Must reference a SQL Server credential that contains the Azure Storage account access key or SAS token.  
Required when backing up transaction logs to Azure Blob Storage during the deletion process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts piped input from other dbatools commands like Get-DbaDatabase or Connect-DbaInstance.  
Use this to chain commands together, such as filtering databases first and then performing table data removal.  
Supports Database, Server, and DbaInstanceParameter objects from the dbatools pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts for confirmation before executing any data modification operations.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
