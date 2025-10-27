---
title: "Export-DbaXESession"
slug: "Export-DbaXESession"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL creation scripts for Extended Events sessions to files or console"
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaXESession.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaXESession"
draft: false
---

# Export-DbaXESession

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaXESession](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaXESession.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaXESession](https://dataplat.github.io/boh#Export-DbaXESession).

## Synopsis

Generates T-SQL creation scripts for Extended Events sessions to files or console

## Description

Generates T-SQL scripts that can recreate your Extended Events sessions, making it easy to migrate monitoring configurations between environments or create backups of your XE session definitions. This is particularly useful when moving sessions from development to production, creating deployment scripts, or documenting your current monitoring setup for compliance purposes. The function connects to your SQL Server instances, retrieves the session definitions, and outputs the complete CREATE EVENT SESSION statements with all events, actions, targets, and configuration settings intact.

## Syntax

```powershell
Export-DbaXESession
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <Session[]>]
    [[-Session] <String[]>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Encoding] <String>]
    [-Passthru]
    [[-BatchSeparator] <String>]
    [-NoPrefix]
    [-NoClobber]
    [-Append]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaXESession -SqlInstance sourceserver -Passthru
```

Exports a script to create all Extended Events Sessions on sourceserver to the console<br>
Will include prefix information containing creator and datetime. and uses the default value for BatchSeparator value from configuration Formatting.BatchSeparator<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaXESession -SqlInstance sourceserver
```

Exports a script to create all Extended Events Sessions on sourceserver. As no Path was defined - automatically determines filename based on the Path.DbatoolsExport configuration setting, current <br>
time and server name like Servername-YYYYMMDDhhmmss-sp_configure.sql<br>
Will include prefix information containing creator and datetime. and uses the default value for BatchSeparator value from configuration Formatting.BatchSeparator<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaXESession -SqlInstance sourceserver -FilePath C:\temp
```

Exports a script to create all Extended Events Sessions on sourceserver to the directory C:\temp using the default name format of Servername-YYYYMMDDhhmmss-sp_configure.sql<br>
Will include prefix information containing creator and datetime. and uses the default value for BatchSeparator value from configuration Formatting.BatchSeparator<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Export-DbaXESession -SqlInstance sourceserver -SqlCredential $cred -FilePath C:\temp\EEvents.sql -BatchSeparator "" -NoPrefix -NoClobber
```

Exports a script to create all Extended Events Sessions on sourceserver to the file C:\temp\EEvents.sql.<br>
Will exclude prefix information containing creator and datetime and does not include a BatchSeparator<br>
Will not overwrite file if it already exists<br>

#####  Example:  5 

```powershell
PS C:\> 'Server1', 'Server2' | Export-DbaXESession -FilePath 'C:\Temp\EE.sql' -Append
```

Exports a script to create all Extended Events Sessions for Server1 and Server2 using pipeline.<br>
Writes to a single file using the Append switch<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaXESession -SqlInstance Server1, Server2 -Session system_health | Export-DbaXESession -Path 'C:\Temp'
```

Exports a script to create the System_Health Extended Events Sessions for Server1 and Server2 using pipeline.<br>
Write to the directory C:\temp using the default name format of Servername-YYYYMMDDhhmmss-sp_configure.sql<br>
Will include prefix information containing creator and datetime. and uses the default value for BatchSeparator value from configuration Formatting.BatchSeparator<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.  
Server version must be SQL Server version 2008 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

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

##### -InputObject

Accepts Extended Event session objects from Get-DbaXESession for pipeline processing. Use this when you already have session objects loaded and want to export specific sessions without re-querying   
the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Session

Specifies specific Extended Event session names to export instead of all sessions. Accepts multiple session names and supports wildcards for pattern matching. Use this when you only need to export   
specific monitoring configurations rather than all sessions on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the output directory for the generated T-SQL scripts. Creates automatically named files using the format ServerName-YYYYMMDDHHMMSS-xe.sql. Use this when you want files organized in a   
specific directory with consistent naming for multiple servers or scheduled exports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Sets the exact file path and name for the output script. Use this when you need precise control over the output file location and naming. When exporting from multiple servers to a single file, you   
must also use -Append to prevent data loss from overwriting.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Encoding

Controls the character encoding for the output file. Defaults to UTF8 which handles international characters properly. Use ASCII only if you need compatibility with older systems that don't support   
Unicode. Use Unicode (UTF-16) if required by specific deployment tools or when working with non-Latin scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -Passthru

Displays the generated T-SQL script in the console instead of writing to a file. Use this for immediate review of the session definitions, copying to clipboard, or redirecting to other tools in your   
PowerShell pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the T-SQL batch separator in the output script, typically "GO". Use an empty string to remove batch separators when the target environment doesn't support them, or customize for specific   
deployment tools that require different separators.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Formatting.BatchSeparator') |

##### -NoPrefix

Removes the header comments that identify when and who created the script. Use this when you need clean T-SQL scripts without metadata comments, or when scripts will be version controlled and you   
want to avoid unnecessary differences between exports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoClobber

Prevents overwriting an existing file when using -FilePath. The function will stop with an error if the target file already exists. Use this as a safety check when you want to ensure you don't   
accidentally replace important script files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds new content to an existing file instead of overwriting when using -FilePath. Required when exporting sessions from multiple servers to a single consolidated script file. Use this to build   
comprehensive deployment scripts that include sessions from multiple SQL Server instances.

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


&nbsp;
