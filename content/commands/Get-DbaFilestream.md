---
title: "Get-DbaFilestream"
slug: "Get-DbaFilestream"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves FileStream configuration status at both the SQL Server service and instance levels."
tags:
  - "Filestream"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFilestream.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaFilestream"
draft: false
---

# Get-DbaFilestream

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaFilestream](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaFilestream.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaFilestream](https://dataplat.github.io/boh#Get-DbaFilestream).

## Synopsis

Retrieves FileStream configuration status at both the SQL Server service and instance levels.

## Description

Retrieves FileStream configuration status by checking both the SQL Server service configuration and the instance-level sp_configure settings. This function helps DBAs quickly identify FileStream configuration mismatches between service and instance levels, which are common causes of FileStream functionality issues. The function returns detailed access levels, share names, and indicates whether a restart is pending to apply configuration changes.

## Syntax

```powershell
Get-DbaFilestream
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaFilestream -SqlInstance server1\instance2
```

Will return the status of Filestream configuration for the service and instance server1\instance2<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFilestream -SqlInstance server1\instance2 -SqlCredential sqladmin
```

Prompts for the password to the SQL Login "sqladmin" then returns the status of Filestream configuration for the service and instance server1\instance2<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

##### -Credential

Login to the target Windows server using alternative credentials.

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
