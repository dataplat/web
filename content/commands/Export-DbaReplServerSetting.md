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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaReplServerSetting</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaReplServerSetting.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Export-DbaReplServerSetting -SqlInstance sql2017 -Path C:\temp\replication.sql" }

Exports the replication settings on sql2017 to the file C:\temp\replication.sql<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaReplServer -SqlInstance sql2017 | Export-DbaReplServerSetting -Path C:\temp\replication.sql
```
{: data-copyable="true" data-clean-code="Get-DbaReplServer -SqlInstance sql2017 | Export-DbaReplServerSetting -Path C:\temp\replication.sql" }

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
