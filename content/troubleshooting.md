---
title: "Technical FAQ & Troubleshooting"
date: 2026-07-14
lastmod: 2026-07-14
slug: "troubleshooting"
description: "Practical answers for common dbatools installation, connection, TLS, authentication, backup, restore, and PowerShell issues."
draft: false
---

This FAQ covers the technical questions that come up most often in the dbatools community. Start with the safe diagnostics below, then jump to the section that matches your symptom.

Examples use `sql01` as a placeholder. Replace it with your server, `server\instance`, or `server,port`. Commands and defaults can change between dbatools releases, so confirm the syntax installed on your machine with `Get-Help <Command> -Full`.

This page was last verified against the stable dbatools **v2.8.3** release, published July 11, 2026. Open issues and code merged only to the development branch are not presented as released behavior.

## Start here: collect a useful diagnostic snapshot

Open a fresh PowerShell session and run:

```powershell
$PSVersionTable.PSVersion

Get-Module dbatools -ListAvailable |
    Sort-Object Version -Descending |
    Select-Object Name, Version, Path

Get-Module dbatools, dbatools.library |
    Select-Object Name, Version, Path

Test-NetConnection sql01 -Port 1433
Test-DbaConnection -SqlInstance sql01
```

If a dbatools command fails, capture the complete error before closing the session:

```powershell
$Error[0] | Format-List * -Force
```

When asking for help, include the PowerShell version, dbatools version and path, SQL Server version, operating system, exact command, and redacted error. Never post passwords, tokens, full connection strings, or sensitive server names.

## Installation and module loading

### How do I install or update dbatools?

Follow the current [installation guide](/install/). For a normal current-user installation from the PowerShell Gallery:

```powershell
Install-Module dbatools -Scope CurrentUser
```

To update an installation that came from the PowerShell Gallery:

```powershell
Update-Module dbatools
```

If the machine cannot reach the Gallery, use the [offline installation guide](/offline/). Do not mix Gallery, manual ZIP, Chocolatey, and source-tree installations unless you intentionally manage which copy PowerShell imports.

### Why does an upgrade report an Authenticode issuer or publisher mismatch?

dbatools moved to Azure Trusted Signing in v2.5.5. When upgrading from v2.5.4 or earlier, PowerShellGet may reject the new signing chain. If you have verified that the package source is the official PowerShell Gallery, make the transition with:

```powershell
Install-Module dbatools -Scope CurrentUser -Force -SkipPublisherCheck
```

