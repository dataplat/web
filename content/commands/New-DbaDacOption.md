---
title: "New-DbaDacOption"
slug: "New-DbaDacOption"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar), nvarscar.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new Microsoft.SqlServer.Dac.DacExtractOptions/DacExportOptions object depending on the chosen Type"
tags:
  - "Deployment"
  - "Dacpac"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacOption.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDacOption"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaDacOption</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacOption.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar), nvarscar.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates a new Microsoft.SqlServer.Dac.DacExtractOptions/DacExportOptions object depending on the chosen Type

## Description

Creates a new Microsoft.SqlServer.Dac.DacExtractOptions/DacExportOptions object that can be used during DacPackage extract. Basically saves you the time from remembering the SMO assembly name ;)  
  
See:  
https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.dac.dacexportoptions.aspx  
https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.dac.dacextractoptions.aspx  
for more information

## Syntax

```powershell
New-DbaDacOption
    [[-Type] <String>]
    [-Action] <String>
    [[-PublishXml] <String>]
    [[-Property] <Hashtable>]
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
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Export
PS C:\> $options.ExtractAllTableData = $true
PS C:\> $options.CommandTimeout = 0
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options
```
{: data-copyable="true" data-clean-code="$options = New-DbaDacOption -Type Dacpac -Action Export
$options.ExtractAllTableData = $true
$options.CommandTimeout = 0
Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options" }

Uses DacOption object to set the CommandTimeout to 0 then extracts the dacpac for SharePoint_Config on sql2016 to C:\temp\SharePoint_Config.dacpac including all table data.<br>

#####  Example:  2 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Export -Property @{ExtractAllTableData=$true;CommandTimeout=0}
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options
```
{: data-copyable="true" data-clean-code="$options = New-DbaDacOption -Type Dacpac -Action Export -Property @{ExtractAllTableData=$true;CommandTimeout=0}
Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options" }

Creates a pre-initialized DacOption object and uses it to extrac a DacPac from the database.<br>

#####  Example:  3 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Publish
PS C:\> $options.DeployOptions.DropObjectsNotInSource = $true
PS C:\> Publish-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options -Path c:\temp\db.dacpac
```
{: data-copyable="true" data-clean-code="$options = New-DbaDacOption -Type Dacpac -Action Publish
$options.DeployOptions.DropObjectsNotInSource = $true
Publish-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options -Path c:\temp\db.dacpac" }

Uses DacOption object to set Deployment Options and publish the db.dacpac dacpac file as DB1 on sql2016<br>

### Required Parameters

##### -Action

Determines whether you're exporting from a database or publishing to a database.  
Use Export when extracting a package from an existing database for backup or migration purposes.  
Use Publish when deploying a package to create or update a target database.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Publish,Export |

### Optional Parameters

##### -Type

Specifies the package type to create: Dacpac (schema and data) or Bacpac (data only). Defaults to Dacpac.  
Use Dacpac when you need to capture database schema structure along with optional data for deployment scenarios.  
Use Bacpac when you only need to export and import data without schema changes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Dacpac |
| Accepted Values | Dacpac,Bacpac |

##### -PublishXml

Path to a DAC publish profile XML file that contains deployment options and SQLCMD variables.  
These profiles are typically created in SQL Server Data Tools (SSDT) and control how the deployment behaves.  
When specified, the profile's settings override any DeployOptions specified in the Property parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Property

Hashtable of properties to configure the DAC options object, such as CommandTimeout or ExtractAllTableData.  
For Publish actions, use the DeployOptions key to set deployment behaviors like DropObjectsNotInSource or BlockOnPossibleDataLoss.  
Common properties include CommandTimeout for long operations and ExtractAllTableData when exporting data with schema.  
Example: @{CommandTimeout=0; DeployOptions=@{DropObjectsNotInSource=$true}}

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
