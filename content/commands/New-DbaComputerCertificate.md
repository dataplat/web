---
title: "New-DbaComputerCertificate"
slug: "New-DbaComputerCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new computer certificate useful for Forcing Encryption"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaComputerCertificate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaComputerCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Creates a new computer certificate useful for Forcing Encryption

## Description

Creates a new computer certificate - self-signed or signed by an Active Directory CA, using the Web Server certificate.  
  
By default, a key with a length of 1024 and a friendly name of the machines FQDN is generated.  
  
This command was originally intended to help automate the process so that SSL certificates can be available for enforcing encryption on connections.  
  
It makes a lot of assumptions - namely, that your account is allowed to auto-enroll and that you have permission to do everything it needs to do ;)  
  
References:  
https://www.itprotoday.com/sql-server/7-steps-ssl-encryption  
https://azurebi.jppp.org/2016/01/23/using-lets-encrypt-certificates-for-secure-sql-server-connections/  
https://blogs.msdn.microsoft.com/sqlserverfaq/2016/09/26/creating-and-registering-ssl-certificates/  
  
The certificate is generated using AD's webserver SSL template on the client machine and pushed to the remote machine.

## Syntax

```powershell
New-DbaComputerCertificate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-CaServer] <String>]
    [[-CaName] <String>]
    [[-ClusterInstanceName] <String>]
    [[-SecurePassword] <SecureString>]
    [[-FriendlyName] <String>]
    [[-CertificateTemplate] <String>]
    [[-KeyLength] <Int32>]
    [[-Store] <String>]
    [[-Folder] <String>]
    [[-Flag] <String[]>]
    [[-Dns] <String[]>]
    [-SelfSigned]
    [-EnableException]
    [[-HashAlgorithm] <String>]
    [[-MonthsValid] <Int32>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaComputerCertificate
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate" }

Creates a computer certificate signed by the local domain CA for the local machine with the keylength of 1024.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName Server1
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate -ComputerName Server1" }

Creates a computer certificate signed by the local domain CA _on the local machine_ for server1 with the keylength of 1024.<br>
The certificate is then copied to the new machine over WinRM and imported.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096" }

Creates a computer certificate for sqlcluster, signed by the local domain CA, with the keylength of 4096.<br>
The certificate is then copied to sqla _and_ sqlb over WinRM and imported.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName Server1 -WhatIf
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate -ComputerName Server1 -WhatIf" }

Shows what would happen if the command were run<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaComputerCertificate -SelfSigned
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate -SelfSigned" }

Creates a self-signed certificate<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaComputerCertificate -SelfSigned -HashAlgorithm Sha256 -MonthsValid 60
```
{: data-copyable="true" data-clean-code="New-DbaComputerCertificate -SelfSigned -HashAlgorithm Sha256 -MonthsValid 60" }

Creates a self-signed certificate using the SHA256 hashing algorithm that does not expire for 5 years<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer or computers where the certificate will be created and installed. Defaults to localhost.  
For SQL Server clusters, specify each cluster node here and use ClusterInstanceName for the cluster's virtual name.  
The certificate is created locally and then copied to remote machines via WinRM if needed.

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

##### -CaServer

Specifies the Certificate Authority server that will sign the certificate request.  
When omitted, the function automatically discovers the CA server from Active Directory.  
Required for domain-signed certificates when automatic discovery fails.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CaName

Specifies the Certificate Authority name on the CA server.  
When omitted, the function automatically discovers the CA name from Active Directory.  
Must match the exact CA name as registered in the domain's PKI infrastructure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClusterInstanceName

Specifies the virtual cluster name when creating certificates for SQL Server failover clusters.  
The certificate subject and SAN will use this cluster name instead of individual node names.  
Use ComputerName to specify each physical cluster node where the certificate will be installed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Specifies the password used to protect the private key during certificate export and import operations.  
Required when installing certificates on remote machines to secure the private key during transport.  
The same password is used for both export from the local machine and import on remote machines.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FriendlyName

Specifies the friendly name displayed in the certificate store to help identify the certificate.  
Defaults to "SQL Server" making it easy to locate certificates intended for SQL Server encryption.  
Choose descriptive names like "SQL Prod Cluster" or "SQL Dev Server" for better organization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SQL Server |

##### -CertificateTemplate

Specifies the Active Directory Certificate Template used for certificate generation.  
Defaults to "WebServer" which provides the necessary server authentication capabilities for SQL Server encryption.  
The template must exist in your domain's PKI and allow auto-enrollment for your account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | WebServer |

##### -KeyLength

Specifies the RSA key size in bits for the certificate's private key.  
Defaults to 1024 bits, though 2048 or 4096 bits provide better security for production environments.  
Longer keys provide stronger encryption but may slightly impact performance during SSL handshakes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1024 |

##### -Store

Specifies the certificate store location where the certificate will be installed.  
Defaults to "LocalMachine" which makes certificates available to services like SQL Server.  
Use "CurrentUser" only for user-specific certificates that don't need service access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LocalMachine |

##### -Folder

Specifies the certificate store folder where the certificate will be placed.  
Defaults to "My" (Personal certificates) which is where SQL Server looks for server certificates.  
Use "TrustedPeople" or other folders only for specific certificate trust scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | My |

##### -Flag

Specifies how the certificate's private key should be handled during import operations.  
Defaults to "Exportable, PersistKeySet" allowing the key to be backed up and persisted on disk.  
Use "NonExportable" for high-security environments where private keys should never leave the machine.  
"UserProtected" requires interactive confirmation and only works on localhost installations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @("Exportable", "PersistKeySet") |
| Accepted Values | EphemeralKeySet,Exportable,PersistKeySet,UserProtected,NonExportable |

##### -Dns

Specifies additional DNS names to include in the certificate's Subject Alternative Name (SAN) extension.  
By default, includes the computer name and FQDN, or cluster name and cluster FQDN for clusters.  
Add extra DNS names that clients will use to connect, such as aliases or load balancer names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SelfSigned

Creates a self-signed certificate instead of requesting one from a Certificate Authority.  
Useful for development environments or when no domain CA is available.  
Self-signed certificates will generate trust warnings unless manually added to client trust stores.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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

##### -HashAlgorithm

Specifies the cryptographic hash algorithm used for certificate signing.  
Defaults to "sha1" for compatibility, though "Sha256" or higher is recommended for production security.  
Modern browsers and applications prefer SHA-256 or higher; avoid MD5 and MD4 for security reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | sha1 |
| Accepted Values | Sha256,sha384,sha512,sha1,md5,md4,md2 |

##### -MonthsValid

Specifies how many months the self-signed certificate remains valid from the creation date.  
Defaults to 12 months; use longer periods like 60 months (5 years) to reduce certificate renewal frequency.  
Only applies to self-signed certificates; CA-signed certificates use the CA's validity period.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 12 |

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
