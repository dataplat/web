---
title: "Import-DbaSpConfigure"
slug: "Import-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies sp_configure settings between SQL Server instances or applies settings from a SQL file."
tags:
  - "SpConfig"
  - "Configure"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Import-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Import-DbaSpConfigure"
draft: false
---

# Import-DbaSpConfigure

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Import-DbaSpConfigure](https://github.com/dataplat/dbatools/blob/master/public/Import-DbaSpConfigure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Import-DbaSpConfigure](https://dataplat.github.io/boh#Import-DbaSpConfigure).

## Synopsis

Copies sp_configure settings between SQL Server instances or applies settings from a SQL file.

## Description

Copies all sp_configure settings from a source SQL Server instance to a destination instance, or applies sp_configure settings from a SQL file to an instance. This function handles advanced options visibility, validates server versions for compatibility, and executes the necessary RECONFIGURE statements. Essential for maintaining consistent configuration across environments during migrations, standardization projects, or when applying saved configuration templates.

## Syntax

```powershell
Import-DbaSpConfigure
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Import-DbaSpConfigure
    [-Source <DbaInstanceParameter>]
    [-Destination <DbaInstanceParameter>]
    [-SourceSqlCredential <PSCredential>]
    [-DestinationSqlCredential <PSCredential>]
    [-Force]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Import-DbaSpConfigure
    [-SqlInstance <DbaInstanceParameter>]
    [-Path <String>]
    [-SqlCredential <PSCredential>]
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
PS C:\> Import-DbaSpConfigure -Source sqlserver -Destination sqlcluster
```

Imports the sp_configure settings from the source server sqlserver and sets them on the sqlcluster server using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Import-DbaSpConfigure -Source sqlserver -Destination sqlcluster -Force
```

Imports the sp_configure settings from the source server sqlserver and sets them on the sqlcluster server using Windows Authentication. Will not do a version check between Source and Destination<br>

#####  Example:  3 

```powershell
PS C:\> Import-DbaSpConfigure -Source sqlserver -Destination sqlcluster -SourceSqlCredential $SourceSqlCredential -DestinationSqlCredential $DestinationSqlCredential
```

Imports the sp_configure settings from the source server sqlserver and sets them on the sqlcluster server using the SQL credentials stored in the variables $SourceSqlCredential and <br>
$DestinationSqlCredential<br>

#####  Example:  4 

```powershell
PS C:\> Import-DbaSpConfigure -SqlInstance sqlserver -Path .\spconfig.sql -SqlCredential $SqlCredential
```

Imports the sp_configure settings from the file .\spconfig.sql and sets them on the sqlserver server using the SQL credential stored in the variable $SqlCredential<br>

### Optional Parameters

##### -Source

Source SQL Server instance to copy sp_configure settings from. Requires sysadmin privileges to read configuration values.  
Use this when migrating settings between servers or standardizing configurations across your environment.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Destination

Target SQL Server instance where sp_configure settings will be applied. Requires sysadmin privileges to modify configuration.  
This server will have its configuration updated to match the source server's settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceSqlCredential

Credentials for connecting to the source SQL Server instance. Use when Windows authentication is not available.  
Accepts PowerShell credential objects created with Get-Credential.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Credentials for connecting to the destination SQL Server instance. Use when Windows authentication is not available.  
Accepts PowerShell credential objects created with Get-Credential.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlInstance

Specifies a SQL Server instance to set up sp_configure values on using a SQL file.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Path

Path to a SQL script file containing sp_configure commands to execute. The file should contain individual sp_configure statements.  
Use this parameter when applying saved configurations from Export-DbaSpConfigure or custom configuration scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Use this SQL credential if you are setting up sp_configure values from a SQL file.  
Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses the SQL Server version compatibility check between source and destination instances. By default, major versions must match.  
Use with caution as some configuration options may not be available or may behave differently across SQL Server versions.

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
