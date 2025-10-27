---
title: "Get-DbaAgentSchedule"
slug: "Get-DbaAgentSchedule"
date: 2024-01-01
layout: "single"
author: "Chris McKeown (@devopsfu), devopsfu.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Agent shared schedules with detailed timing and recurrence information."
tags:
  - "Agent"
  - "Schedule"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentSchedule.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentSchedule"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaAgentSchedule</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentSchedule.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chris McKeown (@devopsfu), devopsfu.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Retrieves SQL Agent shared schedules with detailed timing and recurrence information.

## Description

Retrieves all shared schedules from SQL Server Agent along with human-readable descriptions of their timing patterns. These shared schedules can be reused across multiple jobs to standardize maintenance windows and reduce schedule management overhead. The function provides filtering options by schedule name, unique identifier, or numeric ID, making it useful for schedule auditing, documentation, and troubleshooting automated job execution patterns.

## Syntax

```powershell
Get-DbaAgentSchedule
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Schedule] <String[]>]
    [[-ScheduleUid] <String[]>]
    [[-Id] <Int32[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance localhost" }

Returns all SQL Agent Shared Schedules on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance localhost, sql2016" }

Returns all SQL Agent Shared Schedules for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -Id 3
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -Id 3" }

Returns the SQL Agent Shared Schedules with the Id of 3<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'" }

Returns the SQL Agent Shared Schedules with the UID<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql2016 -Schedule "Maintenance10min","Maintenance60min"
```
{: data-copyable="true" data-clean-code="Get-DbaAgentSchedule -SqlInstance sql2016 -Schedule &quot;Maintenance10min&quot;,&quot;Maintenance60min&quot;" }

Returns the "Maintenance10min" & "Maintenance60min" schedules from the sql2016 SQL Server instance<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Schedule

Specifies one or more schedule names to retrieve from the SQL Agent shared schedules collection.  
Use this when you need to examine specific schedules by their display names, such as checking timing details for maintenance windows or job execution patterns.  
Accepts multiple schedule names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScheduleUid

Specifies the GUID-based unique identifier of one or more shared schedules to retrieve.  
Use this when you need to target schedules by their immutable identifiers, particularly useful for automation scripts or when schedule names might change.  
Each shared schedule has a persistent UID that remains constant even if the schedule is renamed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Id

Specifies the numeric identifier of one or more shared schedules to retrieve from SQL Agent.  
Use this when you know the internal ID numbers of specific schedules, often obtained from previous queries or database system tables.  
Schedule IDs are assigned sequentially by SQL Server and remain constant unless the schedule is deleted and recreated.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
