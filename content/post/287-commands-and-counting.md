---
title: "287 Commands and Counting"
date: 2017-09-13
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "287-commands-and-counting"
aliases:
  - /287-commands-and-counting/
  - /287-commands-and-counting/index.html
categories: [announcements]
tags: []
draft: false
---

Last month, I went through an audit that consumed every waking moment of my life. I would literally wake up, get ready for work, grab the three meals my wife made for me, go to work for 16-18 hours, come back, sleep then wake up, rinse, repeat. I tried to stay as healthy as possible by prioritizing sleep, taking vitamins, eating vegetarian meals that were easy to digest and drinking tea (and not energy drinks) as an energy source.

After passing my audit (😄👍) and taking a long nap, I started a new project for [crowd-sourcing the DISA Documentation Template for SQL Server](https://github.com/dataplat/disa-docs). People often ask [DISA](https://www.disa.mil/) for templates but they don't have anything to provide so I'd like to change that, if only for my future self.

If you work for an organization that is subject to DISA inspections and believe you have some good anonymized documentation to contribute, please do! The templates are in markdown.

### Progress [============·······]

Really, I said all that so that you'd hopefully excuse the recent lack of communication 😊 Not only did I have the big ol' audit, but we are also preparing for two dbatools pre-cons. One with [Klaas Vandenberghe](https://www.powerdba.eu/) and [Rob Sewell](https://blog.robsewell.com) in [Ghent, Belgium at dataminds](https://sqlps.io/preconbe) and then the one in [Seattle at PASS Summit](https://sqlps.io/precon).

This means that communication will slow a bit until December, but I wanted to give you an update. First, we're now at a whopping 287 magical commands! We've got three kind folks working on the webpages and once they are all ready, I'll do a new release. Until then, here's over 80 newish commands that you can explore using **Get-Help -Detailed**.

| | | |
|---|---|---|
| Add-DbaComputerCertificate | Get-DbaDbMailLog | Invoke-DbaDbLogShipRecovery |
| Backup-DbaDbMasterKey | Get-DbaDbQueryStoreOption | New-DbaAgentSchedule |
| Copy-DbaAgentAlert | Get-DbaDbStoredProcedure | New-DbaComputerCertificate |
| Copy-DbaInstanceAuditSpecification | Get-DbaDefaultPath | New-DbaCredential |
| Disable-DbaAgHadr | Get-DbaDependency | New-DbaServiceMasterKey |
| Disable-DbaForceNetworkEncryption | Get-DbaFile | New-DbaConnectionString |
| Enable-DbaAgHadr | Get-DbaForceNetworkEncryption | New-DbaConnectionStringBuilder |
| Enable-DbaForceNetworkEncryption | Get-DbaMaintenanceSolutionLog | Read-DbaTraceFile |
| Find-DbaSimilarTable | Get-DbaNetworkCertificate | Remove-DbaAgentSchedule |
| Find-DbaTrigger | Get-DbaOperatingSystem | Remove-DbaCmConnection |
| Find-DbaView | Get-DbaPbmPolicy | Remove-DbaComputerCertificate |
| Get-DbaAgDatabase | Get-DbaRegisteredServersStore | Remove-DbaDbCertificate |
| Get-DbaAgentJobHistory | Get-DbaInstanceInstallDate | Remove-DbaDbMasterKey |
| Get-DbaAgentLog | Get-DbaInstanceProperty | Remove-DbaDatabaseSafely |
| Get-DbaAgentSchedule | Get-DbaInstanceUserOption | Remove-DbaNetworkCertificate |
| Get-DbaAgHadr | Get-DbaSqlLog | Remove-DbaDbOrphanUser |
| Get-DbaAgReplica | Get-DbaManagementObject | Restart-DbaService |
| Get-DbaAvailableCollation | Get-DbaRegistryRoot | Restore-DbaDbCertificate |
| Get-DbaCmConnection | Get-DbaSsisEnvironmentVariable | Save-DbaDiagnosticQueryScript |
| Get-DbaComputerCertificate | Get-dbatoolsLog | Set-DbaAgentJobStep |
| Get-DbaComputerSystem | Get-DbaTraceFlag | Set-DbaAgentSchedule |
| Get-DbaDbPartitionFunction | Get-DbaWindowsLog | Set-DbaDbCompression |
| Get-DbaDbPartitionScheme | Import-DbaCsv | Set-DbaDbQueryStoreOption |
| Get-DbaDbSpace | Install-DbaFirstResponderKit | Set-DbaNetworkCertificate |
| Get-DbaDbUdf | Install-DbaMaintenanceSolution | Start-DbaService |
| Get-DbaDbUser | Invoke-DbaCycleErrorLog | Stop-DbaService |
| Get-DbaDbView | Invoke-DbaDbUpgrade | Test-DbaDbCompression |
| Get-DbaDbMailHistory | Invoke-DbaDbLogShipping | Test-DbaManagementObject |

So many of these commands are insanely useful and I can't thank our 78 (!!) contributors enough. Also, [Shawn Melton](https://www.pythian.com/blog/author/melton/), [Andy Levy](https://flxsql.com/) and [Simone Bizzotto](https://www.linkedin.com/in/simonebizzotto/) have recently invested extra insane-o hours into moving the project forward and I'd like to give them a special shout out.

Thank you so very very much for helping the 1.0 progress during this sprint!

### The Long, Long Road to 1.0 😂

I can't decide if this is because I can be a perfectionist or because it legitimately takes a super long time to put out an Enterprise grade release, but you may have noticed 1.0 didn't quite debut in June. Or July. Or August or even September. Now I know why gmail took so long to get out of beta.

The original goals for 1.0 were:

- Standardized names
- Standardized parameters
- Standardized documentation
- Standardized codebase
- Pipe support
- Tests

Andy is helping like mad with standardizing the docs, and Shawn is doing a fabulous job leading a team to update the code base to the 1.0 standard - 231 out of 287 commands complete! Pipe support is still lacking and may just becoming a focus for 1.1 instead of 1.0.

That leaves us with tests, which Simone has been acing. He fixed our Appveyor setup and really pushed for us to create non-destructive tests, which I appreciate. Before, I was building tests as though the Appveyor environment was the ONLY environment the tests would be run on so it'd drop everything and start fresh.

Nevertheless, I'd love to see all of our commands get the 1.0 rewrite prior to 1.0 and then at least one Pester Test for each command. So that's the final goal, whenever that'll be, likely in December/January (maybe;))

### In the Meantime

In the meantime, we're actually releasing quite often nowadays – sometimes up to 3 times a day! That's because I feel a lot more confident when I see all the green generated by our [integration tests](https://dbatools.io/testing).

If you'd like to keep up with the latest releases and use Windows 10, consider Watch-DbaUpdate. Note that Install-DbatoolsWatchUpdate does require running as admin in order to automatically setup the scheduled task.

![watch1](/images/watch1.png)

### TTYS

Once the webpages for these commands have been written, I'll do the formal, beautiful release of **[picklerick](https://rickandmorty.fandom.com/wiki/Pickle_Rick_(episode))**.

\- Chrissy
