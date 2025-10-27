---
title: "Read-DbaTraceFile"
slug: "Read-DbaTraceFile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Parses SQL Server trace files and extracts events for security auditing and performance analysis"
tags:
  - "Trace"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Read-DbaTraceFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Read-DbaTraceFile"
draft: false
---

# Read-DbaTraceFile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Read-DbaTraceFile](https://github.com/dataplat/dbatools/blob/master/public/Read-DbaTraceFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Read-DbaTraceFile](https://dataplat.github.io/boh#Read-DbaTraceFile).

## Synopsis

Parses SQL Server trace files and extracts events for security auditing and performance analysis

## Description

Reads SQL Server trace files (.trc) using the fn_trace_gettable function and returns events as PowerShell objects for analysis. This function is essential for DBAs who need to investigate security incidents, audit database access, troubleshoot performance issues, or extract compliance data from trace files.  
  
The function can read both active trace files and archived trace files, including SQL Server's default trace that automatically captures configuration changes, login failures, and other critical events. You can filter results by database, login, application, event type, or use custom WHERE clauses to pinpoint specific activities.  
  
Common use cases include analyzing failed login attempts for security breaches, identifying slow-running queries affecting performance, tracking schema changes for change management, and extracting audit trails for compliance reporting.

## Syntax

```powershell
Read-DbaTraceFile
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String[]>]
    [[-Database] <String[]>]
    [[-Login] <String[]>]
    [[-Spid] <Int32[]>]
    [[-EventClass] <String[]>]
    [[-ObjectType] <String[]>]
    [[-ErrorId] <Int32[]>]
    [[-EventSequence] <Int32[]>]
    [[-TextData] <String[]>]
    [[-ApplicationName] <String[]>]
    [[-ObjectName] <String[]>]
    [[-Where] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Read-DbaTraceFile -SqlInstance sql2016 -Database master, tempdb -Path C:\traces\big.trc
```

Reads the tracefile C:\traces\big.trc, stored on the sql2016 sql server. Filters only results that have master or tempdb as the DatabaseName.<br>

#####  Example:  2 

```powershell
PS C:\> Read-DbaTraceFile -SqlInstance sql2016 -Database master, tempdb -Path C:\traces\big.trc -TextData 'EXEC SP_PROCOPTION'
```

Reads the tracefile C:\traces\big.trc, stored on the sql2016 sql server.<br>
Filters only results that have master or tempdb as the DatabaseName and that have 'EXEC SP_PROCOPTION' somewhere in the text.<br>

#####  Example:  3 

```powershell
PS C:\> Read-DbaTraceFile -SqlInstance sql2016 -Path C:\traces\big.trc -Where "LinkedServerName = 'myls' and StartTime > '5/30/2017 4:27:52 PM'"
```

Reads the tracefile C:\traces\big.trc, stored on the sql2016 sql server.<br>
Filters only results where LinkServerName = myls and StartTime is greater than '5/30/2017 4:27:52 PM'.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaTrace -SqlInstance sql2014 | Read-DbaTraceFile
```

Reads every trace file on sql2014<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Path

Specifies the full path to the trace file (.trc) on the SQL Server instance.  
When omitted, reads from the default system trace that automatically captures configuration changes and security events.  
Use this when analyzing specific trace files created by custom traces or archived default traces.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Database

Filters trace events to show only those affecting specific databases by name.  
Use this to focus analysis on particular databases when investigating issues or tracking changes.  
Accepts multiple database names and supports wildcards for pattern matching.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Filters trace events to show only those performed by specific SQL Server logins.  
Essential for security investigations to track activities by suspected user accounts or service accounts.  
Accepts multiple login names for comprehensive user activity analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Spid

Filters trace events to show only those from specific Session Process IDs (SPIDs).  
Useful for tracking all activities within particular database sessions or troubleshooting specific connection issues.  
Accepts multiple SPID values to monitor several concurrent sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventClass

Filters trace events by event class numbers to focus on specific types of database activities.  
Common values include login events (14), logout events (15), SQL statements (10-12), and security audit events (102-111).  
Use this to narrow analysis to particular event types like failed logins or DDL changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ObjectType

Filters trace events by the type of database object being accessed or modified.  
Common values include tables, views, stored procedures, functions, and triggers.  
Use this when investigating changes to specific types of database objects during schema modifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ErrorId

Filters trace events to show only those with specific SQL Server error numbers.  
Common values include login failures (18456), permission denied (229), and deadlock victims (1205).  
Use this to focus on particular error conditions when troubleshooting recurring issues or security events.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EventSequence

Filters trace events by their sequence number within the trace file.  
Use this to retrieve specific events when you know their exact sequence numbers from previous analysis.  
Helpful for pinpointing events that occurred at precise moments during an incident.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TextData

Filters trace events by searching within the SQL statements or command text using pattern matching.  
Use this to find specific queries, stored procedure calls, or SQL commands that contain particular keywords.  
Supports partial text matching, making it ideal for finding all queries containing specific table names or SQL constructs.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ApplicationName

Filters trace events by the application name that initiated the database connection.  
Use this to isolate activities from specific applications like SQL Server Management Studio, custom applications, or services.  
Supports pattern matching to group similar application names or versions together.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ObjectName

Filters trace events by the name of the database object being accessed or modified.  
Use this to track all operations against specific tables, views, procedures, or other database objects.  
Supports pattern matching to find objects with similar naming conventions or prefixes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Where

Specifies a custom SQL WHERE clause for complex filtering beyond the standard parameters.  
Use this for advanced queries combining multiple conditions, date ranges, or custom logic that other parameters cannot achieve.  
Do not include the word "WHERE" - it is added automatically. Here are the available columns:  
TextData  
BinaryData  
DatabaseID  
TransactionID  
LineNumber  
NTUserName  
NTDomainName  
HostName  
ClientProcessID  
ApplicationName  
LoginName  
SPID  
Duration  
StartTime  
EndTime  
Reads  
Writes  
CPU  
Permissions  
Severity  
EventSubClass  
ObjectID  
Success  
IndexID  
IntegerData  
ServerName  
EventClass  
ObjectType  
NestLevel  
State  
Error  
Mode  
Handle  
ObjectName  
DatabaseName  
FileName  
OwnerName  
RoleName  
TargetUserName  
DBUserName  
LoginSid  
TargetLoginName  
TargetLoginSid  
ColumnPermissions  
LinkedServerName  
ProviderName  
MethodName  
RowCounts  
RequestID  
XactSequence  
EventSequence  
BigintData1  
BigintData2  
GUID  
IntegerData2  
ObjectID2  
Type  
OwnerID  
ParentName  
IsSystem  
Offset  
SourceDatabaseID  
SqlHandle  
SessionLoginName  
PlanHandle  
GroupID

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
