---
title: "Test-DbaInstanceName"
slug: "Test-DbaInstanceName"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Validates SQL Server instance name consistency with the host OS and identifies rename requirements and potential blockers."
tags:
  - "SPN"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaInstanceName.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaInstanceName"
draft: false
---

# Test-DbaInstanceName

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaInstanceName](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaInstanceName.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaInstanceName](https://dataplat.github.io/boh#Test-DbaInstanceName).

## Synopsis

Validates SQL Server instance name consistency with the host OS and identifies rename requirements and potential blockers.

## Description

When a SQL Server's host OS is renamed, the SQL Server should be as well. This helps with Availability Groups and Kerberos.  
  
This command compares the SQL Server instance name (from @@servername) with the actual hostname and instance combination to determine if they match. When they don't match, a rename is typically required to prevent authentication issues and ensure proper cluster functionality.  
  
The function also performs critical safety checks by scanning for conditions that would prevent a safe rename, including active database mirroring, replication configurations (publishing, subscribing, or distribution), and remote login dependencies. Additionally, it identifies SQL Server Reporting Services installations that would require manual updates after a server rename.  
  
Use this before attempting any server rename operations to understand the scope of work involved and potential complications. The detailed output helps you plan the rename process and address blockers beforehand.  
  
https://www.mssqltips.com/sqlservertip/2525/steps-to-change-the-server-name-for-a-sql-server-machine/

## Syntax

```powershell
Test-DbaInstanceName
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-ExcludeSsrs]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaInstanceName -SqlInstance sqlserver2014a
```

Returns ServerInstanceName, SqlServerName, IsEqual and RenameRequired for sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaInstanceName -SqlInstance sqlserver2014a, sql2016
```

Returns ServerInstanceName, SqlServerName, IsEqual and RenameRequired for sqlserver2014a and sql2016.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaInstanceName -SqlInstance sqlserver2014a, sql2016 -ExcludeSsrs
```

Returns ServerInstanceName, SqlServerName, IsEqual and RenameRequired for sqlserver2014a and sql2016, but skips validating if SSRS is installed on both instances.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaInstanceName -SqlInstance sqlserver2014a, sql2016 | Select-Object *
```

Returns ServerInstanceName, SqlServerName, IsEqual and RenameRequired for sqlserver2014a and sql2016.<br>
If a Rename is required, it will also show Updatable, and Reasons if the server name is not updatable.<br>

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

##### -ExcludeSsrs

Skips checking for SQL Server Reporting Services installations that would require manual updates after a server rename.  
Use this switch when you know SSRS isn't installed or when you want to focus only on core SQL Server rename blockers.  
Without this switch, the function will warn about SSRS configurations that need attention during rename operations.

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
