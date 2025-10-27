---
title: "Remove-DbaNetworkCertificate"
slug: "Remove-DbaNetworkCertificate"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Removes the SSL certificate configuration from SQL Server network encryption settings"
tags:
  - "Certificate"
  - "Security"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaNetworkCertificate.ps1"
bohUrl: "https://dataplat.github.io/boh#Remove-DbaNetworkCertificate"
draft: false
---

# Remove-DbaNetworkCertificate

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Remove-DbaNetworkCertificate](https://github.com/dataplat/dbatools/blob/master/public/Remove-DbaNetworkCertificate.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Remove-DbaNetworkCertificate](https://dataplat.github.io/boh#Remove-DbaNetworkCertificate).

## Synopsis

Removes the SSL certificate configuration from SQL Server network encryption settings

## Description

Removes the certificate thumbprint from SQL Server's network encryption configuration by clearing the Certificate registry value in SuperSocketNetLib. This disables forced SSL encryption for client connections and returns the instance to unencrypted or optional encryption mode. Use this when decommissioning certificates, troubleshooting SSL connection issues, or when you need to reconfigure encryption settings from scratch.

## Syntax

```powershell
Remove-DbaNetworkCertificate
    [[-SqlInstance] <DbaInstanceParameter[]>]
    [[-Credential] <PSCredential>]
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
PS C:\> Remove-DbaNetworkCertificate
```

Removes the Network Certificate for the default instance (MSSQLSERVER) on localhost<br>

#####  Example:  2 

```powershell
PS C:\> Remove-DbaNetworkCertificate -SqlInstance sql1\SQL2008R2SP2
```

Removes the Network Certificate for the SQL2008R2SP2 instance on sql1<br>

#####  Example:  3 

```powershell
PS C:\> Remove-DbaNetworkCertificate -SqlInstance localhost\SQL2008R2SP2 -WhatIf
```

Shows what would happen if the command were run<br>

### Optional Parameters

##### -SqlInstance

The target SQL Server instance or instances. Defaults to localhost. If target is a cluster, you must also specify InstanceClusterName (see below)

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Windows credentials for accessing the target computer's registry and WMI services. This is used for computer-level authentication, not SQL Server authentication.  
Required when the current user lacks administrative privileges on the target server or when running against remote servers in different domains.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
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
