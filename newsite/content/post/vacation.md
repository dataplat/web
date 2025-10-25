---
title: "the commands i run before going on vacation"
date: 2017-04-28
slug: "vacation"
aliases:
  - /vacation/
  - /vacation/index.html
categories: [announcements]
tags: [party]
draft: false
---

My favorite vacation ever was the time I visited Steve Jones' wardrobe. It bore a striking resemblance to Maui and even came with complimentary piña coladas.

![Image](https://dbatools.io/wp-content/uploads/2017/02/img_589659755f9a1.png?w=800&ssl=1)

The year was 2009. The sun was out, Colbie Caillat was on the radio and I hadn't mastered PowerShell yet, so I was left feeling frantic about the health of my SQL Server estate.

Now, though, I've got dbatools which allows me to quickly check the things that concern me most. Even with monitoring systems in place, who monitors the monitors? I want reassurance everything is as I expect.

## Before I begin

Before I begin running these commands against every SQL Server in my organization, I get a list from my Central Management Server using [Get-DbaRegServer](https://dbatools.io/Get-DbaRegServer). This command will undergo a definite overhaul during the [1.0 makeover](https://dbatools.io/new-style/), but for now, I run the following to get a list from my **Central Management Server** on my server dedicated to SQL Server management.

Here are the servers in my Central Management server

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_59026563464ff.png?w=800&ssl=1)

So I go and grab the instance names and add them to the variable $allservers. I actually do this in my $profile, but it works directly from the command line, of course.

```ps
$allservers = Get-DbaRegServer -SqlInstance localhost
```

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_59026619b68dc.png?w=800&ssl=1)

Of course, $allservers can be a plain-text list of servers such as **$allservers = "sql2014","sql2016","etc"** or even a list of connected SMO servers if alternative credentials are needed. I'll get into that in the future when we introduce a few new commands that keep a local JSON database of your servers and credentials.

## Are any servers running low on disk space?

Next, I always try to keep at least 20% free disk space on my SQL Server drives (including C:) so I check to see if any fall below that threshold using [Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace).

```ps
$allservers | Get-DbaDiskSpace | Where-Object PercentFree -lt 20
```

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_590265baf29f1.png?w=800&ssl=1)

Here, I can easily see that two of my servers may need attention while I'm out of town.

## Have any jobs failed in the past 30 days?

Failed jobs are the worst, especially if they're my backup jobs. Let's check failed jobs for the last 30 days using [Find-DbaAgentJob](https://dbatools.io/Find-DbaAgentJob) with either syntax below

```ps
$allservers | Find-DbaAgentJob -Failed -Since (Get-Date).AddDays(-30)
$allservers | Find-DbaAgentJob -Failed -Since 1/5/2017
```

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_590272fd5646d.png?w=800&ssl=1)

Uh oh, looks like my log shipping isn't so healthy. Probably shouldn't go on vacation anytime soon 😭

## How about my backups?

Next I check to ensure that my Fulls, Diffs and Logs are in order. My servers perform FULL backups once a week, DIFFs once a day, and LOG backups every 15 minutes. Let's check to ensure this is happening with [Get-DbaLastBackup](https://dbatools.io/Get-DbaLastBackup)

```ps
$lastbackups = $allservers | Get-DbaLastBackup
$lastbackups | Where { $_.LastLogBackup -lt (Get-Date).AddMinutes(-15) -and $_.RecoveryModel -ne "Simple" }
$lastbackups | Where LastDiffBackup -lt (Get-Date).AddDays(-1)
$lastbackups | Where LastFullBackup -lt (Get-Date).AddDays(-7)
```

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_590286dbbac74.png?w=800&ssl=1)

No results here is good; it means that all of my scheduled backups are working and no last backups were older than I expected 😊 If you're curious about the the output of Get-DbaLastBackup, it looks something like this

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_5902875c2f30f.png?w=800&ssl=1)

Also, if you're into backups as much as me, check out this post I wrote about [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup) called [building a dedicated backup test server](https://dbatools.io/dedicated-server/).

