---
title: "Get-DbaAgentJobOutputFile"
slug: "Get-DbaAgentJobOutputFile"
date: 2024-01-01
layout: "single"
author: "Rob Sewell (sqldbawithabeard.com) | Simone Bizzotto (@niphlod)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves output file paths configured for SQL Agent job steps"
tags:
  - "Agent"
  - "Job"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobOutputFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentJobOutputFile"
draft: false
---

# Get-DbaAgentJobOutputFile

| Property | Value |
| --- | --- |
| **Author** | Rob Sewell (sqldbawithabeard.com) , Simone Bizzotto (@niphlod) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentJobOutputFile](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobOutputFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentJobOutputFile](https://dataplat.github.io/boh#Get-DbaAgentJobOutputFile).

## Synopsis

Retrieves output file paths configured for SQL Agent job steps

## Description

This function returns the file paths where SQL Agent job steps write their output logs. When troubleshooting failed jobs or reviewing execution history, DBAs often need to locate these output files to examine detailed error messages and execution details. The function returns both the local file path and the UNC path for remote access, but only displays job steps that have an output file configured.

## Syntax

```powershell
Get-DbaAgentJobOutputFile
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Job <Object[]>]
    [-ExcludeJob <Object[]>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Job 'The Agent Job'
```

This will return the configured paths to the output files for each of the job step of the The Agent Job Job<br>
on the SERVERNAME instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME
```

This will return the configured paths to the output files for each of the job step of all the Agent Jobs<br>
on the SERVERNAME instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME,SERVERNAME2 -Job 'The Agent Job'
```

This will return the configured paths to the output files for each of the job step of the The Agent Job Job<br>
on the SERVERNAME instance and SERVERNAME2<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME  | Out-GridView
```

This will return the configured paths to the output files for each of the job step of all the Agent Jobs<br>
on the SERVERNAME instance and Pipe them to Out-GridView<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Verbose
```

This will return the configured paths to the output files for each of the job step of all the Agent Jobs<br>
on the SERVERNAME instance and also show the job steps without an output file<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance. be it Windows or SQL Server. Windows users are determined by the existence of a backslash, so if you are intending to use an alternative Windows   
connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Job

Specifies specific SQL Agent jobs to examine for output file configurations. Accepts job names as strings and supports multiple values.  
Use this when you need to check output file paths for specific jobs rather than scanning all jobs on the instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeJob

Specifies SQL Agent jobs to exclude from the output file search. Accepts job names as strings and supports multiple values.  
Use this when you want to scan most jobs but skip specific ones, such as excluding system maintenance jobs or jobs you know don't use output files.

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
