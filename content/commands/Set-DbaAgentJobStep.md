---
title: "Set-DbaAgentJobStep"
slug: "Set-DbaAgentJobStep"
date: 2024-01-01
layout: "single"
author: "Sander Stad (@sqlstad), sqlstad.nl"
availability: "Windows, Linux, macOS"
synopsis: "Modifies properties of existing SQL Agent job steps or creates new ones with Force parameter."
tags:
  - "Agent"
  - "Job"
  - "JobStep"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobStep.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentJobStep"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentJobStep</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentJobStep.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Sander Stad (@sqlstad), sqlstad.nl</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Modifies properties of existing SQL Agent job steps or creates new ones with Force parameter.

## Description

Modifies SQL Agent job step properties including commands, subsystems, retry logic, success/failure actions, and execution context. Updates existing job steps by name or creates new steps when using the -Force parameter, eliminating the need to manually edit job steps through SSMS.  
  
Common use cases include changing job step commands during deployments, updating database contexts when moving jobs between environments, modifying retry settings for intermittent failures, and adjusting success/failure flow logic. The function supports all major subsystems including T-SQL, PowerShell, SSIS, CmdExec, and Analysis Services commands.  
  
Note: ActiveScripting (ActiveX scripting) was discontinued in SQL Server 2016: https://docs.microsoft.com/en-us/sql/database-engine/discontinued-database-engine-functionality-in-sql-server

## Syntax

```powershell
Set-DbaAgentJobStep
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Job] <Object[]>]
    [[-StepName] <String>]
    [[-NewName] <String>]
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
    [[-Flag] <String[]>]
    [[-ProxyName] <String>]
    [[-InputObject] <Server[]>]
    [-EnableException]
    [-Force]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1 -NewName Step2
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1 -NewName Step2" }

Changes the name of the step in "Job1" with the name Step1 to Step2<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1 -Database msdb
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1 -StepName Step1 -Database msdb" }

Changes the database of the step in "Job1" with the name Step1 to msdb<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1, Job2 -StepName Step1 -Database msdb
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobStep -SqlInstance sql1 -Job Job1, Job2 -StepName Step1 -Database msdb" }

Changes job steps in multiple jobs with the name Step1 to msdb<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1, Job2 -StepName Step1 -Database msdb
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1, Job2 -StepName Step1 -Database msdb" }

Changes job steps in multiple jobs on multiple servers with the name Step1 to msdb<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1 -StepName Step1 -Database msdb
```
{: data-copyable="true" data-clean-code="Set-DbaAgentJobStep -SqlInstance sql1, sql2, sql3 -Job Job1 -StepName Step1 -Database msdb" }

Changes the database of the step in "Job1" with the name Step1 to msdb for multiple servers<br>

#####  Example:  6 

```powershell
PS C:\> sql1, sql2, sql3 | Set-DbaAgentJobStep -Job Job1 -StepName Step1 -Database msdb
```
{: data-copyable="true" data-clean-code="sql1, sql2, sql3 | Set-DbaAgentJobStep -Job Job1 -StepName Step1 -Database msdb" }

Changes the database of the step in "Job1" with the name Step1 to msdb for multiple servers using pipeline<br>

#####  Example:  7 

```powershell
PS C:\> $jobStep = @{
```
{: data-copyable="true" data-clean-code="$jobStep = @{" }

SqlInstance        = sqldev01<br>
        Job                = dbatools1<br>
        StepName           = "Step 2"<br>
        Subsystem          = "CmdExec"<br>
        Command            = "enter command text here"<br>
        CmdExecSuccessCode = 0<br>
        OnSuccessAction    = "GoToStep"<br>
        OnSuccessStepId    = 1<br>
        OnFailAction       = "GoToStep"<br>
        OnFailStepId       = 1<br>
        Database           = TestDB<br>
        RetryAttempts      = 2<br>
        RetryInterval      = 5<br>
        OutputFileName     = "logCmdExec.txt"<br>
        Flag               = [Microsoft.SqlServer.Management.Smo.Agent.JobStepFlags]::AppendAllCmdExecOutputToJobHistory<br>
        ProxyName          = "dbatoolsci_proxy_1"<br>
        Force              = $true<br>
    }<br>

```powershell
PS C:\> $newJobStep = Set-DbaAgentJobStep @jobStep
```
{: data-copyable="true" data-clean-code="$newJobStep = Set-DbaAgentJobStep @jobStep" }

Updates or creates a new job step named Step 2 in the dbatools1 job on the sqldev01 instance. The subsystem is set to CmdExec and uses a proxy.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. You must have sysadmin access and server version must be SQL Server version 2000 or greater.

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

##### -Job

The name of the job or the job object itself.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -StepName

The name of the step.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -NewName

The new name for the step in case it needs to be renamed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Subsystem

The subsystem used by the SQL Server Agent service to execute command.  
Allowed values 'ActiveScripting','AnalysisCommand','AnalysisQuery','CmdExec','Distribution','LogReader','Merge','PowerShell','QueueReader','Snapshot','Ssis','TransactSql'

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ActiveScripting,AnalysisCommand,AnalysisQuery,CmdExec,Distribution,LogReader,Merge,PowerShell,QueueReader,Snapshot,Ssis,TransactSql |

##### -SubsystemServer

The subsystems AnalysisScripting, AnalysisCommand, AnalysisQuery require a server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Command

The commands to be executed by the SQLServerAgent service through the subsystem.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -CmdExecSuccessCode

The value returned by a CmdExec subsystem command to indicate that command executed successfully.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OnSuccessAction

The action to perform if the step succeeds.  
Allowed values  "QuitWithSuccess" (default), "QuitWithFailure", "GoToNextStep", "GoToStep".  
The text value van either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | QuitWithSuccess,QuitWithFailure,GoToNextStep,GoToStep |

##### -OnSuccessStepId

The ID of the step in this job to execute if the step succeeds and OnSuccessAction is "GoToNextStep".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OnFailAction

The action to perform if the step fails.  
Allowed values  "QuitWithFailure" (default), "QuitWithSuccess", "GoToNextStep", "GoToStep".  
The text value van either be lowercase, uppercase or something in between as long as the text is correct.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | QuitWithSuccess,QuitWithFailure,GoToNextStep,GoToStep |

##### -OnFailStepId

The ID of the step in this job to execute if the step fails and OnFailAction is "GoToNextStep".

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Database

The name of the database in which to execute a Transact-SQL step.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DatabaseUser

The name of the user account to use when executing a Transact-SQL step.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -RetryAttempts

The number of retry attempts to use if this step fails.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -RetryInterval

The amount of time in minutes between retry attempts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -OutputFileName

The name of the file in which the output of this step is saved.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Flag

Sets the flag(s) for the job step.  
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

The name of the proxy that the job step runs as.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Allows pipeline input from Connect-DbaInstance.

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

##### -Force

The force parameter will ignore some errors in the parameters and assume defaults.

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
