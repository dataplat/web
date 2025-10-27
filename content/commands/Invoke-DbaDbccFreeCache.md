---
title: "Invoke-DbaDbccFreeCache"
slug: "Invoke-DbaDbccFreeCache"
date: 2024-01-01
layout: "single"
author: "Patrick Flynn (@sqllensman)"
availability: "Windows, Linux, macOS"
synopsis: "Clears SQL Server memory caches using DBCC commands to resolve performance issues and free memory"
tags:
  - "DBCC"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbccFreeCache.ps1"
bohUrl: "https://dataplat.github.io/boh#Invoke-DbaDbccFreeCache"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Invoke-DbaDbccFreeCache</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbccFreeCache.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Patrick Flynn (@sqllensman)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Clears SQL Server memory caches using DBCC commands to resolve performance issues and free memory

## Description

Executes DBCC commands to clear various SQL Server memory caches when troubleshooting performance problems or freeing memory on resource-constrained systems. This function helps DBAs resolve issues like parameter sniffing, plan cache bloat, or memory pressure without restarting the SQL Server service.  
  
Supports three cache-clearing operations:  
- DBCC FREEPROCCACHE: Clears procedure cache (all plans or specific plan handles/resource pools)  
- DBCC FREESESSIONCACHE: Clears distributed query connection cache for linked servers  
- DBCC FREESYSTEMCACHE: Clears system caches like token cache and ring buffers  
  
Use FREEPROCCACHE to resolve parameter sniffing issues or when query plans become inefficient. Use FREESESSIONCACHE when experiencing linked server connection problems. Use FREESYSTEMCACHE to clear authentication tokens and other system-level cached data.  
  
Read more:  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-freeproccache-transact-sql  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-freesessioncache-transact-sql  
    - https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-freesystemcache-transact-sql

## Syntax

```powershell
Invoke-DbaDbccFreeCache
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Operation] <String>]
    [[-InputValue] <String>]
    [-NoInformationalMessages]
    [-MarkInUseForRemoval]
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
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE" }

Runs the command DBCC FREEPROCCACHE against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESESSIONCACHE -NoInformationalMessages
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESESSIONCACHE -NoInformationalMessages" }

Runs the command DBCC FREESESSIONCACHE WITH NO_INFOMSGS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -NoInformationalMessages
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -NoInformationalMessages" }

Runs the command DBCC FREESYSTEMCACHE WITH NO_INFOMSGS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue 0x060006001ECA270EC0215D05000000000000000000000000
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue 0x060006001ECA270EC0215D05000000000000000000000000" }

Remove a specific plan with plan_handle 0x060006001ECA270EC0215D05000000000000000000000000 from the cache via the command DBCC FREEPROCCACHE(0x060006001ECA270EC0215D05000000000000000000000000) <br>
against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue default
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue default" }

Runs the command DBCC FREEPROCCACHE('default') against the instance SqlServer2017 using Windows Authentication. This clears all cache entries associated with a resource pool 'default'.<br>

#####  Example:  6 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default" }

Runs the command DBCC FREESYSTEMCACHE ('ALL', default) against the instance SqlServer2017 using Windows Authentication. This will clean all the caches with entries specific to the resource pool named <br>
"default".<br>

#####  Example:  7 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default -MarkInUseForRemoval
```
{: data-copyable="true" data-clean-code="Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default -MarkInUseForRemoval" }

Runs the command DBCC FREESYSTEMCACHE ('ALL', default) WITH MARK_IN_USE_FOR_REMOVAL against the instance SqlServer2017 using Windows Authentication. This will to release entries once the entries <br>
become unused for all the caches with entries specific to the resource pool named "default".<br>

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

##### -Operation

Specifies which cache clearing operation to perform: FreeProcCache, FreeSessionCache, or FreeSystemCache.  
Use FreeProcCache to resolve parameter sniffing or clear inefficient query plans, FreeSessionCache to clear linked server connections, or FreeSystemCache to clear authentication tokens and   
system-level caches.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | FreeProcCache |
| Accepted Values | FreeProcCache,FreeSessionCache,FreeSystemCache |

##### -InputValue

Specifies a target value to limit the cache clearing operation instead of clearing all cache entries.  
For FreeProcCache: provide a specific plan_handle (0x...), sql_handle (0x...), or Resource Governor pool name to clear only those entries. For FreeSystemCache: provide a Resource Governor pool name   
to clear only that pool's cache entries.  
When omitted, clears all entries for the specified operation which is the typical DBA use case.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NoInformationalMessages

Suppresses informational messages returned by the DBCC commands.  
Use this in scripts or automated processes where you only want to capture errors and warnings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MarkInUseForRemoval

Marks currently active cache entries for removal once they become unused, rather than waiting for them to be released.  
Only applies to FreeSystemCache operations and helps ensure memory is freed more aggressively on systems under memory pressure.

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

Shows what would happen if the cmdlet runs. The cmdlet is not run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the cmdlet.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
