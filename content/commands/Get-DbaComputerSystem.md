---
title: "Get-DbaComputerSystem"
slug: "Get-DbaComputerSystem"
date: 2024-01-01
layout: "single"
author: "Shawn Melton (@wsmelton), wsmelton.github.io"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves comprehensive hardware and system information from Windows computers hosting SQL Server instances."
tags:
  - "Management"
  - "Computer"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerSystem.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaComputerSystem"
draft: false
---

# Get-DbaComputerSystem

| Property | Value |
| --- | --- |
| **Author** | Shawn Melton (@wsmelton), wsmelton.github.io |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaComputerSystem](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaComputerSystem.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaComputerSystem](https://dataplat.github.io/boh#Get-DbaComputerSystem).

## Synopsis

Retrieves comprehensive hardware and system information from Windows computers hosting SQL Server instances.

## Description

Collects detailed system specifications including processor details, memory configuration, domain membership, and hardware information from target computers. This function is essential for SQL Server capacity planning, pre-installation system verification, and troubleshooting performance issues by providing complete hardware inventory data.  
  
The function queries WMI classes (Win32_ComputerSystem and Win32_Processor) to gather CPU details, determines hyperthreading status, checks total physical memory, and identifies domain roles. It also detects pending reboots that could affect SQL Server operations and optionally retrieves AWS EC2 metadata for cloud-hosted instances.  
  
Use this command when documenting SQL Server environments, verifying system requirements before installations or upgrades, or investigating hardware-related performance bottlenecks.

## Syntax

```powershell
Get-DbaComputerSystem
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-IncludeAws]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaComputerSystem
```

Returns information about the local computer's computer system<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaComputerSystem -ComputerName sql2016
```

Returns information about the sql2016's computer system<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaComputerSystem -ComputerName sql2016 -IncludeAws
```

Returns information about the sql2016's computer system and includes additional properties around the EC2 instance.<br>

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) to collect system information from. Defaults to the local computer when not specified.  
Use this to inventory multiple SQL Server hosts at once or to gather system details from remote servers for capacity planning and troubleshooting.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Alternate credential object to use for accessing the target computer(s).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IncludeAws

Retrieves additional AWS EC2 metadata when the target computer is hosted on Amazon Web Services. Adds properties like AMI ID, instance type, availability zone, and IAM role information.  
Use this switch when documenting cloud-hosted SQL Server environments or when you need AWS-specific details for compliance or cost management purposes.

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


&nbsp;
