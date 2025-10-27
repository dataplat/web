---
title: "Get-DbaDbMailServer"
slug: "Get-DbaDbMailServer"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SMTP server configurations from SQL Server Database Mail accounts"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailServer"
draft: false
---

# Get-DbaDbMailServer

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailServer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailServer](https://dataplat.github.io/boh#Get-DbaDbMailServer).

## Synopsis

Retrieves SMTP server configurations from SQL Server Database Mail accounts

## Description

Retrieves detailed SMTP server configuration information from all Database Mail accounts on SQL Server instances. This function pulls the actual mail server settings including port numbers, SSL configuration, authentication methods, and connection details. Useful for auditing email infrastructure, troubleshooting delivery issues, and documenting Database Mail configurations across your environment.

## Syntax

```powershell
Get-DbaDbMailServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Server] <String[]>]
    [[-Account] <String[]>]
    [[-InputObject] <SqlMail[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailServer -SqlInstance sql01\sharepoint
```

Returns all DBMail servers on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailServer -SqlInstance sql01\sharepoint -Server DbaTeam
```

Returns The DBA Team DBMail server from sql01\sharepoint<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailServer -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the DBMail servers on sql01\sharepoint then return a bunch more columns<br>

#####  Example:  4 

```powershell
PS C:\> $servers = "sql2014","sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMail | Get-DbaDbMailServer
```

Returns the DBMail servers for "sql2014","sql2016" and "sqlcluster\sharepoint"<br>

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

##### -Server

Specifies one or more SMTP server names to retrieve from Database Mail accounts. Use this when you need to check configuration for specific mail servers rather than all configured servers.  
Accepts exact server names like 'smtp.company.com' or 'mail-relay-01'.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Account

Restricts results to mail servers associated with specific Database Mail account names. Use this when troubleshooting email issues for particular applications or services.  
Helpful for isolating server configurations when you have multiple Database Mail accounts with different SMTP settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Database Mail objects from Get-DbaDbMail via pipeline. Allows you to chain Database Mail operations together.  
Use this when you need to process mail server configurations from a filtered set of SQL instances or specific Database Mail setups.

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
