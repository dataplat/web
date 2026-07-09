---
title: "Running dbatools Tests Locally"
date: 2026-01-24
author: "Chrissy LeMaire"
slug: "testing-locally"
aliases:
  - /testing-locally/
  - /testing-locally/index.html
categories: [announcements]
tags: [testing, pester, contributing]
draft: true
---

If you're contributing to dbatools or just want to make sure your changes work before submitting a PR, running tests locally quite helpful. I've wanted to write this guide for a while because our testing infrastructure has evolved significantly, and the old docs were getting stale.

Initially, our testing suite was developed with Appveyor in mind, but over the years, we've evolved to include local labs as well. Most recently, with Andreas Jordan refactored nearly 400 test files to do better with local setups and to even use scenario-based testing.

Until I get VMSS + local GitHub runners working, Appveyor test runs takes about an hour and a half to run the entire testing suite, so testing locally is even more attractive now.

If you're interested in testing dbatools locally, this post will get you up and running with local testing in about 15 minutes.

## What Changed

Instead of generic `instance1`, `instance2`, `instance3` naming, tests now use purpose-specific instance references:

| Old Pattern | New Pattern | Purpose |
|-------------|-------------|---------|
| `$TestConfig.instance1` | `$TestConfig.InstanceSingle` | Tests needing one instance |
| `$TestConfig.instance1/2` | `$TestConfig.InstanceMulti1/2` | Tests needing multiple instances |
| - | `$TestConfig.InstanceCopy1/2` | Tests that copy between instances |
| - | `$TestConfig.InstanceHadr` | HA/DR tests (AGs, mirroring, log shipping) |
| - | `$TestConfig.InstanceRestart` | Tests that restart SQL Server |

This matters because the CI can now run tests in parallel based on infrastructure requirements, and your local tests can use the same pattern.

## Prerequisites

Before you start, you'll need:

- **PowerShell 5.1+** (Windows PowerShell) or **PowerShell 7+**
- **Git** for cloning the repository
- **At least one SQL Server instance** for basic tests (two for most integration tests)
- **Administrator access** to your SQL instances

### Run PowerShell as Administrator

This is important! Many dbatools commands require local Administrator privileges. Commands like `Copy-DbaLinkedServer`, `Get-DbaService`, and anything that touches WMI will fail without it. Just right-click PowerShell and "Run as Administrator" to save yourself from cryptic permission errors 😊

## Quick Setup

Navigate to your dbatools repository and run these commands:

```powershell
cd c:\github\dbatools

# Install dbatools.library (REQUIRED - contains SMO assemblies)
Install-Module dbatools.library

# Install Pester and PSScriptAnalyzer
Install-Module Pester -RequiredVersion 5.7.1 -Force -SkipPublisherCheck
Install-Module PSScriptAnalyzer -RequiredVersion 1.18.2 -Force

# Copy the config template
Copy-Item .\tests\constants.local.ps1.example .\tests\constants.local.ps1
```

### Configure Your Instances

Edit `tests\constants.local.ps1` with your SQL Server details. Here's a simple two-instance setup:

```powershell
# constants.local.ps1

# Your SQL Server instances
$config['InstanceSingle'] = "YourServer\Instance1"
$config['InstanceMulti1'] = "YourServer\Instance1"
$config['InstanceMulti2'] = "YourServer\Instance2"
$config['InstanceCopy1'] = "YourServer\Instance1"
$config['InstanceCopy2'] = "YourServer\Instance2"

# SQL Authentication (or leave as $null for Windows Auth)
$securePassword = ConvertTo-SecureString "YourPassword!" -AsPlainText -Force
$config['SqlCred'] = New-Object PSCredential ("sa", $securePassword)

# Set defaults for all dbatools commands
$config['Defaults']['*:SqlCredential'] = $config['SqlCred']
$config['Defaults']['*:SourceSqlCredential'] = $config['SqlCred']
$config['Defaults']['*:DestinationSqlCredential'] = $config['SqlCred']
```

> **Tip:** If you only have one SQL Server, just point everything to the same instance. Some multi-instance tests will skip, but you'll still be able to run most tests.

