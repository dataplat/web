---
title: "Repair-DbaInstanceName"
slug: "Repair-DbaInstanceName"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Updates SQL Server's @@SERVERNAME system variable to match the Windows hostname"
tags:
  - "SPN"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaInstanceName.ps1"
bohUrl: "https://dataplat.github.io/boh#Repair-DbaInstanceName"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Repair-DbaInstanceName</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Repair-DbaInstanceName.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Updates SQL Server's @@SERVERNAME system variable to match the Windows hostname

## Description

Updates SQL Server's @@SERVERNAME system variable to match the current Windows hostname, which is required after renaming a Windows server. This ensures proper functionality for Kerberos authentication and Availability Groups.  
  
The function automatically detects the correct new server name and uses sp_dropserver and sp_addserver to update the SQL Server system tables. It handles common blockers like active replication and database mirroring, optionally removing them with the -AutoFix parameter.  
  
A SQL Server service restart is required to complete the rename process, which the function can perform automatically. The function will skip the operation if the names already match.  
  
https://www.mssqltips.com/sqlservertip/2525/steps-to-change-the-server-name-for-a-sql-server-machine/

## Syntax

```powershell
Repair-DbaInstanceName
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-AutoFix]
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
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014
```
{: data-copyable="true" data-clean-code="Repair-DbaInstanceName -SqlInstance sql2014" }

Checks to see if the server name is updatable and changes the name with a number of prompts.<br>

#####  Example:  2 

```powershell
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix
```
{: data-copyable="true" data-clean-code="Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix" }

Checks to see if the server name is updatable and automatically performs the change. Replication or mirroring will be broken if necessary.<br>

#####  Example:  3 

```powershell
PS C:\> Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix -Force
```
{: data-copyable="true" data-clean-code="Repair-DbaInstanceName -SqlInstance sql2014 -AutoFix -Force" }

Checks to see if the server name is updatable and automatically performs the change, bypassing most prompts and confirmations. Replication or mirroring will be broken if necessary.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -AutoFix

Automatically resolves blockers that prevent the server name repair, including removing replication distribution and disabling database mirroring.  
Use this when you need to fix the server name without manual intervention to remove these blocking configurations.  
This parameter will prompt for confirmation before breaking replication or mirroring unless combined with -Force.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses confirmation prompts for potentially destructive operations like stopping SQL services and breaking replication or mirroring.  
Use this for unattended automation or when you're certain about proceeding with all changes.  
Combine with -AutoFix for fully automated server name repairs without any prompts.

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
