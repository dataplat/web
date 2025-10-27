---
title: "Remove-DbaSpn"
slug: "Remove-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Removes Service Principal Names from Active Directory service accounts and cleans up related Kerberos delegation"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaSpn"
draft: false
---

# Remove-DbaSpn

| Property | Value |
| --- | --- |
| **Author** | Drew Furgiuele (@pittfurg), port1433.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaSpn](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaSpn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaSpn](https://dataplat.github.io/boh#Remove-DbaSpn).

## Synopsis

Removes Service Principal Names from Active Directory service accounts and cleans up related Kerberos delegation

## Description

Connects to Active Directory to remove specified SPNs from SQL Server service accounts and automatically cleans up associated Kerberos delegation settings. This is essential when decommissioning SQL Server instances, changing service accounts, or troubleshooting Kerberos authentication issues where duplicate or incorrect SPNs exist. The function searches for the service account (user or computer), removes the SPN from the servicePrincipalName property, and also removes any corresponding delegation entries from msDS-AllowedToDelegateTo to maintain a clean AD environment.  
  
Requires write access to Active Directory through the provided credentials.

## Syntax

```powershell
Remove-DbaSpn
    [-SPN] <String>
    [-ServiceAccount] <String>
    [[-Credential] <PSCredential>]
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
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account
```

Connects to Active Directory and removes a provided SPN from the given account (and also the relative delegation)<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -EnableException
```

Connects to Active Directory and removes a provided SPN from the given account, suppressing all error messages and throw exceptions that can be caught instead<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaSpn -SPN MSSQLSvc\SQLSERVERA.domain.something -ServiceAccount domain\account -Credential ad\sqldba
```

Connects to Active Directory and removes a provided SPN to the given account. Uses alternative account to connect to AD.<br>

#####  Example:  4 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn -WhatIf
```

Shows what would happen trying to remove all set SPNs for sql2005 and the relative delegations<br>

#####  Example:  5 

```powershell
PS C:\> Test-DbaSpn -ComputerName sql2005 | Where-Object { $_.isSet -eq $true } | Remove-DbaSpn
```

Removes all set SPNs for sql2005 and the relative delegations<br>

### Required Parameters

##### -SPN

Specifies the exact Service Principal Name to remove from Active Directory. Must include the full SPN format like 'MSSQLSvc/servername:port' or 'MSSQLSvc/servername.domain.com'.  
Use this when decommissioning SQL instances, changing service accounts, or cleaning up duplicate SPNs that cause Kerberos authentication failures.

| Property | Value |
| --- | --- |
| Alias | RequiredSPN |
| Required | True |
| Pipeline | true (ByPropertyName) |
| Default Value |  |

##### -ServiceAccount

Specifies the Active Directory account (user or computer) that currently owns the SPN to be removed. Use domain\username format for user accounts or COMPUTERNAME$ for computer accounts.  
This should match the account currently running the SQL Server service that you're decommissioning or reconfiguring.

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
