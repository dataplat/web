---
title: "New-DbaConnectionStringBuilder"
slug: "New-DbaConnectionStringBuilder"
date: 2024-01-01
layout: "single"
author: "zippy1981 | Chrissy LeMaire (@cl)"
availability: "Windows, Linux, macOS"
synopsis: "Creates a SqlConnectionStringBuilder object for constructing properly formatted SQL Server connection strings"
tags:
  - "SqlBuild"
  - "ConnectionString"
  - "Connection"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaConnectionStringBuilder.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaConnectionStringBuilder"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>New-DbaConnectionStringBuilder</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/New-DbaConnectionStringBuilder.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>zippy1981 , Chrissy LeMaire (@cl)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

## Synopsis

Creates a SqlConnectionStringBuilder object for constructing properly formatted SQL Server connection strings

## Description

Creates a Microsoft.Data.SqlClient.SqlConnectionStringBuilder object from either an existing connection string or individual connection parameters. This allows you to programmatically build, modify, or validate connection strings without manually concatenating string values. The function handles authentication methods, encryption settings, connection pooling, and other SQL Server connection options, making it useful for scripts that need to connect to different SQL Server instances with varying configurations.

## Syntax

```powershell
New-DbaConnectionStringBuilder
    [[-ConnectionString] <String[]>]
    [[-ApplicationName] <String>]
    [[-DataSource] <String>]
    [[-SqlCredential] <PSCredential>]
    [[-InitialCatalog] <String>]
    [-IntegratedSecurity]
    [[-UserName] <String>]
    [[-Password] <String>]
    [-MultipleActiveResultSets]
    [[-ColumnEncryptionSetting] <String>]
    [-Legacy]
    [-NonPooledConnection]
    [[-WorkstationID] <String>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaConnectionStringBuilder
```
{: data-copyable="true" data-clean-code="New-DbaConnectionStringBuilder" }

Returns an empty ConnectionStringBuilder<br>

#####  Example:  2 

```powershell
PS C:\> "Data Source=localhost,1433;Initial Catalog=AlwaysEncryptedSample;UID=sa;PWD=alwaysB3Encrypt1ng;Application Name=Always Encrypted Sample MVC App;Column Encryption Setting=enabled" |
```
{: data-copyable="true" data-clean-code="&quot;Data Source=localhost,1433;Initial Catalog=AlwaysEncryptedSample;UID=sa;PWD=alwaysB3Encrypt1ng;Application Name=Always Encrypted Sample MVC App;Column Encryption Setting=enabled&quot; |" }

New-DbaConnectionStringBuilder<br>
Returns a connection string builder that can be used to connect to the local sql server instance on the default port.<br>

### Optional Parameters

##### -ConnectionString

Specifies an existing SQL Server connection string to use as the foundation for the builder object. The function will parse this string and populate the builder with its values.  
Use this when you need to modify or validate an existing connection string rather than building one from scratch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -ApplicationName

Sets the application name that identifies your script or application to SQL Server in monitoring tools and logs. Defaults to "dbatools Powershell Module".  
Useful for tracking connection sources in SQL Server's sys.dm_exec_sessions and activity monitor when troubleshooting performance or connection issues.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | dbatools Powershell Module |

##### -DataSource

Specifies the SQL Server instance name for the connection string. Can include server name, instance name, and port (e.g., "ServerName\InstanceName,1433").  
Use this to set or override the server target when building connection strings for different environments or instances.

| Property | Value |
| --- | --- |
| Alias | SqlInstance |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SqlCredential

Credential object used to connect to the SQL Server Instance as a different user. This can be a Windows or SQL Server account. Windows users are determined by the existence of a backslash, so if you   
are intending to use an alternative Windows connection instead of a SQL login, ensure it contains a backslash.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InitialCatalog

Sets the default database context for the connection. When specified, queries will execute in this database unless explicitly changed.  
Use this when your script needs to work with a specific database rather than connecting to the server's default database.

| Property | Value |
| --- | --- |
| Alias | Database |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -IntegratedSecurity

Enables Windows Authentication for the connection, using the current user's Windows credentials to authenticate to SQL Server.  
Use this when connecting to SQL Server instances configured for Windows Authentication mode or mixed mode with your current Windows account.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -UserName

Specifies the SQL Server login name for SQL Server Authentication. Cannot be used with SqlCredential parameter.  
Consider using SqlCredential parameter instead for better security as it avoids exposing credentials in plain text.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Password

Specifies the password for SQL Server Authentication when using the UserName parameter. Cannot be used with SqlCredential parameter.  
Consider using SqlCredential parameter instead for better security as it avoids exposing passwords in plain text or command history.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -MultipleActiveResultSets

Enables Multiple Active Result Sets (MARS) allowing multiple commands to be executed concurrently on a single connection.  
Use this when your script needs to execute overlapping commands or maintain multiple data readers on the same connection simultaneously.

| Property | Value |
| --- | --- |
| Alias | MARS |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -ColumnEncryptionSetting

Enables Always Encrypted functionality for the connection, allowing access to encrypted columns in SQL Server databases.  
Use this when connecting to databases with Always Encrypted columns that your application needs to decrypt and work with.

| Property | Value |
| --- | --- |
| Alias | AlwaysEncrypted |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Enabled |

##### -Legacy

Creates the connection string builder using the older System.Data.SqlClient library instead of the newer Microsoft.Data.SqlClient library.  
Use this only when working with legacy applications or frameworks that specifically require the older SQL Client library for compatibility.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -NonPooledConnection

Disables connection pooling, creating a dedicated connection that bypasses the connection pool. By default, connections are pooled for better performance.  
Use this for diagnostic scenarios or when you need to ensure complete connection isolation, though it may impact performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -WorkstationID

Sets the workstation identifier that appears in SQL Server logs and monitoring tools to identify the source computer. Defaults to the current computer name.  
Useful for tracking connections by source machine in sys.dm_exec_sessions or when troubleshooting connection issues in multi-server environments.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | $env:COMPUTERNAME |

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
