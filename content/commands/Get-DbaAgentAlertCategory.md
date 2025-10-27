---
title: "Get-DbaAgentAlertCategory"
slug: "Get-DbaAgentAlertCategory"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent alert categories and their associated alert counts"
tags:
  - "Agent"
  - "Alert"
  - "AlertCategory"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentAlertCategory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentAlertCategory"
draft: false
---

# Get-DbaAgentAlertCategory

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentAlertCategory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentAlertCategory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentAlertCategory](https://dataplat.github.io/boh#Get-DbaAgentAlertCategory).

## Synopsis

Retrieves SQL Server Agent alert categories and their associated alert counts

## Description

Retrieves all SQL Server Agent alert categories from the target instances, showing how alerts are organized and grouped. Categories help DBAs manage alerts logically by grouping related notifications (such as severity-based alerts, database maintenance alerts, or custom business alerts). The function also returns a count of how many alerts are currently assigned to each category, making it useful for understanding your alerting structure and identifying unused or heavily-used categories.

## Syntax

```powershell
Get-DbaAgentAlertCategory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Category] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentAlertCategory -SqlInstance sql1
```

Return all the agent alert categories.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentAlertCategory -SqlInstance sql1 -Category 'Severity Alert'
```

Return all the agent alert categories that have the name 'Severity Alert'.<br>

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

##### -Category

Specifies one or more alert category names to return from the SQL Server Agent. Accepts multiple values and wildcards are not supported.  
Use this when you need to examine specific alert categories rather than retrieving all categories on the instance.

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
