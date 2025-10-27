---
title: "Disable-DbaReplDistributor"
slug: "Disable-DbaReplDistributor"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server replication distribution configuration from target instances."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaReplDistributor.ps1"
bohUrl: "https://dataplat.github.io/boh#Disable-DbaReplDistributor"
draft: false
---

# Disable-DbaReplDistributor

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Disable-DbaReplDistributor](https://github.com/dataplat/dbatools/blob/master/public/Disable-DbaReplDistributor.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Disable-DbaReplDistributor](https://dataplat.github.io/boh#Disable-DbaReplDistributor).

## Synopsis

Removes SQL Server replication distribution configuration from target instances.

## Description

Removes the distribution database and configuration from SQL Server instances currently acting as replication distributors. This command terminates active connections to distribution databases and uninstalls the distributor role completely. Use this when decommissioning replication, troubleshooting distribution issues, or reconfiguring your replication topology. The Force parameter allows removal even when dependent objects or remote publishers cannot be contacted.

## Syntax

```powershell
Disable-DbaReplDistributor
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
PS C:\> Disable-DbaReplDistributor -SqlInstance mssql1
```

Disables replication distribution for the mssql1 instance.<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Disable-DbaReplDistributor -SqlInstance mssql1, mssql2 -SqlCredential $cred -Force
```

Disables replication distribution for the mssql1 and mssql2 instances using a sql login. Specifies force so the publishing and Distributor configuration at the current server is uninstalled <br>
regardless of whether or not dependent publishing and distribution objects are uninstalled.<br>

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

Forces removal of the distributor configuration even when dependent replication objects exist or remote publishers cannot be contacted.  
Use this when decommissioning a distributor that has orphaned publications or when network connectivity to remote publishers is unavailable.  
Without Force, the command will fail if any local databases are enabled for publishing or if publisher/distribution databases haven't been cleanly removed first.

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
