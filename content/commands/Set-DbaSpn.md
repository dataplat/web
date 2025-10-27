---
title: "Set-DbaSpn"
slug: "Set-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Sets an SPN for a given service account in active directory (and also enables delegation to the same SPN by default)"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbaSpn"
draft: false
---

# Set-DbaSpn

| Property | Value |
| --- | --- |
| **Author** | Drew Furgiuele (@pittfurg), port1433.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbaSpn](https://github.com/dataplat/dbatools/blob/master/public/Set-DbaSpn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbaSpn](https://dataplat.github.io/boh#Set-DbaSpn).

## Synopsis

Sets an SPN for a given service account in active directory (and also enables delegation to the same SPN by default)

## Description

This function will connect to Active Directory and search for an account. If the account is found, it will attempt to add an SPN. Once the SPN is added, the function will also set delegation to that service, unless -NoDelegation is specified. In order to run this function, the credential you provide must have write access to Active Directory.  
  
Note: This function supports -WhatIf

## Syntax

```powershell
Set-DbaSpn
    [-SPN] <String>
    [-ServiceAccount] <String>
    [[-Credential] <PSCredential>]
    [-NoDelegation]
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
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException
```

Connects to Active Directory and adds a provided SPN to the given account.<br>
Connects to Active Directory and adds a provided SPN to the given account, suppressing all error messages and throw exceptions that can be caught instead<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba
```

Connects to Active Directory and adds a provided SPN to the given account. Uses alternative account to connect to AD.<br>

#####  Example:  3 

```powershell
PS C:\> Set-DbaSpn -SPN MSSQLSvc/SQLSERVERA.domain.something -ServiceAccount domain\account -NoDelegation
```

Connects to Active Directory and adds a provided SPN to the given account, without the delegation.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn
```

Sets all missing SPNs for sql2016<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2016 | Where-Object { $_.isSet -eq $false } | Set-DbaSpn -WhatIf
```

Displays what would happen trying to set all missing SPNs for sql2016<br>

### Required Parameters

##### -SPN

Specifies the Service Principal Name to register in Active Directory for SQL Server Kerberos authentication.  
Must follow the format 'MSSQLSvc/hostname:port' or 'MSSQLSvc/FQDN:port' for named instances.  
Use this to enable Kerberos authentication and eliminate double-hop authentication issues.

| Property | Value |
| --- | --- |
| Alias | RequiredSPN |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ServiceAccount

Specifies the Active Directory account that runs the SQL Server service and will own the SPN.  
Can be a domain user account (domain\username) or computer account (computername$) depending on your SQL Server service configuration.  
This account must exist in Active Directory and you must have permissions to modify its properties.

| Property | Value |
| --- | --- |
| Alias | InstanceServiceAccount,AccountName |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

### Optional Parameters

##### -Credential

The credential you want to use to connect to Active Directory to make the changes

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -NoDelegation

Prevents automatic configuration of Kerberos constrained delegation for the specified SPN.  
Use this when you want to manually configure delegation later or when delegation is not required for your environment.  
By default, the function enables constrained delegation to allow the service account to authenticate to other services.

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

Shows what would happen if the command was executed

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Turns confirmations before changes on or off

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
