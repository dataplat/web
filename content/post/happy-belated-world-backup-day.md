---
title: "happy belated world backup day"
date: 2018-04-02
slug: "happy-belated-world-backup-day"
aliases:
  - /happy-belated-world-backup-day/
  - /happy-belated-world-backup-day/index.html
categories: [announcements]
tags: [party]
draft: false
---

Happy Belated World Backup Day! I wish it was Backup and Restore Day, Test Your Backups Day, or World Recoverability Day, but alas.

I'm currently working on my portion of the effort to get dbatools to 1.0 – integration tests for our commands. And while I wait for [AppVeyor](https://appveyor.com) to [run all of our tests](https://dbatools.io/ci), I've got a few minutes to post.

Initially, I wanted to highlight our Backup/Restore commands but there are sooo many, it'd take a few days to write about them. So today, I'm going to focus on `Export-DbaScript` or I'll never get this out the door 😊.

## Export-DbaScript

Export-DbaScript exports SMO or "[SQL Management Objects](https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.management.smo.server(v=sql.105).aspx)". SMO is what powers SQL Server Management Studio and many of the commands in dbatools.

You know how SQL Server 2000's underlying system tables vary drastically from SQL Server 2017? With SMO, we don't have to care. *$server.Databases* is *$server.Databases* no matter which version we're working with.

SMO exports do have some limitations. For instance, it doesn't include the roles and hashed passwords from logins (use `Export-DbaLogin` for that). For the most part, though, it's awesome! This is how easy it is to export all of the jobs on all of your servers across your estate:

`$servers | Get-DbaAgentJob | Export-DbaScript`

**$servers** is a variable with the servers sql2008\sql2k8, sql2012, sql2014, sql2016 and sql2017. You can specify a path but if you don't, then we automatically generate the file name and output to the current directory.

![](https://dbatools.io/wp-content/uploads/2018/04/img_5ac139c486241.png?w=800&ssl=1)

Want to see the output? Here are the contents of [sql2017-Job-Export-04012018215831.sql](https://gist.github.com/potatoqualitee/e509e9f541eb406db7edd6e16a358026).

## What else?

Basically, whatever you can script out in SSMS, you can script out using Export-DbaScript.

![](https://dbatools.io/wp-content/uploads/2018/04/img_5ac1442b4877e.png?w=800&ssl=1)

You can also add extra options using `New-DbaScriptingOption`, which is a wrapper for [Microsoft.SqlServer.Management.Smo.ScriptingOptions](https://msdn.microsoft.com/en-us/library/microsoft.sqlserver.management.smo.scriptingoptions.aspx).

<!-- GitHub Gist code block embedded: https://gist.github.com/potatoqualitee/4f5b9a8b1a6750e1ed41e2423d93cdfb.js -->

If you'd like to script out each object to its own file, you can do the following:

<!-- GitHub Gist code block embedded: https://gist.github.com/potatoqualitee/c55ae01f4009ef5d5fdc1175f024f6e0.js -->

## Other commands to ease your recovery process

Here are nearly 80 commands that we created to ease recovery or migration.

- Backup-DbaDatabase
- Backup-DbaDbMasterKey
- Backup-DbaDbCertificate
- Copy-DbaAgentAlert
- Copy-DbaAgentJobCategory
- Copy-DbaAgentJob
- Copy-DbaAgentOperator
- Copy-DbaAgentProxy
- Copy-DbaAgentSchedule
- Copy-DbaBackupDevice
- Copy-DbaRegServer
- Copy-DbaCredential
- Copy-DbaCustomError
- Copy-DbaDatabase
- Copy-DbaDbAssembly
- Copy-DbaDbMail
- Copy-DbaEndpoint
- Copy-DbaXESession
- Copy-DbaLinkedServer
- Copy-DbaLogin
- Copy-DbaDbQueryStoreOption
- Copy-DbaResourceGovernor
- Copy-DbaInstanceAudit
- Copy-DbaInstanceAuditSpecification
- Copy-DbaInstanceTrigger
- Copy-DbaSpConfigure
- Copy-DbaDataCollector
- Copy-DbaPolicyManagement
- Copy-DbaAgentServer
- Copy-DbaSsisCatalog
- Copy-DbaSysDbUserObject
- Copy-DbaDbTableData
- Copy-DbaXESessionTemplate
- Export-DbaAvailabilityGroup
- Export-DbaDacPackage
- Export-DbaDiagnosticQuery
- Export-DbaExecutionPlan
- Export-DbaLogin
- Export-DbaUser
- Export-DbaXECsv
- Export-DbaXESessionTemplate
- Find-DbaBackup
- Format-DbaBackupInformation
- Get-DbaBackupDevice
- Get-DbaDbBackupHistory
- Get-DbaBackupInformation
- Get-DbaDbSnapshot
- Get-DbaLastBackup
- Get-DbaDbLogShipError
- Get-DbaDbRestoreHistory
- Import-DbaCsv
- Import-DbaPfDataCollectorSetTemplate
- Import-DbaSpConfigure
- Import-DbaXESessionTemplate
- Invoke-DbaAdvancedRestore
- Invoke-DbaDbLogShipping
- Invoke-DbaDbLogShipRecovery
- Measure-DbaBackupThroughput
- New-DbaDbSnapshot
- New-DbaLogShippingPrimaryDatabase
- New-DbaLogShippingPrimarySecondary
- New-DbaLogShippingSecondaryDatabase
- New-DbaLogShippingSecondaryPrimary
- Publish-DbaDacPackage
- Read-DbaBackupHeader
- Remove-DbaBackup
- Remove-DbaDbSnapshot
- Restore-DbaBackupFromDirectory
- Restore-DbaDatabase
- Restore-DbaDbCertificate
- Restore-DbaFromDatabaseSnapshot
- Select-DbaBackupInformation
- Start-DbaMigration
- Test-DbaBackupInformation
- Test-DbaLastBackup
- Test-DbaDbLogShipStatus

## We ❤️ tests

I've mentioned it before, but there are few things that are more reassuring than knowing that our commands will restore your data properly. In the post [a migration with every commit](https://dbatools.io/testing/), you can see that we run a ton of tests with each and every commit to [our GitHub repo](https://dbatools.io/git).

When tests pass, we can automatically merge to our master branch and the PowerShell Gallery (known as CI/CD or Continuous Integration/Continuous Delivery).

So check out this awesome video of [all of the tests](https://github.com/dataplat/dbatools/blob/master/tests/Restore-DbaDatabase.Tests.ps1) we run just for Restore-DbaDatabase.

{{< youtube 5nN7Po0-o-s >}}

Most of our commands run far fewer tests, but few commands are as important as our backup and restore commands. Thanks to [Stuart Moore](https://stuart-moore.com/) for making Restore-DbaDatabase so robust!

-Chrissy
