---
title: "Export-DbaReplServerSetting"
slug: "Export-DbaReplServerSetting"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates T-SQL scripts to recreate SQL Server replication distributor and publication configurations"
tags:
  - "Replication"
  - "Repl"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaReplServerSetting.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaReplServerSetting"
draft: false
---

# Export-DbaReplServerSetting

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaReplServerSetting](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaReplServerSetting.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaReplServerSetting](https://dataplat.github.io/boh#Export-DbaReplServerSetting).

## Synopsis

Generates T-SQL scripts to recreate SQL Server replication distributor and publication configurations

## Description

Creates T-SQL scripts that can recreate your SQL Server replication setup, including distributor configuration, publications, subscriptions, and all related settings. The generated scripts include both creation commands and a distributor cleanup statement, making this perfect for disaster recovery planning, environment migrations, or replication topology documentation.  
  
The function scripts out the complete replication configuration using SQL Server's replication management objects, so you can rebuild identical replication setups on different servers or restore replication after system failures.  
  
All replication commands need SQL Server Management Studio installed and are therefore currently not supported.  
Have a look at this issue to get more information: https://github.com/dataplat/dbatools/issues/7428

## Syntax

```powershell
Export-DbaReplServerSetting
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-ScriptOption] <Object[]>]
    [[-InputObject] <Object[]>]
    [[-Encoding] <String>]
    [-Passthru]
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
PS C:\> Export-DbaReplServerSetting -SqlInstance sql2017 -Path C:\temp\replication.sql
```

Exports the replication settings on sql2017 to the file C:\temp\replication.sql<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplServer -SqlInstance sql2017 | Export-DbaReplServerSetting -Path C:\temp\replication.sql
```

Exports the replication settings on sql2017 to the file C:\temp\replication.sql<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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

##### -Path

Specifies the directory where the replication script file will be created. Defaults to the dbatools export path configuration.  
Use this when you want to organize replication scripts in a specific directory structure for disaster recovery or documentation purposes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the exported replication script. Overrides both Path parameter and default naming.  
Use this when you need precise control over the output file location and name, especially for automated backup processes.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScriptOption

Specifies custom Microsoft.SqlServer.Replication.ScriptOptions flags to control which replication components are scripted.  
Advanced parameter for fine-tuning script output when the default options don't meet specific requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts replication server objects from Get-DbaReplServer pipeline input for batch processing.  
Use this when scripting replication settings from multiple servers or when combining with other replication commands in a pipeline.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Encoding

Specifies the character encoding for the output script file. Defaults to UTF8 which handles international characters properly.  
Use ASCII for maximum compatibility with older systems, or Unicode when working with databases containing non-English characters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UTF8 |
| Accepted Values | ASCII,BigEndianUnicode,Byte,String,Unicode,UTF7,UTF8,Unknown |

##### -Passthru

Returns the generated T-SQL replication script to the console instead of writing to a file.  
Use this for immediate review of the script content or when piping output to other commands for further processing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoClobber

Prevents overwriting an existing file with the same name. The operation will fail if the target file already exists.  
Use this as a safety measure to avoid accidentally replacing existing replication scripts during routine exports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the replication script to the end of an existing file instead of overwriting it.  
Use this when consolidating multiple replication configurations into a single script file for bulk operations.

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
