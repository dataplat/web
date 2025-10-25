---
title: "migrating application databases with dbatools"
date: 2018-03-15
slug: "migrating-application-dbs"
aliases:
  - /migrating-application-dbs/
  - /migrating-application-dbs/index.html
categories: [announcements]
tags: [party]
draft: false
---

I've been working on a project this year to upgrade SQL Server versions for around 80 application databases, with most of the upgrades requiring both SQL Server and Windows Server upgrades to get to the future state we were looking for. The general process for each of these was to build a new virtual machine with the upgraded operating system, install the desired SQL Server version and then migrate the application databases during an arranged downtime window.

I'm going to focus on the final step of this process for this post – migrating the databases during the downtime windows. Luckily for me, dbatools made this both easy and repeatable.

## Step 1 – Check for connections

First step when we get into the downtime window is to check whether there are any active connections to the database you want to migrate. We don't want any data being changed while we migrate, there's a command for that:

```powershell
Get-DbaProcess -SqlInstance SourceServer -Database MigratingDatabase |
Select Host, login, Program
```

![Get-DbaProcess output](https://dbatools.io/wp-content/uploads/2018/03/Get-DbaProcess.jpg?resize=800%2C81&ssl=1)

If there are connections and it's safe to remove them (if they are still coming from the application it might be worth talking to the app owners first) you can pipe them to another handy dbatools command:

```powershell
Get-DbaProcess -SqlInstance SourceServer -Database MigratingDatabase |
Stop-DbaProcess
```

## Step 2 – Migrate the database

Now that there are no connections we can move the database. Depending on the situation it might be worth setting the database to read only or single user mode first. In my case, I had the application taken down so I felt confident no connections would be coming in.

With one line of code we can select the source and destination servers, the database name, specify that we want to use the backup and restore method, and then provide the path to a file share that both instance service accounts have access to:

```powershell
Copy-DbaDatabase -Source SourceServer -Destination DestinationServer -Database MigratingDatabase -BackupRestore -SharedPath \\fileshare\
```

![Copy-DbaDatabase output](https://dbatools.io/wp-content/uploads/2018/03/Copy-DbaDatabase.jpg?resize=800%2C88&ssl=1)

There are a lot more options available on this command, including setting the number of backup files to use, which can speed things up if you have a large database. I recommend checking out the command based help for all the available options.

## Step 3 – Migrate the user logins

Once the database is on the new server we can use the following to copy the associated logins across. The nice thing about using this command is it ensures the user SIDs match up on the destination and you don't end up with any orphan SQL Logins.

```powershell
Copy-DbaLogin -Source SourceServer -Destination DestinationServer -Login AppReadOnly, AppReadWrite, DOMAIN\AppUser
```

![Copy-DbaLogin output](https://dbatools.io/wp-content/uploads/2018/03/Copy-DbaLogin.jpg?resize=800%2C104&ssl=1)

## Step 4 – Set the source database offline

Now that the database and associated logins have been migrated we can set the source database offline. I did this so if there were any issues getting the application up we could quickly revert back while ensuring nothing was still accessing the old copy.

```powershell
Set-DbaDbState -SqlInstance SourceServer -Database MigratingDatabase -Offline -Force
```

![Set-DbaDbState output](https://dbatools.io/wp-content/uploads/2018/03/Set-DbaDbState-1024x190.jpg?resize=800%2C148&ssl=1)

In the end I was able to use 5 lines of PowerShell to get these application databases migrated to their new homes. After some testing I dropped the old offline copy of the database and eventually decommissioned the old servers.

I hope this gives you some ideas of how dbatools can help make your database migrations easier and more efficient.

Jess 🇨🇦
