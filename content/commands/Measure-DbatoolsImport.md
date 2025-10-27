---
title: "Measure-DbatoolsImport"
slug: "Measure-DbatoolsImport"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Measures and displays detailed timing metrics for dbatools module import operations"
tags:
  - "Module"
  - "Support"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Measure-DbatoolsImport.ps1"
bohUrl: "https://dataplat.github.io/boh#Measure-DbatoolsImport"
draft: false
---

# Measure-DbatoolsImport

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Measure-DbatoolsImport](https://github.com/dataplat/dbatools/blob/master/public/Measure-DbatoolsImport.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Measure-DbatoolsImport](https://dataplat.github.io/boh#Measure-DbatoolsImport).

## Synopsis

Measures and displays detailed timing metrics for dbatools module import operations

## Description

Returns performance data collected during the dbatools module import process, showing the duration of each import step. This function helps troubleshoot slow module loading times by identifying which components take the longest to initialize. The timing data includes loading the dbatools library, type aliases, internal commands, external commands, and other initialization steps. Only displays steps that took measurable time (greater than 00:00:00) to complete.

## Syntax

```powershell
Measure-DbatoolsImport
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Measure-DbatoolsImport
```

Displays the import load times of the dbatools PowerShell module<br>

#####  Example:  2 

```powershell
PS C:\> Import-Module dbatools
PS C:\> Measure-DbatoolsImport
```

Displays the import load times of the dbatools PowerShell module<br>


&nbsp;
