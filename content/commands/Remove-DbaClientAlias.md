---
title: "Remove-DbaClientAlias"
slug: "Remove-DbaClientAlias"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes SQL Server client aliases from Windows registry on local or remote computers"
tags:
  - "SqlClient"
  - "Alias"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaClientAlias.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaClientAlias"
draft: false
---

# Remove-DbaClientAlias

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaClientAlias](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaClientAlias.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaClientAlias](https://dataplat.github.io/boh#Remove-DbaClientAlias).

## Synopsis

Removes SQL Server client aliases from Windows registry on local or remote computers

## Description

Removes SQL Server client aliases from the Windows registry by deleting entries from both 32-bit and 64-bit registry locations.  
Client aliases redirect SQL Server connection requests to different servers or instances, but outdated or incorrect aliases can cause connection failures.  
This function provides a programmatic way to clean up these aliases when the deprecated cliconfg.exe utility is not available or when managing multiple computers remotely.  
Commonly used when decommissioning servers, updating connection strings, or troubleshooting connectivity issues caused by stale alias configurations.

## Syntax

```powershell
Remove-DbaClientAlias
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-Alias] <String[]>
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
PS C:\> Remove-DbaClientAlias -ComputerName workstationX -Alias sqlps
```

Removes the sqlps SQL Client alias on workstationX<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaClientAlias | Remove-DbaClientAlias
```

Removes all SQL Server client aliases on the local computer<br>

### Required Parameters

##### -Alias

Specifies the SQL Server client alias name(s) to remove from both 32-bit and 64-bit registry locations.  
Use this to clean up outdated aliases that redirect connections to decommissioned servers or incorrect instances.  
Accepts multiple alias names for bulk cleanup operations.

| Property | Value |
| --- | --- |
| Alias | AliasName |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the target computer(s) where SQL Server client aliases will be removed from the Windows registry.  
Use this when you need to clean up aliases on remote workstations or application servers.  
Defaults to the local computer if not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Allows you to login to remote computers using alternative credentials

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

##### -WhatIf

If this switch is enabled, no actions are performed but informational messages will be displayed that explain what would happen if the command were to run.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

If this switch is enabled, you will be prompted for confirmation before executing any operations that change state.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
