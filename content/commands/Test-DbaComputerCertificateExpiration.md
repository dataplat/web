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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaComputerCertificateExpiration</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaComputerCertificateExpiration.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaComputerCertificateExpiration" }

Gets computer certificates on localhost that are candidates for using with SQL Server's network encryption then checks to see if they'll be expiring within 30 days<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Threshold 90
```
{: data-copyable="true" data-clean-code="Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Threshold 90" }

Gets computer certificates on sql2016 that are candidates for using with SQL Server's network encryption then checks to see if they'll be expiring within 90 days<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Thumbprint 8123472E32AB412ED4288888B83811DB8F504DED, 04BFF8B3679BB01A986E097868D8D494D70A46D6
```
{: data-copyable="true" data-clean-code="Test-DbaComputerCertificateExpiration -ComputerName sql2016 -Thumbprint 8123472E32AB412ED4288888B83811DB8F504DED, 04BFF8B3679BB01A986E097868D8D494D70A46D6" }

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
