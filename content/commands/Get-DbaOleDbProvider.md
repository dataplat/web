---
title: "Get-DbaOleDbProvider"
slug: "Get-DbaOleDbProvider"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves OLE DB provider configurations registered with SQL Server for linked servers and distributed queries"
tags:
  - "General"
  - "OLEDB"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOleDbProvider.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaOleDbProvider"
draft: false
---

# Get-DbaOleDbProvider

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaOleDbProvider](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOleDbProvider.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaOleDbProvider](https://dataplat.github.io/boh#Get-DbaOleDbProvider).

## Synopsis

Retrieves OLE DB provider configurations registered with SQL Server for linked servers and distributed queries

## Description

Returns the OLE DB providers that SQL Server knows about and can use for external data connections like linked servers, distributed queries, and OPENROWSET operations. This is essential for auditing your server's connectivity capabilities and troubleshooting linked server connection issues. The function shows provider details including security settings like AllowInProcess and DisallowAdHocAccess, which control how SQL Server can use each provider. Use this when setting up linked servers or diagnosing why certain external data sources aren't accessible.

## Syntax

```powershell
Get-DbaOleDbProvider
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Provider] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaOleDbProvider -SqlInstance SqlBox1\Instance2
```

Returns a list of all OleDb providers on SqlBox1\Instance2<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaOleDbProvider -SqlInstance SqlBox1\Instance2 -Provider SSISOLEDB
```

Returns the SSISOLEDB provider on SqlBox1\Instance2<br>

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

##### -Provider

Filters results to specific OLE DB provider names. Accepts an array of provider names for targeting multiple providers.  
Use this when you need to check configuration for specific providers like SQLNCLI11 or MSDASQL instead of listing all available providers.

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
