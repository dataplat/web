---
title: "New Release – Schwifty – All About SPNs"
date: 2017-02-06
slug: "schwifty"
aliases:
  - /schwifty/
  - /schwifty/index.html
categories: [announcements]
tags: [kerberos, mrbulldops, security, serviceprincipalname, spn]
draft: false
author: "Drew Furgiuele"
---

**These commands were updated Feb 8, 2017 (v0.8.709) to incorporate feedback ❤️**

Right, so the first thing you need to know is: I'm not Chrissy. [My name's Drew](http://www.twitter.com/pittfurg), and I'm here tell you about an exciting new release of dbatools: schwifty!

In this release we've added three new commands to **help you manage SPNs for SQL Server Kerberos authentication**. If you have a lot of linked servers in your environment, then this is probably a welcome addition to the toolset for you.

These commands leverage SQL Server instance info from commands that already existed in the dbatools code base and active directory PowerShell support to determine required SPNs for all instances on a given computer and whether they're set or not. If they aren't, we have commands to not only set the SPNs for you, but also enable [constrained delegation](https://technet.microsoft.com/en-us/library/cc995228.aspx) to accounts for the SPNs that were just added.

[YouTube video: OVYFU3Ktqc0](https://www.youtube.com/embed/OVYFU3Ktqc0)

## Then

Before these functions were added to dbatools, you had a couple options when it came to checking/adding SPNs:

1. setspn.exe and ActiveDirectory Users and Computers. setspn.exe is a windows command that you could use to add an SPN to given Active Directory account. And it works great! You do need to know the SPN and account you want to set it for ahead of time; it doesn't really care about what kind of SPN you're setting, but it'll let you set it. You could also use it to check for dupes, list out what SPNs exist for an account… [it's a pretty well documented command](https://technet.microsoft.com/en-us/library/cc731241(v=ws.11).aspx). Setting the SPN is only part of what makes SQL Server Kerberos authentication work, though. You still need to set delegation on the account to the services in question. That normally requires you going into the Active Directory Users and Computers application and adding delegation outside of the setspn.exe command prompt. Yuck!

2. Microsoft Kerberos Configuration Manager for SQL Server. Microsoft does have a tool to help you manage your SPNs for SQL Server too. It's called [Kerberos Configuration Manager for SQL Server](https://www.microsoft.com/en-us/download/details.aspx?id=39046) and it's awesome because not only does it tell you what SPNs need set, but it checks to see if they are there. If they aren't, it'll try and fix them for you, or generate a .cmd file that you can run on your own. It's a neat tool that essentially generates SPNs based on best practice straight from Microsoft. While the auto fixing and script generation are neat, the program can be a little slow. Also: up until very recently (2017 Jan 31), it wasn't compatible with SQL Server 2016. It also doesn't set delegation for your accounts, either. Less yuck, but still: yuck!

## Now

Now we have four new commands to help manage SPNs – [Get-DbaSpn](https://dbatools.io/Get-DbaSpn), [Test-DbaSpn](https://dbatools.io/Test-DbaSpn), [Set-DbaSpn](https://dbatools.io/Set-DbaSpn), and [Remove-DbaSpn](https://dbatools.io/Remove-DbaSpn). Our goal with the new SPN commands was to make them fast, and make them at least as useful as the GUI tool provided by Microsoft, but to allow multi-server administration and automation of setting correct SPNs and enabling constrained delegation. And we've done it! These commands are based on [guidance from MSDN about setting SQL Server Service Principal names which you can read more about here](https://msdn.microsoft.com/en-us/library/ms191153.aspx).

Oh and for the performance minded among you, we've built these functions to be super fast; faster than the traditional setspn.exe and Configuration Manager options by quite a bit. While the GUI tool took up to 51 seconds per server, our testing showed the ability to return required SPN info for **9 servers in 9 seconds**. That's 1 server per second, granted, we don't test for SSAS or SSRS at this time, but we do have it planned, and it'll still be quick.

Take a look below for a detailed description of the new commands in this release. You can use these new functions by [grabbing our latest release (0.8.709)](https://dbatools.io/download).

A couple things to note when using these functions:

1. You'll need at least permission to read from your domain's Active Directory, and in the case of adding SPNs, the ability to modify. That means you'll need to run the commands as a user with those permissions, or use the -Credential parameters.

2. Fully explore Get-DbaSpn and Test-DbaSpn commands before moving on to Set-DbaSpn. We also included -WhatIf support in Set-DbaSpn so you can see what SPNs will be added to which accounts before you actually apply them. We've done our best to make sure we fully support a variety of different configurations and network names, but you should know what will be applied before you actually do it.

## New Commands

### – [Get-DbaSpn](https://dbatools.io/Get-DbaSpn)

Returns a list of any service principal names (SPNs) set for a given server or active directory account name

![Get-DbaSpn output](/images/img_5899e6fa0bc11.png)

### – [Test-DbaSpn](https://dbatools.io/Test-DbaSpn)

Returns of listing of "required" SPNs for a given computer's instance of SQL Server. The cmdlet will discover all instances of SQL Server on a given computer name. For each instance found, the cmdlet will generate a list of required SPNs based on active TCP/IP ports. The cmdlet will also warn you if an instance is using dynamic ports. Each returned SPN object will also specify if the SPN is currently set or not.

![Test-DbaSpn output](/images/img_58984230e128a.png)

You can even check your entire estate in just one line. Here, you can see us testing several instances in our lab.

![Test-DbaSpn multiple instances](/images/img_5898aec8d2a1c.png)

Or use Test to help easily Set all required SPNs

![Test-DbaSpn with Set](/images/img_5899e4720ac5a.png)

### – [Set-DbaSpn](https://dbatools.io/Set-DbaSpn)

Connects to Active Directory and sets a given SPN to a given account. Will also set constrained delegation to the account to the recently added SPN.

![Set-DbaSpn output](/images/img_5899e57f5a96d.png)

Both Set and Remove fully support -WhatIf

![Set-DbaSpn -WhatIf output](/images/img_5899e423e98e9.png)

### – [Remove-DbaSpn](https://dbatools.io/Remove-DbaSpn)

Connects to Active Directory and removes a given SPN to a given account. Will also remove the associated constrained delegation.

The following screenshot shows a way to easily remove SPNS of decommissioned servers.

![Remove-DbaSpn output](/images/img_5899e3952455a.png)

## Related Commands

We also have a few other commands that can help you deal with SPNs.

- **[Repair-DbaInstanceName](https://dbatools.io/Repair-DbaInstanceName)** and **[Repair-DbaServerName](https://dbatools.io/Repair-DbaServerName)**

  When a SQL Server's host OS is renamed, the SQL Server should be as well. This helps with Availability Groups and Kerberos. [Repair-DbaInstanceName](https://dbatools.io/Repair-DbaInstanceName) helps determine if your OS and SQL Server names match, and thus, if a rename is required. If a rename is required, run [Repair-DbaServerName](https://dbatools.io/Repair-DbaServerName).

- **[Test-DbaConnectionAuthScheme](https://dbatools.io/Test-DbaConnectionAuthScheme)**

  This command returns the transport protocol and authentication scheme of the connection. This is useful to determine if your connection is using Kerberos. By default, the ConnectName, ServerName, Transport and AuthScheme of the current connection will be returned.

## Coming Soon

These commands are just the start of our support for SPNs. Right now, they're just focused on SQL-related services on your computers. In the future, we're going to extend these scripts to look at ALL services on your computers and tie them back to service accounts and SPNs. **This includes SSAS, SSIS, and SSRS SPN support.** We're also going to keep looking at the commands and adding support for anything we didn't think of when we released, which is why it's important that you give us feedback (more on that below).

Thanks for reading, and I hope you enjoy these new commands! If you have any issues or questions about their use, feel free to drop by our [Slack channel](https://dbatools.io/slack), [#dbatools](https://sqlcommunity.slack.com/messages/dbatools), and let us know. We'd love to hear from you!

\- Drew
