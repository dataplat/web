---
title: "Get-DbaDbccSessionBuffer"
slug: "Get-DbaDbccSessionBuffer"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves session input or output buffer contents using DBCC INPUTBUFFER or DBCC OUTPUTBUFFER"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccSessionBuffer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbccSessionBuffer"
draft: false
---

# Get-DbaDbccSessionBuffer

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbccSessionBuffer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccSessionBuffer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbccSessionBuffer](https://dataplat.github.io/boh#Get-DbaDbccSessionBuffer).

## Synopsis

Retrieves session input or output buffer contents using DBCC INPUTBUFFER or DBCC OUTPUTBUFFER

## Description

Executes DBCC INPUTBUFFER or DBCC OUTPUTBUFFER to examine what SQL statements a session is executing or what data is being returned to a client. InputBuffer shows the last SQL batch sent by a client session, which is essential for troubleshooting blocking, investigating suspicious activity, or understanding what commands are causing performance issues. OutputBuffer reveals the actual data being transmitted back to the client, useful for debugging connectivity problems or examining result sets. This replaces the need to manually run DBCC commands and parse their output, especially when investigating multiple sessions simultaneously.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-inputbuffer-transact-sql  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-outputbuffer-transact-sql

## Syntax

```powershell
Get-DbaDbccSessionBuffer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Operation] <String>]
    [[-SessionId] <Int32[]>]
    [[-RequestId] <Int32>]
    [-All]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation InputBuffer -SessionId 51
```

Get results of DBCC INPUTBUFFER(51) for Instance Server1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51, 52
```

Get results of DBCC OUTPUTBUFFER for SessionId's 51 and 52 for Instance Server1<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation InputBuffer -SessionId 51 -RequestId 0
```

Get results of DBCC INPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51 -RequestId 0
```

Get results of DBCC OUTPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation InputBuffer -All
```

Get results of DBCC INPUTBUFFER for all user sessions for the instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation OutputBuffer -All
```

Get results of DBCC OUTPUTBUFFER for all user sessions for the instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  7 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation InputBuffer -SessionId 51 -RequestId 0
```

Connects using sqladmin credential and gets results of DBCC INPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  8 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation OutputBuffer -SessionId 51 -RequestId 0
```

Connects using sqladmin credential and gets results of DBCC OUTPUTBUFFER(51,0) for Instance Server1<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
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

##### -Operation

Specifies which DBCC operation to execute: InputBuffer shows the last SQL statement sent by a client, while OutputBuffer shows data being returned to the client.  
Use InputBuffer when troubleshooting blocking sessions, investigating suspicious activity, or identifying problematic queries.  
Use OutputBuffer when debugging client connectivity issues or examining what data is being transmitted to applications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | InputBuffer |
| Accepted Values | InputBuffer,OutputBuffer |

##### -SessionId

Specifies one or more session IDs to examine for buffer contents. Session IDs can be found in sys.dm_exec_sessions or sys.dm_exec_requests.  
Use this when you need to investigate specific sessions that are causing blocking, consuming resources, or exhibiting unusual behavior.  
Cannot be used together with the -All parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RequestId

Specifies the exact request (batch) to examine within a session when multiple requests are active. Optional parameter that defaults to the current request.  
Use this when a session has multiple concurrent requests and you need to examine a specific batch rather than the most recent one.  
Find request IDs by querying sys.dm_exec_requests for the target session_id.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -All

Retrieves buffer information for all active user sessions instead of specific session IDs. Excludes system sessions to focus on user activity.  
Use this when performing broad troubleshooting to identify which sessions are running problematic queries or consuming resources.  
This parameter overrides any SessionId or RequestId values and may return large result sets on busy servers.

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
