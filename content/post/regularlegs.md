---
title: "new release with significant but non-breaking changes"
date: 2018-09-07
author: "Chrissy LeMaire"
slug: "regularlegs"
aliases:
  - /regularlegs/
  - /regularlegs/index.html
categories: [announcements]
tags: []
draft: false
---

Marching onward to dbatools 1.0, a ton of commands have been renamed to align with our now mature naming scheme. These changes were made in today's release, version 0.9.410 aka [regularlegs](https://dbatools.io/releases), now available on GitHub and the [PowerShell Gallery](https://dbatools.io/gallery).

Here's the general idea:

- DbaDatabase has mostly been renamed to DbaDb with a couple exceptions
- DbaSql has been changed to just Dba, no exceptions. Considering Microsoft reserved the Sql prefix and we can't use it, think of Dba as "Sql".
- DbaConfig  has been renamed to dbatoolsConfig
- TempDbConfiguration has been renamed to TempdbConfig
- All Configuration commands are Config except SpConfigure
- DbaDacpac has been renamed to DbaDacPackage. Dac is the prefix for our data-tier application commands.
- DbaDbQueryStoreOptions has been renamed to DbaDbQueryStoreOption

If you use the old name, it'll still work but will show a warning that the command name has been changed and its alias will be removed in 1.0. Oh, also, `Get-DbaTrigger` has been removed and `Get-DbaInstanceTrigger` and `Get-DbaDbTrigger` have been added in its place. Unfortunately, there was no appropriate alias, so it was removed without an alias.

## renaming

If you'd like help renaming dbatools scripts within your command, use the newly created function **Invoke-dbatoolsRenameHelper**, available in [regularlegs](https://dbatools.io/releases). The screenshot below shows is what it looked like when I ran the this:

```ps
Get-ChildItem -Recurse C:\temp\community-presentations\*.ps1 | Invoke-dbatoolsRenameHelper | Out-GridView
```

![image](https://user-images.githubusercontent.com/8278033/45200604-ed795300-b271-11e8-8d17-73b8fafbe902.png?w=800&ssl=1)

Thanks, PowerShell! 😊

## other updates

There are other cool updates with this release. In preparation for my [doomsday prepping with dbatools](https://sqlgla.co.uk/schedule/) presentation at SQLGLA, I created a new command, Export-DbaInstance, which I'll write more about in a future post.

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

## new website documentation coming soon

We'll soon be moving our documentation to a system that automatically generates docs from markdown! Expect to see that by next week. It'll be a great relief once released because keeping the website manually updated with all these changes is a near impossible task.

The [command index](https://dbatools.io/commands) will remain and be updated manually since it requires some categorization. That page also needs updating; I should have that done by Monday.

## dbachecks

Recall that using old command names will show big ol yellow warnings and [dbachecks](https://dbachecks.io) uses a number of the renamed commands. So, dbachecks will be updated today, too, a couple hours after this email is sent out ✓

\- Chrissy
