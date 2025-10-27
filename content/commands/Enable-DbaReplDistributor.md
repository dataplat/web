---
title: "Enable-DbaReplDistributor"
slug: "Enable-DbaReplDistributor"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures a SQL Server instance as a replication distributor with distribution database"
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaReplDistributor.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaReplDistributor"
draft: false
---

# Enable-DbaReplDistributor

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaReplDistributor](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaReplDistributor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaReplDistributor](https://dataplat.github.io/boh#Enable-DbaReplDistributor).

## Synopsis

Configures a SQL Server instance as a replication distributor with distribution database

## Description

Configures the specified SQL Server instance to act as a replication distributor by creating the distribution database and installing the distributor role. This is the first step in setting up SQL Server replication, as the distributor manages the flow of replicated transactions between publishers and subscribers. Once configured, the instance can store replication metadata, track publication and subscription information, and coordinate data movement for transactional and snapshot replication scenarios.

## Syntax

```powershell
Enable-DbaReplDistributor
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-DistributionDatabase] <String>]
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
PS C:\> Enable-DbaReplDistributor -SqlInstance mssql1
```

Enables distribution for the mssql1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Enable-DbaReplDistributor -SqlInstance mssql1 -DistributionDatabase repDatabase
```

Enables distribution for the mssql1 instance and names the distribution database repDatabase.<br>

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

##### -DistributionDatabase

Specifies the name of the distribution database that will be created to store replication metadata and transaction logs.  
This database holds subscription information, publication details, and queued transactions for distribution to subscribers.  
Defaults to 'distribution' if not specified, which is the standard convention for most replication configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | distribution |

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
