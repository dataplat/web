---
title: "Get-DbaPbmObjectSet"
slug: "Get-DbaPbmObjectSet"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Policy-Based Management object sets from SQL Server instances"
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmObjectSet.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmObjectSet"
draft: false
---

# Get-DbaPbmObjectSet

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmObjectSet](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmObjectSet.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmObjectSet](https://dataplat.github.io/boh#Get-DbaPbmObjectSet).

## Synopsis

Retrieves Policy-Based Management object sets from SQL Server instances

## Description

Retrieves object sets from SQL Server's Policy-Based Management (PBM) feature, which define collections of SQL Server objects that policies can target for compliance monitoring. Object sets group related database objects like tables, stored procedures, or views based on specific criteria, allowing you to apply policies consistently across similar objects. This is essential for DBAs implementing standardized configurations and compliance rules across multiple databases and instances.

## Syntax

```powershell
Get-DbaPbmObjectSet
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ObjectSet] <String[]>]
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
PS C:\> Get-DbaPbmObjectSet -SqlInstance sql2016
```

Returns all object sets from the sql2016 PBM instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmObjectSet -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return all object sets from the sql2016 PBM instance<br>

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

##### -ObjectSet

Specifies the name(s) of specific Policy-Based Management object sets to retrieve. Accepts multiple values and supports wildcards.  
Use this when you need to examine particular object sets rather than retrieving all available sets from the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Policy-Based Management store objects from Get-DbaPbmStore via pipeline input for processing multiple stores.  
Use this when you need to process object sets from multiple SQL Server instances or when chaining PBM commands together.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -IncludeSystemObject

Includes SQL Server system object sets in the results, which are excluded by default to focus on user-defined sets.  
Use this when you need to audit or examine Microsoft's built-in Policy-Based Management object sets for compliance or educational purposes.

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
