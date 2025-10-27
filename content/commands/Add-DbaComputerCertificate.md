---
title: "Add-DbaComputerCertificate"
slug: "Add-DbaComputerCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Imports X.509 certificates into the Windows certificate store on local or remote computers."
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Add-DbaComputerCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Add-DbaComputerCertificate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Add-DbaComputerCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Add-DbaComputerCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Imports X.509 certificates into the Windows certificate store on local or remote computers.

## Description

Imports X.509 certificates (including password-protected .pfx files with private keys) into the specified Windows certificate store on one or more computers. This function is essential for SQL Server TLS/SSL encryption setup, Availability Group certificate requirements, and Service Broker security configurations.  
  
The function handles both certificate files from disk and certificate objects from the pipeline, supports remote installation via PowerShell remoting, and allows you to control import behavior through various flags like exportable/non-exportable private keys. By default, certificates are installed to the LocalMachine\My (Personal) store with exportable and persistent private keys, which is the standard location for SQL Server service certificates.

## Syntax

```powershell
Add-DbaComputerCertificate
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-SecurePassword] <SecureString>]
    [[-Certificate] <X509Certificate2[]>]
    [[-Path] <String>]
    [[-Store] <String>]
    [[-Folder] <String>]
    [[-Flag] <String[]>]
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
PS C:\> Add-DbaComputerCertificate -ComputerName Server1 -Path C:\temp\cert.cer
```
{: data-copyable="true" data-clean-code="Add-DbaComputerCertificate -ComputerName Server1 -Path C:\temp\cert.cer" }

Adds the local C:\temp\cert.cer to the remote server Server1 in LocalMachine\My (Personal).<br>

#####  Example:  2 

```powershell
PS C:\> Add-DbaComputerCertificate -Path C:\temp\cert.cer
```
{: data-copyable="true" data-clean-code="Add-DbaComputerCertificate -Path C:\temp\cert.cer" }

Adds the local C:\temp\cert.cer to the local computer's LocalMachine\My (Personal) certificate store.<br>

#####  Example:  3 

```powershell
PS C:\> Add-DbaComputerCertificate -Path C:\temp\cert.cer
```
{: data-copyable="true" data-clean-code="Add-DbaComputerCertificate -Path C:\temp\cert.cer" }

Adds the local C:\temp\cert.cer to the local computer's LocalMachine\My (Personal) certificate store.<br>

#####  Example:  4 

```powershell
PS C:\> Add-DbaComputerCertificate -ComputerName sql01 -Path C:\temp\sql01.pfx -Confirm:$false -Flag NonExportable
```
{: data-copyable="true" data-clean-code="Add-DbaComputerCertificate -ComputerName sql01 -Path C:\temp\sql01.pfx -Confirm:$false -Flag NonExportable" }

Adds the local C:\temp\sql01.pfx to sql01's LocalMachine\My (Personal) certificate store and marks the private key as non-exportable. Skips confirmation prompt.<br>

### Optional Parameters

##### -ComputerName

The target computer or computers where certificates will be installed. Accepts server names, FQDNs, or IP addresses.  
Use this when installing certificates on remote SQL Server hosts or cluster nodes. Defaults to localhost when not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to $ComputerName using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

The password for encrypted certificate files (.pfx files with private keys). Required when importing password-protected certificates.  
Use this when installing SSL certificates or Service Broker certificates that were exported with password protection.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

A certificate object from the pipeline or PowerShell variable. Accepts X509Certificate2 objects from Get-ChildItem Cert:\ or other certificate commands.  
Use this when you already have certificate objects loaded in memory rather than reading from disk files.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Path

The local file path to the certificate file (.cer, .crt, .pfx, .p12). The file must be accessible from the machine running the command.  
Specify this when installing certificates from files on disk, commonly used for SSL certificates or custom CA certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Store

The certificate store location where certificates will be installed. Options are LocalMachine (system-wide) or CurrentUser (user-specific).  
Use LocalMachine for SQL Server service certificates and system certificates that need to be available to services. Defaults to LocalMachine.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | LocalMachine |

##### -Folder

The certificate store folder within the specified store. Common folders include My (Personal), Root (Trusted Root), and CA (Intermediate).  
Use My for SQL Server SSL certificates and Service Broker certificates. Defaults to My which is the Personal certificate store.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | My |

##### -Flag

Controls how certificate private keys are stored and accessed in the Windows certificate store. Determines security and accessibility characteristics.  
Use NonExportable for production SQL Server certificates to prevent private key extraction. Use Exportable when you need to back up or migrate certificates.  
Defaults to: Exportable, PersistKeySet  
    EphemeralKeySet  
    The key associated with a PFX file is created in memory and not persisted on disk when importing a certificate.  
    Exportable  
    Imported keys are marked as exportable.  
    NonExportable  
    Expliictly mark keys as nonexportable.  
    PersistKeySet  
    The key associated with a PFX file is persisted when importing a certificate.  
    UserProtected  
    Notify the user through a dialog box or other method that the key is accessed. The Cryptographic Service Provider (CSP) in use defines the precise behavior. NOTE: This can only be used when you   
add a certificate to localhost, as it causes a prompt to appear.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @("Exportable", "PersistKeySet") |
| Accepted Values | EphemeralKeySet,Exportable,PersistKeySet,UserProtected,NonExportable |

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

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
