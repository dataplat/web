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

# New-DbaClientAlias

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaClientAlias](https://github.com/dataplat/dbatools/blob/master/public/New-DbaClientAlias.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaClientAlias](https://dataplat.github.io/boh#New-DbaClientAlias).

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

Creates a new TCP alias on the local workstation called sp, which points sqlcluster\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaClientAlias -ServerName 'sqlcluster,14443' -Alias spinstance
```

Creates a new TCP alias on the local workstation called spinstance, which points to sqlcluster, port 14443.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp -Protocol NamedPipes
```

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
