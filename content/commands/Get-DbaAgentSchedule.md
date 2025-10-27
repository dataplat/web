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

# Get-DbaAgentSchedule

| Property | Value |
| --- | --- |
| **Author** | Chris McKeown (@devopsfu), devopsfu.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentSchedule](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentSchedule.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentSchedule](https://dataplat.github.io/boh#Get-DbaAgentSchedule).

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

Returns all SQL Agent Shared Schedules on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016
```

Returns all SQL Agent Shared Schedules for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -Id 3
```

Returns the SQL Agent Shared Schedules with the Id of 3<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance localhost, sql2016 -ScheduleUid 'bf57fa7e-7720-4936-85a0-87d279db7eb7'
```

Returns the SQL Agent Shared Schedules with the UID<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentSchedule -SqlInstance sql2016 -Schedule "Maintenance10min","Maintenance60min"
```

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
