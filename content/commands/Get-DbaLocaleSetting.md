---
title: "Get-DbaLocaleSetting"
slug: "Get-DbaLocaleSetting"
date: 2024-01-01
layout: "single"
author: "Klaas Vandenberghe (@PowerDBAKlaas)"
availability: "Windows, Linux, macOS"
synopsis: "Retrieves Windows locale settings from the registry on SQL Server computers for regional configuration analysis."
tags:
  - "Management"
  - "Locale"
  - "OS"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLocaleSetting.ps1"
bohUrl: "https://dataplat.github.io/boh#Get-DbaLocaleSetting"
draft: false
---

# Get-DbaLocaleSetting

| Property | Value |
| --- | --- |
| **Author** | Klaas Vandenberghe (@PowerDBAKlaas) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Get-DbaLocaleSetting](https://github.com/dataplat/dbatools/blob/master/public/Get-DbaLocaleSetting.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Get-DbaLocaleSetting](https://dataplat.github.io/boh#Get-DbaLocaleSetting).

## Synopsis

Retrieves Windows locale settings from the registry on SQL Server computers for regional configuration analysis.

## Description

Retrieves Windows locale settings from the Control Panel\International registry key on one or more computers. These settings directly impact SQL Server's date/time formatting, currency display, number formatting, and collation behavior.  
  
Useful for auditing regional configurations across your SQL Server environment, troubleshooting locale-related issues, or ensuring consistent settings before SQL Server installations. The function accesses the current user's locale settings from HKEY_CURRENT_USER\Control Panel\International.  
  
Requires Local Admin rights on destination computer(s).

## Syntax

```powershell
Get-DbaLocaleSetting
    [[-ComputerName] <String[]>]
    [[-Credential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaLocaleSetting -ComputerName sqlserver2014a
```

Gets the Locale settings on computer sqlserver2014a.<br>

#####  Example:  2 

```powershell
PS C:\> 'sql1','sql2','sql3' | Get-DbaLocaleSetting
```

Gets the Locale settings on computers sql1, sql2 and sql3.<br>

#####  Example:  3 

```powershell
PS C:\> Get-DbaLocaleSetting -ComputerName sql1,sql2 -Credential $credential
```

Gets the Locale settings on computers sql1 and sql2 using SQL Authentication to authenticate to the servers.<br>

### Optional Parameters

##### -ComputerName

Specifies the computer names where you want to retrieve Windows locale settings from the registry. Accepts SQL Server instance names but extracts only the computer portion.  
Use this to audit regional configurations across your SQL Server environment, especially before installations or when troubleshooting locale-related issues with date formats, currency display, or   
collation behavior.

| Property | Value |
| --- | --- |
| Alias | cn,host,Server |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value | $env:COMPUTERNAME |

##### -Credential

Credential object used to connect to the computer as a different user.

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


&nbsp;
