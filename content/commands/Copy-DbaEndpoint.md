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

# Copy-DbaEndpoint

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Copy-DbaEndpoint](https://github.com/dataplat/dbatools/blob/master/public/Copy-DbaEndpoint.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Copy-DbaEndpoint](https://dataplat.github.io/boh#Copy-DbaEndpoint).

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

Copies all server endpoints from sqlserver2014a to sqlcluster, using Windows credentials. If endpoints with the same name exist on sqlcluster, they will be skipped.<br>

#####  Example:  2 

```powershell
PS C:\> Copy-DbaEndpoint -Source sqlserver2014a -SourceSqlCredential $cred -Destination sqlcluster -Endpoint tg_noDbDrop -Force
```

Copies only the tg_noDbDrop endpoint from sqlserver2014a to sqlcluster using SQL credentials for sqlserver2014a and Windows credentials for sqlcluster. If an endpoint with the same name exists on <br>
sqlcluster, it will be dropped and recreated because -Force was used.<br>

#####  Example:  3 

```powershell
PS C:\> Copy-DbaEndpoint -Source sqlserver2014a -Destination sqlcluster -WhatIf -Force
```

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
