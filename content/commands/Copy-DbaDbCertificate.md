---
title: "Copy-DbaDbCertificate"
slug: "Copy-DbaDbCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies database-level certificates from source SQL Server to destination servers, including private keys and master key dependencies."
tags:
  - "Migration"
  - "Certificate"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDbCertificate"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaDbCertificate</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbCertificate.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies database-level certificates from source SQL Server to destination servers, including private keys and master key dependencies.

## Description

Transfers database certificates between SQL Server instances by backing them up from source databases and restoring them to matching databases on destination servers. This function handles the complex certificate migration process that's essential when moving databases with Transparent Data Encryption (TDE) or other certificate-based security features.  
  
The function backs up each certificate with its private key to a shared network path accessible by both source and destination SQL Server service accounts. It automatically creates database master keys on the destination if they don't exist and you provide the MasterKeyPassword parameter. Existing certificates are skipped unless you use the Force parameter to overwrite them.  
  
This is particularly useful for database migration projects, disaster recovery setup, and maintaining encryption consistency across environments where manual certificate management would be time-consuming and error-prone.

## Syntax

```powershell
Copy-DbaDbCertificate
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-ExcludeDatabase] <String[]>]
    [[-Certificate] <String[]>]
    [[-ExcludeCertificate] <String[]>]
    [[-SharedPath] <String>]
    [[-MasterKeyPassword] <SecureString>]
    [[-EncryptionPassword] <SecureString>]
    [[-DecryptionPassword] <SecureString>]
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
PS C:\> Copy-DbaDbCertificate -Source sql01 -Destination sql02 -EncryptionPassword $cred.Password -MasterKeyPassword $cred.Password -SharedPath \\nas\sql\shared
```
{: data-copyable="true" data-clean-code="Copy-DbaDbCertificate -Source sql01 -Destination sql02 -EncryptionPassword $cred.Password -MasterKeyPassword $cred.Password -SharedPath \\nas\sql\shared" }

Copies database certificates for matching databases on sql02 and creates master keys if needed<br>
Uses password from $cred object created by Get-Credential<br>

#####  Example:  2 

```powershell
PS C:\> $params1 = @{
>>      Source = "sql01"
>>      Destination = "sql02"
>>      EncryptionPassword = $passwd
>>      MasterKeyPassword = $passwd
>>      SharedPath = "\\nas\sql\shared"
>>  }
PS C:\> Copy-DbaDbCertificate @params1 -Confirm:$false -OutVariable results
```
{: data-copyable="true" data-clean-code="$params1 = @{
Source = &quot;sql01&quot;
Destination = &quot;sql02&quot;
EncryptionPassword = $passwd
MasterKeyPassword = $passwd
SharedPath = &quot;\\nas\sql\shared&quot;
}
Copy-DbaDbCertificate @params1 -Confirm:$false -OutVariable results" }

Copies database certificates for matching databases on sql02 and creates master keys if needed<br>

### Required Parameters

##### -Source

The source SQL Server instance containing the database certificates to copy. Requires sysadmin privileges to access certificate metadata and backup operations.  
Use this to specify where the certificates currently exist that need to be migrated to other servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

The destination SQL Server instance(s) where certificates will be restored. Accepts multiple servers for bulk certificate deployment.  
Requires sysadmin privileges to create master keys and restore certificates to matching databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Alternative credentials for connecting to the source SQL Server instance. Use this when the current Windows user lacks sufficient privileges or when connecting with SQL authentication.  
Essential for cross-domain scenarios or when running under service accounts that don't have source server access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for connecting to destination SQL Server instance(s). Required when destination servers are in different domains or when using SQL authentication.  
Must have permissions to create database master keys and restore certificates in target databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies which databases to include when copying certificates. Only certificates from these databases will be migrated to matching databases on destination servers.  
Use this to limit certificate copying to specific databases rather than processing all databases with certificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Excludes specific databases from certificate copying operations. Certificates in these databases will be skipped even if they exist on the source.  
Useful when you want to copy most database certificates but exclude system databases or specific application databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Certificate

Specifies which certificates to copy by name. Only these named certificates will be processed across all included databases.  
Use this to migrate specific certificates like TDE certificates while leaving other database certificates untouched.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCertificate

Excludes specific certificates from the copying process by name. These certificates will be skipped in all databases.  
Commonly used to exclude system-generated certificates or certificates that should remain environment-specific.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SharedPath

Network path where certificate backup files will be temporarily stored during the copy operation. Both source and destination SQL Server service accounts must have full access to this location.  
Required because certificates cannot be directly transferred between instances and must be backed up to disk first.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MasterKeyPassword

Password for creating database master keys on destination servers when they don't exist. Required for certificates that use master key encryption.  
Essential for TDE scenarios where certificates depend on database master keys for private key protection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncryptionPassword

Secure password used to encrypt the private key during certificate backup operations. If not provided, a random password is generated automatically.  
Specify this when you need consistent encryption passwords across multiple certificate operations or for compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DecryptionPassword

Password required to decrypt the private key when restoring certificates to destination databases. Must match the password used when the certificate was originally backed up.  
Use this when copying certificates that were previously backed up with a specific encryption password.

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
