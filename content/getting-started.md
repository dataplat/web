---
title: "Getting Started"
date: 2016-05-06
lastmod: 2025-10-30
slug: "getting-started"
draft: false
---

dbatools is a **free** PowerShell module with nearly **700 commands** that replace manual SQL Server administration with powerful and fun automation.

**Migrate SQL Server instances in minutes instead of days.** Test hundreds of backups automatically. Find that one database across 50 servers. **Performance at Scale:** Migrate terabyte databases in under an hour. Test 1000+ backups per hour. Manage 100+ SQL instances from a single console.

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

## Your First 5 Minutes

Let's get you up and running with dbatools. These commands are **read-only and safe** to explore.

```powershell
# 0. Check your PowerShell version (v3+ required for Windows, Core 7.4+ for Linux/macOS)
$PSVersionTable.PSVersion

# 1. Install dbatools (takes about 30 seconds)
Install-Module dbatools -Scope CurrentUser

# 2. See all databases on your local SQL Server
# Replace 'localhost' with your SQL Server name if needed
Get-DbaDatabase -SqlInstance localhost

# 3. Check when your databases were last backed up
Get-DbaLastBackup -SqlInstance localhost | Format-Table

# 4. Get detailed information about a specific database
Get-DbaDatabase -SqlInstance localhost -Database master
```

**What just happened?**
- `Get-DbaDatabase` shows all your databases - no clicking through SSMS
- `Get-DbaLastBackup` checks backup history - instantly spot backup problems
- These commands are **read-only** - they won't change anything on your server

**Note:** Replace `localhost` with your SQL Server instance name (like `sql01`, `server\instance`, or `server,port`).

---

## Installation

### Quick Install (Recommended)
```powershell
# One-time setup: Allow PowerShell to run scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Install dbatools for current user (no admin rights needed)
Install-Module dbatools -Scope CurrentUser
```

That's it! dbatools is now installed and ready to use.

### First Time Using PowerShell Gallery?
If you get a prompt about trusting PSGallery, type `Y` for Yes. You only need to do this once:
```powershell
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
```

### Certificate Change (v2.5.5+ Users)
If you're upgrading from an older version, you may need to use:
```powershell
Install-Module dbatools -Force -SkipPublisherCheck
```
[Learn more about our certificate change →](/azure-trusted-signing/)

<details>
<summary><strong>Other Installation Methods (Click to expand)</strong></summary>

#### Install for All Users (Requires Admin)
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

#### Chocolatey
```powershell
choco install dbatools
```

</details>

---

## Learning Approach

dbatools has over [700 commands](/commands) - don't let that overwhelm you! Think of it like learning SQL Server: start with the basics, then expand your knowledge over time.

### Start with These 5 Commands

You can accomplish 80% of common tasks with just these five commands:

1. **`Get-DbaDatabase`** - See all databases across servers
2. **`Get-DbaLastBackup`** - Check backup status
3. **`Test-DbaLastBackup`** - Actually verify your backups work (!)
4. **`Copy-DbaDatabase`** - Copy databases between servers
5. **`Find-DbaDatabase`** - Search for databases by name/pattern

Once you're comfortable, branch out to jobs, logins, migrations, or whatever you work with most.

---

## Common Use Cases

Now that you've seen the basics, here are some powerful real-world examples.

### Backups & Restores
```powershell
# Backup all user databases
Get-DbaDatabase -SqlInstance localhost -ExcludeSystem | Backup-DbaDatabase

# Simple restore
Restore-DbaDatabase -SqlInstance localhost -Path "C:\temp\mydb.bak"

# Test ALL your backups on a different server
# This actually restores them, verifies integrity, then drops them
Test-DbaLastBackup -SqlInstance sql01 -Destination sql02 | Out-GridView
```

### Finding Things Fast
```powershell
# Find a database across multiple servers
Find-DbaDatabase -SqlInstance sql01, sql02, sql03 -Pattern "Production"

# Find stored procedures containing specific text
Find-DbaStoredProcedure -SqlInstance localhost -Pattern "INSERT INTO Audit"

# Discover SQL instances on your network
Find-DbaInstance -ComputerName server01, server02
```

### Monitoring & Health
```powershell
# Find databases without recent backups
Get-DbaLastBackup -SqlInstance localhost |
    Where-Object LastFullBackup -lt (Get-Date).AddDays(-7)

# Check for corruption
Get-DbaLastGoodCheckDb -SqlInstance localhost | Out-GridView

# Monitor currently running queries
Install-DbaWhoIsActive -SqlInstance localhost -Database master
Invoke-DbaWhoIsActive -SqlInstance localhost
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
Start-DbaMigration @params

# Copy just the jobs between servers
Copy-DbaAgentJob -Source sql01 -Destination sql02
```

### Quick Wins
- Lost sysadmin access? Use [Reset-DbaAdmin](/Reset-DbaAdmin)
- Need to test your backups? Use [Test-DbaLastBackup](/Test-DbaLastBackup)
- SPN management got you down? Use [our suite of SPN commands](/schwifty)
- Got so many databases you can't keep track? Use [Find-DbaDatabase](/Find-DbaDatabase)

