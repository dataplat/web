---
title: "Copy-DbaEndpoint"
slug: "Copy-DbaEndpoint"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Copies SQL Server endpoints from source instance to destination instances for migration scenarios."
tags:
  - "Migration"
  - "Endpoint"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaEndpoint.ps1"
bohUrl: "https://dataplat.github.io/boh#Copy-DbaEndpoint"
draft: false
---

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Copy-DbaEndpoint</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaEndpoint.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
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

Copies SQL Server endpoints from source instance to destination instances for migration scenarios.

## Description

Migrates user-defined endpoints (excluding system endpoints) from a source SQL Server to one or more destination servers. This includes Service Broker, Database Mirroring, and Availability Group endpoints that are essential for high availability configurations.  
  
Existing endpoints on the destination are skipped by default to prevent conflicts, but can be overwritten using the -Force parameter. The function scripts the complete endpoint definition from the source and recreates it on each destination server.

## Syntax

```powershell
Copy-DbaEndpoint
    [-Source] <DbaInstanceParameter>
    [[-SourceSqlCredential] <PSCredential>]
    [-Destination] <DbaInstanceParameter[]>
    [[-DestinationSqlCredential] <PSCredential>]
    [[-Endpoint] <Object[]>]
    [[-ExcludeEndpoint] <Object[]>]
    [-Force]
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
PS C:\> Copy-DbaEndpoint -Source sqlserver2014a -Destination sqlcluster
```
{: data-copyable="true" data-clean-code="Copy-DbaEndpoint -Source sqlserver2014a -Destination sqlcluster" }

Copies all server endpoints from sqlserver2014a to sqlcluster, using Windows credentials. If endpoints with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaEndpoint -Source sqlserver2014a -SourceSqlCredential $cred -Destination sqlcluster -Endpoint tg_noDbDrop -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaEndpoint -Source sqlserver2014a -SourceSqlCredential $cred -Destination sqlcluster -Endpoint tg_noDbDrop -Force" }

Copies only the tg_noDbDrop endpoint from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If an endpoint with the same name exists on <br>
sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaEndpoint -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```
{: data-copyable="true" data-clean-code="Copy-DbaEndpoint -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force" }

Shows what would happen if the command were executed using force.<br>

### Required Parameters

##### -Source

Specifies the source SQL Server instance containing endpoints to copy. Must have sysadmin access to enumerate and script endpoint definitions.  
Use this to identify the server containing Service Broker, Database Mirroring, or Availability Group endpoints needed on other instances.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Destination

Specifies one or more destination SQL Server instances where endpoints will be created. Must have sysadmin access to create endpoint objects.  
Use this to deploy endpoints across multiple servers in Always On configurations or Service Broker scenarios requiring identical endpoint definitions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -SourceSqlCredential

Specifies alternative credentials for connecting to the source SQL Server instance. Required when Windows Authentication is not available or sufficient.  
Use this when the source server requires SQL authentication or when running under a service account that lacks access to the source instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DestinationSqlCredential

Specifies alternative credentials for connecting to destination SQL Server instances. Applied to all destination servers when Windows Authentication is insufficient.  
Use this when destination servers require SQL authentication or when deploying endpoints across environments with different security contexts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Endpoint

Specifies which endpoints to copy from the source instance. Accepts endpoint names and supports wildcards for pattern matching.  
Use this when you need to migrate specific endpoints like Database Mirroring or Service Broker endpoints rather than copying all user-defined endpoints.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeEndpoint

Specifies which endpoints to skip during the copy operation. Takes precedence over the Endpoint parameter when both are specified.  
Use this to exclude problematic or environment-specific endpoints while copying most other endpoints from the source instance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Force

Drops and recreates existing endpoints on destination instances when name conflicts occur. By default, existing endpoints are skipped to prevent disruption.  
Use this when updating endpoint configurations or when you need to overwrite outdated endpoint definitions on destination servers.

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
