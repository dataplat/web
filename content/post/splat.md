---
title: "PowerShell Splatting"
date: 2019-01-03
author: "Chrissy LeMaire"
slug: "splat"
aliases:
  - /splat/
  - /splat/index.html
categories: [announcements]
tags: []
draft: false
---

[Splatting](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_splatting) in PowerShell makes code easier to read. Instead of typing a bunch of parameters allllll across the screen, you can use an easy-to-read hashtable or array. Argument splatting was introduced in PowerShell v3 and works with all PowerShell commands, not just dbatools.

Note: I've only used splatting with hashtables, as they allow me to be explicit about which parameters I'm passing. It appears that arrays would employ [positional parameters](https://powershellstation.com/2017/10/04/specifying-powershell-parameter-position/), which is less wordy but leaves room for error.

## Example 1

In the example below, sql2008 will be migrated to sql2017 using the backup restore method.

```ps
# Ultimately, this (which scrolls offscreen):
Start-DbaMigration -Source sql2008 -Destination sql2017 -BackupRestore -SharedPath \\nas\sql\migration -Force | Select * | Out-GridView

# becomes this:
$splat = @{
    Source = "sql2008"
    Destination = "sql2017"
    BackupRestore = $true
    SharedPath = "\\nas\sql\migration"
    Exclude = "AgentServer","Audits","BackupDevices"
}

Start-DbaMigration @splat -Force | Select * | Out-GridView
```

Note that the **dollar sign** in the variable name `$splat` becomes an **at sign**, `@splat` when executing the command. Also, not every parameter has to belong to the splat. As you can see, `-Force` is specified separately.

Also, the use of quotes is slightly different. While quotes are sometimes optional (string variables without special characters) when executing a command the traditional way, quotes around string values are required in a hashtable.

## Example 2

The first example was a short intro and the next ones are a bit longer. Imagine the following splat used with one of our larger commands, [Invoke-DbaDbLogShipping](https://dbatools.io/Invoke-DbaDbLogShipping).

```ps
$params = @{
    Source = "localhost\sql2016"
    Destination = "localhost\sql2017"
    Database = "shipped"
    BackupNetworkPath= "\\localhost\backups"
    PrimaryMonitorServer = "localhost\sql2017"
    SecondaryMonitorServer = "localhost\sql2017"
    BackupScheduleFrequencyType = "Daily"
    BackupScheduleFrequencyInterval = 1
    CompressBackup = $true
    CopyScheduleFrequencyType = "Daily"
    CopyScheduleFrequencyInterval = 1
    GenerateFullBackup = $true
    Force = $true
}

Invoke-DbaDbLogShipping @params
```

You can see above that switches such as `-Force` or `-CompressBackup` when used in a splat will use the following syntax `Force = $true`.

## Example 3

Here's another example we use in our [Extended Events presentation](https://dbatools.io/xevents).

```ps
$params = @{
    SmtpServer = "localhost"
    To = "sqldba@ad.local"
    Sender = "reports@ad.local"
    Subject = "Deadlock Captured"
    Body = "Caught a deadlock"
    Event = "xml_deadlock_report"
    Attachment = "xml_report"
    AttachmentFileName = "report.xdl"
}

$emailresponse = New-DbaXESmartEmail @params
Start-DbaXESmartTarget -SqlInstance sever01\sql2017 -Session "Deadlock Graphs" -Responder $emailresponse
```

## Example 4

And finally, an example that will be included in the High Availability blog post when it finally comes out.

```ps
$cred = Get-Credential sqladmin
$params = @{
    Primary = "sql1"
    PrimarySqlCredential = $cred
    Secondary = "sql2", "sql3"
    SecondarySqlCredential = $cred
    Name = "test-ag"
    Database = "pubs"
    ClusterType = "None"
    SeedingMode = "Automatic"
    FailoverMode = "Manual"
    Confirm = $false
}
New-DbaAvailabilityGroup @params
```

## VS Code

In his blog post [Easily Splatting PowerShell with VS Code](https://sqldbawithabeard.com/2018/03/11/easily-splatting-powershell-with-vs-code/), Rob Sewell shows how VS Code can easily create splats, as explained in his instructions and video below. First, run:

```ps
Import-Module -Name EditorServicesCommandSuite
Import-EditorCommand -Module EditorServicesCommandSuite
```

then:

> Write the command, leave the cursor on a parameter, hit F1 – Choose PowerShell : Show Additional Commands (or use a keyboard shortcut) type splat press enter. Done 😊

Rob also tweeted to "be careful where your cursor is. I usually put it in the command. Sometimes it goes screwy if the cursor is at the EoL."

## Have Fun

If you use commands with a number of parameters or even want to reuse parameter sets, splatting is an ideal solution.

\- Chrissy
