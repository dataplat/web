---
title: "Our Prompt"
date: 2017-10-25
author: "Chrissy LeMaire"
slug: "prompt"
aliases:
  - /prompt/
  - /prompt/index.html
categories: [announcements]
tags: [party]
draft: false
---

A few months back, dbatools wizard Fred created a prompt that was so awesome, I never had to use `Measure-Command` again. It was cool enough that a number of us ended up adopting it, so I figured I'd share.

Performance is important to us so that's what the prompt is all about. Nothing fancy, just the current working directory and how long the command took to run.

![](/images/img_59f0a3f8112ce.png)

As you can see in the screenshot above, the first time `Get-DbaDatabase` runs, it takes 740 ms. This is because we're caching the database names, login names, and some other auto-populated variables in the background.

When the command runs again, it takes a more reasonable 110ms to complete because it is not performing any caching.

Want this prompt for yourself? Here it is. Just `notepad $profile`, paste this in, save and restart your console. Note that you may have to restart ISE twice if you're using the ISE.

<!-- GitHub Gist embedded: https://gist.github.com/potatoqualitee/f73eaea0306773cc54a33773aacc5120 -->

What the heck is `DbaTimeSpanPretty`? I asked Fred for a pretty timespan and he created a C# type to make timespans a bit tidier and… pretty 😂

Thanks, Fred, for all the features!

\- Chrissy
