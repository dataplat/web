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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Disable-DbaFilestream</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaFilestream.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stuart Moore (@napalmgram) , Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Disable-DbaFilestream -SqlInstance server1\instance2" }

Prompts for confirmation. Disables filestream on the service and instance levels.<br>

#####  Example:  2 

```powershell
PS C:\> Disable-DbaFilestream -SqlInstance server1\instance2 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Disable-DbaFilestream -SqlInstance server1\instance2 -Confirm:$false" }

Does not prompt for confirmation. Disables filestream on the service and instance levels.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaFilestream -SqlInstance server1\instance2, server5\instance5, prod\hr | Where-Object InstanceAccessLevel -gt 0 | Disable-DbaFilestream -Force
```
{: data-copyable="true" data-clean-code="Get-DbaFilestream -SqlInstance server1\instance2, server5\instance5, prod\hr | Where-Object InstanceAccessLevel -gt 0 | Disable-DbaFilestream -Force" }

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