This is a one-time publisher transition, not a switch to use routinely for unknown modules or repositories. See [Upgrading from older versions](/install/#upgrading-from-older-versions-v254-or-earlier) and the [Azure Trusted Signing explanation](/azure-trusted-signing/) for strict execution-policy environments.

### Why is PowerShell loading an older dbatools version?

Multiple versions or installation paths are usually involved. Compare everything PowerShell can see with what is loaded now:

```powershell
Get-Module dbatools -ListAvailable |
    Sort-Object Version -Descending |
    Select-Object Name, Version, Path

Get-Module dbatools | Select-Object Name, Version, Path
```

Then test the expected version in a fresh session:

```powershell
Import-Module dbatools -RequiredVersion 2.0.0 -Force
```

Replace `2.0.0` with a version that is actually installed. Also inspect `$env:PSModulePath`; a scheduled task, SQL Agent job, service account, and interactive console can each have different module paths.

### Why does the module fail to import or report an SMO/assembly error?

First test in a fresh PowerShell process. Then record the loaded paths and retry the import with verbose output:

```powershell
Get-Module dbatools, dbatools.library -ListAvailable |
    Select-Object Name, Version, Path

Import-Module dbatools -Force -Verbose
$Error[0] | Format-List * -Force
```

Common causes include a partial update, two dbatools copies on the module path, another module loading a conflicting SMO or identity-library version, or a long-running host retaining old assemblies. Reproduce the failure in a clean session before deleting or reinstalling anything.

`Remove-Module` does not unload .NET assemblies that are already in the PowerShell process. If the message says an assembly with the same name is already loaded, close that PowerShell process and test again in a genuinely new one. Update dbatools and the conflicting module, test both import orders, and use separate PowerShell processes when their dependency versions remain incompatible. Do not copy DLLs between module directories as a fix.

## Connections, TLS, and credentials

### `Could not connect to SqlInstance`: what should I check?

Work through the connection in layers:

1. **Target** — confirm the exact instance name. For a named instance, try `server\instance`; for a fixed port, try `server,port`.
2. **Network** — test DNS and the SQL port from the same machine and identity that runs dbatools.
3. **SQL Server** — confirm the service is running, the expected protocol is enabled, and the listener or SQL Browser configuration matches the name being used.
4. **Authentication** — verify the login type, credential, and database access.
5. **Encryption** — only after the preceding checks, inspect the TLS/certificate error and connection settings.

```powershell
Resolve-DnsName sql01
Test-NetConnection sql01 -Port 1433
Test-DbaConnection -SqlInstance sql01
```

If SQL Server is not on port 1433, test its actual port. A successful ping does not prove that the SQL endpoint is reachable.

### Why does SSMS connect when dbatools does not?

Make the two tests truly equivalent. Compare:

- the exact server name, instance, and port;
- Windows, SQL, or Entra authentication and the actual process identity;
- the initial database;
- encryption and certificate-trust options;
- whether SSMS is running on a different computer; and
- whether an alias is configured only for one client or architecture.

SSMS connection options are not automatically inherited by PowerShell. Start by reproducing the SSMS target and authentication explicitly with `Connect-DbaInstance`.

### How should I handle a certificate trust or TLS error?

The preferred fix is a certificate whose subject matches the name you connect to and whose chain is trusted by the client. Check the server name, certificate expiration, issuing chain, SQL Server encryption configuration, and client clock.

For a controlled environment where trusting that server certificate is an intentional choice, the current command reference supports a per-connection override:

```powershell
$server = Connect-DbaInstance -SqlInstance sql01 -TrustServerCertificate
```

Pass `$server` to subsequent dbatools commands so the exception stays scoped to that connection. `Set-DbatoolsInsecureConnection` changes broader defaults by trusting certificates and disabling required encryption; do not use it as a reflexive fix, especially on production or untrusted networks.

If the certificate is valid for a DNS name that differs from the connection target, v2.8.3 does not expose a dedicated `-HostNameInCertificate` parameter. Supply the expected certificate name through the documented connection-string extension instead:

```powershell
$splatConnection = @{
    SqlInstance            = "sql-listener"
    EncryptConnection      = $true
    AppendConnectionString = "HostNameInCertificate=sql.contoso.com"
}
$server = Connect-DbaInstance @splatConnection
```

This keeps certificate validation enabled. The value must match a name covered by the server certificate.

### Can I set global connection defaults and override them per server?

Yes. dbatools exposes module-wide settings through `Get-DbatoolsConfig` and `Set-DbatoolsConfig`. Inspect the settings available in the installed version before changing them:

```powershell
Get-DbatoolsConfig -FullName 'sql.connection.*' |
    Select-Object FullName, Value, Description
```

A command-line parameter or an explicitly created connection is the clearest way to make a server-specific exception:

```powershell
$production = Connect-DbaInstance -SqlInstance prod-sql01 -EncryptConnection
$development = Connect-DbaInstance -SqlInstance dev-sql01 -TrustServerCertificate

Get-DbaDatabase -SqlInstance $production
Get-DbaDatabase -SqlInstance $development
```

Treat global settings as a baseline and per-server connections as deliberate overrides. If a global change must survive future PowerShell sessions, review `Register-DbatoolsConfig` and its scope options first. Security-sensitive defaults should be documented and centrally managed rather than silently changed in a personal profile.

As of v2.8.3, dbatools does not have a built-in named profile system for interactive, non-interactive, or per-server connection profiles. For repeatable per-server policy, keep the values in your approved configuration source and use a small wrapper that returns an explicit `Connect-DbaInstance` object.

### How do I connect with Entra ID, MFA, or a managed identity?

v2.8.3 added first-class `-AuthenticationType` support. For an interactive Entra ID login with MFA:

```powershell
$splatConnection = @{
    SqlInstance        = "sql01.database.windows.net"
    Database           = "appdb"
    AuthenticationType = "ActiveDirectoryInteractive"
}
$server = Connect-DbaInstance @splatConnection
```

For a system-assigned managed identity in a supported Azure host:

```powershell
$splatConnection = @{
    SqlInstance        = "sql01.database.windows.net"
    Database           = "appdb"
    AuthenticationType = "ActiveDirectoryManagedIdentity"
}
$server = Connect-DbaInstance @splatConnection
```

If your automation already obtains a database access token, pass either the string or SecureString token returned by current Az PowerShell versions:

```powershell
$token = (Get-AzAccessToken -ResourceUrl "https://database.windows.net/").Token
$splatConnection = @{
    SqlInstance = "sql01.database.windows.net"
    Database    = "appdb"
    AccessToken = $token
}
$server = Connect-DbaInstance @splatConnection
```

Pass the resulting `$server` object to later dbatools commands. Other supported authentication values and their credential requirements are listed in `Get-Help Connect-DbaInstance -Full`.

### How do I use a different credential safely?

Use a `PSCredential` rather than embedding a password in a script:

```powershell
$credential = Get-Credential
$server = Connect-DbaInstance -SqlInstance sql01 -SqlCredential $credential
```

For unattended automation, use an approved secret store or managed identity where supported. Do not serialize plain-text passwords, write credentials to logs, or paste them into a support thread.

### Why does Windows authentication fail only from a jump server or scheduled job?

This often points to identity, delegation, or the Kerberos double hop rather than dbatools itself. Record the identity at every hop, determine whether the connection uses Kerberos or NTLM, and verify SPNs and delegation with your domain administrators. `Test-DbaConnection` includes authentication and connection details that help isolate the failing hop.

There is also an [open, environment-specific PowerShell 7.5 report](https://github.com/dataplat/dbatools/issues/10265) involving an "untrusted domain" error across segmented networks. It has not been reproduced as a general dbatools defect. If your case matches it, compare the same target under Windows PowerShell 5.1 and PowerShell 7.5, include the network topology and authentication scheme, and do not weaken authentication merely to suppress the message.

## Finding and running commands

### How do I find the right dbatools command?

Search by task or tag, then read the installed help:

```powershell
Find-DbaCommand -Pattern 'backup history'
Find-DbaCommand -Tag Migration
Get-Command -Module dbatools '*AgentJob*'
Get-Help Backup-DbaDatabase -Examples
```

Every command also has a short URL in the form `https://dbatools.io/Command-Name`, for example [Backup-DbaDatabase](/Backup-DbaDatabase/).

### Why does PowerShell say a parameter cannot be found?

The example may target a different dbatools version, or another command with the same name may be taking precedence. Check the command source and the help installed with it:

```powershell
Get-Command Connect-DbaInstance | Select-Object Name, Source, Version
Get-Help Connect-DbaInstance -Full
```

Use the syntax from your installed version. If you need a newer parameter, update intentionally and test the affected automation before production use.

### Why is `Get-DbaDatabase` very slow on SQL Server 2022 or later?

Older dbatools releases asked SMO to initialize an `ActiveConnections` field that could make database enumeration take minutes on SQL Server 2022. The fix is included in v2.8.3. Update to a current stable release and retest in a new PowerShell process.

If the current release is still slow, report the SQL Server build, database count, login permissions, dbatools and dbatools.library versions, and timings for both `Get-DbaDatabase` and `$server.Databases`. That separates the resolved initialization problem from network, permissions, or a new SMO regression.

### Why does a command show only a warning instead of throwing an exception?

Many dbatools commands favor friendly warnings for interactive use. For automation, check whether that command supports `-EnableException`; it lets `try`/`catch` handle the underlying exception.

```powershell
try {
    Invoke-DbaQuery -SqlInstance sql01 -Database master `
        -Query 'SELECT @@SERVERNAME AS ServerName' -EnableException
} catch {
    $_ | Format-List * -Force
}
```

Do not assume every command exposes the same exception switch. Confirm with `Get-Help`.

## `Invoke-DbaQuery`

### How do I run a query and keep the results?

Assign or pipe the returned objects:

```powershell
$rows = Invoke-DbaQuery -SqlInstance sql01 -Database master `
    -Query 'SELECT name, state_desc FROM sys.databases'

$rows | Export-Csv -Path .\databases.csv -NoTypeInformation
```

If the query is in a file, use the command's `-File` parameter. For values supplied at runtime, use `-SqlParameter` rather than building T-SQL by concatenating untrusted strings.

### Why do I see no output?

Check that the script returns a result set, that you did not discard it with `Out-Null`, and that the selected database is correct. Capture the result in a variable and inspect both its type and count:

```powershell
$result = Invoke-DbaQuery -SqlInstance sql01 -Database appdb -Query $query
$result.GetType().FullName
@($result).Count
```

Messages printed by T-SQL are not the same as rows returned by `SELECT`.

## Backup and restore

### Why can I see a backup path but SQL Server cannot?

Backup and restore file access normally happens under the SQL Server service account, not the user running PowerShell. Test the path from SQL Server's perspective:

```powershell
Test-DbaPath -SqlInstance sql01 -Path '\\fileserver\sqlbackups'
```

For a UNC path, grant the SQL Server service identity the required share and NTFS permissions. A mapped drive visible in your interactive session may not exist for the service account.

### Does dbatools support Azure Blob Storage and S3-compatible storage?

Yes, in v2.8.3:

- `Backup-DbaDatabase -StorageBaseUrl` supports Azure Blob Storage and S3-compatible object storage. Native S3 backup requires SQL Server 2022 or later.
- `Restore-DbaDatabase -Path` accepts Azure and S3 URLs and can use `-StorageCredential`.
- `Test-DbaLastBackup -Path` can discover and test backups from local, UNC, Azure, or S3 locations accessible to the destination SQL Server.

```powershell
$splatBackup = @{
    SqlInstance    = "sql2022"
    Database       = "AdventureWorks"
    StorageBaseUrl = "s3://mybucket.s3.us-west-2.amazonaws.com/backups"
    Type           = "Full"
}
Backup-DbaDatabase @splatBackup
```

Cloud URLs, SQL credentials for storage, and mapped filesystem drives are different mechanisms. Confirm that the SQL Server version supports the chosen provider and that the credential exists on the SQL Server performing the operation. Never put a SAS token or storage secret directly in a support post.

### How do I investigate a restore failure without immediately restoring?

Start by checking that SQL Server can reach the files and read their headers:

```powershell
Test-DbaPath -SqlInstance sql01 -Path '\\fileserver\sqlbackups\appdb.bak'
Read-DbaBackupHeader -SqlInstance sql01 -Path '\\fileserver\sqlbackups\appdb.bak'
```

Then verify the backup chain, target SQL Server version, destination file paths, free space, encryption keys or certificates, and exclusive-access requirements. `Select-DbaBackupInformation` can reduce discovered backup history to the chain required for a point in time.

For Azure SQL Managed Instance, an [open v2.8.x issue](https://github.com/dataplat/dbatools/issues/10386) tracks an XTP `file already exists` precheck that can block a restore even when native T-SQL succeeds. `-WithReplace` is not a general fix for Managed Instance. If the exact symptom applies, follow that issue and validate any native restore workaround in a non-production recovery test before automating it.

### What is the safest way to prove backups can be restored?

A real restore test is stronger evidence than a successful backup job or header check. `Test-DbaLastBackup` restores the selected backups, runs `DBCC CHECKDB`, and drops its test databases by default.

Run it against a dedicated non-production destination with adequate storage and permissions, limit the first run to one known database, and review `Get-Help Test-DbaLastBackup -Full` before scheduling it. The command creates and drops databases and can consume substantial I/O, CPU, time, and disk space.

## SQL Agent, tasks, and unattended automation

### Why does a script work interactively but fail in SQL Agent or Task Scheduler?

The unattended process usually has a different identity and environment. Record these values in the job output:

```powershell
whoami
$PSVersionTable.PSVersion
$env:PSModulePath
Get-Module dbatools -ListAvailable | Select-Object Name, Version, Path
```

Also check:

- whether dbatools is installed for the service or proxy account;
- the job's PowerShell executable and bitness;
- filesystem, share, SQL, and certificate permissions for that identity;
- the working directory and use of relative paths;
- non-interactive prompts or profile-dependent variables; and
- whether the job machine can resolve and reach the SQL endpoint.

Use explicit paths, explicit connection settings, and a non-interactive credential source. Test under the same account and on the same machine as the job.

## Safe automation at scale

### How should I test a command before running it across many servers?

Start with one non-production target and a narrow object selection. Read the command's examples and side effects, and use `-WhatIf` only when that specific command documents support for it. Capture output per target so one failure is not lost in a long pipeline.

For repeated work, create reusable connections with `Connect-DbaInstance` and pass the returned objects to later commands. This keeps authentication and connection choices explicit and avoids reconnecting for every operation.

### How do I check the SQL Server error log?

If a dbatools command returns an error, use `Get-DbatoolsError` to capture the detailed error information:

```powershell
Get-DbatoolsError
```

This shows the same information as `$Error[0] | Select *` but formatted for easier reading.

## Still stuck?

Before asking for help, reduce the problem to the smallest reproducible command in a clean session. Include:

- exact dbatools, dbatools.library, and PowerShell versions and paths;
- operating system and SQL Server version/edition;
- the command and sanitized parameters;
- the full redacted error record;
- whether it fails interactively, unattended, or both; and
- which network, authentication, TLS, and path checks succeeded.

Ask the community in [#dbatools on SQL Community Slack](/slack/) or [open a GitHub issue](https://github.com/dataplat/dbatools/issues) when you have a reproducible defect. Search existing issues first, and never attach secrets or private production data.

This FAQ is prioritized from recurring community questions and a review of current GitHub issues, merged pull requests, the v2.8.3 release, and the development branch as of July 14, 2026. The installed command help remains the source of truth for the version running in your environment.
