---
title: "dbatools 1.0 Has Arrived"
date: 2019-06-18
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "dbatools10"
aliases:
  - /dbatools10/
  - /dbatools10/index.html
categories: [announcements]
tags: [party]
draft: false
---

We are so super excited to announce that after 5 long years, dbatools 1.0 is publicly available!

Our team had some lofty goals and met a vast majority of them 🏅. In the end, my personal goal for dbatools 1.0 was to have a tool that is not only useful and fun to use but trusted and stable as well. Mission accomplished: over the years, hundreds of thousands of people have used dbatools and dbatools is even recommended by Microsoft.

Before we get started with what's new, let's take a look at some history.

# Historical Milestones

dbatools began in July of 2014 when I was tasked with migrating a SQL Server instance that supported SharePoint. No way did I want to do that by hand! Since then, the module has grown into a full-fledged data platform solution.

- 07/2014 - Started
- 07/2014 - Published to GitHub & ScriptCenter
- 06/2016 - First major contributors
- 01/2017 - Road to 1.0 began
- 03/2018 - Switch from GPL to MIT
- 05/2019 - Added MFA Support
- 06/2019 - Over 160 contributors and 550 commands

Thanks so much to every single person who has volunteered any time to dbatools. You've helped change the SQL Server landscape.

# Improvements

We've made a ton of enhancements that we haven't had time to share even over the past six months. Here are a few.

## Availability Groups

