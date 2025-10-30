---
title: "What's new and different in dbatools 2.0"
date: 2023-03-05
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "dbatools-2-0"
aliases:
  - /dbatools-2-0/
  - /dbatools-2-0/index.html
categories: [announcements]
tags: [release]
draft: false
---

So much is new and different! If you'd like to try it while you read this blog post, you can currently install dbatools 2.0 by executing the following command:

```powershell
Install-Module dbatools
```

## Requirements

dbatools still works on PowerShell v3 an v4! Thanks to Microsoft for making that possible with SMO.

PowerShell v5.1 is still supported, of course. That's what I use and develop on. But when it comes to PowerShell v7, we did up the requirements to 7.2 and above and 6.0 is no longer supported. That's because we changed underlying our dotnet version to dotnet 6 and that's only supported in PowerShell v7.2 and above.

## dbatools is now two modules (but you still just install it using Install-Module dbatools)

dbatools is now divided into two modules. This helps reduce the amount of space we require on your hard drive, especially if you update often.

### dbatools

The `dbatools` has the PowerShell code. Depending on the team's productivity, this can change and require an update multiple times per day. Usually, though, we do about weekly releases.

If you're used to looking at our code, you'll see that `allcommands.ps1` is no longer there. That combined file was often pretty big and people were tempted to modify it. Now, it's a compressed file called `dbatools.dat` that's 1/5th the size. This file is automatically expanded and imported when dbatools is loaded. If you end up having any issues with your anti-virus, please file an issue immediately so that we can take a look. I may have to revert this change (AV's sometimes hate compression), but so far, it's worked well for me.

You can find the GitHub repository for dbatools in our organizational repository, [dataplat/dbatools](https://github.com/dataplat/dbatools).

### dbatools.library

The `dbatools.library` has the big DLL/library files and our specific C# types like `dbasize`. This module will rarely change, perhaps 3-4 times per year. This module, which you can use for your own projects if you're a developer, supplies the following libraries:

  * SQL Management Objects (SMO) - these are the DLLs that power dbatools and SQL Server Management Studio
  * SqlClient - this provides Microsoft.Data.SqlClient which replaces System.Data.SqlClient
  * DacFx - this is for sqlpackage and publishing, etc
  * Microsoft.SqlServer.XEvent.XELite - This is a new library that helps us manage Extended Events
  * Bogus - this framework helps us with our Data Generation and Masking commands
  * XESmartTarget - This is another framework that helps us with SQL Server Extended Events

It's about 43MB when you download it from the PowerShell Gallery and like 162MB on disk. `dbatools.library` contains the libraries for both Desktop (Windows) and Core (Windows Core, Linux and mac OS).

You can find the GitHub repository for dbatools.library in our organizational repository, [dataplat/dbatools.library](https://github.com/dataplat/dbatools.library).

## Connection defaults are now more secure

Remember when the whole web went from HTTP to HTTPS? This is sorta the same, but for SQL Server connections. These new defaults, which were modified by Microsoft's underlying libraries, may prevent you from being able to connect until you make some changes.

You can read more on my blog post, "[New Encryption and Certificate Defaults in Microsoft's SQL Server Connection Provider](https://blog.netnerds.net/2023/03/new-defaults-for-sql-server-connections-encryption-trust-certificate/)".

![Encryption message](/images/dbatools-encryption-message.png)

That message will appear until a later version or until you configure the message to no longer appear.

```powershell
Set-DbatoolsConfig -Name Import.EncryptionMessageCheck -Value $false -PassThru | Register-DbatoolsConfig
```

## We now support fewer ways to install dbatools

Dependency management is hard, so we've removed `install.ps1`. The easiest way, really, is to use a modern version of Windows that is connected to the Internet, then using `Install-Module` or `Save-Module`. dbatools still works on older versions of PowerShell, all the way back to v3 but you'll just have to get the files in a different way now.

The upside is that this move will save millions of terabytes of storage all around the world AND! The way we setup the library just makes it so much more reliable. It's hard to explain because I don't know enough about DLL management, but all I know is that this works so much better.

## Development and debugging now requires cloning dbatools from the GitHub repository

Previously, we invested a lot of time attempting to strike a balance between debugging capabilities and fast imports. This required us to include even more code in the module and having that code there confused some non-dev end-users who wanted to make changes to a command because they didn't understand how we import the module.

Allll that whole run-on sentence to say, if you'd like to debug, you will need to clone our our repository to grab the code, as the PowerShell Gallery version no longer supports debugging.

## The folder structure changed slightly

When I was a younger scripter, I'd see words like "public" and "private" and thought it so confusing. If it's so private, why can I see it? Then I realized they were like helper commands that end-users don't need. So it made more sense to me to have a folder called `functions` where I saved all my exported/public functions. Then I'd create a folder called `internal` for my internal/private commands.

I thought this naming scheme would help others understand it the way that I did, and perhaps it was useful. But then one day I woke up and thought functions/internal was ugly and public/private was pretty. So I renamed them and our core team seemed happy with the change. Now it feels all grown up.

## SqlCollaborative is now DataPlat

Man, that was hard to spell. We've renamed our GitHub Organization and we changed all internal references to s-q-l-c-o-l-l-a-b-o-r-a-t-i-v-e. Even our C# class namespace has changed.

## A bunch of other stuff

For more details on what else has changed, please [check out our merged Pull Requests since October 22, 2022](https://github.com/dataplat/dbatools/pulls?q=is%3Apr+is%3Amerged+updated%3A%3E2022-10-22+) to see.

And again, if you'd like to try dbatools 2.0, run the following code:

```powershell
Install-Module dbatools
```

Let us know how it works for you!
