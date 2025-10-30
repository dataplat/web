---
title: "Three Ways to Track Logins Using dbatools"
date: 2018-04-10
author: "Chrissy LeMaire"
lastmod: 2025-10-30
slug: "track-logins"
aliases:
  - /track-logins/
  - /track-logins/index.html
categories: [announcements]
tags: [party]
draft: false
---

Years ago, I wrote Watch-DbaDbLogin which keeps an inventory of accounts, hosts and programs that log into a SQL Server. It was pretty crude, but helped immensely during my migration, as this inventory ensured that my documentation was in order and no unexpected downtime would occur.

I found that about 80-90% of logins/applications were covered within 48-hours, but two months of data gave me total confidence.

![](/images/img_5ac54a4297b52.png)

I always wanted to update the command, though I'm not sure Watch-DbaDbLogin is still within the scope of the module. It'll likely remove it in dbatools 1.0 so please accept this far cooler post in its place.

There are several ways to capture logins, all with their own pros and cons. In this post, we'll outline four possibilities: default trace, audits, extended events and session enumeration.

**Note:** The code in this post requires dbatools version 0.9.323. I found two bugs while testing sample scenarios 😔 Also, this post addresses tracking logins for migration purposes, not for security purposes. Edit the where clauses as suitable for your environment.

## Using a Default Trace

Using the default trace is pretty lightweight and backwards compatible. While I generally try to avoid traces, I like this method because it doesn't require remote access, it works on older SQL instances, it's accurate and reading from the trace isn't as CPU-intensive as it would be with an Extended Event.

#### Set Up the SQL Table

Basically, no matter which way you track your logins, you'll need to store them somewhere. Below is some T-SQL which sets up a table that is ideal for bulk importing (which we'll do using `Write-DbaDataTable`).

The table is created with an index that ignores duplicate *sessions*. When `IGNORE_DUP_KEY` is ON, a duplicate row is simply ignored. So we're going to setup a clustered index using SqlInstance, LoginName, HostName, DatabaseName, ApplicationName and StartTime. Then the collector will send a bunch of rows via bulkcopy to the table, and the table will ignore the dupes.

```powershell
# This creates a "watchlogins" in the "inventory" database
$sql = "CREATE TABLE watchlogins (
    SqlInstance varchar(128),
    LoginName varchar(128),
    HostName varchar(128),
    DatabaseName varchar(128),
    ApplicationName varchar(256),
    StartTime datetime
)

-- Create Unique Clustered Index with IGNORE_DUPE_KEY=ON to avoid duplicates
CREATE UNIQUE CLUSTERED INDEX [ClusteredIndex-Combo] ON watchlogins
(
    SqlInstance ASC,
    LoginName ASC,
    HostName ASC,
    DatabaseName ASC,
    ApplicationName ASC,
    StartTime ASC
) WITH (IGNORE_DUP_KEY = ON)"

# Execute your SQL - in this case, my centralized collection server is localhost
Invoke-DbaQuery -SqlInstance localhost -Query "CREATE DATABASE inventory"
Invoke-DbaQuery -SqlInstance localhost -Database inventory -Query $sql
```

To clarify, "duplicate" logins may show up, but not duplicate sessions. Watch-DbaDbLogin only recorded the first time it ever saw a login/db/host/app combination which many people found to be less useful, especially if you run the login tracker for years. What if a login became stale?

If you'd like the first login only, remove `StartTime ASC` from the index.

#### Set Up the Default Trace

```powershell
# Set all of your servers
$servers = "sql2014","sql2016","sql2017"

# Check to see if default trace is enabled
$servers | Get-DbaSpConfigure -ConfigName DefaultTraceEnabled |
    Where-Object RunningValue -eq $false | Set-DbaSpConfigure -Value $true
```

#### Set Up the Collector

Next, you'll want to setup a collector as a scheduled [SQL Agent Job](https://dbatools.io/agent).

```powershell
# Exclude noise using T-SQL syntax - customize for your environment
$where = "DatabaseName is not NULL
and DatabaseName != 'tempdb'
and SERVERPROPERTY('MachineName') != HostName
and ApplicationName not like 'dbatools%'
and ApplicationName not like 'Microsoft SQL Server Management Studio%'
and ApplicationName not like '\[%\].Net SqlClient Data Provider' ESCAPE '\'" # ignore sharepoint guid stuff

# Collect the results into a variable so that the bulk import is supafast
$results = $servers | Get-DbaTrace -Id 1 | Read-DbaTraceFile -Where $where |
    Select-Object SqlInstance, LoginName, HostName, DatabaseName, ApplicationName, StartTime

# Bulk import to the centralized database in an efficient manner (piping would write line by line)
if ($results) {
    Write-DbaDataTable -InputObject $results -SqlInstance localhost -Database inventory -Table watchlogins
}
```

