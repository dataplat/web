---
title: "Connect-DbaInstance"
slug: "Connect-DbaInstance"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a persistent SQL Server Management Object (SMO) connection for database operations."
tags:
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Connect-DbaInstance.ps1"
bohUrl: "https://dataplat.github.io/boh#Connect-DbaInstance"
draft: false
---

# Connect-DbaInstance

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Connect-DbaInstance](https://github.com/dataplat/dbatools/blob/master/public/Connect-DbaInstance.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Connect-DbaInstance](https://dataplat.github.io/boh#Connect-DbaInstance).

## Synopsis

Creates a persistent SQL Server Management Object (SMO) connection for database operations.

## Description

This command creates a reusable SQL Server Management Object (SMO) that serves as the foundation for most dbatools operations. Think of it as your entry point for connecting to SQL Server instances, whether on-premises, in Azure, or anywhere else.  
  
The returned SMO server object handles authentication automatically, detecting whether to use Windows integrated security, SQL authentication, or Azure Active Directory based on your credentials. It supports connection pooling by default for better performance and can handle complex scenarios like failover partners, dedicated admin connections, and multi-subnet environments.  
  
This is the connection object you'll pass to other dbatools commands like Get-DbaDatabase, Invoke-DbaQuery, or Backup-DbaDatabase. Rather than each command establishing its own connection, you create one persistent connection here and reuse it, which is both faster and more reliable.  
  
The connection includes helpful properties for scripting like ComputerName, IsAzure, and ConnectedAs, plus it automatically sets an identifiable ApplicationName in your connection string so you can track dbatools sessions in profiler or extended events.  
  
For Azure connections, it handles the various authentication methods including service principals, managed identities, and access tokens. For on-premises instances, it supports Windows authentication (including alternative credentials), SQL logins, and dedicated administrator connections for emergency access.  
  
Reference documentation:  
https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.connectionstring.aspx  
https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnectionstringbuilder.aspx  
https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlconnection.aspx  
  
To execute SQL commands directly: $server.ConnectionContext.ExecuteReader($sql) or $server.Databases['master'].ExecuteNonQuery($sql)

## Syntax

```powershell
Connect-DbaInstance
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [[-Database] <String>]
    [[-ApplicationIntent] <String>]
    [-AzureUnsupported]
    [[-BatchSeparator] <String>]
    [[-ClientName] <String>]
    [[-ConnectTimeout] <Int32>]
    [-EncryptConnection]
    [[-FailoverPartner] <String>]
    [[-LockTimeout] <Int32>]
    [[-MaxPoolSize] <Int32>]
    [[-MinPoolSize] <Int32>]
    [[-MinimumVersion] <Int32>]
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
    [-AlwaysEncrypted]
    [[-AppendConnectionString] <String>]
    [-SqlConnectionOnly]
    [[-AzureDomain] <String>]
    [[-Tenant] <String>]
    [[-AccessToken] <PSObject>]
    [-DedicatedAdminConnection]
    [-DisableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance sql2014
```

Creates an SMO Server object that connects using Windows Authentication<br>

#####  Example:  2 

```powershell
PS C:\> $wincred = Get-Credential ad\sqladmin
PS C:\> Connect-DbaInstance -SqlInstance sql2014 -SqlCredential $wincred
```

Creates an SMO Server object that connects using alternative Windows credentials<br>

#####  Example:  3 

```powershell
PS C:\> $sqlcred = Get-Credential sqladmin
PS C:\> $server = Connect-DbaInstance -SqlInstance sql2014 -SqlCredential $sqlcred
```

Login to sql2014 as SQL login sqladmin.<br>

#####  Example:  4 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance sql2014 -ClientName "my connection"
```

Creates an SMO Server object that connects using Windows Authentication and uses the client name "my connection".<br>
So when you open up profiler or use extended events, you can search for "my connection".<br>

#####  Example:  5 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance sql2014 -AppendConnectionString "Packet Size=4096;AttachDbFilename=C:\MyFolder\MyDataFile.mdf;User Instance=true;"
```

Creates an SMO Server object that connects to sql2014 using Windows Authentication, then it sets the packet size (this can also be done via -PacketSize) and other connection attributes.<br>

#####  Example:  6 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance sql2014 -NetworkProtocol TcpIp -MultiSubnetFailover
```

Creates an SMO Server object that connects using Windows Authentication that uses TCP/IP and has MultiSubnetFailover enabled.<br>

#####  Example:  7 

```powershell
PS C:\> $server = Connect-DbaInstance sql2016 -ApplicationIntent ReadOnly
```

Connects with ReadOnly ApplicationIntent.<br>

#####  Example:  8 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance myserver.database.windows.net -Database mydb -SqlCredential me@mydomain.onmicrosoft.com -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Logs into Azure SQL DB using AAD / Azure Active Directory, then performs a sample query.<br>

#####  Example:  9 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -Database dbatools -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Logs into Azure SQL DB using AAD Integrated Auth, then performs a sample query.<br>

#####  Example:  10 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance "myserver.public.cust123.database.windows.net,3342" -Database mydb -SqlCredential me@mydomain.onmicrosoft.com -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Logs into Azure SQL Managed instance using AAD / Azure Active Directory, then performs a sample query.<br>

#####  Example:  11 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance db.mycustomazure.com -Database mydb -AzureDomain mycustomazure.com -DisableException
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

In the event your AzureSqlDb is not on a database.windows.net domain, you can set a custom domain using the AzureDomain parameter.<br>
This tells Connect-DbaInstance to login to the database using the method that works best with Azure.<br>

#####  Example:  12 

```powershell
PS C:\> $connstring = "Data Source=TCP:mydb.database.windows.net,1433;User ID=sqladmin;Password=adfasdf;Connect Timeout=30;"
PS C:\> $server = Connect-DbaInstance -ConnectionString $connstring
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Logs into Azure using a preconstructed connstring, then performs a sample query.<br>
ConnectionString is an alias of SqlInstance, so you can use -SqlInstance $connstring as well.<br>

#####  Example:  13 

```powershell
PS C:\> $cred = Get-Credential guid-app-id-here # appid for username, clientsecret for password
PS C:\> $server = Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -Database abc -SqlCredential $cred -Tenant guidheremaybename
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

When connecting from a non-Azure workstation, logs into Azure using Universal with MFA Support with a username and password, then performs a sample query.<br>
Note that generating access tokens is not supported on Core, so when using Tenant on Core, we rewrite the connection string with Active Directory Service Principal authentication instead.<br>

#####  Example:  14 

```powershell
PS C:\> $cred = Get-Credential guid-app-id-here # appid for username, clientsecret for password
PS C:\> Set-DbatoolsConfig -FullName azure.tenantid -Value 'guidheremaybename' -Passthru | Register-DbatoolsConfig
PS C:\> Set-DbatoolsConfig -FullName azure.appid -Value $cred.Username -Passthru | Register-DbatoolsConfig
PS C:\> Set-DbatoolsConfig -FullName azure.clientsecret -Value $cred.Password -Passthru | Register-DbatoolsConfig # requires securestring
PS C:\> Set-DbatoolsConfig -FullName sql.connection.database -Value abc -Passthru | Register-DbatoolsConfig
PS C:\> Connect-DbaInstance -SqlInstance psdbatools.database.windows.net
```

Permanently sets some app id config values. To set them temporarily (just for a session), remove -Passthru | Register-DbatoolsConfig<br>
When connecting from a non-Azure workstation or an Azure VM without .NET 4.7.2 and higher, logs into Azure using Universal with MFA Support, then performs a sample query.<br>

#####  Example:  15 

```powershell
PS C:\> $azureCredential = Get-Credential -Message 'Azure Credential'
PS C:\> $azureAccount = Connect-AzAccount -Credential $azureCredential
PS C:\> $azureToken = Get-AzAccessToken -ResourceUrl https://database.windows.net
PS C:\> $azureInstance = "YOURSERVER.database.windows.net"
PS C:\> $azureDatabase = "MYDATABASE"
PS C:\> $server = Connect-DbaInstance -SqlInstance $azureInstance -Database $azureDatabase -AccessToken $azureToken
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Connect to an Azure SQL Database or an Azure SQL Managed Instance with an AccessToken.<br>
Works with both Azure PowerShell v13 (string tokens) and v14+ (SecureString tokens).<br>
Note that the token is valid for only one hour and cannot be renewed automatically.<br>

#####  Example:  16 

```powershell
PS C:\> # Azure PowerShell v14+ with SecureString token support
PS C:\> Connect-AzAccount
PS C:\> $azureToken = (Get-AzAccessToken -ResourceUrl https://database.windows.net).Token
PS C:\> $azureInstance = "YOUR-AZURE-SQL-MANAGED-INSTANCE.database.windows.net"
PS C:\> $server = Connect-DbaInstance -SqlInstance $azureInstance -Database "YOURDATABASE" -AccessToken $azureToken
PS C:\> Invoke-DbaQuery -SqlInstance $server -Query "select 1 as test"
```

Connect to an Azure SQL Managed Instance using Azure PowerShell v14+ where Get-AzAccessToken returns a SecureString.<br>
The function automatically detects and converts the SecureString token to the required format.<br>

#####  Example:  17 

```powershell
PS C:\> $token = New-DbaAzAccessToken -Type RenewableServicePrincipal -Subtype AzureSqlDb -Tenant $tenantid -Credential $cred
PS C:\> Connect-DbaInstance -SqlInstance sample.database.windows.net -Accesstoken $token
```

Uses dbatools to generate the access token for an Azure SQL Database, then logs in using that AccessToken.<br>

#####  Example:  18 

```powershell
PS C:\> $server = Connect-DbaInstance -SqlInstance srv1 -DedicatedAdminConnection
PS C:\> $dbaProcess = Get-DbaProcess -SqlInstance $server -ExcludeSystemSpids
PS C:\> $killedProcess = $dbaProcess | Out-GridView -OutputMode Multiple | Stop-DbaProcess
PS C:\> $server | Disconnect-DbaInstance
```

Creates a dedicated admin connection (DAC) to the default instance on server srv1.<br>
Receives all non-system processes from the instance using the DAC.<br>
Opens a grid view to let the user select processes to be stopped.<br>
Closes the connection.<br>

### Required Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function to be executed against multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias | Connstring,ConnectionString |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -SqlCredential

Credential object used to connect to the SQL Server Instance as a different user. This can be a Windows or SQL Server account. Windows users are determined by the existence of a backslash, so if you   
are intending to use an alternative Windows connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Database

Specifies the initial database context for the connection instead of connecting to the default database.  
Useful when you need to connect directly to a specific database or when the login's default database is unavailable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.database') |

