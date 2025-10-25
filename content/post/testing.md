---
title: "performing a migration with every commit: testing with pester and appveyor"
date: 2017-09-12
slug: "testing"
aliases:
  - /testing/
  - /testing/index.html
categories: [announcements]
tags: [party]
draft: false
---

## not a snoozefest

You may be thinking "oh man, a post about testing. booooring!" I used to, too, but have since come around and now find that creating tests is actually a lot of fun 🎉. I even have a personal goal that that every command touched by a PR gets a corresponding test. That way, we know the command works as expected and will continue to with each and every merge.

Here's how I came around.

## my nightmare

When it comes to dbatools, my biggest fear is creating or allowing a command that causes data loss. What if `Copy-DbaLogin -Force` dropped the login on the source instead of the destination? What if the `-WhatIf` parameter actually executed code that modifies a setting instead of just reading and reporting on it? I was horrified when I found out that even Microsoft's own SqlServer module, then known as SQLPS, actually did this and I've literally lost sleep over such possibilities with dbatools.

Even though we've got our own team lab complete with over 15 test instances, I dreamed of a dedicated Azure-based lab that could spin up fresh VMs, add some objects, do a whole migration, reset all settings, then turn off until the next time we wanted to run our tests.

Turns out, the service we actually wanted wasn't Azure, it was a free service we were already using – [Appveyor](https://appveyor.com)! Appveyor, when combined with [Pester](https://github.com/pester/Pester), the PowerShell-based unit testing framework, was exactly what I was looking for.

## my dream come true

Appveyor is awesome and free for open source projects. It hooks into GitHub and launches a fresh VM **with each and every commit**. It comes with 4 or 5 different versions of SQL Server pre-installed, and with the way we've got it setup, **performs 8 migrations** every time code is committed to our repo. How?

