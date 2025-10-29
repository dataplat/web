---
title: "New Release with Significant but Non-Breaking Changes"
date: 2018-09-07
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "regularlegs"
aliases:
  - /regularlegs/
  - /regularlegs/index.html
categories: [announcements]
tags: []
draft: false
---

Marching onward to dbatools 1.0, a ton of commands have been renamed to align with our now mature naming scheme. These changes were made in today's release, version 0.9.410 aka [regularlegs](https://github.com/dataplat/dbatools/releases), now available on GitHub and the [PowerShell Gallery](https://www.powershellgallery.com/packages/dbatools/).

Here's the general idea:

- DbaDatabase has mostly been renamed to DbaDb with a couple exceptions
- DbaSql has been changed to just Dba, no exceptions. Considering Microsoft reserved the Sql prefix and we can't use it, think of Dba as "Sql".
- DbaConfig  has been renamed to dbatoolsConfig
- TempDbConfiguration has been renamed to TempdbConfig
- All Configuration commands are Config except SpConfigure
- DbaDacpac has been renamed to DbaDacPackage. Dac is the prefix for our data-tier application commands.
- DbaDbQueryStoreOptions has been renamed to DbaDbQueryStoreOption

If you use the old name, it'll still work but will show a warning that the command name has been changed and its alias will be removed in 1.0. Oh, also, `Get-DbaTrigger` has been removed and `Get-DbaInstanceTrigger` and `Get-DbaDbTrigger` have been added in its place. Unfortunately, there was no appropriate alias, so it was removed without an alias.

## Renaming

If you'd like help renaming dbatools scripts within your command, use the newly created function **Invoke-dbatoolsRenameHelper**, available in [regularlegs](https://github.com/dataplat/dbatools/releases). The screenshot below shows is what it looked like when I ran the this:

```ps
Get-ChildItem -Recurse C:\temp\community-presentations\*.ps1 | Invoke-dbatoolsRenameHelper | Out-GridView
```

![Invoke-DbatoolsRenameHelper output showing renamed commands](/images/regularlegs-rename-helper.png)

Thanks, PowerShell! 😊

## Other Updates

There are other cool updates with this release. In preparation for my doomsday prepping with dbatools presentation at SQLGLA, I created a new command, Export-DbaInstance, which I'll write more about in a future post.

In order for Export-DbaInstance to work well, I had to create a number of underlying commands, some of which may be of interest to you.

- Get-DbaDbMail
- Get-DbaDbMailAccount
- Get-DbaDbMailProfile
- Get-DbaDbMailConfig
- Get-DbaDbMailServer
- Export-DbaCredential
- Export-DbaLinkedServer
- Get-DbaResourceGovernor
- Get-DbaRgResourcePool
- Get-DbaRgWorkloadGroup
- Get-DbaRgClassifierFunction
- Get-DbaPbmCategory
- Get-DbaPbmCategorySubscription
- Get-DbaPbmCondition
- Get-DbaPbmObjectSet
- Get-DbaPbmPolicy
- Get-DbaPbmStore

## New Website Documentation Coming Soon

We'll soon be moving our documentation to a system that automatically generates docs from markdown! Expect to see that by next week. It'll be a great relief once released because keeping the website manually updated with all these changes is a near impossible task.

The [command index](https://dbatools.io/commands) will remain and be updated manually since it requires some categorization. That page also needs updating; I should have that done by Monday.

## dbachecks

Recall that using old command names will show big ol yellow warnings and [dbachecks](https://dbachecks.io) uses a number of the renamed commands. So, dbachecks will be updated today, too, a couple hours after this email is sent out ✓

\- Chrissy
