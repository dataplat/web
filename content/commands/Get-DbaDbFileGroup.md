---
title: "Get-DbaDbFileGroup"
slug: "Get-DbaDbFileGroup"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves filegroup configuration and storage details from SQL Server databases"
tags:
  - "Storage"
  - "File"
  - "Data"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGroup.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbFileGroup"
draft: false
---

# Get-DbaDbFileGroup

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbFileGroup](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbFileGroup.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbFileGroup](https://dataplat.github.io/boh#Get-DbaDbFileGroup).

## Synopsis

Retrieves filegroup configuration and storage details from SQL Server databases

## Description

Retrieves detailed filegroup information from one or more databases, including filegroup type, size, and configuration details. This function helps DBAs analyze database storage organization, plan storage capacity, and document database structure for compliance or migration planning. Returns filegroup objects that can be filtered by database or specific filegroup names, making it useful for targeted storage analysis and troubleshooting performance issues related to data distribution.

## Syntax

```powershell
Get-DbaDbFileGroup
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-InputObject] <Database[]>]
    [[-FileGroup] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016
```

Return all FileGroups for all databases on instance sql2016<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016 -Database MyDB
```

Return all FileGroups for database MyDB on instance sql2016<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbFileGroup -SqlInstance sql2016 -FileGroup Primary
```

Returns information on filegroup called Primary if it exists in any database on the server sql2016<br>

#####  Example:  4 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbFileGroup
```

Returns information on all FileGroups for all databases on instances 'localhost','localhost\namedinstance'<br>

#####  Example:  5 

```powershell
PS C:\> 'localhost','localhost\namedinstance' | Get-DbaDbFileGroup
```

Returns information on all FileGroups for all databases on instances 'localhost','localhost\namedinstance'<br>

#####  Example:  6 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance SQL1\SQLExpress,SQL2 -ExcludeDatabase model,master | Get-DbaDbFileGroup
```

Returns information on all FileGroups for all databases except model and master on instances SQL1\SQLExpress,SQL2<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Database

Specifies which databases to analyze for filegroup information. Accepts wildcards and multiple database names.  
Use this when you need to focus on specific databases instead of scanning all databases on the instance, which is helpful for large environments or targeted storage analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input for processing filegroups.  
Use this when you want to chain database filtering with filegroup analysis, such as excluding system databases or filtering by database properties before examining storage structure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -FileGroup

Filters results to specific filegroups by name, such as 'PRIMARY' or custom filegroups.  
Use this when troubleshooting storage issues with particular filegroups or when you need to verify configuration of specific data placement strategies.

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
