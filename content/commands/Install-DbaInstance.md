---
title: "Install-DbaInstance"
slug: "Install-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Reitse Eskens (@2meterDBA), Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Automates SQL Server instance installation across local and remote computers with customizable configuration."
tags:
  - "Deployment"
  - "Install"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Install-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Install-DbaInstance"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Install-DbaInstance</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Install-DbaInstance.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Reitse Eskens (@2meterDBA), Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Automates SQL Server instance installation across local and remote computers with customizable configuration.

## Description

Orchestrates unattended SQL Server installations by generating configuration files and executing setup.exe remotely or locally. Automates the tedious process of creating proper configuration.ini files, handling service accounts, and managing installation prerequisites like pending reboots and authentication protocols.  
  
The function dynamically builds installation configurations based on your parameters, automatically configures optimal settings like tempdb file counts based on CPU cores (SQL 2016+), and handles authentication scenarios including CredSSP for network installations. It can install multiple instances in parallel and manages the complete installation lifecycle from prerequisite checks to post-installation TCP port configuration.  
  
Key automation features include:  
* Generates secure SA passwords for mixed authentication mode installations  
* Automatically grants sysadmin rights to your account or specified administrators  
* Configures tempdb file counts based on server CPU cores for optimal performance  
* Handles service account credentials using native PowerShell credential objects  
* Manages installation media location detection across network and local paths  
* Performs prerequisite validation including pending reboot detection  
* Supports parallel installation across multiple servers with throttling controls  
* Configures TCP port settings post-installation when specified  
  
Advanced configuration capabilities:  
* Import existing Configuration.ini files or build configurations from scratch  
* Override any SQL Server setup parameter using the -Configuration hashtable  
* Support for specialized installations like failover cluster instances  
* Enable instant file initialization (perform volume maintenance tasks) automatically  
* Slipstream updates during installation using -UpdateSourcePath  
* Install specific feature combinations using templates (Default, All) or individual components  
  
Authentication and credential management:  
* Automatically configures CredSSP authentication for network-based installations when needed  
* Supports various authentication protocols (Kerberos, NTLM, Basic) with fallback options  
* Handles domain service accounts, managed service accounts (MSAs), and local accounts  
* Manages distinct service credentials for Database Engine, SQL Agent, Analysis Services, Integration Services, and other components  
  
Installation media requirements:  
* Requires extracted SQL Server installation media accessible to target servers  
* Supports both local and network-based installation media repositories  
* Automatically locates appropriate setup.exe files based on specified SQL Server version  
* Falls back to Evaluation edition if no Product ID is provided in configuration  
  
Remote execution considerations:  
* Requires elevated privileges on target computers for SQL Server installation  
* Automatically handles CredSSP configuration when installing from network shares  
* Supports custom authentication protocols and credential delegation scenarios  
* Can optionally restart target computers automatically when required by installation prerequisites  
  
Note that the downloaded installation media must be extracted and available to the server where the installation runs.  
NOTE: If no ProductID (PID) is found in the configuration files/parameters, Evaluation version is going to be installed.  
  
When using CredSSP authentication, this function will try to configure CredSSP authentication for PowerShell Remoting sessions.  
If this is not desired (e.g.: CredSSP authentication is managed externally, or is already configured appropriately,)  
it can be disabled by setting the dbatools configuration option 'commands.initialize-credssp.bypass' value to $true.  
To be able to configure CredSSP, the command needs to be run in an elevated PowerShell session.

## Syntax

