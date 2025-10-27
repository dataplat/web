---
title: "Set-DbaPrivilege"
slug: "Set-DbaPrivilege"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Grants essential Windows privileges to SQL Server service accounts for optimal performance and security."
tags:
  - "Privilege"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPrivilege.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaPrivilege"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaPrivilege</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPrivilege.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@PowerDbaKlaas)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Grants essential Windows privileges to SQL Server service accounts for optimal performance and security.

## Description

Configures critical Windows privileges for SQL Server service accounts including Lock Pages in Memory (LPIM), Instant File Initialization (IFI), Logon as Batch, Logon as Service, and Generate Security Audits. These privileges are essential for SQL Server performance optimization and proper service operation, eliminating the need to manually configure them through Local Security Policy. The function automatically discovers SQL service accounts on target computers or allows you to specify custom accounts, then uses secedit to update the local security policy.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Set-DbaPrivilege
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-Type] <String[]>
    [-EnableException]
    [[-User] <String>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaPrivilege -ComputerName sqlserver2014a -Type LPIM,IFI
```
{: data-copyable="true" data-clean-code="Set-DbaPrivilege -ComputerName sqlserver2014a -Type LPIM,IFI" }

Adds the SQL Service account(s) on computer sqlserver2014a to the local privileges 'SeManageVolumePrivilege' and 'SeLockMemoryPrivilege'.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Set-DbaPrivilege -Type IFI
```
{: data-copyable="true" data-clean-code="'sql1','sql2','sql3' | Set-DbaPrivilege -Type IFI" }

Adds the SQL Service account(s) on computers sql1, sql2 and sql3 to the local privilege 'SeManageVolumePrivilege'.<br>

### Required Parameters

##### -Type

Specifies which Windows privileges to grant to the SQL Server service accounts. Accepts one or more values: 'IFI' (Instant File Initialization), 'LPIM' (Lock Pages in Memory), 'BatchLogon' (Log on as   
a batch job), 'SecAudit' (Generate security audits), and 'ServiceLogon' (Log on as a service).  
These privileges are essential for SQL Server performance and functionality - IFI speeds up database file operations, LPIM prevents memory paging for better performance, and the logon rights ensure   
services can start properly.  
Multiple privileges can be specified together for comprehensive SQL Server optimization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | IFI,LPIM,BatchLogon,SecAudit,ServiceLogon |

### Optional Parameters

##### -ComputerName

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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

##### -User

Specifies a custom user account to receive the privileges instead of automatically discovering SQL Server service accounts.  
Use this when you need to grant privileges to a specific account that will run SQL Server services, or when the automatic service account detection doesn't work in your environment.  
Accepts domain accounts (DOMAIN\User) or local accounts - ensure the account exists and will be used by SQL Server services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
