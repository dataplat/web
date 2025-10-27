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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaAgSpn</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaAgSpn.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaAvailabilityGroup -SqlInstance sql01 -AvailabilityGroup SharePoint | Test-DbaAgSpn" }

Tests the SPNs for the SharePoint availability group listeners on sql01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaAgSpn -SqlInstance sql01 -AvailabilityGroup SharePoint -Listener spag01
```
{: data-copyable="true" data-clean-code="Test-DbaAgSpn -SqlInstance sql01 -AvailabilityGroup SharePoint -Listener spag01" }

Tests the spag01 SPN for the SharePoint availability group listener on sql01<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaAgSpn -SqlInstance sql01 | Set-DbaSpn
```
{: data-copyable="true" data-clean-code="Test-DbaAgSpn -SqlInstance sql01 | Set-DbaSpn" }

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
