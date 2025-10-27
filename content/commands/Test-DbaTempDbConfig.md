---
title: "Test-DbaTempDbConfig"
slug: "Test-DbaTempDbConfig"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests tempdb configuration against SQL Server best practices and returns compliance status for each rule."
tags:
  - "Tempdb"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaTempDbConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaTempDbConfig"
draft: false
---

# Test-DbaTempDbConfig

| Property | Value |
| --- | --- |
| **Author** | Michael Fal (@Mike_Fal), mikefal.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaTempDbConfig](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaTempDbConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaTempDbConfig](https://dataplat.github.io/boh#Test-DbaTempDbConfig).

## Synopsis

Tests tempdb configuration against SQL Server best practices and returns compliance status for each rule.

## Description

Performs a comprehensive audit of tempdb configuration against Microsoft's recommended best practices, returning detailed compliance results for each rule. This saves DBAs from manually checking multiple tempdb settings and provides clear guidance on which configurations need attention.  
  
The function evaluates six critical areas of tempdb configuration:  
  
* TF 1118 enabled - Is Trace Flag 1118 enabled (See KB328551).  
* File Count - Does the count of data files in tempdb match the number of logical cores, up to 8?  
* File Growth - Are any files set to have percentage growth? Best practice is all files have an explicit growth value.  
* File Location - Is tempdb located on the C:\? Best practice says to locate it elsewhere.  
* File MaxSize Set (optional) - Do any files have a max size value? Max size could cause tempdb problems if it isn't allowed to grow.  
* Data File Size Equal - Are the sizes of all the tempdb data files the same?  
  
Each rule returns the current setting, recommended setting, and whether the configuration follows best practices. This is particularly useful during SQL Server health checks, performance troubleshooting, or compliance audits where tempdb configuration directly impacts system performance.

## Syntax

```powershell
Test-DbaTempDbConfig
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
PS C:\> Test-DbaTempDbConfig -SqlInstance localhost
```

Checks tempdb on the localhost machine.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaTempDbConfig -SqlInstance localhost | Select-Object *
```

Checks tempdb on the localhost machine. All rest results are shown.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a | Test-DbaTempDbConfig | Select-Object * | Out-GridView
```

Checks tempdb configuration for a group of servers from SQL Server Central Management Server (CMS). Output includes all columns. Send output to GridView.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. SQL Server 2005 and higher are supported.

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
