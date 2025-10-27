---
title: "Test-DbaDbQueryStore"
slug: "Test-DbaDbQueryStore"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Compares Query Store settings against best practices."
tags:
  - "Database"
  - "QueryStore"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbQueryStore.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbQueryStore"
draft: false
---

# Test-DbaDbQueryStore

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaDbQueryStore](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbQueryStore.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaDbQueryStore](https://dataplat.github.io/boh#Test-DbaDbQueryStore).

## Synopsis

Compares Query Store settings against best practices.

## Description

Evaluates Query Store against a set of rules to match best practices. The rules are:  
  
* ActualState = ReadWrite (This means Query Store is enabled and collecting data.)  
* DataFlushIntervalInSeconds = 900 (Recommended to leave this at the default of 900 seconds (15 mins).)  
* MaxPlansPerQuery = 200 (Number of distinct plans per query. 200 is a good starting point for most environments.)  
* MaxStorageSizeInMB = 2048 (How much disk space Query Store will use. 2GB is a good starting point.)  
* QueryCaptureMode = Auto (With auto, queries that are insignificant from a resource utilization perspective, or executed infrequently, are not captured.)  
* SizeBasedCleanupMode = Auto (With auto, as Query Store gets close to out of space it will automatically purge older data.)  
* StaleQueryThresholdInDays = 30 (Determines how much historic data to keep. 30 days is a good value here.)  
* StatisticsCollectionIntervalInMinutes = 30 (Time window that runtime stats will be aggregated. Use 30 unless you have space concerns, then leave at the default (60).)  
* WaitStatsCaptureMode = ON (Adds valuable data when troubleshooting.)  
* Trace Flag 7745 enabled  
* Trace Flag 7752 enabled

## Syntax

```powershell
Test-DbaDbQueryStore
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [[-InputObject] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbQueryStore -SqlInstance localhost
```

Checks that Query Store is enabled and meets best practices for all user databases on the localhost machine.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbQueryStore -SqlInstance localhost -Database AdventureWorks2017
```

Checks that Query Store is enabled and meets best practices for the AdventureWorks2017 database on the localhost machine.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaDbQueryStore -SqlInstance localhost -ExcludeDatabase AdventureWorks2017
```

Checks that Query Store is enabled and meets best practices for all user databases except AdventureWorks2017 on the localhost machine.<br>

#####  Example:  4 

```powershell
PS C:\> $databases = Get-DbaDatabase -SqlInstance localhost
PS C:\> $databases | Test-DbaDbQueryStore
```

Checks that Query Store is enabled and meets best practices for all databases that are piped on the localhost machine.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

Specifies which databases to test for Query Store best practices. Accepts wildcards for pattern matching.  
Use this when you need to evaluate Query Store settings for specific databases instead of all user databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from Query Store evaluation. System databases (master, model, tempdb) are automatically excluded.  
Use this when you want to test most databases but skip certain ones like development or temporary databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase, server objects, or instance parameters for testing.  
Use this when you want to test Query Store settings on a pre-filtered set of databases or work within a pipeline workflow.

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


&nbsp;
