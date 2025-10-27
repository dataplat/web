---
title: "Get-DbaDbAssembly"
slug: "Get-DbaDbAssembly"
date: 2024-01-01
layout: "single"
author: "Garry Bargsley (@gbargsley), blog.garrybargsley.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves CLR assemblies registered in SQL Server databases for security auditing and inventory management."
tags:
  - "Assembly"
  - "Database"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbAssembly.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbAssembly"
draft: false
---

# Get-DbaDbAssembly

| Property | Value |
| --- | --- |
| **Author** | Garry Bargsley (@gbargsley), blog.garrybargsley.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbAssembly](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbAssembly.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbAssembly](https://dataplat.github.io/boh#Get-DbaDbAssembly).

## Synopsis

Retrieves CLR assemblies registered in SQL Server databases for security auditing and inventory management.

## Description

Retrieves detailed information about Common Language Runtime (CLR) assemblies that have been registered in SQL Server databases. This function helps DBAs audit custom .NET assemblies for security compliance, track assembly versions, and identify potentially unsafe or unauthorized code deployed to their SQL Server instances. Returns key properties including assembly security level, owner, creation date, and version information across all accessible databases.

## Syntax

```powershell
Get-DbaDbAssembly
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Name] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbAssembly -SqlInstance localhost
```

Returns all Database Assembly on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbAssembly -SqlInstance localhost, sql2016
```

Returns all Database Assembly for the local and sql2016 SQL Server instances<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbAssembly -SqlInstance Server1 -Database MyDb -Name MyTechCo.Houids.SQLCLR
```

Will fetch details for the MyTechCo.Houids.SQLCLR assembly in the MyDb Database on the Server1 instance<br>

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

##### -Database

Specifies which databases to scan for CLR assemblies. Accepts wildcards for pattern matching.  
Use this when auditing assemblies in specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Name

Filters results to assemblies with matching names. Supports exact assembly name matching only.  
Use this when investigating specific assemblies during security audits or troubleshooting CLR-related issues.

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
