---
title: "dbatools is now MIT licensed!"
date: 2018-03-05
author: "Chrissy LeMaire"
slug: "mit"
aliases:
  - /mit/
  - /mit/index.html
categories: [announcements]
tags: [mit, party]
draft: false
---

Nearly two years ago, I wrote that as a open source [GPL-licensed project](https://choosealicense.com/licenses/gpl-3.0/), dbatools was [free as in speech](https://dbatools.io/dbatools-is-free-as-in-speech/) and [free as in beer](https://dbatools.io/dbatools-is-free-as-in-beer/).

I chose the GNU GPL for nostalgic reasons and I also wanted companies who used dbatools to contribute back to the project. What I didn't realize was that licensing dbatools as GPL would hurt integration which ultimately [impacts adoption](https://www.reddit.com/r/SQLServer/comments/5iec4i/dbatools_an_open_source_project_now_with_over_100/dbdjndp/). Permissive licenses like the [MIT](https://choosealicense.com/licenses/mit/) do not subject users to such restrictions.

Many of the tools we use on a daily basis, like [VS Code](https://code.visualstudio.com/license) and even [.NET](https://github.com/Microsoft/dotnet) are MIT licensed, and MIT is [the most popular license on GitHub](https://blog.github.com/2015-03-09-open-source-license-usage-on-github-com/).

![](https://dbatools.io/wp-content/uploads/2018/03/img_5a9af637b5a66.png?w=800&ssl=1)

Considering this and our lessons-learned from dbatools, we released [dbachecks](https://dbachecks.io) under the MIT license. The reception at SQL Bits was *amazing*. A number of comments were made expressing thanks and optimism about our selection of the MIT license.

And, after speaking with a number of community members about the restrictive GPL license, it became clear that dbatools must also switch to MIT.

As of version [0.9.300](https://www.powershellgallery.com/packages/dbatools/0.9.300), dbatools is now MIT licensed! If you would like to continue using the GPL version, please fork [v0.9.211](https://github.com/dataplat/dbatools/commit/ddd7b7a7f379534fa36dbef3ad84a89c4b7d13a4) and take it from there.

If your project appreciates this switch, please comment in the section below or [email us](https://dbatools.io/contact/) to let us know!
