---
title: "New Prefix for Many dbatools Commands"
date: 2016-08-02
author: "Chrissy LeMaire"
slug: "new-prefix-for-many-dbatools-commands"
aliases:
  - /prefix/
  - /prefix/index.html
categories: [announcements]
tags: [party]
draft: false
---

When I first began working on dbatools, I was aware of the suggestion to use a distinct prefix in PowerShell, but chose to use Sql for its universal recognition. That will soon change.

## PowerShell Prefixes

Prefixes are the things that start the noun. SQL Server uses Sql, Active Directory uses AD, SharePoint uses SP, PowerShell uses PS and Lync uses Cs. You can see, even with two letter prefixes, that there is no true case consistency.

I chose to use Sql even though it was in use by Microsoft both because there had been minimal development on SQLPS and because I wanted the intention of the commands I was writing to be obvious. Start-DBAMigration and Copy-DBALogins makes it sound like I'm just migrating DBA-related stuff, and not performing a DBA task.

Considering the following, I think now is the right time to move away from the Sql prefix for some commands.

1. Microsoft is now investing a lot into the SqlServer module
2. dbatools is becoming more recognized so the intention is becoming more obvious
3. dbatools is approaching v1.0

All Sql commands have been renamed to Dba. Old Sql commands within dbatools will become aliases so there will still be backwards compatibility.

## New Naming

So now for the part I'm terrible at — naming things. dbatools, the module, is spelled in all lower case, probably because of the Linux influence and I wanted this to be an open source product. But Test-dbaDiskAllocation was ugly. I noticed that some people were spelling the module's name DBAtools and dbatools, which is understandable but kind of made my eyes bleed.

I was curious and put it up for a Twitter vote.

![finalpoll](/images/finalpoll.png)

When it became obvious yesterday that the winner was going to be DBA, I submitted the first two commands (Test-DBAPowerPlan and Set-DBAPowerPlan) the DBA prefix in [this commit](https://github.com/ctrlbold/dbatools/commit/0138a6ead65c292dab1b1a9cffe926e36e6429c9).

## Announcing the Winner

You guys, I really wanted to adhere the will of the people. The lower-case prefix "dba", with its 10% of all votes, was no longer considered. And I submitted a total of three commands with the all capped "DBA".

![sadface](/images/sadface.png)

Unfortunately, my OCD is preventing me from making this a permanent change. The PowerSheller in me overruled the DBA, and I've decided to go with second place. The new naming convention will be **Dba**.

![happy](/images/happy.png)

Ahhh, I feel so much better already.

## Coming Soon

Thank you all for voting! The changes will be coming soon, and again, it won't be all commands, and the ones that do change will have an alias so you can continue to use them with the Sql prefix. That will go away, however, by the 1.0 version.

We are currently at 0.8.5. I believe dbatools will be cool enough for the v1.0 release once we get mirroring, log shipping and AG support in the Copy-Sql* commands. And once we've finalized the naming of each command.
