---
title: "introducing dbachecks – a new module from the dbatools team!"
date: 2018-02-22
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

![](https://dbatools.io/wp-content/uploads/2018/02/img_5a8a9d30ee2bb.png?w=800&ssl=1)

## How to use

Usage can be approached in two ways:

### Run directly from the command line

As simple as `Invoke-DbcCheck -SqlInstance sqlprod01 -Checks SuspectPage, LastBackup`

### Schedule checks

Command line execution is good in a pinch, but ongoing checks are the ultimate goal. In order do this, you can do the following:

- Set your desired configuration
  Configs can be set for specific environments like Production, Test or Development or for an application, like SharePoint or a custom-built app
- Export your configuration
  Export your environment or application configuration so that it can be easily imported by your scheduled task
- Schedule checks using Task Scheduler or [SQL Server Agent](https://dbatools.io/agent)
  I personally prefer Agent
- Get notified via email or load up in Power BI

Check out our [commands post](https://dbachecks.io/commands) page for more information.

## Power BI is awesome

dbachecks also includes [a built-in Power BI dashboard](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9) and it's *gorgeous*.

![](https://app.powerbi.com/view?r=eyJrIjoiZjM0OWI1ODQtM2YwYy00M2U0LWEzNmUtMDk2NjUxYzJlZjVjIiwidCI6ImIxMjIyNDdlLTFlYmYtNGI1Mi1iMzA5LWMyYWE3NDM2ZmM2YiIsImMiOjh9)

Whaaaaaat! Thanks to [Cláudio Silva](https://claudioessilva.eu/) and Rob Sewell for that work of art. And thanks to [Rob](https://sqldbawithabeard.com/) for making a sample dashboard available online.

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
- [dbachecks.io/twitter](https://dbachecks.io/twitter)
- [dbachecks.io/youtube](https://dbachecks.io/youtube)
- [dbachecks.io/slack](https://dbachecks.io/slack)
- [dbachecks.io/issues](https://dbachecks.io/issues)
- [dbachecks.io/contributors](https://dbachecks.io/contributors)
- [dbachecks.io/git](https://dbachecks.io/git)
- [dbachecks.io/gallery](https://dbachecks.io/gallery)

## License

dbachecks is [MIT licensed](https://choosealicense.com/licenses/mit/)

> The MIT license is a short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

### Learn more

This post just touched on an overview of the new dbachecks module. To learn more about dbachecks, *check* out these posts

- [Announcing dbachecks – Configurable PowerShell Validation For Your SQL Instances by Rob Sewell](https://sqldbawithabeard.com/2018/02/22/announcing-dbachecks-configurable-powershell-validation-for-your-sql-instances/)
- [install dbachecks by Chrissy LeMaire](https://dbachecks.io/install)
- [dbachecks commands by Chrissy LeMaire](https://dbachecks.io/commands)
- [dbachecks – Using Power BI dashboards to analyse results by Cláudio Silva](http://claudioessilva.eu/2018/02/22/dbachecks-using-power-bi-dashboards-to-analyse-results/)
- [My wrapper for dbachecks by Tony Wilhelm](https://v-roddba.blogspot.com/2018/02/wrapper-for-dbachecks.html)
- [Checking backups with dbachecks by Jess Promfret](http://jesspomfret.com/checking-backups-with-dbachecks/)
- [dbachecks please! by Garry Bargsley](http://blog.garrybargsley.com/dbachecks-please)
- [dbachecks – Configuration Deep Dive by Rob Sewell](https://sqldbawithabeard.com/2018/02/22/dbachecks-configuration-deep-dive/)
- [Test Log Shipping with dbachecks by Sander Stad](https://www.sqlstad.nl/powershell/test-log-shipping-with-dbachecks/)
- [Checking your backup strategy with dbachecks by Joshua Corrick](https://corrick.io/blog/checking-your-backup-strategy-with-dbachecks)
- [Enterprise-level reporting with dbachecks by Jason Squires](http://www.sqlnotnull.com/2018/02/22/enterprise-level-reporting-with-dbachecks-from-the-makers-of-dbatools/)
- [Adding your own checks to dbachecks by Shane O'Neill](http://nocolumnname.blog/2018/02/22/adding-your-own-checks-to-dbachecks)
- [dbachecks – A different approach for an in-progress and incremental validation by Cláudio Silva](http://claudioessilva.eu/2018/02/22/dbachecks-a-different-approach-for-a-in-progress-and-incremental-validation/)

If you have any questions, join us in #dbachecks on the [SQL Server Community Slack](https://dbatools.io/slack).

Thanks for reading and we look forward to your feedback!
- Chrissy
