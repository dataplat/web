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

# Invoke-DbaDbDecryptObject

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbDecryptObject](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbDecryptObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbDecryptObject](https://dataplat.github.io/boh#Invoke-DbaDbDecryptObject).

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

Decrypt object "Function1" in DB1 of instance SQLDB1 and output the data to the user.<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1 -ExportDestination C:\temp\decrypt
```

Decrypt object "Function1" in DB1 of instance SQLDB1 and output the data to the folder "C:\temp\decrypt".<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ExportDestination C:\temp\decrypt
```

Decrypt all objects in DB1 of instance SQLDB1 and output the data to the folder "C:\temp\decrypt"<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbDecryptObject -SqlInstance SQLDB1 -Database DB1 -ObjectName Function1, Function2
```

Decrypt objects "Function1" and "Function2" and output the data to the user.<br>

#####  Example:  5 

```powershell
PS C:\> "SQLDB1" | Invoke-DbaDbDecryptObject -Database DB1 -ObjectName Function1, Function2
```

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
