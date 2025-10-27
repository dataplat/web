---
title: "Invoke-DbaAdvancedInstall"
slug: "Invoke-DbaAdvancedInstall"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Executes SQL Server installation on a single computer with automated restart handling."
tags:
  - "Deployment"
  - "Install"
  - "Patching"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedInstall.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaAdvancedInstall"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaAdvancedInstall</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedInstall.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Executes SQL Server installation on a single computer with automated restart handling.

## Description

Performs the complete SQL Server installation workflow on a target computer, including pre and post-installation restart management. This internal function handles copying configuration files to remote machines, executing setup.exe with specified parameters, configuring TCP ports, enabling volume maintenance tasks, and managing required system restarts. It provides detailed installation logging and error reporting to track the success or failure of each installation attempt.

## Syntax

```powershell
Invoke-DbaAdvancedInstall
    [[-ComputerName] <String>]
    [[-InstanceName] <String>]
    [[-Port] <Nullable`1>]
    [[-InstallationPath] <String>]
    [[-ConfigurationPath] <String>]
    [[-ArgumentList] <String[]>]
    [[-Version] <Version>]
    [[-Configuration] <Hashtable>]
    [[-Restart] <Boolean>]
    [[-PerformVolumeMaintenanceTasks] <Boolean>]
    [[-SaveConfiguration] <String>]
    [[-Authentication] <String>]
    [[-Credential] <PSCredential>]
    [[-SaCredential] <PSCredential>]
    [-NoPendingRenameCheck]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions
```
{: data-copyable="true" data-clean-code="Invoke-DbaAdvancedUpdate -ComputerName SQL1 -Action $actions" }

Invokes update actions on SQL1 after restarting it.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer where SQL Server will be installed.  
Can be a hostname, FQDN, or IP address for remote installations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InstanceName

Specifies the name for the SQL Server instance being installed.  
Use 'MSSQLSERVER' for the default instance or provide a custom name for named instances.  
This parameter is used for post-installation configuration like port changes and service restarts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Port

Sets the TCP port for the SQL Server instance after installation completes.  
Use this when you need a specific port for firewall rules or application connectivity requirements.  
The service will be automatically restarted to apply the new port setting.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InstallationPath

Specifies the full path to the SQL Server setup.exe file.  
This should point to the setup.exe in your SQL Server installation media or extracted ISO.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigurationPath

Specifies the path to the SQL Server configuration file (Configuration.ini) on the local machine.  
This file contains all installation settings and will be copied to the target computer during remote installations.  
Generate this file using SQL Server Installation Center or create it manually with your desired settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ArgumentList

Provides additional command-line arguments to pass directly to setup.exe.  
Use this for installation options not covered by other parameters, such as /IACCEPTSQLSERVERLICENSETERMS.  
These arguments supplement the configuration file settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Version

Specifies the SQL Server version being installed using the canonical version number.  
Examples: 10.50 for SQL Server 2008 R2, 11.0 for SQL Server 2012, 13.0 for SQL Server 2016.  
This helps the function locate installation logs and perform version-specific operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Configuration

A hashtable with custom configuration items that you want to use during the installation.  
Overrides all other parameters.  
For example, to define a custom server collation you can use the following parameter:  
PS> Install-DbaInstance -Version 2017 -Configuration @{ SQLCOLLATION = 'Latin1_General_BIN' }  
Full list of parameters can be found here: https://docs.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server-from-the-command-prompt#Install

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Restart

Automatically restarts the target computer when required by the SQL Server installation and waits for it to come back online.  
Essential for multi-instance installations since most SQL Server components require a restart to complete installation.  
Without this parameter, you must manually restart the computer when installation exit code 3010 is returned.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PerformVolumeMaintenanceTasks

Grants the SQL Server service account the 'Perform Volume Maintenance Tasks' privilege after installation.  
This enables instant file initialization, significantly improving database file creation and growth performance.  
Recommended for production environments where large databases are created or restored frequently.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SaveConfiguration

Specifies a path where the installation configuration file will be saved for future reference.  
Use this to preserve your installation settings for documentation or to replicate the same configuration on other servers.  
The temporary configuration file is normally deleted after installation completes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Authentication

Specifies the authentication protocol for PowerShell remoting to the target computer.  
CredSSP is used by default when credentials are provided to handle network share access during installation.  
Change to Kerberos or Negotiate if your environment restricts CredSSP usage.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Credssp |
| Accepted Values | Default,Basic,Negotiate,NegotiateWithImplicitCredential,Credssp,Digest,Kerberos |

##### -Credential

Windows Credential with permission to log on to the remote server.  
Must be specified for any remote connection if installation media is located on a network folder.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SaCredential

Provides the sa account password when installing SQL Server with mixed mode authentication.  
Pass a PSCredential object with 'sa' as the username and your desired password.  
Required only when your configuration file specifies mixed mode authentication (SECURITYMODE=SQL).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoPendingRenameCheck

Skips the check for pending file rename operations when determining if a reboot is required.  
Use this switch if you encounter false positive reboot requirements due to pending renames that don't affect SQL Server installation.  
Only disable this check if you're certain no critical system files are waiting to be renamed.

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
