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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Set-DbatoolsInsecureConnection</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsInsecureConnection.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Set-DbatoolsInsecureConnection" }

Sets the default connection settings to trust all server certificates and not require encrypted connections.<br>

#####  Example:  2 

```powershell
PS C:\> Set-DbatoolsInsecureConnection -SessionOnly
```
{: data-copyable="true" data-clean-code="Set-DbatoolsInsecureConnection -SessionOnly" }

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
