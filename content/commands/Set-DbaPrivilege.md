---
title: "Set-DbaPrivilege"
slug: "Set-DbaPrivilege"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDbaKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Grants essential Windows privileges to SQL Server service accounts for optimal performance and security."
tags:
  - "Privilege"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPrivilege.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaPrivilege"
draft: false
---

# Set-DbaPrivilege

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDbaKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaPrivilege](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaPrivilege.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaPrivilege](https://dataplat.github.io/boh#Set-DbaPrivilege).

## Synopsis

Grants essential Windows privileges to SQL Server service accounts for optimal performance and security.

## Description

Configures critical Windows privileges for SQL Server service accounts including Lock Pages in Memory (LPIM), Instant File Initialization (IFI), Logon as Batch, Logon as Service, and Generate Security Audits. These privileges are essential for SQL Server performance optimization and proper service operation, eliminating the need to manually configure them through Local Security Policy. The function automatically discovers SQL service accounts on target computers or allows you to specify custom accounts, then uses secedit to update the local security policy.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Set-DbaPrivilege
    [[-ComputerName] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [-Type] <String[]>
    [-EnableException]
    [[-User] <String>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbaPrivilege -ComputerName sqlserver2014a -Type LPIM,IFI
```

Adds the SQL Service account(s) on computer sqlserver2014a to the local privileges 'SeManageVolumePrivilege' and 'SeLockMemoryPrivilege'.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Set-DbaPrivilege -Type IFI
```

Adds the SQL Service account(s) on computers sql1, sql2 and sql3 to the local privilege 'SeManageVolumePrivilege'.<br>

### Required Parameters

##### -Type

Specifies which Windows privileges to grant to the SQL Server service accounts. Accepts one or more values: 'IFI' (Instant File Initialization), 'LPIM' (Lock Pages in Memory), 'BatchLogon' (Log on as   
a batch job), 'SecAudit' (Generate security audits), and 'ServiceLogon' (Log on as a service).  
These privileges are essential for SQL Server performance and functionality - IFI speeds up database file operations, LPIM prevents memory paging for better performance, and the logon rights ensure   
services can start properly.  
Multiple privileges can be specified together for comprehensive SQL Server optimization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |
| Accepted Values | IFI,LPIM,BatchLogon,SecAudit,ServiceLogon |

### Optional Parameters

##### -ComputerName

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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

##### -User

Specifies a custom user account to receive the privileges instead of automatically discovering SQL Server service accounts.  
Use this when you need to grant privileges to a specific account that will run SQL Server services, or when the automatic service account detection doesn't work in your environment.  
Accepts domain accounts (DOMAIN\User) or local accounts - ensure the account exists and will be used by SQL Server services.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
