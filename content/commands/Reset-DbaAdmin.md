---
title: "Reset-DbaAdmin"
slug: "Reset-DbaAdmin"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Regains administrative access to SQL Server instances when passwords or access has been lost"
tags:
  - "WSMan"
  - "Instance"
  - "Utility"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Reset-DbaAdmin.ps1"
bohUrl: "https://dataplat.github.io/boh#Reset-DbaAdmin"
draft: false
---

# Reset-DbaAdmin

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Reset-DbaAdmin](https://github.com/dataplat/dbatools/blob/master/public/Reset-DbaAdmin.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Reset-DbaAdmin](https://dataplat.github.io/boh#Reset-DbaAdmin).

## Synopsis

Regains administrative access to SQL Server instances when passwords or access has been lost

## Description

Recovers access to SQL Server instances when you're locked out due to forgotten passwords, disabled accounts, or authentication issues. This emergency recovery tool stops the SQL Server service and restarts it in single-user mode, allowing exclusive access to reset credentials and restore administrative privileges.  
  
The function handles both standalone and clustered SQL Server instances, working with SQL authentication logins (like sa) and Windows authentication accounts. It automatically enables mixed mode authentication when working with SQL logins and ensures the target login is enabled, unlocked, and granted sysadmin privileges.  
  
This is accomplished by stopping the SQL services or SQL Clustered Resource Group, then restarting SQL via the command-line using the /mReset-DbaAdmin parameter which starts the server in Single-User mode and only allows this script to connect.  
  
Once the service is restarted, the following tasks are performed:  
- Login is added if it doesn't exist  
- If login is a Windows User, an attempt is made to ensure it exists  
- If login is a SQL Login, password policy will be set to OFF when creating the login, and SQL Server authentication will be set to Mixed Mode  
- Login will be enabled and unlocked  
- Login will be added to sysadmin role  
  
If failures occur at any point, a best attempt is made to restart the SQL Server normally. The function uses Microsoft.Data.SqlClient and Get-WmiObject for maximum compatibility across different environments without requiring additional tools.  
  
For remote SQL Server instances, ensure WinRM is configured and accessible. If remote access isn't possible, run the script locally on the target server. Requires Windows administrator access to the server hosting SQL Server.  
  
Supports SQL Server 2005 and above on clustered and standalone configurations.

## Syntax

```powershell
Reset-DbaAdmin
    [-SqlInstance] <DbaInstanceParameter>
    [[-SqlCredential] <PSCredential>]
    [[-Login] <String>]
    [[-SecurePassword] <SecureString>]
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
PS C:\> Reset-DbaAdmin -SqlInstance sqlcluster -SqlCredential sqladmin
```

Prompts for password, then resets the "sqladmin" account password on sqlcluster.<br>

#####  Example:  2 

```powershell
PS C:\> Reset-DbaAdmin -SqlInstance sqlserver\sqlexpress -Login ad\administrator -Confirm:$false
```

Adds the domain account "ad\administrator" as a sysadmin to the SQL instance.<br>
If the account already exists, it will be added to the sysadmin role.<br>
Does not prompt for a password since it is not a SQL login. Does not prompt for confirmation since -Confirm is set to $false.<br>

#####  Example:  3 

```powershell
PS C:\> Reset-DbaAdmin -SqlInstance sqlserver\sqlexpress -Login sqladmin -Force
```

Skips restart confirmation, prompts for password, then adds a SQL Login "sqladmin" with sysadmin privileges.<br>
If the account already exists, it will be added to the sysadmin role and the password will be reset.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. SQL Server must be 2005 and above, and can be a clustered or stand-alone instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Instead of using Login and SecurePassword, you can just pass in a credential object.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Login

Specifies the login account to reset or create with sysadmin privileges. Defaults to "sa" if not specified.  
Use this when you need to regain access through a specific account rather than the default sa login. Accepts both SQL authentication logins (like "sqladmin") and Windows authentication accounts (like   
"DOMAIN\User" or "DOMAIN\Group").  
If the login doesn't exist, it will be created automatically. For Windows logins on remote servers, use domain accounts that the SQL Server can validate, not local machine accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | sa |

##### -SecurePassword

Provides the password for SQL authentication logins as a SecureString to avoid interactive prompts.  
Use this when automating the reset process or when you don't want to be prompted to enter the password manually. Only required for SQL logins, not Windows authentication accounts.  
The password will be applied during login creation or when resetting an existing SQL login's password.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Bypasses all confirmation prompts and proceeds with the service restart and login reset operations.  
Use this when you need to automate the recovery process or when you're certain about proceeding without manual confirmation. This includes the high-impact confirmation for stopping and restarting SQL   
Server services.  
Does not actually drop and recreate logins - the existing description appears to be incorrect for this function.

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