##### -ApplicationIntent

Declares the application workload type when connecting to an Always On Availability Group.  
Use "ReadOnly" to route connections to readable secondary replicas for reporting workloads, reducing load on the primary replica.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | ReadOnly,ReadWrite |

##### -AzureUnsupported

Causes the connection to fail if the target is detected as Azure SQL Database.  
Use this to prevent operations that are incompatible with Azure SQL Database from attempting to connect to cloud instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -BatchSeparator

Sets the batch separator for multi-statement SQL execution, defaulting to "GO".  
Change this when working with scripts that use different batch separators or when "GO" conflicts with your SQL content.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ClientName

Sets a custom application name in the connection string for identification in SQL Server monitoring tools.  
Use this to distinguish dbatools sessions from other applications when analyzing connections in Profiler, Extended Events, or sys.dm_exec_sessions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.clientname') |

##### -ConnectTimeout

Sets the connection timeout in seconds before the connection attempt fails.  
Increase this for slow networks or busy servers, or decrease it for faster failure detection in automated scripts. Azure SQL Database connections typically need 30 seconds.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | ([Dataplat.Dbatools.Connection.ConnectionHost]::SqlConnectionTimeout) |

##### -EncryptConnection

Forces SSL encryption for all data transmitted between client and server.  
Required for many compliance scenarios and recommended for connections over untrusted networks. Ensure server certificates are properly configured to avoid connection failures.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.encrypt') |

