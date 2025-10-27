---
title: "Find-DbaInstance"
slug: "Find-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Scott Sutherland, 2018 NetSPI | Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Discovers SQL Server instances across networks using multiple scanning methods"
tags:
  - "Instance"
  - "Connect"
  - "SqlServer"
  - "Lookup"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Find-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Find-DbaInstance"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Find-DbaInstance</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Find-DbaInstance.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Scott Sutherland, 2018 NetSPI , Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Discovers SQL Server instances across networks using multiple scanning methods

## Description

This function performs comprehensive SQL Server instance discovery across your network infrastructure using multiple detection methods. Perfect for creating complete SQL Server inventories, compliance auditing, and finding forgotten or undocumented instances that might pose security risks.  
  
The function combines two distinct phases to systematically locate SQL Server instances:  
  
Discovery Phase:  
Compiles target lists using several methods: Active Directory SPN lookups (finds registered SQL services), SQL Instance Enumeration (same method SSMS uses for browsing), IP address range scanning (scans entire subnets), and Domain Server searches (targets all Windows servers in AD).  
You can specify explicit computer lists via -ComputerName or use automated discovery via -DiscoveryType.  
  
Scan Phase:  
Tests each discovered target using multiple verification methods: Browser service queries, WMI/CIM SQL service enumeration, TCP port connectivity testing (default 1433), DNS resolution checks, ping tests, and optional SQL connection attempts.  
Results include confidence levels (High/Medium/Low) based on scan success combinations.  
  
Common DBA scenarios:  
- Audit all SQL instances before migrations or compliance reviews  
- Discover shadow IT databases that bypass standard deployment processes  
- Inventory instances across acquired companies or merged networks  
- Validate disaster recovery documentation against actual running instances  
- Identify instances running on non-standard ports or with unusual configurations  
  
Security considerations:  
The Discovery phase is non-intrusive, but the Scan phase generates network traffic and authentication attempts across your infrastructure. This creates audit logs and may trigger security monitoring systems. Some scan types require elevated privileges for WMI access or SQL connections. Always coordinate with your security team before running network-wide scans, especially in regulated environments.

## Syntax

```powershell
Find-DbaInstance
    [-Credential <PSCredential>]
    [-SqlCredential <PSCredential>]
    [-ScanType {TCPPort | SqlConnect | SqlService | DNSResolve | SPN | Browser | Ping | Default | All}]
    [-DomainController <String>]
    [-TCPPort <Int32[]>]
    [-MinimumConfidence {None | Low | Medium | High}]
    [-EnableException]
    [<CommonParameters>]

Find-DbaInstance -ComputerName <DbaInstanceParameter[]>
    [-Credential <PSCredential>]
    [-SqlCredential <PSCredential>]
    [-ScanType {TCPPort | SqlConnect | SqlService | DNSResolve | SPN | Browser | Ping | Default | All}]
    [-DomainController <String>]
    [-TCPPort <Int32[]>]
    [-MinimumConfidence {None | Low | Medium | High}]
    [-EnableException]
    [<CommonParameters>]

Find-DbaInstance -DiscoveryType {IPRange | DomainSPN | Domain | DataSourceEnumeration | DomainServer | All}
    [-Credential <PSCredential>]
    [-SqlCredential <PSCredential>]
    [-ScanType {TCPPort | SqlConnect | SqlService | DNSResolve | SPN | Browser | Ping | Default | All}]
    [-IpAddress <String[]>]
    [-DomainController <String>]
    [-TCPPort <Int32[]>]
    [-MinimumConfidence {None | Low | Medium | High}]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Find-DbaInstance -DiscoveryType Domain, DataSourceEnumeration
```
{: data-copyable="true" data-clean-code="Find-DbaInstance -DiscoveryType Domain, DataSourceEnumeration" }

Performs a network search for SQL Instances by:<br>
- Looking up the Service Principal Names of computers in Active Directory<br>
- Using the UDP broadcast based auto-discovery of SSMS<br>
After that it will extensively scan all hosts thus discovered for instances.<br>

#####  Example:  2 

```powershell
PS C:\> Find-DbaInstance -DiscoveryType All
```
{: data-copyable="true" data-clean-code="Find-DbaInstance -DiscoveryType All" }

