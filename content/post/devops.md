---
title: "dbatools – a devops success story"
date: 2017-06-13
author: "Chrissy LeMaire"
slug: "devops"
aliases:
  - /devops/
  - /devops/index.html
categories: [announcements]
tags: []
draft: false
---

[![TSQL2SDAY-150x150](https://blog.netnerds.net/wp-content/uploads/2016/06/TSQL2SDAY-150x150.png?resize=150%2C150&ssl=1)](http://www.scarydba.com/2017/06/06/t-sql-tuesday-091-databases-devops/)

Today's article is part of [T-SQL Tuesday](http://www.scarydba.com/2017/06/06/t-sql-tuesday-091-databases-devops/). T-SQL Tuesday is the brainchild of Adam Machanic. It is a blog party on the second Tuesday of each month. Everyone is welcome to participate.

This month's T-SQL Tuesday, hosted by Grant Fritchey ([b](http://www.scarydba.com)|[t](https://twitter.com/GFritchey)), is all about Databases and DevOps.

## What Is DevOps?

Recently, I took an Intro to DevOps Engineering class in my Masters program at [Regis.edu](http://www.regis.edu/CCIS/Academics/Degrees-Programs/Graduate-Programs/MS-Enterprise-Systems-Engineering.aspx). I actually found one of our first assignments to be one of the most challenging: define DevOps.

### One Definition

Many of my cohorts and myself pointed to [The Agile Admin](https://theagileadmin.com/what-is-devops/)'s definition, which was presented in a simplified manner.

> DevOps is the practice of operations and development engineers participating together in the entire service lifecycle, from design through the development process to production support.

That's a little generic, and the [entire post](https://theagileadmin.com/what-is-devops/) goes into much greater depth, of course. Here are a few highlights from the rest of the post:

- DevOps Values: "People over Process over Tools"
- DevOps Principles: "Infrastructure as code" which means writing code to manage configurations and automate provisioning of infrastructure in addition to deployments
- DevOps Tools – Tools you'd use in the commission of these principles. Pester, Appveyor, Slack, virtualization, containerization, etc.

By employing the above, it's easier to [achieve DevOps goals](https://en.wikipedia.org/wiki/DevOps#Goals):

- Faster time to market
- Lower failure rate of new releases
- Shortened lead time between fixes
- Faster mean time to recovery (in the event of a new release crashing or otherwise disabling the current system)

### Another Definition

Another definition was recently shared with me by former PowerShell MVP (and now DevOps advocate at Microsoft) [Steve Murawski](https://twitter.com/StevenMurawski). This definition is an acronym, CAMS, which comes from the [DevOps Dictionary](http://devopsdictionary.com/wiki/CAMS). CAMS describes the core values of the DevOps Movement: Culture, Automation, Measurement, and Sharing.

## DevOps and dbatools

I remember when I was taking the class, I made a list of what we're doing at dbatools that aligns with DevOps. Because how cool would it be to not only add it to my own resume, but to be able to offer that skillset and experience to all of our contributors? Turns out, after we added automated tests, we were 100% DevOps!

#### dbatools ❤️ you

We've now got nearly 60 contributors to [our GitHub repository](https://dbatools.io/git). Our team is an awesome mix of database administrators, systems engineers, data architects, C# devs, BI devs, PowerShell dev and more. Quite a nice combo of dev and ops 😊

In our [Slack](https://dbatools.io/slack) channel and within our code reviews, we aim to be incredibly inclusive and polite. Our culture is one of encouragement. You can even see this in our [contributing.md](https://dbatools.io/contributing). Don't know git? We want to help! Do you learn best by reading a tutorial? We've [got you covered](https://dbatools.io/firstpull). Or do you learn better by watching a video? We still [got you](https://dbatools.io/firstpullvideo). Or maybe you want someone to talk you through it. You're in luck! Constantine Kokkinos (@ck) in the Slack channel is more than willing to help.

Want to use VS Code to code for dbatools? Major Contributor [Shawn Melton has written some articles to help](https://dbatools.io/author/wsmelton/). Whatever roadblocks you may be experiencing, we want to help. If you've got a ton of experience with DevOps processes already, we'd love if you'd join us and help guide our processes.

#### Infrastructure and Automation

PowerShell Desired State Configuration (DSC) can help provide your environment with Infrastructure as Code (IaC), but right now, dbatools doesn't do any DSC. What we do, however, is take advantage of [Appveyor's](https://appveyor.com) IaC which helps us provide **Continuous Integration** through automated testing.

I'd heard about IaC and "ephemeral servers" for a while  (and you may have, too) but I could never quite grasp how temporary servers could be beneficial to our project until I watched our teammates André Kamman & Rob Sewell present [Test Your PowerShell Code With AppVeyor for ITPros](https://www.youtube.com/watch?v=8Nljk1deSmU) at [PSconf.eu](http://psconf.eu).

`youtube: 8Nljk1deSmU`

Basically, we hook our repo into AppVeyor and each time we commit to a branch, AppVeyor spins up a temporary Windows server with a bunch of SQL instances (Express mostly, plus 2016 Developer), then follows a few PowerShell scripts we have in our repo, including [appveyor.sqlserver.ps1](https://github.com/dataplat/dbatools/blob/development/tests/appveyor.sqlserver.ps1) and [appveyor.pester.ps1](https://github.com/dataplat/dbatools/blob/development/tests/appveyor.pester.ps1).

<!-- gist: potatoqualitee/3da4b0bc9071d40b109f86416e961eee -->

It runs all of the tests listed in the [tests](https://github.com/dataplat/dbatools/blob/development/tests/) directory and if all is good, we get a beautiful green check mark on the commit. Then the server is then destroyed and a new one appears with the next commit, just like that. You can even view it live as it's happening! Check this out:

`youtube: LiD4Z4gJdUM`

Want to watch our automated testing, happening live? Click on [this AppVeyor link](https://ci.appveyor.com/project/potatoqualitee/dbatools).

#### DevOps Tools, Measurement and Sharing

In addition to setting up automated tests and loving you (and you, and you, and you 👍), we also hang out and help each other on a DevOps favorite, [Slack](https://dbatools.io/slack). We're part of a greater Slack community located at sqlcommunity.slack.com. Right now, we've got over 3,000 members in the SQL slack and 730+ in our channel.

We also use the hell out of [GitHub](https://dbatools.io/github) for both communicating with end-users and with contributors. We provide [code reviews](https://dbatools.io/pr) and accept [bug reports](https://dbatools.io/bugs). We used to use [kanban tool](https://leankit.com/learn/kanban/what-is-kanban/), Trello, but moved away from it in favor of GitHub issues. We're still waiting for GitHub Projects to be good enough.

We explored Azure and [Jenkins](https://jenkins.io/) for Continuous Integration but ultimately decided on [AppVeyor](https://appveyor.com). AppVeyor hooks exceptionally well into our [PowerShell Pester](https://github.com/pester/Pester) tests.

Our measurement is kind of weak right now, but it comes in the form of being extremely transparent about [what we're up to](https://dbatools.io/blog). Stats, including our website stats, are shared widely and regularly. And, of course, our [source code](https://dbatools.io/git).

#### DevOps Release Cycle

In continuing with the DevOps theme, we also adopted a pretty fast release cycle. We aim to [release early and release often](https://about.gitlab.com/2016/07/21/release-early-release-often/), as can be seen on our [download](https://dbatools.io/download) page.

![DevOps Release Cycle](/images/img_593fb5b7c4a8c.png)

Currently, our non-publicized releases occur with far greater frequency than our formal, publicized releases. If a major bug is reported, it can be tested and released to [PowerShell Gallery](https://dbatools.io/gallery) and [master](https://dbatools.io/git) in less than 4 hours. As you may be aware, we're working towards 1.0 right now. Each formal release takes about 8-16 hours of work for documentation and manual testing, so considering this, our formal release cycle is lagging. However, we've made AMAZING strides towards 1.0.

> Looks like next release will arrive around next Wednesday. Renames galore – fully signed module – dynamic parameter caching – more tests 😄👍
> — dbatools (@psdbatools) [June 6, 2017](https://twitter.com/psdbatools/status/872181622002638848)

We're super pumped (and I'm hoping we can pull off that Wednesday deadline – it'll be a challenge but I'd love for the newest release to be ready for our presentations at [SQL Saturday Dublin](http://www.sqlsaturday.com/620/eventhome.aspx)).

## Speaking of Releases

Our dev branch is a bit unstable right now, but it's filled with some really amazing things. As the tweet mentioned, every command now has the [Dba PowerShell prefix](https://dbatools.io/new-prefix-for-many-dbatools-commands/), our auto-populated parameters actually work well and now use caching, and the dev branch contains 232 commands as of today. Many of the newer ones revolve around encryption and certificates. We can't wait to share more soon!

## Join Us

Want to help the community *and* add some DevOps to your resume? We can offer you experience with git, GitHub, Slack, regular releases, being awesome and more. Join us on [Slack](https://dbatools.io/slack), [GitHub](https://dbatools.io/git), [YouTube](https://dbatools.io/youtube), [Twitter](https://dbatools.io/twitter) or [LinkedIn](https://dbatools.io/company).

\- Chrissy


