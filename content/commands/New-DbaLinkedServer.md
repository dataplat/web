---
title: "New-DbaLinkedServer"
slug: "New-DbaLinkedServer"
date: 2024-01-01
layout: "single"
author: "Adam Lancaster, github.com/lancasteradam"
availability: "Windows, Linux, macOS"
synopsis: "Creates a new linked server connection to remote SQL Server instances or heterogeneous data sources."
tags:
  - "LinkedServer"
  - "Server"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaLinkedServer.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaLinkedServer"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaLinkedServer</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaLinkedServer.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Adam Lancaster, github.com/lancasteradam</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates a new linked server connection to remote SQL Server instances or heterogeneous data sources.

## Description

Creates a new linked server on a SQL Server instance, allowing you to query remote databases and heterogeneous data sources as if they were local tables. This replaces the need to manually configure linked servers through SSMS or T-SQL scripts, while providing consistent security context management for unmapped logins. The function uses SMO to create the linked server definition and automatically configures the default security mapping based on your specified security context.

## Syntax

```powershell
New-DbaLinkedServer
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-SqlCredential] <PSCredential>]
    [[-LinkedServer] <String>]
    [[-ServerProduct] <String>]
    [[-Provider] <String>]
    [[-DataSource] <String>]
    [[-Location] <String>]
    [[-ProviderString] <String>]
    [[-Catalog] <String>]
    [[-SecurityContext] <String>]
    [[-SecurityContextRemoteUser] <String>]
    [[-SecurityContextRemoteUserPassword] <SecureString>]
    [[-InputObject] <Server[]>]
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
PS C:\> New-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02
```
{: data-copyable="true" data-clean-code="New-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02" }

Creates a new linked server named linkedServer1 on the sql01 instance. The link is via the SQL Native Client and is connected to the sql02 instance.<br>

#####  Example:  2 

```powershell
PS C:\> Connect-DbaInstance -SqlInstance sql01 | New-DbaLinkedServer -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02
```
{: data-copyable="true" data-clean-code="Connect-DbaInstance -SqlInstance sql01 | New-DbaLinkedServer -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02" }

Creates a new linked server named linkedServer1 on the sql01 instance. The link is via the SQL Native Client and is connected to the sql02 instance. The sql01 instance is passed in via pipeline.<br>

#####  Example:  3 

```powershell
PS C:\> New-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02 -SecurityContext CurrentSecurityContext
```
{: data-copyable="true" data-clean-code="New-DbaLinkedServer -SqlInstance sql01 -LinkedServer linkedServer1 -ServerProduct mssql -Provider sqlncli -DataSource sql02 -SecurityContext CurrentSecurityContext" }

Creates a new linked server named linkedServer1 on the sql01 instance. The link is via the SQL Native Client and is connected to the sql02 instance. Connections with logins that are not explicitly <br>
mapped to the remote server will use the current login's security context.<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. This can be a collection and receive pipeline input to allow the function  
to be executed against multiple SQL Server instances.

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

##### -LinkedServer

Specifies the name for the new linked server object in SQL Server. This name must be unique on the SQL Server instance.  
Use a descriptive name that identifies the remote data source or its purpose to help other DBAs understand the connection.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ServerProduct

Specifies the product name of the remote data source as it appears in sys.servers.product column.  
Common values include 'SQL Server' for SQL Server instances, 'Oracle' for Oracle databases, or custom names for other OLE DB data sources.  
This is primarily used for documentation and identification purposes in system views.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Provider

Specifies the OLE DB provider used to connect to the remote data source.  
Common providers include 'SQLNCLI' or 'MSOLEDBSQL' for SQL Server, 'OraOLEDB.Oracle' for Oracle, or 'Microsoft.ACE.OLEDB.12.0' for Access databases.  
The provider must be installed and registered on the SQL Server instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DataSource

Specifies the network name or connection string for the remote data source.  
For SQL Server instances, this is typically the server name or server\instance format.  
For other data sources, this could be a TNS name for Oracle or a file path for file-based sources.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Location

Specifies the physical location information for the data source, typically used for documentation purposes.  
This parameter is rarely required for most linked server configurations and is primarily used with specific OLE DB providers.  
Leave empty unless specifically required by your data source provider.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ProviderString

Specifies additional connection properties passed directly to the OLE DB provider.  
Use this for provider-specific settings like connection pooling, timeouts, or authentication options that cannot be set through other parameters.  
The format and available options depend on the specific OLE DB provider being used.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Catalog

Specifies the default database or catalog name to use when connecting to the remote data source.  
For SQL Server linked servers, this sets the default database context for queries that don't specify a database name.  
This is equivalent to the 'Initial Catalog' connection property in connection strings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurityContext

Specifies the security context option found on the SSMS Security tab of the linked server. This is a separate configuration from the mapping of a local login to a remote login. It specifies the   
connection behavior for a login that is not explicitly mapped. 'NoConnection' means that a connection will not be made. 'WithoutSecurityContext' means the connection will be made without using a   
security context. 'CurrentSecurityContext' means the connection will be made using the login's current security context. 'SpecifiedSecurityContext' means the specified username and password will be   
used. The default value is 'WithoutSecurityContext'. For more details see the Microsoft documentation for sp_addlinkedsrvlogin and also review the SSMS Security tab of the linked server.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | WithoutSecurityContext |
| Accepted Values | NoConnection,WithoutSecurityContext,CurrentSecurityContext,SpecifiedSecurityContext |

##### -SecurityContextRemoteUser

Specifies the remote login name. This param is used when SecurityContext is set to SpecifiedSecurityContext. To map a local login to a remote login use New-DbaLinkedServerLogin.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SecurityContextRemoteUserPassword

Specifies the remote login password. This param is used when SecurityContext is set to SpecifiedSecurityContext. To map a local login to a remote login use New-DbaLinkedServerLogin. NOTE: passwords   
are sent to the SQL Server instance in plain text. Check with your security administrator before using this parameter.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject

Accepts SQL Server SMO objects from the pipeline, typically from Connect-DbaInstance.  
This allows you to create linked servers on multiple instances by piping server connections to this function.  
Use this when you need to create the same linked server configuration across multiple SQL Server instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
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

Shows what would happen if the command were to run. No actions are actually performed.

| Property | Value |
| --- | --- |
| Alias | wi |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Confirm

Prompts you for confirmation before executing any changing operations within the command.

| Property | Value |
| --- | --- |
| Alias | cf |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
