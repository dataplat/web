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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Grant-DbaAgPermission</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Grant-DbaAgPermission.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Grant-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup SharePoint -Permission CreateAnyDatabase" }

Adds CreateAnyDatabase permissions to the SharePoint availability group on sql2017a. Does not prompt for confirmation.<br>

#####  Example:  2 

```powershell
PS C:\> Grant-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup ag1, ag2 -Permission CreateAnyDatabase -Confirm
```
{: data-copyable="true" data-clean-code="Grant-DbaAgPermission -SqlInstance sql2017a -Type AvailabilityGroup -AvailabilityGroup ag1, ag2 -Permission CreateAnyDatabase -Confirm" }

Adds CreateAnyDatabase permissions to the ag1 and ag2 availability groups on sql2017a. Prompts for confirmation.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLogin -SqlInstance sql2017a | Out-GridView -Passthru | Grant-DbaAgPermission -Type EndPoint
```
{: data-copyable="true" data-clean-code="Get-DbaLogin -SqlInstance sql2017a | Out-GridView -Passthru | Grant-DbaAgPermission -Type EndPoint" }

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
