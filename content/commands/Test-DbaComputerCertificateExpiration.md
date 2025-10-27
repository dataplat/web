---
title: "Test-DbaComputerCertificateExpiration"
slug: "Test-DbaComputerCertificateExpiration"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies SSL/TLS certificates that are expired or expiring soon on SQL Server computers"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaComputerCertificateExpiration.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaComputerCertificateExpiration"
draft: false
---

# Test-DbaComputerCertificateExpiration

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaComputerCertificateExpiration](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaComputerCertificateExpiration.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaComputerCertificateExpiration](https://dataplat.github.io/boh#Test-DbaComputerCertificateExpiration).

## Synopsis

Identifies SSL/TLS certificates that are expired or expiring soon on SQL Server computers

## Description

Scans computer certificate stores to find certificates that are expired or will expire within a specified timeframe. This function focuses on certificates used for SQL Server network encryption, helping DBAs proactively identify potential connection failures before they occur.  
  
By default, it examines certificates that are candidates for SQL Server's network encryption feature. You can also check certificates currently in use by SQL Server instances or scan all certificates in the specified store. The function compares each certificate's expiration date against a configurable threshold (30 days by default) and returns detailed information about any certificates requiring attention.  
  
This is essential for maintaining secure SQL Server connections and preventing unexpected service disruptions caused by expired certificates.

## Syntax

```powershell
Test-DbaComputerCertificateExpiration
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-Store] <String[]>]
    [[-Folder] <String[]>]
    [[-Type] <String>]
    [[-Path] <String>]
    [[-Thumbprint] <String[]>]
    [[-Threshold] <Int32>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaComputerCertificateExpiration
```

Gets computer certificates on localhost that are candidates for using with SQL Server's network encryption then checks to see if they'll be expiring within 30 days<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Threshold 90
```

Gets computer certificates on sql2016 that are candidates for using with SQL Server's network encryption then checks to see if they'll be expiring within 90 days<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Thumbprint 8123472E32AB412ED4288888B83811DB8F504DED, 04BFF8B3679BB01A986E097868D8D494D70A46D6
```

Gets computer certificates on sql2016 that match thumbprints 8123472E32AB412ED4288888B83811DB8F504DED or 04BFF8B3679BB01A986E097868D8D494D70A46D6 then checks to see if they'll be expiring within 30 <br>
days<br>

### Optional Parameters

##### -ComputerName

The target SQL Server instance or instances. Defaults to localhost. If target is a cluster, you must specify the distinct nodes.

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

Specifies the certificate store to scan for certificates. Defaults to LocalMachine which contains system-wide certificates.  
Use this when you need to check certificates in different stores like CurrentUser for user-specific certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LocalMachine |

##### -Folder

Specifies the certificate folder within the store to examine. Defaults to My (Personal) where SSL certificates are typically stored.  
Common folders include My for personal certificates, Root for trusted root authorities, and CA for intermediate certificate authorities.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | My |

##### -Type

Determines which certificates to examine based on their intended use. Defaults to Service which finds certificates suitable for SQL Server.  
Service finds certificates that meet SQL Server's requirements but may also be used by other services like IIS. SQL Server returns only certificates currently configured for use by SQL Server   
instances. All examines every certificate in the specified store regardless of suitability.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Service |
| Accepted Values | All,Service,SQL Server |

##### -Path

Specifies the file system path to a specific certificate file to examine instead of scanning certificate stores.  
Use this when you have certificate files (.cer, .crt, .pfx) on disk that you want to check for expiration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Thumbprint

Filters results to certificates matching the specified thumbprint values. Accepts multiple thumbprints as an array.  
Use this when you need to check specific certificates you've identified through other means or are monitoring for compliance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Threshold

Sets the number of days before expiration to trigger a warning. Defaults to 30 days.  
Adjust this based on your certificate renewal process - use 90 days if you need longer lead times for procurement and testing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 30 |

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
