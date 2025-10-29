---
title: "Introducing dbachecks – A New Module From the dbatools Team!"
date: 2018-02-22
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "introducing-dbachecks"
aliases:
  - /introducing-dbachecks/
  - /introducing-dbachecks/index.html
categories: [announcements]
tags: [dbachecks, party]
draft: false
---

In mid-December, we began working on a new PowerShell module for the SQL Server Community. This free and open-source project can be found in the [SQL Server Community Collaborative's repository](https://github.com/dataplat). Contributions from the community are welcomed and encouraged!

## Intro

dbachecks is a framework created by and for SQL Server pros who need to validate their environments. Basically, we all share similar checklists and mostly just the server names and RPO/RTO/etc change.

This module allows us to crowdsource our checklists using [Pester](https://github.com/Pester/Pester) tests. Such checks include:

- Backups are being performed
- Identity columns are not about to max out
- Servers have access to backup paths
- Database integrity checks are being performed and corruption does not exist
- Disk space is not about to run out
- All enabled jobs have succeeded
- Network latency does not exceed a specified threshold

We currently provide over 80 checks, as can be easily seen using `Get-DbcCheck`:

{{< powershell-console >}}
PS C:\github\dbachecks> Get-DbcCheck
Group            Type         Description                              UniqueTag                                 AllTags
-----            ----         -----------                              ---------                                 -------
Agent            SqlInstance  SQL Agent Account                        AgentServiceAccount                       AgentServiceAccount, ServiceAccount, Agent
Agent            SqlInstance  DBA Operators                            DbaOperatorName                           DbaOperatorName, Operator, Agent
Agent            SqlInstance  Failed Jobs                              FailedJob                                 FailedJob, Agent
Agent            SqlInstance  Valid Job Owner                          ValidJobOwner                             ValidJobOwner, Agent
Agent            SqlInstance  Agent Alerts                             AgentAlert                                AgentAlert, Agent
Agent            SqlInstance  Long Running Jobs                        LongRunningJob                            LongRunningJob, Agent
Agent            SqlInstance  Last Job Run Time                        LastJobRunTime                            LastJobRunTime, Agent
Backup           Database     Last Diff Backup Times                   LastDiffBackup                            LastDiffBackup, Backup, DISA, Database
Backup           Database     Last Full Backup Times                   LastFullBackup                            LastFullBackup, Backup, DISA, Database
Backup           Database     Last Log Backup Times                    LastLogBackup                             LastLogBackup, Backup, DISA, Database
Backup           Database     Valid Backup Path                        ValidBackupPath                           ValidBackupPath, Backup, Database
Backup           Database     Backup Compression                       BackupCompression                         BackupCompression, Backup, Database
Backup           Database     Test Last Backup                         TestLastBackup                            TestLastBackup, Backup, Database
Backup           Database     Recovery Model                           RecoveryModel                             RecoveryModel, Backup, DISA, Database
Compliance       Database     Database Growth Event                    DatabaseGrowthEvent                       DatabaseGrowthEvent, Database
Compliance       Database     Page Verify                              PageVerify                                PageVerify, Database
Compliance       SqlInstance  Compatibility Level                      CompatibilityLevel                        CompatibilityLevel, Database
Compliance       SqlInstance  Guest User has Connect Permission        GuestUserConnect                          GuestUserConnect, Database
Compliance       SqlInstance  Contained DB Orphaned Users              ContainedDBOrphanedUser                   ContainedDBOrphanedUser, Database
Compliance       SqlInstance  Auto Close                               AutoClose                                 AutoClose, Database
Compliance       SqlInstance  Auto Shrink                              AutoShrink                                AutoShrink, Database
Compliance       SqlInstance  Last Good CheckDB                        LastGoodCheckDB                           LastGoodCheckDB, DISA, Database
Compliance       Database     Audit Statistics Asynchrony              AutoUpdateStatisticsAsynchronously        AutoUpdateStatisticsAsynchronously, Database
Compliance       Database     Audit Statistics                         AutoUpdateStatistics                      AutoUpdateStatistics, Database
Compliance       Database     Database Collation                       DatabaseCollation                         DatabaseCollation, Database
Compliance       SqlInstance  Suspect Pages                            SuspectPage                               SuspectPage, Corruption, Integrity, Database
Compliance       Database     Pseudo Simple Recovery Model             PseudoSimple                              PseudoSimple, Database
Compliance       SqlInstance  Max DOP                                  MaxDOP                                    MaxDOP, Database
Compliance       SqlInstance  Orphaned File                            OrphanedFile                              OrphanedFile, Database
Compliance       SqlInstance  Failed Jobs                              FailedJob                                 FailedJob, Agent
Compliance       SqlInstance  Duplicate Index                          DuplicateIndex                            DuplicateIndex, Database
Compliance       SqlInstance  Unused Index                             UnusedIndex                               UnusedIndex, Database
Compliance       SqlInstance  Disabled Index                           DisabledIndex                             DisabledIndex, Database
ComputerName     ComputerName Server Health                            ServerHealth                              ServerHealth, DISA, Instance
ComputerName     ComputerName Server Power Plan                        ServerPowerPlan                           ServerPowerPlan, DISA, Instance
ComputerName     ComputerName Server Disk Configuration                ServerDiskConfiguration                   ServerDiskConfiguration, DISA, Instance
Compression      Database     Compressible Tables                      CompressibleTables                        CompressibleTables, Database
Database         SqlInstance  Database Growth Event                    DatabaseGrowthEvent                       DatabaseGrowthEvent, Database
Database         SqlInstance  Database Collation                       DatabaseCollation                         DatabaseCollation, Database
Database         SqlInstance  Suspect Pages                            SuspectPage                               SuspectPage, Corruption, Integrity, Database
Database         SqlInstance  Last Good CheckDB                        LastGoodCheckDB                           LastGoodCheckDB, DISA, Database
Database         SqlInstance  Valid Database Owner                     ValidDatabaseOwner                        ValidDatabaseOwner, Database
Database         SqlInstance  Invalid Database Owner                   InvalidDatabaseOwner                      InvalidDatabaseOwner, Database
Database         Database     Auto Close                               AutoClose                                 AutoClose, Database
Database         Database     Auto Shrink                              AutoShrink                                AutoShrink, Database
Database         Database     Last Full Backup Times                   LastFullBackup                            LastFullBackup, Backup, DISA, Database
Database         Database     Last Diff Backup Times                   LastDiffBackup                            LastDiffBackup, Backup, DISA, Database
Database         Database     Last Log Backup Times                    LastLogBackup                             LastLogBackup, Backup, DISA, Database
Database         Database     Virtual Log Files                        VirtualLogFile                            VirtualLogFile, Database
Database         Database     Log File Count                           LogFileCount                              LogFileCount, Database
Database         Database     Log File Size                            LogFileSize                               LogFileSize, Database
Database         Database     Duplicate Index                          DuplicateIndex                            DuplicateIndex, Database
Database         Database     Unused Index                             UnusedIndex                               UnusedIndex, Database
Database         Database     Disabled Index                           DisabledIndex                             DisabledIndex, Database
Database         Database     Database Compatibility Level             CompatibilityLevel                        CompatibilityLevel, Database
Database         Database     Foreign Keys and Check Constraints       FKCKTrusted                               FKCKTrusted, Database
Database         Database     Maximum VLF                              MaximumVLF                                MaximumVLF, Database
Domain           ComputerName Domain Name                              DomainName                                DomainName, Domain
Domain           ComputerName Organization Unit                        OrganizationUnit                          OrganizationUnit, Domain
Instance         SqlInstance  SQL Memory Max                           MaxMemory                                 MaxMemory, DISA, Instance
Instance         SqlInstance  SQL Memory Min                           MinMemory                                 MinMemory, Instance
Instance         SqlInstance  SQL Windows Admin Members                SqlWindowsAdminMembers                    SqlWindowsAdminMembers, Instance
Instance         SqlInstance  TempDB Size                              TempDBSize                                TempDBSize, DISA, Instance
Instance         SqlInstance  SQL AdHocWorkload                        AdHocWorkload                             AdHocWorkload, Instance
LogShipping      Database     Log Shipping Primary                     LogShippingPrimary                        LogShippingPrimary, LogShipping, Database, DISA
LogShipping      Database     Log Shipping Secondary                   LogShippingSecondary                      LogShippingSecondary, LogShipping, Database, DISA
MaintenanceSolution Database  Ola Installed                            OlaInstalled                              OlaInstalled, Database
MaintenanceSolution Database  Ola System Full Backup                   SystemFullBackup                          SystemFullBackup, Backup, Database
MaintenanceSolution Database  Ola User Full Backup                     UserFullBackup                            UserFullBackup, Backup, Database
MaintenanceSolution Database  Ola User Diff Backup                     UserDiffBackup                            UserDiffBackup, Backup, Database
MaintenanceSolution Database  Ola User Log Backup                      UserLogBackup                             UserLogBackup, Backup, Database
MaintenanceSolution Database  Ola CommandLog Cleanup                   CommandLogCleanup                         CommandLogCleanup, Database
MaintenanceSolution Database  Ola System Integrity Check               SystemIntegrityCheck                      SystemIntegrityCheck, DBCC, Corruption, Integrity, Database
MaintenanceSolution Database  Ola User Integrity Check                 UserIntegrityCheck                        UserIntegrityCheck, DBCC, Corruption, Integrity, Database
MaintenanceSolution Database  Ola User Index Optimize                  UserIndexOptimize                         UserIndexOptimize, Database
MaintenanceSolution Database  Ola Output File Cleanup                  OutputFileCleanup                         OutputFileCleanup, Database
MaintenanceSolution Database  Ola Delete Backup History                DeleteBackupHistory                       DeleteBackupHistory, Database
MaintenanceSolution Database  Ola Purge Job History                    PurgeJobHistory                           PurgeJobHistory, Database
Network          SqlInstance  Network Latency                          NetworkLatency                            NetworkLatency, Connectivity, Instance
Network          SqlInstance  Linked Server Connection                 LinkedServerConnection                    LinkedServerConnection, Connectivity, Instance
Server           ComputerName Ping Computer                            PingComputer                              PingComputer, ComputerName
Server           ComputerName CPU Priority                             CPUPriority                               CPUPriority, ComputerName
Server           ComputerName Disk Capacity                            DiskCapacity                              DiskCapacity, DISA, ComputerName
Server           SqlInstance  Disk Allocation Unit                     DiskAllocationUnit                        DiskAllocationUnit, ComputerName
Server           SqlInstance  Power Plan                               PowerPlan                                 PowerPlan, ComputerName
Server           SqlInstance  SPN                                      SPN                                       SPN, Instance
Server           SqlInstance  Disk Max Transfer                        DiskMaxTransfer                           DiskMaxTransfer, ComputerName
Server           SqlInstance  Server Hardware                          ServerHardware                            ServerHardware, ComputerName
Server           SqlInstance  Server Memory                            ServerMemory                              ServerMemory, ComputerName
Server           SqlInstance  Dedicated Admin Connection               DedicatedAdminConnection                  DedicatedAdminConnection, Instance
Server           SqlInstance  SQL + Windows names match                ServerNameMatch                           ServerNameMatch, Instance
{{< /powershell-console >}}

## How to Use

Usage can be approached in two ways:

### Run Directly From the Command Line

As simple as `Invoke-DbcCheck -SqlInstance sqlprod01 -Checks SuspectPage, LastBackup`

### Schedule Checks

Command line execution is good in a pinch, but ongoing checks are the ultimate goal. In order do this, you can do the following:

- Set your desired configuration
  Configs can be set for specific environments like Production, Test or Development or for an application, like SharePoint or a custom-built app
- Export your configuration
  Export your environment or application configuration so that it can be easily imported by your scheduled task
- Schedule checks using Task Scheduler or [SQL Server Agent](https://dbatools.io/agent)
  I personally prefer Agent
- Get notified via email or load up in Power BI

Check out our [commands post](https://dbachecks.io/commands) page for more information.

## Power BI Is Awesome

dbachecks also includes [a built-in Power BI dashboard](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9) and it's *gorgeous*.

![](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9)

Whaaaaaat! Thanks to [Cláudio Silva](https://claudioessilva.eu/) and Rob Sewell for that work of art. And thanks to [Rob](https://blog.robsewell.com/) for making a sample dashboard available online.

## Install

To learn more about prerequisites and installation, please visit [installing dbachecks](https://dbachecks.io/install).

## Development

Have questions about development? Please visit our [creating tests for dbachecks](https://dbachecks.io/wiki).

## Website

Unlike dbatools, there is no dedicated website for dbachecks at this time. The domain [dbachecks.io](https://dbachecks.io) does exist, however, and will be used for shortlinks <3.

- [dbachecks.io](https://dbachecks.io)
- [dbachecks.io/install](https://dbachecks.io/install)
- [dbachecks.io/blog](https://dbachecks.io/blog)
- [dbachecks.io/git](https://dbachecks.io/git)
- [dbachecks.io/youtube](https://dbachecks.io/youtube)
- [dbachecks.io/slack](https://dbachecks.io/slack)
- [dbachecks.io/issues](https://dbachecks.io/issues)
- [dbachecks.io/contributors](https://dbachecks.io/contributors)
- [dbachecks.io/git](https://dbachecks.io/git)
- [dbachecks.io/gallery](https://dbachecks.io/gallery)

## License

dbachecks is [MIT licensed](https://choosealicense.com/licenses/mit/)

> The MIT license is a short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

### Learn More

This post just touched on an overview of the new dbachecks module. To learn more about dbachecks, *check* out these posts

- [Announcing dbachecks – Configurable PowerShell Validation For Your SQL Instances by Rob Sewell](https://blog.robsewell.com/2018/02/22/announcing-dbachecks-configurable-powershell-validation-for-your-sql-instances/)
- [install dbachecks by Chrissy LeMaire](https://dbachecks.io/install)
- [dbachecks commands by Chrissy LeMaire](https://dbachecks.io/commands)
- [My wrapper for dbachecks by Tony Wilhelm](https://v-roddba.blogspot.com/2018/02/wrapper-for-dbachecks.html)
- [Checking backups with dbachecks by Jess Pomfret](http://jesspomfret.com/checking-backups-with-dbachecks/)
- [dbachecks please! by Garry Bargsley](http://blog.garrybargsley.com/dbachecks-please)
- [dbachecks – Configuration Deep Dive by Rob Sewell](https://blog.robsewell.com/2018/02/22/dbachecks-configuration-deep-dive/)
- [Test Log Shipping with dbachecks by Sander Stad](https://www.sqlstad.nl/powershell/test-log-shipping-with-dbachecks/)
- [Checking your backup strategy with dbachecks by Joshua Corrick](https://blog.corrick.io/checking-your-backup-strategy-with-dbachecks)
- [Enterprise-level reporting with dbachecks by Jason Squires](http://www.sqlnotnull.com/2018/02/22/enterprise-level-reporting-with-dbachecks-from-the-makers-of-dbatools/)
- [Adding your own checks to dbachecks by Shane O'Neill](http://nocolumnname.blog/2018/02/22/adding-your-own-checks-to-dbachecks)

If you have any questions, join us in #dbachecks on the [SQL Server Community Slack](https://dbatools.io/slack).

Thanks for reading and we look forward to your feedback!
- Chrissy
