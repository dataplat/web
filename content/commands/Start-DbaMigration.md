---
title: "Start-DbaMigration"
slug: "Start-DbaMigration"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Migrates entire SQL Server instances including all databases, logins, server configuration, and server objects from source to destination servers."
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Start-DbaMigration.ps1"
bohUrl: "https://dataplat.github.io/boh#Start-DbaMigration"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Start-DbaMigration</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Start-DbaMigration.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Migrates entire SQL Server instances including all databases, logins, server configuration, and server objects from source to destination servers.

## Description

Start-DbaMigration consolidates most of the migration tools in dbatools into one command for complete instance migrations. This function serves as an "easy button" when you need to move an entire SQL Server instance to new hardware, perform version upgrades, or consolidate servers. It's less flexible than using individual migration functions but handles the complexity of orchestrating a full migration workflow.  
  
The function migrates:  
  
All user databases to exclude support databases such as ReportServerTempDB (Use -IncludeSupportDbs for this). Use -Exclude Databases to skip.  
All logins. Use -Exclude Logins to skip.  
All database mail objects. Use -Exclude DatabaseMail  
All credentials. Use -Exclude Credentials to skip.  
All objects within the Job Server (SQL Agent). Use -Exclude AgentServer to skip.  
All linked servers. Use -Exclude LinkedServers to skip.  
All groups and servers within Central Management Server. Use -Exclude CentralManagementServer to skip.  
All SQL Server configuration objects (everything in sp_configure). Use -Exclude SpConfigure to skip.  
All user objects in system databases. Use -Exclude SysDbUserObjects to skip.  
All system triggers. Use -Exclude SystemTriggers to skip.  
All system backup devices. Use -Exclude BackupDevices to skip.  
All Audits. Use -Exclude Audits to skip.  
All Endpoints. Use -Exclude Endpoints to skip.  
All Extended Events. Use -Exclude ExtendedEvents to skip.  
All Policy Management objects. Use -Exclude PolicyManagement to skip.  
All Resource Governor objects. Use -Exclude ResourceGovernor to skip.  
All Server Audit Specifications. Use -Exclude ServerAuditSpecifications to skip.  
All Custom Errors (User Defined Messages). Use -Exclude CustomErrors to skip.  
All Data Collector collection sets. Does not configure the server. Use -Exclude DataCollector to skip.  
All startup procedures. Use -Exclude StartupProcedures to skip.  
  
This script provides the ability to migrate databases using detach/copy/attach or backup/restore. SQL Server logins, including passwords, SID and database/server roles can also be migrated. In addition, job server objects can be migrated and server configuration settings can be exported or migrated. This script works with named instances, clusters and SQL Express.  
  
By default, databases will be migrated to the destination SQL Server's default data and log directories. You can override this by specifying -ReuseSourceFolderStructure. Filestreams and filegroups are also migrated. Safety is emphasized.

## Syntax

```powershell
Start-DbaMigration
    [[-Source] <DbaInstanceParameter>]
    [[-Destination] <DbaInstanceParameter[]>]
    [-DetachAttach]
    [-Reattach]
    [-BackupRestore]
    [[-SharedPath] <String>]
    [-WithReplace]
    [-NoRecovery]
    [-SetSourceReadOnly]
    [-ReuseSourceFolderStructure]
    [-IncludeSupportDbs]
    [[-SourceSqlCredential] <PSCredential>]
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Exclude] <String[]>]
    [-DisableJobsOnDestination]
    [-DisableJobsOnSource]
    [-ExcludeSaRename]
    [-UseLastBackup]
    [-KeepCDC]
    [-KeepReplication]
    [-Continue]
    [-Force]
    [[-AzureCredential] <String>]
    [[-MasterKeyPassword] <SecureString>]
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
PS C:\> Start-DbaMigration -Source sqlserver\instance -Destination sqlcluster -DetachAttach
```
{: data-copyable="true" data-clean-code="Start-DbaMigration -Source sqlserver\instance -Destination sqlcluster -DetachAttach" }

All databases, logins, job objects and sp_configure options will be migrated from sqlserver\instance to sqlcluster. Databases will be migrated using the detach/copy files/attach method. Dbowner will <br>
be updated. User passwords, SIDs, database roles and server roles will be migrated along with the login.<br>

#####  Example:  2 

