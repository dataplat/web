---
title: "Managing Central Management Server"
date: 2018-07-11
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "cms"
aliases:
  - /cms/
  - /cms/index.html
categories: [announcements]
tags: [cms]
draft: false
---

SQL Server's [Central Management Server](https://www.red-gate.com/simple-talk/sql/sql-tools/registered-servers-and-central-management-server-stores/) (CMS), first introduced in SQL Server 2008, "stores a list of instances of SQL Server that is organized into one or more central management server groups".

![CMS Screenshot](/images/cms.png)

It's a super useful feature that not all DBAs know about. Since CMS data is stored in msdb and accessible via SMO, you can access it from SQL Server Management Studio or PowerShell modules like dbatools.

Central Management Server's [essential functionality](https://learn.microsoft.com/en-us/sql/ssms/register-servers/create-a-central-management-server-and-server-group) includes:

> Actions that are taken by using a central management server group act on all servers in the server group. This includes connecting to servers by using Object Explorer and executing Transact-SQL statements and Policy-Based Management policies on multiple servers at the same time.

I mostly use it as a visual repository of my SQL Servers. Prior to using dbatools and Invoke-DbaQuery, however, I did use CMS to easily execute code against a number of different servers.

## Server Grouping

The screenshot above is a sample representation of how SQL Servers can be divided into groups. I generally organize by department, but organizing by version is also useful when performing migrations. I've done that as well.

