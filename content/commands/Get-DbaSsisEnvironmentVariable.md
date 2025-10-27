---
title: "Get-DbaSsisEnvironmentVariable"
slug: "Get-DbaSsisEnvironmentVariable"
date: 2024-01-01
layout: "single"
author: "Bartosz Ratajczyk (@b_ratajczyk)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves environment variables from SSIS Catalog with decrypted sensitive values"
tags:
  - "SSIS"
  - "SSISDB"
  - "Variable"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisEnvironmentVariable.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSsisEnvironmentVariable"
draft: false
---

# Get-DbaSsisEnvironmentVariable

| Property | Value |
| --- | --- |
| **Author** | Bartosz Ratajczyk (@b_ratajczyk) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSsisEnvironmentVariable](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisEnvironmentVariable.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSsisEnvironmentVariable](https://dataplat.github.io/boh#Get-DbaSsisEnvironmentVariable).

## Synopsis

Retrieves environment variables from SSIS Catalog with decrypted sensitive values

## Description

Retrieves all variables from specified SSIS environments stored in the SSISDB catalog database. All sensitive values are automatically decrypted and returned in plaintext for configuration management and troubleshooting purposes.  
  
This function queries the SSISDB database directly using symmetric keys and certificates to decrypt sensitive variable values, bypassing the standard SMO limitations that only return encrypted values. This is essential for SSIS environment configuration audits, parameter validation, and deployment verification.  
  
The function communicates directly with SSISDB database - the SQL Server Integration Services service isn't queried. Each parameter (besides SqlInstance and SqlCredential) acts as a filter to include or exclude specific environments or folders.

## Syntax

```powershell
Get-DbaSsisEnvironmentVariable
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Environment] <Object[]>]
    [[-EnvironmentExclude] <Object[]>]
    [[-Folder] <Object[]>]
    [[-FolderExclude] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -Folder DWH_ETL
```

Gets variables of 'DEV' environment located in 'DWH_ETL' folder on 'localhost' Server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -Folder DWH_ETL, DEV2, QA
```

Gets variables of 'DEV' environment(s) located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -FolderExclude DWH_ETL, DEV2, QA
```

Gets variables of 'DEV' environments located in folders other than 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV, PROD -Folder DWH_ETL, DEV2, QA
```

Gets variables of 'DEV' and 'PROD' environment(s) located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -Folder DWH_ETL, DEV2, QA
```

Gets variables of environments other than 'DEV' and 'PROD' located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -FolderExclude DWH_ETL, DEV2, QA
```

Gets variables of environments other than 'DEV' and 'PROD' located in folders other than 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  7 

```powershell
PS C:\> 'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD
```

Gets all SSIS environments except 'DEV' and 'PROD' from 'localhost' server. The server name comes from pipeline<br>

#####  Example:  8 

```powershell
PS C:\> 'SRV1', 'SRV3' | Get-DbaSsisEnvironmentVariable
```

Gets all SSIS environments from 'SRV1' and 'SRV3' servers. The server's names come from pipeline<br>

#####  Example:  9 

```powershell
PS C:\> 'SRV1', 'SRV2' | Get-DbaSsisEnvironmentVariable DEV | Out-GridView
```

Gets all variables from 'DEV' Environment(s) on servers 'SRV1' and 'SRV2' and outputs it as the GridView.<br>
The server names come from the pipeline.<br>

#####  Example:  10 

```powershell
PS C:\> 'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD | Select-Object -Property Name, Value | Where-Object {$_.Name -match '^a'} | Out-GridView
```

Gets all variables from Environments other than 'DEV' and 'PROD' on 'localhost' server,<br>
selects Name and Value properties for variables that names start with letter 'a' and outputs it as the GridView<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.  
This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -Environment

Specifies one or more SSIS environment names to retrieve variables from within the SSISDB catalog.  
Use this when you need variables from specific environments like 'DEV', 'QA', or 'PROD' rather than all environments in a folder.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EnvironmentExclude

Excludes specified SSIS environment names from the results when retrieving variables.  
Most effective when used without the Environment parameter to get all environments except those specified.  
Helpful when you want to audit all non-production environments or exclude specific environments from configuration reviews.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Folder

Specifies one or more SSISDB catalog folder names that contain the environments you want to query.  
Use this to limit your search to specific project folders when you have environments organized by application or team.  
If omitted, the function searches all folders in the SSISDB catalog.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FolderExclude

Excludes specified SSISDB catalog folder names from the search when retrieving environment variables.  
Most effective when used without the Folder parameter to search all folders except those specified.  
Useful when you want to exclude test folders, archived projects, or specific application folders from your audit.

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
