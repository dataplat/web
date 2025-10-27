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

# New-DbaComputerCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaComputerCertificate](https://github.com/dataplat/dbatools/blob/master/public/New-DbaComputerCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaComputerCertificate](https://dataplat.github.io/boh#New-DbaComputerCertificate).

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

Creates a computer certificate signed by the local domain CA for the local machine with the keylength of 1024.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName Server1
```

Creates a computer certificate signed by the local domain CA _on the local machine_ for server1 with the keylength of 1024.<br>
The certificate is then copied to the new machine over WinRM and imported.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName sqla, sqlb -ClusterInstanceName sqlcluster -KeyLength 4096
```

Creates a computer certificate for sqlcluster, signed by the local domain CA, with the keylength of 4096.<br>
The certificate is then copied to sqla _and_ sqlb over WinRM and imported.<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaComputerCertificate -ComputerName Server1 -WhatIf
```

Shows what would happen if the command were run<br>

#####  Example:  5 

```powershell
PS C:\> New-DbaComputerCertificate -SelfSigned
```

Creates a self-signed certificate<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaComputerCertificate -SelfSigned -HashAlgorithm Sha256 -MonthsValid 60
```

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
