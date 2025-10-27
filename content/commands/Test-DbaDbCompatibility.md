---
title: "Test-DbaDbCompatibility"
slug: "Test-DbaDbCompatibility"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies databases running at lower compatibility levels than the SQL Server instance supports"
tags:
  - "Database"
  - "Compatibility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCompatibility.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbCompatibility"
draft: false
---

# Test-DbaDbCompatibility

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbCompatibility](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCompatibility.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbCompatibility](https://dataplat.github.io/boh#Test-DbaDbCompatibility).

## Synopsis

Identifies databases running at lower compatibility levels than the SQL Server instance supports

## Description

Compares each database's compatibility level against the SQL Server instance's maximum supported compatibility level. This helps identify databases that may not be leveraging newer SQL Server features and performance improvements available after an instance upgrade. Returns detailed comparison results showing which databases could benefit from compatibility level updates to match the server version.

## Syntax

```powershell
Test-DbaDbCompatibility
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbCompatibility -SqlInstance sqlserver2014a
```

Returns server name, database name and true/false if the compatibility level match for all databases on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbCompatibility -SqlInstance sqlserver2014a -Database db1, db2
```

Returns detailed information for database and server compatibility level for the db1 and db2 databases on sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbCompatibility -SqlInstance sqlserver2014a, sql2016 -Exclude db1
```

Returns detailed information for database and server compatibility level for all databases except db1 on sqlserver2014a and sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Test-DbaDbCompatibility
```

Returns db/server compatibility information for every database on every server listed in the Central Management Server on sql2016.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Database

Specifies which databases to test for compatibility level mismatches. Accepts database names, wildcards, or arrays.  
Use this when you need to check specific databases instead of testing all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip during compatibility level testing. Accepts database names, wildcards, or arrays.  
Use this to exclude system databases, maintenance databases, or any databases you don't want included in the results.

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
