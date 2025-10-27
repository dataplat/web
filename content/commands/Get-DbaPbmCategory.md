---
title: "Get-DbaPbmCategory"
slug: "Get-DbaPbmCategory"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Policy-Based Management categories from SQL Server instances for governance and compliance management."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmCategory"
draft: false
---

# Get-DbaPbmCategory

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmCategory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmCategory](https://dataplat.github.io/boh#Get-DbaPbmCategory).

## Synopsis

Retrieves Policy-Based Management categories from SQL Server instances for governance and compliance management.

## Description

Retrieves all policy categories configured in SQL Server's Policy-Based Management (PBM) feature. Policy categories help organize and group related policies for easier management and selective enforcement across database environments. This function allows DBAs to inventory existing categories, audit category assignments, and understand which categories mandate database subscriptions for automatic policy evaluation.

## Syntax

```powershell
Get-DbaPbmCategory
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Category] <String[]>]
    [[-InputObject] <PSObject[]>]
    [-ExcludeSystemObject]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPbmCategory -SqlInstance sql2016
```

Returns all policy categories from the sql2016 PBM server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmCategory -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return all policy categories from the sql2016 PBM server<br>

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

##### -Category

Filters results to only show specific policy categories by name. Accepts multiple category names for targeted retrieval.  
Use this when you need to check specific categories rather than retrieving all configured PBM categories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Policy-Based Management store objects from Get-DbaPbmStore for processing categories from specific stores.  
Use this when you need to work with categories from a pre-filtered set of PBM stores or when chaining multiple PBM commands together.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ExcludeSystemObject

Excludes built-in system policy categories from the results, showing only user-created categories.  
Use this when you want to focus on custom categories that you or your team have created, filtering out SQL Server's default categories.

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
