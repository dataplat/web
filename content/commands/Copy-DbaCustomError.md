---
title: "Copy-DbaCustomError"
slug: "Copy-DbaCustomError"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates custom error messages and their language translations between SQL Server instances"
tags:
  - "Migration"
  - "CustomError"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaCustomError.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaCustomError"
draft: false
---

# Copy-DbaCustomError

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaCustomError](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaCustomError.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaCustomError](https://dataplat.github.io/boh#Copy-DbaCustomError).

## Synopsis

Migrates custom error messages and their language translations between SQL Server instances

## Description

Copies user-defined error messages from the source server's sys.messages system catalog to one or more destination servers. This is essential when migrating applications that rely on custom error numbers and messages, or when standardizing error handling across multiple SQL Server environments.  
  
Custom errors created with sp_addmessage are automatically discovered and migrated, including all language translations. The English (us_english) version is always created first since SQL Server requires it as the base language before adding translations.  
  
By default, existing custom errors on the destination are skipped to prevent conflicts. Use -Force to overwrite existing errors. If you drop the English version of a custom error, all language translations for that error ID are automatically dropped as well.

## Syntax

```powershell
Copy-DbaCustomError
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-CustomError] <Object[]>]
    [[-ExcludeCustomError] <Object[]>]
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
PS C:\> Copy-DbaCustomError -Source sqlserver2014a -Destination sqlcluster
```

Copies all server custom errors from sqlserver2014a to sqlcluster using Windows credentials. If custom errors with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaCustomError -Source sqlserver2014a -SourceSqlCredential $scred -Destination sqlcluster -DestinationSqlCredential $dcred -CustomError 60000 -Force
```

Copies only the custom error with ID number 60000 from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If a custom error with the same <br>
name exists on sqlcluster, it will be updated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaCustomError -Source sqlserver2014a -Destination sqlcluster -ExcludeCustomError 60000 -Force
```

Copies all the custom errors found on sqlserver2014a except the custom error with ID number 60000 to sqlcluster. If a custom error with the same name exists on sqlcluster, it will be updated because <br>
-Force was used.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaCustomError -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server. You must have sysadmin access and the server must be SQL Server 2000 or higher.

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

##### -CustomError

Specifies which custom error message IDs to migrate from the source server. Only the specified error numbers will be copied to the destination.  
Use this when you need to migrate specific custom errors rather than all of them, such as when standardizing only certain application error codes across environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCustomError

Specifies which custom error message IDs to skip during migration. All custom errors except the excluded ones will be copied.  
Use this when you want to migrate most custom errors but exclude problematic ones, or when certain error IDs are environment-specific and shouldn't be copied.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Overwrites existing custom errors on the destination server by dropping and recreating them with source values.  
Use this when you need to update custom error messages that have changed on the source, or when synchronizing error definitions across environments.

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