---

## Getting Help

```powershell
# Detailed help for any command
Get-Help Test-DbaLastBackup -Full

# See examples
Get-Help Test-DbaLastBackup -Examples

# Find commands by keyword
Get-Command -Module dbatools *backup*
Find-DbaCommand -Tag Migration

# Open online help in browser
Get-Help Test-DbaLastBackup -Online
```

**Resources:**
- [Documentation](https://docs.dbatools.io)
- [Command Reference](/commands)
- [Blog](/blog)
- [Slack Community](/slack) - Friendly help from the community

---

## Advanced Topics

### Authentication

By default, dbatools uses Windows Authentication (your current login). To use SQL logins or different Windows credentials:

#### SQL Authentication
```powershell
$cred = Get-Credential sqladmin
Get-DbaDatabase -SqlInstance localhost -SqlCredential $cred
```

#### Alternative Windows Credentials
For commands that access Windows (like [Get-DbaDiskSpace](/Get-DbaDiskSpace)):
```powershell
$cred = Get-Credential ad\winadmin
Get-DbaDiskSpace -ComputerName sql01 -Credential $cred
```

#### Storing Credentials Securely
PowerShell's `Export-CliXml` provides a fast and secure way to store credentials to disk. The credentials are encrypted using Windows Data Protection API (DPAPI) and can only be decrypted by the same user on the same machine.

```powershell
# Save credentials to disk (one-time setup)
Get-Credential | Export-CliXml -Path "$HOME\sql-credentials.xml"

# Reuse saved credentials in scripts
$cred = Import-CliXml -Path "$HOME\sql-credentials.xml"
Get-DbaDatabase -SqlInstance localhost -SqlCredential $cred
```

For more advanced credential management approaches including the Secrets Management module, see [Rob Sewell's guide](https://blog.robsewell.com/blog/good-bye-import-clixml-use-the-secrets-management-module-for-your-labs-and-demos/).

### Custom Ports
If you use non-default ports and SQL Browser is disabled, use a colon or comma:

```powershell
# Using colon or comma for non-default ports
Get-DbaDatabase -SqlInstance 'sql01:55559'
Get-DbaDatabase -SqlInstance 'sql01,55559'  # Note: quotes required with comma
```

PowerShell treats commas as array separators, so you must use quotes.

### PowerShell Transcript Logging
```powershell
# Import module before starting transcript (PS 5.1 requirement)
Import-Module dbatools
Start-Transcript
Get-DbaDatabase -SqlInstance localhost
Stop-Transcript
```

---

## Troubleshooting

### Common Issues

**Issue: "Could not connect to SqlInstance"**
```powershell
# Test connectivity
Test-DbaConnection -SqlInstance localhost

# Check if SQL Browser service is running (for named instances)
Get-DbaService -ComputerName localhost -Type Browser
```

**Issue: "Access denied" errors**
```powershell
# Ensure you have proper SQL permissions
Get-DbaLogin -SqlInstance localhost -Login $env:USERNAME

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

For more help, visit our [troubleshooting guide](/troubleshooting/) or ask in [Slack](/slack).

---

## More Learning Resources

### 📖 Learn dbatools in a Month of Lunches

Want structured, in-depth training? Check out our official book [Learn dbatools in a Month of Lunches](/book) by dbatools creator Chrissy LeMaire and core contributors Rob Sewell, Jess Pomfret, and Cláudio Silva (Manning Publications, 2022).

In **28 bite-sized lessons**, learn automation techniques directly from the experts who built dbatools. Perfect for DBAs and systems engineers who want to master SQL Server automation.

### Blog Articles

Our [blog](/blog) has great articles for diving deeper:

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

---

## System Requirements

### SQL Server Compatibility
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

### Operating System Compatibility
| OS | Commands Supported | PowerShell Required |
|----|-------------------|-------------------|
| Windows 7/8/10/11 | 100% | v3+ |
| Windows Server 2008 R2+ | 100% | v3+ |
| Linux (Intel/ARM64) | 78% | Core 7.4.0+ |
| macOS (Intel/M1) | 78% | Core 7.4.0+ |

💡 **Note:** Commands requiring SQL WMI or `-ComputerName` parameter typically don't work on Linux/macOS.

### Network Requirements
For remote SQL Server management, ensure these ports are accessible:

| Protocol | Default Port | Used By | Required For | Firewall Note |
|----------|-------------|---------|--------------|---------------|
| SQL Database Engine | 1433 | `Get-DbaDatabase` | 62% of commands | Allow inbound on SQL Server |
| WS-Management | 5985/5986 | `New-DbaClientAlias` | 25% of commands | Windows Remote Management |
| SQL WMI | 135 | `Enable-DbaAgHadr` | 4% of commands | DCOM/RPC endpoint mapper |
| SMB | 445 | `Backup-DbaDatabase` | 4% of commands | File sharing for backups |

**Firewall Tip:** Create a dedicated Windows Firewall rule group for dbatools management traffic.
