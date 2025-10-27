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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaSsisEnvironmentVariable</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSsisEnvironmentVariable.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Bartosz Ratajczyk (@b_ratajczyk)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -Folder DWH_ETL" }

Gets variables of 'DEV' environment located in 'DWH_ETL' folder on 'localhost' Server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -Folder DWH_ETL, DEV2, QA
```
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -Folder DWH_ETL, DEV2, QA" }

Gets variables of 'DEV' environment(s) located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -FolderExclude DWH_ETL, DEV2, QA
```
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV -FolderExclude DWH_ETL, DEV2, QA" }

Gets variables of 'DEV' environments located in folders other than 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV, PROD -Folder DWH_ETL, DEV2, QA
```
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -Environment DEV, PROD -Folder DWH_ETL, DEV2, QA" }

Gets variables of 'DEV' and 'PROD' environment(s) located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -Folder DWH_ETL, DEV2, QA
```
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -Folder DWH_ETL, DEV2, QA" }

Gets variables of environments other than 'DEV' and 'PROD' located in folders 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -FolderExclude DWH_ETL, DEV2, QA
```
{: data-copyable="true" data-clean-code="Get-DbaSsisEnvironmentVariable -SqlInstance localhost -EnvironmentExclude DEV, PROD -FolderExclude DWH_ETL, DEV2, QA" }

Gets variables of environments other than 'DEV' and 'PROD' located in folders other than 'DWH_ETL', 'DEV2' and 'QA' on 'localhost' server<br>

#####  Example:  7 

```powershell
PS C:\> 'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD
```
{: data-copyable="true" data-clean-code="'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD" }

Gets all SSIS environments except 'DEV' and 'PROD' from 'localhost' server. The server name comes from pipeline<br>

#####  Example:  8 

```powershell
PS C:\> 'SRV1', 'SRV3' | Get-DbaSsisEnvironmentVariable
```
{: data-copyable="true" data-clean-code="'SRV1', 'SRV3' | Get-DbaSsisEnvironmentVariable" }

Gets all SSIS environments from 'SRV1' and 'SRV3' servers. The server's names come from pipeline<br>

#####  Example:  9 

```powershell
PS C:\> 'SRV1', 'SRV2' | Get-DbaSsisEnvironmentVariable DEV | Out-GridView
```
{: data-copyable="true" data-clean-code="'SRV1', 'SRV2' | Get-DbaSsisEnvironmentVariable DEV | Out-GridView" }

Gets all variables from 'DEV' Environment(s) on servers 'SRV1' and 'SRV2' and outputs it as the GridView.<br>
The server names come from the pipeline.<br>

#####  Example:  10 

```powershell
PS C:\> 'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD | Select-Object -Property Name, Value | Where-Object {$_.Name -match '^a'} | Out-GridView
```
{: data-copyable="true" data-clean-code="'localhost' | Get-DbaSsisEnvironmentVariable -EnvironmentExclude DEV, PROD | Select-Object -Property Name, Value | Where-Object {$_.Name -match '^a'} | Out-GridView" }

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
