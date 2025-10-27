---
title: "Copy-DbaPolicyManagement"
slug: "Copy-DbaPolicyManagement"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Policy-Based Management policies, conditions, and categories between SQL Server instances"
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaPolicyManagement.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaPolicyManagement"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaPolicyManagement</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaPolicyManagement.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies Policy-Based Management policies, conditions, and categories between SQL Server instances

## Description

Transfers your entire Policy-Based Management framework from one SQL Server instance to another, including custom policies, conditions, and categories. This streamlines environment standardization and disaster recovery scenarios where you need identical compliance policies across multiple servers.  
  
By default, all non-system policies and conditions are copied. Existing objects on the destination are skipped unless -Force is used to overwrite them. You can selectively copy specific policies or conditions using the include/exclude parameters, which provide auto-completion from the source server.

## Syntax

```powershell
Copy-DbaPolicyManagement
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Policy] <Object[]>]
    [[-ExcludePolicy] <Object[]>]
    [[-Condition] <Object[]>]
    [[-ExcludeCondition] <Object[]>]
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
PS C:\> Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster" }

Copies all policies and conditions from sqlserver2014a to sqlcluster, using Windows credentials.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred" }

Copies all policies and conditions from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -WhatIf
```
{: data-copyable="true" data-clean-code="Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -WhatIf" }

Shows what would happen if the command were executed.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -Policy 'xp_cmdshell must be disabled'
```
{: data-copyable="true" data-clean-code="Copy-DbaPolicyManagement -Source sqlserver2014a -Destination sqlcluster -Policy 'xp_cmdshell must be disabled'" }

Copies only one policy, 'xp_cmdshell must be disabled' from sqlserver2014a to sqlcluster. No conditions are migrated.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the Policy-Based Management objects to copy. Must be SQL Server 2008 or higher with sysadmin access.  
Use this to identify which server contains your existing policies, conditions, and categories that need to be replicated to other instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances where Policy-Based Management objects will be created. Must be SQL Server 2008 or higher with sysadmin access.  
Use this when standardizing compliance policies across multiple environments like development, staging, and production servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Alternative credentials for connecting to the source SQL Server instance. Use when the current Windows credentials don't have access to the source.  
Commonly needed when copying from production servers that require SQL Authentication or different Active Directory accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Alternative credentials for connecting to the destination SQL Server instances. Use when the current Windows credentials don't have access to the destination servers.  
Particularly useful when copying to servers in different domains or when using SQL Authentication on destination instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Policy

Specifies which policies to copy by name, with auto-completion from the source server. Only the specified policies and their dependent conditions are copied.  
Use this when you need to copy specific compliance policies rather than the entire Policy-Based Management framework, such as copying only security-related policies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludePolicy

Specifies which policies to skip during the copy operation, with auto-completion from the source server. All other policies will be copied.  
Use this to exclude environment-specific policies or policies that shouldn't be replicated, such as development-only or deprecated policies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Condition

Specifies which conditions to copy by name, with auto-completion from the source server. Only the specified conditions are copied without their associated policies.  
Use this when you need to copy reusable conditions that can be referenced by multiple policies, such as server configuration or database naming conditions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeCondition

Specifies which conditions to skip during the copy operation, with auto-completion from the source server. All other conditions will be copied.  
Use this to exclude conditions that are environment-specific or no longer needed, while copying the rest of your condition library.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Overwrites existing policies and conditions on the destination server by dropping and recreating them. Without this switch, existing objects are skipped.  
Use this when updating existing Policy-Based Management objects or when you need to ensure destination objects match the source exactly.

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
