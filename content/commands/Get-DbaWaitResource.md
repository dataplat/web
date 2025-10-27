---
title: "Get-DbaWaitResource"
slug: "Get-DbaWaitResource"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Translates wait resource strings into human-readable database object information for troubleshooting blocking and deadlocks"
tags:
  - "Diagnostic"
  - "Pages"
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitResource.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaWaitResource"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaWaitResource</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitResource.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram), stuart-moore.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Translates wait resource strings into human-readable database object information for troubleshooting blocking and deadlocks

## Description

Converts cryptic wait resource identifiers from sys.dm_exec_requests into readable database object details that DBAs can actually use for troubleshooting. When you're investigating blocking chains or deadlocks, you see wait_resource values like 'PAGE: 10:1:9180084' or 'KEY: 7:35457594073541168 (de21f92a1572)' in DMVs, but these don't tell you which actual table or index is involved.  
  
For PAGE wait resources, this function uses DBCC PAGE internally to identify the specific database, data file, schema, and object that owns the contested page. For KEY wait resources, it queries system catalog views to determine the database, schema, table, and index being waited on. With the -Row parameter, you can also retrieve the actual data from the locked row, which is invaluable for understanding what specific record is causing contention.  
  
This eliminates the manual detective work of decoding resource IDs and saves time when you need to quickly identify the root cause of blocking issues in production environments.

## Syntax

```powershell
Get-DbaWaitResource
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-WaitResource] <String>
    [-Row]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaWaitResource -SqlInstance server1 -WaitResource 'PAGE: 10:1:9180084'
```
{: data-copyable="true" data-clean-code="Get-DbaWaitResource -SqlInstance server1 -WaitResource 'PAGE: 10:1:9180084'" }

Will return an object containing; database name, data file name, schema name and the object which owns the resource<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)'
```
{: data-copyable="true" data-clean-code="Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)'" }

Will return an object containing; database name, schema name and index name which is being waited on.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)' -row
```
{: data-copyable="true" data-clean-code="Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)' -row" }

Will return an object containing; database name, schema name and index name which is being waited on, and in addition the contents of the locked row at the time the command is run.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -WaitResource

Specifies the cryptic wait resource identifier from sys.dm_exec_requests that you need to decode into readable database object information.  
Accepts PAGE format like 'PAGE: 10:1:9180084' or KEY format like 'KEY: 7:35457594073541168 (de21f92a1572)'.  
Use this when troubleshooting blocking chains or deadlocks to identify which specific table, index, or page is causing contention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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

##### -Row

Returns the actual data from the locked row in addition to the object information for KEY wait resources.  
Provides the specific record values that are causing the lock contention, which helps identify patterns or problematic data.  
Only works with KEY wait resources and uses NOLOCK hint to retrieve the current row data safely.

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
