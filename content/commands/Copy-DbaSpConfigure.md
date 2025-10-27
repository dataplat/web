---
title: "Copy-DbaSpConfigure"
slug: "Copy-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server configuration settings (sp_configure values) from source to destination instances."
tags:
  - "Migration"
  - "Configure"
  - "SpConfigure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaSpConfigure"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaSpConfigure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSpConfigure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies SQL Server configuration settings (sp_configure values) from source to destination instances.

## Description

This function retrieves all sp_configure settings from the source SQL Server and applies them to one or more destination instances, ensuring consistent configuration across your environment. Only settings that differ between source and destination are updated, making it safe for standardizing existing servers. The function automatically handles settings that require a restart and provides detailed reporting of which configurations were changed, skipped, or failed. Use this when building new servers to match production standards, migrating instances, or ensuring consistent configuration across development and testing environments.

## Syntax

```powershell
Copy-DbaSpConfigure
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-ConfigName] <Object[]>]
    [[-ExcludeConfigName] <Object[]>]
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
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster" }

Copies all sp_configure settings from sqlserver2014a to sqlcluster<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ConfigName DefaultBackupCompression, IsSqlClrEnabled -SourceSqlCredential $cred
```
{: data-copyable="true" data-clean-code="Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ConfigName DefaultBackupCompression, IsSqlClrEnabled -SourceSqlCredential $cred" }

Copies the values for IsSqlClrEnabled and DefaultBackupCompression from sqlserver2014a to sqlcluster using SQL credentials to authenticate to sqlserver2014a and Windows credentials to authenticate to <br>
sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ExcludeConfigName DefaultBackupCompression, IsSqlClrEnabled
```
{: data-copyable="true" data-clean-code="Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ExcludeConfigName DefaultBackupCompression, IsSqlClrEnabled" }

Copies all configs except for IsSqlClrEnabled and DefaultBackupCompression, from sqlserver2014a to sqlcluster.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -WhatIf
```
{: data-copyable="true" data-clean-code="Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -WhatIf" }

Shows what would happen if the command were executed.<br>

### Required Parameters

##### -Source

The source SQL Server instance from which sp_configure settings will be copied. Must have sysadmin access to read configuration values.  
Use this as your template server when standardizing configurations across multiple instances or when setting up new servers to match production standards.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

One or more destination SQL Server instances where sp_configure settings will be applied. Must have sysadmin access to modify configuration values.  
Accepts multiple instances for bulk configuration updates across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Use this when the source server requires different authentication than your current Windows session, such as SQL Server authentication or domain service accounts.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instances. Accepts PowerShell credentials (Get-Credential).  
Use this when destination servers require different authentication than your current Windows session, such as SQL Server authentication or domain service accounts.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigName

Specifies which sp_configure settings to copy from source to destination. Accepts one or more configuration names such as 'max server memory (MB)' or 'backup compression default'.  
Use this when you need to update only specific settings rather than copying all configurations, particularly useful for targeted changes like memory settings or backup options.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeConfigName

Specifies which sp_configure settings to skip during the copy operation. Accepts one or more configuration names to exclude from processing.  
Use this when copying most settings but need to preserve specific destination values, such as excluding 'max server memory (MB)' when servers have different hardware specifications.

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