## Have any databases been failing integrity checks?

Next up! Such a great command – [Get-DbaLastGoodCheckDb](https://dbatools.io/Get-DbaLastGoodCheckDb). This function retrieves the last good CHECKDB of each database.

```ps
$allservers | Get-DbaLastGoodCheckDb | Where LastGoodCheckDb -lt (Get-Date).AddDays(-1)
```

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_5902a663c5b40.png?w=800&ssl=1)

Oops! Looks like one of my servers is in really bad shape and CHECKDB hasn't been run on the databases or they've failed for a while. Better run a check so I can get to my 🍕!

## Speaking of vacation

You may be wondering about the status of 1.0. It's coming along, albeit a little slower than we expected. One of the biggest reasons was that I had really bad burnout that lasted 1.5 months. I just couldn't get motivated. It started sometime in early March but I'm back at it now.

Burnout is nothing new to me, but I did have an epiphany this time around. My burnout isn't caused by excessive working and the need for a vacation. For me, burnout is caused by **absence of progress** as Oleg Slobodskoi pointed out in his post [Fighting burnout with Open Source](https://medium.com/@oleg008/fighting-burnout-with-open-source-ba87559ad844). I was indeed stuck on a persistent issue and just hadn't progressed for nearly two weeks.

In the future, I'm going to ensure that I don't get stuck by allowing myself to move on, even if it means gifting the pesky task to someone else.

## World tour

The reason I was reminded to do this post was because I'm gonna be out of town next week for [PSConf.eu](http://psconf.eu)! PSConf.eu is an awesome PowerShell conference where you're surrounded by great friends and Hefeweizen. "Let's all have a great time together" is one of the tenets of the conference and last year's conference was the best conference I'd ever been to.

The dbatools team will have a heavy presence there, too! I know that [Rob](https://sqldbawithabeard.com/), [Stuart](https://twitter.com/napalmgram), [Fred](http://allthingspowershell.blogspot.de/), [André](http://clouddba.io/) and [William](http://clouddba.io/) will be there and I'm hoping a few others show up as well. Kinda like recently at SQLBits!

![Image](https://pbs.twimg.com/media/C85B_XKXUAMNzZE.jpg)

Dan Alexander, André Kamman, Mötz Jensen, Shane O'Neill,
Rob Sewell and Stephen Bennett (not pictured), Thomas LaRock (not pictured)

Which reminds me, we added a [presentations](https://dbatools.io/presentations) page to the site. If you want to know where we'll be speaking, hit it up. And! If you're speaking about dbatools, let us know and we'll promote your session 🙏❤️

![Image](https://dbatools.io/wp-content/uploads/2017/04/img_59029a36e0a9e.png?w=800&ssl=1)

I left this small so you would click 😁

## Finishing up

So here's a big ol' chunk of code you can paste into your environment. You'll have to customize it a lil' bit, but it's a good start.

```ps
# Get all servers
$allservers = Get-DbaRegServer -SqlInstance localhost

# Check disk space
$allservers | Get-DbaDiskSpace | Where-Object PercentFree -lt 20

# Find failed jobs
$allservers | Find-DbaAgentJob -Failed -Since (Get-Date).AddDays(-30)
$allservers | Find-DbaAgentJob -Failed -Since 1/5/2017

# Check backups
$lastbackups = $allservers | Get-DbaLastBackup
$lastbackups | Where { $_.LastLogBackup -lt (Get-Date).AddMinutes(-15) -and $_.RecoveryModel -ne "Simple" }
$lastbackups | Where LastDiffBackup -lt (Get-Date).AddDays(-1)
$lastbackups | Where LastFullBackup -lt (Get-Date).AddDays(-7)

# Check integrity checks
$allservers | Get-DbaLastGoodCheckDb | Where LastGoodCheckDb -lt (Get-Date).AddDays(-1)
```

Do you have commands or routines you run before leaving town? I'm looking for ideas to add to my list.

Till next time (probably sometime next week)!

\- Chrissy
