---
title: "Copy-DbaStartupProcedure"
slug: "Copy-DbaStartupProcedure"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Copies startup procedures from master database between SQL Server instances"
tags:
  - "Migration"
  - "Procedure"
  - "Startup"
  - "StartupProcedure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaStartupProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaStartupProcedure"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaStartupProcedure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaStartupProcedure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Shawn Melton (@wsmelton), wsmelton.github.io</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Copies startup procedures from master database between SQL Server instances

## Description

Migrates user-defined startup procedures stored in the master database from source to destination SQL Server instances. Startup procedures are stored procedures that automatically execute when SQL Server starts up, commonly used for server initialization tasks, custom monitoring setup, or configuration validation.  
  
This function identifies procedures flagged with the startup option using sp_procoption, copies their definitions to the destination master database, and configures them as startup procedures. This is essential during server migrations, disaster recovery setup, or when standardizing startup configurations across multiple SQL Server environments.  
  
By default, all startup procedures are copied. Use -Procedure to copy specific procedures or -ExcludeProcedure to skip certain ones. Existing procedures on the destination are skipped unless -Force is used to overwrite them.

## Syntax

```powershell
Copy-DbaStartupProcedure
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Procedure] <String[]>]
    [[-ExcludeProcedure] <String[]>]
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
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster" }

Copies all startup procedures from sqlserver2014a to sqlcluster using Windows credentials. If procedure(s) with the same name exists in the master database on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -SourceSqlCredential $scred -Destination sqlcluster -DestinationSqlCredential $dcred -Procedure logstartup -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaStartupProcedure -Source sqlserver2014a -SourceSqlCredential $scred -Destination sqlcluster -DestinationSqlCredential $dcred -Procedure logstartup -Force" }

Copies only the startup procedure, logstartup, from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If the procedure already exists on <br>
sqlcluster, it will be updated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -ExcludeProcedure logstartup -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -ExcludeProcedure logstartup -Force" }

Copies all the startup procedures found on sqlserver2014a except logstartup to sqlcluster. If a startup procedure with the same name exists on sqlcluster, it will be updated because -Force was used.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaStartupProcedure -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

The source SQL Server instance containing startup procedures to copy from the master database. Requires sysadmin access to read stored procedure definitions and startup configuration.  
Use this to specify which server has the startup procedures you want to migrate or standardize across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

The destination SQL Server instance(s) where startup procedures will be copied to the master database. Requires sysadmin access to create procedures and modify startup configuration.  
Accepts multiple destinations to deploy startup procedures across several servers simultaneously for standardization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance when Windows authentication is not available or desired.  
Use this when you need to connect with specific SQL login credentials or when running under a service account that lacks access to the source server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance(s) when Windows authentication is not available or desired.  
Use this when deploying to servers that require different authentication credentials or when your current context lacks destination access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Procedure

Specifies which startup procedures to copy from the source server instead of copying all available startup procedures.  
Use this when you only need specific procedures migrated, such as copying just monitoring or initialization procedures while leaving others behind.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProcedure

Specifies which startup procedures to skip during the copy operation while processing all others from the source.  
Use this when most startup procedures should be copied but specific ones need to remain server-specific or are problematic.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Overwrites existing startup procedures on the destination server instead of skipping them when name conflicts occur.  
Use this when updating existing startup procedures with newer versions or when you need to ensure destination procedures match the source exactly.

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
