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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Remove-DbaDbTableData</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbTableData.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Adam Lancaster, github.com/lancasteradam</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false" }

Removes all data from the dbo.Test table in the TestDb database on the local SQL instance. The deletes are done in batches of 1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -DeleteSql "DELETE TOP (1000000) deleteFromTable FROM dbo.Test deleteFromTable LEFT JOIN dbo.Test2 b ON deleteFromTable.Id = b.Id"
```
{: data-copyable="true" data-clean-code="Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -DeleteSql &quot;DELETE TOP (1000000) deleteFromTable FROM dbo.Test deleteFromTable LEFT JOIN dbo.Test2 b ON deleteFromTable.Id = b.Id&quot;" }

-LogBackupPath E:\LogBackups -Confirm:$false<br>
Removes data from the dbo.Test table in the TestDb database on the local SQL instance. When specifying -DeleteSql the DELETE statement needs to specify the TOP (N) clause. In this example the deletes <br>
are done in batches of 1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -Table dbo.Test -DeleteSql "WITH ToDelete AS (SELECT TOP (1000000) Id FROM dbo.Test ORDER BY Id DESC;) DELETE FROM ToDelete;"
```
{: data-copyable="true" data-clean-code="Remove-DbaDbTableData -SqlInstance localhost -Database TestDb -Table dbo.Test -DeleteSql &quot;WITH ToDelete AS (SELECT TOP (1000000) Id FROM dbo.Test ORDER BY Id DESC;) DELETE FROM ToDelete;&quot;" }

-LogBackupPath E:\LogBackups -Confirm:$false<br>
Removes data from the dbo.Test table based on the DELETE statement specified in the -DeleteSql. The deletes occur in the TestDb database on the local SQL instance. The deletes are done in batches of <br>
1000000 rows each and the log backups are written to E:\LogBackups.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -Database TestDb1, TestDb2  | Remove-DbaDbTableData -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost -Database TestDb1, TestDb2  | Remove-DbaDbTableData -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false" }

Removes data from the dbo.Test table in the TestDb1 and TestDb2 databases on the local SQL instance. The deletes are done in batches of 1000000 rows each and the log backups are written to <br>
E:\LogBackups.<br>

#####  Example:  5 

```powershell
PS C:\> $server, $server2 | Remove-DbaDbTableData -Database TestDb -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false
```
{: data-copyable="true" data-clean-code="$server, $server2 | Remove-DbaDbTableData -Database TestDb -Table dbo.Test -BatchSize 1000000 -LogBackupPath E:\LogBackups -Confirm:$false" }

Removes data from the dbo.Test table in the TestDb database on the SQL instances represented by $server and $server2. The deletes are done in batches of 1000000 rows each and the log backups are <br>
written to E:\LogBackups.<br>

#####  Example:  6 

```powershell
PS C:\> $server = Connect-DbaInstance -ConnectionString "Data Source=TCP:yourserver.database.windows.net,1433;MultipleActiveResultSets=False;Connect
```
{: data-copyable="true" data-clean-code="$server = Connect-DbaInstance -ConnectionString &quot;Data Source=TCP:yourserver.database.windows.net,1433;MultipleActiveResultSets=False;Connect" }

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
