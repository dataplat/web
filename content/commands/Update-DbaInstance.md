---
title: "Update-DbaInstance"
slug: "Update-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar), nvarscar.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Installs SQL Server Service Packs and Cumulative Updates across local and remote instances automatically."
tags:
  - "Deployment"
  - "Install"
  - "Patching"
  - "Update"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Update-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Update-DbaInstance"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Update-DbaInstance</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Update-DbaInstance.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar), nvarscar.wordpress.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Installs SQL Server Service Packs and Cumulative Updates across local and remote instances automatically.

## Description

Automates the complete process of applying SQL Server patches to eliminate the manual effort of updating multiple instances. This function handles the entire patching workflow from detection through installation, replacing the tedious process of manually downloading, transferring, and applying updates across your SQL Server environment.  
  
The patching process includes:  
* Discovering all SQL Server instances on target computers via registry scanning  
* Validating current versions against target update requirements  
* Locating appropriate KB installers in your patch repository  
* Establishing secure remote connections using CredSSP or other protocols  
* Extracting and executing patches from temporary directories  
* Managing restarts and chaining multiple updates when needed  
* Cleaning up temporary files after installation  
* Processing multiple computers in parallel for faster deployment  
  
This replaces the manual process of RDP'ing to each server, copying patch files, running installers, and tracking which systems need which updates. Perfect for monthly patching cycles, emergency security updates, or bringing development environments up to production patch levels.  
  
The impact of this function is set to High. Use -Confirm:$false to suppress interactive prompts for automated deployments.  
  
For CredSSP authentication, the function automatically configures PowerShell remoting when credentials are provided. This can be disabled by setting dbatools configuration 'commands.initialize-credssp.bypass' to $true. CredSSP configuration requires running from an elevated PowerShell session.  
  
Always backup databases and configurations before applying any SQL Server updates.

## Syntax

```powershell
Update-DbaInstance
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    [-Version <String[]>]
    [-Type <String[]>]
    [-InstanceName <String>]
    [-Path <String[]>]
    [-Restart]
    [-Continue]
    [-Throttle <Int32>]
    [-Authentication <String>]
    [-ExtractPath <String>]
    [-ArgumentList <String[]>]
    [-Download]
    [-NoPendingRenameCheck]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Update-DbaInstance
    [[-ComputerName] <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    -KB <String[]>
    [-InstanceName <String>]
    [-Path <String[]>]
    [-Restart]
    [-Continue]
    [-Throttle <Int32>]
    [-Authentication <String>]
    [-ExtractPath <String>]
    [-ArgumentList <String[]>]
    [-Download]
    [-NoPendingRenameCheck]
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
PS C:\> Update-DbaInstance -ComputerName SQL1 -Version SP3 -Path \\network\share
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName SQL1 -Version SP3 -Path \\network\share" }

Updates all applicable SQL Server installations on SQL1 to SP3.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Prompts for confirmation before the update.<br>

#####  Example:  2 

```powershell
PS C:\> Update-DbaInstance -ComputerName SQL1, SQL2 -Restart -Path \\network\share -Confirm:$false
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName SQL1, SQL2 -Restart -Path \\network\share -Confirm:$false" }

Updates all applicable SQL Server installations on SQL1 and SQL2 with the most recent patch (that has at least a "CU" flag).<br>
It will install latest ServicePack, restart the computers, install latest Cumulative Update, and finally restart the computer once again.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Does not prompt for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Update-DbaInstance -ComputerName SQL1 -Version 2012 -Type ServicePack -Path \\network\share
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName SQL1 -Version 2012 -Type ServicePack -Path \\network\share" }

Updates SQL Server 2012 on SQL1 with the most recent ServicePack found in your patch repository.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Prompts for confirmation before the update.<br>

#####  Example:  4 

```powershell
PS C:\> Update-DbaInstance -ComputerName SQL1 -KB 123456 -Restart -Path \\network\share -Confirm:$false
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName SQL1 -KB 123456 -Restart -Path \\network\share -Confirm:$false" }

Installs KB 123456 on SQL1 and restarts the computer.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Does not prompt for confirmation.<br>

#####  Example:  5 

```powershell
PS C:\> Update-DbaInstance -ComputerName Server1 -Version SQL2012SP3, SQL2016SP2CU3 -Path \\network\share -Restart -Confirm:$false
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName Server1 -Version SQL2012SP3, SQL2016SP2CU3 -Path \\network\share -Restart -Confirm:$false" }

Updates SQL 2012 to SP3 and SQL 2016 to SP2CU3 on Server1. Each update will be followed by a restart.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Does not prompt for confirmation.<br>

#####  Example:  6 

```powershell
PS C:\> Update-DbaInstance -ComputerName Server1 -Path \\network\share -Restart -Confirm:$false -ExtractPath "C:\temp"
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName Server1 -Path \\network\share -Restart -Confirm:$false -ExtractPath &quot;C:\temp&quot;" }

Updates all applicable SQL Server installations on Server1 with the most recent patch. Each update will be followed by a restart.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>
Does not prompt for confirmation.<br>
Extracts the files in local driver on Server1 C:\temp.<br>

#####  Example:  7 

```powershell
PS C:\> Update-DbaInstance -ComputerName Server1 -Path \\network\share -ArgumentList "/SkipRules=RebootRequiredCheck"
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName Server1 -Path \\network\share -ArgumentList &quot;/SkipRules=RebootRequiredCheck&quot;" }

