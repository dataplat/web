---
title: "Get-DbaDbMailAccount"
slug: "Get-DbaDbMailAccount"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail account configurations from SQL Server instances"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailAccount.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailAccount"
draft: false
---

# Get-DbaDbMailAccount

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailAccount](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailAccount.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailAccount](https://dataplat.github.io/boh#Get-DbaDbMailAccount).

## Synopsis

Retrieves Database Mail account configurations from SQL Server instances

## Description

Retrieves Database Mail account configurations including email addresses, display names, SMTP server settings, and authentication details from SQL Server instances. This function helps DBAs audit email configurations across their environment, troubleshoot mail delivery issues, and document Database Mail settings for compliance or migration purposes. The returned account objects include connection details, server configurations, and account properties that can be used to verify proper Database Mail setup.

## Syntax

```powershell
Get-DbaDbMailAccount
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Account] <String[]>]
    [[-ExcludeAccount] <String[]>]
    [[-InputObject] <SqlMail[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailAccount -SqlInstance sql01\sharepoint
```

Returns Database Mail accounts on sql01\sharepoint.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailAccount -SqlInstance sql01\sharepoint -Account 'The DBA Team'
```

Returns 'The DBA Team' Database Mail account from sql01\sharepoint.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailAccount -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the Database Mail accounts on sql01\sharepoint then return a bunch more columns.<br>

#####  Example:  4 

```powershell
PS C:\> $servers = sql2014, sql2016, sqlcluster\sharepoint
PS C:\> $servers | Get-DbaDbMail | Get-DbaDbMailAccount
```

Returns the Database Mail accounts for sql2014, sql2016 and sqlcluster\sharepoint.<br>

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

##### -Account

Specifies one or more Database Mail account names to retrieve. Accepts exact account names and supports multiple values.  
Use this when you need to check specific mail accounts rather than retrieving all configured accounts on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAccount

Specifies one or more Database Mail account names to exclude from results. Accepts exact account names and supports multiple values.  
Use this when you want to retrieve most accounts but skip specific ones, such as excluding test or deprecated accounts from auditing reports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SqlMail objects from the pipeline, typically from Get-DbaDbMail. Allows you to chain Database Mail commands together.  
Use this when processing multiple instances through Get-DbaDbMail or when working with previously retrieved Database Mail configurations.

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
