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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Get-DbaAgentJobOutputFile</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentJobOutputFile.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Rob Sewell (sqldbawithabeard.com) , Simone Bizzotto (@niphlod)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Job 'The Agent Job'" }

This will return the configured paths to the output files for each of the job step of the The Agent Job Job<br>
on the SERVERNAME instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME" }

This will return the configured paths to the output files for each of the job step of all the Agent Jobs<br>
on the SERVERNAME instance<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME,SERVERNAME2 -Job 'The Agent Job'
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME,SERVERNAME2 -Job 'The Agent Job'" }

This will return the configured paths to the output files for each of the job step of the The Agent Job Job<br>
on the SERVERNAME instance and SERVERNAME2<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME  | Out-GridView
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME  | Out-GridView" }

This will return the configured paths to the output files for each of the job step of all the Agent Jobs<br>
on the SERVERNAME instance and Pipe them to Out-GridView<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Verbose
```
{: data-copyable="true" data-clean-code="Get-DbaAgentJobOutputFile -SqlInstance SERVERNAME -Verbose" }

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
