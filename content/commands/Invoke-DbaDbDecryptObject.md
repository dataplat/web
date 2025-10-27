---
title: "Invoke-DbaDbDecryptObject"
slug: "Invoke-DbaDbDecryptObject"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Decrypts encrypted stored procedures, functions, views, and triggers using Dedicated Admin Connection (DAC)"
tags:
  - "Encryption"
  - "Decrypt"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDecryptObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbDecryptObject"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbDecryptObject</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDecryptObject.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Decrypts encrypted stored procedures, functions, views, and triggers using Dedicated Admin Connection (DAC)

## Description

Recovers the original source code from encrypted database objects when the original scripts have been lost or are unavailable. This command uses the Dedicated Admin Connection (DAC) to access binary data from sys.sysobjvalues and performs XOR decryption to retrieve the original T-SQL code.  
  
This is particularly useful in disaster recovery scenarios where you need to recreate objects but only have access to the encrypted versions in the database. The function can decrypt stored procedures, user-defined functions (scalar, inline, table-valued), views, and triggers.  
  
The command outputs results to the console by default, with an option to export all decrypted objects to organized .sql files in a folder structure.  
  
To connect to a remote SQL instance, the remote dedicated administrator connection option must be configured. The binary versions of encrypted objects can only be retrieved using a DAC connection.  
You can check the remote DAC connection with:  
'Get-DbaSpConfigure -SqlInstance [yourinstance] -ConfigName RemoteDacConnectionsEnabled'  
The ConfiguredValue should be 1.  
  
The local DAC connection is enabled by default.  
  
To enable remote DAC connections, use:  
'Set-DbaSpConfigure -SqlInstance [yourinstance] -ConfigName RemoteDacConnectionsEnabled -Value 1'  
In some cases you may need to restart the SQL Server instance after enabling this setting.

## Syntax

```powershell
Invoke-DbaDbDecryptObject
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Database] <Object[]>
    [[-ObjectName] <String[]>]
    [[-EncodingType] <String>]
    [[-ExportDestination] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1" }

Decrypt object "Function1" in DB1 of instance SQLDB1 and output the data to the user.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1 -ExportDestination C:\temp\decrypt
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1 -ExportDestination C:\temp\decrypt" }

Decrypt object "Function1" in DB1 of instance SQLDB1 and output the data to the folder "C:\temp\decrypt".<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ExportDestination C:\temp\decrypt
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ExportDestination C:\temp\decrypt" }

Decrypt all objects in DB1 of instance SQLDB1 and output the data to the folder "C:\temp\decrypt"<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1, Function2
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1, Function2" }

Decrypt objects "Function1" and "Function2" and output the data to the user.<br>

#####  Example:  5 

```powershell
PS C:\> "SQLDB1" | Invoke-DbaDbDecryptObject -Database DB1 -ObjectName Function1, Function2
```
{: data-copyable="true" data-clean-code="&quot;SQLDB1&quot; | Invoke-DbaDbDecryptObject -Database DB1 -ObjectName Function1, Function2" }

Decrypt objects "Function1" and "Function2" and output the data to the user using a pipeline for the instance.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Database

Specifies which databases contain the encrypted objects you want to decrypt. Accepts multiple database names.  
Use this to target specific databases instead of searching across all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -ObjectName

Specifies the names of encrypted objects to decrypt (stored procedures, functions, views, or triggers). Accepts multiple object names.  
When omitted, all encrypted objects in the specified databases will be decrypted. Use this to target specific objects when you only need a few items recovered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncodingType

Determines the text encoding used during the XOR decryption process to convert binary data back to readable T-SQL code. Defaults to ASCII.  
Use UTF8 when dealing with databases that contain Unicode characters in object definitions or when ASCII decryption produces garbled text.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | ASCII |
| Accepted Values | ASCII,UTF8 |

##### -ExportDestination

Specifies the folder path where decrypted T-SQL scripts will be saved as individual .sql files.  
When specified, creates an organized folder structure by instance, database, and object type (e.g., C:\temp\decrypt\SQLDB1\DB1\StoredProcedure). When omitted, results are displayed in the console   
only.

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


&nbsp;
