---
title: "Remove-DbaComputerCertificate"
slug: "Remove-DbaComputerCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes certificates from Windows certificate stores on local or remote computers"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaComputerCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaComputerCertificate"
draft: false
---

# Remove-DbaComputerCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaComputerCertificate](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaComputerCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaComputerCertificate](https://dataplat.github.io/boh#Remove-DbaComputerCertificate).

## Synopsis

Removes certificates from Windows certificate stores on local or remote computers

## Description

Removes certificates from Windows certificate stores on local or remote computers using PowerShell remoting. This is essential for managing SSL/TLS certificates used by SQL Server instances for encrypted connections and authentication. DBAs commonly use this to clean up expired certificates, remove compromised certificates during security incidents, or manage certificate lifecycle during SQL Server migrations and decommissions. The function targets specific certificates by thumbprint and can work across multiple certificate stores and folders.

## Syntax

```powershell
Remove-DbaComputerCertificate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-Thumbprint] <String[]>
    [[-Store] <String>]
    [[-Folder] <String>]
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
PS C:\> Remove-DbaComputerCertificate -ComputerName Server1 -Thumbprint C2BBE81A94FEE7A26FFF86C2DFDAF6BFD28C6C94
```

Removes certificate with thumbprint C2BBE81A94FEE7A26FFF86C2DFDAF6BFD28C6C94 in the LocalMachine store on Server1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaComputerCertificate | Where-Object Thumbprint -eq E0A071E387396723C45E92D42B2D497C6A182340 | Remove-DbaComputerCertificate
```

Removes certificate using the pipeline<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaComputerCertificate -ComputerName Server1 -Thumbprint C2BBE81A94FEE7A26FFF86C2DFDAF6BFD28C6C94 -Store User -Folder My
```

Removes certificate with thumbprint C2BBE81A94FEE7A26FFF86C2DFDAF6BFD28C6C94 in the User\My (Personal) store on Server1<br>

### Required Parameters

##### -Thumbprint

Specifies the unique thumbprint(s) of the certificate(s) to remove. This is the SHA-1 hash that uniquely identifies each certificate.  
Use Get-DbaComputerCertificate to find thumbprints of certificates you want to remove, commonly needed when cleaning up expired SSL certificates or removing compromised certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where certificates will be removed. Defaults to localhost.  
Use this when managing SSL certificates across multiple SQL Server instances or cleaning up certificates on remote servers during migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative credentials

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Store

Specifies the certificate store location where certificates will be removed. Defaults to LocalMachine.  
Use LocalMachine for system-wide certificates (typical for SQL Server SSL certificates) or CurrentUser for user-specific certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LocalMachine |

##### -Folder

Specifies the certificate store folder (subfolder) where certificates will be removed. Defaults to 'My' (Personal certificates).  
Common folders include 'My' for SSL certificates used by SQL Server, 'Root' for trusted root certificates, or 'TrustedPeople' for trusted person certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | My |

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