How often should you run the job? It depends. I have one server that has login information going back to November. But I've found that SharePoint or System Center dedicated instances only have about 20 minutes worth of login data in the default trace.

How long does the collection take? Polling 15 servers took 14 seconds to read 55,000 records and 18 seconds to write that data. Of the 55,000 records, only 115 were unique!

## Using a SQL Server Audit

Audits are cool because [audits](https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-server-audit-transact-sql) can "force the instance of SQL Server to shut down, if SQL Server fails to write data to the audit target for any reason". This ensures that 100% of your logins are captured. But my requirements for collecting **migration information** aren't that high and I haven't found the magical Audit Spec that only logs what I need. Here's what the .sqlaudit file for `SUCCESSFUL_LOGIN_GROUP` looks like when you rename it to .xel and open it.

![](/images/audit.jpg)

Eh, I'm missing so much stuff. And since Audits are Extended Events anyway, and I have more control over what I do and don't want to see, we'll skip right to Extended Events.

## Using Extended Events

You can also use Extended Events. This option is pretty cool but collecting the data does require UNC access for remote servers.

#### Set Up the SQL Table

```powershell
# Create the table with a special index
$sql = "CREATE TABLE watchlogins (
    server_instance_name varchar(128),
    server_principal_name varchar(128),
    client_hostname varchar(128),
    [database_name] varchar(128),
    client_app_name varchar(256),
    timestamp datetime
)

-- Create Unique Clustered Index with IGNORE_DUPE_KEY=ON to avoid duplicates
CREATE UNIQUE CLUSTERED INDEX [ClusteredIndex-Combo] ON watchlogins
(
    server_instance_name ASC,
    server_principal_name ASC,
    client_hostname ASC,
    [database_name] ASC,
    client_app_name ASC,
    timestamp ASC
) WITH (IGNORE_DUP_KEY = ON)"

# Execute your SQL - in this case, my centralized collection server is localhost
Invoke-DbaQuery -SqlInstance localhost -Query "CREATE DATABASE inventory"
Invoke-DbaQuery -SqlInstance localhost -Database inventory -Query $sql
```

#### Login Tracker Template

We've provided a "Login Tracker" Extended Event session template that you can easily add to your estate.

![](/images/img_5ac54b594aee5.png)

This template creates a session that:

- Is initiated by sql_statement_starting event
- Collects the minimum possible columns
- Ignores connections from dbatools and SSMS
- Ignores queries to tempdb
- Ignores system queries
- Keeps 50 MB of data on disk (10×5)

I chose sql_statement_starting because it's the only one that I found that actually included the database name. If this doesn't work for you, you can modify then export/import the modified Session. If you have a better suggestion, I'd love that. Please let me know; I kinda feel like this one is overkill.

#### Set Up the XESession

```powershell
# Specify your servers
$servers = Get-DbaRegServer -SqlInstance sql2017

# Import the 'Login Name' XESession Template available in dbatools 0.9.320 and above
$sessions = Get-DbaXESessionTemplate -Template 'Login Tracker' | Import-DbaXESessionTemplate -SqlInstance $servers

# Set each one to auto-start
foreach ($session in $sessions) {
    $session.AutoStart = $true
    $session.Alter()
}
```

#### Set Up the Collector

```powershell
# Collect the results into a variable so that the bulk import is supafast
$results = $servers | Get-DbaXESession -Session 'Login Tracker' | Read-DbaXEFile |
    Select-Object server_instance_name, server_principal_name, client_hostname, database_name, client_app_name, timestamp

# Bulk import to the centralized database in an efficient manner (piping would write line by line)
Write-DbaDataTable -InputObject $results -SqlInstance localhost -Database inventory -Table watchlogins
```

#### UNC Access

So instead of placing the burden of XML shredding on the CPU of the destination SQL instance, `Read-DbaXEFile` uses the local resources. It does this by using the `RemoteTargetFile` which is available in `Get-DbaXESession` but is not a default field. To unhide non-default fields, pipe to *SELECT **.

