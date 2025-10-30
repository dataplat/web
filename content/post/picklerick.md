---
title: "New Release - PickleRick"
date: 2017-11-17
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "picklerick"
aliases:
  - /picklerick/
  - /picklerick/index.html
categories: [announcements]
tags: [party]
draft: false
---

I have to wake up at 3am to go to the airport and start a solid two weeks of vacation, so I'll keep this incredibly short.

Tonight, we released **picklerick**. It has 323 super useful, [tested](/improving-tests/) commands but what's especially great about this release is that now, we get along better with your SQL Servers. We no longer hang out longer than we're supposed to and dbatools creates connections that are part of the SQL Connection Pool.

I actually thought we already were, but it appears that creating the connection with an explicit `$server.ConnectionContext.Connect()` bypasses the connection pool. Turns out, we should use `$server.ConnectionContext.SqlConnectionObject.Open()` instead. Hat tip to (newly minted MVP!) Shawn Melton and Jay Robinson for that super solid fix.

![picks](/images/picks.jpg)

So if you found dbatools hanging out for too long, please do update to [0.9.105](https://github.com/dataplat/dbatools/releases) or above.

Also, [this GitHub/Power BI/dbatools post](https://marcosfreccia.wordpress.com/2017/11/17/looking-at-dbatools-github-with-power-bi/) from Marcos Freccia is super cool and you should check it out!

In addition, just an FYI: 2018 will be dedicated to more formalized releases, hella documentation and hopefully a tech book about dbatools. So expect to see that soon. Meanwhile, I'm off to 🇯🇵 with one of my high school best friends and my wife.

Au revoir!
\- Chrissy