```powershell
Install-DbaInstance
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [-Version] <String>
    [[-InstanceName] <String>]
    [[-SaCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Authentication] <String>]
    [[-ConfigurationFile] <Object>]
    [[-Configuration] <Hashtable>]
    [[-Path] <String[]>]
    [[-Feature] <String[]>]
    [[-AuthenticationMode] <String>]
    [[-InstancePath] <String>]
    [[-DataPath] <String>]
    [[-LogPath] <String>]
    [[-TempPath] <String>]
    [[-BackupPath] <String>]
    [[-UpdateSourcePath] <String>]
    [[-AdminAccount] <String[]>]
    [[-Port] <Int32>]
    [[-Throttle] <Int32>]
    [[-ProductID] <String>]
    [[-AsCollation] <String>]
    [[-SqlCollation] <String>]
    [[-EngineCredential] <PSCredential>]
    [[-AgentCredential] <PSCredential>]
    [[-ASCredential] <PSCredential>]
    [[-ISCredential] <PSCredential>]
    [[-RSCredential] <PSCredential>]
    [[-FTCredential] <PSCredential>]
    [[-PBEngineCredential] <PSCredential>]
    [[-SaveConfiguration] <String>]
    [-PerformVolumeMaintenanceTasks]
    [-Restart]
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
PS C:\> Install-DbaInstance -Version 2017 -Feature All
```
{: data-copyable="true" data-clean-code="Install-DbaInstance -Version 2017 -Feature All" }

Install a default SQL Server instance and run the installation enabling all features with default settings. Automatically generates configuration.ini<br>

#####  Example:  2 

```powershell
PS C:\> Install-DbaInstance -SqlInstance sql2017\sqlexpress, server01 -Version 2017 -Feature Default
```
{: data-copyable="true" data-clean-code="Install-DbaInstance -SqlInstance sql2017\sqlexpress, server01 -Version 2017 -Feature Default" }

Install a named SQL Server instance named sqlexpress on sql2017, and a default instance on server01. Automatically generates configuration.ini.<br>
Default features will be installed.<br>

#####  Example:  3 

```powershell
PS C:\> Install-DbaInstance -Version 2008R2 -SqlInstance sql2017 -ConfigurationFile C:\temp\configuration.ini
```
{: data-copyable="true" data-clean-code="Install-DbaInstance -Version 2008R2 -SqlInstance sql2017 -ConfigurationFile C:\temp\configuration.ini" }

Install a default named SQL Server instance on the remote machine, sql2017 and use the local configuration.ini<br>

#####  Example:  4 

```powershell
PS C:\> Install-DbaInstance -Version 2017 -InstancePath G:\SQLServer -UpdateSourcePath '\\my\updates'
```
{: data-copyable="true" data-clean-code="Install-DbaInstance -Version 2017 -InstancePath G:\SQLServer -UpdateSourcePath '\\my\updates'" }

Run the installation locally with default settings apart from the application volume, this will be redirected to G:\SQLServer.<br>
The installation procedure would search for SQL Server updates in \\my\updates and slipstream them into the installation.<br>

#####  Example:  5 

