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

# Invoke-DbaDbccFreeCache

| Property | Value |
| --- | --- |
| **Author** | Patrick Flynn (@sqllensman) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Invoke-DbaDbccFreeCache](https://github.com/dataplat/dbatools/blob/master/public/Invoke-DbaDbccFreeCache.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Invoke-DbaDbccFreeCache](https://dataplat.github.io/boh#Invoke-DbaDbccFreeCache).

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

Runs the command DBCC FREEPROCCACHE against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESESSIONCACHE -NoInformationalMessages
```

Runs the command DBCC FREESESSIONCACHE WITH NO_INFOMSGS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  3 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -NoInformationalMessages
```

Runs the command DBCC FREESYSTEMCACHE WITH NO_INFOMSGS against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  4 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue 0x060006001ECA270EC0215D05000000000000000000000000
```

Remove a specific plan with plan_handle 0x060006001ECA270EC0215D05000000000000000000000000 from the cache via the command DBCC FREEPROCCACHE(0x060006001ECA270EC0215D05000000000000000000000000) <br>
against the instance SqlServer2017 using Windows Authentication<br>

#####  Example:  5 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREEPROCCACHE -InputValue default
```

Runs the command DBCC FREEPROCCACHE('default') against the instance SqlServer2017 using Windows Authentication. This clears all cache entries associated with a resource pool 'default'.<br>

#####  Example:  6 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default
```

Runs the command DBCC FREESYSTEMCACHE ('ALL', default) against the instance SqlServer2017 using Windows Authentication. This will clean all the caches with entries specific to the resource pool named <br>
"default".<br>

#####  Example:  7 

```powershell
PS C:\> Invoke-DbaDbccFreeCache -SqlInstance SqlServer2017 -Operation FREESYSTEMCACHE -InputValue default -MarkInUseForRemoval
```

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
