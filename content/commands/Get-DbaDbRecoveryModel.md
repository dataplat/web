---
title: "Get-DbaDbRecoveryModel"
slug: "Get-DbaDbRecoveryModel"
date: 2024-01-01
layout: "single"
author: "Viorel Ciucu (@viorelciucu), cviorel.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves database recovery model settings and backup history information from SQL Server instances."
tags:
  - "Recovery"
  - "RecoveryModel"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRecoveryModel.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbRecoveryModel"
draft: false
---

# Get-DbaDbRecoveryModel

| Property | Value |
| --- | --- |
| **Author** | Viorel Ciucu (@viorelciucu), cviorel.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbRecoveryModel](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbRecoveryModel.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbRecoveryModel](https://dataplat.github.io/boh#Get-DbaDbRecoveryModel).

## Synopsis

Retrieves database recovery model settings and backup history information from SQL Server instances.

## Description

Retrieves recovery model configuration for databases along with their last backup dates, which is essential for backup strategy planning and compliance auditing. DBAs use this to identify databases with inappropriate recovery models for their business requirements, troubleshoot transaction log growth issues, and ensure backup policies align with recovery model settings. The function shows whether databases are accessible and when their last full, differential, and transaction log backups occurred, making it valuable for both routine maintenance and disaster recovery planning.

## Syntax

```powershell
Get-DbaDbRecoveryModel
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-RecoveryModel] <String[]>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbRecoveryModel -SqlInstance sql2014 -RecoveryModel BulkLogged -Verbose
```

Gets all databases on SQL Server instance sql2014 having RecoveryModel set to BulkLogged.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbRecoveryModel -SqlInstance sql2014 -Database TestDB
```

Gets recovery model information for TestDB. If TestDB does not exist on the instance nothing is returned.<br>

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

##### -RecoveryModel

Filters results to show only databases using the specified recovery model (Simple, Full, or BulkLogged).  
Use this to identify databases with incorrect recovery models for your backup strategy or to audit compliance with recovery model policies.  
Details about the recovery models can be found here:  
https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/recovery-models-sql-server

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Simple,Full,BulkLogged |

##### -Database

Specifies which databases to retrieve recovery model information for. Accepts database names, wildcards, or arrays.  
Use this when you need to check recovery models for specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from the recovery model check. Accepts database names, wildcards, or arrays.  
Useful for skipping system databases or databases you don't manage when reviewing recovery model compliance.

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
