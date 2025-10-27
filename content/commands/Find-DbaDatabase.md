---
title: "Find-DbaDatabase"
slug: "Find-DbaDatabase"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Searches multiple SQL Server instances for databases matching name, owner, or Service Broker GUID patterns"
tags:
  - "Database"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDatabase.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaDatabase"
draft: false
---

# Find-DbaDatabase

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Find-DbaDatabase](https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDatabase.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Find-DbaDatabase](https://dataplat.github.io/boh#Find-DbaDatabase).

## Synopsis

Searches multiple SQL Server instances for databases matching name, owner, or Service Broker GUID patterns

## Description

Performs database discovery and inventory across multiple SQL Server instances by searching for databases that match specific criteria. You can search by database name (using regex patterns), database owner, or Service Broker GUID to locate databases across environments.  
  
This is particularly useful for tracking databases across development, test, and production environments, finding databases by ownership for security audits, or identifying databases with matching Service Broker GUIDs. The function returns detailed information including database size, object counts (tables, views, stored procedures), and creation details.  
  
Service Broker GUIDs can become mismatched on restored databases when using ALTER DATABASE...NEW_BROKER or when Service Broker is disabled, which resets the GUID to all zeros. This function helps identify such scenarios during database migrations and troubleshooting.

## Syntax

```powershell
Find-DbaDatabase
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Property] <String>]
    [-Pattern] <String>
    [-Exact]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaDatabase -SqlInstance "DEV01", "DEV02", "UAT01", "UAT02", "PROD01", "PROD02" -Pattern Report
```

Returns all database from the SqlInstances that have a database with Report in the name<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDatabase -SqlInstance "DEV01", "DEV02", "UAT01", "UAT02", "PROD01", "PROD02" -Pattern TestDB -Exact | Select-Object *
```

Returns all database from the SqlInstances that have a database named TestDB with a detailed output.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDatabase -SqlInstance "DEV01", "DEV02", "UAT01", "UAT02", "PROD01", "PROD02" -Property ServiceBrokerGuid -Pattern '-faeb-495a-9898-f25a782835f5' | Select-Object *
```

Returns all database from the SqlInstances that have the same Service Broker GUID with a detailed output<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Pattern

The search value to match against the specified property. Supports regular expressions for flexible pattern matching.  
Use simple strings like 'Sales' or 'Test', or regex patterns like '^prod.*db$' to match databases starting with 'prod' and ending with 'db'.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -Property

Specifies which database property to search against: Name, Owner, or ServiceBrokerGuid. Defaults to Name for database name searches.  
Use Owner when tracking down databases by their owner for security audits, or ServiceBrokerGuid when identifying databases with matching Service Broker configurations across environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Name |
| Accepted Values | Name,ServiceBrokerGuid,Owner |

##### -Exact

Forces an exact string match instead of pattern matching. Use this when you need to find databases with names that exactly match your search term.  
Particularly useful when searching for database names that contain regex special characters or when you want precise matches without wildcards.

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
