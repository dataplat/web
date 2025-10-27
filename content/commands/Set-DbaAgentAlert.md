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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentAlert</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentAlert.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Garry Bargsley (@gbargsley), garrybargsley.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error' -Disabled" }

Changes the alert to disabled.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled" }

Changes multiple alerts to enabled.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1, sql2, sql3 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentAlert -SqlInstance sql1, sql2, sql3 -Alert 'Severity 025: Fatal Error', 'Error Number 825', 'Error Number 824' -Enabled" }

Changes multiple alerts to enabled on multiple servers.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error' -Disabled -WhatIf
```
{: data-copyable="true" data-clean-code="Set-DbaAgentAlert -SqlInstance sql1 -Alert 'Severity 025: Fatal Error' -Disabled -WhatIf" }

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
