---
title: "download"
date: 2016-05-06
slug: "download"
aliases:
  - /download/
  - /download/index.html
draft: false
---

We subscribe to idea that developers should [**release early and release often**](https://about.gitlab.com/2016/07/21/release-early-release-often/). dbatools has been around since 2014 and has been tested by thousands of people and each release gets better and better because of your early suggestions, bug reports and feedback.

> dbatools now works on PowerShell Core (aka PowerShell 6+). This means that you can run a large majority of our commands on **Linux** and **macoS** 👌👍

Need a detailed walk-thru? Please see our **New to PowerShell?** section below.

## Minimum Requirements

##### Server

- SQL Server 2000
- No PowerShell needed on the host for SQL Server-only commands
- [PowerShell remoting](https://dbatools.io/secure) enabled on the host for remote Windows commands

##### Workstation

- Windows 7 with PowerShell 3
- Linux or macOS with PowerShell 6.1

Like SSMS, dbatools **is not** required on the server. For more information on installation and requirements see [this post](https://dbatools.io/install/).

## Method 1: Install dbatools from the [PowerShell Gallery](https://www.powershellgallery.com/packages/dbatools) on newer systems

The PowerShell Gallery and the command `Install-Module` are natively available in Windows 10+ and Windows Server 2016+. If you run Windows 7, 8, Server 2012 **skip to method 2**.

> Install-Module dbatools

Install-Module requires Run As Administrator, and installs dbatools globally. Don't have admin access or want to install dbatools only for yourself?

> Install-Module dbatools -Scope CurrentUser

## Method 2: Install dbatools from the [PowerShell Gallery](https://www.powershellgallery.com/packages/dbatools) on older systems

If you run Windows 7, 8, Server 2012 & below you can either [install PackageManagement from powershellgallery.com](https://docs.microsoft.com/en-us/powershell/scripting/gallery/getting-started).

First, install WMF5 from [https://aka.ms/wmf5download](https://aka.ms/wmf5download) then reboot the computer.

> Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
> Install-Module dbatools

Install-Module requires Run As Administrator, and installs dbatools globally. Don't have admin access or want to install dbatools only for yourself?

> Install-Module dbatools -Scope CurrentUser

## Method 3: For legacy (Win7, Win8, etc) systems: scripted installer directly from [GitHub](https://dbatools.io/git)

> Invoke-Expression (Invoke-WebRequest -UseBasicParsing https://dbatools.io/in)

This will install dbatools locally (for just the current user) to the DocumentsWindowsPowerShellModules folder. Note: please only use `Invoke-Expression (Invoke-WebRequest..)` from sources you trust, like us 👍

<iframe width="560" height="315" src="https://www.youtube.com/embed/8P6ScCjEnLk" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## Method 4: Clone the repository from [GitHub](http://git.io/b3oo)

> git clone https://github.com/dataplat/dbatools

## Method 5: Offline install

Don't have Internet access on your DBA workstation? Check out our [offline install](https://dbatools.io/offline) guide.

## Method 6: chocolatey!

Now, you can even install dbatools using [chocolatey](https://chocolatey.org/packages/dbatools)

> choco install dbatools

## New to PowerShell?

If you're new to PowerShell and would like in-depth walk-thrus and more, please visit:

- [walk-thru: installing modules from the powershell gallery](https://dbatools.io/soup2nutz).
- [getting started with powershell](https://dbatools.io/start)
- [offline installs of dbatools](https://dbatools.io/offline)
- [talking to your security team about powershell and dbatools](https://dbatools.io/secure/)

### Using dbatools

Installing the module will make hundreds of commands available to you. Here's a few:

![](https://dbatools.io/wp-content/uploads/2017/12/img_5a2156ff8b67b.png?w=800&ssl=1)

Unsure what to do next? Visit the [Getting Started](https://dbatools.io/getting-started/) for more information and code samples. Or check a [list of all the features](https://dbatools.io/functions), which includes some pretty documentation.

Like what you see? [Please rate this module on Microsoft Script Center](https://gallery.technet.microsoft.com/scriptcenter/Use-PowerShell-to-Migrate-86c841df) or [give us a star on GitHub](https://dbatools.io/git)!
