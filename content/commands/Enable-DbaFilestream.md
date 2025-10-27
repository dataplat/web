---
title: "Enable-DbaFilestream"
slug: "Enable-DbaFilestream"
date: 2024-01-01
layout: "single"
author: "Stuart Moore (@napalmgram) | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Configures FILESTREAM feature at both instance and server levels on SQL Server"
tags:
  - "Filestream"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaFilestream.ps1"
bohUrl: "https://dataplat.github.io/boh#Enable-DbaFilestream"
draft: false
---

# Enable-DbaFilestream

| Property | Value |
| --- | --- |
| **Author** | Stuart Moore (@napalmgram) , Chrissy LeMaire (@cl) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Enable-DbaFilestream](https://github.com/dataplat/dbatools/blob/master/public/Enable-DbaFilestream.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Enable-DbaFilestream](https://dataplat.github.io/boh#Enable-DbaFilestream).

## Synopsis

Configures FILESTREAM feature at both instance and server levels on SQL Server

## Description

Configures SQL Server's FILESTREAM feature by setting the FilestreamAccessLevel at the instance level and enabling the Windows service component at the server level. The function supports three access levels: T-SQL only, T-SQL with I/O streaming, or T-SQL with I/O streaming and remote client access. FILESTREAM allows storing large binary data like documents, images, and videos directly on the file system while maintaining transactional consistency with the database. SQL Server requires a restart after enabling FILESTREAM, and the function will prompt for confirmation unless the -Force parameter is used.

## Syntax

```powershell
Enable-DbaFilestream
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-FileStreamLevel] <String>]
    [[-ShareName] <String>]
    [-Force]
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
PS C:\> Enable-DbaFilestream -SqlInstance server1\instance2 -FileStreamLevel TSql
PS C:\> Enable-DbaFilestream -SqlInstance server1\instance2 -FileStreamLevel 1
```

These commands are functionally equivalent, both will set Filestream level on server1\instance2 to T-Sql Only<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaFilestream -SqlInstance server1\instance2, server5\instance5, prod\hr | Where-Object InstanceAccessLevel -eq 0 | Enable-DbaFilestream -FileStreamLevel TSqlIoStreamingRemoteClient -Force
```

Using this pipeline you can scan a range of SQL instances and enable filestream on only those on which it's disabled.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByPropertyName) |
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
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -Credential

Login to the target server using alternative credentials.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -FileStreamLevel

Specifies the access level for FILESTREAM functionality on the SQL Server instance. Controls how applications can access FILESTREAM data stored on the file system.  
Use level 1 (TSql) for basic database operations, level 2 (TSqlIoStreaming) when applications need direct file system access, or level 3 (TSqlIoStreamingRemoteClient) for remote client access   
scenarios.  
Accepts numeric values (1, 2, 3) or string equivalents (TSql, TSqlIoStreaming, TSqlIoStreamingRemoteClient). Defaults to level 1.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1 |
| Accepted Values | TSql,TSqlIoStreaming,TSqlIoStreamingRemoteClient,1,2,3 |

##### -ShareName

Specifies the Windows file share name used by remote clients to access FILESTREAM data over the network. Only applies when FileStreamLevel is set to 2 or 3.  
Use this when you need to customize the share name for organizational standards or security requirements. If not specified, SQL Server uses the default instance name as the share name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Automatically restarts the SQL Server service after enabling FILESTREAM without prompting for confirmation. Required for FILESTREAM changes to take effect immediately.  
Use with caution in production environments as it will cause brief service interruption. Without this parameter, you must manually restart SQL Server for changes to apply.

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

##### -WhatIf

Shows what would happen if the command runs. The command is not run unless Force is specified.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before running the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
