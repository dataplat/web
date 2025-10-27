---
title: "Get-DbaClientAlias"
slug: "Get-DbaClientAlias"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server client aliases from the Windows registry on local or remote computers"
tags:
  - "SqlClient"
  - "Alias"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaClientAlias.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaClientAlias"
draft: false
---

# Get-DbaClientAlias

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaClientAlias](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaClientAlias.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaClientAlias](https://dataplat.github.io/boh#Get-DbaClientAlias).

## Synopsis

Retrieves SQL Server client aliases from the Windows registry on local or remote computers

## Description

Retrieves all configured SQL Server client aliases by reading the Windows registry paths where SQL Server Native Client stores alias definitions. Client aliases allow DBAs to create friendly names that map to actual SQL Server instances, making connection strings simpler and more portable across environments. This is particularly useful when managing multiple instances, non-default ports, or when you need to abstract the actual server names from applications and connection strings.

## Syntax

```powershell
Get-DbaClientAlias
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
PS C:\> Get-DbaClientAlias
```

Gets all SQL Server client aliases on the local computer<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaClientAlias -ComputerName workstationx
```

Gets all SQL Server client aliases on Workstationx<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaClientAlias -ComputerName workstationx -Credential ad\sqldba
```

Logs into workstationx as ad\sqldba then retrieves all SQL Server client aliases on Workstationx<br>

#####  Example:  4 

```powershell
PS C:\> 'Server1', 'Server2' | Get-DbaClientAlias
```

Gets all SQL Server client aliases on Server1 and Server2<br>

### Optional Parameters

##### -ComputerName

Specifies the computer(s) to retrieve SQL Server client aliases from. Accepts multiple computers via pipeline input.  
Use this when you need to audit client alias configurations across multiple workstations or servers in your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to remote computers using alternative credentials

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
