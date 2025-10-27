---
title: "Grant-DbaAgPermission"
slug: "Grant-DbaAgPermission"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Grants specific permissions to logins for availability groups and database mirroring endpoints."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Grant-DbaAgPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Grant-DbaAgPermission"
draft: false
---

# Grant-DbaAgPermission

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Grant-DbaAgPermission](https://github.com/dataplat/dbatools/blob/master/public/Grant-DbaAgPermission.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Grant-DbaAgPermission](https://dataplat.github.io/boh#Grant-DbaAgPermission).

## Synopsis

Grants specific permissions to logins for availability groups and database mirroring endpoints.

## Description

Grants permissions to SQL Server logins for availability groups (Alter, Control, TakeOwnership, ViewDefinition) and database mirroring endpoints (Connect, Alter, Control, and others). Essential for setting up high availability and disaster recovery scenarios where service accounts or users need access to manage or connect to availability group resources. Windows logins are automatically created if they don't exist on the target instance, simplifying multi-server availability group deployments.

## Syntax

```powershell
Grant-DbaAgPermission
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String[]>]
    [[-AvailabilityGroup] <String[]>]
    [-Type] <String[]>
    [[-Permission] <String[]>]
    [[-InputObject] <Login[]>]
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
PS C:\> Grant-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup SharePoint -Permission CreateAnyDatabase
```

Adds CreateAnyDatabase permissions to the SharePoint availability group on sql2017a. Does not prompt for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Grant-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup ag1, ag2 -Permission CreateAnyDatabase -Confirm
```

Adds CreateAnyDatabase permissions to the ag1 and ag2 availability groups on sql2017a. Prompts for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2017a | Out-GridView -Passthru | Grant-DbaAgPermission -Type EndPoint
```

Grants the selected logins Connect permissions on the DatabaseMirroring endpoint for sql2017a<br>

### Required Parameters

##### -Type

Specifies whether to grant permissions on database mirroring endpoints or availability groups. Use 'Endpoint' for database mirroring endpoint permissions or 'AvailabilityGroup' for AG-level   
permissions.  
Endpoint permissions are needed for replicas to communicate, while AvailabilityGroup permissions control AG management operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Endpoint,AvailabilityGroup |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -Login

Specifies the SQL Server logins that will receive the permissions. Windows logins are automatically created if they don't exist on the target instance.  
Use this when you need to grant permissions to specific service accounts or users for availability group operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies which availability groups to grant permissions on. Required when using Type 'AvailabilityGroup'.  
Use this to limit permission grants to specific AGs rather than all availability groups on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Permission

Specifies which permissions to grant. Defaults to 'Connect' for basic endpoint access.  
For endpoints: Connect, Alter, Control, and others. For availability groups: Alter, Control, TakeOwnership, ViewDefinition only.  
Use 'CreateAnyDatabase' for AGs to allow automatic seeding of new databases to replicas.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Connect |
| Accepted Values | Alter,Connect,Control,CreateAnyDatabase,CreateSequence,Delete,Execute,Impersonate,Insert,Receive,References,Select,Send,TakeOwnership,Update,ViewChangeTracking,ViewDefinition |

##### -InputObject

Accepts login objects from Get-DbaLogin pipeline input. Use this when you've already retrieved specific logins and want to grant them permissions.  
Provides an alternative to specifying individual login names with the -Login parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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
