---
title: "Import-DbaPfDataCollectorSetTemplate"
slug: "Import-DbaPfDataCollectorSetTemplate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates Windows Performance Monitor data collector sets with SQL Server-specific performance counters from predefined templates."
tags:
  - "Performance"
  - "DataCollector"
  - "PerfCounter"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaPfDataCollectorSetTemplate.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaPfDataCollectorSetTemplate"
draft: false
---

# Import-DbaPfDataCollectorSetTemplate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbaPfDataCollectorSetTemplate](https://github.com/dataplat/dbatools/blob/master/public/Import-DbaPfDataCollectorSetTemplate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbaPfDataCollectorSetTemplate](https://dataplat.github.io/boh#Import-DbaPfDataCollectorSetTemplate).

## Synopsis

Creates Windows Performance Monitor data collector sets with SQL Server-specific performance counters from predefined templates.

## Description

Creates Windows Performance Monitor data collector sets using XML templates containing SQL Server performance counters. This eliminates the need to manually configure dozens of performance counters through the Performance Monitor GUI. The function can use built-in templates from the dbatools repository (like 'Long Running Query' or 'db_ola_health') or custom XML template files you specify.  
  
Performance counters are automatically configured for all SQL Server instances detected on the target machine. When multiple instances exist, the function duplicates relevant counters for each instance so you get complete coverage across your SQL Server environment.  
  
Requires local administrator privileges on the target computer when importing data collector sets.  
  
See https://msdn.microsoft.com/en-us/library/windows/desktop/aa371952 for more information

## Syntax

```powershell
Import-DbaPfDataCollectorSetTemplate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-DisplayName] <String>]
    [-SchedulesEnabled]
    [[-RootPath] <String>]
    [-Segment]
    [[-SegmentMaxDuration] <Int32>]
    [[-SegmentMaxSize] <Int32>]
    [[-Subdirectory] <String>]
    [[-SubdirectoryFormat] <Int32>]
    [[-SubdirectoryFormatPattern] <String>]
    [[-Task] <String>]
    [-TaskRunAsSelf]
    [[-TaskArguments] <String>]
    [[-TaskUserTextArguments] <String>]
    [-StopOnCompletion]
    [[-Path] <String[]>]
    [[-Template] <String[]>]
    [[-Instance] <String[]>]
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
PS C:\> Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Template 'Long Running Query'
```

