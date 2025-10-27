---
title: "Invoke-DbaQuery"
slug: "Invoke-DbaQuery"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Executes T-SQL queries, scripts, and stored procedures against SQL Server instances with parameterized query support"
tags:
  - "Database"
  - "Query"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaQuery.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaQuery"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaQuery</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaQuery.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Executes T-SQL queries, scripts, and stored procedures against SQL Server instances with parameterized query support

## Description

Executes T-SQL commands against one or more SQL Server instances, supporting queries from strings, files, URLs, or SQL Server Management Objects. This is the primary dbatools command for running custom SQL against your environment, whether you're extracting data for reports, deploying scripts across multiple servers, or running maintenance commands.  
  
The function provides secure parameterized query execution to prevent SQL injection attacks, making it safe to use with dynamic values. You can target specific databases, execute against Availability Group listeners with ReadOnly intent, and choose from multiple output formats to match your workflow needs.  
  
Built for pipeline operations, it accepts multiple instances from Get-DbaRegServer or database collections from Get-DbaDatabase, allowing you to efficiently execute the same query across your entire SQL Server estate. The function handles both simple ad-hoc queries and complex stored procedure calls with input/output parameters, table-valued parameters, and Always Encrypted column support.

## Syntax

```powershell
Invoke-DbaQuery
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String>]
    -Query <String>
    [-QueryTimeout <Int32>]
    [-As <String>]
    [-SqlParameter <PSObject[]>]
    [-CommandType {Text | StoredProcedure | TableDirect}]
    [-AppendServerInstance]
    [-MessagesToOutput]
    [-InputObject <Database[]>]
    [-ReadOnly]
    [-NoExec]
    [-AppendConnectionString <String>]
    [-EnableException]
    [<CommonParameters>]

Invoke-DbaQuery
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String>]
    [-QueryTimeout <Int32>]
    -SqlObject <SqlSmoObject[]>
    [-As <String>]
    [-SqlParameter <PSObject[]>]
    [-CommandType {Text | StoredProcedure | TableDirect}]
    [-AppendServerInstance]
    [-MessagesToOutput]
    [-InputObject <Database[]>]
    [-ReadOnly]
    [-NoExec]
    [-AppendConnectionString <String>]
    [-EnableException]
    [<CommonParameters>]

Invoke-DbaQuery
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <String>]
    [-QueryTimeout <Int32>]
    -File <Object[]>
    [-As <String>]
    [-SqlParameter <PSObject[]>]
    [-CommandType {Text | StoredProcedure | TableDirect}]
    [-AppendServerInstance]
    [-MessagesToOutput]
    [-InputObject <Database[]>]
    [-ReadOnly]
    [-NoExec]
    [-AppendConnectionString <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaQuery -SqlInstance server\instance -Query 'SELECT foo FROM bar'
```
{: data-copyable="true" data-clean-code="Invoke-DbaQuery -SqlInstance server\instance -Query 'SELECT foo FROM bar'" }

Runs the sql query 'SELECT foo FROM bar' against the instance 'server\instance'<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance [SERVERNAME] -Group [GROUPNAME] | Invoke-DbaQuery -Query 'SELECT foo FROM bar'
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance [SERVERNAME] -Group [GROUPNAME] | Invoke-DbaQuery -Query 'SELECT foo FROM bar'" }

Runs the sql query 'SELECT foo FROM bar' against all instances in the group [GROUPNAME] on the CMS [SERVERNAME]<br>

#####  Example:  3 

```powershell
PS C:\> "server1", "server1\nordwind", "server2" | Invoke-DbaQuery -File "C:\scripts\sql\rebuild.sql"
```
{: data-copyable="true" data-clean-code="&quot;server1&quot;, &quot;server1\nordwind&quot;, &quot;server2&quot; | Invoke-DbaQuery -File &quot;C:\scripts\sql\rebuild.sql&quot;" }

Runs the sql commands stored in rebuild.sql against the instances "server1", "server1\nordwind" and "server2"<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance "server1", "server1\nordwind", "server2" | Invoke-DbaQuery -File "C:\scripts\sql\rebuild.sql"
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance &quot;server1&quot;, &quot;server1\nordwind&quot;, &quot;server2&quot; | Invoke-DbaQuery -File &quot;C:\scripts\sql\rebuild.sql&quot;" }

