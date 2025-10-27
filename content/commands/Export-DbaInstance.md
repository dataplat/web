---
title: "Export-DbaInstance"
slug: "Export-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Exports complete SQL Server instance configuration as T-SQL scripts for migration or disaster recovery"
tags:
  - "Export"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaInstance"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Export-DbaInstance</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Export-DbaInstance.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Exports complete SQL Server instance configuration as T-SQL scripts for migration or disaster recovery

## Description

Export-DbaInstance consolidates most of the export scripts in dbatools into one command that captures everything needed to recreate or migrate a SQL Server instance.  
  
This command saves hours of manual work when migrating instances to new servers, creating disaster recovery scripts, or documenting configurations for compliance. It generates individual T-SQL script files for each component type, organized in a timestamped folder structure that's perfect for version control or automated deployment pipelines.  
  
Unless an -Exclude is specified, it exports:  
  
All database 'restore from backup' scripts.  Note: if a database does not have a backup the 'restore from backup' script won't be generated.  
All logins.  
All database mail objects.  
All credentials.  
All objects within the Job Server (SQL Agent).  
All linked servers.  
All groups and servers within Central Management Server.  
All SQL Server configuration objects (everything in sp_configure).  
All user objects in system databases.  
All system triggers.  
All system backup devices.  
All Audits.  
All Endpoints.  
All Extended Events.  
All Policy Management objects.  
All Resource Governor objects.  
All Server Audit Specifications.  
All Custom Errors (User Defined Messages).  
All Server Roles.  
All Availability Groups.  
All OLEDB Providers.  
  
The exported files are written to a folder using the naming convention "machinename$instance-yyyyMMddHHmmss", making it easy to identify the source instance and export timestamp.  
  
This command is particularly valuable for:  
- Instance migrations when moving to new hardware or cloud platforms  
- Creating standardized development and test environments that match production  
- Disaster recovery planning by maintaining current configuration snapshots  
- Compliance documentation that automatically captures security settings and configurations  
- Change management workflows where you need baseline configurations before major updates  
  
Two folder management options are supported:  
1. Default behavior creates new timestamped folders for historical archiving  
2. Using -Force overwrites files in the same location, ideal for scheduled exports that feed into version control systems  
  
For more granular control, please use one of the -Exclude parameters and use the other functions available within the dbatools module.

## Syntax

```powershell
Export-DbaInstance
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-Path] <String>]
    [-NoRecovery]
    [[-AzureCredential] <String>]
    [-IncludeDbMasterKey]
    [[-Exclude] <String[]>]
    [[-BatchSeparator] <String>]
    [[-ScriptingOption] <ScriptingOptions>]
    [-NoPrefix]
    [-ExcludePassword]
    [-Force]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlserver\instance
```
{: data-copyable="true" data-clean-code="Export-DbaInstance -SqlInstance sqlserver\instance" }

All databases, logins, job objects and sp_configure options will be exported from sqlserver\instance to an automatically generated folder name in Documents. For example, <br>
%userprofile%\Documents\DbatoolsExport\sqldev1$sqlcluster-20201108140000<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Exclude Databases, Logins -Path C:\dr\sqlcluster
```
{: data-copyable="true" data-clean-code="Export-DbaInstance -SqlInstance sqlcluster -Exclude Databases, Logins -Path C:\dr\sqlcluster" }

Exports everything but logins and database restore scripts to a folder such as C:\dr\sqlcluster\sqldev1$sqlcluster-20201108140000<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -NoPrefix
```
{: data-copyable="true" data-clean-code="Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -NoPrefix" }

Exports everything to a folder such as C:\servers\sqldev1$sqlcluster-20201108140000 but scripts will not include prefix information.<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -Force
```
{: data-copyable="true" data-clean-code="Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -Force" }

Exports everything to a folder such as C:\servers\sqldev1$sqlcluster and will overwrite/refresh existing files in that folder. Note: when the -Force param is used the generated folder name will not <br>
include a timestamp. This supports the use case of running Export-DbaInstance on a schedule and writing to the same dir each time.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instances

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

##### -Credential

Alternative Windows credentials for exporting Linked Servers and Credentials. Accepts credential objects (Get-Credential)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the root directory where export files will be created in a timestamped subfolder.  
Defaults to the dbatools export path configuration setting, typically Documents\DbatoolsExport.

| Property | Value |
| --- | --- |
| Alias | FilePath |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -NoRecovery

Generates database restore scripts with NORECOVERY option, leaving databases in restoring state.  
Essential for log shipping scenarios or when you need to apply additional transaction log backups after the initial restore.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureCredential

Specifies the Azure storage credential name for accessing backups stored in Azure Blob Storage.  
Required when generating restore scripts for databases backed up to Azure storage containers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeDbMasterKey

Exports database master keys from system databases and copies them to the export directory.  
Critical for environments using Transparent Data Encryption (TDE) or encrypted backups where master keys are required for restoration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Exclude

Skips specific object types from the export to reduce scope or avoid problematic areas.  
Useful when you only need certain components or when specific features cause export issues in your environment.  
Valid values: Databases, Logins, AgentServer, Credentials, LinkedServers, SpConfigure, CentralManagementServer, DatabaseMail, SysDbUserObjects, SystemTriggers, BackupDevices, Audits, Endpoints,   
ExtendedEvents, PolicyManagement, ResourceGovernor, ServerAuditSpecifications, CustomErrors, ServerRoles, AvailabilityGroups, ReplicationSettings, OleDbProvider.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AgentServer,Audits,AvailabilityGroups,BackupDevices,CentralManagementServer,Credentials,CustomErrors,DatabaseMail,Databases,Endpoints,ExtendedEvents,LinkedServers,Logins,PolicyManagement,ReplicationSettings,ResourceGovernor,ServerAuditSpecifications,ServerRoles,SpConfigure,SysDbUserObjects,SystemTriggers,OleDbProvider |

##### -BatchSeparator

Defines the T-SQL batch separator used in generated scripts, defaults to "GO".  
Change this if your deployment tools or target environment requires a different batch separator like semicolon or custom delimiter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'formatting.batchseparator') |

##### -ScriptingOption

Provides a Microsoft.SqlServer.Management.Smo.ScriptingOptions object to customize script generation behavior.  
Use this to control advanced scripting options like check constraints, triggers, indexes, or permissions that aren't controlled by other parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoPrefix

Removes header comments from generated scripts that normally include creation timestamp and dbatools version.  
Use this for cleaner scripts when feeding into version control systems or automated deployment pipelines that don't need metadata headers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludePassword

Omits passwords from exported scripts for logins, credentials, and linked servers, replacing them with placeholder text.  
Essential for security compliance when export scripts will be stored in version control or shared with other team members.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Overwrites existing export files and uses a static folder name without timestamp.  
Ideal for scheduled exports that always write to the same location, such as automated backup documentation or CI/CD integration.

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
