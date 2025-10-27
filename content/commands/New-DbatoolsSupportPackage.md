---
title: "New-DbatoolsSupportPackage"
slug: "New-DbatoolsSupportPackage"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Creates a comprehensive diagnostic package for troubleshooting dbatools module issues and bugs."
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbatoolsSupportPackage.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbatoolsSupportPackage"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbatoolsSupportPackage</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbatoolsSupportPackage.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates a comprehensive diagnostic package for troubleshooting dbatools module issues and bugs.

## Description

This function creates an extensive diagnostic package specifically designed to help the dbatools team troubleshoot module-related issues, bugs, or unexpected behavior. When you encounter problems with dbatools commands or need to submit a bug report, this package provides all the environmental and runtime information needed for effective debugging.  
  
The resulting compressed file contains comprehensive system and PowerShell environment details that are essential for reproducing and diagnosing issues. This saves you from manually collecting multiple pieces of information and ensures nothing important gets missed when reporting problems.  
  
The package includes:  
- Operating system and hardware information (CPU, RAM, OS version)  
- PowerShell and .NET framework versions and loaded modules  
- Your PowerShell command history from the current session  
- dbatools internal message and error logs  
- Complete console buffer contents (everything currently visible in your PowerShell window)  
- Loaded assemblies and their versions  
- Any additional variables you specify  
  
The output file is automatically created on your desktop (or home directory if desktop doesn't exist) as a timestamped ZIP archive. Always start a fresh PowerShell session and reproduce the minimal steps to trigger your issue before running this command - this keeps the diagnostic data focused and avoids including unrelated information or sensitive data from your session history.

## Syntax

```powershell
New-DbatoolsSupportPackage
    [[-Path] <String>]
    [[-Variables] <String[]>]
    [-PassThru]
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
PS C:\> New-DbatoolsSupportPackage
```
{: data-copyable="true" data-clean-code="New-DbatoolsSupportPackage" }

Creates a large support pack in order to help us troubleshoot stuff.<br>

### Optional Parameters

##### -Path

Specifies the directory where the support package ZIP file will be created. Defaults to your desktop, or home directory if desktop doesn't exist.  
Use this when you need the diagnostic file saved to a specific location for easier access or compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | "$($env:USERPROFILE)\Desktop" |

##### -Variables

Specifies additional PowerShell variables to include in the diagnostic package by name. Only captures variables that exist in your current session.  
Use this when specific variables contain connection strings, configuration settings, or data relevant to reproducing your issue.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PassThru

Returns the FileInfo object for the created ZIP file instead of just displaying its location.  
Use this when you need to programmatically work with the support package file, such as uploading it automatically or getting its size.

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
