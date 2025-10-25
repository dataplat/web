---
title: "a new command to find all of your sql instances"
date: 2018-03-27
slug: "find-sql-instances"
aliases:
  - /find-sql-instances/
  - /find-sql-instances/index.html
categories: [announcements]
tags: [party]
draft: false
---

Nearly every time I inherit a SQL Server environment, I'm only given a partial list of SQL Servers that exist on the network. It's my usual routine to get permission to sniff the network then run about [five different programs](https://blog.netnerds.net/2012/05/sql-server-discovery-tools-and-scripts/) including Idera's [SQL Discovery](https://www.idera.com/help/sqlat/1-5/Content/Help/SQL%20Discovery.htm) and Microsoft's [SQL Server Assessment and Planning Toolkit](https://www.microsoft.com/en-us/download/details.aspx?id=7826).

I always thought it'd be cool to have one comprehensive PowerShell command that could do the work of all the above and was ecstatic to see [NetSPI's](https://www.netspi.com/) [Scott Sutherland](https://blog.netspi.com/author/scott-sutherland/) had written a few commands to do just that in his awesome PowerShell module [PowerUpSQL](https://github.com/NetSPI/PowerUpSQL).

![PowerUpSQL](https://github.com/NetSPI/PowerUpSQL/raw/master/images/powerupsql-large.png)

## Find-DbaInstance

When I saw Scott's multi-pronged approach (including some UDP magic 🎸), I asked if he'd be interested in contributing to dbatools and he said yes! He submitted a gorgeous mock-up and I was so excited. Then came the PR, complete with great documentation and multithreading.

![banana dance](https://dbatools.io/wp-content/uploads/2018/04/bananadance.gif?resize=249%2C246&ssl=1)

I asked our architect [Fred Weinmann](http://psframework.org/) to perform a code review and he was so taken by the command, he refactored it with some C# magic including strong types. This command, which is available in 0.9.314, is a beauty!

## The basics

This command searches for SQL Server Instances. It supports a variety of scans for this purpose which can be separated in two categories: Discovery and Scan.

### DiscoveryType

This is where it compiles a list of computers / addresses to check. It supports any combination of:

#### Domain

Connects to Active Directory to look up all computers with registered SQL Instances. Not all instances need to be registered properly, so this is not 100% reliable. By default, your nearest Domain Controller is contacted for this scan, but you can specify its DistinguishedName and the `-DomainController` parameter for greater control. If credentials were specified using the `-Credential` parameter, those same credentials are used to perform this lookup, allowing the scan of other domains.

#### DataSourceEnumeration

This uses the default UDP Broadcast based instance enumeration used by SSMS to detect instances. Note that the result from this is not used in the actual scan, but only to compile a list of computers to scan. To enable the same results for the scan, ensure that the `-Browser` scan is enabled.

#### IPRange

This discovery uses a range of IPAddresses and simply passes them on to be tested. By default, it will enumerate all ethernet network adapters on the local computer and scan the entire subnet they are on. By using the `-IpAddress` parameter, custom network ranges can be specified. Check out the help for more information on range formats.

### ScanType

Once a list of computers has been provided, this command will execute a variety of actions to determine any instances present for each of them.

#### DNSResolve

- Tries resolving the computername in DNS

#### Ping

- Tries pinging the computer. Failure will NOT terminate scans.

#### SQLService

- Tries listing all SQL Services using CIM/WMI
- This scan uses credentials specified in the `-Credential` parameter if any.
- This scan detects instances.
- Success in this scan guarantees high confidence (See parameter `-MinimumConfidence` for details).

#### Browser

- Tries discovering all instances via the browser service
- This scan detects instances.

#### TCPPort

- Tries connecting to the TCP Ports.
- By default, port 1433 is connected to.
- The parameter `-TCPPort` can be used to provide a list of port numbers to scan.
- This scan detects possible instances. Since other services might bind to a given port, this is not the most reliable test.
- This scan is also used to validate found SPNs if both scans are used in combination

#### SqlConnect

- Tries to establish a SQL connection to the server
- Uses windows credentials by default
- Specify custom credentials using the `-SqlCredential` parameter
- This scan is not used by default
- Success in this scan guarantees high confidence (See parameter `-MinimumConfidence` for details).

#### SPN

- Tries looking up the Service Principal Names for each instance
- Will use the nearest Domain Controller by default
- Target a specific domain controller using the `-DomainController` parameter
- If using the `-DomainController` parameter, use the `-Credential` parameter to specify the credentials used to connect

## Example usage

Here are just a few usage examples.

### Using Active Directory

`Get-ADComputer -Filter { name -like 'sql*' } | Find-DbaInstance | Out-GridView`

![Active Directory scan results](https://dbatools.io/wp-content/uploads/2018/03/img_5aba385e9c543.png?w=800&ssl=1)

Scans all computers named like `sql%` in the domain for SQL Instances, using a deep probe:

- Tries resolving the name in DNS
- Tries pinging the computer
- Tries listing all SQL Services using CIM/WMI
- Tries discovering all instances via the browser service
- Tries connecting to the default TCP Port (1433)
- Tries connecting to the TCP port of each discovered instance
- Tries to establish a SQL connection to the server using default windows credentials
- Tries looking up the Service Principal Names for each instance

And for more detailed information, you can use `Select *` to expose all properties, including those hidden by default.

`Get-ADComputer -Filter { name -like 'sql*' } | Find-DbaInstance | Select *`

![Detailed scan results](https://dbatools.io/wp-content/uploads/2018/04/scan.jpg?resize=800%2C294&ssl=1)

### SPN and auto-discovery

`Find-DbaInstance -DiscoveryType Domain, DataSourceEnumeration`

Performs a network search for SQL Instances by:

- Looking up the Service Principal Names of computers in active directory
- Using the UDP broadcast based auto-discovery of SSMS
- After that it will extensively scan all hosts thus discovered for instances

### Servers from file

`Get-Content .\servers.txt | Find-DbaInstance -ScanType Browser, SqlConnect -Credential (Get-Credential ad\winadmin) -SqlCredential ad\sqladmin`

- Reads all servers from the servers.txt file (one server per line)
- Scans each of them for instances using the browser service using the ad\winadmin account
- Attempts to connect to each instance found using the ad\sqladmin account

### Do everything

Warning! This one takes a long time due to the IP scan. How long? About 2 hours on my single subnet lab.

`Find-DbaInstance -DiscoveryType All -ScanType All`

Performs a network search for SQL Instances, using all discovery protocols and scan types:

- Active directory search for Service Principal Names
- SQL Instance Enumeration (same as SSMS does)
- All IPAddresses in the current computer's subnets of all connected network interfaces
- Tries resolving the name in DNS
- Tries pinging the computer
- Tries listing all SQL Services using CIM/WMI
- Tries discovering all instances via the browser service
- Tries connecting to the default TCP Port (1433)
- Tries connecting to the TCP port of each discovered instance
- Tries to establish a SQL connection to the server using default windows credentials
- Tries looking up the Service Principal Names for each instance

Want to know more? Check out `Get-Help Find-DbaInstance -Detailed`. This includes additional information and discusses parameters like `-SqlCredential`, `-MinimumConfidence` and more.

Thank you so very much for sharing your hard work, Scott! I've wanted a command like this for years. And thank you, Fred, for the time and love you invested into the dbatools refactor.

\- Chrissy
