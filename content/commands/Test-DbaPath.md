---
title: "Test-DbaPath"
slug: "Test-DbaPath"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests if files or directories are accessible to the SQL Server service account."
tags:
  - "Storage"
  - "Path"
  - "Directory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaPath"
draft: false
---

# Test-DbaPath

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaPath](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaPath](https://dataplat.github.io/boh#Test-DbaPath).

## Synopsis

Tests if files or directories are accessible to the SQL Server service account.

## Description

Verifies file and directory accessibility from SQL Server's perspective using the master.dbo.xp_fileexist extended stored procedure. This is essential before backup operations, restore tasks, or any SQL Server process that requires file system access. The function tests from the SQL Server service account's security context, which may differ from your user account's permissions. Returns detailed information about file existence and whether the path is a container (directory).

## Syntax

```powershell
Test-DbaPath
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Path] <Object>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaPath -SqlInstance sqlcluster -Path L:\MSAS12.MSSQLSERVER\OLAP
```

Tests whether the service account running the "sqlcluster" SQL Server instance can access L:\MSAS12.MSSQLSERVER\OLAP. Logs into sqlcluster using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> $credential = Get-Credential
PS C:\> Test-DbaPath -SqlInstance sqlcluster -SqlCredential $credential -Path L:\MSAS12.MSSQLSERVER\OLAP
```

Tests whether the service account running the "sqlcluster" SQL Server instance can access L:\MSAS12.MSSQLSERVER\OLAP. Logs into sqlcluster using SQL authentication.<br>

### Required Parameters

##### -SqlInstance

The SQL Server you want to run the test on.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Path

Specifies the file or directory paths to test for accessibility from the SQL Server service account's perspective. Accepts single paths, arrays of paths, or pipeline input.  
Use this to verify SQL Server can access backup destinations, restore source files, or any location needed for database operations.  
Critical for pre-validating paths before backup, restore, or bulk operations that would otherwise fail with access denied errors.

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
