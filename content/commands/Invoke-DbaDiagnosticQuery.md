---
title: "Invoke-DbaDiagnosticQuery"
slug: "Invoke-DbaDiagnosticQuery"
date: 2024-01-01
layout: "single"
author: "Andre Kamman (@AndreKamman), andrekamman.com"
availability: "Windows, Linux, macOS"
synopsis: "Executes Glenn Berry's DMV diagnostic queries to assess SQL Server performance and health"
tags:
  - "Community"
  - "GlennBerry"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDiagnosticQuery.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDiagnosticQuery"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDiagnosticQuery</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDiagnosticQuery.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Andre Kamman (@AndreKamman), andrekamman.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Executes Glenn Berry's DMV diagnostic queries to assess SQL Server performance and health

## Description

Runs Glenn Berry's comprehensive collection of DMV-based diagnostic queries to analyze SQL Server performance, configuration, and health issues. These queries help identify common problems like blocking, high CPU usage, memory pressure, index fragmentation, and configuration issues that affect SQL Server performance.  
  
The diagnostic queries are developed and maintained by Glenn Berry and can be found at https://glennsqlperformance.com/resources/ along with extensive documentation. The most recent version of these diagnostic queries are included in the dbatools module, but you can also specify a custom path to run newer versions or specific query collections.  
  
This function automatically detects your SQL Server version (2005-2025, including Azure SQL Database) and runs the appropriate queries for that platform. You can run all queries, select specific ones interactively, or target only instance-level or database-specific diagnostics. Results are returned as structured PowerShell objects for easy analysis, filtering, and reporting. You can also export the queries as SQL files for manual execution or documentation purposes.

## Syntax

