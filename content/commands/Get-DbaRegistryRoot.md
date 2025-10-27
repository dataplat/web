---
title: "Get-DbaRegistryRoot"
slug: "Get-DbaRegistryRoot"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Discovers Windows registry root paths for SQL Server instances to enable direct registry configuration access"
tags:
  - "Management"
  - "OS"
  - "Registry"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegistryRoot.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaRegistryRoot"
draft: false
---

# Get-DbaRegistryRoot

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaRegistryRoot](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaRegistryRoot.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaRegistryRoot](https://dataplat.github.io/boh#Get-DbaRegistryRoot).

## Synopsis

Discovers Windows registry root paths for SQL Server instances to enable direct registry configuration access

## Description

Queries SQL Server WMI to locate the exact Windows registry hive path where each SQL Server instance stores its configuration settings. This eliminates the guesswork when you need to manually edit registry keys for troubleshooting startup issues, modifying trace flags, or automating configuration changes that aren't exposed through T-SQL or SQL Server Configuration Manager. The function handles both standalone instances and failover cluster instances, returning PowerShell-ready registry paths you can immediately use with Get-ItemProperty or Set-ItemProperty commands.

## Syntax

```powershell
Get-DbaRegistryRoot
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaRegistryRoot
```

Gets the registry root for all instances on localhost<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegistryRoot -ComputerName server1
```

Gets the registry root for all instances on server1<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer where SQL Server instances are installed. Accepts computer names, IP addresses, or SQL Server instance names which will be parsed to extract the computer name.  
Use this when you need registry root paths for SQL Server instances on remote servers for configuration troubleshooting or automated registry modifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative Windows credentials

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


&nbsp;
