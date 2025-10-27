---
title: "Set-DbaAgentAlert"
slug: "Set-DbaAgentAlert"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies properties of existing SQL Agent alerts including enabled status and name."
tags:
  - "Agent"
  - "Alert"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentAlert.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentAlert"
draft: false
---

# Set-DbaAgentAlert

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaAgentAlert](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentAlert.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaAgentAlert](https://dataplat.github.io/boh#Set-DbaAgentAlert).

## Synopsis

Modifies properties of existing SQL Agent alerts including enabled status and name.

## Description

Modifies existing SQL Agent alerts on one or more SQL Server instances, allowing you to enable, disable, or rename alerts without using SQL Server Management Studio. This function is particularly useful for bulk operations across multiple servers, standardizing alert configurations between environments, or temporarily disabling noisy alerts during maintenance windows. The function works with the JobServer.Alerts collection and uses the SMO Alter() method to commit changes to existing alerts. You can specify alerts by name or pipe in alert objects from other dbatools commands like Get-DbaAgentAlert.

## Syntax

```powershell
Set-DbaAgentAlert
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Alert] <Object[]>]
    [[-NewName] <String>]
    [-Enabled]
    [-Disabled]
    [-Force]
    [[-InputObject] <Alert[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error' -Disabled
```

Changes the alert to disabled.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled
```

Changes multiple alerts to enabled.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1, sql2, sql3 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled
```

Changes multiple alerts to enabled on multiple servers.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error' -Disabled -WhatIf
```

Doesn't Change the alert but shows what would happen.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -Alert

Specifies the name(s) of the SQL Agent alerts to modify. Accepts multiple alert names for bulk operations.  
Use this when you need to update specific alerts by name across one or more instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NewName

Sets a new name for the alert being modified. Only works when modifying a single alert.  
Use this when standardizing alert names across environments or fixing naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Enabled

Enables the specified SQL Agent alert(s) by setting IsEnabled to true.  
Use this to reactivate alerts after maintenance or to ensure critical alerts are active across all instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Disabled

Disables the specified SQL Agent alert(s) by setting IsEnabled to false.  
Use this during maintenance windows or to silence noisy alerts that are firing incorrectly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses confirmation prompts by setting ConfirmPreference to 'none'.  
Use this in automated scripts where you want to suppress interactive prompts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts SQL Agent alert objects from the pipeline, typically from Get-DbaAgentAlert.  
Use this when you want to filter alerts first, then modify the results in a pipeline operation.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
