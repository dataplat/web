---
title: "Set-DbatoolsPath"
slug: "Set-DbatoolsPath"
date: 2024-01-01
layout: "single"
availability: "Windows, Linux, macOS"
synopsis: "Configures or updates a path under a name."
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsPath.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbatoolsPath"
draft: false
---

# Set-DbatoolsPath

| Property | Value |
| --- | --- |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbatoolsPath](https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsPath.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbatoolsPath](https://dataplat.github.io/boh#Set-DbatoolsPath).

## Synopsis

Configures or updates a path under a name.

## Description

Configures or updates a path under a name.  
The path can be persisted using the "-Register" command.  
Paths setup like this can be retrieved using Get-DbatoolsPath.

## Syntax

```powershell
Set-DbatoolsPath -Name <String> -Path <String>
    [<CommonParameters>]

Set-DbatoolsPath -Name <String> -Path <String> -Register
    [-Scope {UserDefault | UserMandatory | SystemDefault | SystemMandatory | FileUserLocal | FileUserShared | FileSystem}]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Set-DbatoolsPath -Name 'temp' -Path 'C:\temp'
```

Configures C:\temp as the current temp path. (does not override $Env:TEMP !)<br>

### Required Parameters

##### -Name

Specifies the alias name to associate with the path for easy retrieval.  
Use descriptive names like 'backups', 'scripts', or 'logs' to organize commonly used directory paths.  
The name can be referenced later with Get-DbatoolsPath to quickly access the stored path.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Path

Specifies the directory path to store under the given name.  
Can be any valid file system path including network shares and mapped drives.  
Use this to centralize path management for backup locations, script directories, or output folders.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Register

Persists the path configuration across PowerShell sessions and module reloads.  
Without this switch, the path mapping only exists for the current session.  
Essential when setting up permanent path aliases for team environments or automated scripts.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value | False |

### Optional Parameters

##### -Scope

Determines where the persistent configuration is stored when using -Register.  
UserDefault stores the setting for the current user only, while other scopes affect system-wide or module-level settings.  
Choose the appropriate scope based on whether the path should be available to all users or just the current user.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | UserDefault |


&nbsp;