```powershell
PS C:\> $params = @{
>> Source = "sqlcluster"
>> Destination = "sql2016"
>> SourceSqlCredential = $scred
>> DestinationSqlCredential = $cred
>> SharedPath = "\\fileserver\share\sqlbackups\Migration"
>> BackupRestore = $true
>> ReuseSourceFolderStructure = $true
>> Force = $true
>> }
>>
PS C:\> Start-DbaMigration @params -Verbose
```
{: data-copyable="true" data-clean-code="$params = @{
Source = &quot;sqlcluster&quot;
Destination = &quot;sql2016&quot;
SourceSqlCredential = $scred
DestinationSqlCredential = $cred
SharedPath = &quot;\\fileserver\share\sqlbackups\Migration&quot;
BackupRestore = $true
ReuseSourceFolderStructure = $true
Force = $true
}
Start-DbaMigration @params -Verbose" }

Utilizes splatting technique to set all the needed parameters. This will migrate databases using the backup/restore method. It will also include migration of the logins, database mail configuration, <br>
credentials, SQL Agent, Central Management Server, and SQL Server global configuration.<br>

#####  Example:  3 

```powershell
PS C:\> Start-DbaMigration -Verbose -Source sqlcluster -Destination sql2016 -DetachAttach -Reattach -SetSourceReadonly
```
{: data-copyable="true" data-clean-code="Start-DbaMigration -Verbose -Source sqlcluster -Destination sql2016 -DetachAttach -Reattach -SetSourceReadonly" }

Migrates databases using detach/copy/attach. Reattach at source and set source databases read-only. Also migrates everything else.<br>

#####  Example:  4 

```powershell
PS C:\> $PSDefaultParameters = @{
>> "dbatools:Source" = "sqlcluster"
>> "dbatools:Destination" = "sql2016"
>> }
>>
PS C:\> Start-DbaMigration -Verbose -Exclude Databases, Logins
```
{: data-copyable="true" data-clean-code="$PSDefaultParameters = @{
&quot;dbatools:Source&quot; = &quot;sqlcluster&quot;
&quot;dbatools:Destination&quot; = &quot;sql2016&quot;
}
Start-DbaMigration -Verbose -Exclude Databases, Logins" }

Utilizes the PSDefaultParameterValues system variable, and sets the Source and Destination parameters for any function in the module that has those parameter names. This prevents the need from <br>
passing them in constantly.<br>
The execution of the function will migrate everything but logins and databases.<br>

### Optional Parameters

##### -Source

Specifies the source SQL Server instance to migrate from. Accepts server name, server\instance, or connection string formats.  
This is the instance where all databases, logins, and server objects currently exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances to migrate to. Accepts server name, server\instance, or connection string formats.  
When specifying multiple destinations, all objects will be migrated to each destination server.  
Multiple destinations require -Reattach when using -DetachAttach method.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DetachAttach

Uses detach, copy, and attach method to migrate databases. Temporarily makes databases unavailable during the migration process.  
Files are copied using BITS over administrative shares and databases are reattached if destination attachment fails.  
This method is faster than backup/restore but requires downtime and breaks mirroring/replication.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Reattach

Reattaches all databases to the source server after a detach/attach migration completes.  
Use this when you want to keep the source databases online after migration, such as for testing or gradual cutover scenarios.  
Required when using -DetachAttach with multiple destination servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BackupRestore

Uses backup and restore method to migrate databases instead of detach/attach. Creates copy-only backups to preserve existing backup chains.  
Requires either -SharedPath for new backups or -UseLastBackup to restore from existing backup files.  
This method is safer for production environments as it doesn't detach databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SharedPath

Specifies the network path where backup files will be created and stored during migration. Must be a UNC path (\\server\share) or Azure Storage URL.  
Both source and destination SQL Server service accounts require read/write permissions to this location.  
Only used with -BackupRestore method when not using -UseLastBackup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -WithReplace

Forces restore operations to overwrite existing databases with the same name on the destination.  
Use this when you need to replace existing databases or when destination databases have different file paths than source.  
Only applies to backup/restore method.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NoRecovery

Restores databases in NORECOVERY mode, leaving them in a restoring state for additional log backups.  
Use this when you plan to apply differential or transaction log backups after the initial restore.  
Only applies to backup/restore method and prevents normal database access until recovered.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SetSourceReadOnly

