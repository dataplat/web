---
title: "Copy-DbaDbMail"
slug: "Copy-DbaDbMail"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies Database Mail configuration including profiles, accounts, mail servers and settings between SQL Server instances."
tags:
  - "Migration"
  - "Mail"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbMail.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaDbMail"
draft: false
---

# Copy-DbaDbMail

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaDbMail](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaDbMail.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaDbMail](https://dataplat.github.io/boh#Copy-DbaDbMail).

## Synopsis

Copies Database Mail configuration including profiles, accounts, mail servers and settings between SQL Server instances.

## Description

Migrates the complete Database Mail setup from a source SQL Server to one or more destination servers. This includes mail profiles (which group accounts for specific purposes), mail accounts (SMTP configurations), mail servers (SMTP server details and credentials), and global configuration values like account retry attempts and maximum file size.  
  
Database Mail is commonly used for automated alerts, backup notifications, job failure reports, and maintenance notifications. This function saves significant manual configuration time when setting up new servers, standardizing mail configurations across environments, or migrating to new hardware.  
  
The function preserves all SMTP authentication details including encrypted passwords, handles name conflicts with optional force replacement, and can enable Database Mail on the destination if it's enabled on the source. You can migrate specific component types or the entire configuration in one operation.

## Syntax

```powershell
Copy-DbaDbMail -Source <DbaInstanceParameter> -Destination <DbaInstanceParameter[]>
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Copy-DbaDbMail -Source <DbaInstanceParameter> -Destination <DbaInstanceParameter[]>
    [-Type <String[]>]
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Force]
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
PS C:\> Copy-DbaDbMail -Source sqlserver2014a -Destination sqlcluster
```

Copies all database mail objects from sqlserver2014a to sqlcluster using Windows credentials. If database mail objects with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaDbMail -Source sqlserver2014a -Destination sqlcluster -SourceSqlCredential $cred
```

Copies all database mail objects from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaDbMail -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

Shows what would happen if the command were executed.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaDbMail -Source sqlserver2014a -Destination sqlcluster -EnableException
```

Performs execution of function, and will throw a terminating exception if something breaks<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing the Database Mail configuration to copy. The function reads all mail profiles, accounts, mail servers, and configuration values from this instance.  
You must have sysadmin privileges to access the MSDB database where Database Mail settings are stored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances where the Database Mail configuration will be copied. Accepts an array to migrate to multiple servers simultaneously.  
You must have sysadmin privileges on each destination to create mail profiles, accounts, and server configurations in MSDB.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Type

Limits migration to specific Database Mail component types instead of copying everything. Choose 'ConfigurationValues' for global settings like retry attempts and file size limits, 'Profiles' for   
mail profile definitions, 'Accounts' for SMTP account configurations, or 'MailServers' for SMTP server details.  
Use this when you only need to sync specific components or when troubleshooting individual Database Mail layers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ConfigurationValues,Profiles,Accounts,MailServers |

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

##### -Force

Overwrites existing Database Mail objects on the destination that have matching names from the source. Without this switch, existing profiles, accounts, or mail servers are skipped to prevent   
accidental data loss.  
Use this when updating existing Database Mail configurations or when you need to replace outdated settings with current ones from the source server.

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
