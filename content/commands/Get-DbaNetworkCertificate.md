---
title: "Get-DbaNetworkCertificate"
slug: "Get-DbaNetworkCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves the certificate currently configured for SQL Server network encryption."
tags:
  - "Certificate"
  - "Encryption"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaNetworkCertificate"
draft: false
---

# Get-DbaNetworkCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaNetworkCertificate](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaNetworkCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaNetworkCertificate](https://dataplat.github.io/boh#Get-DbaNetworkCertificate).

## Synopsis

Retrieves the certificate currently configured for SQL Server network encryption.

## Description

Retrieves the specific computer certificate that SQL Server is configured to use for network encryption and SSL connections. This shows you which certificate from the local certificate store is actively being used by the SQL Server instance for encrypting client connections. Only returns instances that actually have a certificate configured - instances without certificates won't appear in the results. Useful for auditing SSL configurations, troubleshooting encrypted connection issues, and verifying certificate assignments across multiple instances.

## Syntax

```powershell
Get-DbaNetworkCertificate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaNetworkCertificate -SqlInstance sql2016
```

Gets computer certificate for the standard instance on sql2016 that is being used for SQL Server network encryption<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaNetworkCertificate -SqlInstance server1\sql2017
```

Gets computer certificate for the named instance sql2017 on server1 that is being used for SQL Server network encryption<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to standard instance on localhost. If target is a cluster, you must specify the distinct nodes.

| Property | Value |
| --- | --- |
| Alias | ComputerName |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternate credential object to use for accessing the target computer(s).

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