![](/images/session.jpg)

Keep in mind that the entire file is read each time you enumerate. Which is not a big deal, but should be considered if you have millions of logins.

Note that I did set a max on the Login Tracker file size to 50 MB so if you want to modify that, you can use PowerShell or SSMS (Instance ➡ Management ➡ Extended Events ➡ Sessions ➡ Login Tracker ➡ right-click Properties ➡ Data Storage ➡ Remove/Add). There is no dbatools command available to do this in PowerShell yet, so you'll have to do it manually until it's added.

## Using Session Enumeration

This one requires no setup at all, but only captures whoever is logged in at the time that you run the command. This approach is what I originally used in Watch-DbaDbLogin (scheduled to run every 5 minutes) and it worked quite well.

So if you've never seen the output for [Get-DbaProcess](https://dbatools.io/Get-DbaProcess), which does session enumeration, it's pretty useful. If you'd like something even more lightweight that still gives you most of the information you need, you can use [$server](https://dbatools.io/Connect-DbaInstance).EnumProcesses()

![](/images/process.jpg)

Actually, scratch all that. Let's go with some lightweight, backwards-compatible T-SQL that gets us only what we need and nothing more. Honestly, of all the ways, I've personally defaulted back to this one. It's just so succinct and efficient. There is the possibility that I'll miss a login, but this isn't a security audit and really, I inventoried 100% of the logins I needed for my last migration.

## Set Up the SQL Table

```powershell
# This creates a "watchlogins" in the "inventory" database
$sql = "CREATE TABLE watchlogins (
    SqlInstance varchar(128),
    Login varchar(128),
    Host varchar(128),
    [Database] varchar(128),
    ApplicationName varchar(256),
    StartTime datetime
)

-- Create Unique Clustered Index with IGNORE_DUPE_KEY=ON to avoid duplicates
CREATE UNIQUE CLUSTERED INDEX [ClusteredIndex-Combo] ON watchlogins
(
    SqlInstance ASC,
    Login ASC,
    Host ASC,
    [Database] ASC,
    ApplicationName ASC,
    StartTime ASC
) WITH (IGNORE_DUP_KEY = ON)"

# Execute your SQL - in this case, my centralized collection server is localhost
Invoke-DbaQuery -SqlInstance localhost -Query "CREATE DATABASE inventory"
Invoke-DbaQuery -SqlInstance localhost -Database inventory -Query $sql
```

## Set Up the Collector

```powershell
# Specify your servers
$servers = "sql2014","sql2012","sql2016","sql2017"

# Setup the T-SQL
$sql = "SELECT SERVERPROPERTY('ServerName') AS SqlInstance, login_name as [Login], [host_name] as Host,
DB_NAME(p.dbid) as [Database], s.[program_name] as Program, s.login_time as LoginTime
FROM sys.dm_exec_sessions s inner join sys.sysprocesses p on s.session_id = p.spid
WHERE p.dbid is not NULL
and DB_NAME(p.dbid) != 'tempdb'
and SERVERPROPERTY('MachineName') != [host_name]
and s.[program_name] not like 'dbatools%'
and s.[program_name] not like 'Microsoft SQL Server Management Studio%'
and s.[program_name] not like '\[%\].Net SqlClient Data Provider' ESCAPE '\'"

# Collect relevant results
foreach ($instance in $servers) {
    $results = Invoke-DbaQuery -SqlInstance $instance -Query $sql
    if ($results) {
        Write-DbaDataTable -InputObject $results -SqlInstance localhost -Database inventory -Table watchlogins
    }
}
```

## Testing Your Results

If you're testing the scripts on a non-busy system like I did, you may not get any results back because we're ignoring connections from dbatools and SQL Server Management Studio.

If you'd like to ensure some results, just run this before performing a collection. This connects to SQL Server using a fake client name and performs a query that gathers database names.

```powershell
$server = Connect-DbaInstance -SqlInstance sql2017 -ClientName 'My test client'
$server.Databases.Name
```

## Scheduling

To schedule the collection, you can use my favorite method, SQL Server Agent. I wrote about this in-depth in a post, [Scheduling PowerShell Tasks with SQL Agent](https://dbatools.io/agent/).

During my own migration, I used session enumeration and setup the collector to run every 5 minutes. With Traces or Extended Events, you can collect the logins far less frequently since they are stored on the remote server.

Hope this was helpful!
Chrissy
