---
title: "Enable-DbaReplPublishing"
slug: "Enable-DbaReplPublishing"
date: 2024-01-01
layout: "single"
author: "Jess Pomfret (@jpomfret), jesspomfret.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures a SQL Server instance as a replication publisher on an existing distributor."
tags:
  - "repl"
  - "Replication"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaReplPublishing.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaReplPublishing"
draft: false
---

# Enable-DbaReplPublishing

| Property | Value |
| --- | --- |
| **Author** | Jess Pomfret (@jpomfret), jesspomfret.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaReplPublishing](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaReplPublishing.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaReplPublishing](https://dataplat.github.io/boh#Enable-DbaReplPublishing).

## Synopsis

Configures a SQL Server instance as a replication publisher on an existing distributor.

## Description

Configures a SQL Server instance to publish data for replication by creating the necessary publisher configuration on an existing distributor. This is typically the second step in setting up SQL Server replication, after the distributor has been configured with Enable-DbaReplDistributor. The function sets up the snapshot working directory, configures publisher security authentication, and registers the instance as a publisher with the distribution database. The target instance must already be configured as a distributor before running this command.

## Syntax

```powershell
Enable-DbaReplPublishing
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-SnapshotShare] <String>]
    [[-PublisherSqlLogin] <PSCredential>]
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
PS C:\> Enable-DbaReplPublishing -SqlInstance SqlBox1\Instance2
```

Enables replication publishing for instance SqlBox1\Instance2 using Windows Auth and the default InstallDataDirectory\ReplData as the snapshot folder<br>

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

##### -SnapshotShare

Specifies the network share path where replication snapshot files will be stored and accessed by subscribers.  
Use this when you need snapshot files in a specific location for network access or storage requirements.  
Defaults to InstallDataDirectory\ReplData if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PublisherSqlLogin

SQL Server login credentials to use for publisher security authentication instead of Windows Authentication.  
Use this when the distributor and publisher are in different domains or when Windows Authentication is not available.  
Windows Authentication is used by default and is the recommended method for security.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
