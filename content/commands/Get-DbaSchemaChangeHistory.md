---
title: "Get-DbaSchemaChangeHistory"
slug: "Get-DbaSchemaChangeHistory"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram), stuart-moore.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves DDL change history from the SQL Server default system trace"
tags:
  - "Trace"
  - "Changes"
  - "Database"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSchemaChangeHistory.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSchemaChangeHistory"
draft: false
---

# Get-DbaSchemaChangeHistory

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram), stuart-moore.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSchemaChangeHistory](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSchemaChangeHistory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSchemaChangeHistory](https://dataplat.github.io/boh#Get-DbaSchemaChangeHistory).

## Synopsis

Retrieves DDL change history from the SQL Server default system trace

## Description

Queries the default system trace to track CREATE, DROP, and ALTER operations performed on database objects, providing a complete audit trail of schema modifications. This helps DBAs identify who made changes, when they occurred, and which objects were affected without needing to manually parse trace files or enable custom auditing. Returns detailed information including login names, timestamps, application sources, and operation types for compliance reporting and troubleshooting. Only works with SQL Server 2005 and later, as the system trace didn't exist before then.

## Syntax

```powershell
Get-DbaSchemaChangeHistory
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-Since] <DbaDateTime>]
    [[-Object] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSchemaChangeHistory -SqlInstance localhost
```

Returns all DDL changes made in all databases on the SQL Server instance localhost since the system trace began<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSchemaChangeHistory -SqlInstance localhost -Since (Get-Date).AddDays(-7)
```

Returns all DDL changes made in all databases on the SQL Server instance localhost in the last 7 days<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSchemaChangeHistory -SqlInstance localhost -Database Finance, Prod -Since (Get-Date).AddDays(-7)
```

Returns all DDL changes made in the Prod and Finance databases on the SQL Server instance localhost in the last 7 days<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaSchemaChangeHistory -SqlInstance localhost -Database Finance -Object AccountsTable -Since (Get-Date).AddDays(-7)
```

Returns all DDL changes made  to the AccountsTable object in the Finance database on the SQL Server instance localhost in the last 7 days<br>

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

##### -Database

Specifies which databases to include when searching for schema changes. Accepts multiple database names and wildcards for pattern matching.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to exclude from the schema change search. Accepts multiple database names for filtering out unwanted databases.  
Use this to skip system databases, test databases, or any databases you don't want included in the change history results.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Since

Filters results to show only DDL changes that occurred after the specified date and time. Accepts standard PowerShell date formats.  
Use this to focus on recent changes or changes within a specific time period, especially helpful for troubleshooting recent issues or compliance reporting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Object

Specifies the names of specific database objects to search for in the change history. Accepts multiple object names for targeted searches.  
Use this when investigating changes to particular tables, views, stored procedures, or other database objects rather than reviewing all schema changes.

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
