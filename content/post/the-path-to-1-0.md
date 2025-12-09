---
title: "The Path to 1.0"
date: 2018-01-16
lastmod: 2025-10-30
author: "Simone"
slug: "the-path-to-1-0"
aliases:
  - /the-path-to-1-0/
  - /the-path-to-1-0/index.html
categories: [announcements]
draft: false
---

We have now reached more than 370 public functions and nearly 1000 unit and integration tests, all thanks to over 100 community contributors!

As you may have noticed, we release a 0.9.x update with bug fixes and new features almost daily, so why haven't we released 1.0 yet?

## Shifting From "A Bag of Functions" to a Proper Module

We love new functionality, of course, but we must take a step back from new development and consolidate what we have in a properly usable module.

Most of the contributors are damn good SQL Server Pros, a few are damn good PowerShell programmers, with the majority of "casual" developers being able to successfully publish a new function in less than a week time. But what we aren't so good at is advertising our needs. We recently updated our [contributing.md](https://github.com/dataplat/dbatools/blob/master/CONTRIBUTING.md) to be more on par with the latest months of developing. Stay tuned there, as the few TODOs left are coming, but the path is mostly set.

## We Need Your Help

We're looking for contributors to help us finally reach version 1.0. Currently, we are on par with Gmail's beta schedule: a whopping 4 years. But, we're almost there and need your help finalizing our changes. If you're interested in helping us bring 1.0 alive, we identified four areas with 5 primary contacts on the [SQL Server Community Slack](https://dbatools.io/slack):

- Standardize param names (@wsmelton)
- Create tests for existing functions (@cl and @niphlod)
- Review existing function documentation (@alevyinroc or @gbargsley)
- Prepare for 1.0 with "code style" (Bill of Health, more on that later)

As you can see, a few of us are the main reference (on GitHub and Slack, mostly) for each area.

## Bill of Health

As dbatools is full of sooo many features, it's hard to tackle everything in one sweep. That's why we made the [Bill of Health](https://dataplat.dbatools.io/boh) available. That's for you, and us, to track progress towards 1.0. It includes every single activity that will bring us closer to 1.0.

Data will be refreshed once or twice a week (you can see the trend on top with the details), giving everybody a good understanding on what's the pace of development. For details on each column, click on the Legend details, you'll be able to see what they mean.

Basically, we gave each function a scorecard, composed by checks that need to be tackled before 1.0.

#### Becoming a Core Developer

Some of the checks are "reserved for core-devs", but that doesn't mean you shouldn't tackle those, it's just you need to read on how we want the code to look like (we'll eventually group everything in a more consolidated guide, ranging from the simpler to the "most complex"):

- [do and do not](https://github.com/dataplat/dbatools/wiki/Do-And-Do-Not)
- [Style Guide](https://github.com/dataplat/dbatools/wiki/Style-Guide)
- [The Messaging System](https://github.com/dataplat/dbatools/wiki/Implementing-the-messaging-system)
- [Sign-offs](https://github.com/dataplat/dbatools-progressmanagement/blob/master/dbatools%201.0/Requirements/manually%20signing%20off.md)

It *may* scare PowerShell newbies, but trust us, to get the gist of it and be a successful "core-dev", all you need is one week of coding. Most of us learned from Slack and Pull Request Code reviews. Sqlcollaborative is a wonderful place to learn coding in PowerShell! Checks for core-devs, despite being numerous, are a minority of the total.

## Getting Started

The most important things you can fix even without being a skilled developer: ScriptAnalyzer and Coverage. [ScriptAnalyzer](https://github.com/PowerShell/PSScriptAnalyzer) checks are the de-facto standard for any Powershell module and some are really, really easy to fix.

Coverage is a "higher level" metric: it tells you how much code is tested. It builds up on having tests written. We can't (and won't) stress enough on this point: if it's tested, tests describe the way the function behaves, so **the more coverage a function has, the more stable it is**. This means you can build up your scripts being sure there won't be regressions (i.e. the code that "worked before" continues to work as expected).

Having a strong suite of tests also help the casual developer contributing code, being sure it doesn't break existing functionality. It's only a recommendation, but I feel like most of the "devs" should spend most of their time writing tests, because it's the single best wealth indicator for any module.

For dbatools in particular: if you factor all the things dbatools supports (think PS versions *times* SQL releases *times* editions *times* Azure/cloud envs *times* x86/x64 *times* remote/local *times* functions *times* … ).

#### We've Made It Easy

You can copy and paste from [our templates](https://github.com/dataplat/dbatools-templates/tree/master/tests) for a starting point, or dive right in to an existing tests.

[Improving existing tests](https://dbatools.io/improving-tests/) is an easy first step to "dip your toes" into coverage.

## Want to Help?

Right now there are more than 500 tasks ready to be tackled by everyone and more than 1300 for intermediate developers. To make sure everyone doesn't jump on the same activity, you're invited to see if there's an [issue](https://dbatools.io/issues) opened on GitHub by someone else. If nothing pops up, open an "issue" , stating that you want to work the issue.

You can then [issue a PR](https://dbatools.io/firstpull), there will be a swift review of the changes, and the code will be committed. A few hundred PR's later (hopefully it'll take just three or four by yourself), 1.0 will be shipped. And just wait to see what we have in mind for 2.0!

Got any questions? Hit me up on Slack. I'm @niphlod.

---

Ciao!
Simone 🇮🇹
