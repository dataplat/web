---
title: "Get-DbaInstalledPatch"
slug: "Get-DbaInstalledPatch"
date: 2024-01-01
layout: "single"
author: "Hiram Fleitas, @hiramfleitas, fleitasarts.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves installed SQL Server patches from Windows Registry for patch compliance and audit reporting."
tags:
  - "Deployment"
  - "Updates"
  - "Patches"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstalledPatch.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstalledPatch"
draft: false
---

# Get-DbaInstalledPatch

| Property | Value |
| --- | --- |
| **Author** | Hiram Fleitas, @hiramfleitas, fleitasarts.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstalledPatch](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstalledPatch.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstalledPatch](https://dataplat.github.io/boh#Get-DbaInstalledPatch).

## Synopsis

Retrieves installed SQL Server patches from Windows Registry for patch compliance and audit reporting.

## Description

Queries the Windows Registry to retrieve a complete history of SQL Server patches installed on one or more computers. This includes Cumulative Updates (CUs), Service Packs, and Hotfixes that have been applied to any SQL Server instance on the target machines.  
  
Essential for patch compliance audits, pre-upgrade planning, and troubleshooting environments where you need to verify what patches have been installed and when. The function returns patch names, versions, and installation dates so you can quickly assess patch levels across your SQL Server estate without manually checking each server.  
  
To test if your build is up to date, use Test-DbaBuild.

## Syntax

```powershell
Get-DbaInstalledPatch
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaInstalledPatch -ComputerName HiramSQL1, HiramSQL2
```

Gets a list of SQL Server patches installed on HiramSQL1 and HiramSQL2.<br>

#####  Example:  2 

```powershell
PS C:\> Get-Content C:\Monitoring\Servers.txt | Get-DbaInstalledPatch
```

Gets the SQL Server patches from a list of computers in C:\Monitoring\Servers.txt.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaInstalledPatch -ComputerName SRV1 | Sort-Object InstallDate.Date
```

Gets the SQL Server patches from SRV1 and orders by date. Note that we use<br>
a special customizable date datatype for InstallDate so you'll need InstallDate.Date<br>

### Optional Parameters

##### -ComputerName

Specifies the target computers to query for SQL Server patch information. Accepts single computer names, comma-separated lists, or pipeline input from text files.  
Use this to audit patch levels across multiple servers for compliance reporting or pre-upgrade planning.  
Defaults to the local computer when not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the Computer as a different user.

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
