---
title: "Test-DbaLinkedServerConnection"
slug: "Test-DbaLinkedServerConnection"
date: 2024-01-01
layout: "single"
author: "Thomas LaRock, thomaslarock.com"
availability: "Windows, Linux, macOS"
synopsis: "Tests connectivity to all linked servers on specified SQL Server instances"
tags:
  - "LinkedServer"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLinkedServerConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaLinkedServerConnection"
draft: false
---

# Test-DbaLinkedServerConnection

| Property | Value |
| --- | --- |
| **Author** | Thomas LaRock, thomaslarock.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaLinkedServerConnection](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLinkedServerConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaLinkedServerConnection](https://dataplat.github.io/boh#Test-DbaLinkedServerConnection).

## Synopsis

Tests connectivity to all linked servers on specified SQL Server instances

## Description

Validates that linked servers are properly configured and accessible by attempting to establish connections to each one. This function iterates through all linked servers on the target instances and uses SQL Server's built-in TestConnection() method to verify connectivity. Returns detailed results including success/failure status and specific error messages for troubleshooting connection issues. Essential for validating linked server configurations after setup, during maintenance windows, or when diagnosing cross-server query failures.

## Syntax

```powershell
Test-DbaLinkedServerConnection
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance DEV01
```

Test all Linked Servers for the SQL Server instance DEV01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance sql2016 | Out-File C:\temp\results.txt
```

Test all Linked Servers for the SQL Server instance sql2016 and output results to file<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance sql2016, sql2014, sql2012
```

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012<br>

#####  Example:  4 

```powershell
PS C:\> $servers = "sql2016","sql2014","sql2012"
PS C:\> $servers | Test-DbaLinkedServerConnection -SqlCredential sqladmin
```

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012 using SQL login credentials<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016","sql2014","sql2012"
PS C:\> $servers | Get-DbaLinkedServer | Test-DbaLinkedServerConnection
```

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012<br>

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