- We configured Appveyor to turn on two of its pre-configured SQL Server instances once it's booted up
- We chose 2008 R2 Express and 2016 Developer for widest coverage
- We configured Pester and Appveyor to test files in the [tests directory](https://dbatools.io/tests) within our repo
- We wrote tests for 8 of our migration (`Copy-`) commands and migrated between the 2008 R2 and 2016 Appveyor instances

Now, I no longer have to worry that Copy-DbaLogin or Copy-DbaDatabase will inadvertently drop the object on the wrong server when the -Force parameter is used. Why? Because the tests I wrote for those two commands perform the migration, and [tests the source (2008) server](https://github.com/dataplat/dbatools/blob/master/tests/Copy-DbaDatabase.Tests.ps1#L33) to ensure the object still exists.

![Just a few of our tests](https://dbatools.io/wp-content/uploads/2017/09/img_59b65245213f6.png?w=800&ssl=1)

Ultimately, the team has written nearly 600 tests that touch at least 88 of our 287 commands. Our goal for 1.0 is to at least one test for 100% of our commands. And best of all, I now have so much more confidence in the state of dbatools after I hit that Merge button.

## it gets even better

One of my favorite parts of this whole testing thing happened a few months ago when when a community member submitted a [GitHub Pull Request](https://help.github.com/articles/about-pull-requests/) that modified [Restore-DbaDatabase](https://dbatools.io/Restore-DbaDatabase). Now, Restore-DbaDatabase is one of our largest and most important commands – it's used within [Copy-DbaDatabase](https://dbatools.io/Copy-DbaDatabase), [Test-DbaLastBackup](https://dbatools.io/Test-DbaLastBackup) and [Invoke-DbaDbLogShipping](https://www.sqlstad.nl/powershell/lets-get-all-posh-log-shipping/). It was written primarily by [Stuart Moore](https://stuart-moore.com/) and I consider it his baby.

It's rare I'll approve a PR for this command myself because of its intricacy, and usually leave it for Stuart. So with this PR, he merges it with the comment **"looks good to me and passes all tests."** Wait, what? Which tests? Then I take a look at [Restore-DbaDatabase.Tests.ps1](https://github.com/dataplat/dbatools/blob/master/tests/Restore-DbaDatabase.Tests.ps1) and holy moly, this thing contains 53 glorious tests! FIFTY THREE!

![Output of Restore-DbaDatabase tests.](https://dbatools.io/wp-content/uploads/2017/09/img_59b6688ad97ad.png?w=800&ssl=1)

Now, gone are the days of us manually testing if a command will work, forgetting to test a specific scenario or hoping that we properly remembered to test all related commands. Now, the same 53 tests will run every single time any command in the repo is modified.

What a relief 😌

## more about pester

I was first introduced to Pester by the host of this T-SQL Tuesday, Rob. I've gotten a chance to see many of his Pester presentations because Rob and I often present together and we even [won the Best Speaker award](https://sqldbawithabeard.com/2017/06/21/dbatools-at-sqlsatdublin/) back in June at SQL Saturday Dublin for our dbatools presentation!

I always enjoy Rob's sessions and find his use of Pester to test his own presentation environment totally meta and fun.

<iframe width="560" height="315" src="https://www.youtube.com/embed/WHs0lLHvA" frameborder="0" allowfullscreen></iframe>

Still, when it came to creating Pester Tests for dbatools, I deferred to other team members because I didn't really get the type of testing we first started with – Unit Testing. Turns out, I better relate to and love Integration tests. I learned about this style of testing at [PSConf.eu](http://www.psconf.eu) when I dropped in on Rob and André's session, [Test your PowerShell code with AppVeyor for ITPros](https://www.youtube.com/watch?v=8Nljk1deSmU).

### unit testing vs integration testing

Here's my understanding of Unit Tests vs Integration Tests.

- Unit Testing – Testing a small portion of a command in isolation and in theory. Since it's theory, data can be faked or "[mocked](https://github.com/pester/Pester/wiki/Mocking-with-Pester)".
- Integration Testing – Testing to see if the whole command really works, not just in theory. For us, Integration tests usually require a working SQL Server instance 😊

I think the easiest two examples of testing commands with Unit Tests are [Get-DbaBuildReference.Tests.ps1](https://github.com/dataplat/dbatools/blob/master/tests/Get-DbaBuildReference.Tests.ps1) and [Get-DbaMaxMemory.Tests.ps1](https://github.com/dataplat/dbatools/blob/master/tests/Get-DbaMaxMemory.Tests.ps1). Note, however, that Get-DbaMaxMemory.Tests.ps1 starts with a single Integration test and then goes into a bunch of Unit Tests.

### keeping it simple

Check out this simple Integration test for the super cool command [Get-DbaSchemaChangeHistory](https://dbatools.io/Get-DbaSchemaChangeHistory), also created by Stuart Moore.

<!-- [Gist: Simple Integration Test](https://gist.github.com/potatoqualitee/a058ae513ce5006000f5a62c2f396165.js) -->

Here's a simple breakdown of this test's structure:

- Describe – a group of types of tests (Unit vs Integration, etc)
- Context – a group of tests
- BeforeAll – do this before all the rest of the entire test
- AfterAll – do this after all the tests, even if all of them fail
- It – the actual test

In order to allow our developers (or even you!) to run these tests in their own environment without leaving junk behind, we started prepending "dbatoolsci_" to all of the objects that we create and cleaning up by deleting any objects we create. To set your own `$script:instance1` and `$script:instance2`, add your own [constants.ps1](https://github.com/dataplat/dbatools/blob/master/tests/constants.ps1) to C:\temp.

So the test

- Creates a table named in tempdb
- Changes the table's schema
- Runs Get-DbaSchemaChangeHistory and assigns the results to `$results`
- Ensures dbatoolsci_schemachange exists in `$results`
- Drops the table dbatoolsci_schemachange

This test could get a lot more detailed, of course. Microsoft's Unit tests for just one command clocks in at [over 6000 lines](https://github.com/PowerShell/PSDscResources/blob/dev/Tests/Unit/MSFT_Archive.Tests.ps1)! But this will at least ensure the change is detected.

How did I come up with the test? I just thought about what I'd do if I were running the command manually and what I'd check.

### a slightly more advanced example

Another example of [a test](https://github.com/dataplat/dbatools/blob/master/tests/New-DbaAgentJob.Tests.ps1) would be for, say, [New-DbaAgentJob](https://dbatools.io/New-DbaAgentJob). The test for that command (which hasn't been migrated to use BeforeAll & AfterAll)

- Creates a new job and assigns the output to `$results`
- Checks to ensure `$results.Name` and `$results.Description` are correct
- Tests to ensure that the job actually exists when called by `Get-DbaAgentJob`
- Ensures that attempting to create the job again doesn't overwrite the existing job
- Drops the job

## appveyor in action

If you'd like to see Appveyor in action, you can watch it live (we do alll the time) at [dbatools.io/ci](https://dbatools.io/ci). Some days, we're looking really good and it's all green

![Appveyor green build](https://dbatools.io/wp-content/uploads/2017/09/img_59b7d00729690.png?w=800&ssl=1)

Other days are not as good

![Appveyor red build](https://dbatools.io/wp-content/uploads/2017/09/img_59b7d0c04d876.png?w=800&ssl=1)

Sometimes, failed tests are because of our code. Other times, it's an exhaustion of resources because Appveyor only gives 2GB of ram per VM. In response, we split up our tests and now run them on three different VMs. It takes a little longer, but it's worth it for more reliable testing.

If you're wondering what a live run of Appveyor looks like, you can watch it [on YouTube](https://youtu.be/rgLmUZ2xTDU) (sped up 4x).

<iframe width="560" height="315" src="https://www.youtube.com/embed/rgLmUZ2xTDU" frameborder="0" allowfullscreen></iframe>

## In conclusion

There's sooo much that could be written about Pester and Appveyor, it was a challenge to keep this post to a reasonable length. But I hope, at least, that you understand our process a little better and got some ideas on how to apply it to your own development environment. For day-to-day testing, check out [Cláudio Silva's T-SQL Tuesday post](https://claudioessilva.eu/2017/09/12/someone-is-not-following-the-best-practices-dbatools-and-pester-dont-lie/), which applies Pester and dbatools to regularly scheduled environmental checks!

If you'd like to learn more, we'll be covering Pester during our [PASS Summit Precon](https://sqlps.io/precon) on October 31 in Seattle 👍 Aaron Nelson had to bail due to a scheduling conflict and the Pester-man himself Rob will be taking his place!

\- Chrissy
