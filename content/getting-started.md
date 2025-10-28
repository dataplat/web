---
title: "Getting Started"
date: 2016-05-06
slug: "getting-started"
draft: false
---

dbatools is a **free** PowerShell module with nearly **700 commands** that replace manual SQL Server administration with powerful and fun automation.

**Migrate SQL Server instances in minutes instead of days.** Test hundreds of backups automatically. Find that one database across 50 servers. **Performance at Scale:** Migrate terabyte databases in under an hour. Test 1000+ backups per hour. Manage 100+ SQL instances from a single console.

---

## Quick Start

```powershell
# Install (Windows/Linux/macOS)
Install-Module dbatools -Scope CurrentUser

# See your databases
Get-DbaDatabase -SqlInstance sql01

# Check your backups
Get-DbaLastBackup -SqlInstance sql01

# Test your last backup (yes, really!)
Test-DbaLastBackup -SqlInstance sql01
```

---

## Installation

### Prerequisites

```powershell
# Set execution policy (one-time setup)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Trust PowerShell Gallery (one-time setup)
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
```

### Install Methods

#### For Current User (Recommended)
```powershell
Install-Module dbatools -Scope CurrentUser
```

#### For All Users (Requires Admin)
```powershell
Install-Module dbatools
```

#### Offline Installation
```powershell
# On internet-connected machine:
Save-Module -Name dbatools -Path C:\temp

# Copy to target machine and place in:
# - All users: C:\Program Files\WindowsPowerShell\Modules
# - Current user: $HOME\Documents\WindowsPowerShell\Modules

# Import the module after copying
Import-Module dbatools
```

#### Additional Install Methods
- **Chocolatey:** `choco install dbatools`
- **GitHub Clone:** `git clone https://github.com/dataplat/dbatools`

