---
title: "Install"
date: 2016-05-06
slug: "install"
draft: false
---

We subscribe to idea that developers should [**release early and release often**](https://about.gitlab.com/2016/07/21/release-early-release-often/). dbatools has been around since 2014 and has been tested by thousands of people and each release gets better and better because of your early suggestions, bug reports and feedback.

> dbatools works on PowerShell Core. This means that you can run a large majority of our commands on **Linux** and **macoS** 👌👍

> dbatools values backward compatibility. We still deliver for people running PowerShell v3 and SQL Server 2000.

Need a detailed walk-thru? Please see our **New to PowerShell?** section below.

## Minimum Requirements

##### Server

- SQL Server 2000
- No PowerShell needed on the host for SQL Server-only commands
- [PowerShell remoting](/secure) enabled on the host for remote Windows commands

##### Workstation

- Windows 7 with PowerShell 3
- Linux or macOS with PowerShell 7

Like SSMS, dbatools **is not** required on the server. For more information on installation and requirements see [this post](/install/).

## Method 1: Install dbatools using Install-PSResource (PowerShell 7.4+)

For PowerShell 7.4 and above, Microsoft recommends using `Install-PSResource`:

> Install-PSResource dbatools

Install-PSResource requires Run As Administrator, and installs dbatools globally. Don't have admin access or want to install dbatools only for yourself?

> Install-PSResource dbatools -Scope CurrentUser

## Method 2: Install dbatools using Install-Module

The PowerShell Gallery and the command `Install-Module` are available in Windows 10+, Windows Server 2016+, and PowerShell 7. For Windows 7, 8, Server 2012, first install WMF5 from [https://aka.ms/wmf5download](https://aka.ms/wmf5download) then reboot.

> Install-Module dbatools

Install-Module requires Run As Administrator, and installs dbatools globally. Don't have admin access or want to install dbatools only for yourself?

> Install-Module dbatools -Scope CurrentUser

**Note:** dbatools has dependent libraries that will be installed automatically when using Install-Module or Install-PSResource.

## Method 3: Offline Install

Don't have Internet access on your DBA workstation? Check out our [offline install](/offline) guide.

## Method 4: Chocolatey

You can also install dbatools using [chocolatey](https://chocolatey.org/packages/dbatools)

> choco install dbatools

## New to PowerShell?

If you're new to PowerShell and would like in-depth walk-thrus and more, please visit:

- [walk-thru: installing modules from the powershell gallery](/soup2nutz).
- [getting started with powershell](/start)
- [offline installs of dbatools](/offline)
- [talking to your security team about powershell and dbatools](/secure/)

### Using dbatools

Installing the module will make hundreds of commands available to you. Here's a few:

![](/images/img_5a2156ff8b67b.png)

Unsure what to do next? Visit the [Getting Started](/getting-started/) for more information and code samples. Or check a [list of all the features](/functions), which includes some pretty documentation.

Like what you see? [Please rate this module on Microsoft Script Center](https://gallery.technet.microsoft.com/scriptcenter/Use-PowerShell-to-Migrate-86c841df) or [give us a star on GitHub](/git)!
