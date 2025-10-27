---
title: "Get-DbaRgClassifierFunction"
slug: "Get-DbaRgClassifierFunction"
date: 2024-01-01
layout: "single"
author: "Alessandro Alpi (@suxstellino), alessandroalpi.blog"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the Resource Governor classifier function configured for workload group assignment"
tags:
  - "Migration"
  - "ResourceGovernor"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgClassifierFunction.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRgClassifierFunction"
draft: false
---

# Get-DbaRgClassifierFunction

| Property | Value |
| --- | --- |
| **Author** | Alessandro Alpi (@suxstellino), alessandroalpi.blog |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRgClassifierFunction](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRgClassifierFunction.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRgClassifierFunction](https://dataplat.github.io/boh#Get-DbaRgClassifierFunction).

## Synopsis

Retrieves the Resource Governor classifier function configured for workload group assignment

## Description

Retrieves the custom classifier function that Resource Governor uses to determine which workload group incoming connections are assigned to. The classifier function contains the business logic that evaluates connection properties (like login name, application name, or host name) and returns the appropriate workload group name. This function is always stored in the master database and is essential for understanding how Resource Governor categorizes and manages SQL Server workloads.

## Syntax

```powershell
Get-DbaRgClassifierFunction
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <ResourceGovernor[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRgClassifierFunction -SqlInstance sql2016
```

Gets the classifier function from sql2016<br>

#####  Example:  2 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaResourceGovernor | Get-DbaRgClassifierFunction
```

Gets the classifier function object on Sql1 and Sql2/sqlexpress instances<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -InputObject

Accepts Resource Governor objects piped from Get-DbaResourceGovernor.  
Use this when processing multiple instances or when you already have Resource Governor objects to work with, allowing for efficient pipeline operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
