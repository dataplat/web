---
title: "New-DbaReplPublication"
slug: "New-DbaReplPublication"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates a SQL Server replication publication for transactional, snapshot, or merge replication"
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplPublication.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaReplPublication"
draft: false
---

# New-DbaReplPublication

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaReplPublication](https://github.com/dataplat/dbatools/blob/master/public/New-DbaReplPublication.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaReplPublication](https://dataplat.github.io/boh#New-DbaReplPublication).

## Synopsis

Creates a SQL Server replication publication for transactional, snapshot, or merge replication

## Description

Creates a new replication publication on a SQL Server instance that's already configured as a publisher. This function enables publishing on the specified database, creates necessary replication agents (Log Reader for transactional/snapshot, Snapshot Agent for all types), and establishes the publication object that defines what data will be replicated to subscribers.  
  
Use this command when setting up the publisher side of SQL Server replication to distribute data across multiple servers. The publication acts as a container for the articles (tables, views, stored procedures) you want to replicate. After creating the publication, you'll typically add articles using Add-DbaReplArticle and create subscriptions on target servers.  
  
https://learn.microsoft.com/en-us/sql/relational-databases/replication/publish/create-a-publication?view=sql-server-ver16

## Syntax

```powershell
New-DbaReplPublication
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Database] <String>
    [-Name] <String>
    [-Type] <String>
    [[-LogReaderAgentCredential] <PSCredential>]
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
PS C:\> New-DbaReplPublication -SqlInstance mssql1 -Database Northwind -Name PubFromPosh -Type Transactional
```

Creates a transactional publication called PubFromPosh for the Northwind database on mssql1<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaReplPublication -SqlInstance mssql1 -Database pubs -Name snapPub -Type Snapshot
```

Creates a snapshot publication called snapPub for the pubs database on mssql1<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaReplPublication -SqlInstance mssql1 -Database pubs -Name mergePub -Type Merge
```

Creates a merge publication called mergePub for the pubs database on mssql1<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies the database where the publication will be created and which contains the objects to be replicated.  
This database must already exist on the publisher instance and will be enabled for the specified replication type.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Name

Sets the unique name for the publication within the database.  
Use a descriptive name that identifies the purpose or content of the publication, as this name will be referenced when creating subscriptions and managing replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Type

Determines the replication method used for distributing data to subscribers.  
Transactional provides near real-time synchronization for frequently changing data, Snapshot creates point-in-time copies for less volatile data, and Merge allows bidirectional changes with conflict   
resolution.  
Choose based on your data synchronization requirements and network constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Snapshot,Transactional,Merge |

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

##### -LogReaderAgentCredential

Specifies the Windows account credentials for the Log Reader Agent, which is required for Transactional and Snapshot replication types.  
This agent reads the transaction log to identify changes for replication. Only needed when not running as sysadmin, as sysadmin members default to using the SQL Server Agent service account.  
Use a domain account with appropriate permissions to the publisher database and distributor.

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
