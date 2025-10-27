---
title: "Get-DbaPbmPolicy"
slug: "Get-DbaPbmPolicy"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, sqlnotesfromtheunderground.wordpress.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Policy-Based Management policies from SQL Server instances for compliance auditing and configuration review."
tags:
  - "Policy"
  - "PolicyBasedManagement"
  - "PBM"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmPolicy.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPbmPolicy"
draft: false
---

# Get-DbaPbmPolicy

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, sqlnotesfromtheunderground.wordpress.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPbmPolicy](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPbmPolicy.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPbmPolicy](https://dataplat.github.io/boh#Get-DbaPbmPolicy).

## Synopsis

Retrieves Policy-Based Management policies from SQL Server instances for compliance auditing and configuration review.

## Description

Retrieves all Policy-Based Management policies configured on SQL Server instances, allowing DBAs to audit compliance configurations and review policy settings across their environment. This function connects to the PBM store and returns policy details including categories, conditions, and evaluation modes. Use this when you need to document existing policies, troubleshoot policy evaluations, or verify compliance configurations without manually navigating through SQL Server Management Studio's Policy-Based Management node.

## Syntax

```powershell
Get-DbaPbmPolicy
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Policy] <String[]>]
    [[-Category] <String[]>]
    [[-InputObject] <PSObject[]>]
    [-IncludeSystemObject]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016
```

Returns all policies from sql2016 server<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016 -SqlCredential $cred
```

Uses a credential $cred to connect and return all policies from sql2016 instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPbmPolicy -SqlInstance sql2016 -Category MorningCheck
```

Returns all policies from sql2016 server that part of the PolicyCategory MorningCheck<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Policy

Specifies one or more policy names to retrieve, filtering the results to only those policies. Supports exact name matching for targeted policy retrieval.  
Use this when you need to examine specific policies rather than all policies on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Category

Filters results to show only policies belonging to specific policy categories. Categories help organize policies by function or compliance framework.  
Use this to focus on policies related to specific areas like security, performance, or maintenance checks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts PBM store objects from Get-DbaPbmStore via pipeline, allowing efficient processing of multiple instances. Enables chaining PBM commands together.  
Use this when building complex PBM workflows or when you already have PBM store objects from previous commands.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -IncludeSystemObject

Includes Microsoft's built-in system policies in the results, which are excluded by default. System policies cover standard SQL Server best practices.  
Use this when you need to review or document all policies including Microsoft's predefined compliance policies.

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
