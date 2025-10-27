---
title: "Set-DbatoolsInsecureConnection"
slug: "Set-DbatoolsInsecureConnection"
date: 2024-01-01
layout: "single"
availability: "Windows, Linux, macOS"
synopsis: "Reverts SQL Server connection security defaults to disable encryption and trust all certificates"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsInsecureConnection.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbatoolsInsecureConnection"
draft: false
---

# Set-DbatoolsInsecureConnection

| Property | Value |
| --- | --- |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbatoolsInsecureConnection](https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsInsecureConnection.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbatoolsInsecureConnection](https://dataplat.github.io/boh#Set-DbatoolsInsecureConnection).

## Synopsis

Reverts SQL Server connection security defaults to disable encryption and trust all certificates

## Description

Microsoft changed the default connection settings in SQL Server client libraries to require encryption and validate certificates, which can break existing dbatools scripts and connections in development environments. This function reverts those security defaults by configuring dbatools to trust all server certificates and disable encryption requirements.  
  
The function sets two key dbatools configuration values: sql.connection.trustcert (true) and sql.connection.encrypt (false). By default, these settings persist across PowerShell sessions, but you can use -SessionOnly to apply them temporarily.  
  
This is particularly useful when working with development servers, self-signed certificates, or legacy environments where the new security defaults cause connection failures.  
  
You can read more here: https://dbatools.io/newdefaults

## Syntax

```powershell
Set-DbatoolsInsecureConnection
    [-SessionOnly]
    [[-Scope] {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [-Register]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbatoolsInsecureConnection
```

Sets the default connection settings to trust all server certificates and not require encrypted connections.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbatoolsInsecureConnection -SessionOnly
```

Sets the default connection settings to trust all server certificates and not require encrypted connections.<br>
Does not persist across sessions so the default will return if you close and reopen PowerShell.<br>

### Optional Parameters

##### -SessionOnly

Applies the insecure connection settings only to the current PowerShell session instead of persisting them permanently.  
Use this when testing connection settings or when you need insecure connections temporarily without changing your permanent dbatools configuration.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -Scope

Specifies where to store the persistent connection settings when SessionOnly is not used. Defaults to UserDefault.  
UserDefault applies to the current user only, while SystemDefault applies to all users on the machine.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UserDefault |

##### -Register

This parameter is deprecated and will be removed in a future release.  
The function now automatically handles registration of settings when SessionOnly is not specified.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
