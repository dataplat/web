---
title: "Get-DbaPbmCondition"
slug: "Get-DbaPbmCondition"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Policy-Based Management conditions from SQL Server instances for compliance monitoring and policy evaluation."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCondition.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmCondition"
draft: false
---

# Get-DbaPbmCondition

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmCondition](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCondition.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmCondition](https://dataplat.github.io/boh#Get-DbaPbmCondition).

## Synopsis

Retrieves Policy-Based Management conditions from SQL Server instances for compliance monitoring and policy evaluation.

## Description

Retrieves Policy-Based Management (PBM) conditions from SQL Server instances, which define the rules and criteria used to evaluate database objects for compliance. These conditions form the building blocks of PBM policies and specify what to check (like database settings, table properties, or server configurations) and what values are acceptable. Use this to audit existing conditions, troubleshoot policy failures, or inventory your compliance framework across multiple instances.

## Syntax

```powershell
Get-DbaPbmCondition
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Condition] <String[]>]
    [[-InputObject] <PSObject[]>]
    [-IncludeSystemObject]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPbmCondition -SqlInstance sql2016
```

Returns all conditions from the sql2016 PBM server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmCondition -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return all conditions from the sql2016 PBM server<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Condition

Filters results to only return conditions that match the specified names. Accepts multiple condition names and supports wildcards.  
Use this when you need to examine specific PBM conditions rather than retrieving all conditions from the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Policy-Based Management store objects from Get-DbaPbmStore via pipeline input. This allows you to chain commands and work with multiple PBM stores efficiently.  
Use this when processing conditions from multiple instances or when working with previously retrieved PBM store objects.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -IncludeSystemObject

Includes built-in system conditions in the results, which are filtered out by default. System conditions are predefined by SQL Server for common compliance scenarios.  
Use this when you need to see all available conditions including Microsoft's built-in templates for policy creation.

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
