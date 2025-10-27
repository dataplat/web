---
title: "Set-DbaDbMirror"
slug: "Set-DbaDbMirror"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Configures database mirroring partner, witness, safety level, and operational state settings."
tags:
  - "Mirroring"
  - "Mirror"
  - "HA"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbMirror.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaDbMirror"
draft: false
---

# Set-DbaDbMirror

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaDbMirror](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbMirror.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaDbMirror](https://dataplat.github.io/boh#Set-DbaDbMirror).

## Synopsis

Configures database mirroring partner, witness, safety level, and operational state settings.

## Description

Modifies database mirroring configuration by setting the partner server, witness server, safety level, or changing the mirror state. This function lets you reconfigure existing mirrored databases without manually writing ALTER DATABASE statements. Use it to add or change witness servers for automatic failover, adjust safety levels between synchronous and asynchronous modes, or control mirror states like suspend, resume, and failover operations.

## Syntax

```powershell
Set-DbaDbMirror
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String[]>]
    [[-Partner] <String>]
    [[-Witness] <String>]
    [[-SafetyLevel] <String>]
    [[-State] <String>]
    [[-InputObject] <Database[]>]
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
PS C:\> Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -Partner TCP://SQL2008.ad.local:5374
```

Prompts for confirmation then sets the partner to TCP://SQL2008.ad.local:5374 for the database "dbtools"<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -Witness TCP://SQL2012.ad.local:5502 -Confirm:$false
```

Does not prompt for confirmation and sets the witness to TCP://SQL2012.ad.local:5502 for the database "dbtools"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2005 | Out-GridView -PassThru | Set-DbaDbMirror -SafetyLevel Full -Confirm:$false
```

Sets the safety level to Full for databases selected from a grid view. Does not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -State Suspend -Confirm:$false
```

Does not prompt for confirmation and sets the state to suspend for the database "dbtools"<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -Database

Specifies the database(s) to configure mirroring settings for. Accepts multiple database names.  
Use this to target specific mirrored databases when you need to modify partner, witness, safety level, or state settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Partner

Sets the mirroring partner server endpoint in TCP://servername:port format. This establishes or changes the mirror partnership.  
Use this when setting up initial mirroring or changing the partner server after a configuration change or migration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Witness

Sets the witness server endpoint in TCP://servername:port format to enable automatic failover in high-safety mode.  
Use this to add witness functionality for automatic failover or to change the witness server location.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SafetyLevel

Controls transaction safety mode: 'Full' for synchronous high-safety, 'Off' for asynchronous high-performance.  
Use 'Full' when you need zero data loss with automatic failover, or 'Off' for better performance with potential data loss during failover.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Full,Off,None |

##### -State

Changes the operational state of the mirroring session. Options include Suspend, Resume, Failover, or RemoveWitness.  
Use this to temporarily pause mirroring during maintenance, resume after suspension, perform manual failover, or remove witness functionality.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ForceFailoverAndAllowDataLoss,Failover,RemoveWitness,Resume,Suspend,Off |

##### -InputObject

Accepts database objects from Get-DbaDatabase pipeline input for batch operations.  
Use this to configure mirroring settings across multiple databases efficiently by piping database objects from other dbatools commands.

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