```powershell
PS C:\> $svcAcc = Get-Credential MyDomain\SvcSqlServer
PS C:\> Install-DbaInstance -Version 2016 -InstancePath D:\Root -DataPath E: -LogPath L: -PerformVolumeMaintenanceTasks -EngineCredential $svcAcc
```
{: data-copyable="true" data-clean-code="$svcAcc = Get-Credential MyDomain\SvcSqlServer
Install-DbaInstance -Version 2016 -InstancePath D:\Root -DataPath E: -LogPath L: -PerformVolumeMaintenanceTasks -EngineCredential $svcAcc" }

Install SQL Server 2016 instance into D:\Root drive, set default data folder as E: and default logs folder as L:.<br>
Perform volume maintenance tasks permission is granted. MyDomain\SvcSqlServer is used as a service account for SqlServer.<br>

#####  Example:  6 

```powershell
PS C:\> $svcAcc = [PSCredential]::new("MyDomain\SvcSqlServer$", [SecureString]::new())
PS C:\> Install-DbaInstance -Version 2016 -InstancePath D:\Root -DataPath E: -LogPath L: -PerformVolumeMaintenanceTasks -EngineCredential $svcAcc
```
{: data-copyable="true" data-clean-code="$svcAcc = [PSCredential]::new(&quot;MyDomain\SvcSqlServer$&quot;, [SecureString]::new())
Install-DbaInstance -Version 2016 -InstancePath D:\Root -DataPath E: -LogPath L: -PerformVolumeMaintenanceTasks -EngineCredential $svcAcc" }

The same as the last example except MyDomain\SvcSqlServer is now a Managed Service Account (MSA).<br>

#####  Example:  7 

```powershell
PS C:\> $config = @{
>> AGTSVCSTARTUPTYPE = "Manual"
>> BROWSERSVCSTARTUPTYPE = "Manual"
>> FILESTREAMLEVEL = 1
>> }
PS C:\> Install-DbaInstance -SqlInstance localhost\v2017:1337 -Version 2017 -SqlCollation Latin1_General_CI_AS -Configuration $config
```
{: data-copyable="true" data-clean-code="$config = @{
AGTSVCSTARTUPTYPE = &quot;Manual&quot;
BROWSERSVCSTARTUPTYPE = &quot;Manual&quot;
FILESTREAMLEVEL = 1
}
Install-DbaInstance -SqlInstance localhost\v2017:1337 -Version 2017 -SqlCollation Latin1_General_CI_AS -Configuration $config" }

Run the installation locally with default settings overriding the value of specific configuration items.<br>
Instance name will be defined as 'v2017'; TCP port will be changed to 1337 after installation.<br>

### Required Parameters

##### -Version

Specifies the SQL Server version to install using the year-based identifier.  
Valid values are 2008, 2008R2, 2012, 2014, 2016, 2017, 2019, and 2022.  
This parameter determines which setup.exe file to locate in the installation media and configures version-specific features like tempdb file optimization (SQL 2016+).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 2008,2008R2,2012,2014,2016,2017,2019,2022 |

### Optional Parameters

##### -SqlInstance

The target computer and, optionally, a new instance name and a port number.  
Use one of the following generic formats:  
Server1  
Server2\Instance1  
Server1\Alpha:1533, Server2\Omega:1566  
"ServerName\NewInstanceName,1534"  
You can also define instance name and port using -InstanceName and -Port parameters.

| Property | Value |
| --- | --- |
| Alias | ComputerName |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -InstanceName

Specifies the name for the new SQL Server instance, overriding any instance name in the SqlInstance parameter.  
Use 'MSSQLSERVER' for the default instance or a custom name for named instances.  
Named instances enable multiple SQL Server installations on the same server and affect service names, registry keys, and connection strings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SaCredential

Specifies the password for the sa account when AuthenticationMode is set to Mixed.  
If not provided with Mixed mode, a random 128-character password is automatically generated and returned in the output.  
Only required when you want to set a specific sa password instead of using the auto-generated one.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

Windows Credential with permission to log on to the remote server.  
Must be specified for any remote connection if SQL Server installation media is located on a network folder.  
Authentication will default to CredSSP if -Credential is used.  
For CredSSP see also additional information in DESCRIPTION.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Authentication

Specifies the PowerShell remoting authentication protocol for connecting to remote servers during installation.  
Defaults to CredSSP when -Credential is provided to handle network share access and avoid double-hop authentication issues.  
Use 'Kerberos' in domain environments where CredSSP is restricted, or 'Basic' for workgroup scenarios.  
When installing from network shares, CredSSP is typically required to pass credentials through to the file server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | @('Credssp', 'Default')[$null -eq $Credential] |
| Accepted Values | Default,Basic,Negotiate,NegotiateWithImplicitCredential,Credssp,Digest,Kerberos |

##### -ConfigurationFile

Path to an existing SQL Server Configuration.ini file to use for the installation.  
Use this when you have a pre-configured setup file from a previous installation or when you need specific settings not covered by the function parameters.  
The function will read and apply all settings from this file, overriding any conflicting parameters.

| Property | Value |
| --- | --- |
| Alias | FilePath |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Configuration

A hashtable containing SQL Server setup configuration parameters that override function defaults.  
Use this for advanced scenarios like setting custom startup types, enabling specific features, or configuring failover cluster instances.  
Each key-value pair becomes a parameter in the Configuration.ini file, allowing full control over the installation process.  
When ACTION is specified, only minimal defaults are set, requiring you to provide all necessary configuration items for that specific installation type.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory containing extracted SQL Server installation media, which will be scanned recursively for the appropriate setup.exe.  
Can be a local path or network share accessible from target servers during remote installations.  
The path must contain the extracted ISO contents or downloaded installer files, not the ISO file itself.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -Name 'Path.SQLServerSetup') |

##### -Feature

Specifies which SQL Server components to install, either as individual features or using predefined templates.  
'Default' installs Engine, Replication, FullText, and Tools for typical database server setups.  
'All' installs every available feature for the specified version.  
Choose specific features like 'Engine', 'AnalysisServices', 'ReportingServices', or 'IntegrationServices' for targeted installations based on your requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Default |
| Accepted Values | Default,All,Engine,Tools,Replication,FullText,DataQuality,PolyBase,MachineLearning,AnalysisServices,ReportingServices,ReportingForSharepoint,SharepointAddin,IntegrationServices,MasterDataServices,PythonPackages,RPackages,BackwardsCompatibility,Connectivity,ReplayController,ReplayClient,SDK,BIDS,SSMS |

##### -AuthenticationMode

Specifies the SQL Server authentication mode: Windows (Windows Authentication only) or Mixed (Windows and SQL Authentication).  
Windows mode is more secure and recommended for domain environments, while Mixed mode is required for applications that need SQL logins.  
When using Mixed mode, ensure you provide a strong SaCredential or allow the function to generate a secure random password.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Windows |
| Accepted Values | Windows,Mixed |

##### -InstancePath

Specifies the root directory where SQL Server instance files will be installed, including program files, system databases, and logs.  
Defaults to the standard program files location unless you need to install on a different drive for capacity or performance reasons.  
This path becomes the base for all instance-specific directories unless individual paths are specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DataPath

Specifies the default directory for user database data files (.mdf and .ndf).  
Used as the default location when creating new databases if no explicit path is provided in CREATE DATABASE statements.  
Consider placing this on high-performance storage separate from logs for optimal I/O performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LogPath

Specifies the default directory for user database transaction log files (.ldf).  
Used as the default location for transaction logs when creating new databases.  
Best practice is to place logs on separate storage from data files to optimize write performance and enable better backup strategies.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TempPath

Specifies the directory for tempdb database files, which handle temporary objects and internal SQL Server operations.  
Consider placing tempdb on fast storage (SSD) separate from user databases since it's heavily used for sorts, joins, and temporary tables.  
For SQL 2016+, the function automatically configures multiple tempdb data files based on CPU core count.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -BackupPath

Specifies the default directory for database backup files when no explicit path is provided in BACKUP commands.  
This location should have sufficient space for your backup retention strategy and be accessible to your backup software.  
Consider network accessibility if you plan to backup to shared storage or use backup software that requires UNC paths.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UpdateSourcePath

Specifies the directory containing SQL Server updates (service packs, cumulative updates) to apply during installation.  
Enables slipstream installation to avoid separate patching steps after the base installation completes.  
The path should contain the update executable files compatible with the SQL Server version being installed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AdminAccount

Specifies one or more Windows accounts to grant sysadmin privileges on the new SQL Server instance.  
Defaults to the current user or the account specified in the Credential parameter.  
Use domain\\username format for domain accounts or computername\\username for local accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Port

Specifies the TCP port number for SQL Server after installation, overriding the default port 1433.  
The function configures the port post-installation since SQL Server setup doesn't directly support custom ports.  
Use non-standard ports for security through obscurity or when running multiple instances that need distinct ports.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Throttle

Specifies the maximum number of concurrent SQL Server installations when targeting multiple servers.  
Controls resource usage and network bandwidth by limiting parallel operations.  
Consider your network capacity, installation media server performance, and available system resources when adjusting from the default of 50.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 50 |

##### -ProductID

Specifies the product license key (PID) to install a licensed edition of SQL Server instead of Evaluation edition.  
Required only when the installation media doesn't include an embedded license key.  
Without a valid ProductID, the installation defaults to a time-limited Evaluation edition that expires after 180 days.

| Property | Value |
| --- | --- |
| Alias | PID |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AsCollation

Specifies the collation for Analysis Services, determining sort order and character comparison rules for SSAS databases.  
Defaults to Latin1_General_CI_AS if not specified.  
Choose a collation that matches your data locale and case sensitivity requirements for dimensional and tabular models.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCollation

Specifies the server-level collation for the Database Engine, affecting sort order, case sensitivity, and accent sensitivity for all databases.  
Defaults to the Windows locale setting if not specified.  
Choose carefully as changing server collation after installation requires rebuilding system databases and can affect application compatibility.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EngineCredential

Specifies the Windows account to run the SQL Server Database Engine service.  
Use domain service accounts for network access, Managed Service Accounts (MSAs) for automated password management, or local accounts for standalone servers.  
The account needs specific Windows privileges like 'Log on as a service' and permissions to the installation directories.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AgentCredential

Specifies the Windows account to run the SQL Server Agent service, which manages scheduled jobs, alerts, and replication.  
Typically uses the same account as the Database Engine for simplicity, but can be separate for security isolation.  
Requires permissions to execute job steps, access network resources for backup jobs, and interact with other SQL Server instances for replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ASCredential

Specifies the Windows account to run the Analysis Services (SSAS) service for OLAP cubes and tabular models.  
The account needs permissions to data sources, file system access for processing, and network connectivity for distributed queries.  
Consider using a dedicated service account when SSAS requires different security contexts than the Database Engine.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ISCredential

Specifies the Windows account to run the Integration Services (SSIS) service for ETL package execution and management.  
The account needs permissions to source and destination systems, file shares for package storage, and SQL Server databases for logging and configuration.  
Use a service account with broad permissions since SSIS packages often access multiple systems and data sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RSCredential

Specifies the Windows account to run the Reporting Services (SSRS) service for report generation and delivery.  
The account needs permissions to the report server database, data sources used in reports, and network resources for email delivery.  
Consider network connectivity requirements when reports access remote data sources or when using email subscriptions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -FTCredential

Specifies the Windows account to run the Full-Text Filter Daemon service for indexing and searching text content in databases.  
The account needs permissions to database files and temporary directories used during full-text indexing operations.  
Usually runs under a low-privilege account since it only processes text extraction and indexing without requiring broad system access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PBEngineCredential

Specifies the Windows account to run the PolyBase Engine service for distributed queries against Hadoop, Azure Blob Storage, and other external data sources.  
The account needs network access to external systems and permissions to temporary directories for data processing.  
Required when installing PolyBase features for big data integration and external table functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SaveConfiguration

Specifies a path to save the generated Configuration.ini file for future reference or reuse.  
Without this parameter, the configuration file is created in a temporary location and not preserved after installation.  
Useful for documenting installation settings, troubleshooting, or replicating installations across multiple servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PerformVolumeMaintenanceTasks

Grants the SQL Server service account 'Perform volume maintenance tasks' privilege to enable instant file initialization.  
Allows SQL Server to skip zero-initialization of data files, significantly reducing the time for database creation, restore operations, and auto-growth events.  
Only affects data files; transaction log files are always zero-initialized for transaction integrity.

| Property | Value |
| --- | --- |
| Alias | InstantFileInitialization,IFI |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Restart

Automatically restarts target computers when required by Windows updates, pending file operations, or installation prerequisites.  
Use this during maintenance windows when automatic restarts are acceptable.  
Without this parameter, installations will fail if pending restarts are detected, requiring manual intervention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoPendingRenameCheck

Skips the check for pending file rename operations when validating reboot requirements.  
Use this when you know pending renames won't affect the SQL Server installation or when working with systems that show false positives for pending renames.  
Generally safer to allow the default validation unless you have specific reasons to bypass this safety check.

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
