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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaSpn</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaSpn.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Drew Furgiuele (@pittfurg), port1433.com , niphlod</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName SQLSERVERA -Credential ad\sqldba" }

Connects to a computer (SQLSERVERA) and queries WMI for all SQL instances and return "required" SPNs. It will then take each SPN it generates<br>
and query Active Directory to make sure the SPNs are set.<br>

#####  Example:  2 

```powershell
PS C:\> Test-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName SQLSERVERA,SQLSERVERB -Credential ad\sqldba" }

Connects to multiple computers (SQLSERVERA, SQLSERVERB) and queries WMI for all SQL instances and return "required" SPNs.<br>
It will then take each SPN it generates and query Active Directory to make sure the SPNs are set.<br>

#####  Example:  3 

```powershell
PS C:\> Test-DbaSpn -ComputerName SQLSERVERC -Credential ad\sqldba
```
{: data-copyable="true" data-clean-code="Test-DbaSpn -ComputerName SQLSERVERC -Credential ad\sqldba" }

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
