---
title: "Disable-DbaReplPublishing"
slug: "Disable-DbaReplPublishing"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Disables replication publishing on SQL Server instances and removes publisher configuration."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaReplPublishing.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaReplPublishing"
draft: false
---

# Disable-DbaReplPublishing

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaReplPublishing](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaReplPublishing.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaReplPublishing](https://dataplat.github.io/boh#Disable-DbaReplPublishing).

## Synopsis

Disables replication publishing on SQL Server instances and removes publisher configuration.

## Description

Removes the publisher role from SQL Server instances that are currently configured for replication publishing. This function safely dismantles the publishing configuration by removing the publisher from the distributor, which stops all publication activity on the target instance. Use this when decommissioning replication setups or troubleshooting publisher configuration issues that require a clean restart.

## Syntax

```powershell
Disable-DbaReplPublishing
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
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
PS C:\> Disable-DbaReplPublishing -SqlInstance mssql1
```

Disables replication distribution for the mssql1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Disable-DbaReplPublishing -SqlInstance mssql1, mssql2 -SqlCredential $cred -Force
```

Disables replication distribution for the mssql1 and mssql2 instances using a sql login.<br>
Specifies force so all the replication objects associated with the Publisher are dropped even<br>
if the Publisher is on a remote server that cannot be reached.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

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

##### -Force

Forces the removal of publisher configuration without verifying the distributor connection status.  
Use this when the distributor server is unreachable or when you need to forcibly clean up orphaned replication objects.  
Without this switch, the function will fail if it cannot communicate with the distributor to perform proper cleanup verification.

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
