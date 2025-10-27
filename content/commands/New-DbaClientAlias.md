---
title: "New-DbaClientAlias"
slug: "New-DbaClientAlias"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server client aliases in the Windows registry for simplified connection management"
tags:
  - "SqlClient"
  - "Alias"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaClientAlias.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaClientAlias"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaClientAlias</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaClientAlias.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates SQL Server client aliases in the Windows registry for simplified connection management

## Description

Creates or updates SQL Server client aliases by modifying registry keys in HKLM:\SOFTWARE\Microsoft\MSSQLServer\Client\ConnectTo, replacing the need for manual cliconfg.exe configuration. This allows applications and connections to use simple alias names instead of complex server names, instance names, or custom port numbers. Particularly useful when standardizing connections across multiple workstations, managing port changes, or simplifying named instance connections without modifying application connection strings.

## Syntax

```powershell
New-DbaClientAlias
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-ServerName] <DbaInstanceParameter>
    [-Alias] <String>
    [[-Protocol] <String>]
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
PS C:\> New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp
```
{: data-copyable="true" data-clean-code="New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp" }

Creates a new TCP alias on the local workstation called sp, which points sqlcluster\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaClientAlias -ServerName 'sqlcluster,14443' -Alias spinstance
```
{: data-copyable="true" data-clean-code="New-DbaClientAlias -ServerName 'sqlcluster,14443' -Alias spinstance" }

Creates a new TCP alias on the local workstation called spinstance, which points to sqlcluster, port 14443.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp -Protocol NamedPipes
```
{: data-copyable="true" data-clean-code="New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp -Protocol NamedPipes" }

Creates a new NamedPipes alias on the local workstation called sp, which points sqlcluster\sharepoint<br>

### Required Parameters

##### -ServerName

Specifies the actual SQL Server instance that the alias will point to.  
Can include instance names (server\instance) or custom ports (server,1433) for non-standard configurations.  
This is the real connection target that applications will reach when using the alias name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Alias

Defines the short, friendly name that applications will use to connect to SQL Server.  
Choose a simple name that's easier to remember and type than the full server\instance name.  
This alias name will appear in connection strings and SQL management tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where the client alias will be created in the registry.  
Use this when configuring aliases on remote workstations or when managing multiple computers centrally.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to remote computers using alternative credentials

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Protocol

Sets the network protocol for the connection, either TCPIP or NamedPipes.  
TCPIP is recommended for most scenarios and works across network boundaries.  
NamedPipes may be preferred for local connections or specific security requirements. Defaults to TCPIP.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | TCPIP |
| Accepted Values | TCPIP,NamedPipes |

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
