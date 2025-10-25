---
title: "new year, new standardized coding style"
date: 2017-01-03
slug: "new-style"
aliases:
  - /new-style/
  - /new-style/index.html
categories: [announcements]
draft: false
---

First, I'd like to thank everyone for a super amazing year! 🎉 Back at the start of 2016, GitHub reports that there were two contributors to the dbatools repository and now there are 32, excluding bots. THIRTY TWO! Cheers, y'all 🍺 That's beyond amazing and I don't even have the words to describe how excited I am to be a part of this incredibly fun and useful project.

With the help of these 32 contributors, the module has grown from 23 [commands](https://dbatools.io/commands) to 106! That's 106 ways to help ease the administrative burden faced by SQL Server DBA's and developers.

## The good, the bad, and the beautiful

A large majority of the progress we made was beautiful, but there was some ugly. Along the way, during nights of caffeine-fueled coding streaks, I tried my best to keep parameter names, outputs and documentation consistent, but I wasn't as successful as I'd hoped. Without a well thought out style guide, there were 31 other people who didn't have a strict standard to follow, either. Our templates helped but they weren't a perfect solution.

I can say that I wish I had taken the time to make a style guide from the start but that wouldn't be true. Now is actually the best time — now have a variety of commands with a variety of requirements that didn't exist in January of 2016. We've got more things to think about and more things to define. Perfect.

We also have a larger team that can think of a greater number of implications for the decisions we make. A few team members are far more meticulous than I am when it comes to style and their input will be so vital to this big ol' process.

## Getting to 1.0

dbatools, which started as Start-DbaMigration.ps1 back around August or September of 2014 is now almost ready to move from pre-release to 1.0. As of today, our master repository is at version 0.8.693.

Initially, I thought that some important features such as log shipping and mirroring for migrations would need to be implemented before I would consider dbatools a 1.0 product. But now I realize that while those would be amazing, dbatools will be ready for 1.0 once we standardize our code base.

We've already started working on the specifics as a team in #dbatools-style [Slack](https://dbatools.io/slack) channel and plan to use the next couple months to build a style guide.

**Beginning March 1, 2017, we will initiate a code freeze** and work together to update our code to have standardized

- Command names
- Parameter names
- Variable names
- Documentation
- Output
- Pipeline support
- Other stuff TBD

From now until the March deadline, you may notice that new commands will begin using -SqlInstance instead of -SqlServer, which is one of the decisions we've already made. SqlServer will continue to be supported as an alias until 1.0 comes out.

We expect that the code freeze will take about 2 months while we

- Implement all standards, including documentation changes
- Fix all bugs listed in the repository's [issues](https://dbatools.io/issues)
- Test everything
- Test everything again
- Update the website's documentation and screenshots

If you are interested in helping with this process, please do join in! We'll need all the help we can get. You can hit us up in the #dbatools or #dbatools-style [Slack](https://dbatools.io/slack) channels.

## 1.0 will contain breaking changes

I want to emphasize sooner than later that 1.0 will contain breaking changes. Scripts that previously used -SqlServer, for instance, will have to be changed to use -SqlInstance. we'll be removing all aliased commands, too. For instance, right now, if you run Reset-DbaAdmin (a command from the old days), it will run Reset-DbaAdmin for you. In 1.0, the Reset-DbaAdmin alias will be removed.

We will also rename **all** Sql-prefixed commands to Dba. Initially, [I chose to use Sql as a prefix](https://dbatools.io/new-prefix-for-many-dbatools-commands/) so that people would understand Copy-DbaDatabase copies a SQL database, and not just the "database administrator database" as perhaps would be suggested by Copy-DbaDatabase. By now, however, people are becoming familiar with the toolset so we'll be doing away with all of the Sql prefixes and leave those for Microsoft to use.

We will also remove support for all pluralized parameter names.

## About those plural parameters

Initially when I was creating dbatools, I decided to break a few best practices in order to convey ideas better. For instance:

- Copy-DbaDatabase supports the -Databases parameter, so that people know that you can migrate more than one database at a time
- Copy-DbaLogin supports the -Logins parameter, so that people know that you can migrate more than one login at a time

The PowerShell team has said that it is best practice to name commands and parameters using singulars and I gave in with naming the commands with the singular, but I just couldn't do it with the parameters. I really thought that people understanding you can copy multiple, specific items would increase adoption. SQL people wouldn't have to learn about the nuances of the PowerShell naming convention — I could save them some time.

Then I talked to one of my heroes, [Aleksandar Nikolić](http://www.powershellmagazine.com/) about using plural parameters and he said something that resonated very deeply with me

> We should never use bad practice solutions to increase PowerShell adoption. Azure PowerShell team did that and look what happened. You now measure bad PowerShell cmdlets design with Azure PS cmdlets.

Damn, so true. Looks like we'll be making a concerted effort to ensure that people know about the support for multiple items, whether it be in the docs and examples, or within individual blog posts that we all work on (like this one ;)).

## But what about the burden on new developers?

I'd rather help rewrite all of someone's code than to have anyone run away from the development process because it seems overwhelming. From now until the release of 1.0, we're also going to work out how to best integrate new developers.

I think it will be similar to the way we're doing it now — provide some unintimidating templates and mention any needed changes during the code reviews. Either way, we'll do our best to ensure that new contributors feel that contributing to dbatools is within reach without tedious onboarding.

## Thank you so much

Thanks again to everyone who has helped make this an amazing year, whether you are an e-mail subscriber, an end-user, idea giver, bug reporter or developer.

Here's to an extra magical 2017!
