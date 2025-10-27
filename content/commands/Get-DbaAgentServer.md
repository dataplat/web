---
title: "Get-DbaAgentServer"
slug: "Get-DbaAgentServer"
date: 2024-01-01
layout: "single"
author: "Claudio Silva (@claudioessilva), claudioessilva.eu"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves SQL Server Agent service configuration and status information"
tags:
  - "Job"
  - "Agent"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentServer.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaAgentServer"
draft: false
---

# Get-DbaAgentServer

| Property | Value |
| --- | --- |
| **Author** | Claudio Silva (@claudioessilva), claudioessilva.eu |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaAgentServer](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaAgentServer.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaAgentServer](https://dataplat.github.io/boh#Get-DbaAgentServer).

## Synopsis

Retrieves SQL Server Agent service configuration and status information

## Description

Returns detailed SQL Server Agent configuration including service state, logging levels, job history settings, and service accounts. This is essential for auditing Agent configurations across multiple instances, troubleshooting job failures, and documenting environment settings for compliance or migration planning. The function provides a standardized view of Agent properties that would otherwise require connecting to each instance individually through SSMS.

## Syntax

```powershell
Get-DbaAgentServer
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
PS C:\> Get-DbaAgentServer -SqlInstance localhost
```

Returns SQL Agent Server on the local default SQL Server instance<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaAgentServer -SqlInstance localhost, sql2016
```

Returns SQL Agent Servers for the localhost and sql2016 SQL Server instances<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

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
