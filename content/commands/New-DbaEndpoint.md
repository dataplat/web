---
title: "New-DbaEndpoint"
slug: "New-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates SQL Server endpoints for database mirroring, Service Broker, SOAP, or T-SQL communication."
tags:
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaEndpoint"
draft: false
---

# New-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/New-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaEndpoint](https://dataplat.github.io/boh#New-DbaEndpoint).

## Synopsis

Creates SQL Server endpoints for database mirroring, Service Broker, SOAP, or T-SQL communication.

## Description

Creates SQL Server endpoints that enable communication between instances for high availability features like availability groups and database mirroring. Database mirroring endpoints are the most common type, required for setting up availability groups and database mirroring partnerships. The function also supports Service Broker endpoints for message queuing, SOAP endpoints for web services, and T-SQL endpoints for remote connections. Automatically generates TCP ports if not specified and handles encryption settings to ensure secure communication between SQL Server instances.

## Syntax

```powershell
New-DbaEndpoint
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String>]
    [[-Type] <String>]
    [[-Protocol] <String>]
    [[-Role] <String>]
    [[-EndpointEncryption] <String>]
    [[-EncryptionAlgorithm] <String>]
    [[-AuthenticationOrder] <String>]
    [[-Certificate] <String>]
    [[-IPAddress] <IPAddress>]
    [[-Port] <Int32>]
    [[-SslPort] <Int32>]
    [[-Owner] <String>]
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
PS C:\> New-DbaEndpoint -SqlInstance localhost\sql2017 -Type DatabaseMirroring
```

Creates a database mirroring endpoint on localhost\sql2017 which using the default port<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaEndpoint -SqlInstance localhost\sql2017 -Type DatabaseMirroring -Port 5055
```

Creates a database mirroring endpoint on localhost\sql2017 which uses alternative port 5055<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaEndpoint -SqlInstance localhost\sql2017 -Type DatabaseMirroring -IPAddress 192.168.0.15 -Port 5055
```

Creates a database mirroring endpoint on localhost\sql2017 which binds only on ipaddress 192.168.0.15 and port 5055<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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

##### -Name

Specifies the name for the new endpoint. Defaults to hadr_endpoint for DatabaseMirroring endpoints.  
Required when creating ServiceBroker, Soap, or TSql endpoints as these need unique names for identification.

| Property | Value |
| --- | --- |
| Alias | Endpoint |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Defines the endpoint type to create. DatabaseMirroring endpoints enable availability groups and database mirroring.  
ServiceBroker enables message queuing, Soap creates web service endpoints, and TSql allows remote connections. Defaults to DatabaseMirroring.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | DatabaseMirroring |
| Accepted Values | DatabaseMirroring,ServiceBroker,Soap,TSql |

##### -Protocol

Sets the communication protocol for the endpoint. TCP is standard for database mirroring and availability groups.  
Use Http for SOAP endpoints, NamedPipes for local connections, or SharedMemory for same-machine communication. Defaults to Tcp.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Tcp |
| Accepted Values | Tcp,NamedPipes,Http,Via,SharedMemory |

##### -Role

Determines the database mirroring role this endpoint can serve. All allows the instance to act as principal, mirror, or witness.  
Partner restricts to principal/mirror roles only, Witness allows witness-only, None disables mirroring roles. Defaults to All.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | All |
| Accepted Values | All,None,Partner,Witness |

##### -EndpointEncryption

Controls whether encryption is enforced for endpoint connections. Required forces all connections to use encryption.  
Supported allows both encrypted and unencrypted connections, Disabled prevents encryption. Defaults to Required for security.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Required |
| Accepted Values | Disabled,Required,Supported |

##### -EncryptionAlgorithm

Sets the encryption algorithm used to secure endpoint communications. AES provides the strongest security.  
RC4 options are available for backward compatibility but are less secure. Use None only when encryption is disabled. Defaults to Aes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Aes |
| Accepted Values | Aes,AesRC4,None,RC4,RC4Aes |

##### -AuthenticationOrder

Defines the authentication methods and their priority order for endpoint connections. Negotiate automatically chooses the best available method.  
Use certificate options when requiring certificate-based authentication, or specific methods like Kerberos for domain environments. Defaults to Negotiate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Certificate,CertificateKerberos,CertificateNegotiate,CertificateNtlm,Kerberos,KerberosCertificate,Negotiate,NegotiateCertificate,Ntlm,NtlmCertificate |

##### -Certificate

Name of a database certificate to use for endpoint authentication instead of Windows authentication.  
The certificate must already exist in the master database and provides certificate-based authentication for enhanced security.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IPAddress

Sets which IP address the endpoint listens on for incoming connections. Use 0.0.0.0 to listen on all available interfaces.  
Specify a particular IP address to restrict connections to that interface only, useful for multi-homed servers. Defaults to 0.0.0.0 (all interfaces).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0.0.0.0 |

##### -Port

Specifies the TCP port number for the endpoint to listen on. Auto-generates a port starting from 5022 if not specified.  
Use this when you need a specific port for firewall rules or standardization across instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SslPort

Sets the SSL port number for HTTPS endpoints when using HTTP protocol. Only applicable for Soap endpoints using HTTPS.  
Required when creating secure web service endpoints that need encrypted communication over HTTP.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Owner

Sets the SQL Server login that owns the endpoint. The owner has full control permissions on the endpoint.  
Defaults to the sa account if available, otherwise uses the current connection's login for ownership.

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
