---
title: "a few other community tools"
date: 2018-08-31
author: "Chrissy LeMaire"
slug: "community-tools"
aliases:
  - /community-tools/
  - /community-tools/index.html
categories: [announcements]
tags: [party]
draft: false
---

Last night's [#PSPowerHour](https://www.youtube.com/watch?v=3Yq4sVWJrWo) made me realize I should highlight a few awesome projects I've come across recently.

### PSDatabaseClone

[PSDatabaseClone](https://psdatabaseclone.org/) was created by [Sander Stad](https://www.sqlstad.nl/).

> PSDatabaseClone is a PowerShell module for creating SQL Server database images and clones. It enables administrator to supply environments with database copies that are a fraction of the original size.

It is [well-documented](https://psdatabaseclone.org/docs/) and [open-source](https://github.com/sanderstad/PSDatabaseClone).

### dbops

[dbops](https://github.com/dataplat/dbops) was created by [Kirill Kravtsov](https://nvarscar.wordpress.com).

> dbops is a Powershell module that provides Continuous Integration/Continuous Deployment capabilities for SQL database deployments.

It is based on [DbUp](https://github.com/DbUp/DbUp), which is DbUp is an open source .NET library that helps you to deploy changes to SQL Server databases. dbops currently supports both SQL Server and Oracle.

### sqlwatch

[sqlwatch](https://sqlwatch.io/) was created by [Marcin Gminski](https://marcin.gminski.net/goodies/sql-server-performance-dashboard-using-powerbi/).

> The aim of this this project is to provide a free, repository backed, SQL Server Monitoring.

![sqlwatch](https://dbatools.io/wp-content/uploads/2018/08/sqlwatch.png?resize=610%2C169&ssl=1)

The project is [open-source](https://github.com/marcingminski/sqlwatch) and the developers are available on [Twitter](https://twitter.com/sqlwatch) and in #sqlwatch in the [SQL Server Community Slack](https://dbatools.io/slack).

### PowerUpSQL

[PowerUpSQL](https://github.com/NetSPI/PowerUpSQL) was created by [Scott Sutherland](https://blog.netspi.com/author/scott-sutherland/).

> PowerUpSQL includes functions that support SQL Server discovery, weak configuration auditing, privilege escalation on scale, and post exploitation actions such as OS command execution.

The project is [open-source](https://github.com/NetSPI/PowerUpSQL) and was [recently featured at Black Hat USA](https://www.youtube.com/watch?v=UX_tBJQtqW0).

### dbachecks

If you're new to dbatools and not familiar with our other projects, [dbachecks](https://dbachecks.io) was created by the [dbatools team](https://dbatools.io/team) and is now primarily maintained by [Rob Sewell](http://sqldbawithabeard.com).

> dbachecks is a framework created by and for SQL Server pros who need to validate their environments using crowd-sourced checklists.

The project is [open-source](https://github.com/dataplat/dbachecks) and [totally beautiful](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9).

<iframe width="600" height="400" src="https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

If you're wondering what happened to dbareports, Rob handed it off to Jason Squires who is currently in the middle of a rewrite.

## your module here

If I've missed your module or project, let me know in the comments and I'll happily add it to this post!

## missed pspowerhour?

Last night, was the [second live stream of #PSPowerHour](https://www.youtube.com/watch?v=3Yq4sVWJrWo)! Check it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3Yq4sVWJrWo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

| Title | Name |
|-------|------|
| [Cloning SQL Server Databases using PowerShell](https://youtu.be/3Yq4sVWJrWo?t=12s) | [Sander Stad](https://github.com/sanderstad) |
| [Getters and Setters for Classes with Custom Attributes](https://youtu.be/3Yq4sVWJrWo?t=9m24s) | [Ryan Bartram](https://github.com/rdbartram) |
| [Using PwSH to gather information from silos](https://youtu.be/3Yq4sVWJrWo?t=19m36s) | [Teresa Clark](https://github.com/TClark000) |
| [PowerShell and RegExp to convert code](https://youtu.be/3Yq4sVWJrWo?t=25m10s) | [Cláudio Silva](https://github.com/ClaudioESSilva) |
| [Getting Started with Visual Studio Code](https://youtu.be/3Yq4sVWJrWo?t=32m52s) | [Shawn Melton](https://github.com/wsmelton) |
| [Deploying SQL code using Powershell](https://youtu.be/3Yq4sVWJrWo?t=43m40s) | [Kirill Kravtsov](https://github.com/nvarscar) |
| [PSKoans](https://youtu.be/3Yq4sVWJrWo?t=54m2s) | [Joel Sallow](https://github.com/vexx32) |

- Chrissy
