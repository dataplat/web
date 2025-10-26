---
title: "Getting Started With PowerShell"
date: 2018-10-01
author: "Chrissy LeMaire"
slug: "start"
aliases:
  - /start/
  - /start/index.html
categories: [announcements]
tags: []
draft: false
---

Now that you've [convinced your security team](/secure/) that PowerShell improves your security posture, it's time to learn PowerShell if you haven't already.

## Month of Lunches

#### Learn PowerShell in a Month of Lunches

Hands down, the one book most people recommend for learning PowerShell is **Learn Windows PowerShell in a Month of Lunches** by [Don Jones](https://donjones.com/powershell/) and [Jeffrey Hicks](http://jdhitsolutions.com/blog/). You can buy the 3rd edition from [Amazon](https://www.amazon.com/exec/obidos/redirect?tag=realcajunreci-20&path=ASIN/1617294160) or [directly from Manning](https://www.manning.com/books/learn-windows-powershell-in-a-month-of-lunches-third-edition).

![Learn PowerShell in a Month of Lunches cover](/images/monthoflunches.gif)

This book even comes with its own [YouTube series](https://www.youtube.com/playlist?list=PL6D474E721138865A), featuring author Don Jones.

There's also a website called [More lunches](https://morelunches.com/) but it hasn't been updated since 2014 while the most recent version of Learn Windows PowerShell in a Month of Lunches was released in 2016.

#### Learn dbatools in a Month of Lunches

Want to learn about dbatools, specifically? Chrissy and Rob are currently writing [Learn dbatools in a Month of Lunches](/book) and it is available via [Manning's Early Access Program](/meap)!

![Learn dbatools in a Month of Lunches cover](/images/start-dbatools.jpg)

One reviewer said the following about our book 💓:

> This book makes PowerShell approachable for SQL professionals, and SQL administration approachable for proficient PowerShell users.

### Other books

Once you're comfortable with PowerShell, check out the **[PowerShell Cookbook](https://www.amazon.com/exec/obidos/redirect?tag=realcajunreci-20&path=ASIN/1449320686)** by PowerShell Team member [Lee Holmes](https://www.leeholmes.com/blog/) and **[Windows PowerShell in Action](https://www.amazon.com/exec/obidos/redirect?tag=realcajunreci-20&path=ASIN/1633430294)** by PowerShell Team member [Bruce Payette](https://twitter.com/BrucePayette) and MVP [Richard Siddaway](https://richardspowershellblog.wordpress.com/).

The PowerShell Cookbook provides "recipes" of solutions, but I like that it's also useful for learning best practices. Lee's code is great to learn from! PowerShell in Action tells an amazing story and discusses the "Why" in-depth.

You can also check out [The PowerShell Conference Book](https://www.amazon.com/exec/obidos/redirect?tag=realcajunreci-20&path=ASIN/1720169977):

> This book is designed to be like a conference in a book where each chapter is written by a different author who is a subject matter expert on the topic covered in their chapter. Each chapter is also independent of the others so you can read one chapter, ten chapters, or all of them. You can start with the first chapter, the last one, or somewhere in-between and not miss out on anything related to that particular topic. This book is written for the intermediate to advanced audience. Prior experience with PowerShell is highly recommended.
>
> All (100%) of the royalties from this book are donated to the OnRamp scholarship program. More information about the OnRamp track at the PowerShell + DevOps Global Summit and their scholarship program can be found on the PowerShell.org website.

## Code Editor

Just skip everything else and use [Microsoft VS Code](https://code.visualstudio.com/docs/languages/powershell) with the [PowerShell extensions](https://code.visualstudio.com/docs/languages/powershell).

![VS Code with PowerShell extensions](/images/vscode.png)

The ISE is no longer being developed and [Microsoft officially says](https://blogs.msdn.microsoft.com/powershell/2017/05/10/announcing-powershell-for-visual-studio-code-1-0/):

> The PowerShell ISE has been the official editor for PowerShell throughout most of the history of Windows PowerShell. Now with the advent of the cross-platform PowerShell Core, we need a new official editor that's available across all supported OS platforms and versions. Visual Studio Code is now that editor and the majority of our effort will be focused there.
>
> However, the PowerShell ISE will remain in Windows supporting Windows PowerShell with no plans to remove it. We will consider investing effort there in the future if there is a high demand for it, but for now we think that we will be able to provide the best possible experience to the PowerShell community through Visual Studio Code.

Nearly everyone I know uses VS Code and new cool extensions are added or enhanced every day in the [Extension Gallery](https://code.visualstudio.com/docs/editor/extension-gallery). There are so many cool extensions like [gitlens](https://gitlens.amod.io/) which allows you to see who wrote a specific line of code:

![VS Code with gitlens extension](/images/morevscode.png)

You can also share your screen with colleagues using Visual Studio Live Share.

You may notice that I still use the ISE for demos, but that's because it has a ▶ button and the ISE is very stable. Last time I tried to use Code for a demo it bombed out and the last thing I want to worry about during a presentation is my IDE crashing.

So for now, I'm using ISE *for demos*. I've heard the newer versions of Code are more stable, so now I've just gotta make the time to give it another shot.

## Videos

### Microsoft Virtual Academy

[Microsoft Virtual Academy](https://mva.microsoft.com/training-topics/powershell#!lang=1033) has a few solid PowerShell videos, too, like [Getting Started with PowerShell 3.0: Don't fear the shell](https://channel9.msdn.com/Series/GetStartedPowerShell3/01) and [Advanced Tools & Scripting with PowerShell 3.0: Get Started](https://channel9.msdn.com/Series/advpowershell3/01).

Note that this is for PowerShell 3 but it's still relevant as dbatools is designed to work with PowerShell 3 and above.

### Conference Playlists

You can also watch videos from the [PowerShell + DevOps Global Summit 2018](https://www.youtube.com/playlist?list=PLfeA8kIs7CocGXuezOoYtLRdnK9S_Mq3e) as well as [PSConf EU 2018](https://www.youtube.com/watch?v=cHrFfdD-nSw&list=PLDCEho7foSor-XbwECkqpvAuyQ0CZFI9_).

## [PSKoans](https://github.com/vexx32/PSKoans)

The goal of the [PowerShell koans](https://github.com/vexx32/PSKoans) is to teach you PowerShell by presenting you with a set of questions. Each kōan (each question) is represented by a failing Pester test. Your goal is to make those tests pass by filling out the correct answer, or writing the correct code. The koans start very simple to get you familiar with the basic concepts and progress towards more difficult. Teaching you multiple beginner, intermediate and advanced aspects of PowerShell in the process.

### PSPowerHour

And, of course, the regularly scheduled [PSPowerHour](https://www.youtube.com/channel/UCtHKcGei3EjxBNYQCFZ3WNQ) which is "like a virtual PowerShell User Group, with a lightning-demo format, and room for non-PowerShell-specific content." Eight community members give a demo each PowerHour.

## [PWSHSchool](https://github.com/bateskevin/PWSHSchool/)

[PWSHSchool](https://github.com/bateskevin/PWSHSchool/blob/master/docs/Students.md) is all about gaining/sharing experiences. Join in to learn about PowerShell interactively, by using PowerShell!

![PWSHSchool console](https://github.com/bateskevin/PWSHSchool/raw/master/Img/Console.PNG)

## Docs

[Microsoft Docs](https://docs.microsoft.com/en-us/powershell/) is updated regularly, easy-to-read, and useful.

![Microsoft Docs](/images/docs.gif)

## Live Chat

- [SQL Server Slack](/slack)
  - In #powershellhelp and #dbatools
- [PowerShell Slack](http://slack.poshcode.org/)
  - Every channel, but #sqlserver is bridged to the SQL Community #powershellhelp channel 👍
- [Reddit /r/PowerShell Live Chat](https://www.reddit.com/chat/r/powershell/channel/1129815_ed51d8f0ff13684f44d527f3cf353099e517a67e/join)

## Forums

- [PowerShell.org Forums](https://powershell.org/forums/)
- [Reddit](https://reddit.com/r/PowerShell/)
- [Technet forums – Windows PowerShell](https://social.technet.microsoft.com/Forums/en-US/home?forum=winserverpowershell)
- [Spiceworks PowerShell Forum](https://community.spiceworks.com/programming/powershell)

## Meetup

There are a ton of PowerShell User Groups across the world! Check out [PowerShell User Groups on Technet](https://social.technet.microsoft.com/wiki/contents/articles/19959.powershell-user-groups.aspx).

## dbatools

For dbatools specifically, we have a number of posts that can help navigate our module on [our blog](/blog). Here's a sampling:

- [getting started](/getting-started)
- [walk-thru: installing modules from the powershell gallery](/soup2nutz)
- [offline installs of dbatools](/offline)
- [real-world tde database migrations](/real-world-tde-database-migrations/)
- [building a dedicated backup test server](/dedicated-server/)
- [creating a history timeline](/timeline/)
- [simplifying snapshots](/snapshots/)
- [managing a central management server](/cms/)
- [stuck on older versions of sql server? check out our trace commands.](/traces/)
- [three ways to track user logins](/track-logins/)
- [minimal-downtime migrations using invoke-dbalogshipping](/logshipping/)
- [a new command to find all of your instances](/find-sql-instances/)
- [simplifying extended events management with dbatools](/xevents/)
- [simplifying disaster recovery with dbatools](/dr/)

Hope that helps those of you looking to get started. If you have any suggestions for this list, please let me know.

\- Chrissy
