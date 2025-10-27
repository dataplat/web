---
title: "Uninstall-DbaSqlWatch"
slug: "Uninstall-DbaSqlWatch"
date: 2024-01-01
layout: "single"
author: "Ken K (github.com/koglerk)"
availability: "Windows, Linux, macOS"
synopsis: "Completely removes SqlWatch monitoring solution from a SQL Server instance"
tags:
  - "Community"
  - "SqlWatch"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Uninstall-DbaSqlWatch.ps1"
bohUrl: "https://dataplat.github.io/boh#Uninstall-DbaSqlWatch"
draft: false
---

# Uninstall-DbaSqlWatch

| Property | Value |
| --- | --- |
| **Author** | Ken K (github.com/koglerk) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Uninstall-DbaSqlWatch](https://github.com/dataplat/dbatools/blob/master/public/Uninstall-DbaSqlWatch.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Uninstall-DbaSqlWatch](https://dataplat.github.io/boh#Uninstall-DbaSqlWatch).

## Synopsis

Completely removes SqlWatch monitoring solution from a SQL Server instance

## Description

Performs a complete uninstallation of the SqlWatch performance monitoring solution by removing all associated database objects, SQL Agent jobs, and historical data. This includes dropping all SqlWatch tables (containing performance metrics history), views, stored procedures, functions, Extended Events sessions, Service Broker components, assemblies, and user-defined table types. The function also unpublishes the SqlWatch DACPAC registration to ensure clean removal. Use this when decommissioning SqlWatch or preparing for a fresh installation after configuration issues.

## Syntax

```powershell
Uninstall-DbaSqlWatch
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
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
PS C:\> Uninstall-DbaSqlWatch -SqlInstance server1
```

Deletes all user objects, agent jobs, and historical data associated with SqlWatch from the master database.<br>

### Required Parameters

##### -SqlInstance

SQL Server name or SMO object representing the SQL Server to connect to.

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

Specifies the database containing the SqlWatch installation to remove. Defaults to master.  
Use this when SqlWatch was installed in a database other than the default master database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | master |

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

Prompts to confirm actions

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
