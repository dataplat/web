---
title: "Optimizing dbatools Performance in PowerShell Universal"
date: 2026-01-27
author: "Chrissy LeMaire"
slug: "psu"
categories: [announcements]
tags: [dbatools, powershell-universal, performance, docker]
draft: true
---

You ever notice how dbatools can be a bit... chatty? Tab completion suggestions, colorful console output, detailed logging — all fantastic when you're working interactively in your terminal. Not so great when you're running dbatools inside a PowerShell Universal API endpoint.

I've been running dbatools inside PSU containers for a while now, and I finally sat down to figure out all the ways we could trim the fat. The result? A two-layer optimization approach that puts each setting in its most elegant place.

## The Problem

dbatools was designed for interactive use. When you import the module, it spins up background runspaces for:

- **TEPP (Tab Expansion Plus Plus)**: Powers intelligent tab completion
- **Logging**: Maintains message queues for troubleshooting
- **Maintenance**: Background housekeeping tasks

These features are amazing at the console. But in an API context? They're overhead. Your API doesn't need tab completion. Those 1,024 messages sitting in a memory queue? Nobody's reading them. Console output formatting? Goes straight to /dev/null.

## The Architecture

Here's the approach: each setting goes where it's architecturally appropriate.

```
Layer 1: Container Start (docker-compose.yml)
├── DBATOOLS_DISABLE_TEPP=1      # Must be set BEFORE Import-Module
└── DBATOOLS_DISABLE_LOGGING=1   # Must be set BEFORE Import-Module

Layer 2: PSU Startup (initialize.ps1)
├── Set-DbatoolsConfig (logging, console output)
└── $PSDefaultParameterValues (EnableException, Verbose, Debug, WhatIf)
```

Why two layers? Because timing matters. The environment variables must exist *before* `Import-Module dbatools` runs — dbatools checks them at import time to decide whether to spin up those background runspaces. Everything else can be configured after the module loads.

## Layer 1: docker-compose.yml

Add these environment variables to your PSU service:

```yaml
environment:
  # DBATOOLS PERFORMANCE: Disable background runspaces (must be set before module import)
  - DBATOOLS_DISABLE_TEPP=1
  - DBATOOLS_DISABLE_LOGGING=1
```

That's it. Two lines. But they have to be here — if you try to set these in PowerShell after the module imports, you've already missed the window.

## Layer 2: initialize.ps1

This is where the bulk of the optimization lives. Here's the configuration block I use:

```powershell
# =============================================================================
# GLOBAL PSU SETTINGS FOR dbatools
# =============================================================================
# These settings optimize dbatools for server/API use where interactive
# features and logging overhead are unnecessary.
#
# IMPORTANT: DBATOOLS_DISABLE_TEPP and DBATOOLS_DISABLE_LOGGING environment
# variables are set in docker-compose.yml because they must be present
# BEFORE Import-Module dbatools runs.

# --- Pipeline Pollution Prevention ---
# dbatools writes progress bars that corrupt JSON output
$global:ProgressPreference = 'SilentlyContinue'

# --- PSDefaultParameterValues: Centralized dbatools defaults ---
# Set common parameters once here instead of on every command call
$global:PSDefaultParameterValues = @{
    # Make dbatools throw terminating errors for proper try/catch handling
    '*-Dba*:EnableException'  = $true
    # Disable verbose/debug output (adds overhead, pollutes API responses)
    '*-Dba*:Verbose'          = $false
    '*-Dba*:Debug'            = $false
    # Ensure commands execute (prevent accidental WhatIf propagation)
    '*-Dba*:WhatIf'           = $false
    # Suppress confirmation prompts (APIs are non-interactive)
    '*-Dba*:Confirm'          = $false
}

# --- Strict Error Handling ---
$global:ErrorActionPreference = 'Stop'
$global:ConfirmPreference = 'None'

# --- dbatools Connection Settings ---
# Trust self-signed certs in dev/test environments (Docker SQL instances)
Set-DbatoolsConfig -FullName sql.connection.trustcert -Value $true -PassThru | Register-DbatoolsConfig

# --- dbatools Logging: Disable In-Memory Queues ---
# Even with DBATOOLS_DISABLE_LOGGING=1, these provide defense-in-depth.
# Prevents accumulation of 1,024 messages + 128 errors in memory.
Set-DbatoolsConfig -FullName logging.messagelogenabled -Value $false
Set-DbatoolsConfig -FullName logging.messagelogfileenabled -Value $false
Set-DbatoolsConfig -FullName logging.errorlogenabled -Value $false
Set-DbatoolsConfig -FullName logging.errorlogfileenabled -Value $false

# --- dbatools Console Output: Disable ---
# In API context, console output is wasted - it goes nowhere useful
Set-DbatoolsConfig -FullName message.consoleoutput.disable -Value $true
```

A few notes on this configuration:

**`$PSDefaultParameterValues`** is cleaner than setting parameters on every command. Define it once, and every `*-Dba*` command picks up your defaults automatically.

**`EnableException = $true`** is critical for APIs. By default, dbatools writes errors to the error stream but doesn't throw. That's fine interactively — you see the red text and know something went wrong. In an API? You need proper try/catch handling, which means you need terminating errors.

**Defense in depth on logging**: Even with `DBATOOLS_DISABLE_LOGGING=1` set, I still explicitly disable the in-memory queues. Belt and suspenders.

## Performance Impact

Here's what changes:

| Before | After |
|--------|-------|
| 3 background runspaces (TEPP, logging, maintenance) | 1 background runspace (maintenance only) |
| 1,024 message queue + 128 error queue in memory | Queues disabled |
| Console output formatting overhead | Console output disabled |

The estimated improvement is 10-30% memory reduction per runspace, plus eliminated logging I/O. Your mileage may vary depending on how heavily you're using dbatools, but in my testing, API response times became noticeably more consistent.

## What About environments.ps1?

If you're using PSU's environment configuration, you'll want to make sure you have:

- **Integrated environment** sharing process state (required for dbatools connection caching)
- **PersistentRunspace = $true** to keep runspaces warm (80ms vs 500ms latency)
- **Modules pre-loaded** via the environment config

The environment sharing is what lets dbatools cache your SQL connections across API calls. Without it, you'd be reconnecting on every request.

## Wrapping Up

The key insight here is that dbatools isn't slow — it's just optimized for a different use case. Interactive console sessions need tab completion and logging. API endpoints need lean, predictable execution. Configure accordingly.

If you're running dbatools in PSU or any other server/API context, give these optimizations a try. I'd love to hear how they work for you.

\- Chrissy
