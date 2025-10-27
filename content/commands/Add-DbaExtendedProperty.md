---
title: "Add-DbaExtendedProperty"
slug: "Add-DbaExtendedProperty"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Adds extended properties to SQL Server objects for metadata storage and documentation"
tags:
  - "General"
  - "ExtendedProperty"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaExtendedProperty.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaExtendedProperty"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaExtendedProperty</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaExtendedProperty.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Adds extended properties to SQL Server objects for metadata storage and documentation

## Description

Creates custom metadata properties on SQL Server objects to store documentation, version information, business context, or compliance tags. Extended properties are stored in the database system catalogs and don't affect object performance but provide valuable context for DBAs managing complex environments.  
  
This command accepts piped input from any dbatools Get-Dba* command, making it easy to bulk-apply properties across multiple objects. You can add extended properties to databases directly or target specific object types, including:  
  
Aggregate  
Assembly  
Column  
Constraint  
Contract  
Database  
Event Notification  
Filegroup  
Function  
Index  
Logical File Name  
Message Type  
Parameter  
Partition Function  
Partition Scheme  
Procedure  
Queue  
Remote Service Binding  
Route  
Rule  
Schema  
Service  
Synonym  
Table  
Trigger  
Type  
View  
Xml Schema Collection

## Syntax

```powershell
Add-DbaExtendedProperty
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [-Name] <String>
    [-Value] <String>
    [[-InputObject] <PSObject[]>]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Add-DbaExtendedProperty -SqlInstance Server1 -Database db1 -Name version -Value "1.0.0"
```
{: data-copyable="true" data-clean-code="Add-DbaExtendedProperty -SqlInstance Server1 -Database db1 -Name version -Value &quot;1.0.0&quot;" }

Sets the version extended property for the db1 database to 1.0.0<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbStoredProcedure -SqlInstance localhost -Database tempdb | Add-DbaExtendedProperty -Name SPVersion -Value 10.2
```
{: data-copyable="true" data-clean-code="Get-DbaDbStoredProcedure -SqlInstance localhost -Database tempdb | Add-DbaExtendedProperty -Name SPVersion -Value 10.2" }

Creates an extended property for all stored procedures in the tempdb database named SPVersion with a value of 10.2<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Add-DbaExtendedProperty -Name MyExtendedProperty -Value "This is a test"
```
{: data-copyable="true" data-clean-code="Get-DbaDbTable -SqlInstance localhost -Database mydb -Table mytable | Add-DbaExtendedProperty -Name MyExtendedProperty -Value &quot;This is a test&quot;" }

Creates an extended property named MyExtendedProperty for the mytable table in the mydb, with a value of "This is a test"<br>

### Required Parameters

##### -Name

Sets the name identifier for the extended property being created. Must be unique per object.  
Common examples include "Version", "Owner", "Purpose", "DataClassification", or "LastModified" for documentation and compliance tracking.

| Property | Value |
| --- | --- |
| Alias | Property |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Value

Defines the content stored in the extended property as a string value. Can contain any text including version numbers, descriptions, dates, or JSON data.  
Keep values concise as they're stored in system catalogs and are visible in SQL Server Management Studio object properties.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance

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

Specifies which databases to target when adding extended properties directly to database objects. Accepts wildcards for pattern matching.  
Use this when you want to add metadata to entire databases rather than piping specific objects from Get-Dba* commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Server objects from any Get-Dba* command that supports extended properties. Works with tables, views, procedures, functions, and many other object types.  
This is the primary method for bulk-applying extended properties across multiple objects in your database environment.

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

##### -WhatIf

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
