---
title: "New-DbaConnectionString"
slug: "New-DbaConnectionString"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates connection strings for SQL Server instances using PowerShell-friendly parameters"
tags:
  - "Connection"
  - "Connect"
  - "ConnectionString"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaConnectionString.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaConnectionString"
draft: false
---

# New-DbaConnectionString

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaConnectionString](https://github.com/dataplat/dbatools/blob/master/public/New-DbaConnectionString.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaConnectionString](https://dataplat.github.io/boh#New-DbaConnectionString).

## Synopsis

Creates connection strings for SQL Server instances using PowerShell-friendly parameters

## Description

Creates properly formatted SQL Server connection strings without having to manually construct complex connection string syntax. Instead of remembering obscure keywords like "Data Source" or "Initial Catalog", you can use familiar PowerShell parameters like -SqlInstance and -Database.  
  
This function handles the complexity of connection string building for you, including authentication methods (Windows, SQL Server, Azure AD), encryption settings, timeout values, and Azure SQL Database specifics. It supports both legacy System.Data.SqlClient and modern Microsoft.Data.SqlClient providers.  
  
Particularly useful when building custom applications, automation scripts, or when you need to generate connection strings for other tools that require them. The function can also extract connection strings from existing SMO server objects for reuse or modification.  
  
See https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.connectionstring.aspx  
and https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnectionstringbuilder.aspx  
and https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.aspx

## Syntax

```powershell
New-DbaConnectionString
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-Credential] <PSCredential>]
    [[-AccessToken] <String>]
    [[-ApplicationIntent] <String>]
    [[-BatchSeparator] <String>]
    [[-ClientName] <String>]
    [[-ConnectTimeout] <Int32>]
    [[-Database] <String>]
    [-EncryptConnection]
    [[-FailoverPartner] <String>]
    [-IsActiveDirectoryUniversalAuth]
    [[-LockTimeout] <Int32>]
    [[-MaxPoolSize] <Int32>]
    [[-MinPoolSize] <Int32>]
    [-MultipleActiveResultSets]
    [-MultiSubnetFailover]
    [[-NetworkProtocol] <String>]
    [-NonPooledConnection]
    [[-PacketSize] <Int32>]
    [[-PooledConnectionLifetime] <Int32>]
    [[-SqlExecutionModes] <String>]
    [[-StatementTimeout] <Int32>]
    [-TrustServerCertificate]
    [[-WorkstationId] <String>]
    [-Legacy]
    [[-AppendConnectionString] <String>]
    [-WhatIf]
    [-Confirm]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaConnectionString -SqlInstance sql2014
```

Creates a connection string that connects using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance sql2016 | New-DbaConnectionString
```

Builds a connected SMO object using Connect-DbaInstance then extracts and displays the connection string<br>

#####  Example:  3 

```powershell
PS C:\> $wincred = Get-Credential ad\sqladmin
PS C:\> New-DbaConnectionString -SqlInstance sql2014 -Credential $wincred
```

Creates a connection string that connects using alternative Windows credentials<br>

#####  Example:  4 

```powershell
PS C:\> $sqlcred = Get-Credential sqladmin
PS C:\> $server = New-DbaConnectionString -SqlInstance sql2014 -Credential $sqlcred
```

Login to sql2014 as SQL login sqladmin.<br>

#####  Example:  5 

```powershell
PS C:\> $connstring = New-DbaConnectionString -SqlInstance mydb.database.windows.net -SqlCredential me@myad.onmicrosoft.com -Database db
```

Creates a connection string for an Azure Active Directory login to Azure SQL db. Output looks like this:<br>
Data Source=TCP:mydb.database.windows.net,1433;Initial Catalog=db;User ID=me@myad.onmicrosoft.com;Password=fakepass;MultipleActiveResultSets=False;Connect <br>
Timeout=30;Encrypt=True;TrustServerCertificate=False;Application Name="dbatools PowerShell module - dbatools.io";Authentication="Active Directory Password"<br>

#####  Example:  6 

```powershell
PS C:\> $server = New-DbaConnectionString -SqlInstance sql2014 -ClientName "mah connection"
```

Creates a connection string that connects using Windows Authentication and uses the client name "mah connection". So when you open up profiler or use extended events, you can search for "mah <br>
connection".<br>

#####  Example:  7 

```powershell
PS C:\> $server = New-DbaConnectionString -SqlInstance sql2014 -AppendConnectionString "Packet Size=4096;AttachDbFilename=C:\MyFolder\MyDataFile.mdf;User Instance=true;"
```

Creates a connection string that connects to sql2014 using Windows Authentication, then it sets the packet size (this can also be done via -PacketSize) and other connection attributes.<br>

#####  Example:  8 

```powershell
PS C:\> $server = New-DbaConnectionString -SqlInstance sql2014 -NetworkProtocol TcpIp -MultiSubnetFailover
```

Creates a connection string with Windows Authentication that uses TCPIP and has MultiSubnetFailover enabled.<br>

#####  Example:  9 

```powershell
PS C:\> $connstring = New-DbaConnectionString sql2016 -ApplicationIntent ReadOnly
```

Creates a connection string with ReadOnly ApplicationIntent.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances.

| Property | Value |
| --- | --- |
| Alias | ServerInstance,SqlServer,Server,DataSource |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -Credential

Login to the target instance using alternative credentials. Accepts PowerShell credentials (Get-Credential).  
Windows Authentication, SQL Server Authentication, Active Directory - Password, and Active Directory - Integrated are all supported.  
For MFA support, please use Connect-DbaInstance. be it Windows or SQL Server. Windows users are determined by the existence of a backslash, so if you are intending to use an alternative Windows   
connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias | SqlCredential |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AccessToken

Specifies that Azure Active Directory access token authentication should be used. When specified, the connection string is configured for token-based authentication.  
Use this when connecting to Azure SQL with an access token you've obtained separately from Azure AD authentication flows.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ApplicationIntent

Specifies whether the application workload is read-only or read-write when connecting to an Always On availability group. Valid values are ReadOnly and ReadWrite.  
Use ReadOnly to connect to secondary replicas for reporting queries, which helps offload read traffic from the primary replica.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ReadOnly,ReadWrite |

##### -BatchSeparator

Sets the batch separator for SQL commands. Defaults to "GO" if not specified.  
Change this when working with tools or scripts that use different batch separators, or when "GO" conflicts with your SQL code.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClientName

Sets the application name that appears in SQL Server monitoring tools like Activity Monitor, Extended Events, and Profiler. Defaults to "dbatools PowerShell module - dbatools.io".  
Use a descriptive name when you need to identify specific scripts or applications in SQL Server logs and monitoring for troubleshooting or performance analysis.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | custom connection |

##### -ConnectTimeout

Sets the number of seconds to wait while attempting to establish a connection before timing out. Valid range is 0 to 2147483647.  
Increase this value for slow networks or when connecting to busy servers. Azure SQL Database connections automatically default to 30 seconds due to network latency considerations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Database

Specifies the initial database to connect to when the connection is established. Sets the Initial Catalog property in the connection string.  
Required for Azure SQL Database connections, and useful for ensuring connections start in the correct database context for your operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EncryptConnection

Forces SSL/TLS encryption for the connection to protect data in transit. Automatically enabled for Azure SQL Database connections.  
Enable this for connections over untrusted networks or when your security policy requires encrypted database connections. Requires proper SSL certificates when TrustServerCertificate is false.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.encrypt') |

##### -FailoverPartner

Specifies the failover partner server name for database mirroring configurations. Limited to 128 characters or less.  
Use this when connecting to databases configured with database mirroring to enable automatic failover if the primary server becomes unavailable. Requires the Database parameter to be specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IsActiveDirectoryUniversalAuth

Enables Azure Active Directory Universal Authentication with Multi-Factor Authentication (MFA) support for Azure SQL connections.  
Use this when connecting to Azure SQL Database or Managed Instance with accounts that require MFA or when using Azure AD guest accounts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LockTimeout

Sets the number of seconds to wait for locks to be released before timing out. Not supported in connection strings - this parameter generates a warning.  
This parameter is included for legacy compatibility but has no effect on the generated connection string.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxPoolSize

Sets the maximum number of connections allowed in the connection pool for this connection string. Defaults to 100 if not specified.  
Increase this value for applications with high concurrency requirements, or decrease it to limit resource usage on the SQL Server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MinPoolSize

Sets the minimum number of connections maintained in the connection pool for this connection string. Defaults to 0 if not specified.  
Set this to a higher value when you want to maintain warm connections for faster subsequent connection requests, especially for frequently accessed databases.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MultipleActiveResultSets

Enables Multiple Active Result Sets (MARS) allowing multiple commands to be executed simultaneously on a single connection.  
Enable this when your application needs to execute multiple queries concurrently on the same connection, such as reading from one result set while executing another query.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MultiSubnetFailover

Enables faster failover detection when connecting to Always On availability groups across different subnets.  
Use this when your availability group replicas are distributed across multiple subnets to reduce connection timeout during failover scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NetworkProtocol

Forces a specific network protocol for the connection. Valid values include TcpIp, NamedPipes, SharedMemory, and others.  
Use TcpIp for remote connections or NamedPipes for local connections when you need to override default protocol selection or troubleshoot connectivity issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | TcpIp,NamedPipes,Multiprotocol,AppleTalk,BanyanVines,Via,SharedMemory,NWLinkIpxSpx |

##### -NonPooledConnection

Disables connection pooling for this connection, creating a dedicated connection that isn't shared.  
Use this for long-running operations, debugging scenarios, or when you need to ensure complete isolation of the database connection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PacketSize

Sets the network packet size in bytes for communication with SQL Server. Must be between 512 and 32767 bytes.  
Increase this value for bulk operations or large result sets to improve performance, but ensure the server's network packet size setting can accommodate the specified value.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -PooledConnectionLifetime

Sets the maximum lifetime in seconds for pooled connections. Connections older than this value are destroyed when returned to the pool.  
Use this in clustered environments to force load balancing across cluster nodes or to ensure connections don't remain open indefinitely. Zero means no lifetime limit.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SqlExecutionModes

Controls how SQL commands are processed - immediately executed, captured for review, or both. Not supported in connection strings - this parameter generates a warning.  
This parameter is included for legacy compatibility but has no effect on the generated connection string.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | CaptureSql,ExecuteAndCaptureSql,ExecuteSql |

##### -StatementTimeout

Sets the number of seconds before SQL commands timeout. Not supported in connection strings - this parameter generates a warning.  
This parameter is included for legacy compatibility but has no effect on the generated connection string. Use the CommandTimeout property on SqlCommand objects instead.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -TrustServerCertificate

Bypasses SSL certificate validation when EncryptConnection is enabled. The connection will be encrypted but the server certificate won't be verified.  
Use this for development environments or when connecting to servers with self-signed certificates, but avoid in production due to security risks.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.trustcert') |

##### -WorkstationId

Sets the workstation identifier that appears in SQL Server system views and logs. Defaults to the local computer name if not specified.  
Use this to identify connections from specific machines or applications when monitoring SQL Server activity or troubleshooting connection issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Legacy

Forces the use of the older System.Data.SqlClient provider instead of the modern Microsoft.Data.SqlClient provider.  
Use this only when connecting to applications or tools that specifically require the legacy provider for compatibility reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AppendConnectionString

Adds custom connection string parameters to the generated connection string. Authentication parameters cannot be passed this way.  
Use this when you need to add specialized connection parameters like AttachDbFilename, User Instance, or custom driver-specific settings that aren't available through other parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
