---
title: "New-DbaDirectory"
slug: "New-DbaDirectory"
date: 2024-01-01
layout: "single"
author: "Stuart Moore"
availability: "Windows, Linux, macOS"
synopsis: "Creates directories on SQL Server machines using the SQL Server service account"
tags:
  - "Storage"
  - "Path"
  - "Directory"
  - "Folder"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaDirectory.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaDirectory"
draft: false
---

# New-DbaDirectory

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaDirectory](https://github.com/dataplat/dbatools/blob/master/public/New-DbaDirectory.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaDirectory](https://dataplat.github.io/boh#New-DbaDirectory).

## Synopsis

Creates directories on SQL Server machines using the SQL Server service account

## Description

Creates directories on local or remote SQL Server machines by executing the xp_create_subdir extended stored procedure. This is particularly useful when you need to create backup directories, log shipping paths, or database file locations where the SQL Server service account needs to have access. The function checks if the path already exists before attempting creation and returns the success status for each operation.

## Syntax

```powershell
New-DbaDirectory
    [-SqlInstance] <DbaInstanceParameter[]>
    [-Path] <String>
    [[-SqlCredential] <PSCredential>]
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
PS C:\> New-DbaDirectory -SqlInstance sqlcluster -Path L:\MSAS12.MSSQLSERVER\OLAP
```

If the SQL Server instance sqlcluster can create the path L:\MSAS12.MSSQLSERVER\OLAP it will do and return $true, if not it will return $false.<br>

#####  Example:  2 

```powershell
PS C:\> $credential = Get-Credential
PS C:\> New-DbaDirectory -SqlInstance sqlcluster -SqlCredential $credential -Path L:\MSAS12.MSSQLSERVER\OLAP
```

If the SQL Server instance sqlcluster can create the path L:\MSAS12.MSSQLSERVER\OLAP it will do and return $true, if not it will return $false. Uses a SqlCredential to connect<br>

### Required Parameters

##### -SqlInstance

The SQL Server you want to run the test on.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the full directory path to create on the SQL Server machine using the SQL Server service account.  
Use this when you need to create backup directories, database file paths, or log shipping folders where SQL Server needs access.  
The function will check if the path already exists and skip creation if it does.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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