Availability Group support has been solidified and is looking good and [New-DbaAvailabilityGroup](https://dbatools.io/New-DbaAvailabilityGroup) is better than ever. Try out the changes and let us know how you like them.

```powershell
Get-Help New-DbaAvailabilityGroup -Examples
```

## Authentication Support

We now also support all the different ways to login to SQL Server! So basically this:

![SSMS Auth Dialog](/images/ssmsdialog.png)

Want to try it for yourself? Here are a few examples.

```powershell
# AAD Integrated Auth
Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -Database dbatools

# AAD Username and Pass
Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -SqlCredential username@acme.onmicrosoft.com -Database dbatools

# Managed Identity in Azure VM w/ older versions of .NET
Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -Database abc -SqlCredential appid -Tenant tenantguidorname

# Managed Identity in Azure VM w/ newer versions of .NET (way faster!)
Connect-DbaInstance -SqlInstance psdbatools.database.windows.net -Database abc -AuthenticationType 'AD Universal with MFA Support'
```

You can also find a couple more within the MFA [Pull Request on GitHub](https://github.com/dataplat/dbatools/pull/5593) and by using `Get-Help Connect-DbaInstance -Examples`.

## Registered Servers

This is probably my favorite! We now support Local Server Groups and Azure Data Studio groups. Supporting Local Server Groups means that it's now a whole lot easier to manage servers that don't use Windows Authentication.

Here's how you can add a local docker instance.

```powershell
# First add it with your credentials
Connect-DbaInstance -SqlInstance 'dockersql1,14333' -SqlCredential sqladmin | Add-DbaRegServer -Name mydocker

# Then just use it for all of your other commands.
Get-DbaRegisteredServer -Name mydocker | Get-DbaDatabase
```

Totally dreamy 😋

## CSV

Import-DbaCsv is now far more reliable. While the previous implementation was faster, it didn't work a lot of the time. The new command should suit your needs well.

```powershell
Get-ChildItem C:\allmycsvs | Import-DbaCsv -SqlInstance sql2017 -Database tempdb -AutoCreateTable
```

## Future & Backwards Compatible

In the past couple months, we've started focusing a bit more on Azure: both Azure SQL Database and Managed Instances. In particular, we now support migrations to Azure Managed Instances! We've also added a couple more commands to PowerShell Core., in particular, the [Masking](https://dbatools.io/commands/#masking) and [Data Generation](https://dbatools.io/commands/#Database) commands. Over 75% of our commands run on mac OS and Linux!

Still, we support PowerShell 3 and Windows 7 and SQL Server 2000 when we can. Our final testing routines included ensuring support for:

- Windows 7
- SQL Server 2000-2019
- User imports vs Developer imports
- mac OS / Linux
- x86 and x64
- Strict (`AllSigned`) Execution Policy

## New Commands

We've also added a bunch of new commands, mostly revolving around Roles, PII, Masking, Data Generation and even [ADS notebooks](https://dbatools.io/New-DbaDiagnosticAdsNotebook)!

Want to see the full list? Check out our freshly updated [Command Index page](https://dbatools.io/commands) 🙏.

## Configuration Enhancements

A few configuration enhancements have been made and a blog post for our configuration system is long overdue. But one of the most useful, I think, is that you can now control the client name. This is the name that shows up in logs, in Profiler and in Xevents.

```powershell
# Set it
Set-dbatoolsConfig -FullName sql.connection.clientname -Value "my custom module built on top of dbatools" -Register

# Double check it
Get-dbatoolsConfig -FullName sql.connection.clientname | Select Value, Description
```

The `-Register` parameter is basically a shortcut for piping to `Register-dbatoolsConfig`. This writes the value to the registry, otherwise, it'll be effective only for your current session.

Another configuration enhancement helps with standardization. Now, all export commands will default to **Documents\dbatoolsExport**. You can change it by issuing the following commands.

```powershell
# Set it
Set-dbatoolsConfig -FullName path.dbatoolsexport -Value "C:\temp\exports" -Register

# Double check it
Get-dbatoolsConfig -FullName path.dbatoolsexport | Select Value, Description
```

## Help Is Separated

Something new that I like because it's "proper" PowerShell: we're now publishing our module with Help separated into its own file. We're using a super cool module called [HelpOut](https://www.powershellgallery.com/packages/HelpOut). HelpOut was created for dbatools by a former member of the PowerShell team, [James Brundage](http://startautomating.com/).

HelpOut allows our developers to keep writing Help within the functions themselves, then separates the Help into dbatools-help.xml and the commands into allcommands.ps1, which helps with [faster loading](https://dbatools.io/import-times/). Here's how we do it:

```powershell
Install-Maml -FunctionRoot functions, internal\functions -Module dbatools -Compact -NoVersion
```

It's as simple as that! This does all of the heavy lifting: making the maml file and placing it in the proper location, and parsing the functions for allcommands.ps1!

Help will continue to be published to [docs.dbatools.io](https://docs.dbatools.io) and updated with each release. You can read more about HelpOut [on GitHub](https://github.com/StartAutomating/HelpOut).

# Breaking Changes

We've got a number of breaking changes included in 1.0.

Before diving into this section, I want to emphasize that we have a command to handle a large majority of the renames! **Invoke-DbatoolsRenameHelper** will parse your scripts and replace script names and some parameters for you.

![Rename Helper GIF](/images/renamehelper.gif)

## Command Renames

Renames in the past 30 days were mostly changing `Instance` to `Server`. But we also made some command names more accurate:

Test-DbaDbVirtualLogFile -> Measure-DbaDbVirtualLogFile
Uninstall-DbaWatchUpdate -> Uninstall-dbatoolsWatchUpdate
Watch-DbaUpdate -> Watch-dbatoolsUpdate

## Command Removal

Export-DbaAvailabilityGroup has been removed entirely. The same functionality can now be found using `Get-DbaAvailabiltyGroup | Export-DbaScript`.

## Alias Removals

All but 5 command aliases have been removed. Here are the ones that are still around:

Get-DbaRegisteredServer -> Get-DbaRegServer
Attach-DbaDatabase -> Mount-DbaDatabsae
Detach-DbaDatabase - Dismount-DbaDatabase
Start-SqlMigration -> Start-DbaMigration
Write-DbaDataTable -> Write-DbaDbTableData

I kept `Start-SqlMigration` because that's where it all started, and the rest are easier to remember.

Also, all `ServerInstance` and `SqlServer` aliases have been removed. You must now use `SqlInstance`. For a full list of what Invoke-dbatoolsRenameHelper renames/replaces, [check out the source code](https://github.com/dataplat/dbatools/blob/prerelease/functions/Invoke-dbatoolsRenameHelper.ps1#L69).

## Parameter Standardization

Most of the commands now follow the following practices we've observed in Microsoft's PowerShell modules.

- Piped input is `-InputObject` and not DatabaseCollection or LoginCollection, etc.
- Directory (and some file) paths are now `-Path` and not BackupLocation or FileLocation
- When a distinction is required, file paths are now `-FilePath`, and not RemoteFile or BackupFileName
- If both file and directory path needs to be distinguished, Path is used for directory and FilePath for file locations

## Parameter Removal

`-SyncOnly` is no longer an option in [Copy-DbaLogin](https://dbatools.io/Copy-DbaLogin). Please use [Sync-DbaLoginPermission](https://dbatools.io/Sync-DbaLoginPermission) instead.

`-CheckForSql` is no longer an option in [Get-DbaDiskSpace](https://dbatools.io/Get-DbaDiskSpace). Perhaps the functionality can be made into a new command which can be piped into Get-DbaDiskSpace but the implementation we had was 👎.

For a full list of breaking changes, you can browse our gorgeous [changelog](https://dbatools.io/changelog), maintained by [Andy Levy](https://flxsql.com/).

## Book Party!

In case you did not hear the news, [Rob Sewell](https://sqldbawithabeard.com/) and I, are currently in the process of writing **dbatools in a Months of Lunches**! We've really excited and hope to have a [MEAP (Manning Early Access Program)](https://www.manning.com/meap-program) available sometime in July. We will keep everyone updated here and on our blogs.

![Book Editor GIF](/images/book2.gif)

The above is what the editor looks like - a lot like markdown!

If you'd like to see what the writing process is like, I did a [livestream a couple of months back](https://www.youtube.com/watch?v=EeXHlAPa_Mo) while writing Chapter 6, which is about [Find-DbaInstance](https://dbatools.io/Find-DbaInstance). Sorry about the music being a bit loud, that has been fixed in future streams which can be found at [youtube.com/dbatools](https://youtube.com/dbatools).

## Sponsorship

Since Microsoft acquired GitHub, they've been rolling out some really incredible features. One such feature is Developer Sponsorships, which allows you to sponsor developers with cash subscriptions. It's sorta like Patreon where you can pay monthly sponsorships with different tiers. If you or your company has benefitted from dbatools, consider [sponsoring](https://github.com/dataplat/dbatools?sponsor=1) one or more of our developers.

![Sponsor GIF](https://github.com/dataplat/dbatools?sponsor=1)

Currently, GitHub has approved four of our team members to be sponsored including [me](https://github.com/users/potatoqualitee/sponsorship), [Shawn Melton](https://github.com/users/wsmelton/sponsorship), [Stuart Moore](https://github.com/users/Stuart-Moore/sponsorship) and [Sander Stad](https://github.com/users/sanderstad/sponsorship).

![GitHub Sponsors GIF](https://github.com/dataplat/dbatools?sponsor=1)

We've invited other dbatools developers to sign up as well 🙏

Oh, and for the first year, **[GitHub will match sponsorship funds](https://help.github.com/en/articles/about-github-sponsors#about-the-github-sponsors-matching-fund)**! So giving to us now is like giving double.

## Big Ol' Thanks

I'd like to give an extra special thanks to the contributors who helped get dbatools across the finish line these past couple months: Simone Bizzotto, Joshua Corrick, Patrick Flynn, Sander Stad, Cláudio Silva, Shawn Melton, Garry Bargsley, Andy Levy, George Palacios, Friedrich Weinmann, Jess Pomfret, Gareth N, Ben Miller, Shawn Tunney, Stuart Moore, Mike Petrak, Bob Pusateri, Brian Scholer, John G "Shoe" Hohengarten, Kirill Kravtsov, James Brundage, Hüseyin Demir, Gianluca Sartori and Rob Sewell.

Without you all, 1.0 would be delayed for another 5 years.

## Blog Party!

Want to know more about dbatools? Check out some of these posts ☺

[dbatools 1.0 - the tools to break down the barriers - Shane O'Neill](https://nocolumnname.blog/?p=9452)

[dbatools 1.0 is here and why you should care - Ben Miller](https://dbaduck.com/2019/06/18/dbatools-1-0-is-here-and-why-you-should-care/)

[dbatools 1.0 and beyond - Joshua Corrick](https://corrick.io/blog/dbatools-to-v1-0-and-beyond)

[dbatools 1.0 - Dusty R](https://nakedpowershell.blogspot.com/2019/06/dbatools-10.html)

[Your DBA Toolbox Just Got a Refresh - dbatools v1.0 is Officially Available!!! - Garry Bargsley](https://garrybargsley.com/2019/06/20/your-dba-toolbox-just-got-a-refresh-dbatools-v1-0-is-officially-available/)

[dbatools v1.0? It's available - Check it out!](https://claudioessilva.eu/2019/06/19/dbatools-v1-0-its-available-check-it-out)

[updating sql server instances using dbatools 1.0 - Gareth N](https://ifexists.blog/updating-sql-server-instances-using-powershell/)

## Livestreaming

We're premiering dbatools 1.0 at [DataGrillen](https://datagrillen.com) in Lingen, Germany today and will be livestreaming on [Twitch](https://twitch.tv/potatoqualitee).

Thank you, everyone, for your support along the way. We all hope you enjoy dbatools 1.0

💌,
Chrissy
