---
title: "Get-DbaInstanceAudit"
slug: "Get-DbaInstanceAudit"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server audit objects from instance-level security auditing configurations."
tags:
  - "Audit"
  - "Security"
  - "SqlAudit"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceAudit.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaInstanceAudit"
draft: false
---

# Get-DbaInstanceAudit

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaInstanceAudit](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaInstanceAudit.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaInstanceAudit](https://dataplat.github.io/boh#Get-DbaInstanceAudit).

## Synopsis

Retrieves SQL Server audit objects from instance-level security auditing configurations.

## Description

Retrieves all configured SQL Server audit objects at the instance level, which define where security audit events are stored and how they're managed. These audits capture login attempts, permission changes, and other security-related activities across the entire SQL Server instance. The function returns detailed information including audit file paths, size limits, rollover settings, and current status, helping DBAs monitor compliance and troubleshoot security configurations without manually querying system views.

## Syntax

```powershell
Get-DbaInstanceAudit
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Audit] <String[]>]
    [[-ExcludeAudit] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaInstanceAudit -SqlInstance localhost
```

Returns all Security Audits on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaInstanceAudit -SqlInstance localhost, sql2016
```

Returns all Security Audits for the local and sql2016 SQL Server instances<br>

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

##### -Audit

Specifies which audit objects to retrieve by name. Accepts multiple audit names to return only those specific audits.  
Use this when you need to check configuration or status for particular audits instead of retrieving all instance-level audits.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAudit

Specifies which audit objects to exclude from results by name. Accepts multiple audit names to filter out unwanted audits.  
Use this when you want to retrieve most audits but skip specific ones, such as excluding test or temporary audits from compliance reports.

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
