---
title: "Get-DbaXEObject"
slug: "Get-DbaXEObject"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Extended Events objects available for monitoring and troubleshooting on SQL Server instances."
tags:
  - "ExtendedEvent"
  - "XE"
  - "XEvent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXEObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaXEObject"
draft: false
---

# Get-DbaXEObject

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaXEObject](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaXEObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaXEObject](https://dataplat.github.io/boh#Get-DbaXEObject).

## Synopsis

Retrieves Extended Events objects available for monitoring and troubleshooting on SQL Server instances.

## Description

This function queries sys.dm_xe_packages and sys.dm_xe_objects to discover what Extended Events components are available on your SQL Server instances. Use this when planning Extended Events sessions to see what events you can capture, what actions you can attach, and what targets you can write to. Essential for DBAs setting up performance monitoring, security auditing, or troubleshooting sessions since XE object availability varies by SQL Server version and edition.

## Syntax

```powershell
Get-DbaXEObject
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Type] <String[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaXEObject -SqlInstance sql2016
```

Lists all the XE Objects on the sql2016 SQL Server.<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaXEObject -SqlInstance sql2017 -Type Action, Event
```

Lists all the XE Objects of type Action and Event on the sql2017 SQL Server.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2008 or higher.

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

##### -Type

Filters the Extended Events objects by specific component types to help you find the XE building blocks you need.  
Use this when planning XE sessions to focus on specific components rather than viewing all available objects.  
Events capture SQL Server activities, Actions attach additional data to events, Targets define where to store captured data, and Predicates filter which events to capture.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Type,Event,Target,Action,Map,Message,PredicateComparator,PredicateSource |

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
