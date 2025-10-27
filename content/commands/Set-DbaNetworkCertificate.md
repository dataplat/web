---
title: "Set-DbaNetworkCertificate"
slug: "Set-DbaNetworkCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Sets the network certificate for SQL Server instance"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaNetworkCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaNetworkCertificate"
draft: false
---

# Set-DbaNetworkCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaNetworkCertificate](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaNetworkCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaNetworkCertificate](https://dataplat.github.io/boh#Set-DbaNetworkCertificate).

## Synopsis

Sets the network certificate for SQL Server instance

## Description

Sets the network certificate for SQL Server instance. This setting is found in Configuration Manager.  
  
This command also grants read permissions for the service account on the certificate's private key.  
  
References:  
https://www.itprotoday.com/sql-server/7-steps-ssl-encryption  
https://azurebi.jppp.org/2016/01/23/using-lets-encrypt-certificates-for-secure-sql-server-connections/  
https://blogs.msdn.microsoft.com/sqlserverfaq/2016/09/26/creating-and-registering-ssl-certificates/

## Syntax

```powershell
Set-DbaNetworkCertificate
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    [-RestartService]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaNetworkCertificate
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    -Certificate <X509Certificate2>
    [-RestartService]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Set-DbaNetworkCertificate
    [-SqlInstance <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    -Thumbprint <String>
    [-RestartService]
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
PS C:\> New-DbaComputerCertificate | Set-DbaNetworkCertificate -SqlInstance localhost\SQL2008R2SP2
```

Creates and imports a new certificate signed by an Active Directory CA on localhost then sets the network certificate for the SQL2008R2SP2 to that newly created certificate.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaNetworkCertificate -SqlInstance sql1\SQL2008R2SP2 -Thumbprint 1223FB1ACBCA44D3EE9640F81B6BA14A92F3D6E2
```

Sets the network certificate for the SQL2008R2SP2 instance to the certificate with the thumbprint of 1223FB1ACBCA44D3EE9640F81B6BA14A92F3D6E2 in LocalMachine\My on sql1<br>

### Required Parameters

##### -Certificate

Specifies the X509Certificate2 object to configure as the network certificate for SQL Server.  
Use this when piping certificate objects from other dbatools commands like New-DbaComputerCertificate.  
The certificate must exist in the LocalMachine certificate store and have a private key for SQL Server to use it for SSL connections.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Thumbprint

Specifies the thumbprint (SHA-1 hash) of the certificate to configure as the network certificate.  
Use this when you know the specific certificate thumbprint from certificates already installed in LocalMachine\My.  
The certificate must have a private key and the SQL Server service account will be granted read permissions to it.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias | ComputerName |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to the computer (not sql instance) using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -RestartService

Forces an automatic restart of the SQL Server service after setting the network certificate.  
Certificate changes require a service restart to take effect - without this switch you'll need to manually restart SQL Server.  
Use this when you want the SSL configuration to be immediately active, but be aware it will cause a brief service interruption.

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
