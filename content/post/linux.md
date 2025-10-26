---
title: "dbatools & SQL on Linux"
date: 2019-07-09
author: "Chrissy LeMaire"
slug: "linux"
aliases:
  - /linux/
  - /linux/index.html
categories: [announcements]
tags: [linux]
draft: false
---

![TSQL2SDAY](https://blog.netnerds.net/wp-content/uploads/2016/06/TSQL2SDAY-150x150.png)

Today's article is part of [T-SQL Tuesday](https://tracyboggiano.com/archive/2019/07/t-sql-tuesday-116-sql-on-linux/). T-SQL Tuesday is the brainchild of Adam Machanic. It is a blog party on the second Tuesday of each month and everyone is welcome to participate.

This month's T-SQL Tuesday is hosted by Tracy Boggiano ([b](https://tracyboggiano.com/)|[t](https://twitter.com/tracyboggiano)), is all about Linux.

## dbatools and Linux

As a long-time Linux user and open-source advocate, I was beyond excited when [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux?view=powershell-6) and [SQL Server](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup?view=sql-server-2017) came to Linux.

A few of the decisions I made about dbatools were actually inspired by Linux. For instance, when dbatools was initially released, it was [GNU GPL](https://dbatools.io/dbatools-is-free-as-in-speech/) licensed, which is the same license as the Linux kernel (we've since re-licensed under the more permissive [MIT](https://dbatools.io/mit)). In addition, dbatools' all-lower-case naming convention was also inspired by Linux, as most commands executed within Linux are in lower-case and a number of projects use the lower-case naming convention as well.

## dbatools on Linux

Thanks to Microsoft's PowerShell and SQL Server teams, dbatools runs on Linux and Mac OS!

As covered in our book which'll be released next year, dbatools in a Month of Lunches, 75% of commands in dbatools are supported by Linux and Mac OS.

![os diagram](/images/os.png)

Commands that are pure-SQL Server, like [Get-DbaDatabase](https://dbatools.io/Get-DbaDatabase) or [New-DbaLogin](https://dbatools.io/New-DbaLogin), work on Linux and Mac OS. Others that rely on WMI or remoting, like [Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace) or [Enable-DbaAgHadr](https://dbatools.io/Enable-DbaAgHadr), do not currently work on Linux.

If you're curious, our [docs site](https://docs.dbatools.io) will tell you if a command is supported by Linux and Mac OS.

![availability grid](/images/ag.png)

And, of course, you can also ask on Linux itself. After installing dbatools, run `Get-Command -Module dbatools` to see all of the commands that are available.

## SQL on Linux

dbatools also supports SQL on Linux. If it works on SQL Server Management Studio, it'll work with dbatools as we're built on the same libraries. Also because SQL on Linux is pretty much the same everything as SQL on Windows.

Interested in learning more? Check out the #1 rated SQL Server on Linux book, [Pro SQL Server on Linux](https://amzn.to/2YHPe4I) by Microsoft's [Bob Ward](https://blogs.msdn.microsoft.com/bobsql/). This book was actually edited by our friend [Anthony Nocentino](https://www.centinosystems.com/blog/) and it's rumored that Anthony will contribute some sweet Linux-centric commands to dbatools when the Year of the Linux Desktop arrives, so we're looking forward to that 😊

![sad tony twitter image](/images/sadtony.jpg)

Kidding aside, dbatools supports Linux and Mac OS in a number of ways. Not only can you run dbatools FROM Linux, you can also connect TO SQL on Linux. We even have fantastic Registered Server support that eases authentication.

### To Linux / macOS

Connecting to SQL Server (Windows or Linux) from Linux or Mac OS is generally done with using an alternative `-SqlCredential`. So let's say you follow Microsoft's guide to setting up [SQL on Linux](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup?view=sql-server-2017) or if you use dbatools' [Docker guide](https://dbatools.io/docker), you'll likely need to authenticate with the `sa` or `sqladmin` account. Execute the following command.

```
Get-DbaDatabase -SqlInstance sqlonlinux -SqlCredential sa
```

You'll then be prompted for your password, and voilà! Don't want to type your password every time? You can reuse it by assigning the credential to a variable.

```
$cred = Get-Credential sa
Get-DbaDatabase -SqlInstance sqlonlinux -SqlCredential $cred
```

You can also export your credentials to disk using Export-CliXml. The password will be encrypted and only the same user/computer can decrypt.

```
Get-Credential sa | Export-CliXml -Path C:\temp\creds.xml
$cred = Import-CliXml  -Path C:\temp\creds.xml
Get-DbaDatabase -SqlInstance sqlonlinux -SqlCredential $cred
```

Prefer using the Windows Credential Store instead? Check out the PowerShell module, [BetterCredentials](https://github.com/Jaykul/BetterCredentials).

### To Linux / macOS Using Registered Servers

You can also use Local Registered Servers! This functionality was added in dbatools 1.0

```
Connect-DbaInstance -SqlInstance sqlonlinux -SqlCredential sa | Add-DbaRegServer -Name "SQL Server on Linux"
```

From there, you can see it in SQL Server Management Studio's Local Server Groups.

![cms servers pane](/images/cms.png)

And the detailed pane

![registered servers detailed pane](/images/reg2.png)

Ohhh! What! Now you can do this without worrying about authentication:

```
Get-DbaRegServer -ServerName sqlonlinux | Get-DbaDatabase
```

## From dbatools on macOS to SQL Server on Windows

Something that I had super fun doing was joining my Mac Mini to my homelab then authenticating flawlessly with my domain-joined, Windows-based SQL Server. Didn't even need the `-SqlCredential` because Integrated Authentication worked 👍

![mac integrated auth screenshot](https://pbs.twimg.com/media/DtS8f4BXgAAiebJ.jpg:large)

If you cannot join your Linux or Mac OS workstation to a Windows domain, you can still use `-SqlCredential`. This parameter not only supports SQL Logins, but Windows logins as well. So you could connect to a Windows-based SQL Server using an Active Directory account such as `ad\sqladmin`.

Got any questions, hit up #dbatools on the SQL Server Community Slack at [aka.ms/sqlslack](https://aka.ms/sqlslack) and one of our friendly community members will be there to assist.

\- Chrissy 🐈
