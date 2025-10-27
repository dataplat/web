---
title: "Set-DbaAgentJobOutputFile"
slug: "Set-DbaAgentJobOutputFile"
date: 2024-01-01
layout: "single"
author: "Rob Sewell, sqldbawithabeard.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures the output file path for SQL Server Agent job steps to capture step execution logs."
tags:
  - "Agent"
  - "Job"
  - "SqlAgent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobOutputFile.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentJobOutputFile"
draft: false
---

# Set-DbaAgentJobOutputFile

| Property | Value |
| --- | --- |
| **Author** | Rob Sewell, sqldbawithabeard.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaAgentJobOutputFile](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobOutputFile.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaAgentJobOutputFile](https://dataplat.github.io/boh#Set-DbaAgentJobOutputFile).

## Synopsis

Configures the output file path for SQL Server Agent job steps to capture step execution logs.

## Description

Modifies the output file location where SQL Server Agent writes job step execution details, error messages, and command output. This centralizes logging for troubleshooting failed jobs, monitoring step execution, and maintaining audit trails without manually editing each job step through SQL Server Management Studio. When no specific step is provided, an interactive selection interface appears for jobs with multiple steps.

## Syntax

```powershell
Set-DbaAgentJobOutputFile
    [-SqlInstance] <DbaInstanceParameter[]>
    [-SqlCredential <PSCredential>]
    [-Job <Object[]>]
    [-Step <Object[]>]
    -OutputFile <String>
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
PS C:\> Set-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Job 'The Agent Job' -OutPutFile E:\Logs\AgentJobStepOutput.txt
```

Sets the Job step for The Agent job on SERVERNAME to E:\Logs\AgentJobStepOutput.txt<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

##### -OutputFile

Specifies the complete file path where SQL Agent should write job step execution output and error messages.  
Use this to centralize job logging in a location accessible for troubleshooting and monitoring. The path must be accessible by the SQL Server service account and should include the filename with   
extension.

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
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value |  |

##### -Job

Specifies the SQL Server Agent job name whose step output files you want to configure.  
Use this to target specific jobs that need centralized logging or troubleshooting. This parameter is not officially mandatory, but you will always be asked to provide a job if you have not.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Step

Specifies which job step(s) within the target job should have their output file configured.  
Use this when you only want to set output files for specific steps in multi-step jobs. Step names are unique within each job, making this a reliable way to target individual steps. If omitted and the   
job has multiple steps, an interactive GUI will appear for step selection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue, ByPropertyName) |
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