##### -FailoverPartner

Specifies the failover partner server name for database mirroring configurations.  
Use this when connecting to databases configured for database mirroring to enable automatic failover if the primary server becomes unavailable.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -LockTimeout

Sets the lock timeout in seconds for transactions on this connection.  
Use this to control how long statements wait for locks before timing out, which helps prevent long-running blocking scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MaxPoolSize

Sets the maximum number of connections allowed in the connection pool for this connection string.  
Increase this for applications with high concurrency requirements, but be mindful of server resource limits and licensing constraints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MinPoolSize

Sets the minimum number of connections maintained in the connection pool for this connection string.  
Use this to pre-warm the connection pool for better performance when you know connections will be used frequently.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MinimumVersion

Specifies the minimum SQL Server version required for the connection to succeed.  
Use this to ensure scripts only run against SQL Server versions that support the required features, preventing compatibility issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -MultipleActiveResultSets

Enables Multiple Active Result Sets (MARS) allowing multiple commands to be executed simultaneously on a single connection.  
Use this when you need to execute multiple queries concurrently without opening additional connections, though it can impact performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -MultiSubnetFailover

Enables faster detection and connection to the active server in Always On Availability Groups across multiple subnets.  
Essential for AG configurations where replicas are in different subnets, reducing connection time during failover scenarios.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.multisubnetfailover') |

