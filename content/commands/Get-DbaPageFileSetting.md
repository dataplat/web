---
title: "Get-DbaPageFileSetting"
slug: "Get-DbaPageFileSetting"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows page file configuration from SQL Server host computers for performance analysis."
tags:
  - "Management"
  - "OS"
  - "PageFile"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPageFileSetting.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaPageFileSetting"
draft: false
---

# Get-DbaPageFileSetting

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaPageFileSetting](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaPageFileSetting.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaPageFileSetting](https://dataplat.github.io/boh#Get-DbaPageFileSetting).

## Synopsis

Retrieves Windows page file configuration from SQL Server host computers for performance analysis.

## Description

This command uses CIM to retrieve detailed Windows page file configuration from SQL Server host computers. Page file settings directly impact SQL Server performance during memory pressure scenarios, making this essential for capacity planning and troubleshooting performance issues.  
  
The function returns comprehensive details including current usage, peak usage, initial and maximum sizes, and whether page files are automatically managed by Windows. This information helps DBAs identify potential memory bottlenecks and validate that page file configurations align with SQL Server best practices.  
  
Note that this may require local administrator privileges for the relevant computers.

## Syntax

```powershell
Get-DbaPageFileSetting
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
PS C:\> Get-DbaPageFileSetting -ComputerName ServerA,ServerB
```

Returns a custom object displaying ComputerName, AutoPageFile, FileName, Status, LastModified, LastAccessed, AllocatedBaseSize, InitialSize, MaximumSize, PeakUsage, CurrentUsage  for ServerA and <br>
ServerB<br>

#####  Example:  2 

```powershell
PS C:\> 'ServerA' | Get-DbaPageFileSetting
```

Returns a custom object displaying ComputerName, AutoPageFile, FileName, Status, LastModified, LastAccessed, AllocatedBaseSize, InitialSize, MaximumSize, PeakUsage, CurrentUsage  for ServerA<br>

### Optional Parameters

##### -ComputerName

Specifies the target SQL Server host computers to retrieve page file settings from. Accepts computer names, IP addresses, or SQL Server instance names.  
Use this to analyze page file configurations across your SQL Server infrastructure for capacity planning and performance troubleshooting.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue, ByPropertyName) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the Computer as a different user

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
