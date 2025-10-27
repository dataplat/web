---
title: "Get-DbaSpn"
slug: "Get-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves existing Service Principal Names (SPNs) from Active Directory for SQL Server services"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaSpn"
draft: false
---

# Get-DbaSpn

| Property | Value |
| --- | --- |
| **Author** | Drew Furgiuele (@pittfurg), port1433.com |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaSpn](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaSpn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaSpn](https://dataplat.github.io/boh#Get-DbaSpn).

## Synopsis

Retrieves existing Service Principal Names (SPNs) from Active Directory for SQL Server services

## Description

Queries Active Directory to return SPNs that are currently registered for SQL Server services on specified computers or service accounts. This is essential for troubleshooting Kerberos authentication issues, as missing or duplicate SPNs prevent clients from authenticating to SQL Server using integrated security. Use this command to audit your current SPN configuration before making changes with Set-DbaSpn or when investigating authentication failures. The function returns detailed information including the service class (MSSQLSvc), port numbers, and associated Active Directory accounts.

## Syntax

```powershell
Get-DbaSpn
    [[-ComputerName] <String[]>]
    [[-AccountName] <String[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaSpn -ComputerName SQLSERVERA -Credential ad\sqldba
```

Returns a custom object with SearchTerm (ServerName) and the SPNs that were found<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaSpn -AccountName domain\account -Credential ad\sqldba
```

Returns a custom object with SearchTerm (domain account) and the SPNs that were found<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba
```

Returns a custom object with SearchTerm (ServerName) and the SPNs that were found for multiple computers<br>

### Optional Parameters

##### -ComputerName

Specifies the SQL Server computer names to retrieve registered SPNs for. Defaults to localhost if not specified.  
Use this when you need to audit SPN configuration on specific servers or when troubleshooting Kerberos authentication issues across multiple SQL instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -AccountName

Specifies the Active Directory service accounts to search for registered SQL Server SPNs. Accepts both user accounts and computer accounts ending with '$'.  
Use this when you need to audit which SPNs are registered under specific service accounts or when investigating authentication issues related to particular accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Credential

User credential to connect to the remote servers or active directory.

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


&nbsp;
