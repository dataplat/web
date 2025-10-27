---
title: "New-DbaAgentProxy"
slug: "New-DbaAgentProxy"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server Agent proxy accounts to enable job steps to run under different security contexts"
tags:
  - "Agent"
  - "Proxy"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentProxy.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentProxy"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaAgentProxy</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentProxy.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates SQL Server Agent proxy accounts to enable job steps to run under different security contexts

## Description

Creates SQL Server Agent proxy accounts that allow job steps to execute under different security contexts than the SQL Agent service account. Proxy accounts use existing SQL Server credentials and can be assigned to specific subsystems like CmdExec, PowerShell, SSIS, or Analysis Services. This enables secure delegation of permissions for automated tasks without granting elevated privileges to the service account itself.  
  
You can control which users, server roles, or msdb database roles have permission to use each proxy, providing granular security for job execution. The proxy must reference an existing SQL Server credential that contains the Windows account under which job steps will actually run.  
  
Note: ActiveScripting (ActiveX scripting) was discontinued in SQL Server 2016: https://docs.microsoft.com/en-us/sql/database-engine/discontinued-database-engine-functionality-in-sql-server

## Syntax

```powershell
New-DbaAgentProxy
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Name] <String[]>
    [-ProxyCredential] <String[]>
    [[-SubSystem] <String[]>]
    [[-Description] <String>]
    [[-Login] <String[]>]
    [[-ServerRole] <String[]>]
    [[-MsdbRole] <String[]>]
    [-Disabled]
    [-Force]
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
PS C:\> New-DbaAgentProxy -SqlInstance sql2016 -Name STIG -ProxyCredential 'PowerShell Proxy'
```
{: data-copyable="true" data-clean-code="New-DbaAgentProxy -SqlInstance sql2016 -Name STIG -ProxyCredential 'PowerShell Proxy'" }

Creates an Agent Proxy on sql2016 with the name STIG with the 'PowerShell Proxy' credential.<br>
The proxy is automatically added to the CmdExec subsystem.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentProxy -SqlInstance localhost\sql2016 -Name STIG -ProxyCredential 'PowerShell Proxy' -Description "Used for auditing purposes" -Login ad\sqlstig -SubSystem CmdExec, PowerShell
```
{: data-copyable="true" data-clean-code="New-DbaAgentProxy -SqlInstance localhost\sql2016 -Name STIG -ProxyCredential 'PowerShell Proxy' -Description &quot;Used for auditing purposes&quot; -Login ad\sqlstig -SubSystem CmdExec, PowerShell" }

-ServerRole securityadmin -MsdbRole ServerGroupAdministratorRole<br>
Creates an Agent Proxy on sql2016 with the name STIG with the 'PowerShell Proxy' credential and the following principals:<br>
Login: ad\sqlstig<br>
ServerRole: securityadmin<br>
MsdbRole: ServerGroupAdministratorRole<br>
By default, only sysadmins have access to create job steps with proxies. This will allow 3 additional principals access:<br>
The proxy is then added to the CmdExec and PowerShell subsystems<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Name

Specifies the name for the SQL Agent proxy account being created. The name must be unique within the SQL Server instance.  
Use a descriptive name that indicates the proxy's purpose or the credential it represents for easier management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -ProxyCredential

Specifies the name of an existing SQL Server credential that the proxy will use for authentication. The credential must already exist on the instance.  
This credential defines the Windows account under which job steps will run when using this proxy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -SubSystem

Specifies which SQL Agent subsystems can use this proxy account for job step execution. Defaults to CmdExec if not specified.  
Multiple subsystems can be assigned to a single proxy, allowing it to run different types of job steps under the same security context.  
Valid options include:  
ActiveScripting  
AnalysisCommand  
AnalysisQuery  
CmdExec  
Distribution  
LogReader  
Merge  
PowerShell  
QueueReader  
Snapshot  
Ssis

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | CmdExec |
| Accepted Values | ActiveScripting,AnalysisCommand,AnalysisQuery,CmdExec,Distribution,LogReader,Merge,PowerShell,QueueReader,Snapshot,Ssis |

##### -Description

Provides a text description for the proxy account to document its purpose or usage requirements.  
Use this to help other DBAs understand when and how this proxy should be used in job steps.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies which SQL Server logins can use this proxy account in their job steps. By default, only sysadmin members can use proxy accounts.  
Add specific logins here to grant non-sysadmin users the ability to create job steps that run under this proxy's security context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerRole

Specifies which SQL Server fixed server roles can use this proxy account in job steps. Members of these server roles will inherit proxy usage permissions.  
This provides role-based access control for proxy usage without needing to grant permissions to individual logins.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MsdbRole

Specifies which msdb database roles can use this proxy account in job steps. Common roles include SQLAgentUserRole, SQLAgentReaderRole, and SQLAgentOperatorRole.  
This allows you to grant proxy access based on existing Agent role membership rather than individual user assignments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Disabled

Creates the proxy account in a disabled state, preventing its immediate use in job steps.  
Use this when you need to set up the proxy configuration first before allowing job steps to use it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates the proxy account if one with the same name already exists on the instance.  
Without this switch, the function will skip existing proxy accounts and display a warning message.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