##### -NetworkProtocol

Specifies the network protocol for connecting to SQL Server.  
Use "TcpIp" for remote connections, "NamedPipes" for local connections with better security, or "SharedMemory" for fastest local connections. Most modern environments use TcpIp.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.protocol') |
| Accepted Values | TcpIp,NamedPipes,Multiprotocol,AppleTalk,BanyanVines,Via,SharedMemory,NWLinkIpxSpx |

##### -NonPooledConnection

Creates a dedicated connection that bypasses connection pooling.  
Use this for long-running operations, dedicated admin connections, or when you need to ensure the connection isn't shared with other processes.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -PacketSize

Sets the network packet size in bytes for communication with SQL Server.  
Increase from the default 4096 bytes to improve performance for large data transfers, but ensure the server is configured to support the same packet size.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.packetsize') |

##### -PooledConnectionLifetime

Sets the maximum lifetime in seconds for pooled connections before they're discarded and recreated.  
Use this in clustered environments to force load balancing or to refresh connections periodically. Zero means unlimited lifetime.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SqlExecutionModes

Controls how SQL commands are processed by the connection.  
Use "CaptureSql" to generate scripts without execution, "ExecuteAndCaptureSql" to both execute and log commands, or "ExecuteSql" for normal execution.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | CaptureSql,ExecuteAndCaptureSql,ExecuteSql |

##### -StatementTimeout

Sets the timeout in seconds for SQL statement execution before canceling the command.  
Use this to prevent runaway queries from blocking operations indefinitely. Zero means unlimited, but set reasonable limits for production environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.execution.timeout') |

##### -TrustServerCertificate

Bypasses certificate validation when using encrypted connections.  
Use this for development environments or when connecting to servers with self-signed certificates, but avoid in production for security reasons.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'sql.connection.trustcert') |

##### -WorkstationId

Sets the workstation name visible in SQL Server monitoring and session information.  
Use this to identify the source of connections in sys.dm_exec_sessions or when troubleshooting connection issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -AlwaysEncrypted

Enables Always Encrypted support for accessing encrypted columns in databases with column-level encryption.  
Required when working with sensitive data protected by Always Encrypted, allowing proper decryption of encrypted column values.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AppendConnectionString

Adds custom connection string parameters to the generated connection string.  
Use this for advanced connection properties like custom timeout values, SSL settings, or application-specific parameters that aren't covered by other parameters.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlConnectionOnly

Returns only a SqlConnection object instead of the full SMO server object.  
Use this when you only need basic connection functionality and want to reduce memory overhead or avoid SMO initialization.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -AzureDomain

Specifies the domain for Azure SQL Database connections, defaulting to database.windows.net.  
Use this when connecting to Azure SQL instances in sovereign clouds or custom domains that require different authentication methods.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | database.windows.net |

##### -Tenant

Specifies the Azure Active Directory tenant ID for Azure SQL Database authentication.  
Required when using service principal authentication or when your account exists in multiple Azure AD tenants.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | (Get-DbatoolsConfigValue -FullName 'azure.tenantid') |

##### -AccessToken

Authenticates to Azure SQL Database using an access token generated by Get-AzAccessToken or New-DbaAzAccessToken.  
Use this for service principal authentication or when integrating with Azure automation that provides pre-generated tokens. Tokens expire after one hour and cannot be renewed.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DedicatedAdminConnection

Creates a dedicated administrator connection (DAC) for emergency access to SQL Server.  
Use this when SQL Server is unresponsive to regular connections, allowing you to diagnose and resolve critical issues. Remember to manually disconnect the connection when finished.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -DisableException

Changes exception handling from throwing errors to displaying warnings.  
Use this in interactive sessions where you want graceful error handling instead of script-stopping exceptions, which is the default behavior for this command.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
