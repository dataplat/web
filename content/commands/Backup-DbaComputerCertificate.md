---
title: "Backup-DbaComputerCertificate"
slug: "Backup-DbaComputerCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports computer certificates to disk for SQL Server network encryption backup and disaster recovery."
tags:
  - "CertBackup"
  - "Certificate"
  - "Backup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaComputerCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Backup-DbaComputerCertificate"
draft: false
---

# Backup-DbaComputerCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Backup-DbaComputerCertificate](https://github.com/dataplat/dbatools/blob/master/public/Backup-DbaComputerCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Backup-DbaComputerCertificate](https://dataplat.github.io/boh#Backup-DbaComputerCertificate).

## Synopsis

Exports computer certificates to disk for SQL Server network encryption backup and disaster recovery.

## Description

Exports computer certificates from the local or remote certificate store to files on disk. This is essential for backing up certificates used for SQL Server network encryption before server migrations, certificate renewals, or disaster recovery scenarios. The function works with certificate objects from Get-DbaComputerCertificate and supports multiple export formats including standard .cer files and password-protected .pfx files for complete private key backup.

## Syntax

```powershell
Backup-DbaComputerCertificate
    [[-SecurePassword] <SecureString>]
    [-InputObject] <Object[]>
    [[-Path] <String>]
    [[-FilePath] <String>]
    [[-Type] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaComputerCertificate | Backup-DbaComputerCertificate -Path C:\temp
```

Backs up all certs to C:\temp. Auto-names the files.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaComputerCertificate -Thumbprint 29C469578D6C6211076A09CEE5C5797EEA0C2713 | Backup-DbaComputerCertificate -FilePath C:\temp\29C469578D6C6211076A09CEE5C5797EEA0C2713.cer
```

Backs up certificate with the thumbprint 29C469578D6C6211076A09CEE5C5797EEA0C2713 to the temp directory.<br>

### Required Parameters

##### -InputObject

The certificate objects to export, typically from Get-DbaComputerCertificate pipeline output.  
Use this to specify which certificates to backup for SQL Server network encryption recovery scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SecurePassword

Provides password protection for certificate exports, required when exporting private keys with Pfx format.  
Essential for securing certificate backups that contain private keys used for SQL Server TLS encryption.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the target directory where certificate files will be saved with auto-generated filenames.  
Files are named using the pattern: ComputerName-Thumbprint.cer for easy identification during recovery.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $pwd |

##### -FilePath

Specifies the exact file path and name for the exported certificate.  
Use this when you need to control the output filename or when backing up a single certificate to a specific location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Determines the certificate export format for different backup and deployment scenarios.  
Use 'Cert' for public key only backups, 'Pfx' for complete certificate with private key backup, or other formats based on your security requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Cert |
| Accepted Values | Authenticode,Cert,Pfx,Pkcs12,Pkcs7,SerializedCert |

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
