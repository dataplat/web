---
title: "Test-DbaOptimizeForAdHoc"
slug: "Test-DbaOptimizeForAdHoc"
date: 2024-01-01
layout: "single"
author: "Brandon Abshire, netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Tests whether the SQL Server \"optimize for ad-hoc workloads\" configuration setting is enabled."
tags:
  - "Configure"
  - "SPConfigure"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Test-DbaOptimizeForAdHoc.ps1"
bohUrl: "https://dataplat.github.io/boh#Test-DbaOptimizeForAdHoc"
draft: false
---

# Test-DbaOptimizeForAdHoc

| Property | Value |
| --- | --- |
| **Author** | Brandon Abshire, netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Test-DbaOptimizeForAdHoc](https://github.com/dataplat/dbatools/blob/master/public/Test-DbaOptimizeForAdHoc.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Test-DbaOptimizeForAdHoc](https://dataplat.github.io/boh#Test-DbaOptimizeForAdHoc).

## Synopsis

Tests whether the SQL Server "optimize for ad-hoc workloads" configuration setting is enabled.

## Description

Checks the current value of the "optimize for ad-hoc workloads" server configuration option and compares it against the recommended setting of 1 (enabled). This setting helps prevent plan cache bloat by storing only compiled plan stubs for single-use ad hoc queries instead of full execution plans. DBAs typically enable this on servers with high volumes of ad hoc queries to reduce memory pressure and improve overall performance. Returns the current configuration value, recommended value, and guidance notes for each SQL Server instance.  
  
More info: https://msdn.microsoft.com/en-us/library/cc645587.aspx  
http://www.sqlservercentral.com/blogs/glennberry/2011/02/25/some-suggested-sql-server-2008-r2-instance-configuration-settings/  
  
These are just general recommendations for SQL Server and are a good starting point for setting the "optimize for ad-hoc workloads" option.

## Syntax

```powershell
Test-DbaOptimizeForAdHoc
    [-SqlInstance] <DbaInstanceParameter[]>
    [[-SqlCredential] <PSCredential>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Test-DbaOptimizeForAdHoc -SqlInstance sql2008, sqlserver2012
```

Validates whether Optimize for AdHoc Workloads setting is enabled for servers sql2008 and sqlserver2012.<br>

### Required Parameters

##### -SqlInstance

A collection of one or more SQL Server instance names to query.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

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
