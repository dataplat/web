---
title: "Update-DbaServiceAccount"
slug: "Update-DbaServiceAccount"
date: 2024-01-01
layout: "single"
author: "Kirill Kravtsov (@nvarscar)"
availability: "Windows, Linux, macOS"
synopsis: "Changes the service account or password for SQL Server Engine and Agent services."
tags:
  - "Service"
  - "SqlServer"
  - "Instance"
  - "Connect"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Update-DbaServiceAccount.ps1"
bohUrl: "https://dataplat.github.io/boh#Update-DbaServiceAccount"
draft: false
---

# Update-DbaServiceAccount

| Property | Value |
| --- | --- |
| **Author** | Kirill Kravtsov (@nvarscar) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Update-DbaServiceAccount](https://github.com/dataplat/dbatools/blob/master/public/Update-DbaServiceAccount.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Update-DbaServiceAccount](https://dataplat.github.io/boh#Update-DbaServiceAccount).

## Synopsis

Changes the service account or password for SQL Server Engine and Agent services.

## Description

Updates the service account credentials or changes just the password for SQL Server Engine and Agent services. When changing the service account, the affected service will be automatically restarted to apply the changes. Password-only updates don't require a restart unless you want the changes to take effect immediately.  
  
This function handles the complexities of SQL Server service management, including removing and reapplying network certificates during account changes to prevent SSL connection issues. It supports changing from local system accounts to domain accounts, rotating passwords for compliance, and updating multiple services across multiple instances.  
  
Supports SQL Server Engine and Agent services on supported SQL Server versions. Other services like Reporting Services or Analysis Services are not supported and may cause the function to fail on older SQL Server versions.

## Syntax

```powershell
Update-DbaServiceAccount
    [-ComputerName <DbaInstanceParameter[]>]
    [-Credential <PSCredential>]
    [-ServiceName] <String[]>
    [-Username <String>]
    [-ServiceCredential <PSCredential>]
    [-PreviousPassword <SecureString>]
    [-SecurePassword <SecureString>]
    [-NoRestart]
    [-EnableException]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

Update-DbaServiceAccount
    [-Credential <PSCredential>]
    -InputObject <Object[]>
    [-Username <String>]
    [-ServiceCredential <PSCredential>]
    [-PreviousPassword <SecureString>]
    [-SecurePassword <SecureString>]
    [-NoRestart]
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
PS C:\> $SecurePassword = (Get-Credential NoUsernameNeeded).Password
PS C:\> Update-DbaServiceAccount -ComputerName sql1 -ServiceName 'MSSQL$MYINSTANCE' -SecurePassword $SecurePassword
```

Changes the current service account's password of the service MSSQL$MYINSTANCE to 'Qwerty1234'<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential
PS C:\> Get-DbaService sql1 -Type Engine,Agent -Instance MYINSTANCE | Update-DbaServiceAccount -ServiceCredential $cred
```

Requests credentials from the user and configures them as a service account for the SQL Server engine and agent services of the instance sql1\MYINSTANCE<br>

#####  Example:  3 

```powershell
PS C:\> Update-DbaServiceAccount -ComputerName sql1,sql2 -ServiceName 'MSSQLSERVER','SQLSERVERAGENT' -Username NETWORKSERVICE
```

Configures SQL Server engine and agent services on the machines sql1 and sql2 to run under Network Service system user.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1'
```

Configures SQL Server engine service on the machine sql1 to run under MyDomain\sqluser1. Will request user to input the account password.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1' -NoRestart
```

Configures SQL Server engine service on the machine sql1 to run under MyDomain\sqluser1. Will request user to input the account password.<br>
Will not restart, which means the changes will not go into effect, so you will still have to restart during your planned outage window.<br>

### Required Parameters

##### -InputObject

Accepts service objects from Get-DbaService for pipeline operations. Must contain ComputerName and ServiceName properties.  
Use this when you want to filter services first with Get-DbaService then update only specific services based on criteria like service type or instance name.

| Property | Value |
| --- | --- |
| Alias | ServiceCollection |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ServiceName

Specifies the exact SQL Server service name to update, such as 'MSSQLSERVER' for default instances or 'MSSQL$INSTANCENAME' for named instances.  
Use this when you need to target specific services rather than all SQL Server services on a computer. Supports SQL Server Agent services like 'SQLSERVERAGENT' or 'SQLAgent$INSTANCENAME'.

| Property | Value |
| --- | --- |
| Alias | Name,Service |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -ComputerName

Specifies the SQL Server computers where service account changes will be applied. Accepts multiple computer names for bulk operations.  
Use this when you need to update service accounts across multiple SQL Server instances in your environment.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Windows Credential with permission to log on to the server running the SQL instance

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Username

Specifies the service account username in DOMAIN\\Username format for domain accounts. Cannot be combined with -ServiceCredential parameter.  
Use this when you want to change to a specific domain account or local system account. For local system accounts, use LOCALSERVICE, NETWORKSERVICE, or LOCALSYSTEM without providing a password.

| Property | Value |
| --- | --- |
| Alias | User |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServiceCredential

Provides a PSCredential object containing the domain account and password for the SQL Server service. Cannot be combined with -Username parameter.  
Use this when changing to a domain service account and you already have the credentials stored securely. For local system accounts, create credentials with usernames LOCALSERVICE, NETWORKSERVICE, or   
LOCALSYSTEM and empty passwords.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PreviousPassword

Specifies the current password of the service account when performing password-only changes. Required for non-admin users but optional for local administrators.  
Use this when you're rotating passwords for compliance and need to provide the existing password to validate the change.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (New-Object System.Security.SecureString) |

##### -SecurePassword

Sets the new password for the service account as a SecureString object. If not provided, the function will prompt for password input.  
Use this when changing passwords for domain service accounts. Managed Service Accounts (MSAs) and local system accounts automatically ignore this parameter since they don't require passwords.

| Property | Value |
| --- | --- |
| Alias | Password,NewPassword |
| Required | False |
| Pipeline | false |
| Default Value | (New-Object System.Security.SecureString) |

##### -NoRestart

Prevents automatic restart of SQL Server services after account or password changes. Service changes will not take effect until services are manually restarted.  
Use this when you need to schedule service restarts during planned maintenance windows to avoid unexpected downtime during business hours.

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
