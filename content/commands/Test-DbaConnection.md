---
title: "Test-DbaConnection"
slug: "Test-DbaConnection"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Validates SQL Server connectivity and gathers comprehensive connection diagnostics"
tags:
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaConnection"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Test-DbaConnection</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Test-DbaConnection.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Chrissy LeMaire (@cl), netnerds.net</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Validates SQL Server connectivity and gathers comprehensive connection diagnostics

## Description

Tests SQL Server instance connectivity while collecting detailed connection and environment information for troubleshooting. Returns authentication details, network configuration, TCP ports, and local PowerShell environment data. Essential for diagnosing connectivity issues before running automation scripts or validating access across multiple instances. Combines SQL connection testing with network diagnostics including ping status, PSRemoting access, and DNS resolution.

## Syntax

```powershell
Test-DbaConnection
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
    [[-SqlCredential] <PSCredential>]
    [-SkipPSRemoting]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaConnection SQL2016
```
{: data-copyable="true" data-clean-code="Test-DbaConnection SQL2016" }

ComputerName         : SQL2016<br>
InstanceName         : MSSQLSERVER<br>
SqlInstance          : sql2016<br>
SqlVersion           : 13.0.4001<br>
ConnectingAsUser     : BASE\ctrlb<br>
ConnectSuccess       : True<br>
AuthType             : Windows Authentication<br>
AuthScheme           : KERBEROS<br>
TcpPort              : 1433<br>
IPAddress            : 10.2.1.5<br>
NetBiosName          : sql2016.base.local<br>
IsPingable           : True<br>
PSRemotingAccessible : True<br>
DomainName           : base.local<br>
LocalWindows         : 10.0.15063.0<br>
LocalPowerShell      : 5.1.15063.502<br>
LocalCLR             : 4.0.30319.42000<br>
LocalSMOVersion      : 13.0.0.0<br>
LocalDomainUser      : True<br>
LocalRunAsAdmin      : False<br>
LocalEdition         : Desktop<br>
Test connection to SQL2016 and outputs information collected<br>

#####  Example:  2 

```powershell
PS C:\> $winCred = Get-Credential sql2017\Administrator
PS C:\> $sqlCred = Get-Credential sa
PS C:\> Test-DbaConnection SQL2017 -SqlCredential $sqlCred -Credential $winCred
```
{: data-copyable="true" data-clean-code="$winCred = Get-Credential sql2017\Administrator
$sqlCred = Get-Credential sa
Test-DbaConnection SQL2017 -SqlCredential $sqlCred -Credential $winCred" }

ComputerName         : SQL2017<br>
InstanceName         : MSSQLSERVER<br>
SqlInstance          : sql2017<br>
SqlVersion           : 14.0.3356<br>
ConnectingAsUser     : sa<br>
ConnectSuccess       : True<br>
AuthType             : SQL Authentication<br>
AuthScheme           : SQL<br>
TcpPort              : 50164<br>
IPAddress            : 10.10.10.15<br>
NetBiosName          : sql2017.company.local<br>
IsPingable           : True<br>
PSRemotingAccessible : True<br>
DomainName           : company.local<br>
LocalWindows         : 10.0.15063.0<br>
LocalPowerShell      : 5.1.19041.610<br>
LocalCLR             : 4.0.30319.42000<br>
LocalSMOVersion      : 15.100.0.0<br>
LocalDomainUser      : True<br>
LocalRunAsAdmin      : False<br>
LocalEdition         : Desktop<br>
Test connection to SQL2017 instance and collecting information on SQL Server using the sa login, local Administrator account is used to collect port information<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -Credential

Windows credentials for computer-level access to the target server. Required for PSRemoting tests and TCP port detection when running under a different security context.  
Use this when your current Windows account lacks administrative privileges on the target server or when testing across domain boundaries.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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

##### -SkipPSRemoting

Skips the PowerShell remoting connectivity test during the connection assessment.  
Use this when PSRemoting is disabled or blocked by firewall rules but you still want to test SQL connectivity and gather other diagnostic information.

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


&nbsp;
