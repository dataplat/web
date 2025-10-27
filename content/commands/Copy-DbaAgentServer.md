---
title: "Copy-DbaAgentServer"
slug: "Copy-DbaAgentServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies all SQL Server Agent objects and server properties between instances."
tags:
  - "Migration"
  - "SqlServerAgent"
  - "SqlAgent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaAgentServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaAgentServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaAgentServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies all SQL Server Agent objects and server properties between instances.

## Description

Migrates complete SQL Server Agent configuration including jobs, operators, alerts, schedules, job categories, and proxies from one instance to another. This function handles the proper sequence of object creation and also copies server-level Agent properties like job history retention settings, error log locations, and database mail profiles. Essential for server migrations, disaster recovery setups, or standardizing Agent configurations across multiple environments without manually recreating dozens of objects.  
  
You must have sysadmin access and server version must be SQL Server version 2000 or greater.

## Syntax

```powershell
Copy-DbaAgentServer
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [-DisableJobsOnDestination]
    [-DisableJobsOnSource]
    [-ExcludeServerProperties]
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
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster" }

Copies all job server objects from sqlserver2014a to sqlcluster using Windows credentials for authentication. If job objects with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred" }

Copies all job objects from sqlserver2014a to sqlcluster using SQL credentials to authentication to sqlserver2014a and Windows credentials to authenticate to sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -WhatIf
```
{: data-copyable="true" data-clean-code="Copy-DbaAgentServer -Source sqlserver2014a -Destination sqlcluster -WhatIf" }

Shows what would happen if the command were executed.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the Agent objects you want to copy. All jobs, schedules, operators, alerts, proxies, and server properties will be migrated from this instance.  
Must have sysadmin access and be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Target SQL Server instance(s) where Agent objects will be copied. Accepts multiple instances to copy the same configuration to several servers at once.  
Must have sysadmin access and be SQL Server 2000 or higher. Useful for standardizing Agent configurations across development, test, and production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Authentication credentials for connecting to the Source SQL Server instance. Use this when you need SQL Server authentication instead of Windows authentication.  
Create credentials using Get-Credential and pass them to this parameter. Common when source server is in different domain or requires SQL login.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Authentication credentials for connecting to the Destination SQL Server instance(s). Use this when you need SQL Server authentication instead of Windows authentication.  
Create credentials using Get-Credential and pass them to this parameter. Required when destination servers use different authentication than your current context.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableJobsOnDestination

Disables all copied jobs on the destination instance after migration completes. Jobs will exist but won't run until manually enabled.  
Use this when copying to test environments where you don't want production jobs running automatically, or during staged migrations where jobs should remain inactive initially.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableJobsOnSource

Disables all jobs on the source instance after copying them to destination. Jobs will exist but won't run until manually re-enabled.  
Use this during server migrations when you want to prevent jobs from running on the old server after moving them to the new instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeServerProperties

Skips copying SQL Agent server-level configuration like job history retention settings, error log locations, database mail profiles, and service restart preferences.  
Use this when you only want to copy jobs and schedules but keep the destination server's existing Agent configuration settings intact.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Overwrites existing Agent objects on destination that have matching names from source. Objects are dropped first, then recreated with source configuration.  
Use this when you want to ensure destination matches source exactly, replacing any existing jobs, operators, or schedules with conflicting names.

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
