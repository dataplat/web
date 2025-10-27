---
title: "Get-DbaManagementObject"
slug: "Get-DbaManagementObject"
date: 2024-01-01
layout: "single"
author: "Ben Miller (@DBAduck), dbaduck.com"
availability: "Windows, Linux, macOS"
synopsis: "Discovers installed SQL Server Management Object (SMO) assemblies and their load status"
tags:
  - "SMO"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaManagementObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaManagementObject"
draft: false
---

# Get-DbaManagementObject

| Property | Value |
| --- | --- |
| **Author** | Ben Miller (@DBAduck), dbaduck.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaManagementObject](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaManagementObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaManagementObject](https://dataplat.github.io/boh#Get-DbaManagementObject).

## Synopsis

Discovers installed SQL Server Management Object (SMO) assemblies and their load status

## Description

Scans the system for SQL Server Management Object (SMO) assemblies, SqlClient libraries, and SNI modules to help troubleshoot version conflicts and connectivity issues. This function checks both the Global Assembly Cache (GAC) and currently loaded assemblies in the PowerShell session, returning version information, load status, file paths, and ready-to-use Add-Type commands. Particularly useful when diagnosing why different SQL Server tools behave differently or when you need to load specific SMO versions in PowerShell scripts.

## Syntax

```powershell
Get-DbaManagementObject
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-VersionNumber] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaManagementObject
```

Returns all versions of SMO on the computer<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaManagementObject -VersionNumber 13
```

Returns just the version specified. If the version does not exist then it will return nothing.<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows server(s) where you want to scan for SMO assemblies and SQL Client libraries.  
Use this when troubleshooting SMO version conflicts across multiple servers or when checking which SQL Server tools are installed on remote machines.

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

##### -VersionNumber

Filters results to show only assemblies matching the specified major version number (e.g., 13 for SQL Server 2016, 14 for 2017, 15 for 2019).  
Use this when you need to verify if a specific SQL Server version's SMO libraries are installed, particularly when troubleshooting version compatibility issues between different SQL Server tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
