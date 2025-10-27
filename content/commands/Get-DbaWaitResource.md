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

# Get-DbaWaitResource

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaWaitResource](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaWaitResource.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaWaitResource](https://dataplat.github.io/boh#Get-DbaWaitResource).

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

Will return an object containing; database name, data file name, schema name and the object which owns the resource<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)'
```

Will return an object containing; database name, schema name and index name which is being waited on.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaWaitResource -SqlInstance server2 -WaitResource 'KEY: 7:35457594073541168 (de21f92a1572)' -row
```

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
