---
title: "Offline Installation of dbatools 2.0 with the dbatools.library Dependency"
date: "2023-04-05"
slug: "offline"
aliases:
  - /offline/
  - /offline/index.html
draft: false
---

If you work in an offline environment, you're probably familiar with how painful it can be to install anything, including PowerShell modules like dbatools.

In the past, dbatools had no dependencies, so the installation process was somewhat straightforward — you could even download a zip from our GitHub repo. However, with the introduction of [the new dbatools.library dependency](https://blog.netnerds.net/2023/03/whats-new-dbatools-2.0/), the installation process has become a smidge more complex. In this post, I'll walk you through the steps to install dbatools (and with it, dbatools.library) in an offline environment.

## What is dbatools.library?

The `dbatools.library` has the big DLL/library files and our specific C# types like `dbasize`. This module will rarely change, perhaps 3-4 times per year.

It's about 43MB when you download it from the PowerShell Gallery and like 162MB on disk. `dbatools.library` contains the libraries for both Desktop (Windows) and Core (Windows Core, Linux and mac OS). In dbatools 2.0, dbatools.library is a required dependency, so it needs to be available before you can use dbatools.

Fortunately, when running the `Save-Module` command, it will automatically download all the dependencies of the module you specify.

## Step-by-Step Guide

To download dbatools for offline use, you'll need a machine that is connected to the Internet and can run the `Save-Module` command. `Save-Module` is included in PowerShell v4 and up. You can also download it separately from the [PowerShell Gallery](https://www.powershellgallery.com/packages/PowerShellGet/) if you're using an older version of PowerShell (just rename .nuget to .zip and extract the files).

As mentioned earlier, `Save-Module` will download both dbatools and dbatools.library and save them to a folder on your machine. You can then copy the folder to your offline machine and install dbatools and dbatools.library from there.

Here are the steps to install dbatools and dbatools.library in an offline environment:

1. Save-Module dbatools and dbatools.library to a folder on your machine that is connected to the Internet.

```powershell
Save-Module dbatools -Path C:\temp\offline
```

2. Copy the folder to your offline machine (I tend to zip the folder and then copy it to the offline machine).
3. Save the modules to a folder in your `$env:PSModulePath` folder. For example, if you're using PowerShell 5.1, you can save the modules to the `C:\Users\username\Documents\WindowsPowerShell\Modules` folder. If you're using PowerShell 7, you can save the modules to the `C:\Users\username\Documents\PowerShell\Modules` folder.

Don't know where your `$env:PSModulePath` folder is? Run the following command:

```powershell
# Windows
$env:PSModulePath -split ';'

# Linux
$env:PSModulePath -split ':'
```

Pick any of those and place both dbatools and dbatools.library in the folder. This is what `$env:PSModulePath` looks like on my machine:

```powershell
C:\Users\cl\Documents\WindowsPowerShell\Modules
C:\Program Files\WindowsPowerShell\Modules
C:\Windows\system32\WindowsPowerShell\v1.0\Modules
```

Placing it in my home directory (`C:\Users\cl\Documents\WindowsPowerShell\Modules`) will give only me access to the module. If I wanted to make dbatools available to all users, including the SQL Server user account, I'd have to place the modules in the path that contains `Program Files`.

Note: If you really want to load it from a directory that is not in your `$env:PSModulePath`, that is possible too, but you'll need to explicitly import both modules. For example, if you want to load dbatools from the `C:\temp\offline` folder, you can run the following command:

```powershell
Import-Module C:\temp\offline\dbatools.library
Import-Module C:\temp\offline\dbatools
```

And there we have it, you can now use dbatools 2.0 (now available!) in an offline environment.

PS. Most of this blog post was written with GitHub Copilot 🤩