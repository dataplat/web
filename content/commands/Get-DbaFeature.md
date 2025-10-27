---
title: "Get-DbaFeature"
slug: "Get-DbaFeature"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Discovers installed SQL Server features and components across multiple servers"
tags:
  - "Feature"
  - "Component"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFeature.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaFeature"
draft: false
---

# Get-DbaFeature

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaFeature](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFeature.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaFeature](https://dataplat.github.io/boh#Get-DbaFeature).

## Synopsis

Discovers installed SQL Server features and components across multiple servers

## Description

Executes SQL Server's built-in feature discovery report to inventory all installed SQL Server components, editions, and instances across one or more servers. This function automates the manual process of running setup.exe /Action=RunDiscovery and parsing the resulting XML report, making it perfect for compliance auditing, license tracking, and environment documentation.  
  
The function returns structured data showing exactly what SQL Server features are installed, which instances they belong to, their versions, editions, and configuration status. This is essential for DBAs who need to understand their SQL Server landscape without manually checking each server or running discovery reports individually.  
  
Inspired by Dave Mason's (@BeginTry) post at  
https://itsalljustelectrons.blogspot.be/2018/04/SQL-Server-Discovery-Report.html  
  
Assumptions:  
1. The sub-folder "Microsoft SQL Server" exists in [System.Environment]::GetFolderPath("ProgramFiles"),  
even if SQL was installed to a non-default path. This has been  
verified on SQL 2008R2 and SQL 2012. Further verification may be needed.  
2. The discovery report displays installed components for the version of SQL  
Server associated with setup.exe, along with installed components of all  
lesser versions of SQL Server that are installed.

## Syntax

```powershell
Get-DbaFeature
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
PS C:\> Get-DbaFeature -ComputerName sql2017, sql2016, sql2005
```

Gets all SQL Server features for all instances on sql2017, sql2016 and sql2005.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFeature -Verbose
```

Gets all SQL Server features for all instances on localhost. Outputs to screen if no instances are found.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFeature -ComputerName sql2017 -Credential ad\sqldba
```

Gets all SQL Server features for all instances on sql2017 using the ad\sqladmin credential (which has access to the Windows Server).<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows computer names where you want to discover SQL Server features and components. Accepts multiple computers for bulk discovery operations.  
Use this when you need to inventory SQL Server installations across your environment for compliance auditing or license tracking.  
Requires PowerShell remoting to be enabled on remote computers. Note that this targets the Windows host, not SQL instance names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to servers using alternative credentials. To use:  
$cred = Get-Credential, then pass $cred object to the -Credential parameter.

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
