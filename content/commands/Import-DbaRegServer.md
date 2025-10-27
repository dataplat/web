---
title: "Import-DbaRegServer"
slug: "Import-DbaRegServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Imports registered servers and server groups into SQL Server Central Management Server from XML files, other CMS instances, or custom objects"
tags:
  - "RegisteredServer"
  - "CMS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaRegServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaRegServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Import-DbaRegServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Import-DbaRegServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Imports registered servers and server groups into SQL Server Central Management Server from XML files, other CMS instances, or custom objects

## Description

Imports registered servers and server groups into a SQL Server Central Management Server (CMS) from multiple sources including exported XML files, other CMS instances, or custom objects like CSVs. The function automatically creates missing server groups during import and supports importing to specific group locations within the CMS hierarchy. This is essential for migrating CMS configurations between environments, consolidating server inventories from multiple sources, or bulk-loading server lists into a new CMS setup.

## Syntax

```powershell
Import-DbaRegServer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String[]>]
    [[-InputObject] <Object[]>]
    [[-Group] <Object>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Import-DbaRegServer -SqlInstance sql2012 -Path C:\temp\corp-regservers.xml
```
{: data-copyable="true" data-clean-code="Import-DbaRegServer -SqlInstance sql2012 -Path C:\temp\corp-regservers.xml" }

Imports C:\temp\corp-regservers.xml to the CMS on sql2012<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaRegServer -SqlInstance sql2008 -Group hr\Seattle -Path C:\temp\Seattle.xml
```
{: data-copyable="true" data-clean-code="Import-DbaRegServer -SqlInstance sql2008 -Group hr\Seattle -Path C:\temp\Seattle.xml" }

Imports C:\temp\Seattle.xml to Seattle subgroup within the hr group on sql2008<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2008, sql2012 | Import-DbaRegServer -SqlInstance sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sql2008, sql2012 | Import-DbaRegServer -SqlInstance sql2017" }

Imports all registered servers from sql2008 and sql2012 to sql2017<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaRegServerGroup -SqlInstance sql2008 -Group hr\Seattle | Import-DbaRegServer -SqlInstance sql2017 -Group Seattle
```
{: data-copyable="true" data-clean-code="Get-DbaRegServerGroup -SqlInstance sql2008 -Group hr\Seattle | Import-DbaRegServer -SqlInstance sql2017 -Group Seattle" }

Imports all registered servers from the hr\Seattle group on sql2008 to the Seattle group on sql2017<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Path

Specifies the file path to XML files containing exported registered server configurations from SQL Server Management Studio or Export-DbaRegServer.  
Use this when migrating CMS configurations between environments or restoring server lists from backup exports.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts registered server objects, server group objects, or custom objects like CSV data for bulk import operations. Supports piping from Get-DbaRegServer and Get-DbaRegServerGroup cmdlets.  
When importing from CSV or custom objects, ServerName column is required while Name, Description, and Group columns are optional. Use this for consolidating servers from multiple CMS instances or   
bulk-loading server inventories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Group

Specifies the target group within the CMS hierarchy where servers will be imported. Accepts group paths using backslash notation like "hr\Seattle" or ServerGroup objects from Get-DbaRegServerGroup.  
Use this when you need to organize imported servers into specific groups rather than importing to the root level.

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
