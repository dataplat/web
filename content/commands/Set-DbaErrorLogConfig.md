---
title: "Set-DbaErrorLogConfig"
slug: "Set-DbaErrorLogConfig"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server error log retention and size rollover settings"
tags:
  - "Instance"
  - "ErrorLog"
  - "Logging"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaErrorLogConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaErrorLogConfig"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaErrorLogConfig</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaErrorLogConfig.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Shawn Melton (@wsmelton), wsmelton.github.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Configures SQL Server error log retention and size rollover settings

## Description

Configures how SQL Server manages its error log files by setting retention count and automatic rollover size. You can specify how many error log files to keep (6-99) across all SQL Server versions, and set the file size limit in KB for automatic rollover on SQL Server 2012 and later.  
  
This helps DBAs manage disk space and ensure adequate error log history for troubleshooting without manual intervention. When a log file reaches the specified size limit, SQL Server automatically creates a new error log and archives the previous one.  
  
To set the Path to the ErrorLog, use Set-DbaStartupParameter -ErrorLog. Note that this command requires  
remote, administrative access to the Windows/WMI server, similar to SQL Configuration Manager.

## Syntax

```powershell
Set-DbaErrorLogConfig
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-LogCount] <Int32>]
    [[-LogSize] <Int32>]
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
PS C:\> Set-DbaErrorLogConfig -SqlInstance sql2017,sql2014 -LogCount 25
```
{: data-copyable="true" data-clean-code="Set-DbaErrorLogConfig -SqlInstance sql2017,sql2014 -LogCount 25" }

Sets the number of error log files to 25 on sql2017 and sql2014<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaErrorLogConfig -SqlInstance sql2014 -LogSize 102400
```
{: data-copyable="true" data-clean-code="Set-DbaErrorLogConfig -SqlInstance sql2014 -LogSize 102400" }

Sets the size of the error log file, before it rolls over, to 102400 KB (100 MB) on sql2014<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaErrorLogConfig -SqlInstance sql2012 -LogCount 25 -LogSize 500
```
{: data-copyable="true" data-clean-code="Set-DbaErrorLogConfig -SqlInstance sql2012 -LogCount 25 -LogSize 500" }

Sets the number of error log files to 25 and size before it will roll over to 500 KB on sql2012<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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

##### -LogCount

Sets the number of error log files SQL Server retains before deleting the oldest ones. Must be between 6 and 99.  
Use this to balance disk space with troubleshooting history - more files provide longer history but consume more disk space.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -LogSize

Sets the maximum size in KB for each error log file before SQL Server automatically creates a new log file. Only available on SQL Server 2012 and later.  
Use this to prevent error logs from growing too large and to ensure regular log rotation without manual intervention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

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
