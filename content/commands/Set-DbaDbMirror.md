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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaDbMirror</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaDbMirror.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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
{: data-copyable="true" data-clean-code="Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -Partner TCP://SQL2008.ad.local:5374" }

Prompts for confirmation then sets the partner to TCP://SQL2008.ad.local:5374 for the database "dbtools"<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -Witness TCP://SQL2012.ad.local:5502 -Confirm:$false
```
{: data-copyable="true" data-clean-code="Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -Witness TCP://SQL2012.ad.local:5502 -Confirm:$false" }

Does not prompt for confirmation and sets the witness to TCP://SQL2012.ad.local:5502 for the database "dbtools"<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaDatabase -SqlInstance sql2005 | Out-GridView -PassThru | Set-DbaDbMirror -SafetyLevel Full -Confirm:$false
```
{: data-copyable="true" data-clean-code="Get-DbaDatabase -SqlInstance sql2005 | Out-GridView -PassThru | Set-DbaDbMirror -SafetyLevel Full -Confirm:$false" }

Sets the safety level to Full for databases selected from a grid view. Does not prompt for confirmation.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -State Suspend -Confirm:$false
```
{: data-copyable="true" data-clean-code="Set-DbaDbMirror -SqlInstance sql2005 -Database dbatools -State Suspend -Confirm:$false" }

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
