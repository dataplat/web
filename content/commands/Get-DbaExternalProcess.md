---
title: "Get-DbaExternalProcess"
slug: "Get-DbaExternalProcess"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves operating system processes spawned by SQL Server instances"
tags:
  - "Diagnostic"
  - "Process"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExternalProcess.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaExternalProcess"
draft: false
---

# Get-DbaExternalProcess

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaExternalProcess](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaExternalProcess.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaExternalProcess](https://dataplat.github.io/boh#Get-DbaExternalProcess).

## Synopsis

Retrieves operating system processes spawned by SQL Server instances

## Description

Identifies and returns all child processes created by SQL Server, such as those spawned by xp_cmdshell, BCP operations, SSIS packages, or other external utilities.  
  
This is particularly useful when troubleshooting sessions with External Wait Types, where SQL Server is waiting for an external process to complete. When sessions appear hung with wait types like WAITFOR_RESULTS or EXTERNAL_SCRIPT_NETWORK_IO, this command helps identify the specific external processes that may be causing the delay.  
  
The function queries WMI to find the SQL Server process (sqlservr.exe) and then locates all processes where SQL Server is the parent process, providing details about memory usage and resource consumption.  
  
https://web.archive.org/web/20201027122300/http://vickyharp.com/2013/12/killing-sessions-with-external-wait-types/

## Syntax

```powershell
Get-DbaExternalProcess
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaExternalProcess -ComputerName SERVER01, SERVER02
```

Gets OS processes created by SQL Server on SERVER01 and SERVER02<br>

### Required Parameters

##### -ComputerName

Specifies the SQL Server host computer(s) to check for external processes spawned by SQL Server.  
Use this when troubleshooting hung sessions or investigating resource usage from processes like xp_cmdshell, BCP, or SSIS operations.  
Accepts multiple computer names and SQL Server instance names with automatic computer resolution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Allows you to login to $ComputerName using alternative credentials.

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
