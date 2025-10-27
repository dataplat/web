---
title: "Test-DbaBuild"
slug: "Test-DbaBuild"
date: 2024-01-01
layout: "single"
author: "Simone Bizzotto (@niphold) | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Tests SQL Server build versions against patching compliance requirements"
tags:
  - "SqlBuild"
  - "Version"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBuild.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaBuild"
draft: false
---

# Test-DbaBuild

| Property | Value |
| --- | --- |
| **Author** | Simone Bizzotto (@niphold) , Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaBuild](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaBuild.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaBuild](https://dataplat.github.io/boh#Test-DbaBuild).

## Synopsis

Tests SQL Server build versions against patching compliance requirements

## Description

Evaluates SQL Server instances or build versions against organizational patching policies to determine compliance status. Returns detailed build information including service pack level, cumulative update, reference KB, and end-of-support dates with a compliance flag. Helps DBAs audit patch levels across environments and identify instances that fall below minimum security or stability requirements. You can test against specific minimum builds, relative currency policies (like "no more than 1 SP behind"), or require the latest available build.

## Syntax

```powershell
Test-DbaBuild
    [[-Build] <Version[]>]
    [[-MinimumBuild] <Version>]
    [[-MaxBehind] <String>]
    [-Latest]
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [-Update]
    [-Quiet]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.5540" -MinimumBuild "12.0.5557"
```

Returns information about a build identified by "12.0.5540" (which is SQL 2014 with SP2 and CU4), which is not compliant as the minimum required<br>
build is "12.0.5557" (which is SQL 2014 with SP2 and CU8).<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.5540" -MaxBehind "1SP"
```

Returns information about a build identified by "12.0.5540", making sure it is AT MOST 1 Service Pack "behind". For that version,<br>
that identifies an SP2, means accepting as the lowest compliance version as "12.0.4110", that identifies 2014 with SP1.<br>
Output column CUTarget is not relevant (empty). SPTarget and BuildTarget are filled in the result.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.5540" -MaxBehind "1SP 1CU"
```

Returns information about a build identified by "12.0.5540", making sure it is AT MOST 1 Service Pack "behind", plus 1 CU "behind". For that version,<br>
that identifies an SP2 and CU, rolling back 1 SP brings you to "12.0.4110", but given the latest CU for SP1 is CU13, the target "compliant" build<br>
will be "12.0.4511", which is 2014 with SP1 and CU12.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.5540" -MaxBehind "0CU"
```

Returns information about a build identified by "12.0.5540", making sure it is the latest CU release.<br>
Output columns CUTarget, SPTarget and BuildTarget are relevant. If the latest build is a service pack (not a CU), CUTarget will be empty.<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.5540" -Latest
```

Returns information about a build identified by "12.0.5540", making sure it is the latest build available.<br>
Output columns CUTarget and SPTarget are not relevant (empty), only the BuildTarget is.<br>

#####  Example:  6 

```powershell
PS C:\> Test-DbaBuild -Build "12.00.4502" -MinimumBuild "12.0.4511" -Update
```

Same as before, but tries to fetch the most up to date index online. When the online version is newer, the local one gets overwritten.<br>

#####  Example:  7 

```powershell
PS C:\> Test-DbaBuild -Build "12.0.4502","10.50.4260" -MinimumBuild "12.0.4511"
```

Returns information builds identified by these versions strings.<br>

#####  Example:  8 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlserver2014a | Test-DbaBuild -MinimumBuild "12.0.4511"
```

Integrate with other cmdlets to have builds checked for all your registered servers on sqlserver2014a.<br>

### Optional Parameters

##### -Build

Specifies one or more SQL Server build version numbers to test for compliance instead of connecting to live instances.  
Use this when you want to check specific build versions like "12.0.5540" without querying actual servers.  
Accepts version strings in the format major.minor.build or major.minor.build.revision.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MinimumBuild

Sets the baseline build version that defines compliance requirements for your environment.  
Any SQL Server instance running a build version below this threshold will be flagged as non-compliant.  
Commonly used to enforce minimum security patch levels across your SQL Server estate.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MaxBehind

Defines compliance based on how many service packs or cumulative updates behind the latest release is acceptable.  
Use format like "1SP", "2CU", or "1SP 1CU" to specify maximum allowed gaps from current releases.  
This approach automatically adjusts compliance targets as new patches are released, unlike fixed MinimumBuild values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Latest

Requires SQL Server instances to be running the most current build available for their version.  
Use this for environments with strict currency requirements where any outdated build is considered non-compliant.  
Automatically determines the latest available build for each SQL Server major version.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SqlInstance

Target any number of instances, in order to return their compliance state.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Update

Downloads the latest SQL Server build reference data from online sources before performing compliance checks.  
Use this periodically to ensure your compliance testing includes recently released patches and cumulative updates.  
The updated reference data is cached locally for subsequent function calls.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Quiet

Returns only boolean compliance results ($true/$false) instead of detailed build information objects.  
Designed for use in automated scripts where you only need to know pass/fail status.  
Useful for integration with monitoring systems or compliance dashboards.

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


&nbsp;
