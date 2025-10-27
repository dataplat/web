---
title: "Copy-DbaDbAssembly"
slug: "Copy-DbaDbAssembly"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies CLR assemblies from source databases to destination SQL Server instances"
tags:
  - "Migration"
  - "Assembly"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbAssembly.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDbAssembly"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaDbAssembly</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbAssembly.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies CLR assemblies from source databases to destination SQL Server instances

## Description

Migrates custom CLR assemblies from databases on a source SQL Server to corresponding databases on destination instances. This function scans all accessible databases for user-created assemblies and recreates them on the target servers, automatically handling security requirements like setting the TRUSTWORTHY property for external assemblies.  
  
Designed for database migration scenarios where applications rely on custom .NET assemblies registered in SQL Server. If assemblies already exist on the destination, they're skipped unless you use -Force to drop and recreate them.  
  
The function does not copy assembly dependencies or dependent objects like CLR stored procedures, functions, or user-defined types that reference the assemblies.

## Syntax

```powershell
Copy-DbaDbAssembly
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Assembly] <Object[]>]
    [[-ExcludeAssembly] <Object[]>]
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
PS C:\> Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster" }

Copies all assemblies from sqlserver2014a to sqlcluster using Windows credentials. If assemblies with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster -Assembly dbname.assemblyname, dbname3.anotherassembly -SourceSqlCredential $cred -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster -Assembly dbname.assemblyname, dbname3.anotherassembly -SourceSqlCredential $cred -Force" }

Copies two assemblies, the dbname.assemblyname and dbname3.anotherassembly from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If an <br>
assembly with the same name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>
In this example, anotherassembly will be copied to the dbname3 database on the server sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaDbAssembly -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the CLR assemblies to copy. Requires sysadmin access to scan all accessible databases for user-created assemblies.  
The function will inventory all custom assemblies across every database on this instance for migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Target SQL Server instance(s) where CLR assemblies will be created. Accepts multiple destinations to copy assemblies to several servers simultaneously.  
Requires sysadmin access and corresponding databases must already exist on the destination for assembly migration to succeed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Alternative credentials for connecting to the source SQL Server instance. Use this when your current Windows credentials don't have sysadmin access to the source server.  
Accepts PowerShell credential objects created with Get-Credential and supports SQL Server Authentication or Active Directory authentication methods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for connecting to the destination SQL Server instance(s). Use this when your current Windows credentials don't have sysadmin access to the target servers.  
Accepts PowerShell credential objects created with Get-Credential and supports SQL Server Authentication or Active Directory authentication methods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Assembly

Specific CLR assemblies to copy instead of migrating all assemblies. Use the format 'DatabaseName.AssemblyName' to target assemblies in specific databases.  
This is useful when you only need to migrate certain assemblies rather than performing a full assembly migration across all databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAssembly

CLR assemblies to skip during the migration process. Use the format 'DatabaseName.AssemblyName' to exclude specific assemblies from specific databases.  
This is helpful when you want to migrate most assemblies but need to skip problematic or obsolete ones that shouldn't be copied to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops existing assemblies on the destination before recreating them from the source. By default, assemblies that already exist are skipped.  
Use this when you need to overwrite destination assemblies with updated versions from the source, but be aware that assemblies with dependencies cannot be dropped.

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
