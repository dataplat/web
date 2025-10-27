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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Update-DbaServiceAccount</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Update-DbaServiceAccount.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Kirill Kravtsov (@nvarscar)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="$SecurePassword = (Get-Credential NoUsernameNeeded).Password
Update-DbaServiceAccount -ComputerName sql1 -ServiceName 'MSSQL$MYINSTANCE' -SecurePassword $SecurePassword" }

Changes the current service account's password of the service MSSQL$MYINSTANCE to 'Qwerty1234'<br>

#####  Example:  2 

```powershell
PS C:\> $cred = Get-Credential
PS C:\> Get-DbaService sql1 -Type Engine,Agent -Instance MYINSTANCE | Update-DbaServiceAccount -ServiceCredential $cred
```
{: data-copyable="true" data-clean-code="$cred = Get-Credential
Get-DbaService sql1 -Type Engine,Agent -Instance MYINSTANCE | Update-DbaServiceAccount -ServiceCredential $cred" }

Requests credentials from the user and configures them as a service account for the SQL Server engine and agent services of the instance sql1\MYINSTANCE<br>

#####  Example:  3 

```powershell
PS C:\> Update-DbaServiceAccount -ComputerName sql1,sql2 -ServiceName 'MSSQLSERVER','SQLSERVERAGENT' -Username NETWORKSERVICE
```
{: data-copyable="true" data-clean-code="Update-DbaServiceAccount -ComputerName sql1,sql2 -ServiceName 'MSSQLSERVER','SQLSERVERAGENT' -Username NETWORKSERVICE" }

Configures SQL Server engine and agent services on the machines sql1 and sql2 to run under Network Service system user.<br>

#####  Example:  4 

```powershell
PS C:\> Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1'
```
{: data-copyable="true" data-clean-code="Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1'" }

Configures SQL Server engine service on the machine sql1 to run under MyDomain\sqluser1. Will request user to input the account password.<br>

#####  Example:  5 

```powershell
PS C:\> Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1' -NoRestart
```
{: data-copyable="true" data-clean-code="Get-DbaService sql1 -Type Engine -Instance MSSQLSERVER | Update-DbaServiceAccount -Username 'MyDomain\sqluser1' -NoRestart" }

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
