---
title: "New Release – realfakedoors"
date: 2017-03-16
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "realfakedoors"
aliases:
  - /realfakedoors/
  - /realfakedoors/index.html
categories: [announcements]
tags: []
draft: false
---

In [the latest release](https://github.com/dataplat/dbatools/releases/latest), we gained **22 new commands** and 2 new [contributors](https://github.com/dataplat/dbatools/graphs/contributors) to the [dbatools master repository](https://github.com/dataplat/dbatools) for a grand total of 48! We even added a couple new [Major Contributors](https://dbatools.io/team) to the team. Thanks to all who have joined in to make the awesomest toolset for SQL Server DBAs — we're now offering the community 180 quality commands!

## 1.0 Reminder

On March 1, 2017, we initiated a new command freeze. This means that we will no longer be accepting commands that are not within the scope of version 1.0, which we hope to debut on June 1. You may notice that this release still contains a lot of new commands — that's because there was a mad dash to get a bunch of commands in before March 1 😉 We actually still have a few more left to vet.

A new command freeze is necessary because we invest time vetting each PR and in order to reach 1.0 in a timely manner, we need to focus on bug and style resolutions. We're asking anyone who can code to help fix the 35 [bugs](https://github.com/dataplat/dbatools/issues?q=is%3Aissue+is%3Aopen+label%3Abug) currently filed at GitHub and address the [style changes](https://github.com/dataplat/dbatools/wiki/Style-Guide) that the community decided upon.

If you're available to help, we'd love it! Even if you don't know PowerShell, we'll need help updating the website with screenshots and examples with the updated parameters and command names, and other tasks of that nature. We will be working on the following:

- Bug fixes
- Standardized documentation
- Standardized names for parameters, commands, etc
- Standardized outputs
- Testing

We plan to resolve all bug issues first and will continue releasing on a regular basis until the style changes are implemented.

## New Commands

Of the 22 new commands in this release, one command, [Get-DbaBuildReference](https://dbatools.io/Get-DbaBuildReference), fulfills a need that I've seen talked about in the community for quite some time. Major Contributor [Simone Bizzotto](https://www.linkedin.com/in/simonebizzotto/?locale=en_US) parsed a ton of SQL Server build information, created a JSON database then coded Get-DbaBuildReference to parse it. We'll also be placing the data on [sqlcollaborative.github.io](https://github.com/dataplat/sqlcollaborative.github.io) once we get that going. Thank you, Simone!

- **[Get-DbaNetworkActivity](https://dbatools.io/Get-DbaNetworkActivity)**
  Gets the Current traffic on every Network Interface on a computer.

- **[Get-DbaQueryExecutionTime](https://dbatools.io/Get-DbaQueryExecutionTime)**
  Displays Stored Procedures and Ad hoc queries with the highest execution times. Works on SQL Server 2008 and above.

- **[Get-DbaBuildReference](https://dbatools.io/Get-DbaBuildReference)**
  Returns info about the specific build of a SQL instance, including the SP, the CU and the reference KB, wherever possible.

- **[Get-DbaTempdbUsage](https://dbatools.io/Get-DbaTempdbUsage)**
  Gets Tempdb usage for running queries.

- **[Find-DbaDbGrowthEvent](https://dbatools.io/Find-DbaDbGrowthEvent)**
  Finds any database AutoGrow events in the Default Trace.

- **[New-DbaSsisCatalog](https://dbatools.io/New-DbaSsisCatalog)**
  Enables the SSIS Catalog on a SQL Server 2012+

- **[Remove-DbaDatabase](https://dbatools.io/Remove-DbaDatabase)**
  Drops a database, hopefully even the really stuck ones.

- **[Test-DbaIdentityUsage](https://dbatools.io/Test-DbaIdentityUsage)**
  Displays information relating to IDENTITY seed usage. Works on SQL Server 2008 and above.

- **[Test-DbaLinkedServerConnection](https://dbatools.io/Test-DbaLinkedServerConnection)**
  Tests the connection to a linked server. If the test is unsuccessful the command returns the reason of the failure.

- **[Read-DbaTransactionLog](https://dbatools.io/Read-DbaTransactionLog)**
  Reads the live Transaction log from specified SQL Server Database

### General Commands

Based on the popularity of [Get-DbaDatabase](https://dbatools.io/Get-DbaDatabase) and a general agreement within the team, 1.0 will include a bunch of basic Gets and Sets within the module that return SMO objects. Here's the first batch!

- **[Get-DbaAgentJob](https://dbatools.io/Get-DbaAgentJob)**
  Gets SQL Agent Job information for each instance(s) of SQL Server.

- **[Get-DbaAgentJobOutputFile](https://dbatools.io/Get-DbaAgentJobOutputFile)**
  Returns the Output File for each step of one or many agent job with the Job Names provided dynamically if required for one or more SQL Instances.

- **[Get-DbaBackupDevice](https://dbatools.io/Get-DbaBackupDevice)**
  Gets SQL Backup Device information for each instance(s) of SQL Server.

- **[Get-DbaCredential](https://dbatools.io/Get-DbaCredential)**
  Gets SQL Credential information for each instance(s) of SQL Server.

- **[Get-DbaCustomError](https://dbatools.io/Get-DbaCustomError)**
  Gets SQL Custom Error Message information for each instance(s) of SQL Server.

- **[Get-DbaDbAssembly](https://dbatools.io/Get-DbaDbAssembly)**
  Gets SQL Database Assembly information for each instance(s) of SQL Server.

- **[Get-DbaDbEncryption](https://dbatools.io/Get-DbaDbEncryption)**
  Returns a summary of encryption used on databases based to it. Shows if a database has Transparent Data encryption, any certificates, asymmetric keys or symmetric keys with details for each.

- **[Get-DbaAgentJobCategory](https://dbatools.io/Get-DbaAgentJobCategory)**
  Gets SQL Agent Job Category information for each instance(s) of SQL Server.

- **[Get-DbaInstanceAuditSpecification](https://dbatools.io/Get-DbaInstanceAuditSpecification)**
  Gets SQL Security Audit Specification information for each instance(s) of SQL Server.

- **[Get-DbaDbTable](https://dbatools.io/Get-DbaDbTable)**
  Shows table information around table row and data sizes and if it has any table type information.

- **[Set-DbaAgentJobOutputFile](https://dbatools.io/Set-DbaAgentJobOutputFile)**
  Sets the OutPut File for a step of an agent job with the Job Names and steps provided dynamically if required.

- **[Set-DbaSpConfigure](https://dbatools.io/Set-DbaSpConfigure)**
  This function changes the configured value for sp_configure settings. If the setting is dynamic this setting will be used, otherwise the user will be warned that a restart of SQL is required.

## New to dbatools?

Visit the [downloads page](https://dbatools.io/download) for information about how to download and install dbatools (it's 1 command). I actually created a video to demonstrate just how easy the install is on Windows 7 with PowerShell 3. The video is now on our [YouTube channel](https://dbatools.io/youtube).

{{< youtube 8P6ScCjEnLk >}}

## Join Us!

We're all hanging out on the [SQL Server Community Slack](https://dbatools.io/slack) in the #dbatools channel. There's over 500 of us there now, but the conversation load is reasonable.

Thanks for reading 😄
- Chrissy
