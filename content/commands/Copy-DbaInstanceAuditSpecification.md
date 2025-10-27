---
title: "Copy-DbaInstanceAuditSpecification"
slug: "Copy-DbaInstanceAuditSpecification"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies server audit specifications from one SQL Server instance to another for compliance standardization."
tags:
  - "Migration"
  - "ServerAudit"
  - "AuditSpecification"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAuditSpecification.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaInstanceAuditSpecification"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaInstanceAuditSpecification</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAuditSpecification.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies server audit specifications from one SQL Server instance to another for compliance standardization.

## Description

Migrates server audit specifications between SQL Server instances, allowing DBAs to standardize audit configurations across environments or restore audit settings during disaster recovery. The function scripts existing audit specifications from the source server and recreates them on the destination, but only if the corresponding server audits already exist on the target instance.  
  
By default, all audit specifications are copied, but you can target specific ones using the -AuditSpecification parameter. Existing specifications on the destination are skipped unless -Force is used to drop and recreate them. This prevents accidental overwrites while enabling intentional updates to audit configurations.

## Syntax

```powershell
Copy-DbaInstanceAuditSpecification
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-AuditSpecification] <Object[]>]
    [[-ExcludeAuditSpecification] <Object[]>]
    [-Force]
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
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster" }

Copies all server audits from sqlserver2014a to sqlcluster using Windows credentials to connect. If audits with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -AuditSpecification tg_noDbDrop -SourceSqlCredential $cred -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -AuditSpecification tg_noDbDrop -SourceSqlCredential $cred -Force" }

Copies a single audit, the tg_noDbDrop audit from sqlserver2014a to sqlcluster using SQL credentials to connect to sqlserver2014a and Windows credentials to connect to sqlcluster. If an audit <br>
specification with the same name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the server audit specifications to copy. Requires sysadmin access and SQL Server 2008 or higher.  
The function will read all existing audit specifications from this instance to migrate to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance where audit specifications will be created. Requires sysadmin access and SQL Server 2008 or higher.  
The corresponding server audits must already exist on this instance before audit specifications can be successfully copied.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance to read audit specifications. Use when Windows Authentication is not available.  
Accepts PowerShell credentials (Get-Credential) and supports SQL Server Authentication, Active Directory authentication modes.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance to create audit specifications. Use when Windows Authentication is not available.  
Accepts PowerShell credentials (Get-Credential) and supports SQL Server Authentication, Active Directory authentication modes.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AuditSpecification

Specifies which server audit specifications to copy by name. Accepts multiple specification names as an array.  
Use this when you need to migrate specific audit specifications rather than all specifications from the source instance.  
If not specified, all audit specifications from the source will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAuditSpecification

Specifies which server audit specifications to skip during the copy operation. Accepts multiple specification names as an array.  
Use this to copy all audit specifications except those you want to exclude, such as environment-specific or test specifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing audit specifications on the destination instance instead of skipping them.  
Use this when you need to overwrite existing audit specifications with updated configurations from the source.

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
