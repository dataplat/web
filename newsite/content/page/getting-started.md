---
title: "Getting Started"
date: 2016-05-06
slug: "getting-started"
aliases:
  - /getting-started/
  - /getting-started/index.html
draft: false
---

dbatools is a **free** PowerShell module with [over 500](https://dbatools.io/functions) SQL Server administration, best practice and migration commands included.

---

## First, download and install

To get started, first [download](https://dbatools.io/download) the dbatools module. Multiple download/install options are available, including installing from the [PowerShell Gallery](https://dbatools.io/gallery), [GitHub](https://dbatools.io/git) and [chocolatey](https://dbatools.io/chocolatey). PowerShell v3+ is the only requirement – Microsoft allowed us to include the required [SMO](https://docs.microsoft.com/en-us/sql/relational-databases/server-management-objects-smo/smo-object-model-diagram) libraries in our project!

Looking for more in-depth information? Read [Installing modules from the PowerShell Gallery](https://dbatools.io/soup2nutz/) and [Offline installs of dbatools](https://dbatools.io/offline).

## Usage scenarios

Ultimately, you can think of dbatools as a command-line SQL Server Management Studio. But in addition to the simple things you can do in SSMS (like starting a job), we've also read a whole bunch of docs and came up with commands that do nifty things quickly.

- Lost sysadmin access and need to regain entry to your SQL Server? Use [Reset-DbaAdmin](https://dbatools.io/Reset-DbaAdmin).
- Need to easily test your backups? Use [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup).
- SPN management got you down? Use [our suite of SPN commands](https://dbatools.io/schwifty) to find which SPNs are missing and easily add them.
- Got so many databases you can't keep track? Congrats on your big ol' environment! Use [Find-DbaDatabase](https://dbatools.io/Find-DbaDatabase) to easily find your database.

## Approach to learning

dbatools now offers over [500 commands](https://dbatools.io/commands)! That number may seem overwhelming, but think of it like learning SQL Server. Start with the basics like Logins, Jobs, or Backup/Restore and later on, you can move on to Extended Events. To make it easier, we've included simplified usage examples below that will help you get started.

## Usage examples

Here are some of the commands we highlight at conferences. (See below for important information about alternative logins and specifying SQL Server ports).

<!-- GitHub Gist example: https://gist.github.com/potatoqualitee/e8932b64aeb6ef404e252d656b6318a2 -->

## Important Note

### Alternative SQL Credentials

By default, all SQL-based commands will login to SQL Server using Trusted/Windows Authentication. To use alternative credentials, including SQL Logins or alternative Windows credentials, use the `-SqlCredential`. This parameter accepts the results of `Get-Credential` which generates a [PSCredential](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-credential?view=powershell-5.1) object.

```
Get-DbaDatabase -SqlInstance sql2017 -SqlCredential sqladmin
```

![Screenshot of SQL credential usage](https://dbatools.io/wp-content/uploads/2016/05/cred.jpg?ssl=1)

A few (or maybe just one – [Restore-DbaDatabase](https://dbatools.io/Restore-DbaDatabase)), you can also use `-AzureCredential`.

### Alternative Windows Credentials

For commands that access Windows such as [Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace), you will pass the `-Credential` parameter.

<!-- GitHub Gist example: https://gist.github.com/potatoqualitee/0497115c902eb9ba09736fefa45a9a7a -->

To store credentials to disk, please read more at [Jaap Brasser's blog](https://www.jaapbrasser.com/quickly-and-securely-storing-your-credentials-powershell/).

### Servers with custom ports

If you use non-default ports and SQL Browser is disabled, you can access servers using a semicolon (functionality we've added) or a comma (the way Microsoft does it).

<!-- GitHub Gist example: https://gist.github.com/potatoqualitee/668624aadb504612dc4fa6736dd03cae -->

Note that PowerShell sees commas as arrays, so you must surround the host name with quotes.

## Support

dbatools aims to support as many configurations as possible, including

- SQL Server 2000 – 2017
- Express – Datacenter Edition
- Clustered and stand-alone instances
- Windows and SQL authentication
- Default and named instances
- Multiple instances on one server
- Auto-populated parameters for command-line completion (think -Database and -Login)

## More information

Want to know more? Our [blog](https://dbatools.io/blog) has a lot of great articles. Here are some of the ones that focus on functionality:

- [Getting complex with Restore-DbaDatabase](https://dbatools.io/complex-restores/)
- [Scheduling PowerShell Tasks with SQL Server Agent](https://dbatools.io/agent/)
- [Building a dedicated backup test server](https://dbatools.io/dedicated-server/)
- [Scheduling a migration](https://dbatools.io/scheduling-a-migration/)
- [Dealing with SPNs](https://dbatools.io/schwifty/)