### Certificate Change Notice (v2.5.5+)
Starting with v2.5.5, dbatools uses Microsoft Azure Trusted Signing. When upgrading from older versions:
```powershell
Install-Module dbatools -Force -SkipPublisherCheck
```
[Full migration guide →](https://blog.netnerds.net/2025/08/dbatools-azure-trusted-signing/)

---

## System Requirements

### SQL Server Support
| Version | Commands Supported |
|---------|-------------------|
| SQL Server 2000 | 75% |
| SQL Server 2005 | 90% |
| SQL Server 2008/R2 | 93% |
| SQL Server 2012+ | 100% |
| Azure SQL VM | As per version above |
| Azure SQL Database | 40% |
| Azure SQL Managed Instance | 60% |
| Containers/Kubernetes | 75% |

### Operating System Support
| OS | Commands Supported | PowerShell Required |
|----|-------------------|-------------------|
| Windows 7/8/10/11 | 100% | v3+ |
| Windows Server 2008 R2+ | 100% | v3+ |
| Linux (Intel/ARM64) | 78% | Core 7.4.0+ |
| macOS (Intel/M1) | 78% | Core 7.4.0+ |

💡 **Note:** Commands requiring SQL WMI or `-ComputerName` parameter typically don't work on Linux/macOS.

**Still running legacy systems?** Check out this video showing dbatools in action across different environments:

<iframe width="560" height="315" src="https://www.youtube.com/embed/8P6ScCjEnLk" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

### Network Requirements
For remote SQL Server management, ensure these ports are accessible:

| Protocol | Default Port | Used By | Required For | Firewall Note |
|----------|-------------|---------|--------------|---------------|
| SQL Database Engine | 1433 | `Get-DbaDatabase` | 62% of commands | Allow inbound on SQL Server |
| WS-Management | 5985/5986 | `New-DbaClientAlias` | 25% of commands | Windows Remote Management |
| SQL WMI | 135 | `Enable-DbaAgHadr` | 4% of commands | DCOM/RPC endpoint mapper |
| SMB | 445 | `Backup-DbaDatabase` | 4% of commands | File sharing for backups |

**Firewall Tip:** Create a dedicated Windows Firewall rule group for dbatools management traffic.

---

## Common Use Cases

### Backups & Restores
```powershell
# Backup all databases
Get-DbaDatabase -SqlInstance sql01 | Backup-DbaDatabase

# Simple restore
Restore-DbaDatabase -SqlInstance sql01 -Path "C:\temp\mydb.bak"

# Test ALL your backups on a different server
Test-DbaLastBackup -SqlInstance sql01 -Destination sql02 | Out-GridView
```

### Migrations
```powershell
# Migrate entire SQL instance with one command
$params = @{
    Source = 'sql01'
    Destination = 'sql02'
    BackupRestore = $true
    SharedPath = '\\nas\temp'
}
Start-DbaMigration @params -Force

# Copy jobs between servers
Copy-DbaAgentJob -Source sql01 -Destination sql02
```

### Monitoring & Health
```powershell
# Find databases without recent backups
Get-DbaLastBackup -SqlInstance sql01 |
    Where-Object LastFullBackup -lt (Get-Date).AddDays(-7)

# Check for corruption
Get-DbaLastGoodCheckDb -SqlInstance sql01 | Out-GridView

# Monitor currently running queries
Install-DbaWhoIsActive -SqlInstance sql01 -Database master
Invoke-DbaWhoIsActive -SqlInstance sql01
```

### Finding & Discovery
```powershell
# Find databases across multiple servers
Find-DbaDatabase -SqlInstance sql01, sql02, sql03 -Pattern "Production"

# Find stored procedures containing specific text
Find-DbaStoredProcedure -SqlInstance sql01 -Pattern "INSERT INTO Audit"

# Discover SQL instances on network
Find-DbaInstance -ComputerName server01, server02
```

### Quick Wins
- Lost sysadmin access? Use [Reset-DbaAdmin](/Reset-DbaAdmin)
- Need to easily test your backups? Use [Test-DbaLastBackup](/Test-DbaLastBackup)
- SPN management got you down? Use [our suite of SPN commands](/schwifty)
- Got so many databases you can't keep track? Use [Find-DbaDatabase](/Find-DbaDatabase)

---

## Getting Help

```powershell
# Detailed help for any command
Get-Help Test-DbaLastBackup -Full

# Find commands
Get-Command -Module dbatools *backup*
Find-DbaCommand -Tag Migration

# Online help
Get-Help Test-DbaLastBackup -Online
```

**Resources:**
- [Documentation](https://docs.dbatools.io)
- [Command Reference](/commands)
- [Blog](/blog)
- [Slack Community](/slack)

---

## Approach to Learning

dbatools now offers over [700 commands](/commands)! That number may seem overwhelming, but think of it like learning SQL Server. Start with the basics like Logins, Jobs, or Backup/Restore and later on, you can move on to Extended Events.

---

## Advanced Usage

### Authentication

#### SQL Authentication
By default, all SQL-based commands use Trusted/Windows Authentication. To use SQL logins or alternative Windows credentials:

```powershell
$cred = Get-Credential sqladmin
Get-DbaDatabase -SqlInstance sql01 -SqlCredential $cred
```

#### Alternative Windows Credentials
For commands that access Windows (like [Get-DbaDiskSpace](/Get-DbaDiskSpace)):

```powershell
$cred = Get-Credential ad\winadmin
Get-DbaDiskSpace -ComputerName sql01 -Credential $cred
```

To store credentials to disk, read more at [Jaap Brasser's blog](https://www.jaapbrasser.com/quickly-and-securely-storing-your-credentials-powershell/).

### Custom Ports
If you use non-default ports and SQL Browser is disabled, use a colon or comma:

```powershell
# Using colon or comma for non-default ports
Get-DbaDatabase -SqlInstance 'sql01:55559'
Get-DbaDatabase -SqlInstance 'sql01,55559'  # Note: quotes required
```

Note: PowerShell sees commas as arrays, so you must surround the host name with quotes.

### PowerShell Transcript
```powershell
# Import module before starting transcript (PS 5.1 requirement)
Import-Module dbatools
Start-Transcript
Get-DbaDatabase -SqlInstance sql01
Stop-Transcript
```

---

## Troubleshooting

### Common Issues

**Issue: "Could not connect to SqlInstance"**
```powershell
# Test connectivity
Test-DbaConnection -SqlInstance sql01

# Check if SQL Browser service is running for named instances
Get-DbaService -ComputerName sql01 -Type Browser
```

**Issue: "Access denied" errors**
```powershell
# Ensure you have proper SQL permissions
Get-DbaLogin -SqlInstance sql01 -Login $env:USERNAME

# For Windows authentication issues, verify domain connectivity
Test-ComputerSecureChannel
```

**Issue: Module won't import**
```powershell
# Check execution policy
Get-ExecutionPolicy

# Force reimport if needed
Remove-Module dbatools -Force -ErrorAction SilentlyContinue
Import-Module dbatools -Force
```

For more troubleshooting help, visit our [troubleshooting guide](/troubleshooting/) or ask in [Slack](/slack).

---

## Why dbatools?

| Traditional Methods | dbatools |
|-------------------|----------|
| **SSMS:** Click through 50 servers manually | **PowerShell:** Query all 50 servers in one command |
| **Migration:** Days of planning and execution | **Migration:** Minutes with automated best practices |
| **Backup Testing:** Manual restores, hope for the best | **Backup Testing:** Automated verification of all backups |
| **Documentation:** Hours of manual collection | **Documentation:** Instant HTML/Excel reports |
| **Scripting:** Complex T-SQL across versions | **Scripting:** Consistent commands for SQL 2000-2022 |

---

## More Information

Want to know more? Our [blog](/blog) has great articles:

- [Getting complex with Restore-DbaDatabase](/complex-restores/)
- [Scheduling PowerShell Tasks with SQL Server Agent](/agent/)
- [Building a dedicated backup test server](/dedicated-server/)
- [Scheduling a migration](/scheduling-a-migration/)
- [Dealing with SPNs](/schwifty/)
- [Installing modules from the PowerShell Gallery](/soup2nutz/)
- [Offline installs of dbatools](/offline)
- [Talking to your security team about PowerShell and dbatools](/secure/)

---

## Community & Support

**Get Involved:**
- ⭐ [Star us on GitHub](https://github.com/dataplat/dbatools)
- 🐛 [Report issues](https://github.com/dataplat/dbatools/issues)
- 💡 [Request features](https://github.com/dataplat/dbatools/issues)
- 🤝 [Contribute code](/contributing)

**Community Channels:**
- [#dbatools on SQL Community Slack](/slack)
- [Bluesky](https://bsky.app/profile/dbatools.io)

**Stats:**
- 📦 7+ million downloads on [PowerShell Gallery](https://www.powershellgallery.com/packages/dbatools)
- 👥 250+ contributors
- 🎯 700+ commands
- 🚀 10+ years of active development
