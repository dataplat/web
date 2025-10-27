---
title: "Get-DbaMaintenanceSolutionLog"
slug: "Get-DbaMaintenanceSolutionLog"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@powerdbaklaas) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Parses IndexOptimize text log files from Ola Hallengren's MaintenanceSolution when database logging is disabled."
tags:
  - "Community"
  - "OlaHallengren"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMaintenanceSolutionLog.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaMaintenanceSolutionLog"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaMaintenanceSolutionLog</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMaintenanceSolutionLog.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Klaas Vandenberghe (@powerdbaklaas) , Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Parses IndexOptimize text log files from Ola Hallengren's MaintenanceSolution when database logging is disabled.

## Description

Retrieves detailed execution information from IndexOptimize text log files when LogToTable='N' is configured in Ola Hallengren's MaintenanceSolution. This function parses the text files written to the SQL Server instance's log directory, extracting index operation details including start times, duration, fragmentation levels, and any errors encountered.  
  
This command specifically targets scenarios where database logging is disabled and only file-based logging is available. The parsed output includes granular details about each index operation, such as the specific ALTER INDEX commands executed, statistics updates, partition information, and operation outcomes.  
  
Be aware that this command only works if sqlcmd is used to execute the procedures, which is a legacy method not used by newer installations. Currently, only IndexOptimize log parsing is supported - DatabaseBackup and DatabaseIntegrityCheck parsing are not yet available.  
  
For modern deployments, we recommend using Install-DbaMaintenanceSolution and configuring procedures with LogToTable='Y' to enable database-based logging, which provides more reliable access to maintenance history.

## Syntax

```powershell
Get-DbaMaintenanceSolutionLog
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-LogType] <String[]>]
    [[-Since] <DateTime>]
    [[-Path] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a
```
{: data-copyable="true" data-clean-code="Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a" }

Gets the outcome of the IndexOptimize job on sql instance sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -SqlCredential $credential
```
{: data-copyable="true" data-clean-code="Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -SqlCredential $credential" }

Gets the outcome of the IndexOptimize job on sqlserver2014a, using SQL Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> 'sqlserver2014a', 'sqlserver2020test' | Get-DbaMaintenanceSolutionLog
```
{: data-copyable="true" data-clean-code="'sqlserver2014a', 'sqlserver2020test' | Get-DbaMaintenanceSolutionLog" }

Gets the outcome of the IndexOptimize job on sqlserver2014a and sqlserver2020test.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Path 'D:\logs\maintenancesolution\'
```
{: data-copyable="true" data-clean-code="Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Path 'D:\logs\maintenancesolution\'" }

Gets the outcome of the IndexOptimize job on sqlserver2014a, reading the log files in their custom location.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Since '2017-07-18'
```
{: data-copyable="true" data-clean-code="Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Since '2017-07-18'" }

Gets the outcome of the IndexOptimize job on sqlserver2014a, starting from july 18, 2017.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -LogType IndexOptimize
```
{: data-copyable="true" data-clean-code="Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -LogType IndexOptimize" }

Gets the outcome of the IndexOptimize job on sqlserver2014a, the other options are not yet available! sorry<br>

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

##### -LogType

Specifies which Ola Hallengren maintenance solution log type to parse from text files. Accepts 'IndexOptimize', 'DatabaseBackup', or 'DatabaseIntegrityCheck'.  
Currently only IndexOptimize parsing is supported - use this when you need to analyze index rebuild and reorganize operations from file-based logs.  
DatabaseBackup and DatabaseIntegrityCheck parsing are planned for future releases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | IndexOptimize |
| Accepted Values | IndexOptimize,DatabaseBackup,DatabaseIntegrityCheck |

##### -Since

Filters log files to include only those created on or after the specified date and time.  
Use this when you need to focus on recent maintenance operations or investigate issues that started after a specific point in time.  
The function examines both the filename timestamp and file creation time to determine which logs to process.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies a custom directory path where maintenance solution log files are stored. Defaults to the SQL Server instance's error log directory.  
Use this when your maintenance solution jobs write logs to a non-standard location, such as a dedicated maintenance logs folder or shared network path.  
The path must be accessible from the machine where you're running the command.

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
