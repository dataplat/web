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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaComputerCertificateSigningRequest</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificateSigningRequest.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="New-DbaComputerCertificateSigningRequest" }

Creates a computer certificate signing request for the local machine with the keylength of 1024.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName Server1
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificateSigningRequest -ComputerName Server1" }

Creates a computer certificate signing request for server1 with the keylength of 1024.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificateSigningRequest -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096" }

Creates a computer certificate signing request for sqlcluster with the keylength of 4096.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaComputerCertificateSigningRequest -ComputerName Server1 -WhatIf
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificateSigningRequest -ComputerName Server1 -WhatIf" }

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
