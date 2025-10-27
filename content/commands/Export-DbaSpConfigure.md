---
title: "Export-DbaSpConfigure"
slug: "Export-DbaSpConfigure"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Generates SQL script containing all sp_configure settings for SQL Server instance configuration replication and documentation."
tags:
  - "SpConfig"
  - "Configure"
  - "Configuration"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSpConfigure.ps1"
bohUrl: "https://dataplat.github.io/boh#Export-DbaSpConfigure"
draft: false
---

# Export-DbaSpConfigure

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Export-DbaSpConfigure](https://github.com/dataplat/dbatools/blob/master/public/Export-DbaSpConfigure.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Export-DbaSpConfigure](https://dataplat.github.io/boh#Export-DbaSpConfigure).

## Synopsis

Generates SQL script containing all sp_configure settings for SQL Server instance configuration replication and documentation.

## Description

Creates a complete SQL script file with EXEC sp_configure statements for all server configuration options, including advanced settings. This script can be executed on another SQL Server instance to replicate the exact same configuration settings, making it invaluable for environment standardization, disaster recovery preparation, or compliance documentation. The function temporarily enables 'show advanced options' if needed to capture all available settings, then restores the original setting.

## Syntax

```powershell
Export-DbaSpConfigure
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Path] <String>]
    [[-FilePath] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver
```

Exports the SPConfigure settings on sourceserver. As no Path was defined outputs to My Documents folder with default name format of Servername-MMDDYYYYhhmmss-sp_configure.sql<br>

#####  Example:  2 

```powershell
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver -Path C:\temp
```

Exports the SPConfigure settings on sourceserver to the directory C:\temp using the default name format<br>

#####  Example:  3 

```powershell
PS C:\> $cred = Get-Credential sqladmin
PS C:\> Export-DbaSpConfigure -SqlInstance sourceserver -SqlCredential $cred -Path C:\temp\sp_configure.sql
```

Exports the SPConfigure settings on sourceserver to the file C:\temp\sp_configure.sql. Uses SQL Authentication to connect. Will require SysAdmin rights if needs to set 'show advanced options'<br>

#####  Example:  4 

```powershell
PS C:\> 'Server1', 'Server2' | Export-DbaSpConfigure -Path C:\temp\configure.sql
```

Exports the SPConfigure settings for Server1 and Server2 using pipeline. As more than 1 Server adds prefix of Servername and date to the file name and saves to file like  <br>
C:\temp\Servername-MMDDYYYYhhmmss-configure.sql<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input.  
You must have sysadmin access if needs to set 'show advanced options' to 1 and server version must be SQL Server version 2005 or higher.

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

##### -Path

Specifies the directory where the sp_configure script files will be exported. Defaults to the configured DbatoolsExport path.  
Use this when you need to organize configuration scripts in a specific location for documentation or deployment procedures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'Path.DbatoolsExport') |

##### -FilePath

Specifies the complete file path including filename for the exported sp_configure script. Overrides the Path parameter when specified.  
Use this when you need precise control over the output filename, especially for automated deployment scripts or standardized naming conventions.

| Property | Value |
| --- | --- |
| Alias | OutFile,FileName |
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
