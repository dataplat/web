---
title: "Invoke-DbaDbccDropCleanBuffer"
slug: "Invoke-DbaDbccDropCleanBuffer"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Clears SQL Server buffer pool cache and columnstore object pool for performance testing"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbccDropCleanBuffer.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbccDropCleanBuffer"
draft: false
---

# Invoke-DbaDbccDropCleanBuffer

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbccDropCleanBuffer](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbccDropCleanBuffer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbccDropCleanBuffer](https://dataplat.github.io/boh#Invoke-DbaDbccDropCleanBuffer).

## Synopsis

Clears SQL Server buffer pool cache and columnstore object pool for performance testing

## Description

Executes DBCC DROPCLEANBUFFERS to remove all clean data pages from the buffer pool and columnstore objects from memory. This forces SQL Server to read data from disk on subsequent queries, simulating a "cold cache" environment for accurate performance testing and query optimization scenarios. DBAs use this command when they need to test query performance without the benefit of cached data pages, ensuring consistent baseline measurements across multiple test runs.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-dropcleanbuffers-transact-sql

## Syntax

```powershell
Invoke-DbaDbccDropCleanBuffer
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-NoInformationalMessages]
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
PS C:\> Invoke-DbaDbccDropCleanBuffer -SqlInstance SqlServer2017
```

Runs the command DBCC DROPCLEANBUFFERS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbccDropCleanBuffer -SqlInstance SqlServer2017 -NoInformationalMessages
```

Runs the command DBCC DROPCLEANBUFFERS WITH NO_INFOMSGS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  3 

```powershell
PS C:\> 'Sql1','Sql2/sqlexpress' | Invoke-DbaDbccDropCleanBuffer -WhatIf
```

Displays what will happen if command DBCC DROPCLEANBUFFERS is called against Sql1 and Sql2/sqlexpress<br>

#####  Example:  4 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Invoke-DbaDbccDropCleanBuffer -SqlInstance Server1 -SqlCredential $cred
```

Connects using sqladmin credential and executes command DBCC DROPCLEANBUFFERS for instance Server1<br>

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

##### -NoInformationalMessages

Suppresses informational messages from the DBCC DROPCLEANBUFFERS command output.  
Use this when running automated scripts where you only want to capture errors or when you need cleaner output for logging purposes.

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

##### -WhatIf

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
