---
title: "Get-DbaDbMailConfig"
slug: "Get-DbaDbMailConfig"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail configuration settings from SQL Server instances"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailConfig"
draft: false
---

# Get-DbaDbMailConfig

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailConfig](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailConfig](https://dataplat.github.io/boh#Get-DbaDbMailConfig).

## Synopsis

Retrieves Database Mail configuration settings from SQL Server instances

## Description

Retrieves all Database Mail configuration values from SQL Server, including settings like MaxFileSize, ProhibitedExtensions, DatabaseMailExeMinLifeTime, and LoggingLevel.  
This function helps DBAs audit current Database Mail configurations, troubleshoot email delivery issues, and verify compliance with organizational email policies.  
You can retrieve all configuration settings or filter by specific configuration names to focus on particular settings.  
The output includes the configuration name, current value, and description for each setting across your SQL Server environment.

## Syntax

```powershell
Get-DbaDbMailConfig
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Name] <String[]>]
    [[-InputObject] <SqlMail[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailConfig -SqlInstance sql01\sharepoint
```

Returns DBMail configs on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailConfig -SqlInstance sql01\sharepoint -Name ProhibitedExtensions
```

Returns the ProhibitedExtensions configuration on sql01\sharepoint<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailConfig -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the DBMail configs on sql01\sharepoint then return a bunch more columns<br>

#####  Example:  4 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMail | Get-DbaDbMailConfig
```

Returns the DBMail configs for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Name

Specifies which Database Mail configuration settings to retrieve by name, such as MaxFileSize, ProhibitedExtensions, or LoggingLevel.  
Use this when you need to check specific configuration values instead of retrieving all Database Mail settings.  
Accepts multiple configuration names and supports aliases Config and ConfigName.

| Property | Value |
| --- | --- |
| Alias | Config,ConfigName |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Database Mail objects from Get-DbaDbMail for pipeline processing.  
Use this when chaining multiple Database Mail functions together or when you already have Database Mail objects loaded.  
Allows you to retrieve configurations from multiple SQL Server instances efficiently through the pipeline.

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