Sets migrated databases to read-only mode on the source server before migration begins.  
This prevents data changes during migration and helps ensure data consistency.  
When combined with -Reattach, databases remain read-only after being reattached to the source.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ReuseSourceFolderStructure

Preserves the original file paths from the source server when restoring databases on the destination.  
By default, databases are restored to the destination's default data and log directories.  
Use this when you need to maintain specific drive letters or folder structures on the destination server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IncludeSupportDbs

Includes system support databases in the migration: ReportServer, ReportServerTempDB, SSISDB, and distribution databases.  
By default, these databases are excluded to prevent conflicts with existing services.  
Use this when migrating servers with SQL Server Reporting Services, Integration Services, or replication configured.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SourceSqlCredential

Specifies credentials to connect to the source SQL Server instance. Use when the current Windows account lacks sufficient permissions.  
Accepts PowerShell credential objects created with Get-Credential for SQL Authentication or alternative Windows accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies credentials to connect to the destination SQL Server instance(s). Use when the current Windows account lacks sufficient permissions.  
Accepts PowerShell credential objects created with Get-Credential for SQL Authentication or alternative Windows accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Exclude

Specifies which migration components to skip during the migration process.  
Use this to exclude specific object types when you only need partial migrations or when certain objects should remain on the source.  
Valid values: Databases, Logins, AgentServer, Credentials, LinkedServers, SpConfigure, CentralManagementServer, DatabaseMail, SysDbUserObjects, SystemTriggers, BackupDevices, Audits, Endpoints,   
ExtendedEvents, PolicyManagement, ResourceGovernor, ServerAuditSpecifications, CustomErrors, DataCollector, StartupProcedures, AgentServerProperties, MasterCertificates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Databases,Logins,AgentServer,Credentials,LinkedServers,SpConfigure,CentralManagementServer,DatabaseMail,SysDbUserObjects,SystemTriggers,BackupDevices,Audits,Endpoints,ExtendedEvents,PolicyManagement,ResourceGovernor,ServerAuditSpecifications,CustomErrors,DataCollector,StartupProcedures,AgentServerProperties,MasterCertificates |

##### -DisableJobsOnDestination

Disables all migrated SQL Agent jobs on the destination server after migration completes.  
Use this to prevent jobs from running automatically on the destination until you're ready to activate them.  
Helpful for staged migrations or when you need to update job schedules before activation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableJobsOnSource

Disables all SQL Agent jobs on the source server during the migration process.  
Use this to prevent jobs from running and potentially interfering with database migrations.  
Jobs remain disabled on the source after migration completes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludeSaRename

Prevents renaming the sa account on the destination to match the source server's sa account name.  
By default, the destination sa account is renamed to match the source for consistency.  
Use this when you want to maintain the destination server's original sa account name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UseLastBackup

Uses existing backup files instead of creating new backups during database migration.  
The function will locate the most recent full, differential, and log backups for each database.  
Backup files must be accessible to all destination servers, typically on a network share.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepCDC

Preserves Change Data Capture (CDC) configuration and data during database migration.  
By default, CDC information is not migrated to avoid potential conflicts with existing CDC configurations.  
Use this when you need to maintain CDC functionality on the destination server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -KeepReplication

Preserves replication configuration and metadata during database migration.  
By default, replication settings are not migrated to prevent conflicts with existing replication topologies.  
Use this when migrating databases that participate in replication and you want to maintain those settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Continue

Attempts to apply additional transaction log backups to databases already in RESTORING or STANDBY states.  
Use this to bring destination databases up-to-date when they were previously restored with NORECOVERY.  
Only works with -UseLastBackup and requires databases to already exist in a restoring state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Overwrites existing objects on the destination server without prompting for confirmation.  
For databases: drops existing databases with matching names before restoring.  
For logins: drops and recreates existing logins instead of skipping them.  
For DetachAttach method: breaks database mirroring and removes databases from Availability Groups.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureCredential

Specifies the name of a SQL Server credential for accessing Azure Storage when SharedPath points to an Azure Storage account.  
The credential must already exist on both source and destination servers with proper access to the Azure Storage container.  
Only needed when using Azure Storage URLs for the SharedPath parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MasterKeyPassword

Specifies the password for creating or opening database master keys during certificate migration.  
Required when migrating databases with encrypted objects or certificates that need master key protection.  
Must be provided as a SecureString object for security.

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
