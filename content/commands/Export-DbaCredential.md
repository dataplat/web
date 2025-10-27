---
title: "Export-DbaCredential"
slug: "Export-DbaCredential"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports SQL Server credentials to executable T-SQL CREATE CREDENTIAL scripts"
tags:
  - "Credential"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaCredential.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaCredential"
draft: false
---

# Export-DbaCredential

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaCredential](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaCredential.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaCredential](https://dataplat.github.io/boh#Export-DbaCredential).

## Synopsis

Exports SQL Server credentials to executable T-SQL CREATE CREDENTIAL scripts

## Description

Exports SQL Server credentials to T-SQL files containing CREATE CREDENTIAL statements that can recreate the credentials on another instance. By default, this includes decrypted passwords, making it perfect for migration scenarios where you need to move credentials between servers.  
  
The function generates executable T-SQL scripts that DBAs can run to recreate credentials during migrations, disaster recovery, or when setting up new environments. When passwords are included, the function requires sysadmin privileges and remote Windows registry access to decrypt the stored secrets.  
  
Use the ExcludePassword parameter to export credential definitions without sensitive data for documentation or security-conscious scenarios.

## Syntax

```powershell
Export-DbaCredential
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Identity] <String[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-ExcludePassword]
    [-Append]
    [[-InputObject] <Credential[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaCredential -SqlInstance sql2017 -Path C:\temp\cred.sql
```

Exports credentials, including passwords, from sql2017 to the file C:\temp\cred.sql<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Identity

Specifies which credential names to export by filtering on the Identity property. Accepts an array of credential names.  
Use this to export specific credentials instead of all credentials, particularly useful when migrating only certain application or service accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -Credential

Login to the target OS using alternative credentials. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory where the exported T-SQL script file will be saved. Defaults to the configured DbatoolsExport path.  
Use this when you want to control where credential scripts are stored for organization or compliance requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path and name for the exported T-SQL script. Overrides the Path parameter when specified.  
Use this when you need precise control over the output file name and location, especially for automated processes.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludePassword

Exports credential definitions without the actual password values, replacing them with placeholder text.  
Use this for documentation purposes or when you need credential structure without sensitive data for security reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Append

Adds the exported credential scripts to an existing file instead of overwriting it.  
Use this when consolidating credentials from multiple instances into a single deployment script.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts credential objects piped from Get-DbaCredential, allowing for advanced filtering and processing scenarios.  
Use this in pipeline operations when you need to filter or process credentials before exporting them.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
