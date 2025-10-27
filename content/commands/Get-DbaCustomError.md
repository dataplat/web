---
title: "Get-DbaCustomError"
slug: "Get-DbaCustomError"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves user-defined error messages from SQL Server instances for auditing and documentation."
tags:
  - "General"
  - "Error"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCustomError.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaCustomError"
draft: false
---

# Get-DbaCustomError

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaCustomError](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaCustomError.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaCustomError](https://dataplat.github.io/boh#Get-DbaCustomError).

## Synopsis

Retrieves user-defined error messages from SQL Server instances for auditing and documentation.

## Description

Retrieves all custom error messages that have been added to SQL Server using sp_addmessage or through SQL Server Management Studio. These user-defined error messages are stored in the sys.messages system catalog and are commonly used by applications for business logic validation and custom error handling. This function helps DBAs inventory custom errors across multiple instances during migrations, troubleshooting, or compliance audits.

## Syntax

```powershell
Get-DbaCustomError
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaCustomError -SqlInstance localhost
```

Returns all Custom Error Message(s) on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaCustomError -SqlInstance localhost, sql2016
```

Returns all Custom Error Message(s) for the local and sql2016 SQL Server instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
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
