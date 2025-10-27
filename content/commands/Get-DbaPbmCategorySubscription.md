---
title: "Get-DbaPbmCategorySubscription"
slug: "Get-DbaPbmCategorySubscription"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database subscriptions to Policy-Based Management categories that control automatic policy evaluation."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCategorySubscription.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmCategorySubscription"
draft: false
---

# Get-DbaPbmCategorySubscription

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmCategorySubscription](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmCategorySubscription.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmCategorySubscription](https://dataplat.github.io/boh#Get-DbaPbmCategorySubscription).

## Synopsis

Retrieves database subscriptions to Policy-Based Management categories that control automatic policy evaluation.

## Description

Retrieves all database subscriptions to policy categories from SQL Server's Policy-Based Management feature. These subscriptions determine which databases are subject to automatic policy evaluation for specific policy categories. When a database subscribes to a category (either voluntarily or through mandatory subscription), all policies in that category will be automatically evaluated against the database. This is essential for auditing policy compliance, troubleshooting evaluation failures, and understanding which databases are governed by which policy sets.

## Syntax

```powershell
Get-DbaPbmCategorySubscription
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <PSObject[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPbmCategorySubscription -SqlInstance sql2016
```

Returns all policy category subscriptions from the sql2016 PBM server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmCategorySubscription -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return all policy category subscriptions from the sql2016 PBM server<br>

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

##### -InputObject

Accepts Policy-Based Management store objects from Get-DbaPbmStore for pipeline processing.  
Use this when you need to query category subscriptions from an already retrieved PBM store object, improving performance when working with multiple PBM operations on the same instance.

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
