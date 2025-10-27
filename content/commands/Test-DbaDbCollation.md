---
title: "Test-DbaDbCollation"
slug: "Test-DbaDbCollation"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies databases with collations that differ from the SQL Server instance default collation"
tags:
  - "Database"
  - "Collation"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCollation.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbCollation"
draft: false
---

# Test-DbaDbCollation

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbCollation](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbCollation.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbCollation](https://dataplat.github.io/boh#Test-DbaDbCollation).

## Synopsis

Identifies databases with collations that differ from the SQL Server instance default collation

## Description

Compares each database's collation against the SQL Server instance's default collation to identify mismatches. Database collation mismatches can cause string comparison issues, join failures, and stored procedure errors when working across databases. This function helps you audit collation consistency across your databases, which is especially important before migrations, mergers, or when troubleshooting application issues related to character sorting and comparison behavior.

## Syntax

```powershell
Test-DbaDbCollation
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
PS C:\> Test-DbaDbCollation -SqlInstance sqlserver2014a
```

Returns server name, database name and true/false if the collations match for all databases on sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbCollation -SqlInstance sqlserver2014a -Database db1, db2
```

Returns information for the db1 and db2 databases on sqlserver2014a.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbCollation -SqlInstance sqlserver2014a, sql2016 -Exclude db1
```

Returns information for database and server collations for all databases except db1 on sqlserver2014a and sql2016.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2016 | Test-DbaDbCollation
```

Returns db/server collation information for every database on every server listed in the Central Management Server on sql2016.<br>

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

Specifies which databases to check for collation mismatches against the server's default collation. Accepts wildcards for pattern matching.  
Use this when you need to focus collation testing on specific databases rather than scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies which databases to skip during collation testing. Useful for excluding system databases or databases you know have intentional collation differences.  
Common scenarios include skipping databases with different language requirements or legacy databases scheduled for decommission.

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
