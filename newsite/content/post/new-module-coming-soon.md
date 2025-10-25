---
title: "t-sql tuesday and new module teaser"
date: 2018-01-09
slug: "new-module-coming-soon"
aliases:
  - /new-module-coming-soon/
  - /new-module-coming-soon/index.html
categories: [announcements]
tags: [dbachecks, party, pester]
draft: false
---

[![TSQL2SDAY-150x150](https://blog.netnerds.net/wp-content/uploads/2016/06/TSQL2SDAY-150x150.png?resize=150%2C150&ssl=1)](https://blobeater.blog/2018/01/02/t-sql-tuesday-98-your-technical-challenges-conquered/)

Today's blog post is part of [T-SQL Tuesday](https://blobeater.blog/2018/01/02/t-sql-tuesday-98-your-technical-challenges-conquered/). T-SQL Tuesday is the brainchild of Adam Machanic. It is a blog party on the second Tuesday of each month. Everyone is welcomed to participate.

This month's T-SQL Tuesday, hosted by Arun Sirpal ([blog](https://blobeater.blog)|[twitter](https://twitter.com/blobeater1)), is all about overcoming technical challenges.

## The challenge

I always try to solve my technical issues with natively available (aka Microsoft) solutions. It's one of the many reasons I love PowerShell.

When it comes to monitoring, I know there are some really wonderful solutions out there. [SentryOne](https://www.sentryone.com/sql-server/database-monitoring-tools) and [SolarWinds](https://www.solarwinds.com/database-performance-monitoring-software) come to mind but I don't always need deep query level monitoring or I may not be able to pay licencing costs for all of my SQL Instances. But I do need to easily know if they are all set up correctly.

Ever since I was a baby DBA, I've wanted to create a centralized solution that I could roll in with and get going with after finding all of my servers. Over the years, I've tried to put together some ASP/VBScript solutions, then when I learned PowerShell, tried PowerShell and SQL Agent, but I just wasn't feeling it. I could never figure out how to make the checks modular and universal. That is, until I learned about [Pester](https://sqldbawithabeard.com/2017/11/16/write-your-first-pester-test-today/) in-depth from [Rob Sewell](https://sqldbawithabeard.com/).

## The solution

The solution I've been looking for turns out to be a mix of dbatools and Pester. Pester is the first Open Source community project formally included in a Windows release! Windows 10 and Windows Server 2016 include Pester by default.

[![Pester Logo](https://dbatools.io/wp-content/uploads/2018/01/pester-med-logo.png?resize=312%2C122&ssl=1)](https://github.com/Pester/Pester/wiki/)

Pester makes it easy to standardize tests or "checks" because it can output its results in a number of standardized formats, including NunitXml and JSON. It's all PowerShell, after all.

dbatools makes it easy to perform these checks without installing additional software or stored procedures on each of my servers. I have one central workstation that needs to be updated and checking hundreds of servers is as easy as checking just one.

So after poring over Rob's prodigious [GitHub Presentation Repository](https://github.com/SQLDBAWithABeard/Presentations), I found a bunch of his tests, and added them to a newly created module. I then created an index of the checks to make them easy to access. Once I got the proof of concept down, I invited a few people from the community who I know are involved in Pester and asked them to help.

The result has been a dream come true!

## Index

Index of checks. You can run them all, run by group or only run the specific tests that matter to your environment.

[![Index Screenshot](https://dbatools.io/wp-content/uploads/2018/01/index.jpg?resize=800%2C545&ssl=1)](https://dbatools.io/wp-content/uploads/2018/01/index.jpg?ssl=1)

## Power BI Universal Dashboard

Courtesy of [Cláudio Silva](https://twitter.com/claudioessilva). Just hit refresh and you're all set!

[![Power BI Dashboard](https://dbatools.io/wp-content/uploads/2018/01/dash.png?resize=800%2C450&ssl=1)](https://dbatools.io/wp-content/uploads/2018/01/dash.png?ssl=1)

## Included Parser & Mailer

Also from Rob's repo!

[![Mail Screenshot](https://dbatools.io/wp-content/uploads/2018/01/mail.png?resize=800%2C475&ssl=1)](https://dbatools.io/wp-content/uploads/2018/01/mail.png?ssl=1)

We are still working on the checks, but these screenshots should give you an idea about the new SQL PowerShell module that Rob and I will be premiering at our [SQLBits PowerShell Precon](https://sqlps.io/bitsprecon), `Reliable, Repeatable, & Automated: PowerShell for DBAs`, in London on Thursday, February 22 2018.

Interested in finding out more? Find us at SQLBits!
