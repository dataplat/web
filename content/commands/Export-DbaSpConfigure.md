---
title: "Export-DbaSpConfigure"
slug: "Export-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates SQL script containing all sp_configure settings for SQL Server instance configuration replication and documentation."
tags:
  - "SpConfig"
  - "Configure"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaSpConfigure"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaSpConfigure</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSpConfigure.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Generates SQL script containing all sp_configure settings for SQL Server instance configuration replication and documentation.

## Description

Creates a complete SQL script file with EXEC sp_configure statements for all server configuration options, including advanced settings. This script can be executed on another SQL Server instance to replicate the exact same configuration settings, making it invaluable for environment standardization, disaster recovery preparation, or compliance documentation. The function temporarily enables 'show advanced options' if needed to capture all available settings, then restores the original setting.

## Syntax

```powershell
Export-DbaSpConfigure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver
```
{: data-copyable="true" data-clean-code="Export-DbaSpConfigure -SqlInstance sourceserver" }

Exports the SPConfigure settings on sourceserver. As no Path was defined outputs to My Documents folder with default name format of Servername-MMDDYYYYhhmmss-sp_configure.sql<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver -Path C:\temp
```
{: data-copyable="true" data-clean-code="Export-DbaSpConfigure -SqlInstance sourceserver -Path C:\temp" }

Exports the SPConfigure settings on sourceserver to the directory C:\temp using the default name format<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver -SqlCredential $cred -Path C:\temp\sp_configure.sql
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential sqladmin
Export-DbaSpConfigure -SqlInstance sourceserver -SqlCredential $cred -Path C:\temp\sp_configure.sql" }

Exports the SPConfigure settings on sourceserver to the file C:\temp\sp_configure.sql. Uses SQL Authentication to connect. Will require SysAdmin rights if needs to set 'show advanced options'<br>

#####  Example:  4 

```powershell
PS C:\> 'Server1', 'Server2' | Export-DbaSpConfigure -Path C:\temp\configure.sql
```
{: data-copyable="true" data-clean-code="'Server1', 'Server2' | Export-DbaSpConfigure -Path C:\temp\configure.sql" }

Exports the SPConfigure settings for Server1 and Server2 using pipeline. As more than 1 Server adds prefix of Servername and date to the file name and saves to file like  <br>
C:\temp\Servername-MMDDYYYYhhmmss-configure.sql<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.  
You must have sysadmin access if needs to set 'show advanced options' to 1 and server version must be SQL Server version 2005 or higher.

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

##### -Path

Specifies the directory where the sp_configure script files will be exported. Defaults to the configured DbatoolsExport path.  
Use this when you need to organize configuration scripts in a specific location for documentation or deployment procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the exported sp_configure script. Overrides the Path parameter when specified.  
Use this when you need precise control over the output filename, especially for automated deployment scripts or standardized naming conventions.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
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
