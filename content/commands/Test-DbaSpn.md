---
title: "Test-DbaSpn"
slug: "Test-DbaSpn"
date: 2024-01-01
layout: "single"
author: "Drew Furgiuele (@pittfurg), port1433.com | niphlod"
availability: "Windows, Linux, macOS"
synopsis: "Validates Service Principal Name (SPN) configuration for SQL Server instances by comparing required SPNs against Active Directory registrations"
tags:
  - "SPN"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaSpn.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaSpn"
draft: false
---

# Test-DbaSpn

| Property | Value |
| --- | --- |
| **Author** | Drew Furgiuele (@pittfurg), port1433.com , niphlod |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaSpn](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaSpn.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaSpn](https://dataplat.github.io/boh#Test-DbaSpn).

## Synopsis

Validates Service Principal Name (SPN) configuration for SQL Server instances by comparing required SPNs against Active Directory registrations

## Description

This function discovers SQL Server instances on target computers and validates their Service Principal Name (SPN) configuration for Kerberos authentication. It addresses the common problem of missing or incorrect SPNs that cause authentication failures and double-hop issues in SQL Server environments.  
  
The function performs a complete SPN audit by first discovering all SQL Server instances via WMI, then generating the required SPNs based on each instance's configuration. For instances with TCP/IP enabled, it determines which ports they're listening on and generates the appropriate MSSQLSvc SPNs. Named instances get both instance-based and port-based SPNs, while the function handles dynamic ports by identifying the current port assignment.  
  
After generating the required SPNs, the function queries Active Directory to verify whether each SPN is actually registered to the correct service account. This catches common configuration issues like SPNs registered to the wrong account, missing SPNs, or duplicate SPNs that prevent proper Kerberos authentication.  
  
The function handles complex scenarios including clustered instances (using virtual server names), managed service accounts, LocalSystem accounts, and both static and dynamic port configurations. Results include detailed information about each instance's service account, required SPNs, registration status, and any configuration warnings.  
  
Use this function to troubleshoot Kerberos authentication issues, perform security audits, validate configurations before migrations, or as part of regular maintenance to ensure proper SPN setup across your SQL Server environment.

## Syntax

```powershell
Test-DbaSpn
    [-ComputerName] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaSpn -ComputerName SQLSERVERA -Credential ad\sqldba
```

Connects to a computer (SQLSERVERA) and queries WMI for all SQL instances and return "required" SPNs. It will then take each SPN it generates<br>
and query Active Directory to make sure the SPNs are set.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba
```

Connects to multiple computers (SQLSERVERA, SQLSERVERB) and queries WMI for all SQL instances and return "required" SPNs.<br>
It will then take each SPN it generates and query Active Directory to make sure the SPNs are set.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaSpn -ComputerName SQLSERVERC -Credential ad\sqldba
```

Connects to a computer (SQLSERVERC) on a specified and queries WMI for all SQL instances and return "required" SPNs.<br>
It will then take each SPN it generates and query Active Directory to make sure the SPNs are set. Note that the credential you pass must have be a valid login with appropriate rights on the domain<br>

### Required Parameters

##### -ComputerName

Specifies the target computer(s) to scan for SQL Server instances and validate their SPN configuration.  
Accepts computer names, IP addresses, or fully qualified domain names and supports pipeline input for bulk operations.  
The function will discover all SQL Server instances on each specified computer and check their required SPNs against Active Directory.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

The credential you want to use to connect to the remote server and active directory.

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
