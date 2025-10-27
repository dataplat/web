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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaDatabase</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaDatabase.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Stephen Bennett, sqlnotesfromtheunderground.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Find-DbaDatabase -SqlInstance &quot;DEV01&quot;, &quot;DEV02&quot;, &quot;UAT01&quot;, &quot;UAT02&quot;, &quot;PROD01&quot;, &quot;PROD02&quot; -Pattern Report" }

Returns all database from the SqlInstances that have a database with Report in the name<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaDatabase -SqlInstance "DEV01", "DEV02", "UAT01", "UAT02", "PROD01", "PROD02" -Pattern TestDB -Exact | Select-Object *
```
{: data-copyable="true" data-clean-code="Find-DbaDatabase -SqlInstance &quot;DEV01&quot;, &quot;DEV02&quot;, &quot;UAT01&quot;, &quot;UAT02&quot;, &quot;PROD01&quot;, &quot;PROD02&quot; -Pattern TestDB -Exact | Select-Object *" }

Returns all database from the SqlInstances that have a database named TestDB with a detailed output.<br>

#####  Example:  3 

```powershell
PS C:\> Find-DbaDatabase -SqlInstance "DEV01", "DEV02", "UAT01", "UAT02", "PROD01", "PROD02" -Property ServiceBrokerGuid -Pattern '-faeb-495a-9898-f25a782835f5' | Select-Object *
```
{: data-copyable="true" data-clean-code="Find-DbaDatabase -SqlInstance &quot;DEV01&quot;, &quot;DEV02&quot;, &quot;UAT01&quot;, &quot;UAT02&quot;, &quot;PROD01&quot;, &quot;PROD02&quot; -Property ServiceBrokerGuid -Pattern '-faeb-495a-9898-f25a782835f5' | Select-Object *" }

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
