---
title: "Set-DbaAgentServer"
slug: "Set-DbaAgentServer"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioessilva.com"
availability: "Windows, Linux, macOS"
synopsis: "Configures SQL Server Agent service properties and operational settings"
tags:
  - "Agent"
  - "Server"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaAgentServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbaAgentServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbaAgentServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Claudio Silva (@claudioessilva), claudioessilva.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Configures SQL Server Agent service properties and operational settings

## Description

Modifies SQL Server Agent configuration settings including logging levels, mail profiles, CPU monitoring thresholds, job history retention, and service restart behaviors. Use this to standardize agent configurations across multiple instances, set up proper alerting and monitoring thresholds, or configure job history retention policies to prevent MSDB bloat.

## Syntax

```powershell
Set-DbaAgentServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-InputObject] <JobServer[]>]
    [[-AgentLogLevel] <Object>]
    [[-AgentMailType] <Object>]
    [[-AgentShutdownWaitTime] <Int32>]
    [[-DatabaseMailProfile] <String>]
    [[-ErrorLogFile] <String>]
    [[-IdleCpuDuration] <Int32>]
    [[-IdleCpuPercentage] <Int32>]
    [[-CpuPolling] <String>]
    [[-LocalHostAlias] <String>]
    [[-LoginTimeout] <Int32>]
    [[-MaximumHistoryRows] <Int32>]
    [[-MaximumJobHistoryRows] <Int32>]
    [[-NetSendRecipient] <String>]
    [[-ReplaceAlertTokens] <String>]
    [[-SaveInSentFolder] <String>]
    [[-SqlAgentAutoStart] <String>]
    [[-SqlAgentMailProfile] <String>]
    [[-SqlAgentRestart] <String>]
    [[-SqlServerRestart] <String>]
    [[-WriteOemErrorLog] <String>]
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
PS C:\> Set-DbaAgentServer -SqlInstance sql1 -MaximumHistoryRows 10000 -MaximumJobHistoryRows 100
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1 -MaximumHistoryRows 10000 -MaximumJobHistoryRows 100" }

Changes the job history retention to 10000 rows with an maximum of 100 rows per job.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaAgentServer -SqlInstance sql1 -CpuPolling Enabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1 -CpuPolling Enabled" }

Enable the CPU Polling configurations.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaAgentServer -SqlInstance sql1, sql2, sql3 -AgentLogLevel 'Errors, Warnings'
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1, sql2, sql3 -AgentLogLevel 'Errors, Warnings'" }

Set the agent log level to Errors and Warnings on multiple servers.<br>

#####  Example:  4 

```powershell
PS C:\> Set-DbaAgentServer -SqlInstance sql1 -CpuPolling Disabled
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1 -CpuPolling Disabled" }

Disable the CPU Polling configurations.<br>

#####  Example:  5 

