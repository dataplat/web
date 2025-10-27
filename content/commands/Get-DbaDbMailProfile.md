---
title: "Get-DbaDbMailProfile"
slug: "Get-DbaDbMailProfile"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Database Mail profiles and their configuration details from SQL Server instances"
tags:
  - "Mail"
  - "DbMail"
  - "Email"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailProfile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaDbMailProfile"
draft: false
---

# Get-DbaDbMailProfile

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaDbMailProfile](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaDbMailProfile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaDbMailProfile](https://dataplat.github.io/boh#Get-DbaDbMailProfile).

## Synopsis

Retrieves Database Mail profiles and their configuration details from SQL Server instances

## Description

Retrieves Database Mail profiles from one or more SQL Server instances, returning detailed configuration information for each profile including ID, name, description, and status properties. This function is essential for auditing Database Mail configurations across your environment, troubleshooting email notification issues, and documenting mail profile setups for compliance or change management. You can target specific profiles by name or exclude certain profiles from the results, making it useful for both broad configuration reviews and focused troubleshooting scenarios.

## Syntax

```powershell
Get-DbaDbMailProfile
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Profile] <String[]>]
    [[-ExcludeProfile] <String[]>]
    [[-InputObject] <SqlMail[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaDbMailProfile -SqlInstance sql01\sharepoint
```

Returns DBMail profiles on sql01\sharepoint<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaDbMailProfile -SqlInstance sql01\sharepoint -Profile 'The DBA Team'
```

Returns The DBA Team DBMail profile from sql01\sharepoint<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDbMailProfile -SqlInstance sql01\sharepoint | Select-Object *
```

Returns the DBMail profiles on sql01\sharepoint then return a bunch more columns<br>

#####  Example:  4 

```powershell
PS C:\> $servers = "sql2014", "sql2016", "sqlcluster\sharepoint"
PS C:\> $servers | Get-DbaDbMail | Get-DbaDbMailProfile
```

Returns the DBMail profiles for "sql2014", "sql2016" and "sqlcluster\sharepoint"<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2014", "sql2016", "sqlcluster\sharepoint"
PS C:\> Get-DbaDbMailProfile -SqlInstance $servers
```

Returns the DBMail profiles for "sql2014", "sql2016" and "sqlcluster\sharepoint"<br>

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

##### -Profile

Specifies one or more Database Mail profile names to retrieve. Use this when you need to check configuration details for specific profiles rather than reviewing all profiles.  
Accepts exact profile names and is case-sensitive to match SQL Server Database Mail profile naming.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProfile

Specifies one or more Database Mail profile names to exclude from the results. Useful when auditing multiple profiles but want to skip certain ones like test or deprecated profiles.  
Helps focus on production profiles during compliance reviews or troubleshooting scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts Database Mail server objects from Get-DbaDbMail cmdlet through the pipeline. This allows you to chain commands when working with multiple SQL instances.  
Eliminates the need to specify SqlInstance when you already have Database Mail objects from a previous command.

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
