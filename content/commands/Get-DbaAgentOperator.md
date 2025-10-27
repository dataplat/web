---
title: "Get-DbaAgentOperator"
slug: "Get-DbaAgentOperator"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent operators with their notification settings and related jobs and alerts."
tags:
  - "Agent"
  - "Operator"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentOperator.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentOperator"
draft: false
---

# Get-DbaAgentOperator

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentOperator](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentOperator.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentOperator](https://dataplat.github.io/boh#Get-DbaAgentOperator).

## Synopsis

Retrieves SQL Server Agent operators with their notification settings and related jobs and alerts.

## Description

Retrieves detailed information about SQL Server Agent operators, including email addresses, enabled status, and relationships to jobs and alerts that notify them. Essential for auditing notification configurations, troubleshooting alert delivery issues, and maintaining disaster recovery contact lists. Shows which jobs notify each operator and tracks the last time each operator received email notifications, helping DBAs verify their monitoring and alerting infrastructure is properly configured.

## Syntax

```powershell
Get-DbaAgentOperator
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Operator] <Object[]>]
    [[-ExcludeOperator] <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentOperator -SqlInstance ServerA,ServerB\instanceB
```

Returns any SQL Agent operators on serverA and serverB\instanceB<br>

#####  Example:  2 

```powershell
PS C:\> 'ServerA','ServerB\instanceB' | Get-DbaAgentOperator
```

Returns all SQL Agent operators  on serverA and serverB\instanceB<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentOperator -SqlInstance ServerA -Operator Dba1,Dba2
```

Returns only the SQL Agent Operators Dba1 and Dba2 on ServerA.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentOperator -SqlInstance ServerA,ServerB -ExcludeOperator Dba3
```

Returns all the SQL Agent operators on ServerA and ServerB, except the Dba3 operator.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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

##### -Operator

Specifies which SQL Agent operators to retrieve by name. Accepts an array of operator names for targeting specific notification contacts.  
Use this when you need to check configuration or troubleshoot notification issues for particular operators instead of reviewing all operators on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeOperator

Excludes specified SQL Agent operators from the results by name. Useful for filtering out test operators or disabled contacts during audits.  
Commonly used when reviewing active notification configurations while ignoring legacy or temporary operator accounts.

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


&nbsp;
