---
title: "Copy-DbaInstanceAuditSpecification"
slug: "Copy-DbaInstanceAuditSpecification"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies server audit specifications from one SQL Server instance to another for compliance standardization."
tags:
  - "Migration"
  - "ServerAudit"
  - "AuditSpecification"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAuditSpecification.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaInstanceAuditSpecification"
draft: false
---

# Copy-DbaInstanceAuditSpecification

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaInstanceAuditSpecification](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaInstanceAuditSpecification.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaInstanceAuditSpecification](https://dataplat.github.io/boh#Copy-DbaInstanceAuditSpecification).

## Synopsis

Copies server audit specifications from one SQL Server instance to another for compliance standardization.

## Description

Migrates server audit specifications between SQL Server instances, allowing DBAs to standardize audit configurations across environments or restore audit settings during disaster recovery. The function scripts existing audit specifications from the source server and recreates them on the destination, but only if the corresponding server audits already exist on the target instance.  
  
By default, all audit specifications are copied, but you can target specific ones using the -AuditSpecification parameter. Existing specifications on the destination are skipped unless -Force is used to drop and recreate them. This prevents accidental overwrites while enabling intentional updates to audit configurations.

## Syntax

```powershell
Copy-DbaInstanceAuditSpecification
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-AuditSpecification] <Object[]>]
    [[-ExcludeAuditSpecification] <Object[]>]
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
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster
```

Copies all server audits from sqlserver2014a to sqlcluster using Windows credentials to connect. If audits with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -AuditSpecification tg_noDbDrop -SourceSqlCredential $cred -Force
```

Copies a single audit, the tg_noDbDrop audit from sqlserver2014a to sqlcluster using SQL credentials to connect to sqlserver2014a and Windows credentials to connect to sqlcluster. If an audit <br>
specification with the same name exists on sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaInstanceAuditSpecification -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Source SQL Server instance containing the server audit specifications to copy. Requires sysadmin access and SQL Server 2008 or higher.  
The function will read all existing audit specifications from this instance to migrate to the destination.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Destination SQL Server instance where audit specifications will be created. Requires sysadmin access and SQL Server 2008 or higher.  
The corresponding server audits must already exist on this instance before audit specifications can be successfully copied.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance to read audit specifications. Use when Windows Authentication is not available.  
Accepts PowerShell credentials (Get-Credential) and supports SQL Server Authentication, Active Directory authentication modes.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance to create audit specifications. Use when Windows Authentication is not available.  
Accepts PowerShell credentials (Get-Credential) and supports SQL Server Authentication, Active Directory authentication modes.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AuditSpecification

Specifies which server audit specifications to copy by name. Accepts multiple specification names as an array.  
Use this when you need to migrate specific audit specifications rather than all specifications from the source instance.  
If not specified, all audit specifications from the source will be processed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeAuditSpecification

Specifies which server audit specifications to skip during the copy operation. Accepts multiple specification names as an array.  
Use this to copy all audit specifications except those you want to exclude, such as environment-specific or test specifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing audit specifications on the destination instance instead of skipping them.  
Use this when you need to overwrite existing audit specifications with updated configurations from the source.

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
