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

# Test-DbaConnection

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaConnection](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaConnection](https://dataplat.github.io/boh#Test-DbaConnection).

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
