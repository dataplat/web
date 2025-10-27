---
title: "Get-DbaStartupProcedure"
slug: "Get-DbaStartupProcedure"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves stored procedures configured to run automatically when SQL Server starts up."
tags:
  - "Procedure"
  - "Startup"
  - "StartupProcedure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaStartupProcedure.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaStartupProcedure"
draft: false
---

# Get-DbaStartupProcedure

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaStartupProcedure](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaStartupProcedure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaStartupProcedure](https://dataplat.github.io/boh#Get-DbaStartupProcedure).

## Synopsis

Retrieves stored procedures configured to run automatically when SQL Server starts up.

## Description

This function returns stored procedures from the master database that are configured to execute automatically during SQL Server startup. Startup procedures are useful for initializing application settings, populating cache tables, or performing other tasks that need to run every time the SQL Server service starts. The function returns SMO StoredProcedure objects with details about each startup procedure, including creation dates, schemas, and implementation types. You can filter results to check if specific procedures are configured as startup procedures, which is helpful for auditing server configurations or troubleshooting startup issues.

## Syntax

```powershell
Get-DbaStartupProcedure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-StartupProcedure] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaStartupProcedure -SqlInstance SqlBox1\Instance2
```

Returns an object with all startup procedures for the Instance2 instance on SqlBox1<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaStartupProcedure -SqlInstance SqlBox1\Instance2 -StartupProcedure 'dbo.StartupProc'
```

Returns an object with a startup procedure named 'dbo.StartupProc' for the Instance2 instance on SqlBox1<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sql2014 | Get-DbaStartupProcedure
```

Returns an object with all startup procedures for every server listed in the Central Management Server on sql2014<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -StartupProcedure

Filters results to check if specific stored procedures are configured as startup procedures. Accepts procedure names in 'schema.procedurename' format or just 'procedurename' for dbo schema.  
Use this when auditing server configurations or verifying that critical initialization procedures are properly configured to run at startup.

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