Performs a network search for SQL Instances, using all discovery protocols:<br>
- Active directory search for Service Principal Names<br>
- SQL Instance Enumeration (same as SSMS does)<br>
- All IPAddresses in the current computer's subnets of all connected network interfaces<br>
Note: This scan will take a long time, due to including the IP Scan<br>

#####  Example:  3 

```powershell
PS C:\> Get-ADComputer -Filter "*" | Find-DbaInstance
```
{: data-copyable="true" data-clean-code="Get-ADComputer -Filter &quot;*&quot; | Find-DbaInstance" }

Scans all computers in the domain for SQL Instances, using a deep probe:<br>
- Tries resolving the name in DNS<br>
- Tries pinging the computer<br>
- Tries listing all SQL Services using CIM/WMI<br>
- Tries discovering all instances via the browser service<br>
- Tries connecting to the default TCP Port (1433)<br>
- Tries connecting to the TCP port of each discovered instance<br>
- Tries to establish a SQL connection to the server using default windows credentials<br>
- Tries looking up the Service Principal Names for each instance<br>

#####  Example:  4 

```powershell
PS C:\> Get-Content .\servers.txt | Find-DbaInstance -SqlCredential $cred -ScanType Browser, SqlConnect
```
{: data-copyable="true" data-clean-code="Get-Content .\servers.txt | Find-DbaInstance -SqlCredential $cred -ScanType Browser, SqlConnect" }

Reads all servers from the servers.txt file (one server per line),<br>
then scans each of them for instances using the browser service<br>
and finally attempts to connect to each instance found using the specified credentials.<br>
then scans each of them for instances using the browser service and SqlService<br>

#####  Example:  5 

```powershell
PS C:\> Find-DbaInstance -ComputerName localhost | Get-DbaDatabase | Format-Table -Wrap
```
{: data-copyable="true" data-clean-code="Find-DbaInstance -ComputerName localhost | Get-DbaDatabase | Format-Table -Wrap" }

Scans localhost for instances using the browser service, traverses all instances for all databases and displays all information in a formatted table.<br>

#####  Example:  6 

