---
title: "Get-DbaUserPermission"
slug: "Get-DbaUserPermission"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net | Josh Smith"
availability: "Windows, Linux, macOS"
synopsis: "Audits comprehensive security permissions across SQL Server instances using DISA STIG methodology"
tags:
  - "Security"
  - "User"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUserPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaUserPermission"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaUserPermission</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaUserPermission.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Brandon Abshire, netnerds.net , Josh Smith</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Audits comprehensive security permissions across SQL Server instances using DISA STIG methodology

## Description

Performs a comprehensive security audit by analyzing all server logins, server-level permissions, database users, database roles, and object-level permissions across SQL Server instances. Creates temporary STIG (Security Technical Implementation Guide) objects in tempdb to gather detailed permission information for both direct and inherited access rights.  
  
This command is essential for security compliance audits, particularly for organizations implementing DISA STIG requirements. It reveals the complete permission landscape including role memberships, explicit grants/denials, and securable object permissions, giving DBAs the detailed visibility needed for access reviews and compliance reporting.  
  
The function uses DISA-provided Permissions.sql scripts to ensure thorough analysis of security configurations. By default, it excludes public/guest permissions and system objects to focus on meaningful security grants, but these can be included for complete visibility.  
  
Note that if you interrupt this command prematurely (Ctrl-C), it will leave behind a STIG schema in tempdb that should be manually cleaned up.

## Syntax

```powershell
Get-DbaUserPermission
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <Object[]>]
    [[-ExcludeDatabase] <Object[]>]
    [-ExcludeSystemDatabase]
    [-IncludePublicGuest]
    [-IncludeSystemObjects]
    [-ExcludeSecurables]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008, sqlserver2012
```
{: data-copyable="true" data-clean-code="Get-DbaUserPermission -SqlInstance sql2008, sqlserver2012" }

Check server and database permissions for servers sql2008 and sqlserver2012.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB
```
{: data-copyable="true" data-clean-code="Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB" }

Check server and database permissions on server sql2008 for only the TestDB database<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB -IncludePublicGuest -IncludeSystemObjects
```
{: data-copyable="true" data-clean-code="Get-DbaUserPermission -SqlInstance sql2008 -Database TestDB -IncludePublicGuest -IncludeSystemObjects" }

Check server and database permissions on server sql2008 for only the TestDB database,<br>
including public and guest grants, and sys schema objects.<br>

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

##### -Database

Specifies which databases to audit for user permissions and role memberships. Accepts multiple database names and supports wildcards.  
Use this when you need to focus the security audit on specific databases rather than scanning the entire instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeDatabase

Specifies databases to skip during the security audit. Useful for excluding databases that don't require security review.  
Common scenarios include excluding development databases or databases with known compliant configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemDatabase

Excludes system databases (master, model, msdb, tempdb) from the security audit. Focuses the output on user databases only.  
Use this when compliance requirements only apply to application databases and not SQL Server system databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludePublicGuest

Includes permissions granted to the public database role and guest user account in the audit results.  
Use this for complete security visibility, as public and guest permissions affect all users and can create unintended access paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSystemObjects

Includes permissions on system schema objects (sys, INFORMATION_SCHEMA) in the audit results.  
Enable this when security policies require auditing access to metadata views and system functions that could expose sensitive information.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSecurables

Excludes object-level permissions (tables, views, procedures, functions) from the audit and returns only role memberships.  
Use this for high-level security reviews focused on role-based access rather than granular object permissions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

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
