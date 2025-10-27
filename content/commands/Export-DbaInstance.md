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

# Export-DbaInstance

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaInstance](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaInstance](https://dataplat.github.io/boh#Export-DbaInstance).

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

All databases, logins, job objects and sp_configure options will be exported from sqlserver\instance to an automatically generated folder name in Documents. For example, <br>
%userprofile%\Documents\DbatoolsExport\sqldev1$sqlcluster-20201108140000<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Exclude Databases, Logins -Path C:\dr\sqlcluster
```

Exports everything but logins and database restore scripts to a folder such as C:\dr\sqlcluster\sqldev1$sqlcluster-20201108140000<br>

#####  Example:  3 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -NoPrefix
```

Exports everything to a folder such as C:\servers\sqldev1$sqlcluster-20201108140000 but scripts will not include prefix information.<br>

#####  Example:  4 

```powershell
PS C:\> Export-DbaInstance -SqlInstance sqlcluster -Path C:\servers\ -Force
```

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