```powershell
PS C:\> Set-DbaAgentServer -SqlInstance sql1 -MaximumJobHistoryRows 1000 -MaximumHistoryRows 10000
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1 -MaximumJobHistoryRows 1000 -MaximumHistoryRows 10000" }

Set the max history limitations. This is the equivalent to calling:  EXEC msdb.dbo.sp_set_sqlagent_properties @jobhistory_max_rows=10000, @jobhistory_max_rows_per_job=1000<br>

#####  Example:  6 

```powershell
PS C:\> Set-DbaAgentServer -SqlInstance sql1 -MaximumJobHistoryRows 0 -MaximumHistoryRows -1
```
{: data-copyable="true" data-clean-code="Set-DbaAgentServer -SqlInstance sql1 -MaximumJobHistoryRows 0 -MaximumHistoryRows -1" }

Disable the max history limitations. This is the equivalent to calling:  EXEC msdb.dbo.sp_set_sqlagent_properties @jobhistory_max_rows=-1, @jobhistory_max_rows_per_job=0<br>

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

##### -InputObject

Accepts SQL Server Agent JobServer objects from Get-DbaAgentServer for pipeline operations.  
Use this when you need to configure multiple agent servers from a filtered list or modify settings on specific instances already retrieved.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AgentLogLevel

Controls the verbosity of SQL Server Agent logging in the agent error log.  
Use 'Errors' for production environments to minimize log size, 'Errors, Warnings' for standard monitoring, or 'All' when troubleshooting agent job failures.  
Higher logging levels help diagnose job execution issues but increase log file growth.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 1,Errors,2,Warnings,3,Errors, Warnings,4,Informational,5,Errors, Informational,6,Warnings, Informational,7,All |

##### -AgentMailType

Specifies whether SQL Server Agent uses legacy SQL Agent Mail or the newer Database Mail for notifications.  
Use 'DatabaseMail' for modern installations as SQL Agent Mail is deprecated and requires MAPI configuration.  
Database Mail provides better security, reliability, and doesn't require Outlook or Exchange MAPI on the server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | 0,SqlAgentMail,1,DatabaseMail |

##### -AgentShutdownWaitTime

Sets how long (in seconds) SQL Server waits for SQL Server Agent to shut down during service restart.  
Increase this value if you have long-running jobs that need more time to complete gracefully during shutdown.  
Default is typically 15 seconds; values between 5-600 seconds are supported.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -DatabaseMailProfile

Specifies which Database Mail profile SQL Server Agent uses for sending job notifications and alerts.  
The profile must already exist in the instance's Database Mail configuration before setting this value.  
Use this to ensure agent notifications use the correct SMTP settings and sender address for your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ErrorLogFile

Sets the file path where SQL Server Agent writes its error log.  
Change this when you need agent logs stored in a specific location for centralized monitoring or compliance requirements.  
Ensure the SQL Server Agent service account has write permissions to the specified path.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IdleCpuDuration

Defines how long (in seconds) the CPU must remain below the idle threshold before SQL Server Agent considers the server idle.  
Use this with CpuPolling to schedule jobs only when the server isn't busy with other workloads.  
Values range from 20 seconds to 24 hours (86400 seconds); typical values are 600-1800 seconds for production servers.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -IdleCpuPercentage

Sets the CPU usage percentage threshold below which SQL Server Agent considers the server idle.  
Configure this to prevent resource-intensive maintenance jobs from running during peak usage periods.  
Values between 10-100 percent; commonly set to 10-25% for production servers to ensure adequate idle detection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -CpuPolling

Enables or disables CPU idle condition monitoring for job scheduling.  
Enable this to allow jobs with idle CPU conditions to run only when server CPU usage is low.  
Useful for scheduling maintenance tasks like index rebuilds or backups that should avoid peak usage periods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -LocalHostAlias

Specifies an alias that SQL Server Agent uses to refer to the local server in job steps and notifications.  
Set this when the server has multiple network names or when you want job notifications to reference a specific hostname.  
Commonly used in clustered environments or when the server is accessed by different DNS names.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LoginTimeout

Sets the timeout (in seconds) for SQL Server Agent connections to SQL Server instances.  
Increase this value if agent jobs frequently fail due to connection timeouts, especially in slow network environments.  
Values range from 5-45 seconds; default is typically 30 seconds.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumHistoryRows

Controls the total number of job history rows retained in MSDB before old entries are purged.  
Set this to prevent MSDB growth from excessive job history; typical values are 10000-100000 rows depending on job frequency.  
Use -1 to disable limits (not recommended for production) or work with MaximumJobHistoryRows to control per-job retention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaximumJobHistoryRows

Sets the maximum number of history rows retained per individual job.  
Prevents any single job from consuming too much history space; typical values are 100-1000 rows per job.  
Use 0 to disable per-job limits when MaximumHistoryRows is set to -1, or set both parameters to control overall history retention.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -NetSendRecipient

Specifies the network recipient for legacy net send notifications from SQL Server Agent.  
This feature is deprecated and rarely used in modern environments; Database Mail is the preferred notification method.  
Only configure this if you have legacy monitoring systems that still rely on net send messages.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ReplaceAlertTokens

Controls whether SQL Server Agent replaces tokens in alert notification messages with actual values.  
Enable this to include dynamic information like error details, job names, or server information in alert emails.  
Tokens like $(ESCAPE_SQUOTE(A-ERR)) get replaced with actual error text when notifications are sent.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -SaveInSentFolder

Controls whether copies of agent notification emails are saved to the Database Mail sent items.  
Enable this for audit trails and troubleshooting notification delivery issues.  
Disable to reduce Database Mail storage usage if you don't need to track sent notifications.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -SqlAgentAutoStart

Controls whether SQL Server Agent service starts automatically when SQL Server starts.  
Enable this on production servers to ensure scheduled jobs and monitoring continue after server restarts.  
Disable only in development environments where automatic job execution isn't desired.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -SqlAgentMailProfile

Specifies the legacy SQL Agent Mail profile for notifications (deprecated feature).  
Only used when AgentMailType is set to 'SqlAgentMail'; DatabaseMailProfile is preferred for modern installations.  
The profile must exist in the SQL Agent Mail configuration, which requires MAPI setup.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlAgentRestart

Controls whether SQL Server Agent automatically restarts if it stops unexpectedly.  
Enable this on production servers to ensure continuous job scheduling and monitoring after agent failures.  
The agent will attempt to restart itself if the service terminates abnormally.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -SqlServerRestart

Controls whether SQL Server Agent can restart the SQL Server service if it stops unexpectedly.  
Enable this in environments where automatic SQL Server recovery is desired, but use caution on production systems.  
This setting allows the agent to restart the database engine service automatically.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

##### -WriteOemErrorLog

Controls whether SQL Server Agent writes errors to the Windows Application Event Log.  
Enable this to integrate agent errors with centralized Windows event monitoring and alerting systems.  
Useful for environments that rely on Windows Event Log for monitoring and don't use SQL-specific monitoring tools.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled,Disabled |

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
