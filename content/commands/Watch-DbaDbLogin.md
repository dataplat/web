---
title: "Watch-DbaDbLogin"
slug: "Watch-DbaDbLogin"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Monitors active connections across SQL Server instances and logs client details to a central tracking table"
tags:
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Watch-DbaDbLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Watch-DbaDbLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Watch-DbaDbLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Watch-DbaDbLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Monitors active connections across SQL Server instances and logs client details to a central tracking table

## Description

Watch-DbaDbLogin queries sys.dm_exec_sessions and sys.dm_exec_requests DMVs to capture real-time connection activity across multiple SQL Server instances. It records login names, client hostnames, application names, database usage, and timestamps into a central monitoring table. This solves the common problem of inadequate connection documentation when planning server migrations or application updates.  
  
The function automatically filters out local server connections and system databases to focus on external client activity. Running this every 5-10 minutes over several weeks builds a comprehensive picture of who connects to what, from where, and when.  
  
You can monitor servers from a Central Management Server, a text file list, or pipe in pre-connected instances. The captured data helps identify forgotten applications, validate connection strings during migrations, and document actual database usage patterns rather than relying on incomplete documentation.

## Syntax

```powershell
Watch-DbaDbLogin
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Table] <String>]
    [[-SqlCms] <String>]
    [[-ServersFromFile] <String>]
    [[-InputObject] <Server[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Watch-DbaDbLogin -SqlInstance sqlserver -SqlCms SqlCms1
```
{: data-copyable="true" data-clean-code="Watch-DbaDbLogin -SqlInstance sqlserver -SqlCms SqlCms1" }

A list of all database instances within the Central Management Server SqlCms1 is generated. Using this list, the script enumerates all the processes and gathers login information and saves it to the <br>
table Dblogins in the DatabaseLogins database on SQL Server sqlserver.<br>

#####  Example:  2 

```powershell
PS C:\> Watch-DbaDbLogin -SqlInstance sqlcluster -Database CentralAudit -ServersFromFile .\sqlservers.txt
```
{: data-copyable="true" data-clean-code="Watch-DbaDbLogin -SqlInstance sqlcluster -Database CentralAudit -ServersFromFile .\sqlservers.txt" }

A list of servers is gathered from the file sqlservers.txt in the current directory. Using this list, the script enumerates all the processes and gathers login information and saves it to the table <br>
Dblogins in the CentralAudit database on SQL Server sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Watch-DbaDbLogin -SqlInstance sqlserver -SqlCms SqlCms1 -SqlCredential $cred
```
{: data-copyable="true" data-clean-code="Watch-DbaDbLogin -SqlInstance sqlserver -SqlCms SqlCms1 -SqlCredential $cred" }

A list of servers is generated using database instance names within the SQL2014Clusters group on the Central Management Server SqlCms1. Using this list, the script enumerates all the processes and <br>
gathers login information and saves it to the table Dblogins in the DatabaseLogins database on sqlserver.<br>

#####  Example:  4 

```powershell
PS C:\> $instance1 = Connect-DbaInstance -SqlInstance sqldev01
PS C:\> $instance2 = Connect-DbaInstance -SqlInstance sqldev02
PS C:\> $instance1, $instance2 | Watch-DbaDbLogin -SqlInstance sqltest01 -Database CentralAudit
```
{: data-copyable="true" data-clean-code="$instance1 = Connect-DbaInstance -SqlInstance sqldev01
$instance2 = Connect-DbaInstance -SqlInstance sqldev02
$instance1, $instance2 | Watch-DbaDbLogin -SqlInstance sqltest01 -Database CentralAudit" }

Pre-connects two instances sqldev01 and sqldev02 and then using pipelining sends them to Watch-DbaDbLogin to enumerate processes and gather login info. The resulting gathered info is stored to the <br>
DbaTools-WatchDbLogins table in the CentralAudit database on the sqltest01 instance.<br>
Note: This is the method to use if the instances have different credentials than the instance used to store the watch data.<br>

### Optional Parameters

##### -SqlInstance

The SQL Server that stores the Watch database.

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

##### -Database

Specifies the target database where connection monitoring data will be stored.  
This database should be dedicated to audit and monitoring functions, separate from production databases.  
If not specified, the function will attempt to use a default database on the SqlInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Table

Specifies the table name where login monitoring data will be inserted.  
Defaults to "DbaTools-WatchDbLogins" if not specified, and will be auto-created if it doesn't exist.  
Use a consistent naming convention across environments for easier reporting and analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | DbaTools-WatchDbLogins |

##### -SqlCms

Specifies a Central Management Server to retrieve registered SQL Server instances for monitoring.  
Use this when you need to monitor multiple servers that are already organized in CMS groups.  
The function will connect to each registered server found in the CMS to capture login activity.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServersFromFile

Specifies a text file containing SQL Server instance names to monitor, with one instance per line.  
Use this when you have a custom list of servers not managed through CMS, or when scripting across different environments.  
Supports both named instances (SERVER\INSTANCE) and default instances (SERVER).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts pre-connected SQL Server instances from Connect-DbaInstance via pipeline.  
Use this method when monitoring servers with different authentication requirements than the storage instance.  
Allows for more granular credential control when connecting to multiple instances with varying security contexts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
