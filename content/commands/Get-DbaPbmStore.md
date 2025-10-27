---
title: "Get-DbaPbmStore"
slug: "Get-DbaPbmStore"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the Policy-Based Management store object from SQL Server instances."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmStore.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmStore"
draft: false
---

# Get-DbaPbmStore

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmStore](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmStore.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmStore](https://dataplat.github.io/boh#Get-DbaPbmStore).

## Synopsis

Retrieves the Policy-Based Management store object from SQL Server instances.

## Description

Retrieves the Policy-Based Management (PBM) store object, which serves as the foundation for managing SQL Server policies, conditions, and categories. This store object is required for accessing and manipulating Policy-Based Management components programmatically. The function connects to the DMF (Declarative Management Framework) policy store and returns it with additional instance identification properties for easier scripting and automation.

## Syntax

```powershell
Get-DbaPbmStore
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
PS C:\> Get-DbaPbmStore -SqlInstance sql2016
```

Return the policy store from the sql2016 instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmStore -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return the policy store from the sql2016 instance<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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
