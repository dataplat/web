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

# Get-DbaMaintenanceSolutionLog

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@powerdbaklaas) , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaMaintenanceSolutionLog](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaMaintenanceSolutionLog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaMaintenanceSolutionLog](https://dataplat.github.io/boh#Get-DbaMaintenanceSolutionLog).

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

Gets the outcome of the IndexOptimize job on sql instance sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -SqlCredential $credential
```

Gets the outcome of the IndexOptimize job on sqlserver2014a, using SQL Authentication.<br>

#####  Example:  3 

```powershell
PS C:\> 'sqlserver2014a', 'sqlserver2020test' | Get-DbaMaintenanceSolutionLog
```

Gets the outcome of the IndexOptimize job on sqlserver2014a and sqlserver2020test.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Path 'D:\logs\maintenancesolution\'
```

Gets the outcome of the IndexOptimize job on sqlserver2014a, reading the log files in their custom location.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -Since '2017-07-18'
```

Gets the outcome of the IndexOptimize job on sqlserver2014a, starting from july 18, 2017.<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaMaintenanceSolutionLog -SqlInstance sqlserver2014a -LogType IndexOptimize
```

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