And because a SQL Server can be listed multiple times within different groups, my buddy Brandon created an automated system that divided by both Application and assigned DBA. Too cool! In this example from [sqlmatters.com](https://www.sqlmatters.com/Articles/RegisteredServersvsCentralManagementServers.aspx), their servers are divided up by environment.

![Registered Servers and Central Management Servers](/images/Registered-Servers-and-Central-Management-Servers-1.jpg)

But wait. The screenshot also shows Registered Servers. What are those?

## Registered Servers vs Central Management Servers

The article [Registered Servers vs Central Management Servers](https://www.sqlmatters.com/Articles/RegisteredServersvsCentralManagementServers.aspx) lays out the differences in a straightforward manner.

#### Registered Servers

- Connection data is stored locally in an XML file (passwords are encrypted) in the user path.
- Because it is a local file with encrypted data, Registered Servers are local and only work for the user that created them.
- Can be used with SQL Server Authentication or Windows Authentication.
- Can be used for the database engine, SSAS, SSIS and SSRS.

#### Central Management Servers

- Connection data is stored in a central SQL Server (in the msdb database), and can be used by other users.
- Can be used with Windows Authentication only.
- Can be used for the database engine only.

I work primarily in environments where Windows Authentication works for all of my servers, so I haven't used Registered Servers in years. I also appreciate that my list of servers within CMS is backed up each day because it's stored in msdb. And, it's easily accessible through both SQL Server Management Studio and PowerShell.

## dbatools Commands

We have a number of commands to help manage CMS! We even updated our command names after this blog post came out.

### Get-DbaRegServer

Gets list of SQL Server objects stored in SQL Server Central Management Server.

![Get-DbaRegServer](/images/img_5b4670e0cd968.png)

```powershell
# Here's how you get a list of all servers stored on the CMS instance on sql2008.
# Note that this list is pipable to all dbatools commands
Get-DbaRegServer -SqlInstance sql2008

# Pipe all the results to another dbatools command
Get-DbaRegServer -SqlInstance sql2008 | Get-DbaLastBackup

# Get all registered servers in the group "Production"
Get-DbaRegServer -SqlInstance sql2008 -Group Production

# Get all registered servers in the subgroup "HR" within "Production"
Get-DbaRegServer -SqlInstance sql2008 -Group Production\HR
```

### Add-DbaRegServer

Adds registered servers to SQL Server Central Management Server.

![Add-DbaRegServer](/images/img_5b4668c7bc3e9.png)

```powershell
# To create a registered server on sql2008's CMS which points to the SQL Server, sql01.
# When scrolling in CMS, the name "sql01" will be visible.
Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01

#  To create a registered server on sql2008's CMS which points to the SQL Server, sql01.
# When scrolling in CMS, "The 2008 Clustered Instance" will be visible.
Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Name "The 2008 Clustered Instance" -Description "HR's Dedicated SharePoint instance"

# To create a registered server on sql2008's CMS which points to the SQL Server, sql01.
# When scrolling in CMS, the name "sql01" will be visible within the Seattle group which is in the hr group.
Add-DbaRegServer -SqlInstance sql2008 -ServerName sql01 -Group hr\Seattle
```

### Add-DbaRegServerGroup

Adds registered server groups to SQL Server Central Management Server.

```powershell
# To create a registered server group called HR, in the root of sql2012's CMS
Add-DbaRegServerGroup -SqlInstance sql2012 -Name HR

# To create a registered server group on sql2012 and sql2014 called subfolder within the HR group
Add-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Name subfolder -Group HR

# To create a registered server group on sql2012 and sql2014 called subfolder within the HR group of each server
Get-DbaRegServerGroup -SqlInstance sql2012, sql2014 -Group HR | Add-DbaRegServerGroup -Name subfolder
```

### Export-DbaRegServer

Exports Central Management Server registered servers and registered server groups to file.

![Export-DbaRegServer](/images/img_5b46694e4c014.png)

```powershell
# To export all Registered Server and Registered Server Groups on sql2008 to an automatically generated file name in the current directory
Export-DbaRegServer -SqlInstance sql2008

# To export all Registered Server and Registered Server Groups with the Seattle group within the HR group on sql2008 to C:\temp\Seattle.xml
Export-DbaRegServer -SqlInstance sql2008 -Group hr\Seattle -Path C:\temp\Seattle.xml

# To export all registered servers on sql2008 and sql2012. Warning - each one will have its own individual file. Consider piping groups.
Get-DbaRegServer -SqlInstance sql2008, sql2012 | Export-DbaRegServer

# To export all registered servers on sql2008 and sql2012, organized by group.
Get-DbaRegServerGroup -SqlInstance sql2008, sql2012 | Export-DbaRegServer
```

### Get-DbaRegServerGroup

Gets list of Server Groups objects stored in SQL Server Central Management Server.

```powershell
# This is more of a helper command that will return a RegisteredServerGroup object
Get-DbaRegServerGroup -SqlInstance sql2008 -Group Production\HR
```

### Get-DbaRegServerStore

Gets list of Server Groups objects stored in SQL Server Central Management Server.

```powershell
# This is more of a helper command that will return a RegisteredServerStore object
Get-DbaRegServerStore -SqlInstance sql2008
```

### Import-DbaRegServer

Gets list of Server Groups objects stored in SQL Server Central Management Server.

![Import-DbaRegServer](/images/img_5b46702b5eb54.png)

```powershell
# To import C:\temp\corp-regservers.xml to the CMS on sql2012
Import-DbaRegServer -SqlInstance sql2012 -Path C:\temp\corp-regservers.xml

# To import C:\temp\Seattle.xml to Seattle subgroup within the hr group on sql2008
Import-DbaRegServer -SqlInstance sql2008 -Group hr\Seattle -Path C:\temp\Seattle.xml

# To import all registered servers from sql2008 and sql2012 to sql2017
Get-DbaRegServer -SqlInstance sql2008, sql2012 | Import-DbaRegServer -SqlInstance sql2017

# To import all registered servers from the hr\Seattle group on sql2008 to the Seattle group on sql2017
Get-DbaRegServerGroup -SqlInstance sql2008 -Group hr\Seattle | Import-DbaRegServer -SqlInstance sql2017 -Group Seattle
```

### Move-DbaRegServer

Moves registered server groups around SQL Server Central Management Server. This could be useful during migrations.

```powershell
# To move the registered server on sql2012 titled 'Web SQL Cluster' to the Prod group within the HR group
Move-DbaRegServer -SqlInstance sql2012 -Name 'Web SQL Cluster' -NewGroup HR\Prod
```

### Move-DbaRegServerGroup

Removes registered servers found in SQL Server Central Management Server.

```powershell
# To move the Development group within HR to the Prod group within AD
Move-DbaRegServerGroup -SqlInstance sql2012 -Group HR\Development -NewGroup AD\Prod
```

### Remove-DbaRegServer

Removes registered servers found in SQL Server Central Management Server.

```powershell
# To remove all servers from the HR and Accounting groups on sql2012
Remove-DbaRegServer -SqlInstance sql2012 -Group HR, Accounting

# To remove all servers from the HR and sub-group Development from the CMS on sql2012.
Remove-DbaRegServer -SqlInstance sql2012 -Group HR\Development

# To remove all registered servers on sql2012 and turns off all prompting
Remove-DbaRegServer -SqlInstance sql2012 -Confirm:$false
```

### Remove-DbaRegServerGroup

Removes registered server groups found in SQL Server Central Management Server.

```powershell
# To remove the HR and Accounting groups on sql2012
Remove-DbaRegServerGroup -SqlInstance sql2012 -Group HR, Accounting

# To remove the Development subgroup within the HR group on sql2012 and turns off all prompting
Remove-DbaRegServerGroup -SqlInstance sql2012 -Group HR\Development -Confirm:$false
```

## ⭐⭐⭐⭐⭐ Would Use Again

CMS is a longtime favorite of mine and I'd like to give a shoutout to [Bryan Hamby](https://www.linkedin.com/in/bryan-hamby-92110016/) for helping make dbatools commands compatible with Central Management Server.

In case you missed it in the sea of code above, you can pipe a collection of servers right from CMS. Here's how you'd find all running agent jobs in your estate, if you stored all of your SQL Servers in the CMS on sql2008.

```powershell
Get-DbaRegServer -SqlInstance sql2008 | Get-DbaRunningJob
```

Too cool!

Happy piping,
- Chrissy

Edit: Someone asked what server should be designated as the Central Management Server. A few people on the [SQL Server Community Slack](https://sqlslack.com) said they have a dedicated instance, as do I.

I have a management server where I perform all of my work. If you're interested in a dedicated instance but don't have a license, it works on SQL Server Express Edition 👍
