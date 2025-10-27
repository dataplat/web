---
title: "Set-DbaStartupParameter"
slug: "Set-DbaStartupParameter"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Modifies SQL Server startup parameters stored in the Windows registry"
tags:
  - "Startup"
  - "Parameter"
  - "Configure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaStartupParameter.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaStartupParameter"
draft: false
---

# Set-DbaStartupParameter

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaStartupParameter](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaStartupParameter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaStartupParameter](https://dataplat.github.io/boh#Set-DbaStartupParameter).

## Synopsis

Modifies SQL Server startup parameters stored in the Windows registry

## Description

Changes the startup parameters that SQL Server uses when the service starts, including paths to master database files, error log location, and various startup flags. These parameters are stored in the Windows registry and require elevated permissions to modify.  
  
This function is commonly used to enable single-user mode for emergency repairs, set trace flags for troubleshooting, relocate system database files during migrations, or adjust memory settings. Changes take effect only after the SQL Server service is restarted.  
  
The function validates file paths when the instance is online to prevent startup failures, but can work offline with the -Force parameter when you need to modify parameters for instances that won't start.  
  
For full details of what each parameter does, please refer to this MSDN article - https://msdn.microsoft.com/en-us/library/ms190737(v=sql.105).aspx

## Syntax

```powershell
Set-DbaStartupParameter
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-MasterData] <String>]
    [[-MasterLog] <String>]
    [[-ErrorLog] <String>]
    [[-TraceFlag] <String[]>]
    [-CommandPromptStart]
    [-MinimalStart]
    [[-MemoryToReserve] <Int32>]
    [-SingleUser]
    [[-SingleUserDetails] <String>]
    [-NoLoggingToWinEvents]
    [-StartAsNamedInstance]
    [-DisableMonitoring]
    [-IncreasedExtents]
    [-TraceFlagOverride]
    [[-StartupConfig] <Object>]
    [-Offline]
    [-Force]
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
PS C:\> Set-DbaStartupParameter -SqlInstance server1\instance1 -SingleUser
```

Will configure the SQL Instance server1\instance1 to startup up in Single User mode at next startup<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance sql2016 -IncreasedExtents
```

Will configure the SQL Instance sql2016 to IncreasedExtents = True (-E)<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance sql2016  -IncreasedExtents:$false -WhatIf
```

Shows what would happen if you attempted to configure the SQL Instance sql2016 to IncreasedExtents = False (no -E)<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance server1\instance1 -TraceFlag 8032,8048
```

This will append Trace Flags 8032 and 8048 to the startup parameters<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance sql2016 -SingleUser:$false -TraceFlagOverride
```

This will remove all trace flags and set SingleUser to false<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance server1\instance1 -SingleUser -TraceFlag 8032,8048 -TraceFlagOverride
```

This will set Trace Flags 8032 and 8048 to the startup parameters, removing any existing Trace Flags<br>

#####  Example:  7 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance sql2016 -SingleUser:$false -TraceFlagOverride -Offline
```

This will remove all trace flags and set SingleUser to false from an offline instance<br>

#####  Example:  8 

```powershell
PS C:\> Set-DbaStartupParameter -SqlInstance sql2016 -ErrorLog c:\Sql\ -Offline
```

This will attempt to change the ErrorLog path to c:\sql\. However, with the offline switch this will not happen. To force it, use the -Force switch like so:<br>
Set-DbaStartupParameter -SqlInstance sql2016 -ErrorLog c:\Sql\ -Offline -Force<br>

#####  Example:  9 

```powershell
PS C:\> $StartupConfig = Get-DbaStartupParameter -SqlInstance server1\instance1
PS C:\> Set-DbaStartupParameter -SqlInstance server1\instance1 -SingleUser -NoLoggingToWinEvents
PS C:\> #Restart your SQL instance with the tool of choice
PS C:\> #Do Some work
PS C:\> Set-DbaStartupParameter -SqlInstance server1\instance1 -StartupConfig $StartupConfig
PS C:\> #Restart your SQL instance with the tool of choice and you're back to normal
```

In this example we take a copy of the existing startup configuration of server1\instance1<br>
We then change the startup parameters ahead of some work<br>
After the work has been completed, we can push the original startup parameters back to server1\instance1 and resume normal operation<br>

### Required Parameters

##### -SqlInstance

The SQL Server instance to be modified  
If the Sql Instance is offline path parameters will be ignored as we cannot test the instance's access to the path. If you want to force this to work then please use the Force switch

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

##### -Credential

Windows Credential with permission to log on to the server running the SQL instance

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MasterData

Specifies the file path to the master database data file (master.mdf). Required when relocating system databases or recovering from corrupted system files.  
Use this when moving SQL Server installations, restoring from backup to different locations, or troubleshooting startup issues caused by missing or corrupted master database files. The path must be   
accessible by the SQL Server service account.  
Will be ignored if SqlInstance is offline unless the Force parameter is used, as the function validates the path accessibility when the instance is online.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MasterLog

Specifies the file path to the master database log file (mastlog.ldf). Required when relocating system databases or recovering from corrupted system files.  
Use this alongside MasterData when moving SQL Server installations or troubleshooting startup failures related to master database corruption. The path must be accessible by the SQL Server service   
account.  
Will be ignored if SqlInstance is offline unless the Force parameter is used, as the function validates the path accessibility when the instance is online.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ErrorLog

Specifies the file path where SQL Server will write its error log files. Controls where diagnostic information, startup messages, and error details are stored.  
Use this when you need to redirect error logs to a different drive for space management, centralized logging, or compliance requirements. The directory must exist and be writable by the SQL Server   
service account.  
Will be ignored if SqlInstance is offline unless the Force parameter is used, as the function validates the path accessibility when the instance is online.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TraceFlag

Specifies one or more trace flags to enable at SQL Server startup as a comma-separated list. Trace flags control specific SQL Server behaviors and diagnostic features.  
Use this for enabling global trace flags like 1117 (uniform extent allocations), 1118 (reduce tempdb contention), or 3226 (suppress successful backup messages). By default, these flags are appended   
to existing trace flags.  
Use TraceFlagOverride parameter to replace all existing trace flags instead of appending to them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CommandPromptStart

Enables faster startup when SQL Server is launched from command prompt rather than as a Windows service. Bypasses Service Control Manager initialization routines.  
Use this when you need to start SQL Server manually for troubleshooting or testing scenarios where you'll be running sqlservr.exe directly from command line instead of using service management tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MinimalStart

Starts SQL Server with minimal configuration, loading only essential components and services. Automatically places the instance in single-user mode with reduced functionality.  
Use this when SQL Server won't start normally due to configuration problems like excessive memory allocation, corrupted configuration settings, or problematic startup procedures. Essential for   
emergency recovery scenarios.  
Note that many features will be unavailable in minimal start mode, making it suitable only for troubleshooting and corrective actions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MemoryToReserve

Specifies the amount of memory in megabytes to reserve outside the SQL Server buffer pool for system components and extended procedures.  
Use this when experiencing out-of-memory errors related to extended procedures, OLE DB providers, or CLR assemblies, especially on systems with large amounts of RAM allocated to SQL Server. The   
reserved memory hosts DLL files, distributed query providers, and automation objects.  
Default value is 256 MB, but you may need to increase this on servers with heavy use of extended procedures or CLR integration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SingleUser

Starts SQL Server in single-user mode, allowing only one connection at a time. Prevents other users and applications from connecting to the instance.  
Use this for emergency maintenance, database recovery operations, or when you need exclusive access to troubleshoot corruption or perform administrative tasks that require isolation.  
Combine with SingleUserDetails parameter to restrict access to a specific login for additional security during maintenance windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SingleUserDetails

Specifies which login or application can connect when SQL Server is in single-user mode. Restricts the single connection to a specific user account.  
Use this to ensure only authorized personnel can access the instance during maintenance windows, preventing applications or other users from grabbing the single available connection.  
Can specify a login name, domain account, or application name. Automatically quoted if the value contains spaces.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoLoggingToWinEvents

Disables SQL Server from writing startup and shutdown messages to the Windows Application Event Log. Only affects system event logging, not SQL Server error log files.  
Use this to reduce event log clutter in environments with frequent SQL Server restarts or when centralized logging systems capture SQL Server events through other means.  
SQL Server will continue writing to its own error log files regardless of this setting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StartAsNamedInstance

Enables starting a named instance of SQL Server, ensuring proper instance identification and network connectivity for non-default instances.  
Use this when configuring startup parameters for named instances that need to be explicitly identified during startup to avoid conflicts with default instances or other named instances on the same   
server.  
Required for named instances to register properly with SQL Server Browser service and establish correct network endpoints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableMonitoring

Disables SQL Server's internal performance monitoring and statistics collection to reduce overhead on high-performance systems.  
Use this only on production systems where every bit of performance matters and you have alternative monitoring solutions in place. Disables PerfMon counters, CPU statistics, cache-hit ratios, DBCC   
SQLPERF data, some DMVs, and many extended events.  
Warning: This significantly reduces your ability to diagnose performance issues and should only be used when monitoring overhead is confirmed to impact critical workloads.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncreasedExtents

Increases the number of extents allocated for each file in a file group, improving allocation efficiency for databases with multiple data files.  
Use this on systems with multiple data files per filegroup to reduce allocation contention and improve performance during heavy insert/update operations.  
Particularly beneficial for tempdb configurations with multiple data files or user databases designed with multiple files for performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -TraceFlagOverride

Replaces all existing trace flags with only the ones specified in the TraceFlag parameter. Without this switch, new trace flags are appended to existing ones.  
Use this when you need to completely reset the trace flag configuration or remove problematic trace flags that are causing issues.  
If no TraceFlag values are provided with this switch, all existing trace flags will be removed from the startup parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -StartupConfig

Applies a complete startup configuration object previously captured with Get-DbaStartupParameter. Restores all startup parameters to match the saved configuration.  
Use this to quickly restore previous startup configurations after troubleshooting, rollback changes during maintenance, or standardize startup parameters across multiple instances.  
Automatically enables TraceFlagOverride, so all existing trace flags will be replaced with those from the saved configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Offline

Performs startup parameter changes without attempting to connect to the SQL Server instance, improving performance when you know the instance is not running.  
Use this when modifying startup parameters for instances that are intentionally stopped or when you want to avoid connection overhead on known offline instances.  
When using this switch, file path parameters (MasterData, MasterLog, ErrorLog) cannot be validated and will be ignored unless the Force parameter is also specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Bypasses file path validation for MasterData, MasterLog, and ErrorLog parameters, allowing changes even when paths cannot be verified.  
Use this when configuring startup parameters for offline instances or when you need to set paths that will be valid after a restart but are not currently accessible.  
Exercise caution as invalid paths will prevent SQL Server from starting, requiring manual registry editing to correct.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
