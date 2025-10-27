---
title: "Get-DbaComputerCertificate"
slug: "Get-DbaComputerCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves X.509 certificates from Windows certificate stores that can be used for SQL Server TLS encryption"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaComputerCertificate"
draft: false
---

# Get-DbaComputerCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaComputerCertificate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaComputerCertificate](https://dataplat.github.io/boh#Get-DbaComputerCertificate).

## Synopsis

Retrieves X.509 certificates from Windows certificate stores that can be used for SQL Server TLS encryption

## Description

Scans Windows certificate stores to find X.509 certificates suitable for enabling SQL Server network encryption. By default, returns only certificates with Server Authentication capability from the LocalMachine\My store, which are the certificates SQL Server can actually use for TLS connections. This saves you from manually browsing certificate stores and checking enhanced key usage extensions when configuring Force Encryption or setting up secure SQL Server connections.

## Syntax

```powershell
Get-DbaComputerCertificate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Store] <String[]>]
    [[-Folder] <String[]>]
    [[-Type] <String>]
    [[-Path] <String>]
    [[-Thumbprint] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaComputerCertificate
```

Gets computer certificates on localhost that are candidates for using with SQL Server's network encryption<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaComputerCertificate -ComputerName sql2016
```

Gets computer certificates on sql2016 that are candidates for using with SQL Server's network encryption<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaComputerCertificate -ComputerName sql2016 -Thumbprint 8123472E32AB412ED4288888B83811DB8F504DED, 04BFF8B3679BB01A986E097868D8D494D70A46D6
```

Gets computer certificates on sql2016 that match thumbprints 8123472E32AB412ED4288888B83811DB8F504DED or 04BFF8B3679BB01A986E097868D8D494D70A46D6<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to scan for certificates. Defaults to localhost.  
Use this when you need to check certificates on remote SQL Server machines or when configuring network encryption across multiple instances.  
For SQL Server clusters, specify each individual cluster node separately since certificates are stored per machine, not per cluster resource.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Store

Specifies which Windows certificate store location to search. Defaults to LocalMachine.  
Use LocalMachine for certificates that SQL Server service accounts can access, or CurrentUser for user-specific certificates.  
SQL Server typically requires certificates in LocalMachine store for network encryption to work properly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LocalMachine |

##### -Folder

Specifies which certificate folder within the store to search. Defaults to My (Personal certificates).  
Use My for personal certificates with private keys, Root for trusted root certificates, or other folders based on certificate type.  
SQL Server network encryption typically uses certificates from the My folder since they contain the required private keys.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | My |

##### -Type

Filters certificates by their intended usage. Service returns only certificates with Server Authentication capability, All returns every certificate.  
Use Service (default) to find certificates that SQL Server can actually use for network encryption and TLS connections.  
Service certificates have the required Enhanced Key Usage extension (1.3.6.1.5.5.7.3.1) that enables them for server authentication scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Service |
| Accepted Values | All,Service |

##### -Path

Specifies the file system path to a certificate file (.cer, .crt, .pfx) to load and analyze.  
Use this when you need to examine a certificate file before installing it to a certificate store.  
This bypasses the Store and Folder parameters since the certificate is loaded directly from the file system.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Thumbprint

Filters results to return only certificates with the specified thumbprint(s). Accepts multiple thumbprints.  
Use this when you need to verify specific certificates exist or check their properties before configuring SQL Server network encryption.  
The thumbprint is the unique SHA-1 hash identifier that SQL Server uses in its certificate configuration.

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