```powershell
PS C:\> $databases = Find-DbaInstance -ComputerName localhost | Get-DbaDatabase
PS C:\> $results = $databases | Select-Object SqlInstance, Name, Status, RecoveryModel, SizeMB, Compatibility, Owner, LastFullBackup, LastDiffBackup, LastLogBackup
PS C:\> $results | Format-Table -Wrap
```
{: data-copyable="true" data-clean-code="$databases = Find-DbaInstance -ComputerName localhost | Get-DbaDatabase
$results = $databases | Select-Object SqlInstance, Name, Status, RecoveryModel, SizeMB, Compatibility, Owner, LastFullBackup, LastDiffBackup, LastLogBackup
$results | Format-Table -Wrap" }

Scans localhost for instances using the browser service, traverses all instances for all databases and displays a subset of the important information in a formatted table.<br>
Using this method regularly is not recommended. Use Get-DbaService or Get-DbaRegServer instead.<br>

### Required Parameters

##### -ComputerName

Specifies target computers to scan for SQL Server instances. Accepts computer names, IP addresses, or output from Get-ADComputer.  
Use this when you have a specific list of servers to inventory rather than performing network-wide discovery.  
Only the computer name portion is used - connection strings or SQL instance details are ignored.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -DiscoveryType

Specifies which automatic discovery methods to use for finding SQL Server targets across your network.  
Choose discovery methods based on your environment: DomainSPN for registered services, DataSourceEnumeration for broadcasting instances, IPRange for subnet scanning, or DomainServer for all Windows   
servers.  
Combine multiple types for comprehensive coverage, but be aware that IPRange scanning can be time-intensive on large networks.  
---  
- SPN Lookup  
    The function tries to connect active directory to look up all computers with registered SQL Instances.  
    Not all instances need to be registered properly, making this not 100% reliable.  
    By default, your nearest Domain Controller is contacted for this scan.  
    However it is possible to explicitly state the DC to contact using its DistinguishedName and the '-DomainController' parameter.  
    If credentials were specified using the '-Credential' parameter, those same credentials are used to perform this lookup, allowing the scan of other domains.  
- SQL Instance Enumeration  
    This uses the default UDP Broadcast based instance enumeration used by SSMS to detect instances.  
    Note that the result from this is not used in the actual scan, but only to compile a list of computers to scan.  
    To enable the same results for the scan, ensure that the 'Browser' scan is enabled.  
- IP Address range:  
    This 'Discovery' uses a range of IPAddresses and simply passes them on to be tested.  
    See the 'Description' part of help on security issues of network scanning.  
    By default, it will enumerate all ethernet network adapters on the local computer and scan the entire subnet they are on.  
    By using the '-IpAddress' parameter, custom network ranges can be specified.  
- Domain Server:  
    This will discover every single computer in Active Directory that is a Windows Server and enabled.  
    By default, your nearest Domain Controller is contacted for this scan.  
    However it is possible to explicitly state the DC to contact using its DistinguishedName and the '-DomainController' parameter.  
    If credentials were specified using the '-Credential' parameter, those same credentials are used to perform this lookup, allowing the scan of other domains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Credential

The credentials to use on windows network connection.  
These credentials are used for:  
- Contact to domain controllers for SPN lookups (only if explicit Domain Controller is specified)  
- CIM/WMI contact to the scanned computers during the scan phase (see the '-ScanType' parameter documentation on affected scans).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

The credentials used to connect to SqlInstances to during the scan phase.  
See the '-ScanType' parameter documentation on affected scans.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScanType

Controls which verification methods are used to detect and validate SQL Server instances on target computers.  
Use specific scan types to optimize performance or reduce network impact - for example, use only Browser and SQLService for quick detection, or add SqlConnect for definitive verification.  
Default performs all scans except SqlConnect, which requires explicit specification due to authentication overhead.  
Scans:  
- Browser  
  - Tries discovering all instances via the browser service  
  - This scan detects instances.  
- SQLService  
  - Tries listing all SQL Services using CIM/WMI  
  - This scan uses credentials specified in the '-Credential' parameter if any.  
  - This scan detects instances.  
  - Success in this scan guarantees high confidence (See parameter '-MinimumConfidence' for details).  
- SPN  
  - Tries looking up the Service Principal Names for each instance  
  - Will use the nearest Domain Controller by default  
  - Target a specific domain controller using the '-DomainController' parameter  
  - If using the '-DomainController' parameter, use the '-Credential' parameter to specify the credentials used to connect  
- TCPPort  
  - Tries connecting to the TCP Ports.  
  - By default, port 1433 is connected to.  
  - The parameter '-TCPPort' can be used to provide a list of port numbers to scan.  
  - This scan detects possible instances. Since other services might bind to a given port, this is not the most reliable test.  
  - This scan is also used to validate found SPNs if both scans are used in combination  
- DNSResolve  
  - Tries resolving the computername in DNS  
- Ping  
  - Tries pinging the computer. Failure will NOT terminate scans.  
- SqlConnect  
  - Tries to establish a SQL connection to the server  
  - Uses windows credentials by default  
  - Specify custom credentials using the '-SqlCredential' parameter  
  - This scan is not used by default  
  - Success in this scan guarantees high confidence (See parameter '-MinimumConfidence' for details).  
- All  
  - All of the above

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Default |
| Accepted Values | Default,SQLService,Browser,TCPPort,All,SPN,Ping,SqlConnect,DNSResolve |

##### -IpAddress

Defines custom IP ranges to scan when using IPRange discovery instead of auto-detecting local subnets.  
Use this to target specific network segments like DMZ subnets or remote locations where SQL instances might exist.  
Supports multiple formats: single IPs (10.1.1.1), ranges (10.1.1.1-10.1.1.5), CIDR notation (10.1.1.1/24), or subnet masks (10.1.1.1/255.255.255.0).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DomainController

Specifies a specific domain controller for Active Directory queries when using DomainSPN or DomainServer discovery.  
Use this when you need to target a specific DC for cross-domain searches or when the nearest DC is unavailable.  
Requires the '-Credential' parameter when querying remote domains or when explicit authentication is needed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TCPPort

Specifies which TCP ports to test for SQL Server connectivity during port scanning.  
Use this to detect instances running on non-standard ports or to scan multiple common SQL Server ports like 1433, 1434, and custom ports.  
Defaults to 1433 (SQL Server default port).

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 1433 |

##### -MinimumConfidence

Filters results based on how certain the scan is that a SQL Server instance exists on each target.  
Use High for definitive results when you need accurate inventories, Medium for likely instances, or Low for comprehensive discovery that includes potential false positives.  
High confidence requires successful SQL service detection or connection, Medium requires browser response or combined port+SPN validation, Low accepts single indicators like open ports or SPN records.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | Low |

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
