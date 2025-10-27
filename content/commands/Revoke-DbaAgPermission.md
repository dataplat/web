---
title: "Revoke-DbaAgPermission"
slug: "Revoke-DbaAgPermission"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Revokes permissions from SQL Server logins on database mirroring endpoints or availability groups."
tags:
  - "AG"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Revoke-DbaAgPermission.ps1"
bohUrl: "https://dataplat.github.io/boh#Revoke-DbaAgPermission"
draft: false
---

# Revoke-DbaAgPermission

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Revoke-DbaAgPermission](https://github.com/dataplat/dbatools/blob/master/public/Revoke-DbaAgPermission.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Revoke-DbaAgPermission](https://dataplat.github.io/boh#Revoke-DbaAgPermission).

## Synopsis

Revokes permissions from SQL Server logins on database mirroring endpoints or availability groups.

## Description

Removes specific permissions from SQL Server logins on either database mirroring endpoints or availability groups. This is commonly needed when service accounts change roles, security policies require permission reductions, or during availability group maintenance and troubleshooting. For endpoints, you can revoke most standard permissions like Connect, Alter, and Control. For availability groups, only Alter, Control, TakeOwnership, and ViewDefinition permissions can be revoked.

## Syntax

```powershell
Revoke-DbaAgPermission
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
PS C:\> Revoke-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup SharePoint -Login ad\spservice -Permission CreateAnyDatabase
```

Removes CreateAnyDatabase permissions from ad\spservice on the SharePoint availability group on sql2017a. Does not prompt for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Revoke-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup ag1, ag2 -Login ad\spservice -Permission CreateAnyDatabase -Confirm
```

Removes CreateAnyDatabase permissions from ad\spservice on the ag1 and ag2 availability groups on sql2017a. Prompts for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2017a | Out-GridView -Passthru | Revoke-DbaAgPermission -Type EndPoint
```

Revokes the selected logins Connect permissions on the DatabaseMirroring endpoint for sql2017a.<br>

### Required Parameters

##### -Type

Determines whether to revoke permissions on database mirroring endpoints or availability groups. This parameter is mandatory.  
Use 'Endpoint' to revoke permissions on the DatabaseMirroring endpoint, typically needed for Always On setup or mirroring configurations.  
Use 'AvailabilityGroup' to revoke permissions directly on specific availability group objects for more granular security control.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Endpoint,AvailabilityGroup |

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Server version must be SQL Server version 2012 or higher.

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

Specifies the SQL Server logins or Windows accounts to remove permissions from. Required when using the SqlInstance parameter.  
Use this when you need to revoke access from service accounts, developers, or other principals that no longer need endpoint or availability group permissions.  
If the specified login doesn't exist, the function will attempt to create it first.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AvailabilityGroup

Specifies which availability groups to target for permission revocation. Required when using Type 'AvailabilityGroup'.  
Use this to limit the scope when you only want to revoke permissions on specific AGs rather than all availability groups in the instance.  
Accepts multiple availability group names for bulk operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Permission

Specifies which permissions to revoke from the targeted logins. Defaults to 'Connect' if not specified.  
For endpoints, most permissions are valid including Connect, Alter, and Control. CreateAnyDatabase is not supported for endpoints.  
For availability groups, only Alter, Control, TakeOwnership, and ViewDefinition are supported.  
Use Connect for basic endpoint access, Alter for configuration changes, Control for full permissions, or ViewDefinition for read-only metadata access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Connect |
| Accepted Values | Alter,Connect,Control,CreateAnyDatabase,CreateSequence,Delete,Execute,Impersonate,Insert,Receive,References,Select,Send,TakeOwnership,Update,ViewChangeTracking,ViewDefinition |

##### -InputObject

Accepts SQL Server login objects from the pipeline, typically from Get-DbaLogin.  
Use this approach when you want to filter or select specific logins before revoking permissions, or when combining with other dbatools commands.  
This parameter provides an alternative to specifying SqlInstance and Login parameters directly.

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
