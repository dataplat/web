---
title: "Add-DbaRegServer"
slug: "Add-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Registers SQL Server instances to Central Management Server or Local Server Groups in SSMS"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaRegServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Registers SQL Server instances to Central Management Server or Local Server Groups in SSMS

## Description

Registers SQL Server instances as managed servers within SSMS, either to a Central Management Server (CMS) for enterprise-wide management or to Local Server Groups for personal organization. This allows DBAs to centrally organize and quickly connect to multiple SQL Server instances from SSMS without manually typing connection details each time. The function automatically creates server groups if they don't exist and supports various authentication methods including SQL Server, Windows, and Azure Active Directory. For importing existing registered servers from other sources, use Import-DbaRegServer instead.

## Syntax

```powershell
Add-DbaRegServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-ServerName] <String>]
    [[-Name] <String>]
    [[-Description] <String>]
    [[-Group] <Object>]
    [[-ActiveDirectoryTenant] <String>]
    [[-ActiveDirectoryUserId] <String>]
    [[-ConnectionString] <String>]
    [[-OtherParams] <String>]
    [[-InputObject] <ServerGroup[]>]
    [[-ServerObject] <Server[]>]
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
PS C:\> Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01
```
{: data-copyable="true" data-clean-code="Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01" }

Creates a registered server on sql2008's CMS which points to the SQL Server, sql01. When scrolling in CMS, the name "sql01" will be visible.<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaRegServer -ServerName sql01
```
{: data-copyable="true" data-clean-code="Add-DbaRegServer -ServerName sql01" }

Creates a registered server in Local Server Groups which points to the SQL Server, sql01. When scrolling in Registered Servers, the name "sql01" will be visible.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Name "The 2008 Clustered Instance" -Description "HR's Dedicated SharePoint instance"
```
{: data-copyable="true" data-clean-code="Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Name &quot;The 2008 Clustered Instance&quot; -Description &quot;HR's Dedicated SharePoint instance&quot;" }

Creates a registered server on sql2008's CMS which points to the SQL Server, sql01. When scrolling in CMS, "The 2008 Clustered Instance" will be visible.<br>
Clearly this is hard to explain ;)<br>

#####  Example:  4 

```powershell
PS C:\> Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Group hr\Seattle
```
{: data-copyable="true" data-clean-code="Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Group hr\Seattle" }

Creates a registered server on sql2008's CMS which points to the SQL Server, sql01. When scrolling in CMS, the name "sql01" will be visible within the Seattle group which is in the hr group.<br>

#####  Example:  5 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance dockersql1 -SqlCredential sqladmin | Add-DbaRegServer -ServerName mydockerjam
```
{: data-copyable="true" data-clean-code="Connect-DbaInstance -SqlInstance dockersql1 -SqlCredential sqladmin | Add-DbaRegServer -ServerName mydockerjam" }

Creates a registered server called "mydockerjam" in Local Server Groups that uses SQL authentication and points to the server dockersql1.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance if a CMS is used

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

##### -ServerName

Specifies the actual SQL Server instance name or network address that will be used to connect to the server.  
This is the technical identifier that SSMS uses for the physical connection (e.g., "sql01.domain.com,1433" or "sql01\INSTANCE").

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Sets the display name that appears in the SSMS Registered Servers tree or CMS interface.  
Use this to give servers meaningful, recognizable names like "Production HR Database" instead of cryptic server names. Defaults to ServerName if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $ServerName |

##### -Description

Provides additional details about the registered server that appear in SSMS properties.  
Use this to document the server's purpose, environment, or important notes like "Primary OLTP for HR applications" or "Read-only replica for reporting".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Group

Places the registered server into a specific organizational folder within CMS or Local Server Groups.  
Creates nested groups using backslash notation like "Production\OLTP" or "Dev\Testing". The group structure will be created automatically if it doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ActiveDirectoryTenant

Specifies the Azure Active Directory tenant ID when registering servers that use Azure AD authentication.  
Required when connecting to Azure SQL Database or SQL Managed Instance with AAD credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ActiveDirectoryUserId

Sets the Azure Active Directory user principal name for AAD authentication scenarios.  
Use this when you want the registered server to authenticate with a specific AAD account instead of integrated authentication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConnectionString

Provides a complete SQL Server connection string with all authentication and connection parameters.  
Use this when you need specific connection properties like encryption settings, timeout values, or custom authentication methods not covered by other parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -OtherParams

Appends additional connection string parameters to the base connection.  
Useful for adding specific connection properties like "MultipleActiveResultSets=True" or "TrustServerCertificate=True" without rebuilding the entire connection string.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts a server group object from Get-DbaRegServerGroup to specify where the server should be registered.  
Use this when you want to programmatically target a specific group or when piping group objects from other dbatools commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ServerObject

Accepts an existing SMO Server object from Connect-DbaInstance to register that connection.  
This preserves all connection settings and authentication from the original connection, making it ideal for registering servers you've already successfully connected to.

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
