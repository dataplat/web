---
title: "Get-DbaBackupDevice"
slug: "Get-DbaBackupDevice"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves configured backup devices from SQL Server instances for inventory and management"
tags:
  - "Backup"
  - "General"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBackupDevice.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaBackupDevice"
draft: false
---

# Get-DbaBackupDevice

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaBackupDevice](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaBackupDevice.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaBackupDevice](https://dataplat.github.io/boh#Get-DbaBackupDevice).

## Synopsis

Retrieves configured backup devices from SQL Server instances for inventory and management

## Description

This function returns all backup devices configured on SQL Server instances, including their type (disk, tape, URL), physical locations, and settings. Backup devices are logical names that map to physical backup destinations, allowing DBAs to create standardized backup locations that can be referenced in backup scripts and maintenance plans. Use this to audit backup device configurations across your environment, verify backup paths are accessible, or document your backup infrastructure for compliance and disaster recovery planning.

## Syntax

```powershell
Get-DbaBackupDevice
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaBackupDevice -SqlInstance localhost
```

Returns all Backup Devices on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaBackupDevice -SqlInstance localhost, sql2016
```

Returns all Backup Devices for the local and sql2016 SQL Server instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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