Updates all applicable SQL Server installations on Server1 with the most recent patch.<br>
Additional command line parameters would be passed to the executable.<br>
Binary files for the update will be searched among all files and folders recursively in \\network\share.<br>

#####  Example:  8 

```powershell
PS C:\> Update-DbaInstance -ComputerName SQL1 -Version CU3 -Download -Path \\network\share -Confirm:$false
```
{: data-copyable="true" data-clean-code="Update-DbaInstance -ComputerName SQL1 -Version CU3 -Download -Path \\network\share -Confirm:$false" }

Downloads an appropriate CU KB to \\network\share and installs it onto SQL1.<br>
Does not prompt for confirmation.<br>

### Required Parameters

##### -KB

Installs a specific Knowledge Base update or list of updates by KB number.  
Use this when you need to apply a particular security patch or bug fix identified by Microsoft.  
Accepts formats like 123456 or KB123456, and supports multiple KB numbers for batch installations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Target computer with SQL instance or instances.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Windows Credential with permission to log on to the remote server.  
Must be specified for any remote connection if update Repository is located on a network folder.  
Authentication will default to CredSSP if -Credential is used.  
For CredSSP see also additional information in DESCRIPTION.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Version

Defines the target SQL Server version level to reach using pattern <MajorVersion><SPX><CUX>.  
Use this to standardize SQL Server instances to a specific patch level across your environment.  
Examples: 2008R2SP1 (SQL 2008R2 to SP1), 2016CU3 (SQL 2016 to CU3), SP1CU7 (all versions to SP1 then CU7).  
When omitted, installs the latest available patches for each detected SQL Server version.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Type

Specifies which types of SQL Server updates to install: All, ServicePack, or CumulativeUpdate.  
Use this when you want to apply only specific update types, such as installing only Service Packs during maintenance windows.  
Defaults to All, which installs both Service Packs and Cumulative Updates in proper sequence.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('All') |
| Accepted Values | All,ServicePack,CumulativeUpdate |

##### -InstanceName

Limits patching to a specific named SQL Server instance on the target computer.  
Use this when you have multiple SQL instances and need to patch only one, such as updating a development instance while leaving production untouched.  
Omit this parameter to update all SQL Server instances found on the target computers.

| Property | Value |
| --- | --- |
| Alias | Instance |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the folder path containing SQL Server update files for installation.  
Use this to point to your centralized patch repository where you store downloaded SQL Server updates.  
Files must follow Microsoft's naming pattern (SQLServer####*-KB###-*x##*.exe) and path must be accessible from both client and target servers.  
Configure a default path with Set-DbatoolsConfig -Name Path.SQLServerUpdates to avoid specifying this repeatedly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -Name 'Path.SQLServerUpdates') |

##### -Restart

Automatically restarts the server after successful patch installation and waits for it to come back online.  
Required for chaining multiple updates since SQL Server patches mandate a restart between installations.  
Use this during planned maintenance windows when you can afford server downtime for complete patch sequences.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Continue

Resumes a previously failed SQL Server update installation from where it left off.  
Use this when a patch installation was interrupted due to network issues, timeouts, or other temporary failures.  
Without this switch, the function will abort and clean up any failed installation attempts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Throttle

Controls the maximum number of servers that can be updated simultaneously during parallel operations.  
Use a lower value (5-10) for large production environments to limit network load and system resource usage.  
Defaults to 50, but consider your network bandwidth and the number of concurrent patch installations your infrastructure can handle.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50 |

##### -Authentication

Specifies the PowerShell remoting authentication method for connecting to remote SQL Server hosts.  
Defaults to CredSSP when using -Credential to avoid double-hop authentication issues with network patch repositories.  
Use CredSSP when your patch files are stored on network shares that require credential delegation to remote servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('Credssp', 'Default')[$null -eq $Credential] |
| Accepted Values | Default,Basic,Negotiate,NegotiateWithImplicitCredential,Credssp,Digest,Kerberos |

##### -ExtractPath

Specifies the directory on target servers where SQL Server patch files will be extracted before installation.  
Use this to control where temporary installation files are placed, especially on servers with limited C: drive space.  
Defaults to system temporary directory if not specified, but consider using a dedicated drive with sufficient space.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ArgumentList

Passes additional command-line parameters to the SQL Server patch installer executable.  
Use this to customize installation behavior such as skipping specific validation rules or running in quiet mode.  
Common examples include /SkipRules=RebootRequiredCheck to bypass reboot checks, or /Q for silent installation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Download

Automatically downloads missing SQL Server update files from Microsoft when they're not found in your patch repository.  
Use this to ensure patches are available during installation without manually downloading them beforehand.  
Files download to your local temp folder first, then get distributed to target servers or directly to network paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoPendingRenameCheck

Bypasses the check for pending file rename operations that typically require a reboot before patching.  
Use this in environments where you're confident no pending renames exist or when system monitoring tools show false positives.  
Exercise caution as installing patches with pending renames can lead to installation failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -Name 'OS.PendingRename' -Fallback $false) |

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