Creates a new data collector set named 'Long Running Query' from the dbatools repository on the SQL Server sql2017.<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Template 'Long Running Query' -DisplayName 'New Long running query' -Confirm
```

Creates a new data collector set named "New Long Running Query" using the 'Long Running Query' template. Forces a confirmation if the template exists.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPfDataCollectorSet -ComputerName sql2017 -Session db_ola_health | Remove-DbaPfDataCollectorSet
```

Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Template db_ola_health | Start-DbaPfDataCollectorSet<br>
Imports a session if it exists, then recreates it using a template.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaPfDataCollectorSetTemplate | Out-GridView -PassThru | Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017
```

Allows you to select a Session template then import to an instance named sql2017.<br>

#####  Example:  5 

```powershell
PS C:\> Import-DbaPfDataCollectorSetTemplate -ComputerName sql2017 -Template 'Long Running Query' -Instance SHAREPOINT
```

Creates a new data collector set named 'Long Running Query' from the dbatools repository on the SQL Server sql2017 for both the default and the SHAREPOINT instance.<br>
If you'd like to remove counters for the default instance, use Remove-DbaPfDataCollectorCounter.<br>

### Optional Parameters

##### -ComputerName

Specifies the Windows server where the Performance Monitor data collector set will be created. Defaults to the local machine.  
Use this when monitoring SQL Server instances on remote servers or when centralizing performance monitoring from a management workstation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to servers using alternative credentials. To use:  
$scred = Get-Credential, then pass $scred object to the -Credential parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisplayName

Sets the display name for the data collector set as it appears in Performance Monitor. Defaults to the template name.  
Use this to create meaningful names when deploying multiple collector sets or to distinguish between environments like 'Prod-SQL-Perf' or 'Dev-Query-Analysis'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SchedulesEnabled

Enables scheduled data collection for the collector set if defined in the template. When disabled, the collector set must be started manually.  
Use this switch when you want the collector set to automatically start and stop based on predefined schedules rather than manual intervention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -RootPath

Specifies the base directory where performance log files will be stored. Defaults to %systemdrive%\PerfLogs\Admin\[CollectorSetName].  
Change this when you need to store performance logs on a different drive with more space or faster storage for high-frequency data collection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Segment

Enables automatic log file segmentation when maximum file size or duration limits are reached during data collection.  
Use this to prevent single log files from becoming too large and to maintain manageable file sizes for analysis tools and storage management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SegmentMaxDuration

Specifies the maximum time duration (in seconds) before a new log file is created during data collection. Requires -Segment to be enabled.  
Set this to control how long each performance log file covers, which helps with organizing data by time periods for analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SegmentMaxSize

Specifies the maximum size (in bytes) for each performance log file before a new file is created. Requires -Segment to be enabled.  
Set this to prevent individual log files from consuming excessive disk space and to maintain consistent file sizes for easier management.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Subdirectory

Specifies a subdirectory name under the root path where log files will be stored for this collector set instance.  
Use this to organize performance logs by purpose, environment, or time period within your monitoring directory structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SubdirectoryFormat

Controls how Performance Monitor decorates the subdirectory name with timestamp information. Uses numeric flags where 3 includes day/hour formatting.  
This automatically creates time-stamped subdirectories to organize log files chronologically, making it easier to locate performance data from specific time periods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 3 |

##### -SubdirectoryFormatPattern

Specifies the timestamp format pattern used for decorating subdirectory names. Default is 'yyyyMMdd\-NNNNNN' (year-month-day-sequence).  
Customize this pattern when you need specific date/time formatting for your log file organization or to match existing naming conventions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | yyyyMMdd\-NNNNNN |

##### -Task

Specifies a Windows Task Scheduler job name to execute automatically when the data collector set stops or between log segments.  
Use this to trigger post-processing tasks like data analysis scripts, log file compression, or alerting when performance data collection completes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TaskRunAsSelf

Forces the scheduled task to run using the same user account as the data collector set rather than the account specified in the task definition.  
Use this when you need consistent security context between data collection and post-processing tasks for file access permissions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -TaskArguments

Specifies command-line arguments to pass to the scheduled task when it executes after data collection stops.  
Use this to pass parameters like log file paths, collection timestamps, or processing options to your post-collection analysis scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TaskUserTextArguments

Provides replacement text for the {usertext} placeholder variable in task arguments when the scheduled task executes.  
Use this to dynamically pass environment-specific information like server names, database names, or custom identifiers to your post-processing tasks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StopOnCompletion

Automatically stops the data collector set when all individual data collectors within the set have finished their collection tasks.  
Use this switch when you want the collector set to terminate cleanly after completing defined collection tasks rather than running indefinitely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Path

Specifies the file path to custom XML template files containing performance counter definitions. Accepts multiple file paths.  
Use this when you have custom performance monitoring templates or need to import templates from sources other than the built-in dbatools repository.

| Property | Value |
| --- | --- |
| Alias | FullName |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Template

Selects predefined performance monitoring templates from the dbatools repository such as 'Long Running Query' or 'db_ola_health'. Press Tab to see available options.  
Use this for quick deployment of SQL Server-specific performance monitoring without creating custom XML templates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Instance

Specifies additional SQL Server named instances to include in performance monitoring beyond the default instance. The template applies to all detected instances by default.  
Use this when you have multiple SQL Server instances on a server and want to add specific named instances like 'SHAREPOINT' or 'REPORTING' to the monitoring scope.

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
