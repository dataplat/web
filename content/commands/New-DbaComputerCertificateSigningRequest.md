---
title: "New-DbaComputerCertificateSigningRequest"
slug: "New-DbaComputerCertificateSigningRequest"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates certificate signing requests for SQL Server instances to enable SSL/TLS encryption and connection security."
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificateSigningRequest.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaComputerCertificateSigningRequest"
draft: false
---

# New-DbaComputerCertificateSigningRequest

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaComputerCertificateSigningRequest](https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificateSigningRequest.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaComputerCertificateSigningRequest](https://dataplat.github.io/boh#New-DbaComputerCertificateSigningRequest).

## Synopsis

Generates certificate signing requests for SQL Server instances to enable SSL/TLS encryption and connection security.

## Description

Creates certificate signing requests (CSRs) that can be submitted to your Certificate Authority to obtain SSL/TLS certificates for SQL Server instances. This eliminates the manual process of creating certificate requests and ensures proper configuration for SQL Server's encryption requirements.  
  
The function generates both the certificate configuration file (.inf) and the signing request file (.csr) with proper Subject Alternative Names (SAN) to support SQL Server's certificate validation. This is essential when implementing Force Encryption, configuring encrypted connections, or meeting compliance requirements that mandate encrypted database communications.  
  
Supports both standalone SQL Server instances and cluster configurations, automatically resolving FQDNs and configuring appropriate DNS entries. The generated certificates work with SQL Server's encryption features including encrypted client connections, mirroring, and backup encryption scenarios.  
  
By default, creates RSA certificates with 1024-bit keys, though this can be customized for stronger encryption requirements. All certificates are configured as machine certificates with the Microsoft RSA SChannel Cryptographic Provider for compatibility with SQL Server's encryption stack.

## Syntax

```powershell
New-DbaComputerCertificateSigningRequest
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-ClusterInstanceName] <String>]
    [[-Path] <String>]
    [[-FriendlyName] <String>]
    [[-KeyLength] <Int32>]
    [[-Dns] <String[]>]
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
PS C:\> New-DbaComputerCertificateSigningRequest
```

Creates a computer certificate signing request for the local machine with the keylength of 1024.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName Server1
```

Creates a computer certificate signing request for server1 with the keylength of 1024.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096
```

Creates a computer certificate signing request for sqlcluster with the keylength of 4096.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName Server1 -WhatIf
```

Shows what would happen if the command were run<br>

### Optional Parameters

##### -ComputerName

The target computer name hosting the SQL Server instance where the certificate will be installed. Accepts multiple computer names for batch processing.  
For standalone servers, this creates certificates for the specified machine. For clusters, specify each cluster node here and use ClusterInstanceName for the virtual cluster name.

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

##### -ClusterInstanceName

Specifies the virtual cluster name for SQL Server failover cluster instances. This becomes the certificate's Common Name (CN) and primary DNS entry.  
Required when generating certificates for clustered SQL Server instances to ensure proper SSL validation during failovers between cluster nodes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Directory where the certificate configuration (.inf) and signing request (.csr) files will be created. Defaults to the dbatools export path.  
Each computer gets its own subdirectory containing the certificate files needed for submission to your Certificate Authority.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FriendlyName

Sets a descriptive name for the certificate that appears in the Windows Certificate Store. Defaults to "SQL Server".  
This name helps administrators identify the certificate's purpose when managing multiple certificates on the same server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SQL Server |

##### -KeyLength

Specifies the RSA key length in bits for the certificate. Defaults to 1024 for compatibility, though 2048 or 4096 is recommended for production.  
Higher key lengths provide stronger encryption but may impact SQL Server connection performance on older hardware.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1024 |

##### -Dns

Additional DNS names to include in the certificate's Subject Alternative Name (SAN) field. By default includes both short and FQDN names.  
Add extra DNS entries here if clients connect using aliases, load balancer names, or other DNS records that point to your SQL Server instance.

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