> **Remote instances?** The `$config['Temp']` path must be accessible from both your PowerShell session AND the SQL Server service accounts. Use a network share like `\\FileServer\Share\dbatools-tests`.

## Verify and Run Tests

First, verify your setup:

```powershell
# Import the module
Import-Module .\dbatools.psd1 -Force
Import-Module .\dbatools.psm1 -Force

# Get test config and set defaults
$TestConfig = Get-TestConfig
$PSDefaultParameterValues["*:SqlCredential"] = $TestConfig.SqlCred

# Test connectivity
$TestConfig.InstanceSingle | Connect-DbaInstance | Select-Object Name, Version
```

If you see certificate errors, run:

```powershell
Set-DbatoolsConfig -FullName sql.connection.trustcert -Value $true -Register
```

### Running Tests with Invoke-ManualPester

The easiest way to run tests locally:

```powershell
# Run unit tests only (no SQL Server required)
Invoke-ManualPester -Path Get-DbaDatabase

# Run integration tests (requires SQL Server)
Invoke-ManualPester -Path Get-DbaDatabase -TestIntegration

# Run with code coverage
Invoke-ManualPester -Path Get-DbaDatabase -TestIntegration -Coverage

# Run multiple tests matching a pattern
Invoke-ManualPester -Path "*Backup*" -TestIntegration
```

### Alternative: Direct Pester

If you prefer running Pester directly:

```powershell
# Setup first
Import-Module .\dbatools.psd1 -Force
Import-Module .\dbatools.psm1 -Force
$TestConfig = Get-TestConfig
$PSDefaultParameterValues = $TestConfig.Defaults

# Run tests
Invoke-Pester .\tests\Get-DbaDatabase.Tests.ps1 -Output Detailed
```

## Test Scenarios

Tests are organized into scenarios based on infrastructure requirements (defined in `tests\pester.groups.ps1`):

| Scenario | Description |
|----------|-------------|
| **SINGLE** | Tests needing one instance |
| **MULTI** | Tests needing multiple instances |
| **COPY** | Tests that copy between instances |
| **HADR** | HA/DR tests (AGs, mirroring) |
| **RESTART** | Tests that restart SQL Server |

The CI automatically detects which scenario each test belongs to based on which `$TestConfig` properties it uses.

## CI Integration

When you submit a PR, you can control which tests run using commit message patterns:

```bash
# Run only Get-DbaDatabase tests
git commit -m "Fix database enumeration (do Get-DbaDatabase)"

# Run all backup-related tests
git commit -m "Update backup logic (do *Backup*)"
```

For the curious, our AppVeyor builds run scenarios in parallel across multiple VMs. Check out [our AppVeyor project](https://ci.appveyor.com/project/dataplat/dbatools) to watch tests run in real-time.

## Troubleshooting

**"dbatools.library not found"**

Reinstall it: `.\.github\scripts\install-dbatools-library.ps1 -Force`

**"Cannot connect to SQL Server"**

Check your instance name with `Test-DbaConnection -SqlInstance $TestConfig.InstanceSingle` and verify your credentials.

**"Access denied" errors**

Make sure you're running PowerShell as Administrator. This is required for WMI operations, service management, and cross-server operations.

**"Access denied to temp path"**

For remote instances, use a network share: `$config['Temp'] = "\\FileServer\Share\dbatools-tests"`. The SQL Server service accounts need write access.

## Quick Reference

```powershell
# === INITIAL SETUP (one time) ===
.\.github\scripts\install-dbatools-library.ps1
Install-Module Pester -RequiredVersion 5.7.1 -Force -SkipPublisherCheck
Copy-Item .\tests\constants.local.ps1.example .\tests\constants.local.ps1
# Edit constants.local.ps1 with your instances

# === BEFORE EACH TEST SESSION ===
Import-Module .\dbatools.psd1 -Force
Import-Module .\dbatools.psm1 -Force
$TestConfig = Get-TestConfig
$PSDefaultParameterValues["*:SqlCredential"] = $TestConfig.SqlCred

# === RUN TESTS ===
Invoke-ManualPester -Path Get-DbaDatabase -TestIntegration
```

Got questions? Hit up #dbatools on the [SQL Server Community Slack](https://aka.ms/sqlslack) and we'll help you out.

\- Chrissy
