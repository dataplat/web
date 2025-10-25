---
title: "walk-thru: installing modules from the powershell gallery"
date: 2017-10-18
slug: "soup2nutz"
aliases:
  - /soup2nutz/
  - /soup2nutz/index.html
categories: []
tags: [party]
draft: false
---

Before Apple created the App Store and Microsoft created the Microsoft Store, Linux users basked in the glory of how easy it was to install programs or *packages* from centralized stores using *Package Managers* and remote repositories.

For years, power users requested a PowerShell version of [apt-get](https://en.wikipedia.org/wiki/APT_%28Debian%29) and in 2014 Microsoft delivered with the introduction of the [PowerShell Gallery](https://www.powershellgallery.com) and an [accompanying module](https://blogs.msdn.microsoft.com/powershell/2016/09/29/powershellget-and-packagemanagement-in-powershell-gallery-and-github/) that allowed users to just **Install-Module** to install new modules, PowerShell's version of a *package*.

## Installing dbatools from a super fresh Win10 install

It's easy for PowerShell toolmakers to forget that new users may have questions about ExecutionPolicy and Repositories. If dbatools is the first module you've ever installed and used, this guide is intended to help you with all of your install/setup questions and concerns.

In order to emulate what your experience may be like, I spun up a fresh Windows 10 instance in Azure and went through all of the required steps which include addressing:

- Setting the Execution Policy
- Explicitly trusting Microsoft's PowerShell Gallery repository
- Installing dbatools
- Explicitly trusting dbatools as a Publisher, before first use

## Execution Policy

PowerShell's [ExecutionPolicy](http://www.powertheshell.com/understanding-execution-policy/) is often misunderstood, but basically it's there for [safety not security](https://blog.netspi.com/15-ways-to-bypass-the-powershell-execution-policy/). So nobody is being slick when set the Execution Policy to **Bypass**, Microsoft [intentionally added that possiblity](https://twitter.com/jsnover/status/653717930320900096). Looking for security? Security experts like Matt Graeber recommend [Application white listing](https://twitter.com/mattifestation/status/915591705411194880).

The default Execution Policy is **Restricted**. Microsoft says this about Restricted:

> Does not load configuration files or run scripts. Restricted is the default execution policy.

![Image description](https://dbatools.io/wp-content/uploads/2017/10/1.gif?resize=800%2C600&ssl=1)

I haven't dug around too much, but I it appears that at least one module, PSReadLine, is allowed to run, because the text is still colorful and pretty. Based on this and the fact that **Install-Module** is allowed to run even in Restricted mode, I assume that all default Microsoft-signed modules are allowed.

### dbatools minimum requirement

Most PowerShell books directed at local development suggest you change your ExecutionPolicy to RemoteSigned. RemoteSigned basically means that all scripts and modules not located on your local computer must be signed. It is what most books will tell you to set your ExecutionPolicy to so that you can code locally.

Thanks to [CloudDBA](http://clouddba.io/)'s generosity, our module is professionally signed using a [code signing certificate](https://www.digicert.com/code-signing/) from DigiCert. This means that you can use our module even if your environment is set to the second most restrictive Execution Policy,  AllSigned. AllSigned is probably most popular on restrictive Enterprise networks.

![Image description](https://dbatools.io/wp-content/uploads/2017/10/2.gif?resize=800%2C600&ssl=1)

Code:

> Set-ExecutionPolicy -Scope CurrentUser AllSigned

OR, **more realistically**, set your execution policy to RemoteSigned so you can create scripts on your local machine.

> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

## Trusting Microsoft's default repository

Now that we've got the Execution Policy squared away, let's move on to the [PowerShell Gallery](https://www.powershellgallery.com).

Following [PowerShell's Security Guiding Principles](https://blogs.msdn.microsoft.com/powershell/2008/09/30/powershells-security-guiding-principles/), Microsoft doesn't trust its own repository by default. This is in spite of the fact that it's super safe and [all uploads are analyzed](https://blogs.msdn.microsoft.com/powershell/2015/08/06/powershell-gallery-new-security-scan/) for viruses and malicious code.

Now that you know the Gallery is trustworthy, tell your computer to trust it as well (otherwise you'll be prompted every time.)

![Image description](https://dbatools.io/wp-content/uploads/2017/10/3.gif?resize=800%2C600&ssl=1)

Code:

> Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

## Install dbatools

Now that you trust the PowerShell Gallery, you can install the module, prompt free.

![Image description](https://dbatools.io/wp-content/uploads/2017/10/4.gif?resize=800%2C600&ssl=1)

![Image description](https://dbatools.io/wp-content/uploads/2017/10/5.gif?resize=800%2C600&ssl=1)

Code:

> Install-Module dbatools

## dbatools as a Trusted Publisher

I was so excited when we published our first signed version, [reversegiraffe](https://dbatools.io/reversegiraffe) but was kind of disappointed that users were required to explicitly trust us as a publisher. I was under the impression that a good code signing cert (which took a lot of work, proof of identity and faxing of documents) was automatically trusted.

Considering Microsoft doesn't trust its own Gallery by default, this made sense. Go ahead and trust us by forcing an import of the module, then **A** for Always.

![Image description](https://dbatools.io/wp-content/uploads/2017/10/6.gif?resize=800%2C600&ssl=1)

Code:

> Import-Module dbatools

**Note:** dbatools is installed to your `$env:PSModulePath` so explicit imports are not required at any other point; dbatools will automatically load once you run one of our commands.

What does trusting a publisher do? It places our public key into your Current User's Trusted Publisher PKI store.

![Image description](https://dbatools.io/wp-content/uploads/2017/10/7.gif?resize=800%2C600&ssl=1)

![Image description](https://dbatools.io/wp-content/uploads/2017/10/8.gif?resize=800%2C600&ssl=1)

Cool!

## Go to town

Now that you've set your execution policy, trusted the gallery, installed dbatools, and trusted us as a publisher, you're set. Just run a command 🤷

![Image description](https://dbatools.io/wp-content/uploads/2017/10/9.gif?resize=800%2C600&ssl=1)

Want to see more? dbatools Major Contributor William Durkin of [CloudDBA](http://clouddba.io/) made a [video](https://www.youtube.com/watch?v=p8N2jaxBc08)! And it's not even silent 😁

https://www.youtube.com/embed/p8N2jaxBc08

Thanks for reading,
- Chrissy
