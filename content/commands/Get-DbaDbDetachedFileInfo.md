---
title: "Get-DbaDbDetachedFileInfo"
slug: "Get-DbaDbDetachedFileInfo"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Reads detached SQL Server database files to extract metadata and file structure without attaching them."
tags:
  - "Database"
  - "Detach"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDetachedFileInfo.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbDetachedFileInfo"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbDetachedFileInfo</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDetachedFileInfo.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Reads detached SQL Server database files to extract metadata and file structure without attaching them.

## Description

Analyzes detached MDF files to retrieve essential database metadata including name, SQL Server version, collation, and complete file structure. This lets you examine database files sitting in storage or archives without the risk of attaching them to a live instance.  
  
Perfect for migration planning when you need to verify compatibility before moving databases between SQL Server versions. Also invaluable for troubleshooting scenarios where you have detached database files and need to understand their structure or requirements before reattachment.  
  
The function reads the MDF file header using SQL Server's built-in methods, so it requires an online SQL Server instance to interpret the binary data. All file paths must be accessible to the specified SQL Server service account.  
  
Returns comprehensive details including the original database name, exact SQL Server version (mapped from internal version numbers), collation settings, and complete lists of associated data and log files as they existed when detached.

## Syntax

```powershell
Get-DbaDbDetachedFileInfo
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Path] <String[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbDetachedFileInfo -SqlInstance sql2016 -Path M:\Archive\mydb.mdf
```
{: data-copyable="true" data-clean-code="Get-DbaDbDetachedFileInfo -SqlInstance sql2016 -Path M:\Archive\mydb.mdf" }

Returns information about the detached database file M:\Archive\mydb.mdf using the SQL Server instance sql2016. The M drive is relative to the SQL Server instance.<br>

### Required Parameters

##### -SqlInstance

Source SQL Server. This instance must be online and is required to parse the information contained with in the detached database file.  
This function will not attach the database file, it will only use SQL Server to read its contents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the full file path to one or more detached MDF database files to analyze. The SQL Server service account must have read access to these file locations.  
Use this when you need to examine database files in archives, backups, or migration staging areas before deciding whether to attach them.  
Supports multiple file paths and accepts wildcards, but each MDF file must be accessible from the specified SQL Server instance.

| Property | Value |
| --- | --- |
| Alias | Mdf,FilePath,FullName |
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
