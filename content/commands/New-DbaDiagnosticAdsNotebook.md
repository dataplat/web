---
title: "New-DbaDiagnosticAdsNotebook"
slug: "New-DbaDiagnosticAdsNotebook"
date: 2024-01-01
layout: "single"
author: "Gianluca Sartori (@spaghettidba)"
availability: "Windows, Linux, macOS"
synopsis: "Generates a Jupyter Notebook containing Glenn Berry's SQL Server diagnostic queries for Azure Data Studio"
tags:
  - "Community"
  - "GlennBerry"
  - "Notebooks"
  - "AzureDataStudio"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDiagnosticAdsNotebook.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDiagnosticAdsNotebook"
draft: false
---

# New-DbaDiagnosticAdsNotebook

| Property | Value |
| --- | --- |
| **Author** | Gianluca Sartori (@spaghettidba) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDiagnosticAdsNotebook](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDiagnosticAdsNotebook.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDiagnosticAdsNotebook](https://dataplat.github.io/boh#New-DbaDiagnosticAdsNotebook).

## Synopsis

Generates a Jupyter Notebook containing Glenn Berry's SQL Server diagnostic queries for Azure Data Studio

## Description

Converts Glenn Berry's well-known SQL Server diagnostic queries into a Jupyter Notebook (.ipynb) file that can be opened and executed in Azure Data Studio. The function automatically detects your SQL Server version or accepts a target version parameter, then creates a notebook with version-specific diagnostic queries formatted as executable cells. Each query includes descriptive markdown explaining what it measures and why it's useful for performance troubleshooting and health monitoring.

## Syntax

```powershell
New-DbaDiagnosticAdsNotebook
    [[-SqlInstance] <DbaInstanceParameter>]
    [[-SqlCredential] <PSCredential>]
    [[-TargetVersion] <String>]
    [-Path] <String>
    [-IncludeDatabaseSpecific]
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
PS C:\> New-DbaDiagnosticAdsNotebook -SqlInstance localhost -Path c:\temp\myNotebook.ipynb
```

Creates a new Jupyter Notebook named "myNotebook" based on the version of diagnostic queries found at localhost<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaDiagnosticAdsNotebook -TargetVersion 2016SP2 -Path c:\temp\myNotebook.ipynb
```

Creates a new Jupyter Notebook named "myNotebook" based on the version "2016SP2" of diagnostic queries<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaDiagnosticAdsNotebook -TargetVersion 2017 -Path c:\temp\myNotebook.ipynb -IncludeDatabaseSpecific
```

Creates a new Jupyter Notebook named "myNotebook" based on the version "2017" of diagnostic queries, including database-specific queries<br>

### Required Parameters

##### -Path

Specifies the full file path where the Jupyter Notebook (.ipynb file) will be created. The directory must exist and you must have write permissions to the location.  
The generated notebook can be opened in Azure Data Studio or any Jupyter-compatible environment for executing Glenn Berry's diagnostic queries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to the default instance on localhost.

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

##### -TargetVersion

Specifies the SQL Server version to generate diagnostic queries for when not connecting to a live instance. Use this when creating notebooks for offline analysis or different environments than your   
current connection.  
Must be one of "2005", "2008", "2008R2", "2012", "2014", "2016", "2016SP2", "2017", "2019", "2022", "AzureSQLDatabase". Cannot be used together with SqlInstance parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 2005,2008,2008R2,2012,2014,2016,2016SP2,2017,2019,2022,AzureSQLDatabase |

##### -IncludeDatabaseSpecific

Includes database-level diagnostic queries in addition to the default instance-level queries. These queries examine database-specific performance metrics, index usage, and database settings.  
Use this when you need detailed analysis of individual databases rather than just server-wide diagnostics. Defaults to $false.

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
