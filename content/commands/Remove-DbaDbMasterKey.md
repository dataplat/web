---
title: "Remove-DbaDbMasterKey"
slug: "Remove-DbaDbMasterKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes database master keys from SQL Server databases"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMasterKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaDbMasterKey"
draft: false
---

# Remove-DbaDbMasterKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaDbMasterKey](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaDbMasterKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaDbMasterKey](https://dataplat.github.io/boh#Remove-DbaDbMasterKey).

## Synopsis

Removes database master keys from SQL Server databases

## Description

Removes database master keys from specified SQL Server databases by executing DROP MASTER KEY. Database master keys are used to encrypt other database-level encryption keys, including those for Transparent Data Encryption (TDE), Always Encrypted, and certificate private keys. This function is typically used when decommissioning database encryption, migrating to different encryption strategies, or cleaning up unused encryption infrastructure during database maintenance or compliance changes.

## Syntax

```powershell
Remove-DbaDbMasterKey
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [-All]
    [[-InputObject] <MasterKey[]>]
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
PS C:\> Remove-DbaDbMasterKey -SqlInstance sql2017, sql2016 -Database pubs
```

The master key in the pubs database on sql2017 and sql2016 will be removed if it exists.<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaDbMasterKey -SqlInstance sql2017 -Database db1 -Confirm:$false
```

Suppresses all prompts to remove the master key in the 'db1' database and drops the key.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMasterKey -SqlInstance sql2017 -Database db1 | Remove-DbaDbMasterKey -Confirm:$false
```

Suppresses all prompts to remove the master key in the 'db1' database and drops the key.<br>

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

Specifies which databases to remove master keys from. Accepts multiple database names.  
Use this when you need to remove encryption from specific databases during TDE decommissioning or security policy changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip when using the -All parameter to remove master keys from all databases.  
Use this to protect critical databases that must retain their encryption while cleaning up master keys from other databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -All

Removes master keys from all user databases on the SQL Server instance.  
Use this when decommissioning encryption across an entire instance or during major security architecture changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts master key objects from Get-DbaDbMasterKey through the pipeline.  
Use this approach when you need to filter or inspect master keys before removing them, providing more control over the removal process.

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