```powershell
Invoke-DbaDiagnosticQuery
    [-SqlInstance] <DbaInstanceParameter[]>
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-ExcludeQuery <Object[]>]
    [-SqlCredential <PSCredential>]
    [-Path <FileInfo>]
    [-QueryName <String[]>]
    [-UseSelectionHelper]
    [-InstanceOnly]
    [-DatabaseSpecific]
    [-ExcludeQueryTextColumn]
    [-ExcludePlanColumn]
    [-NoColumnParsing]
    [-OutputPath <String>]
    [-ExportQueries]
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
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance sql2016
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance sql2016" }

Run the selection made by the user on the Sql Server instance specified.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance sql2016 -UseSelectionHelper | Export-DbaDiagnosticQuery -Path C:\temp\gboutput
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance sql2016 -UseSelectionHelper | Export-DbaDiagnosticQuery -Path C:\temp\gboutput" }

Provides a grid view with all the queries to choose from and will run the selection made by the user on the SQL Server instance specified.<br>
Then it will export the results to Export-DbaDiagnosticQuery.<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance localhost -ExportQueries -OutputPath "C:\temp\DiagnosticQueries"
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance localhost -ExportQueries -OutputPath &quot;C:\temp\DiagnosticQueries&quot;" }

Export All Queries to Disk<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -ExportQueries -OutputPath "C:\temp\DiagnosticQueries"
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -ExportQueries -OutputPath &quot;C:\temp\DiagnosticQueries&quot;" }

Export Database Specific Queries for all User Dbs<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -DatabaseName 'tempdb' -ExportQueries -OutputPath "C:\temp\DiagnosticQueries"
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -DatabaseName 'tempdb' -ExportQueries -OutputPath &quot;C:\temp\DiagnosticQueries&quot;" }

Export Database Specific Queries For One Target Database<br>

#####  Example:  6 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -DatabaseName 'tempdb' -ExportQueries -OutputPath "C:\temp\DiagnosticQueries" -QueryName 'Database-scoped Configurations'
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance localhost -DatabaseSpecific -DatabaseName 'tempdb' -ExportQueries -OutputPath &quot;C:\temp\DiagnosticQueries&quot; -QueryName 'Database-scoped Configurations'" }

Export Database Specific Queries For One Target Database and One Specific Query<br>

#####  Example:  7 

```powershell
PS C:\> Invoke-DbaDiagnosticQuery -SqlInstance localhost -UseSelectionHelper
```
{: data-copyable="true" data-clean-code="Invoke-DbaDiagnosticQuery -SqlInstance localhost -UseSelectionHelper" }

Choose Queries To Export<br>

#####  Example:  8 

```powershell
PS C:\> [PSObject[]]$results = Invoke-DbaDiagnosticQuery -SqlInstance localhost -WhatIf
```
{: data-copyable="true" data-clean-code="[PSObject[]]$results = Invoke-DbaDiagnosticQuery -SqlInstance localhost -WhatIf" }

Parse the appropriate diagnostic queries by connecting to server, and instead of running them, return as [PSCustomObject[]] to work with further<br>

#####  Example:  9 

```powershell
PS C:\> $results = Invoke-DbaDiagnosticQuery -SqlInstance Sql2017 -DatabaseSpecific -QueryName 'Database-scoped Configurations' -DatabaseName TestStuff
```
{: data-copyable="true" data-clean-code="$results = Invoke-DbaDiagnosticQuery -SqlInstance Sql2017 -DatabaseSpecific -QueryName 'Database-scoped Configurations' -DatabaseName TestStuff" }

Run diagnostic queries targeted at specific database, and only run database level queries against this database.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Can be either a string or SMO server

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Database

Specifies which databases to run database-specific diagnostic queries against. Accepts wildcard patterns and multiple database names.  
When omitted, all user databases are processed. System databases are automatically excluded unless explicitly specified.

| Property | Value |
| --- | --- |
| Alias | DatabaseName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from database-level diagnostic query execution. Accepts wildcard patterns and multiple database names.  
Useful when you want to run diagnostics on most databases but skip problematic or maintenance databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeQuery

Excludes specific diagnostic queries from execution by their query names. Accepts multiple query names as an array.  
Use this to skip time-consuming queries like index fragmentation analysis or queries that might cause blocking during peak hours.

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
| Alias | Credential |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies a custom directory containing Glenn Berry diagnostic query script files. By default, uses the scripts included with dbatools.  
Use this when you want to run newer diagnostic query versions downloaded from Glenn Berry's website or custom query collections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -QueryName

Runs only the specified diagnostic queries by their exact query names. Accepts multiple query names as an array.  
Use this when you know exactly which diagnostics you need, such as 'Wait Stats' or 'Top CPU Queries' for targeted performance analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UseSelectionHelper

Opens an interactive grid view showing all available diagnostic queries with descriptions for manual selection.  
Perfect for ad-hoc troubleshooting when you want to run only specific queries relevant to your current performance issue.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InstanceOnly

Limits execution to server-level diagnostic queries only, skipping all database-specific queries.  
Ideal for quick instance health checks focusing on server configuration, wait statistics, and instance-wide performance metrics.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DatabaseSpecific

Limits execution to database-level diagnostic queries only, skipping all instance-level queries.  
Use this when investigating database-specific issues like index fragmentation, table statistics, or database configuration problems.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeQueryTextColumn

Removes the [Complete Query Text] column from diagnostic query results to reduce output size and improve performance.  
Useful when you only need query execution statistics without the actual SQL text, especially for queries with large stored procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludePlanColumn

Removes the [Query Plan] column from diagnostic query results to significantly reduce memory usage and improve performance.  
Essential when processing large result sets or when execution plan XML data is not needed for your analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoColumnParsing

Disables all column parsing and formatting for [Complete Query Text] and [Query Plan] columns, returning raw data.  
Use this for maximum performance when you need the fastest possible execution and don't require formatted output columns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -OutputPath

Specifies the directory path where exported diagnostic query SQL files will be saved when using -ExportQueries.  
Files are automatically organized by server name, database name, and query name for easy identification and manual execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExportQueries

Exports diagnostic queries as individual SQL files instead of executing them, organized by query type and target database.  
Useful for creating a library of diagnostic scripts for offline analysis, sharing with team members, or manual execution during maintenance windows.

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

Shows what would happen if the command would execute, but does not actually perform the command

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts to confirm certain actions

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
