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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaOleDbProvider</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaOleDbProvider.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaOleDbProvider -SqlInstance SqlBox1\Instance2" }

Returns a list of all OleDb providers on SqlBox1\Instance2<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaOleDbProvider -SqlInstance SqlBox1\Instance2 -Provider SSISOLEDB
```
{: data-copyable="true" data-clean-code="Get-DbaOleDbProvider -SqlInstance SqlBox1\Instance2 -Provider SSISOLEDB" }

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
