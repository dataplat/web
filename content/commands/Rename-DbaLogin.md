---
title: "Rename-DbaLogin"
slug: "Rename-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Mitchell Hamann (@SirCaptainMitch)"
availability: "Windows, Linux, macOS"
synopsis: "Renames SQL Server logins and optionally their associated database users"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Rename-DbaLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Rename-DbaLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Rename-DbaLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Mitchell Hamann (@SirCaptainMitch)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Renames SQL Server logins and optionally their associated database users

## Description

Renames SQL Server logins at the instance level, solving the common problem of needing to update login names after migrations, domain changes, or when improving naming conventions.  
  
When migrating logins between environments or standardizing naming conventions, manually updating login names and all their database user mappings is time-consuming and error-prone. This function handles both the login rename and optionally updates all associated database users in a single operation.  
  
By default, only the server-level login is renamed. Use the -Force parameter to also rename the corresponding database users across all databases where the login is mapped. If any database user rename fails, the function automatically rolls back the login name change to maintain consistency.

## Syntax

```powershell
Rename-DbaLogin
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Login] <String>
    [-NewLogin] <String>
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
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login DbaToolsUser -NewLogin captain
```
{: data-copyable="true" data-clean-code="Rename-DbaLogin -SqlInstance localhost -Login DbaToolsUser -NewLogin captain" }

SQL Login Example<br>

#####  Example:  2 

```powershell
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login domain\oldname -NewLogin domain\newname
```
{: data-copyable="true" data-clean-code="Rename-DbaLogin -SqlInstance localhost -Login domain\oldname -NewLogin domain\newname" }

Change the windowsuser login name.<br>

#####  Example:  3 

```powershell
PS C:\> Rename-DbaLogin -SqlInstance localhost -Login dbatoolsuser -NewLogin captain -WhatIf
```
{: data-copyable="true" data-clean-code="Rename-DbaLogin -SqlInstance localhost -Login dbatoolsuser -NewLogin captain -WhatIf" }

WhatIf Example<br>

### Required Parameters

##### -SqlInstance

Source SQL Server.You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the existing login name that you want to rename on the SQL Server instance.  
This must be an exact match for a login that currently exists on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -NewLogin

Specifies the new name for the login after the rename operation.  
For Windows logins, the new name must resolve to the same SID as the original login to maintain security mappings.

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

##### -Force

Renames corresponding database users across all databases where the login is mapped.  
Without this parameter, only the server-level login is renamed, leaving database users unchanged. If any database user rename fails, the entire operation rolls back to maintain consistency.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts to confirm actions

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
