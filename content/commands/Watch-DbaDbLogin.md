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

# Watch-DbaDbLogin

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Watch-DbaDbLogin](https://github.com/dataplat/dbatools/blob/master/public/Watch-DbaDbLogin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Watch-DbaDbLogin](https://dataplat.github.io/boh#Watch-DbaDbLogin).

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

A list of all database instances within the Central Management Server SqlCms1 is generated. Using this list, the script enumerates all the processes and gathers login information and saves it to the <br>
table Dblogins in the DatabaseLogins database on SQL Server sqlserver.<br>

#####  Example:  2 

```powershell
PS C:\> Watch-DbaDbLogin -SqlInstance sqlcluster -Database CentralAudit -ServersFromFile .\sqlservers.txt
```

A list of servers is gathered from the file sqlservers.txt in the current directory. Using this list, the script enumerates all the processes and gathers login information and saves it to the table <br>
Dblogins in the CentralAudit database on SQL Server sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Watch-DbaDbLogin -SqlInstance sqlserver -SqlCms SqlCms1 -SqlCredential $cred
```

A list of servers is generated using database instance names within the SQL2014Clusters group on the Central Management Server SqlCms1. Using this list, the script enumerates all the processes and <br>
gathers login information and saves it to the table Dblogins in the DatabaseLogins database on sqlserver.<br>

#####  Example:  4 

```powershell
PS C:\> $instance1 = Connect-DbaInstance -SqlInstance sqldev01
PS C:\> $instance2 = Connect-DbaInstance -SqlInstance sqldev02
PS C:\> $instance1, $instance2 | Watch-DbaDbLogin -SqlInstance sqltest01 -Database CentralAudit
```

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
