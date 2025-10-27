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

# New-DbaAgentProxy

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentProxy](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentProxy.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentProxy](https://dataplat.github.io/boh#New-DbaAgentProxy).

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

Creates an Agent Proxy on sql2016 with the name STIG with the 'PowerShell Proxy' credential.<br>
The proxy is automatically added to the CmdExec subsystem.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentProxy -SqlInstance localhost\sql2016 -Name STIG -ProxyCredential 'PowerShell Proxy' -Description "Used for auditing purposes" -Login ad\sqlstig -SubSystem CmdExec, PowerShell
```

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
