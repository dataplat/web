---
title: "Copy-DbaLogin"
slug: "Copy-DbaLogin"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server logins between instances with passwords, permissions, and role memberships intact"
tags:
  - "Migration"
  - "Login"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaLogin.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaLogin"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaLogin</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaLogin.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies SQL Server logins between instances with passwords, permissions, and role memberships intact

## Description

Transfers SQL Server logins from one instance to another while preserving authentication details and security context. Essential for server migrations, disaster recovery setups, and environment synchronization where you need users to maintain the same access without recreating accounts manually.  
  
Handles both SQL Server and Windows Authentication logins, copying passwords (with original SIDs to prevent orphaned users), server roles, database permissions, and login properties like password policy enforcement. Includes smart conflict resolution - can drop and recreate existing logins, rename logins during copy, or generate new SIDs when copying to the same server.  
  
Version compatibility: SQL Server 2000-2008 R2 logins copy to any version, but SQL Server 2012+ logins (due to hash algorithm changes) only copy to SQL Server 2012 and newer. Automatically handles version-specific features and validates compatibility before attempting migration.

## Syntax

```powershell
Copy-DbaLogin
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Login <Object[]>]
    [-ExcludeLogin <Object[]>]
    [-ExcludeSystemLogins]
    [-LoginRenameHashtable <Hashtable>]
    [-KillActiveConnection]
    [-NewSid]
    [-Force]
    [-ObjectLevel]
    [-ExcludePermissionSync]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaLogin -Source <DbaInstanceParameter>
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-Login <Object[]>]
    [-ExcludeLogin <Object[]>]
    [-ExcludeSystemLogins]
    [-SyncSaName]
    [-LoginRenameHashtable <Hashtable>]
    [-KillActiveConnection]
    [-NewSid]
    [-Force]
    [-ObjectLevel]
    [-ExcludePermissionSync]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaLogin -Source <DbaInstanceParameter>
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Login <Object[]>]
    [-ExcludeLogin <Object[]>]
    [-ExcludeSystemLogins]
    -OutFile <String>
    [-LoginRenameHashtable <Hashtable>]
    [-KillActiveConnection]
    [-NewSid]
    [-Force]
    [-ObjectLevel]
    [-ExcludePermissionSync]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaLogin
    [-SourceSqlCredential <PSCredential>]
    -Destination <DbaInstanceParameter[]>
    [-DestinationSqlCredential <PSCredential>]
    [-Login <Object[]>]
    [-ExcludeLogin <Object[]>]
    [-ExcludeSystemLogins]
    [-InputObject <Object[]>]
    [-LoginRenameHashtable <Hashtable>]
    [-KillActiveConnection]
    [-NewSid]
    [-Force]
    [-ObjectLevel]
    [-ExcludePermissionSync]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaLogin
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Login <Object[]>]
    [-ExcludeLogin <Object[]>]
    [-ExcludeSystemLogins]
    [-SyncSaName]
    [-LoginRenameHashtable <Hashtable>]
    [-KillActiveConnection]
    [-NewSid]
    [-Force]
    [-ObjectLevel]
    [-ExcludePermissionSync]
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
PS C:\> Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Force" }

Copies all logins from Source Destination. If a SQL Login on Source exists on the Destination, the Login on Destination will be dropped and recreated.<br>
If active connections are found for a login, the copy of that Login will fail as it cannot be dropped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Force -KillActiveConnection
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Force -KillActiveConnection" }

Copies all logins from Source Destination. If a SQL Login on Source exists on the Destination, the Login on Destination will be dropped and recreated.<br>
If any active connections are found they will be killed.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -ExcludeLogin realcajun -SourceSqlCredential $scred -DestinationSqlCredential $dcred
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -ExcludeLogin realcajun -SourceSqlCredential $scred -DestinationSqlCredential $dcred" }

Copies all Logins from Source to Destination except for realcajun using SQL Authentication to connect to both instances.<br>
If a Login already exists on the destination, it will not be migrated.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Login realcajun, netnerds -force
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -Source sqlserver2014a -Destination sqlcluster -Login realcajun, netnerds -force" }

Copies ONLY Logins netnerds and realcajun. If Login realcajun or netnerds exists on Destination, the existing Login(s) will be dropped and recreated.<br>

#####  Example:  5 

```powershell
PS C:\> Copy-DbaLogin -LoginRenameHashtable @{ "PreviousUser" = "newlogin" } -Source $Sql01 -Destination Localhost -SourceSqlCredential $sqlcred -Login PreviousUser
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -LoginRenameHashtable @{ &quot;PreviousUser&quot; = &quot;newlogin&quot; } -Source $Sql01 -Destination Localhost -SourceSqlCredential $sqlcred -Login PreviousUser" }

Copies PreviousUser as newlogin.<br>

