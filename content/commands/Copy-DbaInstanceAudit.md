---
title: "Copy-DbaInstanceAudit"
slug: "Copy-DbaInstanceAudit"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server audit objects from source to destination instances"
tags:
  - "Migration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAudit.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaInstanceAudit"
draft: false
---

# Copy-DbaInstanceAudit

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaInstanceAudit](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAudit.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaInstanceAudit](https://dataplat.github.io/boh#Copy-DbaInstanceAudit).

## Synopsis

Copies SQL Server audit objects from source to destination instances

## Description

Migrates SQL Server audit objects and their configurations from one instance to another, preserving audit settings and file paths. This function handles the complex task of recreating audit definitions on destination servers, making it essential for server migrations, disaster recovery scenarios, or standardizing auditing policies across multiple SQL Server instances. By default, all audits are copied, but you can specify individual audits to migrate. If an audit already exists on the destination, it will be skipped unless -Force is used to drop and recreate it.

## Syntax

```powershell
Copy-DbaInstanceAudit
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Audit] <Object[]>]
    [[-ExcludeAudit] <Object[]>]
    [[-Path] <String>]
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
PS C:\> Copy-DbaInstanceAudit -Source sqlserver2014a -Destination sqlcluster
```

Copies all server audits from sqlserver2014a to sqlcluster, using Windows credentials. If audits with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaInstanceAudit -Source sqlserver2014a -Destination sqlcluster -Audit tg_noDbDrop -SourceSqlCredential $cred -Force
```

Copies a single audit, the tg_noDbDrop audit from sqlserver2014a to sqlcluster, using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If an audit with the same name exists <br>
on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaInstanceAudit -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaInstanceAudit -Source sqlserver-0 -Destination sqlserver-1 -Audit audit1 -Path 'C:\audit1'
```

Copies audit audit1 from sqlserver-0 to sqlserver-1. The file path on sqlserver-1 will be set to 'C:\audit1'.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the audit objects to copy. Requires sysadmin access to read audit configurations and their associated file paths.  
Must be SQL Server 2008 or higher since server audits were introduced in SQL Server 2008.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance where audit objects will be created. Requires sysadmin access to create audits and potentially create audit file directories.  
Must be SQL Server 2008 or higher since server audits were introduced in SQL Server 2008.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Login credentials for the source SQL Server instance. Use this when the current Windows user doesn't have sysadmin access to read audit objects.  
Must have sysadmin privileges since audit configurations require elevated permissions to access.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Login credentials for the destination SQL Server instance. Use this when the current Windows user doesn't have sysadmin access to create audit objects.  
Must have sysadmin privileges since creating audits and directories requires elevated permissions.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Audit

Specifies which server audits to copy by name. Use this when you only need to migrate specific audits rather than all audits on the server.  
Supports tab completion with audit names from the source server. If not specified, all audits will be copied.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAudit

Specifies server audits to skip during the copy operation. Use this when you want to copy most audits but exclude specific ones that shouldn't be migrated.  
Supports tab completion with audit names from the source server. Cannot be used with the -Audit parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory path where audit files will be created on the destination server. Use this when the original audit file path from the source doesn't exist on the destination.  
If not specified, the function attempts to use the source audit's original file path, or falls back to the default data directory if the path doesn't exist.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates audits that already exist on the destination server. Also creates missing audit file directories if they don't exist.  
Without this switch, existing audits are skipped and missing directories cause the operation to fail.

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
