---
title: "Test-DbaDbOwner"
slug: "Test-DbaDbOwner"
date: 2024-01-01
layout: "single"
author: "Michael Fal (@Mike_Fal), mikefal.net"
availability: "Windows, Linux, macOS"
synopsis: "Identifies databases with incorrect ownership for security compliance and best practice enforcement."
tags:
  - "Database"
  - "Owner"
  - "DbOwner"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbOwner.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaDbOwner"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaDbOwner</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaDbOwner.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Michael Fal (@Mike_Fal), mikefal.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Identifies databases with incorrect ownership for security compliance and best practice enforcement.

## Description

This function compares the current owner of each database against a target login and returns only databases that do NOT match the expected owner. By default, it checks against 'sa' (or the renamed sysadmin account if 'sa' was changed), but you can specify any valid login.  
  
This addresses a common security compliance requirement where databases should be owned by a specific account rather than individual user accounts. Mismatched ownership can cause issues with scheduled jobs, maintenance plans, and security policies.  
  
The function automatically detects if the 'sa' account was renamed and uses the actual sysadmin login name. It returns detailed information including current owner, target owner, and ownership status for easy identification of databases requiring ownership changes.  
  
Best Practice reference: http://weblogs.sqlteam.com/dang/archive/2008/01/13/Database-Owner-Troubles.aspx

## Syntax

```powershell
Test-DbaDbOwner
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-SqlCredential <PSCredential>]
    [-Database <Object[]>]
    [-ExcludeDatabase <Object[]>]
    [-TargetLogin <String>]
    [-InputObject <Database[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaDbOwner -SqlInstance localhost
```
{: data-copyable="true" data-clean-code="Test-DbaDbOwner -SqlInstance localhost" }

Returns all databases where the owner does not match 'sa'.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaDbOwner -SqlInstance localhost -TargetLogin 'DOMAIN\account'
```
{: data-copyable="true" data-clean-code="Test-DbaDbOwner -SqlInstance localhost -TargetLogin 'DOMAIN\account'" }

Returns all databases where the owner does not match 'DOMAIN\account'.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance localhost -OnlyAccessible | Test-DbaDbOwner
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance localhost -OnlyAccessible | Test-DbaDbOwner" }

Gets only accessible databases and checks where the owner does not match 'sa'.<br>

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

##### -Database

Specifies which databases to check for ownership compliance. Accepts wildcards for pattern matching.  
Use this when you need to audit ownership for specific databases rather than all databases on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the ownership compliance check. Accepts wildcards for pattern matching.  
Useful for excluding system databases or databases with intentionally different ownership from standard policy.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TargetLogin

Specifies the expected database owner login for compliance checking. Defaults to 'sa' or the renamed sysadmin account if 'sa' was changed.  
Use this to enforce organizational standards where databases should be owned by a service account or specific login rather than individual users.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts database objects piped from Get-DbaDatabase for ownership verification.  
Use this to check ownership on a pre-filtered set of databases or when chaining with other database operations.

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
