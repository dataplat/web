---
title: "Get-DbaInstanceAuditSpecification"
slug: "Get-DbaInstanceAuditSpecification"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves server-level audit specifications from SQL Server instances for compliance and security monitoring"
tags:
  - "Audit"
  - "Security"
  - "SqlAudit"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceAuditSpecification.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceAuditSpecification"
draft: false
---

# Get-DbaInstanceAuditSpecification

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceAuditSpecification](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceAuditSpecification.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceAuditSpecification](https://dataplat.github.io/boh#Get-DbaInstanceAuditSpecification).

## Synopsis

Retrieves server-level audit specifications from SQL Server instances for compliance and security monitoring

## Description

Returns all server-level audit specifications configured on SQL Server instances, including their enabled status, associated audit names, and configuration details. This helps DBAs inventory audit configurations for compliance reporting, security assessments, and ensuring proper event monitoring is in place. Server audit specifications define which events are captured by SQL Server Audit at the instance level, such as login attempts, permission changes, and database access patterns.

## Syntax

```powershell
Get-DbaInstanceAuditSpecification
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
PS C:\> Get-DbaInstanceAuditSpecification -SqlInstance localhost
```

Returns all Security Audit Specifications on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaInstanceAuditSpecification -SqlInstance localhost, sql2016
```

Returns all Security Audit Specifications for the local and sql2016 SQL Server instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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
