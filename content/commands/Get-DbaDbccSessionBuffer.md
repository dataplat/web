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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaDbccSessionBuffer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbccSessionBuffer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation InputBuffer -SessionId 51" }

Get results of DBCC INPUTBUFFER(51) for Instance Server1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51, 52
```
{: data-copyable="true" data-clean-code="Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51, 52" }

Get results of DBCC OUTPUTBUFFER for SessionId's 51 and 52 for Instance Server1<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation InputBuffer -SessionId 51 -RequestId 0
```
{: data-copyable="true" data-clean-code="Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation InputBuffer -SessionId 51 -RequestId 0" }

Get results of DBCC INPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51 -RequestId 0
```
{: data-copyable="true" data-clean-code="Get-DbaDbccSessionBuffer -SqlInstance Server1 -Operation OutputBuffer -SessionId 51 -RequestId 0" }

Get results of DBCC OUTPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  5 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation InputBuffer -All
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation InputBuffer -All" }

Get results of DBCC INPUTBUFFER for all user sessions for the instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  6 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation OutputBuffer -All
```
{: data-copyable="true" data-clean-code="'Sql1','Sql2/sqlexpress' | Get-DbaDbccSessionBuffer -Operation OutputBuffer -All" }

Get results of DBCC OUTPUTBUFFER for all user sessions for the instances Sql1 and Sql2/sqlexpress<br>

#####  Example:  7 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation InputBuffer -SessionId 51 -RequestId 0
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation InputBuffer -SessionId 51 -RequestId 0" }

Connects using sqladmin credential and gets results of DBCC INPUTBUFFER(51,0) for Instance Server1<br>

#####  Example:  8 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation OutputBuffer -SessionId 51 -RequestId 0
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Get-DbaDbccSessionBuffer -SqlInstance Server1 -SqlCredential $cred -Operation OutputBuffer -SessionId 51 -RequestId 0" }

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
