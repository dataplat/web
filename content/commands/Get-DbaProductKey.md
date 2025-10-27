---
title: "Get-DbaProductKey"
slug: "Get-DbaProductKey"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server product keys from registry data for license compliance and inventory management."
tags:
  - "ProductKey"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaProductKey.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaProductKey"
draft: false
---

# Get-DbaProductKey

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaProductKey](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaProductKey.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaProductKey](https://dataplat.github.io/boh#Get-DbaProductKey).

## Synopsis

Retrieves SQL Server product keys from registry data for license compliance and inventory management.

## Description

Decodes SQL Server product keys from registry DigitalProductID entries across all installed instances on target computers. This is essential for license compliance auditing, asset inventory during migrations, and generating compliance reports for auditors. The command handles different SQL Server versions (2005+), supports clustered instances, and automatically identifies Express editions that don't require product keys. Works by connecting to each SQL instance to determine version and edition, then accessing registry data remotely to decode the binary product key information.

## Syntax

```powershell
Get-DbaProductKey
    [-ComputerName] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaProductKey -ComputerName winxp, sqlservera, sqlserver2014a, win2k8
```

Gets SQL Server versions, editions and product keys for all instances within each server or workstation.<br>

### Required Parameters

##### -ComputerName

Specifies the SQL Server instances or computer names to retrieve product keys from. Accepts multiple values for bulk operations.  
Use this when you need to audit license compliance across multiple servers or gather product key inventory during migrations.

| Property | Value |
| --- | --- |
| Alias | SqlInstance |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

This command logs into the SQL instance to gather additional information.  
Use this parameter to connect to the discovered SQL instances using alternative credentials. Windows and SQL Authentication supported. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

Login to the target Windows instance using alternative credentials. Windows Authentication supported. Accepts credential objects (Get-Credential)

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
