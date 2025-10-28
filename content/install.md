---
title: "Install"
date: 2016-05-06
slug: "install"
draft: false
---

dbatools is digitally signed with Azure Trusted Signing, ensuring code integrity and security. [Learn more about our signing process](https://blog.netnerds.net/2025/08/dbatools-azure-trusted-signing/).

## Install from the PowerShell Gallery

```powershell
Install-Module dbatools
```

The PowerShell Gallery and the command `Install-Module` are available in Windows 10+, Windows Server 2016+, and PowerShell 7.

Install-Module requires Run As Administrator and installs dbatools globally. Don't have admin access or want to install dbatools only for yourself?

```powershell
Install-Module dbatools -Scope CurrentUser
```

**Note:** dbatools has dependent libraries that will be installed automatically.

For Windows 7, 8, Server 2012, first install WMF5 from [https://aka.ms/wmf5download](https://aka.ms/wmf5download) then reboot.

## Install-PSResource (PowerShell 7.4+)

For PowerShell 7.4 and above, you can also use `Install-PSResource`:

```powershell
Install-PSResource dbatools
```

To install for all users (requires Run As Administrator):

```powershell
Install-PSResource dbatools -Scope AllUsers
```

## Minimum Requirements

dbatools values backward compatibility. We still deliver for people running PowerShell v3 and SQL Server 2000.

##### Server

- SQL Server 2000 - SQL Server 2025
- No PowerShell needed on the host for SQL Server-only commands
- [PowerShell remoting](/secure) enabled on the host for remote Windows commands

##### Workstation

- Windows 7 with PowerShell 3
- Linux or macOS with PowerShell 7

Like SSMS, dbatools **is not** required on the server.

### Network Requirements

For remote SQL Server management, ensure these ports are accessible:

| Protocol | Default Port | Used By | Required For | Firewall Note |
|----------|-------------|---------|--------------|---------------|
| SQL Database Engine | 1433 | `Get-DbaDatabase` | 62% of commands | Allow inbound on SQL Server |
| WS-Management | 5985/5986 | `New-DbaClientAlias` | 25% of commands | Windows Remote Management |
| SQL WMI | 135 | `Enable-DbaAgHadr` | 4% of commands | DCOM/RPC endpoint mapper |
| SMB | 445 | `Backup-DbaDatabase` | 4% of commands | File sharing for backups |

**Firewall Tip:** Use [`New-DbaFirewallRule`](/commands/New-DbaFirewallRule/) to automatically configure Windows Firewall rules for SQL Server.

## Offline Install

Don't have Internet access on your DBA workstation? Check out our [offline install](/offline) guide.

## Chocolatey

You can also install dbatools using [chocolatey](https://chocolatey.org/packages/dbatools)

```powershell
choco install dbatools
```

## New to PowerShell?

If you're new to PowerShell and would like in-depth walk-thrus and more, please visit:

- [walk-thru: installing modules from the powershell gallery](/soup2nutz).
- [getting started with powershell](/start)
- [offline installs of dbatools](/offline)
- [talking to your security team about powershell and dbatools](/secure/)

### Using dbatools

Installing the module will make hundreds of commands available to you.

Unsure what to do next? Visit the [Getting Started](/getting-started/) for more information and code samples, or check out our [popular commands](https://dbatools.io/commands/?popular=1).

Like what you see? [Give us a star on GitHub](/git)!
