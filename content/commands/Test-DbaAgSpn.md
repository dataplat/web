---
title: "Test-DbaAgSpn"
slug: "Test-DbaAgSpn"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Validates Service Principal Name registration for Availability Group listeners in Active Directory"
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaAgSpn"
draft: false
---

# Test-DbaAgSpn

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaAgSpn](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgSpn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaAgSpn](https://dataplat.github.io/boh#Test-DbaAgSpn).

## Synopsis

Validates Service Principal Name registration for Availability Group listeners in Active Directory

## Description

Checks whether the required SPNs are properly registered in Active Directory for each Availability Group listener's service account. This function queries AD to verify that both the MSSQLSvc/listener.domain.com and MSSQLSvc/listener.domain.com:port SPNs exist, which are essential for Kerberos authentication to work correctly with AG listeners.  
  
Use this to troubleshoot client connectivity issues, validate SPN configuration before deployments, or audit security compliance. Missing SPNs will cause authentication failures when clients attempt to connect using integrated Windows authentication through the listener.  
  
https://learn.microsoft.com/en-us/sql/database-engine/availability-groups/windows/listeners-client-connectivity-application-failover?view=sql-server-ver16#SPNs was used as a guide

## Syntax

```powershell
Test-DbaAgSpn
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-AvailabilityGroup] <String[]>]
    [[-Listener] <String[]>]
    [[-InputObject] <AvailabilityGroup[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Test-DbaAgSpn
```

Tests the SPNs for the SharePoint availability group listeners on sql01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAgSpn -SqlInstance sql01 -AvailabilityGroup SharePoint -Listener spag01
```

Tests the spag01 SPN for the SharePoint availability group listener on sql01<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaAgSpn -SqlInstance sql01 | Set-DbaSpn
```

Tests the SPNs for all availability group listeners on sql01 and sets them if they are not set<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

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

##### -Credential

Alternative credential for connecting to Active Directory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies which availability groups to validate SPNs for by name. Use this when you need to check specific AGs instead of all AGs on the instance.  
If not specified, all availability groups will be tested. Accepts multiple AG names for bulk validation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Listener

Specifies which AG listeners to validate SPNs for by listener name. Use this when troubleshooting specific listener connectivity issues.  
If not specified, all listeners within the specified availability groups will be tested. Accepts multiple listener names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts availability group objects from Get-DbaAvailabilityGroup for pipeline processing. Use this to chain commands when working with specific AG objects.  
This allows for filtering AGs before SPN validation without needing to specify instance and AG names separately.

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