#####  Example:  6 

```powershell
PS C:\> Copy-DbaLogin -LoginRenameHashtable @{ OldLogin = "NewLogin" } -Source Sql01 -Destination Sql01 -Login ORG\OldLogin -ObjectLevel -NewSid
```
{: data-copyable="true" data-clean-code="Copy-DbaLogin -LoginRenameHashtable @{ OldLogin = &quot;NewLogin&quot; } -Source Sql01 -Destination Sql01 -Login ORG\OldLogin -ObjectLevel -NewSid" }

Clones OldLogin as NewLogin onto the same server, generating a new SID for the login. Also clones object-level permissions.<br>

#####  Example:  7 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2016 | Out-GridView -Passthru | Copy-DbaLogin -Destination sql2017
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2016 | Out-GridView -Passthru | Copy-DbaLogin -Destination sql2017" }

Displays all available logins on sql2016 in a grid view, then copies all selected logins to sql2017.<br>

#####  Example:  8 

```powershell
PS C:\> $loginSplat = @{
>> Source = $Sql01
>> Destination = "Localhost"
>> SourceSqlCredential = $sqlcred
>> Login = 'ReadUserP', 'ReadWriteUserP', 'AdminP'
>> LoginRenameHashtable = @{
>> "ReadUserP" = "ReadUserT"
>> "ReadWriteUserP" = "ReadWriteUserT"
>> "AdminP"         = "AdminT"
>> }
>> }
PS C:\> Copy-DbaLogin @loginSplat
```
{: data-copyable="true" data-clean-code="$loginSplat = @{
Source = $Sql01
Destination = &quot;Localhost&quot;
SourceSqlCredential = $sqlcred
Login = 'ReadUserP', 'ReadWriteUserP', 'AdminP'
LoginRenameHashtable = @{
&quot;ReadUserP&quot; = &quot;ReadUserT&quot;
&quot;ReadWriteUserP&quot; = &quot;ReadWriteUserT&quot;
&quot;AdminP&quot;         = &quot;AdminT&quot;
}
}
Copy-DbaLogin @loginSplat" }

Copies the three specified logins to 'localhost' and renames them according to the LoginRenameHashTable.<br>

### Required Parameters

##### -Source

Source SQL Server. You must have sysadmin access and server version must be SQL Server version 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server. You must have sysadmin access and the server must be SQL Server 2000 or higher.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -OutFile

Exports login creation scripts to a T-SQL file instead of copying directly to a destination instance.  
Use this to generate scripts for manual review, version control, or deployment through automated processes rather than performing immediate migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies which SQL Server logins to copy from the source instance. Accepts wildcards and arrays of login names.  
Use this when you need to copy specific logins rather than all logins, such as during application migrations or when setting up users for specific databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeLogin

Specifies which logins to skip during the copy operation. Accepts wildcards and arrays of login names.  
Useful for excluding test accounts, service accounts that should remain environment-specific, or logins that already exist on the destination with different configurations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeSystemLogins

Excludes NT SERVICE accounts and other system-generated logins from the copy operation.  
Use this during server migrations when you don't want to copy OS-level service accounts that may differ between environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SyncSaName

Renames the destination sa account to match the source sa account name if they differ.  
Use this during migrations when your organization has renamed the sa account for security purposes and you need consistent naming across instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -InputObject

Accepts login objects from Get-DbaLogin or other dbatools commands through the pipeline.  
Use this when you want to filter or manipulate login objects before copying, such as selecting logins through Out-GridView or combining multiple sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -LoginRenameHashtable

Renames logins during copy using a hashtable with old names as keys and new names as values.  
Use this for login consolidation, environment-specific naming conventions, or when resolving naming conflicts during migrations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -KillActiveConnection

Terminates active sessions for logins being replaced when using -Force, allowing the drop and recreate operation to proceed.  
Use this during maintenance windows when you need to force login replacement despite active connections, but ensure users are notified of potential disruption.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NewSid

Forces generation of new Security Identifiers (SIDs) for copied logins instead of preserving original SIDs.  
Use this when copying logins to the same instance (login cloning) or when SID conflicts exist on the destination server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Force

Drops and recreates existing logins on the destination server, transferring ownership of databases and SQL Agent jobs to 'sa' first.  
Use this when you need to update login passwords or properties that can't be modified in place, but ensure job ownership changes are acceptable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ObjectLevel

Copies granular object-level permissions (table, view, procedure permissions) in addition to database and server roles.  
Use this for complete security replication when applications rely on specific object permissions rather than just role memberships.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ExcludePermissionSync

Skips copying server roles, database permissions, and security mappings for the login accounts.  
Use this when you only need the login accounts created but plan to configure permissions separately, or when copying logins for testing purposes.

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
