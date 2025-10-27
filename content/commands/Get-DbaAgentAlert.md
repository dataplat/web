---
title: "Get-DbaAgentAlert"
slug: "Get-DbaAgentAlert"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent alert configurations from one or more instances"
tags:
  - "Agent"
  - "Alert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentAlert"
draft: false
---

# Get-DbaAgentAlert

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentAlert](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentAlert.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentAlert](https://dataplat.github.io/boh#Get-DbaAgentAlert).

## Synopsis

Retrieves SQL Server Agent alert configurations from one or more instances

## Description

Retrieves alert configurations from SQL Server Agent, including alert names, types, severity levels, message IDs, and notification settings. Use this to audit alert configurations across multiple servers, troubleshoot missing or misconfigured alerts, or gather information for compliance reporting. The function returns detailed alert properties like enabled status, last occurrence dates, and response delays, making it essential for monitoring your alerting infrastructure and ensuring critical system events are properly configured for notification.

## Syntax

```powershell
Get-DbaAgentAlert
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Alert] <String[]>]
    [[-ExcludeAlert] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentAlert -SqlInstance ServerA,ServerB\instanceB
```

Returns all SQL Agent alerts on serverA and serverB\instanceB<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentAlert -SqlInstance ServerA,ServerB\instanceB -Alert MyAlert*
```

Returns SQL Agent alert on serverA and serverB\instanceB whose names match 'MyAlert*'<br>

#####  Example:  3 

```powershell
PS C:\> 'serverA','serverB\instanceB' | Get-DbaAgentAlert
```

Returns all SQL Agent alerts  on serverA and serverB\instanceB<br>

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

##### -Alert

Specifies the specific SQL Agent alert names to retrieve from the target instances. Accepts wildcards for pattern matching.  
Use this when you need to check specific alerts like 'Severity 016*' or 'DB Mail*' instead of retrieving all alerts on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAlert

Specifies SQL Agent alert names to exclude from the results. Accepts wildcards for pattern matching.  
Use this to filter out unwanted alerts when auditing or when you need to focus on specific alert categories without built-in system alerts.

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
