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

# Set-DbaErrorLogConfig

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaErrorLogConfig](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaErrorLogConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaErrorLogConfig](https://dataplat.github.io/boh#Set-DbaErrorLogConfig).

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

Sets the number of error log files to 25 on sql2017 and sql2014<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaErrorLogConfig -SqlInstance sql2014 -LogSize 102400
```

Sets the size of the error log file, before it rolls over, to 102400 KB (100 MB) on sql2014<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaErrorLogConfig -SqlInstance sql2012 -LogCount 25 -LogSize 500
```

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
