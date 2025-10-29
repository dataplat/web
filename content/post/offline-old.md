---
title: "Offline Installs of dbatools"
date: 2017-07-26
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "offline-old"
aliases:
  - /offline-old/
  - /offline-old/index.html
categories: [announcements]
tags: [party]
draft: false
---

If you work in a secure environment or your computers cannot access the Internet for any reason, you can still install dbatools with ease by downloading the zip from a workstation that does have Internet access 🎉 And now that our module is digitally signed, you can keep your Execution Policy set to AllSigned, too.

There are essentially 3 ways to get the zip of our module

1. From PowerShell Gallery using Save-Module
2. From PowerShell Gallery by downloading from [powershellgallery.com/api/v2/package/dbatools](https://powershellgallery.com/api/v2/package/dbatools)
3. By downloading from [dbatools.io/zip](https://dbatools.io/zip)

Once the file has been downloaded, copy it to your secure server and place it in one of the directories in your `$env:PSModulePath` (type `$env:PSModulePath` at the prompt and press enter). This will allow PowerShell to autoload the module, saving you from having to Import-Module each time you start a new session.

## PowerShell Gallery

[PowerShell Gallery](https://dbatools.io/gallery) is Microsoft's official repository for PowerShell modules and scripts. It's likely unblocked at your organization, so using the Gallery is a great option.

#### Method 1

If you run Windows 10 or Windows Server 2016, you've already got support for the Gallery and can just issue the following command.

> Save-Module -Name dbatools -Path C:\temp

This will download the package, unzip it and place it into C:\temp\dbatools. Saving modules and investigating their content is actually a recommended practice by the PowerShell team, as it's always good to know what you're installing on your system.

#### Method 2

If your system is older and you do not have PowerShellGet or you haven't upgraded to [PowerShell 5.1](https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/wmf/setup/install-configure) (which comes with PowerShellGet), then you can just download the zip directly from the [Gallery's API](https://powershellgallery.com/api/v2/package/dbatools).

Note that **this will download a file ending in .nupkg**. Simply rename the file to .zip, extract and you're set. You can also use PowerShell to download the module and rename it, all in one shot.

> Invoke-WebRequest -Uri powershellgallery.com/api/v2/package/dbatools -OutFile c:\temp\dbatools.zip

Invoke-WebRequest is a bit slow, however, because of the progress bar, so I usually just download via GUI and rename.

## GitHub via dbatools.io/Zip

You can also easily download the latest version of our master GitHub repository by simply clicking on [dbatools.io/zip](https://dbatools.io/zip). If you're adventurous, you can even download our latest dev (beta) version at [dbatools.io/devzip](https://dbatools.io/devzip).

This is just an easy-to-remember redirector to GitHub's repo zip.

Note that there is a small difference between our GitHub repo and the PowerShell Gallery. The GitHub repo does not include a pre-compiled version of our library (dbatools.dll), while the PowerShell Gallery does. Ultimately, both ways work and there's really no difference. Excluding the dll from the GitHub repo just made it easier for our developers to avoid conflicts.

Once you've extracted the folder, make sure you rename it from **dbatools-master** or **dbatools-development** to plain o' **dbatools**.

## Unblocking DLLs

Our .psm1 takes care of Unblocking DLLs, but if you use the download and unzip method for other PowerShell modules, keep in mind that the DLLs will likely be blocked by default. If this happens, simply run

> Get-ChildItem -Recurse C:\path\to\module | Unblock-File

## $env:PSMODULEPATH

Just a quick note about `$env:PSMODULEPATH`. If you're not familiar with PSMODULEPATH, you may remember PATH from the DOS days and PSMODULEPATH is similar. Any module placed within your $env:PSMODULEPATH will automatically load once you execute a command from that module. Here, you can see the contents of my path and that I [manually added](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_psmodulepath) my git repo.

![](/images/img_59786e92eb630.png)

Thanks for reading,
- Chrissy
