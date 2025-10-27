---
title: "Copy-DbaSpConfigure"
slug: "Copy-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server configuration settings (sp_configure values) from source to destination instances."
tags:
  - "Migration"
  - "Configure"
  - "SpConfigure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaSpConfigure"
draft: false
---

# Copy-DbaSpConfigure

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaSpConfigure](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaSpConfigure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaSpConfigure](https://dataplat.github.io/boh#Copy-DbaSpConfigure).

## Synopsis

Copies SQL Server configuration settings (sp_configure values) from source to destination instances.

## Description

This function retrieves all sp_configure settings from the source SQL Server and applies them to one or more destination instances, ensuring consistent configuration across your environment. Only settings that differ between source and destination are updated, making it safe for standardizing existing servers. The function automatically handles settings that require a restart and provides detailed reporting of which configurations were changed, skipped, or failed. Use this when building new servers to match production standards, migrating instances, or ensuring consistent configuration across development and testing environments.

## Syntax

```powershell
Copy-DbaSpConfigure
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-ConfigName] <Object[]>]
    [[-ExcludeConfigName] <Object[]>]
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
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster
```

Copies all sp_configure settings from sqlserver2014a to sqlcluster<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ConfigName DefaultBackupCompression, IsSqlClrEnabled -SourceSqlCredential $cred
```

Copies the values for IsSqlClrEnabled and DefaultBackupCompression from sqlserver2014a to sqlcluster using SQL credentials to authenticate to sqlserver2014a and Windows credentials to authenticate to <br>
sqlcluster.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -ExcludeConfigName DefaultBackupCompression, IsSqlClrEnabled
```

Copies all configs except for IsSqlClrEnabled and DefaultBackupCompression, from sqlserver2014a to sqlcluster.<br>

#####  Example:  4 

```powershell
PS C:\> Copy-DbaSpConfigure -Source sqlserver2014a -Destination sqlcluster -WhatIf
```

Shows what would happen if the command were executed.<br>

### Required Parameters

##### -Source

The source SQL Server instance from which sp_configure settings will be copied. Must have sysadmin access to read configuration values.  
Use this as your template server when standardizing configurations across multiple instances or when setting up new servers to match production standards.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

One or more destination SQL Server instances where sp_configure settings will be applied. Must have sysadmin access to modify configuration values.  
Accepts multiple instances for bulk configuration updates across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance. Accepts PowerShell credentials (Get-Credential).  
Use this when the source server requires different authentication than your current Windows session, such as SQL Server authentication or domain service accounts.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instances. Accepts PowerShell credentials (Get-Credential).  
Use this when destination servers require different authentication than your current Windows session, such as SQL Server authentication or domain service accounts.  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ConfigName

Specifies which sp_configure settings to copy from source to destination. Accepts one or more configuration names such as 'max server memory (MB)' or 'backup compression default'.  
Use this when you need to update only specific settings rather than copying all configurations, particularly useful for targeted changes like memory settings or backup options.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeConfigName

Specifies which sp_configure settings to skip during the copy operation. Accepts one or more configuration names to exclude from processing.  
Use this when copying most settings but need to preserve specific destination values, such as excluding 'max server memory (MB)' when servers have different hardware specifications.

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
