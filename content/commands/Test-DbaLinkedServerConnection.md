---
title: "Test-DbaLinkedServerConnection"
slug: "Test-DbaLinkedServerConnection"
date: 2024-01-01
layout: "single"
author: "Thomas LaRock, thomaslarock.com"
availability: "Windows, Linux, macOS"
synopsis: "Tests connectivity to all linked servers on specified SQL Server instances"
tags:
  - "LinkedServer"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLinkedServerConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaLinkedServerConnection"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaLinkedServerConnection</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaLinkedServerConnection.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Thomas LaRock, thomaslarock.com</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Tests connectivity to all linked servers on specified SQL Server instances

## Description

Validates that linked servers are properly configured and accessible by attempting to establish connections to each one. This function iterates through all linked servers on the target instances and uses SQL Server's built-in TestConnection() method to verify connectivity. Returns detailed results including success/failure status and specific error messages for troubleshooting connection issues. Essential for validating linked server configurations after setup, during maintenance windows, or when diagnosing cross-server query failures.

## Syntax

```powershell
Test-DbaLinkedServerConnection
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance DEV01
```
{: data-copyable="true" data-clean-code="Test-DbaLinkedServerConnection -SqlInstance DEV01" }

Test all Linked Servers for the SQL Server instance DEV01<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance sql2016 | Out-File C:\temp\results.txt
```
{: data-copyable="true" data-clean-code="Test-DbaLinkedServerConnection -SqlInstance sql2016 | Out-File C:\temp\results.txt" }

Test all Linked Servers for the SQL Server instance sql2016 and output results to file<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaLinkedServerConnection -SqlInstance sql2016, sql2014, sql2012
```
{: data-copyable="true" data-clean-code="Test-DbaLinkedServerConnection -SqlInstance sql2016, sql2014, sql2012" }

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012<br>

#####  Example:  4 

```powershell
PS C:\> $servers = "sql2016","sql2014","sql2012"
PS C:\> $servers | Test-DbaLinkedServerConnection -SqlCredential sqladmin
```
{: data-copyable="true" data-clean-code="$servers = &quot;sql2016&quot;,&quot;sql2014&quot;,&quot;sql2012&quot;
$servers | Test-DbaLinkedServerConnection -SqlCredential sqladmin" }

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012 using SQL login credentials<br>

#####  Example:  5 

```powershell
PS C:\> $servers = "sql2016","sql2014","sql2012"
PS C:\> $servers | Get-DbaLinkedServer | Test-DbaLinkedServerConnection
```
{: data-copyable="true" data-clean-code="$servers = &quot;sql2016&quot;,&quot;sql2014&quot;,&quot;sql2012&quot;
$servers | Get-DbaLinkedServer | Test-DbaLinkedServerConnection" }

Test all Linked Servers for the SQL Server instances sql2016, sql2014 and sql2012<br>

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
