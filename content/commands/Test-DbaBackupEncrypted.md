---
title: "Test-DbaBackupEncrypted"
slug: "Test-DbaBackupEncrypted"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Analyzes backup files to determine encryption status and retrieve encryption details"
tags:
  - "Backups"
  - "Encryption"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBackupEncrypted.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaBackupEncrypted"
draft: false
---

# Test-DbaBackupEncrypted

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaBackupEncrypted](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBackupEncrypted.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaBackupEncrypted](https://dataplat.github.io/boh#Test-DbaBackupEncrypted).

## Synopsis

Analyzes backup files to determine encryption status and retrieve encryption details

## Description

Examines SQL Server backup files to identify whether they contain encrypted data, either through backup encryption or Transparent Data Encryption (TDE). Uses RESTORE HEADERONLY and RESTORE FILELISTONLY commands to inspect backup headers and file metadata without actually restoring the database. This helps DBAs verify encryption compliance, troubleshoot restore issues, and maintain inventory of encrypted backups across their environment.

## Syntax

```powershell
Test-DbaBackupEncrypted
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [-FilePath] <String[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaBackupEncrypted -SqlInstance sql01 -Path /tmp/northwind.bak
```

Test to see if /tmp/northwind.bak is encrypted<br>

#####  Example:  2 

```powershell
PS C:\> Get-ChildItem \\nas\sql\backups | Test-DbaBackupEncrypted -SqlInstance sql01
```

Test to see if all of the backups in \\nas\sql\backups are encrypted<br>

### Required Parameters

##### -FilePath

Specifies the file path(s) to the backup files (.bak, .trn, .dif) that need to be analyzed for encryption status.  
Accepts multiple paths and supports pipeline input from Get-ChildItem or other file discovery commands.  
Use this to verify encryption compliance across backup files or troubleshoot restore failures caused by missing encryption certificates.

| Property | Value |
| --- | --- |
| Alias | FullName,Path |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
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
