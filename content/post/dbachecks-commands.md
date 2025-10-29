---
title: "dbachecks Commands"
date: 2018-02-22
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "dbachecks-commands"
aliases:
  - /dbachecks-commands/
  - /dbachecks-commands/index.html
categories: [announcements]
tags: [dbachecks, party]
draft: false
---

[dbachecks](https://dbachecks.io) is a new PowerShell module from the SQL Server Community! For more information, read [introducing dbachecks](https://dbatools.io/introducing-dbachecks/).

As of version v1.0, dbachecks contains 15 commands. This article provides an overview of these commands. Rob Sewell offers a [fantastic deep-dive article](https://dbachecks.io/deepdive) that explains the commands below in greater depth.

## Usage

Usage can be approached in two ways:

### Run Directly From the Command Line

As simple as `Invoke-DbcCheck -SqlInstance sqlprod01 -Checks SuspectPage, LastBackup`

### Schedule Checks

Command line execution is good in a pinch, but ongoing checks are the ultimate goal. In order to do this, you can do the following:

- Set your desired configuration
Configs can be set for specific environments like Production, Test or Development or for an application, like SharePoint or a custom-built app

- Export your configuration
Export your environment or application configuration so that it can be easily imported by your scheduled task

- Schedule checks using Task Scheduler or [SQL Server Agent](https://dbatools.io/agent)
I personally prefer SQL Server Agent

- Get notified via email or load up in Power BI
Since the output of Invoke-DbcCheck is a PowerShell object, you can extend responses and notifications any way you wish. We provide two built-in ways.

Whichever approach you use, the commands below will help you easily accomplish validation of your environment.

## Primary Commands

#### Invoke-DbcCheck

All checks are performed using `Invoke-DbcCheck`. This command is basically a wrapper for [Invoke-Pester](https://github.com/pester/Pester/wiki/Invoke-Pester). This means that supported `Invoke-Pester` parameters work against Invoke-DbcCheck, plus a few bonus parameters.

In this module, a "Check" is synonymous with a "Tag" in Pester. So you can **Invoke-DbcCheck** and specify a Check that you want to run. You can see a list of the available Checks with **Get-DbcCheck**.

We also made it convenient to run groups of checks. So **LastBackup** will run LastFullBackup, LastDiffBackup and LastLogBackup.

#### Get-DbcCheck

This command lists all checks, check groups along with their required server type, either SqlInstance or ComputerName.

{{< powershell-console >}}
PS C:\github\dbatools> Get-DbcCheck

Type                Description                                              AllTags
----                -----------                                              -------
SqlInstance         Ad Agent Account                                         Agent,agent-account
SqlInstance         Ad Agent Account                                         Agent,agent-account
SqlInstance         Backup Compression Check                                 Backup,BackupCompression
SqlInstance         Backup Destination                                       Backup,BackupDestination
SqlInstance         Backup Encryption                                        Backup,BackupEncryption
SqlInstance         Backup Network                                           Backup,BackupNetwork
SqlInstance         Backup Redundancy                                        Backup,BackupRedundancy
SqlInstance         Backup Test                                              Backup,BackupTest
SqlInstance         Backup Times                                             Backup,BackupTimes
SqlInstance         Certificate Expiration                                   CertificateExpiration
SqlInstance         Cluster Node Paused                                      ClusterNodePaused
SqlInstance         Command Log Volume                                       CommandLogVolume
SqlInstance         Database Growth Event                                    DatabaseGrowthEvent
SqlInstance         Dump Files                                               DumpFiles
SqlInstance         Error Log Count                                          ErrorLogCount
SqlInstance         Error Log Size Check                                     ErrorLogSizeCheck
SqlInstance         File Growth Type Check                                   FileGrowthTypeCheck
SqlInstance         Last Backup Times                                        LastBackup,LastFullBackup,LastDiffBackup,LastLogBackup
SqlInstance         Log Shipping Disabled                                    LogShippingDisabled
SqlInstance         Orphaned User                                            OrphanedUser
SqlInstance         Recovery Model                                           RecoveryModel
SqlInstance         Replication Latency                                      ReplicationLatency
SqlInstance         SQL Server Database Mail                                 DatabaseMail
SqlInstance         SSL/TLS Certificate Expiration                           SSLCertificateExpiration
SqlInstance         Suspended Service Broker Queue                           SuspendedServiceBrokerQueue
SqlInstance         Temp DB Configuration                                    TempDbConfiguration
SqlInstance         Test Last Backup Latency                                 LastBackupLatency
SqlInstance         Traceflag Recommended Global Traceflag Check             GlobalTraceFlag
SqlInstance         Windows Event Log                                        WindowsEventLog
SqlInstance         Failed Logins Cluster Members                            FailedLogins,ClusterMembers
ComputerName        Ping Computer                                            PingComputer
ComputerName        Windows Update Status                                    WindowsUpdate
{{< /powershell-console >}}

#### Set-DbcConfig

dbachecks comes with its own configuration system! This allows you to set values that are required for your environments. We set reasonable defaults, but your requirements may vary, especially between production and test/dev.

What are reasonable defaults? Well for instance, out of the box, dbachecks tests to ensure that log backups have been taken within the last 15 minutes. You may want this to be 60 minutes instead. To set this new value, run the following:

`Set-DbcConfig -Name policy.backup.logmaxminutes -Value 60`

{{< powershell-console >}}
PS C:\github\dbatools> Set-DbcConfig -Name policy.backup.logmaxminutes -Value 60

Name                                                  Value Description
----                                                  ----- -----------
policy.backup.logmaxminutes                             60 Maximum number of minutes before Log Backups are considered outdated
{{< /powershell-console >}}

#### Get-DbcConfig

Retrieves dbachecks configuration elements. You can run this command with or without a search pattern.

{{< powershell-console >}}
PS C:\github\dbatools> Get-DbcConfig "backup"

Name                                                  Value Description
----                                                  ----- -----------
policy.backup.datapath                            [empty]   Destination server data directory, should be enabled true or disabled
policy.backup.enforcedefaultpath                   True      Default backup compression check should be enabled true or disabled
policy.backup.fullmaxdays                             7       Maximum number of days before Full Backups are considered outdated
policy.backup.diffmaxhours                           24       Maximum number of hours before Diff Backups are considered outdated
policy.backup.logmaxminutes                          15       Maximum number of minutes before Log Backups are considered outdated
policy.backup.newdbgraceperiod                        1       The number of hours a newly created database is allowed to not have had a backup for
policy.backup.lastrestorationdate                 [empty]     The minimum amount of time a database should have been restored for a table
policy.backup.recognizablerecoveryblocksizedir   True       Enable DBA Checks: The checks that should be flagged to ensure that CYE is not disabled
policy.backup.backupuncpath                       [empty]     Backup UNC Path
{{< /powershell-console >}}

Piping `Get-DbcConfig` to `Out-GridView` will help make the results even more searchable.

{{< powershell-console title="Get-DbcConfig piped to Out-GridView" >}}
PS C:\github\dbatools> Get-DbcConfig | Out-GridView

[Grid View Window showing configuration options]

agent.databasemailprofile                         Name of the Database Mail Profile in SQL Agent
agent.dbaoperatorname                             Email address of the DBA Operator in SQL Agent
agent.dbaoperatorname                             Name of the DBA Operator in SQL Agent
app.checkrepos                                    C:\github\dbatools\checks
app.localdbachecks                                List of Windows Servers that Windows tests will run against
app.maildirectory                                 Persisted files live here
app.maildirectory                                 For mail size store here
app.sqlcredential                                 The universal SQL credential if Trusted/Windows Authentication is not used
app.sqlinstance                                   Invoke-DbcCheck: The checks that should be configured per instance
command-includedpath                              [0]
domain-domaincontroller                           The domain controller to process your requests
domain-organizationalunit                         The OU that your server is part of
domain.domaincontroller                           The Active Directory domain that your server is part of
mail.failurethreshold                             [0]
mail.faildirectorythreshold                       Number of errors that must be present in an email report
mail.fromsender                                   Email address the email reports should come from
mail.smtpender                                    Store the name of the smtp server to send mail records
mail.subject                                      dbachecks results
mail.to                                           Destination server directory
policy-backup-datapath                            [hidden]
{{< /powershell-console >}}

#### Export-DbcConfig

Exports dbachecks configs to a json file to make it easier to modify or be used for specific configurations.

[Rob's deep-dive article mentioned above](https://dbachecks.io/deepdive) provides awesome insight as to how you can make the most of our Export/Import commands.

#### Import-DbcConfig

Imports dbachecks configs from a json file. The basic idea is that you set your configs, export them, then import them and run on a regular basis.

#### Send-DbcMailMessage

Converts Pester results and emails results formatted using [ReportUnit](https://github.com/reportunit/reportunit). Basically wraps the [Send-MailMessage](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/send-mailmessage?view=powershell-5.1) cmdlet which sends an e-mail message from within Windows PowerShell.

#### Update-DbcPowerBiDataSource

Converts Pester results and exports file in the required format for launching the Power BI command. **You will need to refresh** the Power BI dashboard every time to see the new results. Basically, behind the hood it is running this:

`Invoke-DbcCheck | ConvertTo-Json -Depth 3 | Out-File "$env:windir\temp\dbachecks.json"`

Supports alternative paths.

#### Start-DbcPowerBi

Launches the [included Power BI dashboard](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9). **You will need to refresh** the Power BI dashboard every time to see the new results.

Start-DbcPowerBi also supports alternative paths, in the event, you specify a new path using `Start-DbcPowerBi`.

## Supporting Commands

#### Clear-DbcPowerBiDataSource

Clears the data source directory created by Update-DbcPowerBiDataSource ("C:\windows\temp\dbachecks*.json" by default). This command makes it easier to clean up data used by PowerBI via `Start-DbcPowerBi`.

#### Get-DbcConfigValue

Retrieves raw configuration values by name. Can be used to search the existing configuration list.

#### Get-DbcTagCollection

Retrieves a list of all available tags. Simplistic, similar to Get-Verb.

#### Invoke-DbcConfigFile

Opens the default location of the json config file for easy edits. Follow with Import-DbcConfig to import changes.

#### Save-DbcRequiredModules

Saves all required modules, including dbachecks, dbatools, Pester and PSFramework to a directory. Ideal for offline installs.

#### Update-DbcRequiredModules

Updates all required modules, including dbachecks.

This command reference will continue to be updated as we add more commands. The shortlink is [dbachecks.io/commands](https://dbachecks.io/commands).

\- Chrissy
