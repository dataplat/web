---
title: "simplifying extended events management with dbatools"
date: 2018-02-26
author: "Chrissy LeMaire"
slug: "xevents"
aliases:
  - /xevents/
  - /xevents/index.html
categories: [announcements]
tags: [party]
draft: false
---

[Gianluca Sartori](https://www.spaghettidba.com) and I recently presented **Simplifying Extended Events with dbatools** at SQL Bits and we had a lot of fun. Not only that, we helped convince several people to switch! Honestly, when we proposed the session, I was totally #TeamProfiler. I figured if PowerShell didn't convince me, I would let people know where I stood, but I was open to switching teams.

**[Slides](https://github.com/dataplat/community-presentations/raw/master/chrissy-lemaire-gianluca-sartori/bits-xevents/simplifying-xevents.pptx) | [Code](https://github.com/dataplat/community-presentations/raw/master/chrissy-lemaire-gianluca-sartori/bits-xevents/xevents-demo.zip)** | **[Video](https://sqlbits.com/Sessions/Event17/Simplifying_XEvents_Management_with_dbatools)**

SQLBits was awesome! The people, the events, the speaker shirt, the swag, the food, the everything. If you ever get a chance to go, I highly recommend it.

## So why do people keep using Traces / Profiler?

As you may know, Microsoft deprecated Profiler/traces 5 years ago in favor of Extended Events. Unlike traces, XEvents are lightweight and even offer more information about what's going on within the engine.

How badly do traces impact performance? Jonathan Kehayias gives details in his article [Measuring "Observer Overhead" of SQL Trace vs. Extended Events](https://dbatools.io/xeoverhead).

So why do people keep using traces? We compiled a list of reasons from Erin Stellato's [Why do YOU avoid Extended Events](https://dbatools.io/whyprofiler). And this list is LONG!

- **Traces are straightforward and less complex than Extended Events**
  Totally seems that way!

- **Traces provide a consistent interface for mixed environments**
  Whether you use SQL Server 7 or SQL Server 2017, the interface is pretty much the same.

- **Traces are faster to setup quick traces**
  Just open up Profiler, connect to a server, click a few times and you're set.

- **"Extended Events are more efficient for the SQL Server engine, but not more efficient for the DBA"**
  Love this quote.

- **People already have a library of Profiler templates**
  Including me

- **Ignorance of XML / Querying all the generated XML is outrageous**
  When I first saw what it takes to query Extended Events, I bailed immediately. I am not learning XPATH, ever.

- **Templates work remotely across all instances**
  This is also true for Extended Events, but the commenter did not know that.

- **XEvents are persistent and must be stopped manually**
  Once you close Profiler or restart SQL Server, all non-default traces will disappear. Extended Events will persist until you delete them.

- **Ability to import PerfMon data and look at Trace and PerfMon counter data at the same time**
  Most people that use Profiler don't seem to know about this feature but those who do LOVE it. You can read more at Brad McGehee's [Correlating SQL Server Profiler with Performance Monitor](https://www.red-gate.com/simple-talk/sql/database-administration/correlating-sql-server-profiler-with-performance-monitor/).

  Microsoft reportedly has no plans to provide this functionality.

- **Consistent user experience across SSAS and Database Engine**
  Gotta take their word, I don't use SSAS.

- **It's easy to train others to use Profiler**
  Imagine – if it's easier to learn Profiler, it'll be far easier to teach.

- **Traces can be easily replayed**
  There are a number of Microsoft tools to replay traces, but none to replay Extended Events.

- **MS Premier Support still asks for traces**
  Likely because they also have tools that they want to work across all supported versions, which still includes SQL Server 2008 R2.

- **xe_file_target_read_file is a CPU hog**
  This wasn't listed on Erin's page but was told to me while I was performing my research.

Whewf! That's *a lot* of compelling reasons not to make the switch. So let's see how we can address each of them using PowerShell. All code listed here can be found at [sqlps.io/xecode](https://sqlps.io/xecode).

## PowerShell/dbatools can help

First, I'll start with the bad news. There were a few things we couldn't address.

<!-- [Gist: e77568d29df77a3f434b6176b5496126] -->

But now for those we could! (note: for those of you reading this as email, please visit the blog post for the embedded GitHub code.)

### Existing library of Profiler templates

No problem! We took Jonathan Kehayias's [awesome sp_SQLskills_ConvertTraceToExtendedEvents script](https://www.sqlskills.com/blogs/jonathan/converting-sql-trace-to-extended-events-in-sql-server-2012/), wrapped it in PowerShell and made it easy to convert all of your traces on all of your servers to Extended Events.

<!-- [Gist: 82d1a671eda5f080cc6bc7a1f3bfaec6] -->

Here's the output
![conversion](https://pbs.twimg.com/media/DWzwV8OWsAA4-P1.jpg:large)

### It's faster to setup quick traces

To setup a trace in Profiler, you connect to a **single server**, click, click, click and you're set.

Now, it's even easier to setup a "quick session" in Extended Events. Just select an included template from dbatools and import!

<!-- [Gist: 4d5fad4e65c557905f468827f74bdd8d] -->

Note that while we do enable the ability to easily export/import your own newly created XEvent, we currently don't have a nice and easy way to create XEvents. If you'd like to contribute your own template, please do feel free!

Here's a snippet of the list that we've gathered from XE experts plus the templates available within SSMS 17.

![templates](https://pbs.twimg.com/media/DWzw2uwW0AEnwes.jpg:large)

### Unlike traces, Extended Event Sessions persist

It's true, they do! And this annoyed me at first too, but now I appreciate it. One reason is that XEvents are so hard to manage. You gotta go server by server, click Management -> Extended Events -> Sessions.

It took time for me to come around, though. And I want to give you that time too. So here's our solution.

<!-- [Gist: 1fc6838383ecc1c50cb9bf33dd660947] -->

Ultimately, when it's hard to manage Extended Events, you don't want many of them around. But look at how easy it is to get a listing of my lab's XEvent Sessions. You can pipe any of these to remove, stop, start or export them.

![big ol list](https://user-images.githubusercontent.com/8278033/36645230-d30e44b6-1a65-11e8-87d9-4319c08eba77.png?w=800&ssl=1)

### Remembering to stop a session

Within Profiler, it's easy to set a time to stop a trace. But traces don't support this functionality out of the box – Profiler does. If you need to stop a session after a set amount of time, we can help!

<!-- [Gist: 85e075064b13d148435fd2f3f21a0fae] -->

![auto-disappearing](https://pbs.twimg.com/media/DWzxxyGX4AAFdj5.jpg:large)

### Extended Events requires knowledge of XML and XPATH to query

I know – I was horrified when I saw a [sample XEvent Query](https://blogs.msdn.microsoft.com/grahamk/2009/09/29/using-xquery-to-query-extended-events-asynchronous-file-target-results/). But now with SQL Server Management Studio 17.x and dbatools, it's way easier to see and filter the results of XEvents.

The limitation with SSMS is that you work with just one server at a time. The benefit is that it's quick, easy and filterable.

![image](https://user-images.githubusercontent.com/8278033/36645362-c5ad3604-1a67-11e8-8060-ce7c2193e923.png?w=800&ssl=1)

The good thing about dbatools is that you can get the same benefits with more than one server. This is especially good for total instance aggregation. And like plain-ol T-SQL, PowerShell is human readable.

<!-- [Gist: 82353246df37395225dba8bbaae48bc7] -->

And here's the human-readable output 😄

![image](https://user-images.githubusercontent.com/8278033/36645300-cc20b03e-1a66-11e8-8470-51369b6e31bf.png?w=800&ssl=1)

### Extended Events are a lot of work

PowerShell enables laziness, or as I prefer calling it, "efficiency" 😉 But heck, PowerShell MVP Francois-Xavier Cat even calls himself [lazywinadmin](https://lazywinadmin.github.io/). So if you're lazy, we've got you.

<!-- [Gist: 88ebb746281329dca3c146f851215a18] -->

### Can't replay Extended Events

Profiler offers a number of ways to replay data. We offer two solutions, including a preview version of [Gianluca's XESmartTarget Replay](https://spaghettidba.com/tag/extended-events/).

<!-- [Gist: 7c9a31e5e4ccaad123176b5e91bbfbfb] -->

#### Email notification bonus

XESmartTarget within dbatools also offers the option of being notified when an event occurs! Check this out

<!-- [Gist: 9d23ad33ce9fb9020dbb1aec1918a39e] -->

### Profiler offers the ability to compare PerfMon and Trace

So Microsoft does not offer this ability and according to [Erin Stellato](https://www.sqlskills.com/about/erin-stellato/)'s session at Bits, they don't plan to. When attempting to provide a solution for this, I immediately thought of putting it in Power BI and making it beautiful. Because Profiler's version ain't pretty 😅

So then my question was: how can we make XEvents accessible to Power BI?

- Xevents to CSV or SQL Table
- Perfmon to CSV or SQL Table
- Mash them together

Here's what we came up with:

<!-- [Gist: 7b07b8159a2b4be62bc73e6519df42c5] -->

And from the Perfmon, we created a universal dashboard:

[![](https://dbatools.io/wp-content/uploads/2018/02/img_5a946668978d5.png?w=800&ssl=1)](https://dbatools.io/wp-content/uploads/2018/02/img_5a946668978d5-full.png?ssl=1)

But! It still needs some work. At SQLBits, we asked for Power BI pros to help us with performance and mashing this data and the eternally awesome [Johan Ludvig Brattås](https://twitter.com/intoleranse) volunteered 🙌 I *cannot* wait to see what Johan comes up with with the Power BI dashboard.

Also, I'm planning to write more in-depth about the Performance Monitor commands so expect more about that soon.

### Reading using xe_file_target_read_file taxes the SQL Server CPU

Now you can offload that resource usage to your local workstation. Behind the scenes, we use [Microsoft's streaming API](https://blogs.msdn.microsoft.com/extended_events/2011/07/20/introducing-the-extended-events-reader/), similar to the one, I assume, used in SSMS.

<!-- [Gist: af6ed0d40638461e7cb6f5adb1f25b0c] -->

## In conclusion

Hope this article has convinced you to switch from #TeamProfiler! PowerShell sure convinced me 👍

\- Chrissy
