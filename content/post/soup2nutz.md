---
title: "Walk-Thru: Installing Modules from the PowerShell Gallery"
date: 2017-10-18
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "soup2nutz"
aliases:
  - /soup2nutz/
  - /soup2nutz/index.html
categories: []
tags: [party]
draft: false
---

Before Apple created the App Store and Microsoft created the Microsoft Store, Linux users basked in the glory of how easy it was to install programs or *packages* from centralized stores using *Package Managers* and remote repositories.

For years, power users requested a PowerShell version of [apt-get](https://en.wikipedia.org/wiki/APT_%28Debian%29) and in 2014 Microsoft delivered with the introduction of the [PowerShell Gallery](https://www.powershellgallery.com) and an [accompanying module](https://learn.microsoft.com/powershell/gallery/overview) that allowed users to just **Install-Module** to install new modules, PowerShell's version of a *package*.

## Installing dbatools From a Super Fresh Windows 10 Install

It's easy for PowerShell toolmakers to forget that new users may have questions about ExecutionPolicy and Repositories. If dbatools is the first module you've ever installed and used, this guide is intended to help you with all of your install/setup questions and concerns.

In order to emulate what your experience may be like, I spun up a fresh Windows 10 instance in Azure and went through all of the required steps which include addressing:

- Setting the Execution Policy
- Explicitly trusting Microsoft's PowerShell Gallery repository
- Installing dbatools
- Explicitly trusting dbatools as a Publisher, before first use

## Execution Policy

PowerShell's ExecutionPolicy is often misunderstood, but basically it's there for [safety not security](https://www.netspi.com/blog/technical-blog/network-pentesting/15-ways-to-bypass-the-powershell-execution-policy/). Jeffrey Snover [once noted](https://bsky.app/profile/jsnover.com) that Microsoft intentionally added the Bypass option. Looking for security? Security experts like Matt Graeber recommend [Application white listing](https://twitter.com/mattifestation/status/915591705411194880).

The default Execution Policy is **Restricted**. Microsoft says this about Restricted:

> Does not load configuration files or run scripts. Restricted is the default execution policy.

{{< powershell-console >}}
PS C:\Users\dbatools> Get-ExecutionPolicy
Restricted
PS C:\Users\dbatools>
{{< /powershell-console >}}

I haven't dug around too much, but I it appears that at least one module, PSReadLine, is allowed to run, because the text is still colorful and pretty. Based on this and the fact that **Install-Module** is allowed to run even in Restricted mode, I assume that all default Microsoft-signed modules are allowed.

### dbatools Minimum Requirement

Most PowerShell books directed at local development suggest you change your ExecutionPolicy to RemoteSigned. RemoteSigned basically means that all scripts and modules not located on your local computer must be signed. It is what most books will tell you to set your ExecutionPolicy to so that you can code locally.

Thanks to [CloudDBA](http://clouddba.io/)'s generosity, our module is professionally signed using a code signing certificate from DigiCert. This means that you can use our module even if your environment is set to the second most restrictive Execution Policy,  AllSigned. AllSigned is probably most popular on restrictive Enterprise networks.

{{< powershell-console >}}
PS C:\Users\dbatools> Set-ExecutionPolicy AllSigned

Execution Policy Change
The execution policy helps protect you from scripts that you do not
trust. Changing the execution policy might expose you to the security
risks described in the about_Execution_Policies help topic at
http://go.microsoft.com/fwlink/?LinkID=135170. Do you want to change
the execution policy?
[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help
(default is "N"):
{{< /powershell-console >}}

Code:

> Set-ExecutionPolicy -Scope CurrentUser AllSigned

OR, **more realistically**, set your execution policy to RemoteSigned so you can create scripts on your local machine.

> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

## Trusting Microsoft's Default Repository

Now that we've got the Execution Policy squared away, let's move on to the [PowerShell Gallery](https://www.powershellgallery.com).

Following [PowerShell's Security Guiding Principles](https://learn.microsoft.com/powershell/scripting/security/general-security-recommendations), Microsoft doesn't trust its own repository by default. This is in spite of the fact that it's super safe and all uploads are analyzed for viruses and malicious code.

Now that you know the Gallery is trustworthy, tell your computer to trust it as well (otherwise you'll be prompted every time.)

{{< powershell-console >}}
PS C:\Users\dbatools> Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

NuGet provider is required to continue
PowerShellGet requires NuGet provider version '2.8.5.201' or newer to interact with NuGet-based
repositories. The NuGet provider must be available in 'C:\Program
Files\PackageManagement\ProviderAssemblies' or
'C:\Users\dbatools\AppData\Local\PackageManagement\ProviderAssemblies'. You can also install the
NuGet provider by running 'Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201
-Force'. Do you want PowerShellGet to install and import the NuGet provider now?
[Y] Yes  [N] No  [S] Suspend  [?] Help (default is "Y"):
{{< /powershell-console >}}

Code:

> Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

## Install dbatools

Now that you trust the PowerShell Gallery, you can install the module, prompt free.

{{< powershell-console >}}
PS C:\Users\dbatools> Install-Module dbatools
{{< /powershell-console >}}

{{< powershell-console >}}
Installing package 'dbatools'
-  Unzipping
   [oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo   ]
{{< /powershell-console >}}

Code:

> Install-Module dbatools

## dbatools as a Trusted Publisher

I was so excited when we published our first signed version, [reversegiraffe](https://dbatools.io/reversegiraffe) but was kind of disappointed that users were required to explicitly trust us as a publisher. I was under the impression that a good code signing cert (which took a lot of work, proof of identity and faxing of documents) was automatically trusted.

Considering Microsoft doesn't trust its own Gallery by default, this made sense. Go ahead and trust us by forcing an import of the module, then **A** for Always.

{{< powershell-console >}}
PS C:\Users\dbatools> Import-Module dbatools

Do you want to run software from this untrusted publisher?
File C:\Program
Files\WindowsPowerShell\Modules\dbatools\0.9.69\xml\dbatools.Format.ps
1xml1 is published by CN=dbatools, O=dbatools, L=Vienna, S=Virginia,
C=US and is not trusted on your system. Only run scripts from trusted
publishers.
[V] Never run  [D] Do not run  [R] Run once  [A] Always run  [?] Help
(default is "D"):
{{< /powershell-console >}}

Code:

> Import-Module dbatools

**Note:** dbatools is installed to your `$env:PSModulePath` so explicit imports are not required at any other point; dbatools will automatically load once you run one of our commands.

What does trusting a publisher do? It places our public key into your Current User's Trusted Publisher PKI store.

![Windows search showing user certificate management](/images/7.gif)

![Certificate manager showing dbatools in Trusted Publishers](/images/8.gif)

Cool!

## Go to Town

Now that you've set your execution policy, trusted the gallery, installed dbatools, and trusted us as a publisher, you're set. Just run a command!

{{< powershell-console >}}
PS C:\Users\dbatools> Get-DbaDatabase -SqlInstance
{{< /powershell-console >}}

Want to see more? dbatools Major Contributor William Durkin of [CloudDBA](http://clouddba.io/) made a [video](https://www.youtube.com/watch?v=p8N2jaxBc08)! And it's not even silent!

https://www.youtube.com/embed/p8N2jaxBc08

Thanks for reading,
- Chrissy
