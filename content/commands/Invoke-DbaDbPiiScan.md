---
title: "Invoke-DbaDbPiiScan"
slug: "Invoke-DbaDbPiiScan"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad, sqlstad.nl)"
availability: "Windows, Linux, macOS"
synopsis: "Command to return any columns that could potentially contain PII (Personal Identifiable Information)"
tags:
  - "DataMasking"
  - "GDPR"
  - "PII"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbPiiScan.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbPiiScan"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbPiiScan</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbPiiScan.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad, sqlstad.nl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Command to return any columns that could potentially contain PII (Personal Identifiable Information)

## Description

This command will go through the tables in your database and assess each column.  
It will first check the columns names if it was named in such a way that it would indicate PII.  
The next thing that it will do is pattern recognition by looking into the data from the table.  
Custom scan definitions can be specified using the formats seen in <dbatools module root>\bin\datamasking\pii-knownnames.json and <dbatools module root>\bin\datamasking\pii-patterns.json.

## Syntax

```powershell
Invoke-DbaDbPiiScan
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Table] <String[]>]
    [[-Column] <String[]>]
    [[-Country] <String[]>]
    [[-CountryCode] <String[]>]
    [[-ExcludeTable] <String[]>]
    [[-ExcludeColumn] <String[]>]
    [[-SampleCount] <Int32>]
    [[-KnownNameFilePath] <String>]
    [[-PatternFilePath] <String>]
    [-ExcludeDefaultKnownName]
    [-ExcludeDefaultPattern]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1" }

Scan the database db1 on instance sql1<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1, sql2 -Database db1, db2
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1, sql2 -Database db1, db2" }

Scan multiple databases on multiple instances<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db2 -ExcludeColumn firstname
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db2 -ExcludeColumn firstname" }

Scan database db2 but exclude the column firstname<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db2 -CountryCode US
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db2 -CountryCode US" }

Scan database db2 but only apply data patterns used for the United States<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1 -PatternFilePath  c:\pii\patterns.json
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1 -PatternFilePath  c:\pii\patterns.json" }

Scans db1 on instance sql1 with additional custom patterns<br>

#####  Example:  6 

```powershell
PS C:\> Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1 -PatternFilePath  c:\pii\patterns.json -ExcludeDefaultPattern
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbPiiScan -SqlInstance sql1 -Database db1 -PatternFilePath  c:\pii\patterns.json -ExcludeDefaultPattern" }

Scans db1 on instance sql1 with additional custom patterns, excluding the default patterns<br>

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

Specifies the databases to scan for potential PII data. Required parameter - at least one database must be specified.  
Use this to target specific databases rather than scanning entire SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Limits the scan to specific tables within the target databases. Accepts multiple table names.  
Use this when you need to focus PII scanning on known tables containing sensitive data rather than scanning all tables.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Column

Restricts the scan to specific columns within the target tables. Accepts multiple column names.  
Use this when you want to validate specific columns suspected of containing PII or to recheck previously identified columns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Country

Filters PII pattern matching to specific countries using full country names (e.g., "United States", "Canada").  
Use this when your data contains region-specific formats like phone numbers or postal codes that should only match certain countries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CountryCode

Filters PII pattern matching to specific countries using ISO country codes (e.g., "US", "CA", "GB").  
Use this for more precise regional filtering when you know the specific country codes for your data regions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeTable

Prevents scanning of specified tables even if they would otherwise be included in the scan scope.  
Use this to skip known system tables, staging tables, or tables confirmed to not contain PII data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeColumn

Prevents scanning of specified columns even if they would otherwise be included in the scan scope.  
Use this to skip columns like timestamps, IDs, or other fields confirmed to not contain PII data.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SampleCount

Sets the number of data rows to examine per column for pattern matching. Default is 100 rows.  
Increase this value for more thorough scanning of large tables, or decrease it to speed up scans of tables with consistent data patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 100 |

##### -KnownNameFilePath

Specifies a JSON file path containing custom column name patterns that indicate PII data.  
Use this to add organization-specific column naming conventions that should be flagged as potential PII beyond the default patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PatternFilePath

Specifies a JSON file path containing custom regex patterns for identifying PII data within column values.  
Use this to add custom data patterns specific to your organization or industry that aren't covered by the default patterns.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDefaultKnownName

Disables the built-in column name patterns for PII detection, using only custom patterns if provided.  
Use this when the default column name patterns generate too many false positives for your specific database schema conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeDefaultPattern

Disables the built-in data value patterns for PII detection, using only custom patterns if provided.  
Use this when the default data patterns don't match your data formats or generate excessive false positives.

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


&nbsp;
