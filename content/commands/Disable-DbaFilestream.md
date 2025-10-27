---
title: "Disable-DbaFilestream"
slug: "Disable-DbaFilestream"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Disables SQL Server FileStream functionality at both the service and instance levels"
tags:
  - "Filestream"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaFilestream.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaFilestream"
draft: false
---

# Disable-DbaFilestream

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaFilestream](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaFilestream.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaFilestream](https://dataplat.github.io/boh#Disable-DbaFilestream).

## Synopsis

Disables SQL Server FileStream functionality at both the service and instance levels

## Description

Disables the FileStream feature completely by setting the FilestreamAccessLevel configuration to 0 (disabled) and modifying the corresponding Windows service settings. This is useful when FileStream was previously enabled but is no longer needed, during security hardening, or when troubleshooting FileStream-related issues.  
  
The function handles both standalone and clustered SQL Server instances, automatically detecting cluster nodes and applying changes across all nodes. Since disabling FileStream requires changes at both the SQL instance configuration level and the Windows service level, a SQL Server service restart is required for the changes to take effect.  
  
By default, the function will prompt for confirmation before making changes due to the high impact nature of this operation. Use -Force to bypass confirmation and automatically restart the SQL Server service, or run without -Force to make the configuration changes and restart manually later.

## Syntax

```powershell
Disable-DbaFilestream
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
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
PS C:\> Disable-DbaFilestream -SqlInstance server1\instance2
```

Prompts for confirmation. Disables filestream on the service and instance levels.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaFilestream -SqlInstance server1\instance2 -Confirm:$false
```

Does not prompt for confirmation. Disables filestream on the service and instance levels.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFilestream -SqlInstance server1\instance2, server5\instance5, prod\hr | Where-Object InstanceAccessLevel -gt 0 | Disable-DbaFilestream -Force
```

Using this pipeline you can scan a range of SQL instances and disable filestream on only those on which it's enabled.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Credential

Login to the target server using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Force

Bypasses confirmation prompts and automatically restarts the SQL Server service to apply FileStream configuration changes immediately.  
Without this parameter, the function makes configuration changes but requires you to manually restart the SQL service later for changes to take effect.  
Use with caution in production environments as it causes service downtime during the restart.

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

Shows what would happen if the command runs. The command is not run unless Force is specified.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
