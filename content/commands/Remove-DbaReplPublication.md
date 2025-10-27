---
title: "Remove-DbaReplPublication"
slug: "Remove-DbaReplPublication"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes a publication from the database on the target SQL instances."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplPublication.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaReplPublication"
draft: false
---

# Remove-DbaReplPublication

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaReplPublication](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaReplPublication.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaReplPublication](https://dataplat.github.io/boh#Remove-DbaReplPublication).

## Synopsis

Removes a publication from the database on the target SQL instances.

## Description

Removes a publication from the database on the target SQL instances.  
  
https://learn.microsoft.com/en-us/sql/relational-databases/replication/publish/delete-a-publication?view=sql-server-ver16#RMOProcedure

## Syntax

```powershell
Remove-DbaReplPublication
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-Name] <String>]
    [[-InputObject] <Publication[]>]
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
PS C:\> Remove-DbaReplPublication -SqlInstance mssql1 -Database Northwind -Name PubFromPosh
```

Removes a publication called PubFromPosh from the Northwind database on mssql1<br>

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

Specifies the database containing the replication publication to remove. Required when using SqlInstance to identify which database's publications to target.  
Use this to scope the operation to a specific database when multiple databases have replication configured.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Specifies the exact name of the replication publication to remove. Required when using SqlInstance to identify which specific publication to target.  
Use this when you know the publication name and want to remove a specific publication rather than all publications in a database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts replication publication objects from Get-DbaReplPublication for pipeline operations. Use this when you want to filter publications first, then remove selected ones.  
Particularly useful when removing multiple publications based on specific criteria or when integrating with other replication management workflows.

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
