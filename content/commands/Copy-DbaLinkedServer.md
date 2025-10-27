---
title: "Copy-DbaLinkedServer"
slug: "Copy-DbaLinkedServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates linked servers and their authentication credentials from one SQL Server instance to another"
tags:
  - "WSMan"
  - "Migration"
  - "LinkedServer"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaLinkedServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaLinkedServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaLinkedServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaLinkedServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Migrates linked servers and their authentication credentials from one SQL Server instance to another

## Description

Migrates SQL Server linked servers including all authentication credentials and connection settings from a source instance to one or more destination instances. The function preserves usernames and passwords by using password decryption techniques, eliminating the need to manually recreate linked server configurations and re-enter sensitive credentials.  
  
This is particularly useful during server migrations, disaster recovery scenarios, or when consolidating environments where maintaining external data connections is critical. The function handles various provider types and can optionally upgrade older SQL Client providers to current versions during migration.  
  
Credit: Password decryption techniques provided by Antti Rantasaari (NetSPI, 2014) - https://blog.netspi.com/decrypting-mssql-database-link-server-passwords/

## Syntax

```powershell
Copy-DbaLinkedServer
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-LinkedServer] <Object[]>]
    [[-ExcludeLinkedServer] <Object[]>]
    [-UpgradeSqlClient]
    [-ExcludePassword]
    [-Force]
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
PS C:\> Copy-DbaLinkedServer -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaLinkedServer -Source sqlserver2014a -Destination sqlcluster" }

Copies all SQL Server Linked Servers on sqlserver2014a to sqlcluster. If Linked Server exists on destination, it will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaLinkedServer -Source sqlserver2014a -Destination sqlcluster -LinkedServer SQL2K5,SQL2k -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaLinkedServer -Source sqlserver2014a -Destination sqlcluster -LinkedServer SQL2K5,SQL2k -Force" }

Copies over two SQL Server Linked Servers (SQL2K and SQL2K2) from sqlserver to sqlcluster. If the credential already exists on the destination, it will be dropped.<br>

### Required Parameters

##### -Source

Source SQL Server (2005 and above). You must have sysadmin access to both SQL Server and Windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server (2005 and above). You must have sysadmin access to both SQL Server and Windows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LinkedServer

Specifies which linked servers to copy from the source instance. Accepts an array of linked server names.  
Use this when you only need to migrate specific linked servers rather than all of them.  
If omitted, all linked servers from the source will be copied to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLinkedServer

Specifies linked servers to skip during the copy operation. Accepts an array of linked server names.  
Use this when you want to copy most linked servers but exclude problematic ones or those that shouldn't be migrated.  
This parameter is ignored if LinkedServer is specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UpgradeSqlClient

Updates older SQL Server Native Client providers (SQLNCLI) to the newest version available on the destination server.  
Use this when migrating from older SQL Server versions to ensure linked servers use current client libraries.  
The function automatically detects and upgrades to the highest numbered SQLNCLI provider found on the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludePassword

Copies linked server definitions without migrating stored passwords or sensitive authentication data.  
Use this in security-conscious environments where password decryption is restricted or when passwords should be manually reset after migration.  
Linked servers will be created but authentication credentials will need to be reconfigured.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates linked servers that already exist on the destination instance.  
Use this when you need to overwrite existing linked server configurations with updated settings from the source.  
Without this parameter, existing linked servers on the destination are skipped to prevent accidental overwrites.

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
