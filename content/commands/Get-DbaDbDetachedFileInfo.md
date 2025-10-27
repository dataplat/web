---
title: "Get-DbaDbDetachedFileInfo"
slug: "Get-DbaDbDetachedFileInfo"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Reads detached SQL Server database files to extract metadata and file structure without attaching them."
tags:
  - "Database"
  - "Detach"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDetachedFileInfo.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbDetachedFileInfo"
draft: false
---

# Get-DbaDbDetachedFileInfo

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbDetachedFileInfo](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbDetachedFileInfo.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbDetachedFileInfo](https://dataplat.github.io/boh#Get-DbaDbDetachedFileInfo).

## Synopsis

Reads detached SQL Server database files to extract metadata and file structure without attaching them.

## Description

Analyzes detached MDF files to retrieve essential database metadata including name, SQL Server version, collation, and complete file structure. This lets you examine database files sitting in storage or archives without the risk of attaching them to a live instance.  
  
Perfect for migration planning when you need to verify compatibility before moving databases between SQL Server versions. Also invaluable for troubleshooting scenarios where you have detached database files and need to understand their structure or requirements before reattachment.  
  
The function reads the MDF file header using SQL Server's built-in methods, so it requires an online SQL Server instance to interpret the binary data. All file paths must be accessible to the specified SQL Server service account.  
  
Returns comprehensive details including the original database name, exact SQL Server version (mapped from internal version numbers), collation settings, and complete lists of associated data and log files as they existed when detached.

## Syntax

```powershell
Get-DbaDbDetachedFileInfo
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [-Path] <String[]>
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbDetachedFileInfo -SqlInstance sql2016 -Path M:\Archive\mydb.mdf
```

Returns information about the detached database file M:\Archive\mydb.mdf using the SQL Server instance sql2016. The M drive is relative to the SQL Server instance.<br>

### Required Parameters

##### -SqlInstance

Source SQL Server. This instance must be online and is required to parse the information contained with in the detached database file.  
This function will not attach the database file, it will only use SQL Server to read its contents.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the full file path to one or more detached MDF database files to analyze. The SQL Server service account must have read access to these file locations.  
Use this when you need to examine database files in archives, backups, or migration staging areas before deciding whether to attach them.  
Supports multiple file paths and accepts wildcards, but each MDF file must be accessible from the specified SQL Server instance.

| Property | Value |
| --- | --- |
| Alias | Mdf,FilePath,FullName |
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
