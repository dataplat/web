---
title: "New-DbaSsisCatalog"
slug: "New-DbaSsisCatalog"
date: 2024-01-01
layout: "single"
author: "Stephen Bennett, https://sqlnotesfromtheunderground.wordpress.com/"
availability: "Windows, Linux, macOS"
synopsis: "Creates and enables the SSIS Catalog (SSISDB) database on SQL Server 2012+ instances"
tags:
  - "SSIS"
  - "SSISDB"
  - "Catalog"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaSsisCatalog.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaSsisCatalog"
draft: false
---

# New-DbaSsisCatalog

| Property | Value |
| --- | --- |
| **Author** | Stephen Bennett, https://sqlnotesfromtheunderground.wordpress.com/ |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaSsisCatalog](https://github.com/dataplat/dbatools/blob/master/public/New-DbaSsisCatalog.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaSsisCatalog](https://dataplat.github.io/boh#New-DbaSsisCatalog).

## Synopsis

Creates and enables the SSIS Catalog (SSISDB) database on SQL Server 2012+ instances

## Description

Creates the SSIS Catalog database (SSISDB) which is required before you can deploy, manage, or execute SSIS packages on the server. Installing SQL Server with SSIS doesn't automatically create this catalog - it's a separate post-installation step that requires CLR integration and a secure password for the master key. This function handles the entire setup process, including prerequisite validation, so you don't have to manually run SQL scripts or navigate through SQL Server Management Studio wizards.

## Syntax

```powershell
New-DbaSsisCatalog
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Credential] <PSCredential>]
    [[-SecurePassword] <SecureString>]
    [[-SsisCatalog] <String>]
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
PS C:\> $SecurePassword = Read-Host -AsSecureString -Prompt "Enter password"
PS C:\> New-DbaSsisCatalog -SqlInstance DEV01 -SecurePassword $SecurePassword
```

Creates the SSIS Catalog on server DEV01 with the specified password.<br>

#####  Example:  2 

```powershell
PS C:\> New-DbaSsisCatalog -SqlInstance sql2016 -Credential usernamedoesntmatter
```

Creates the SSIS Catalog on server DEV01 with the specified password in the credential prompt. As the example username suggets the username does not matter.<br>
This is simply an easier way to get a secure password.<br>

### Required Parameters

##### -SqlInstance

SQL Server you wish to run the function on.

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

##### -Credential

Provides an alternative way to supply the master password using a PSCredential object instead of SecurePassword. The username portion is ignored - only the password from the credential is used.  
This approach simplifies password input by allowing you to use Get-Credential, which presents a secure password prompt dialog.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurePassword

Specifies the master password that encrypts the SSIS catalog database master key. This password is required to access and decrypt sensitive data like connection strings and package parameters stored   
in SSISDB.  
Use Read-Host -AsSecureString or ConvertTo-SecureString to create this value securely without exposing the password in plain text.

| Property | Value |
| --- | --- |
| Alias | Password |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SsisCatalog

Specifies the name for the SSIS catalog database that will be created. Defaults to 'SSISDB' which is the Microsoft standard name.  
Only change this if your organization has specific naming requirements, as most SSIS tooling and documentation assumes the standard SSISDB name.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | SSISDB |

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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
