---
title: "Test-DbaManagementObject"
slug: "Test-DbaManagementObject"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck), dbaduck.com"
availability: "Windows, Linux, macOS"
synopsis: "Verifies if specific SQL Server Management Objects (SMO) library versions are installed on target computers."
tags:
  - "SMO"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaManagementObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaManagementObject"
draft: false
---

# Test-DbaManagementObject

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck), dbaduck.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaManagementObject](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaManagementObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaManagementObject](https://dataplat.github.io/boh#Test-DbaManagementObject).

## Synopsis

Verifies if specific SQL Server Management Objects (SMO) library versions are installed on target computers.

## Description

Checks the Global Assembly Cache (GAC) for Microsoft.SqlServer.Smo assemblies of specified versions. This function helps DBAs ensure the required SMO libraries are available before executing scripts that depend on specific SQL Server client tool versions. Returns detailed results showing which versions exist on each target computer, preventing runtime errors when SMO-dependent automation runs against systems with missing or incompatible client libraries.

## Syntax

```powershell
Test-DbaManagementObject
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-VersionNumber] <Int32[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaManagementObject -VersionNumber 13
```

Returns True if the version exists, if it does not exist it will return False<br>

### Required Parameters

##### -VersionNumber

Specifies the major version number(s) of SQL Server SMO assemblies to verify in the Global Assembly Cache.  
Common values include 11 (SQL 2012), 12 (SQL 2014), 13 (SQL 2016), 14 (SQL 2017), 15 (SQL 2019), and 16 (SQL 2022).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to check for SMO assemblies. Accepts pipeline input and defaults to the local computer.  
Use this when verifying SMO library versions across multiple servers in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

This command uses Windows credentials. This parameter allows you to connect remotely as a different user.

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
