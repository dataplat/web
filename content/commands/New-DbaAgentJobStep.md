---
title: "New-DbaAgentJobStep"
slug: "New-DbaAgentJobStep"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new step within an existing SQL Server Agent job with configurable execution options and flow control"
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJobStep.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaAgentJobStep"
draft: false
---

# New-DbaAgentJobStep

| Property | Value |
| --- | --- |
| **Author** | Sander Stad (@sqlstad), sqlstad.nl |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaAgentJobStep](https://github.com/dataplat/dbatools/blob/master/public/New-DbaAgentJobStep.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaAgentJobStep](https://dataplat.github.io/boh#New-DbaAgentJobStep).

## Synopsis

Creates a new step within an existing SQL Server Agent job with configurable execution options and flow control

## Description

Creates individual job steps within SQL Server Agent jobs, allowing you to build complex automation workflows without manually configuring each step through SSMS. Each step can execute different types of commands (T-SQL, PowerShell, SSIS packages, OS commands) and includes retry logic, success/failure branching, and output capture. When you need to add steps to existing jobs or build multi-step processes, this function handles the step ordering and dependency management automatically, including the ability to insert steps between existing ones without breaking the workflow sequence.

## Syntax

```powershell
New-DbaAgentJobStep
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-Job] <Object[]>
    [[-StepId] <Int32>]
    [-StepName] <String>
    [[-Subsystem] <String>]
    [[-SubsystemServer] <String>]
    [[-Command] <String>]
    [[-CmdExecSuccessCode] <Int32>]
    [[-OnSuccessAction] <String>]
    [[-OnSuccessStepId] <Int32>]
    [[-OnFailAction] <String>]
    [[-OnFailStepId] <Int32>]
    [[-Database] <String>]
    [[-DatabaseUser] <String>]
    [[-RetryAttempts] <Int32>]
    [[-RetryInterval] <Int32>]
    [[-OutputFileName] <String>]
    [-Insert]
    [[-Flag] <String[]>]
    [[-ProxyName] <String>]
    [-Force]
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
PS C:\> New-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1
```

Create a step in "Job1" with the name Step1 with the default subsystem TransactSql.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1 -Database msdb
```

Create a step in "Job1" with the name Step1 where the database will the msdb<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1 -StepName Step1 -Database msdb
```

Create a step in "Job1" with the name Step1 where the database will the "msdb" for multiple servers<br>

#####  Example:  4 

```powershell
PS C:\> New-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1, Job2, 'Job Three' -StepName Step1 -Database msdb
```

Create a step in "Job1" with the name Step1 where the database will the "msdb" for multiple servers for multiple jobs<br>

#####  Example:  5 

```powershell
PS C:\> sql1, sql2, sql3 | New-DbaAgentJobStep -Job Job1 -StepName Step1 -Database msdb
```

Create a step in "Job1" with the name Step1 where the database will the "msdb" for multiple servers using pipeline<br>

#####  Example:  6 

```powershell
PS C:\> New-DbaAgentJobStep -SqlInstance sq1 -Job Job1 -StepName StepA -Database msdb -StepId 2 -Insert
```

Assuming Job1 already has steps Step1 and Step2, will create a new step Step A and set the step order as Step1, StepA, Step2<br>
Internal StepIds will be updated, and any specific OnSuccess/OnFailure step references will also be updated<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Job

Specifies the SQL Server Agent job name where the new step will be added. Accepts job names or job objects from Get-DbaAgentJob.  
Use this to target specific jobs when building multi-step automation workflows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -StepName

Defines a descriptive name for the job step that appears in SQL Server Agent and job history logs.  
Choose meaningful names that clearly identify the step's purpose for easier troubleshooting and maintenance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
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

##### -StepId

Sets the execution order position for this step within the job sequence. Step numbers start at 1 and must be sequential.  
Use this to control step execution order or when inserting steps between existing ones. If not specified, adds the step at the end.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Subsystem

Determines what execution engine SQL Server Agent uses to run the step command. Defaults to 'TransactSql' for T-SQL scripts.  
Use 'PowerShell' for PowerShell scripts, 'CmdExec' for operating system commands, 'Ssis' for SSIS packages, or replication subsystems for replication tasks.  
Analysis subsystems require SQL Server Analysis Services and the SubSystemServer parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | TransactSql |
| Accepted Values | ActiveScripting,AnalysisCommand,AnalysisQuery,CmdExec,Distribution,LogReader,Merge,PowerShell,QueueReader,Snapshot,Ssis,TransactSql |

##### -SubsystemServer

Specifies the Analysis Services server name when using AnalysisScripting, AnalysisCommand, or AnalysisQuery subsystems.  
Required for Analysis Services job steps to connect to the appropriate SSAS instance for cube processing or MDX queries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Command

Contains the actual code or command that the job step will execute, such as T-SQL scripts, PowerShell code, or operating system commands.  
The command syntax must match the specified subsystem type. For T-SQL steps, include complete SQL statements or stored procedure calls.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CmdExecSuccessCode

Defines the exit code that indicates successful completion for CmdExec subsystem steps. Most applications return 0 for success.  
Use this when running batch files or executables that return non-zero success codes to prevent the job from failing incorrectly.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OnSuccessAction

Controls job flow when this step completes successfully. Default 'QuitWithSuccess' ends the job with success status.  
Use 'GoToNextStep' for sequential execution, 'GoToStep' to jump to a specific step, or 'QuitWithFailure' for conditional failure handling.  
Essential for building complex workflows with branching logic based on step outcomes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | QuitWithSuccess |
| Accepted Values | QuitWithSuccess,QuitWithFailure,GoToNextStep,GoToStep |

##### -OnSuccessStepId

Specifies which step to execute next when OnSuccessAction is set to 'GoToStep' and this step succeeds.  
Use this to create conditional branching in job workflows, such as skipping cleanup steps when data processing completes successfully.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OnFailAction

Determines job behavior when this step fails. Default 'QuitWithFailure' stops the job and reports failure.  
Use 'GoToNextStep' to continue despite failures, 'GoToStep' for error handling routines, or 'QuitWithSuccess' when failure is acceptable.  
Critical for implementing error handling and recovery procedures in automated processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | QuitWithFailure |
| Accepted Values | QuitWithSuccess,QuitWithFailure,GoToNextStep,GoToStep |

##### -OnFailStepId

Identifies the step to execute when OnFailAction is 'GoToStep' and this step fails.  
Use this to implement error handling workflows, such as sending notifications or running cleanup procedures when critical steps fail.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Database

Specifies the database context for TransactSql subsystem steps. Defaults to 'master' if not specified.  
Set this to the appropriate database where your T-SQL commands should execute, as it determines schema resolution and object access.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseUser

Sets the database user context for executing T-SQL steps, overriding the SQL Server Agent service account permissions.  
Use this when the step needs specific database-level permissions that differ from the Agent service account's access rights.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RetryAttempts

Sets how many times SQL Server Agent will retry this step if it fails before considering it permanently failed.  
Use this for steps that might fail due to temporary issues like network connectivity or resource contention. Defaults to 0 (no retries).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RetryInterval

Defines the wait time in minutes between retry attempts when a step fails. Defaults to 0 (immediate retry).  
Set appropriate intervals to allow temporary issues to resolve, such as waiting for locked resources or network recovery.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OutputFileName

Specifies a file path where the step's output will be written for logging and troubleshooting purposes.  
Use this to capture command results, error messages, or progress information for later analysis when jobs fail or need auditing.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Insert

Inserts the new step at the specified StepId position, automatically renumbering subsequent steps and updating their references.  
Use this when adding steps to existing jobs without breaking the workflow sequence, such as inserting validation steps between existing processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Flag

Controls how job step output and history are logged and stored. Multiple flags can be specified for comprehensive logging.  
Use 'AppendAllCmdExecOutputToJobHistory' to capture command output in job history, 'AppendToLogFile' for SQL Server error log entries, or 'AppendToTableLog' for database table logging.  
Essential for troubleshooting and auditing job execution, especially for steps that generate important output or error information.  
Flag                                    Description  
----------------------------------------------------------------------------  
AppendAllCmdExecOutputToJobHistory      Job history, including command output, is appended to the job history file.  
AppendToJobHistory                      Job history is appended to the job history file.  
AppendToLogFile                         Job history is appended to the SQL Server log file.  
AppendToTableLog                        Job history is appended to a log table.  
LogToTableWithOverwrite                 Job history is written to a log table, overwriting previous contents.  
None                                    Job history is not appended to a file.  
ProvideStopProcessEvent                 Job processing is stopped.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AppendAllCmdExecOutputToJobHistory,AppendToJobHistory,AppendToLogFile,AppendToTableLog,LogToTableWithOverwrite,None,ProvideStopProcessEvent |

##### -ProxyName

Specifies a SQL Server Agent proxy account to use for step execution instead of the Agent service account.  
Use this when steps need specific Windows credentials for file system access, network resources, or applications that require different security contexts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses validation checks and overwrites existing steps with the same name or ID.  
Use this when recreating steps during development or when you need to replace existing steps without manual deletion first.

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
