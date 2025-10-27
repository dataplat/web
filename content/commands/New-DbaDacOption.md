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

# New-DbaDacOption

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar), nvarscar.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDacOption](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDacOption.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDacOption](https://dataplat.github.io/boh#New-DbaDacOption).

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

Uses DacOption object to set the CommandTimeout to 0 then extracts the dacpac for SharePoint_Config on sql2016 to C:\temp\SharePoint_Config.dacpac including all table data.<br>

#####  Example:  2 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Export -Property @{ExtractAllTableData=$true;CommandTimeout=0}
PS C:\> Export-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options
```

Creates a pre-initialized DacOption object and uses it to extrac a DacPac from the database.<br>

#####  Example:  3 

```powershell
PS C:\> $options = New-DbaDacOption -Type Dacpac -Action Publish
PS C:\> $options.DeployOptions.DropObjectsNotInSource = $true
PS C:\> Publish-DbaDacPackage -SqlInstance sql2016 -Database DB1 -Options $options -Path c:\temp\db.dacpac
```

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
