---
title: "PowerShell Console Shortcode Demo"
draft: true
---

# PowerShell Console Shortcode Demo

This page demonstrates the auto-parsing PowerShell console shortcode. Just paste your PowerShell output and it automatically applies syntax highlighting!

**Features:**
- ✅ Automatic syntax highlighting for PS prompts, commands, and output
- ✅ Red, yellow, gray OS X-style window controls
- ✅ Default title is "PowerShell" (customizable)
- ✅ Dark blue terminal background with proper color coding
- ✅ Auto-detects property/value pairs, status keywords, and table headers

## Example 1: Simple Commands

{{< powershell-console >}}
PS C:\> Install-Module dbatools
PS C:\> Get-DbaDatabase -SqlInstance sql01

Name          Status       RecoveryModel
----          ------       -------------
master        Normal       Simple
msdb          Normal       Simple
tempdb        Normal       Simple
{{< /powershell-console >}}

## Example 2: Property Output

{{< powershell-console >}}
PS C:\> Test-DbaConnection -SqlInstance sql01

ComputerName    : SQL01
InstanceName    : MSSQLSERVER
SqlInstance     : SQL01
ConnectSuccess  : True
AuthScheme      : NTLM
TcpPort         : 1433
{{< /powershell-console >}}

## Example 3: With Comments

{{< powershell-console >}}
# Install dbatools from PowerShell Gallery
PS C:\> Install-Module dbatools

# Test the connection to your SQL Server
PS C:\> Test-DbaConnection -SqlInstance sql01

ConnectSuccess  : True
{{< /powershell-console >}}

## Example 4: Status Messages

{{< powershell-console >}}
PS C:\> Backup-DbaDatabase -SqlInstance sql01 -Database testdb

Database    : testdb
Status      : Success
BackupFile  : C:\Backups\testdb_20231029.bak
Duration    : 00:00:03
{{< /powershell-console >}}

## Example 5: With Errors

{{< powershell-console >}}
PS C:\> Get-DbaDatabase -SqlInstance badserver

ComputerName    : badserver
SqlInstance     : badserver
ConnectSuccess  : False
Error           : Failed to connect
{{< /powershell-console >}}

## Custom Title Example

{{< powershell-console title="PowerShell 5.1" >}}
PS C:\Windows\System32> Get-Command -Module dbatools | Select-Object -First 3

CommandType     Name                    Version    Source
-----------     ----                    -------    ------
Function        Add-DbaAgDatabase       2.1.0      dbatools
Function        Backup-DbaDatabase      2.1.0      dbatools
Function        Copy-DbaDatabase        2.1.0      dbatools
{{< /powershell-console >}}
