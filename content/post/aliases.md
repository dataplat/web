---
title: "working with sql client aliases"
date: 2020-01-10
author: "Chrissy LeMaire"
slug: "aliases"
aliases:
  - /aliases/
  - /aliases/index.html
categories: [announcements]
tags: []
draft: false
---

[SQL Client Aliases](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/create-or-delete-a-server-alias-for-use-by-a-client) allow you to connect to a SQL Server instance using another name. This is especially useful during migrations. Want your servers to connect to the new SQL Server without modifying connection strings within your application? Or what if you could use easy-to-remember names for your docker containers? SQL Client Aliases can help.

![image](https://user-images.githubusercontent.com/8278033/72145420-c9181400-339a-11ea-9229-a460158c0d0f.png)

For the longest time, I managed these aliases using cliconfg for 64-bit applications (`C:\Windows\System32\cliconfg.exe`) or cliconfg for 32-bit applications (`C:\Windows\SysWOW64\cliconfg.exe`).

When I'd remember and if it was available, I'd also manage SQL Client Aliases using SQL Server Configuration Manager, which surfaces aliases for both 32-bit applications and 64-bit applications in a single pane. Here's a screenshot of both SQL Server Configuration Manager and cliconfg. Note they both show the same aliases, confirming that you can manage aliases using whichever you prefer.

[![cliconfg](https://dbatools.io/wp-content/uploads/2020/01/cliconfg.png?resize=800%2C609&ssl=1)](https://dbatools.io/wp-content/uploads/2020/01/cliconfg.png?ssl=1)

SQL Native Client provides cliconfg.exe but I think it's also built into Windows. I've yet to find an OS that doesn't have cliconfg on it – and I tried all the way back to Windows 2003! So if SQL Client Aliases seem useful to you, you're in luck.

While you can manage SQL Client Aliases using the GUI, I prefer using dbatools which helps me avoid logging into multiple servers at once, and creates both the 32-bit and 64-bit aliases at once.

# using dbatools

I find SQL Client Aliases most useful for facilitating easy migrations and using them is even recommended as a best practice in the [SharePoint world](https://veronicageek.com/sharepoint/sharepoint-2013/configure-sql-aliases-for-sharepoint-server/2018/04/).

First, I check all of my servers to see which aliases are currently setup.

```
Get-DbaClientAlias -ComputerName web01, web02, web03
```

Then, I'll either remove old ones using something like this, which allows me to select the aliases I want to remove.

```
Get-DbaClientAlias -ComputerName web01, web02, web03 | Out-GridView -Passthru |  Remove-DbaClientAlias
```

Then I create my aliases as required. Note that the aliases and server names can be formatted in a number of ways. Both named instances and specifying a port numbers is supported.

```
New-DbaClientAlias -ComputerName web01, web02, web03 -ServerName sql02 -Alias sql01
New-DbaClientAlias -ComputerName web01, web02, web03 -ServerName sql02\sqlexpress19 -Alias sql01\sqlexpress14
New-DbaClientAlias -ComputerName web01, web02, web03 -ServerName 'sql02,2383' -Alias 'sql01,2383'
```

By default, connections are created as TCP/IP. Want to use named pipes? That's also possible.

```
New-DbaClientAlias -ServerName sqlcluster\sharepoint -Alias sp -Protocol NamedPipes
```

If you're familiar with named pipe aliases, you may remember that it creates a funky string. Don't worry, we take care of that for you. Just pass the ServerName and Alias as you would with TCP/IP and we'll build the named pipe string for you.

Now that I've created all of my required aliases, let's take a look at them using `Get-DbaClientAlias` and `Out-GridView`. Note that when I don't specify `-ComputerName`, the command executes against my local machine, in this case, WORKSTATIONX.

[![getclientalias](https://dbatools.io/wp-content/uploads/2020/01/getclientalias.png?resize=694%2C232&ssl=1)](https://dbatools.io/wp-content/uploads/2020/01/getclientalias.png?ssl=1)

# try it out

Test this out yourself – create a new alias, then use dbatools, Azure Data Studio or SSMS to connect to the new server using the old name. In the example below, I've migrated sql2014 to sql2016 then will use the sql2014 alias to connect.

![image](https://user-images.githubusercontent.com/8278033/72148600-8574d880-33a1-11ea-8fca-762be02db2de.png)

Automating your migrations just got even easier! For more information, check out our built-in help using `Get-Help Get-DbaClientAlias -Detailed`.

- Chrissy
