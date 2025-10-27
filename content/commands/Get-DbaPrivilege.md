---
title: "Get-DbaPrivilege"
slug: "Get-DbaPrivilege"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows security privileges critical for SQL Server performance from target computers."
tags:
  - "Privilege"
  - "OS"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPrivilege.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPrivilege"
draft: false
---

# Get-DbaPrivilege

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPrivilege](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPrivilege.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPrivilege](https://dataplat.github.io/boh#Get-DbaPrivilege).

## Synopsis

Retrieves Windows security privileges critical for SQL Server performance from target computers.

## Description

Audits five Windows privileges that directly impact SQL Server performance and functionality: Lock Pages in Memory, Instant File Initialization, Logon as Batch, Generate Security Audits, and Logon as a Service. These privileges are essential for SQL Server service accounts to achieve optimal performance and proper operation.  
  
Use this to verify that SQL Server service accounts have the necessary Windows privileges configured, troubleshoot performance issues related to missing privileges, or audit security configurations across your SQL Server environment. The function exports the local security policy using secedit and parses the results to show which users and groups hold these critical privileges.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaPrivilege
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaPrivilege -ComputerName sqlserver2014a
```

Gets the local privileges on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaPrivilege
```

Gets the local privileges on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaPrivilege -ComputerName sql1,sql2 | Out-GridView
```

Gets the local privileges on computers sql1 and sql2, and shows them in a grid view.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer names where you want to audit Windows privileges. Accepts multiple computer names for bulk privilege auditing.  
Use this to check privilege configurations on SQL Server host machines, especially when troubleshooting performance issues related to missing Lock Pages in Memory or Instant File Initialization   
rights.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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
