---
title: "decreasing module import times"
date: 2018-04-11
slug: "import-times"
aliases:
  - /import-times/
  - /import-times/index.html
categories: [announcements]
tags: [party]
draft: false
---

[SQL Server Operations Studio](https://github.com/Microsoft/sqlopsstudio) by Microsoft is like SSMS for ops, all open source and published on GitHub! They recently updated [their wiki's](https://github.com/Microsoft/sqlopsstudio/wiki) Performance page, addressing why [SQL Operations Studio starts up slowly](https://github.com/Microsoft/sqlopsstudio/wiki/Performance-Issues). Their startup stats are pretty cool!

![](https://user-images.githubusercontent.com/172399/32089769-3df19924-baec-11e7-9654-e199e1ab8c92.png)

This screenshot reminded me that I should write about our own import time stats.

## confession

You may remember years ago when [I expressed how upset I was](https://blog.netnerds.net/2016/03/can-we-get-these-3-sqlps-issues-fixed-before-sql-server-2016-rtms/) about SQLPS, [SqlServer's](https://www.powershellgallery.com/packages/SqlServer) predecessor, taking so long to import. Five whole seconds! Thanks to the community response, Microsoft took note and now it's down to an amazing 00:00:00.9531216!

![](https://dbatools.io/wp-content/uploads/2018/04/sqlserver.png?resize=450%2C186&ssl=1)

That's about 1 second, though often times, I've seen it load in 500ms. Congrats to Microsoft! I'm jealous 😊 At the PASS Summit PowerShell Panel last year, people asked what we loved most and hated most about PowerShell. I already knew my answer for what I hated most: long import times.

And I immediately copped to my embarrassment that I complained about SQLPS taking so long to load, yet here we were, back in November 2017, taking just as long to load. Now to be fair, we support more SQL Server functionality and we also use non-compiled code (functions/ps1 vs cmdlets/C#) which makes it easier for the community to contribute. This means we can only do so much.

## redemption

I asked C# wizard, Fred, how we can improve import times, and he immediately jumped on it by adding a class that breaks down how long each section takes.

![](https://dbatools.io/wp-content/uploads/2018/04/importps.png?resize=753%2C409&ssl=1)

You can test this yourself by importing dbatools then running:

```
[Sqlcollaborative.Dbatools.dbaSystem.DebugHost]::ImportTime
```

What you'll notice is that on that supafast machine, dbatools is now down to about a 1.78 second load! Incredible. This is how we did it:

### runspaces

We noticed that the longest part of importing the module was importing all the extra SMO DLL's that we require for many of the commands. We import about 150 DLLs and it looks like that number will only grow as we begin to support more functionality (such as Integration services, etc.)

To address this concern, Fred added multi-threading via [runspaces](https://blog.netnerds.net/2016/12/runspaces-simplified/) to our import process. Too cool! This resulted in a significant decrease in time.

### allcommands.ps1

The other thing we did to significantly decrease import times was we combined all of the individual .ps1 files in [functions*.ps1](https://github.com/dataplat/dbatools/tree/development/functions) to a single .ps1 file. So now, before every release, I combine all the newly updated commands, sign it using our code signing certificate, then publish it to the [PowerShell Gallery](https://dbatools.io/gallery).

![](https://dbatools.io/wp-content/uploads/2018/04/allcommands.png?resize=800%2C291&ssl=1)

It also means that we had to modify our import process to accommodate our developers because nobody, including me, wants to work on a 90,000 line file. We handled this by detecting if a .git folder exists in the dbatools path, and if it does, then it'll skip allcommands.ps1 and import the individual .ps1 files in the [functions directory](https://github.com/dataplat/dbatools/tree/development/functions).

The .git folder only exists when the git repository is cloned. This means it won't exist in our module in the PowerShell Gallery or in a zip downloaded from GitHub.

**Edit:** I took this a step further [and compressed the ps1 to a zip](https://blog.netnerds.net/2018/12/even-faster-powershell-module-loading/). Turns out it works super well! Check out the post for more information.

### the future

I've heard that PowerShell Core (PSv6) is insanely fast. Unfortunately, SMO is not entirely ported to .NET Core, so we can't yet support 6.0. However! SMO is the only portion of our module that is not 6.0 ready, so once SMO is ported, dbatools will be too 👍. Hopefully this will result in faster load times.

### your miles may vary

On my Windows 7 test box, dbatools loads in 2.3 seconds. On a more locked down Windows 2012 server, the import takes about 4-6 seconds.

Note that you should never experience import times over 20 seconds. If you do, check your [Execution Policy](http://www.powertheshell.com/understanding-execution-policy/), which could be impacting load times. dbatools is fancy and signed by a code-signing certificate; this is awesome for code integrity, but it's also known to slow down imports when mixed with certain Execution Policies.

\- Chrissy 🍰
