---
title: "New Release – Reverse Giraffe"
date: 2017-05-04
author: "Chrissy LeMaire"
slug: "reversegiraffe"
aliases:
  - /reversegiraffe/
  - /reversegiraffe/index.html
categories: [announcements]
draft: false
---

In [the latest release](https://github.com/dataplat/dbatools/releases/latest), we gained **8 new commands** and 5 new [contributors](https://github.com/dataplat/dbatools/graphs/contributors) to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of 53! We even added a few new [Major Contributors](https://dbatools.io/team) to the team. Thanks to all who have joined in to make the awesomest toolset for SQL Server DBAs — we're now offering the community nearly 190 quality commands!

### Export Commands

- **[Export-DbaScript](https://dbatools.io/Export-DbaScript)**
  Exports scripts from SQL Management Objects.

  Even though this command has great coverage for easy-to-export SMO objects, there will always be exceptional things like Export-DbaLogin or Export-DbaDiagnosticQuery (coming next week in the next release). Either way, Export-DbaScript is cool.

- **[New-DbaScriptingOption](https://dbatools.io/New-DbaScriptingOption)**
  Creates a new Microsoft.SqlServer.Management.Smo.ScriptingOptions object. Basically saves you the time from remembering the SMO assembly name 😉 Works well in conjunction with Export-DbaScript.

  See [Microsoft's page](https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.management.smo.scriptingoptions.aspx) for more information.

### General Commands

Based on the popularity of [Get-DbaDatabase](https://dbatools.io/Get-DbaDatabase) and a general agreement within the team, 1.0 will include a bunch of basic Gets and Sets within the module that return SMO objects.

- **[Get-DbaLinkedServer](https://dbatools.io/Get-DbaLinkedServer)**
  Gets all linked servers and summary of information from the sql servers listed

- **[Get-DbaLogin](https://dbatools.io/Get-DbaLogin)**
  Function to get an SMO login object of the logins for a given SQL Instance. Takes a server object from the pipe

- **[Set-DbaStartupParameter](https://dbatools.io/Set-DbaStartupParameter)**
  Sets the Startup Parameters for a SQL Server instance

### Other Commands

- **[Get-DbaEstimatedCompletionTime](https://dbatools.io/Get-DbaEstimatedCompletionTime)**
  Gets execution and estimated completion time information for queries

- **[Invoke-DbaDbShrink](https://dbatools.io/Invoke-DbaDbShrink)**
  Shrinks all files in a database. Databases should be shrunk only when completely necessary. Many awesome SQL people have written about why you should not shrink your data files – [Paul Randal](http://www.sqlskills.com/blogs/paul/why-you-should-not-shrink-your-data-files) and [Kalen Delaney](http://sqlmag.com/sql-server/shrinking-data-files) included. Sometimes, though, you gotta shrink your database. This command simplifies the process and also warns you of potential downsides (like excessively fragmented indexes.)

- **[Get-DbaDbFile](https://dbatools.io/Get-DbaDbFile)**
  This command is intended to avoid the enumeration issues that SMO causes when getting information about files and filegroups.

### Name Changes

- **[Invoke-DbaWhoisActive](https://dbatools.io/Invoke-DbaWhoisActive)**
  Invoke-DbaWhoIsActive is now Invoke-DbaWhoisActive. To get the same Grid-View behavior, you'll have to pipe Invoke-DbaWhoisActive out to Out-GridView.

- **[Install-DbaWhoisActive](https://dbatools.io/Install-DbaWhoisActive)**
  Install-DbaWhoIsActive is now Install-DbaWhoisActive. That's all.

### Quality Assurance Lead Needed

Our amazing QA guy, Dan Alexander, has stepped aside for a while. Our project has seen a lot of people come and go, including myself. It's absolutely understood and even expected. With Dan's absence, however, we desperately need someone to lead the QA effort.

Don't have PowerShell skills? No problem. Dan's strongest suit was that he knew how to run our commands and find ways to break them. We all miss being politely informed of how we could improve our code so that it works in more circumstances.

#### Requirements

- Beginner PowerShell experience
- Believing in the possibility of bugs in every Pull Request and doggedly trying to find them
- A few of your own SQL Servers. We have a lab but would like the commands tested in other configurations.
- Knowing how to kindly deliver frustrating news to excited and well intentioned people

The new QA lead would be considered the owner of the process and would help getting Pull Requests closed in a timely manner. The whole QA process happens in GitHub, so GitHub skills would be nice, but we can teach you if you aren't quite there yet. Dan and I both learned GitHub together when he joined last summer.

If you're up for the task, please visit our [Slack](https://dbatools.io/slack).

### Code Signing

One day I woke up and decided that we really must digitally sign the dbatools module. There are a number of reasons for this, but the two biggest reasons is that

1. It's professional AF
2. Changes to the default Execution Policy will no longer be required

Figuring out code signing is a bit of a journey and I'll be writing about it more in-depth on [my personal blog](https://netnerds.net). Something interesting about Code Signing certs – they're expensive. Unlike the $0-$5 email verified SSL certs, a code signing cert requires verification of identity.

I was disappointed to see that the cheapest code signing certs went for around $200 year. I put out a plea on Twitter and the community response was [SO AMAZING](https://twitter.com/cl/status/856214891161694208). I was so moved, I teared up.

Almost immediately after I Tweeted, I got a DM from [William Dirkin](http://www.williamdurkin.com/) and [André Kamman](http://andrekamman.com/) of [clouddba.io](http://clouddba.io), offering to fund our cert for the foreseeable future :O Ultimately, however, it turns out that MVPs get free code signing certs from [digicert](https://digitcert.com) so William and André will be hooking us up with a paid [Appveyor](https://www.appveyor.com) subscription instead. Amazing!

Thank you so much to everyone that offered any amount. I'm still so floored. Our first fully signed script will come in about 2 weeks after I work out the details.

## Licensing

dbatools is open source software that will always be free to download. We've been licensed under the GPLv3 since day one, and recently discussed as a team potentially switching licensing from GPLv3 to the more permissive MIT license. Ultimately, the decision was made to stay with GPLv3. If you're wondering about the differences, visit [choosealicense.com](https://choosealicense.com/).

## 1.0 Reminder

On March 1, 2017, we initiated a new command freeze. This means that we will no longer be accepting commands that are not within the scope of version 1.0, which we hope to debut on June 1. We're running a little behind because I had severe burnout, pretty much starting with the release of realfakedoors but I'm back now.

If you're available to help, we'd love it! Even if you don't know PowerShell, we'll need help updating the website with screenshots and examples with the updated parameters and command names, and other tasks of that nature. **We especially need testers**.

## Join Us!

We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel. There's over 640 of us there now, but the conversation load is reasonable.

Thanks for reading 😂
- Chrissy
