---
title: "Introducing the Community-Driven Build Reference"
date: 2017-10-16
author: "Simone Bizzotto"
lastmod: 2025-10-29
slug: "buildref"
aliases:
  - /buildref/
  - /buildref/index.html
categories: [announcements]
tags: [party]
draft: false
---

Yet another post from the dbatools team, I'm Simone Bizzotto. Hit me up on [Slack](https://dbatools.io/slack), I'm @niphlod.

## The Problem

Even the accidental DBA has to manage those pesky SQL Server Updates. Be it a bug fix, a security fix, a "new features" release, well… it needs to be installed.

- Put auditor in the mix: *what build are you on ?*
- Put your bosses' boss in the mix: *is the farm still officially supported by MS ?*
- Put a developer in the mix: *do we have that bug fixed, or that shiny new feature ?*
- Put every DBA in the mix: we manage a fleet of SQL Servers and we want them to be updated regularly, with all of the versions on par of what it has been carefully tested on a non-production instance.

A quick search on google sends you – probably – to the most famous "build list" : [sqlserverbuilds.blogspot.com](https://sqlserverbuilds.blogspot.com/)

If you're managing other MS product, you'd have this bookmarked already : [buildnumbers.wordpress.com](https://buildnumbers.wordpress.com/)

If you're subscribed to sqlservercentral (and you haven't missed the post), you know about [sqlbuilds.ekelmans.com](http://sqlbuilds.ekelmans.com/)

If you follow Brent Ozar, you'll know about [sqlserverupdates.com](https://sqlserverupdates.com/)

If you're a technet addict, you'll end up on [Learn Microsoft: Latest Updates for SQL Server](https://learn.microsoft.com/sql/database-engine/install-windows/latest-updates-for-microsoft-sql-server)

If someone comes up with "*are you still on an officially supported version?*" question, you'll go on to search [Microsoft Product Lifecycle Information](https://learn.microsoft.com/lifecycle/products).

And I'm totally sure I'm missing a few.

All of the above sites/lists are maintained by a different set of people (kudos to everyone), who helped DBAs, but all for different "angles"; every time you need a complete set of information, you need to go on more than one of those lists. And every time you need to get what version your instance is, well, you need to go fetch it.

## The Solutions

Enter the JSON-based dbatools commmand, [Get-DbaBuildReference](https://docs.dbatools.io/Get-DbaBuildReference/), and accompanying [build website](https://dbatools.io/builds)! Back in March, dbatools released a shiny new command, which will save you a lot of time in the "inventory" part of the deal.

### The Command

![Get-DbaBuildReference command output](/images/img_59e2103a5fd37.png)

You get back on a jiffy:
– the Build
– the Major Release
– the Service Pack
– the Cumulative Update
– the KB related to that version
– when the support for that version ends
– if all of the above are matching a verified build
– if a warning is shown, you passed a bad build or the JSON must be updated

How can **it** do **that**? We needed to compose yet another source of information, coming from all of the information we could get our hands on.

It's been a crafty work, but we just couldn't fetch that info programmatically while being sure it was correct (or speedy). If you dabble in Powershell, you can execute the following and note an -Update switch.

> Get-Help Get-DbaBuildReference

If you are more curious , you can check out the [source](https://github.com/dataplat/dbatools/blob/master/functions/Get-DbaBuildReference.ps1).

You'll see that information comes from a json file, which is shipped with the module, and that the *-Update* switch fetches a publicly available json file from [https://sqlcollaborative.github.io/assets/dbatools-buildref-index.json](https://sqlcollaborative.github.io/assets/dbatools-buildref-index.json).

### OMG the Website

Our PowerShell command is easy to use but some just won't dabble in Powershell. For everyone's delight (hopefully), we crafted a page that builds a nice table containing all the build information, and **it** just does **that** based on that json file. So the same JSON file that powers Get-DbaBuildReference is being used to power this super easy to use site.

Hell, you can even fetch the [source](https://github.com/dataplat/sqlcollaborative.github.io/blob/master/builds.html) and host it yourself.

Need the info? Bookmark [dbatools.io/builds](https://dbatools.io/builds), hit it, enter your build number in the search box and have all the info back. I'm not a fast clicker and had this done in less than 2 seconds.

![Build reference website demo](/images/build.gif)

Are you a spreadsheet fan? Presto! Press on "Copy" or "Excel" and lookup (or VLOOKUP) all the way.

## Open Source Means Even Faster Updates

The website, the command and the json are all publicly available and editable. The website is hosted on gh-pages, and dbatools is on GitHub.

Moreover, dbatools welcome any type of contributors, even casual ones (there's more than 900 people in Slack). This means that anyone, even drive-by contributors, can help keep the build reference updated. If you know of a missing build, you can hit us up on [Slack](https://dbatools.io/slack), open a GitHub [issue](https://dbatools.io/issues), send a mail, send pigeons… The index will be updated, and everyone will benefit.

Join us, help every other person tracking builds effectively!

Ciao!
Simone 🇮🇹