Runs the sql commands stored in rebuild.sql against all accessible databases of the instances "server1", "server1\nordwind" and "server2"<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaQuery -SqlInstance . -Query 'SELECT * FROM users WHERE Givenname = @name' -SqlParameter @{ Name = "Maria" }
```
{: data-copyable="true" data-clean-code="Invoke-DbaQuery -SqlInstance . -Query 'SELECT * FROM users WHERE Givenname = @name' -SqlParameter @{ Name = &quot;Maria&quot; }" }

Executes a simple query against the users table using SQL Parameters.<br>
This avoids accidental SQL Injection and is the safest way to execute queries with dynamic content.<br>
Keep in mind the limitations inherent in parameters - it is quite impossible to use them for content references.<br>
While it is possible to parameterize a where condition, it is impossible to use this to select which columns to select.<br>
The inserted text will always be treated as string content, and not as a reference to any SQL entity (such as columns, tables or databases).<br>

#####  Example:  6 

```powershell
PS C:\> Invoke-DbaQuery -SqlInstance aglistener1 -ReadOnly -Query "select something from readonlydb.dbo.atable"
```
{: data-copyable="true" data-clean-code="Invoke-DbaQuery -SqlInstance aglistener1 -ReadOnly -Query &quot;select something from readonlydb.dbo.atable&quot;" }

Executes a query with ReadOnly application intent on aglistener1.<br>

#####  Example:  7 

```powershell
PS C:\> Invoke-DbaQuery -SqlInstance server1 -Database tempdb -Query Example_SP -SqlParameter @{ Name = "Maria" } -CommandType StoredProcedure
```
{: data-copyable="true" data-clean-code="Invoke-DbaQuery -SqlInstance server1 -Database tempdb -Query Example_SP -SqlParameter @{ Name = &quot;Maria&quot; } -CommandType StoredProcedure" }

Executes a stored procedure Example_SP using SQL Parameters<br>

#####  Example:  8 

```powershell
PS C:\> $queryParameters = @{
>>     StartDate = $startdate
>>     EndDate   = $enddate
>> }
PS C:\> Invoke-DbaQuery -SqlInstance server1 -Database tempdb -Query Example_SP -SqlParameter $queryParameters -CommandType StoredProcedure
```
{: data-copyable="true" data-clean-code="$queryParameters = @{
StartDate = $startdate
EndDate   = $enddate
}
Invoke-DbaQuery -SqlInstance server1 -Database tempdb -Query Example_SP -SqlParameter $queryParameters -CommandType StoredProcedure" }

Executes a stored procedure Example_SP using multiple SQL Parameters<br>

#####  Example:  9 

```powershell
PS C:\> $inparam = @()
PS C:\> $inparam += [PSCustomObject]@{
>>     somestring = 'string1'
>>     somedate = '2021-07-15T01:02:00'
>> }
PS C:\> $inparam += [PSCustomObject]@{
>>     somestring = 'string2'
>>     somedate = '2021-07-15T02:03:00'
>> }
>> $inparamAsDataTable = ConvertTo-DbaDataTable -InputObject $inparam
PS C:\> $inparamAsSQLParameter = New-DbaSqlParameter -SqlDbType structured -Value $inparamAsDataTable -TypeName 'dbatools_tabletype'
PS C:\> Invoke-DbaQuery -SqlInstance localhost -Database master -CommandType StoredProcedure -Query my_proc -SqlParameter $inparamAsSQLParameter
```
{: data-copyable="true" data-clean-code="$inparam = @()
$inparam += [PSCustomObject]@{
somestring = 'string1'
somedate = '2021-07-15T01:02:00'
}
$inparam += [PSCustomObject]@{
somestring = 'string2'
somedate = '2021-07-15T02:03:00'
}
$inparamAsDataTable = ConvertTo-DbaDataTable -InputObject $inparam
$inparamAsSQLParameter = New-DbaSqlParameter -SqlDbType structured -Value $inparamAsDataTable -TypeName 'dbatools_tabletype'
Invoke-DbaQuery -SqlInstance localhost -Database master -CommandType StoredProcedure -Query my_proc -SqlParameter $inparamAsSQLParameter" }

Creates an TVP input parameter and uses it to invoke a stored procedure.<br>

#####  Example:  10 

```powershell
PS C:\> $output = New-DbaSqlParameter -ParameterName json_result -SqlDbType NVarChar -Size -1 -Direction Output
PS C:\> Invoke-DbaQuery -SqlInstance localhost -Database master -CommandType StoredProcedure -Query my_proc -SqlParameter $output
PS C:\> $output.Value
```
{: data-copyable="true" data-clean-code="$output = New-DbaSqlParameter -ParameterName json_result -SqlDbType NVarChar -Size -1 -Direction Output
Invoke-DbaQuery -SqlInstance localhost -Database master -CommandType StoredProcedure -Query my_proc -SqlParameter $output
$output.Value" }

Creates an output parameter and uses it to invoke a stored procedure.<br>

#####  Example:  11 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance localhost -Database master -AlwaysEncrypted
PS C:\> $inputparamSSN = New-DbaSqlParameter -Direction Input -ParameterName "@SSN" -DbType AnsiStringFixedLength -Size 11 -SqlValue "444-44-4444" -ForceColumnEncryption
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query 'SELECT * FROM bar WHERE SSN_col = @SSN' -SqlParameter @inputparamSSN
```
{: data-copyable="true" data-clean-code="$server = Connect-DbaInstance -SqlInstance localhost -Database master -AlwaysEncrypted
$inputparamSSN = New-DbaSqlParameter -Direction Input -ParameterName &quot;@SSN&quot; -DbType AnsiStringFixedLength -Size 11 -SqlValue &quot;444-44-4444&quot; -ForceColumnEncryption
Invoke-DbaQuery -SqlInstance $server -Query 'SELECT * FROM bar WHERE SSN_col = @SSN' -SqlParameter @inputparamSSN" }

Creates an input parameter using Always Encrypted<br>

#####  Example:  12 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance AG1 -Database dbatools -MultiSubnetFailover -ConnectTimeout 60
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query 'SELECT foo FROM bar'
```
{: data-copyable="true" data-clean-code="$server = Connect-DbaInstance -SqlInstance AG1 -Database dbatools -MultiSubnetFailover -ConnectTimeout 60
Invoke-DbaQuery -SqlInstance $server -Query 'SELECT foo FROM bar'" }

Reuses Connect-DbaInstance, leveraging advanced paramenters, to adhere to official guidelines to target FCI or AG listeners.<br>
See https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/sql/sqlclient-support-for-high-availability-disaster-recovery#connecting-with-multisubnetfailover<br>

#####  Example:  13 

```powershell
PS C:\> Invoke-DbaQuery -SqlInstance AG1 -Query 'SELECT foo FROM bar' -AppendConnectionString 'MultiSubnetFailover=true;Connect Timeout=60'
```
{: data-copyable="true" data-clean-code="Invoke-DbaQuery -SqlInstance AG1 -Query 'SELECT foo FROM bar' -AppendConnectionString 'MultiSubnetFailover=true;Connect Timeout=60'" }

Leverages your own parameters, giving you full power, mimicking Connect-DbaInstance's `-MultiSubnetFailover -ConnectTimeout 60`, to adhere to official guidelines to target FCI or AG listeners.<br>
See https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/sql/sqlclient-support-for-high-availability-disaster-recovery#connecting-with-multisubnetfailover<br>

### Required Parameters

##### -Query

Contains the T-SQL commands to execute against the target instances. Supports T-SQL statements, XQuery, and SQLCMD commands with GO batch separators.  
Use this for ad-hoc queries, maintenance scripts, or data extraction commands. For complex scripts or version-controlled SQL, consider using the File parameter instead.  
Escape any double quotation marks included in the string.  
Consider using bracketed identifiers such as [MyTable] instead of quoted identifiers such as "MyTable".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -File

Specifies file paths, URLs, or directories containing SQL scripts to execute. Supports individual .sql files, entire directories, or HTTP/HTTPS URLs for remote scripts.  
Use this for deploying version-controlled SQL scripts, running standardized maintenance routines, or executing scripts downloaded from repositories.

| Property | Value |
| --- | --- |
| Alias | InputFile |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -SqlObject

Accepts SQL Server Management Objects (SMO) that will be scripted out and executed on target instances. Works with tables, views, stored procedures, functions, and other database objects.  
Use this to deploy database schema changes by passing SMO objects from a source environment to recreate them elsewhere.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -SqlCredential

Credential object used to connect to the SQL Server Instance as a different user. This can be a Windows or SQL Server account. Windows users are determined by the existence of a backslash, so if you   
are intending to use an alternative Windows connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the target database context for query execution. The query will run against this database regardless of any USE statements in the SQL code.  
Use this when you need to ensure queries execute in a specific database, particularly when running the same query against multiple instances with different default databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -QueryTimeout

Sets the command timeout in seconds before the query is cancelled. Defaults to the connection's default timeout if not specified.  
Increase this value for long-running maintenance operations, large data exports, or complex analytical queries that need more processing time.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -As

Controls the format of returned query results. Choose 'DataRow' (default) for typical result sets, 'PSObject' for PowerShell-friendly objects, or 'SingleValue' for scalar results.  
Use 'PSObject' when you need to pipe results to other PowerShell commands that expect objects. Use 'SingleValue' for queries returning a single value like COUNT(*) or configuration checks.  
PSObject and PSObjectArray output introduces overhead but adds flexibility for working with results: https://forums.powershell.org/t/dealing-with-dbnull/2328/2

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | DataRow |
| Accepted Values | DataSet,DataTable,DataRow,PSObject,PSObjectArray,SingleValue |

##### -SqlParameter

Provides parameters for safe execution of queries with dynamic values, preventing SQL injection attacks. Accepts hashtables or SqlParameter objects from New-DbaSqlParameter.  
Use this whenever your queries include user input, dynamic values, or when calling stored procedures with input/output parameters. Essential for secure production scripts.    
http://blog.codinghorror.com/give-me-parameterized-sql-or-give-me-death/

| Property | Value |
| --- | --- |
| Alias | SqlParameters |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CommandType

Defines how the Query parameter should be interpreted. Use 'Text' (default) for T-SQL statements, 'StoredProcedure' for procedure calls, or 'TableDirect' for direct table access.  
Set this to 'StoredProcedure' when calling stored procedures, which enables proper parameter handling and allows the use of output parameters.  
Further information: https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Text |

##### -AppendServerInstance

Adds the source SQL Server instance name as a column to query results. Particularly useful when running the same query against multiple instances.  
Use this when you need to identify which instance produced each row of results, essential for multi-instance reporting and troubleshooting scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MessagesToOutput

Captures and returns T-SQL PRINT statements, RAISERROR messages, and other informational messages along with query results.  
Use this when debugging stored procedures, monitoring script progress, or when you need to see messages that SQL scripts output during execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts database objects from the pipeline, typically from Get-DbaDatabase. The query will execute against each database in the collection.  
Use this to run the same query across multiple databases efficiently, such as checking configuration settings or gathering statistics from all user databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ReadOnly

Sets the connection to use ReadOnly application intent, directing queries to readable secondary replicas in Availability Groups.  
Use this when querying Availability Group listeners to reduce load on primary replicas and take advantage of readable secondaries for reporting workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoExec

Enables syntax and semantic validation without executing the actual statements. The SQL engine parses and compiles queries but doesn't run them.  
Use this to validate T-SQL syntax, check object references, and verify permissions before running potentially destructive scripts in production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AppendConnectionString

Adds custom connection string parameters for specialized connection requirements like MultiSubnetFailover, encryption settings, or timeout values.  
Use this for Availability Group connections, Always Encrypted scenarios, or when you need connection properties not available through standard parameters. Authentication must still be handled via   
SqlInstance and SqlCredential.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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


&nbsp;
