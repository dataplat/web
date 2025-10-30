---
title: "Install"
date: 2016-05-06
lastmod: 2025-10-30
slug: "install"
draft: false
---

## Where Should You Install dbatools?

**Install dbatools on your workstation, just like SSMS.**

dbatools is a management tool that runs on your local machine and connects remotely to SQL Server instances. You don't need to install anything on your SQL Servers themselves - it manages them over the network.

**Where people typically install it:**
- Your Windows workstation (where you run SSMS)
- A dedicated management/jump server
- Your laptop for demos and dev work

**No need to install on SQL Servers** - it's designed to manage them remotely, keeping your servers clean and your deployment simple.

---

## Install from the PowerShell Gallery

**Security Note:** dbatools is digitally signed with Azure Trusted Signing, ensuring code integrity and security. [Learn more about our signing process →](https://blog.netnerds.net/2025/08/dbatools-azure-trusted-signing/)

```powershell
Install-Module dbatools -Scope CurrentUser
```

This is the recommended method - no admin rights needed, installs just for you.

Need to install for all users? Use admin PowerShell:

```powershell
Install-Module dbatools
```

**Note:** dbatools has dependent libraries that will be installed automatically.

The PowerShell Gallery and `Install-Module` are available in Windows 10+, Windows Server 2016+, and PowerShell 7.

For Windows 7, 8, Server 2012, first install WMF5 from [https://aka.ms/wmf5download](https://aka.ms/wmf5download) then reboot.

### First Time Using PowerShell Gallery?

If you get a prompt about trusting PSGallery, type `Y` for Yes. You only need to do this once:
```powershell
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
```

---

## Install-PSResource (PowerShell 7.4+)

For PowerShell 7.4 and above, you can also use `Install-PSResource`:

```powershell
Install-PSResource dbatools
```

To install for all users (requires Run As Administrator):

```powershell
Install-PSResource dbatools -Scope AllUsers
```

---

## Upgrading from Older Versions (v2.5.4 or earlier)

Starting with v2.5.5, we switched to Azure Trusted Signing. If you're upgrading from an older version, you may need:

```powershell
Install-Module dbatools -Force -SkipPublisherCheck
```

This is a one-time requirement due to the certificate change.

---

## Other Installation Methods

### Chocolatey

```powershell
choco install dbatools
```

More info at [chocolatey.org/packages/dbatools](https://chocolatey.org/packages/dbatools)

### Offline Install

Don't have Internet access on your DBA workstation? Check out our [offline install guide](/offline).

---

## System Requirements

dbatools values backward compatibility. We still deliver for people running PowerShell v3 and SQL Server 2000.

### SQL Server Support
- SQL Server 2000 through SQL Server 2025
- Azure SQL Database (40% of commands)
- Azure SQL Managed Instance (60% of commands)
- No PowerShell needed on the SQL Server host for database commands

### Workstation Requirements
- **Windows:** Windows 7+ with PowerShell 3+
- **Linux/macOS:** PowerShell 7+
- **Remote Windows Commands:** [PowerShell remoting](/secure) enabled on target servers

### Network Requirements

For remote SQL Server management, ensure these ports are accessible:

| Protocol | Default Port | Used By | Required For | Firewall Note |
|----------|-------------|---------|--------------|---------------|
| SQL Database Engine | 1433 | `Get-DbaDatabase` | 62% of commands | Allow inbound on SQL Server |
| WS-Management | 5985/5986 | `New-DbaClientAlias` | 25% of commands | Windows Remote Management |
| SQL WMI | 135 | `Enable-DbaAgHadr` | 4% of commands | DCOM/RPC endpoint mapper |
| SMB | 445 | `Backup-DbaDatabase` | 4% of commands | File sharing for backups |

**Firewall Tip:** Use [`New-DbaFirewallRule`](/commands/New-DbaFirewallRule/) to automatically configure Windows Firewall rules for SQL Server.

---

## New to PowerShell?

If you're new to PowerShell and would like in-depth walk-thrus and more:

- [Walk-thru: Installing modules from the PowerShell Gallery](/soup2nutz)
- [Getting started with PowerShell](/start)
- [Offline installs of dbatools](/offline)
- [Talking to your security team about PowerShell and dbatools](/secure/)

---

## What's Next?

Installing the module makes hundreds of commands available to you.

**Ready to start?**
- [Getting Started Guide](/getting-started/) - Learn the basics with code samples
- [Popular Commands](https://dbatools.io/commands/?popular=1) - See what everyone uses most
- [Our Book](/book) - Learn dbatools in a Month of Lunches

Like what you see? [Give us a star on GitHub](/git)!
