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

# Invoke-DbaAdvancedInstall

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaAdvancedInstall](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaAdvancedInstall.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaAdvancedInstall](https://dataplat.github.io/boh#Invoke-DbaAdvancedInstall).

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
