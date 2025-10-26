---
title: "Stuck on Older Versions of SQL Server? Check Out Our Trace Commands."
date: 2018-05-31
author: "Chrissy LeMaire"
slug: "traces"
aliases:
  - /traces/
  - /traces/index.html
categories: [announcements]
tags: []
draft: false
---

If you're still using super old versions of SQL Server and don't have access to awesome [XEvents](/xevents), we've got some commands to help simplify trace management.

## Before I Begin

Just a quick note, if you use newer versions of SQL Server and haven't seen the [XEvents Profiler](https://docs.microsoft.com/en-us/sql/relational-databases/extended-events/use-the-ssms-xe-profiler?view=sql-server-2017) in SSMS 17, it's awesome! In my experience, it's much faster than using Profiler and just as useful.

Sadly, however, it's only available for SQL Server version 2012 and up.

![](/images/xe3.png)

## On to Traces

Traces are less exciting than Extended Events, but PowerShell makes them kinda fun to work with (at least for me). As with most of our commands, multiple servers are supported.

Check out the list of traces across my lab. This information was gathered in 324ms!

![](/images/traces3.png)

Note that SQL Server 2000 is not in the result set, as SQL 2000 does not support sys.traces 🤩

### Get-DbaTrace

The above screenshot contains the results of Get-DbaTrace. This basically returns the results of `select * from sys.traces`. Here's some sample usage:

```powershell
# Get all traces on sql2017
Get-DbaTrace -SqlInstance sql2017

# Get the default trace on sql2016
Get-DbaTrace -SqlInstance sql2016 -Default

# Get the traces with ID 2 on both sql2016 and sql2017
Get-DbaTrace -SqlInstance sql2016, sql2017 -Id 2
```

![](/images/detailedtrace.png)

### Read-DbaTraceFile

Next command is Read-DbaTraceFile, which is used to read the contents of the trace file. This basically returns the results of `select * from [fn_trace_gettable]('$file', DEFAULT)`. Here's some sample usage:

```powershell
# Read every trace file on sql2014
Get-DbaTrace -SqlInstance sql2014 | Read-DbaTraceFile

# Read the tracefile C:\traces\big.trc, stored on sql2016. Filter only results that have master or tempdb as the DatabaseName.
Read-DbaTraceFile -SqlInstance sql2016 -Database master, tempdb -Path C:\traces\big.trc

# Read the tracefile C:\traces\big.trc, stored on sql2016. Filter only results that have master or tempdb as the DatabaseName and that have 'EXEC SP_PROCOPTION' somewhere in the text.
Read-DbaTraceFile -SqlInstance sql2016 -Database master, tempdb -Path C:\traces\big.trc -TextData 'EXEC SP_PROCOPTION'

# Read the tracefile C:\traces\big.trc, stored on sql2016. Filter only results where LinkServerName = myls and StartTime is greater than '5/30/2017 4:27:52 PM'.
Read-DbaTraceFile -SqlInstance sql2016 -Path C:\traces\big.trc -Where "LinkedServerName = 'myls' and StartTime > '5/30/2017 4:27:52 PM'"
```

![](/images/tracefile.png)

### Remove-DbaTrace

Next command is Remove-DbaTrace, which is used to stop and remove a trace. This command basically executes `sp_trace_setstatus $traceid, 0` then `sp_trace_setstatus $traceid, 2`. Here's some sample usage:

```powershell
# To stop and remove all traces on sql2008
Remove-DbaTrace -SqlInstance sql2008

# To stop and remove the trace with id 2 on sql2008
Remove-DbaTrace -SqlInstance sql2008 -Id 2

# To stop and remove selected traces on sql2008 using Out-GridView
Get-DbaTrace -SqlInstance sql2008 | Out-GridView -PassThru | Remove-DbaTrace
```

![](/images/remove.png)

### Start-DbaTrace

Next command is Start-DbaTrace, which is used to start one or more traces. This command basically executes `sp_trace_setstatus $traceid, 1`. Here's some sample usage:

```powershell
# To start all traces on sql2008
Start-DbaTrace -SqlInstance sql2008

# To start the trace with ID 2 on sql2008
Start-DbaTrace -SqlInstance sql2008 -Id 2

# To start selected traces on sql2008 using Out-GridView
Get-DbaTrace -SqlInstance sql2008 | Out-GridView -PassThru | Start-DbaTrace
```

![](/images/start.png)

### Stop-DbaTrace

Next command is Stop-DbaTrace, which is used to stop one or more traces. This command basically executes `sp_trace_setstatus $traceid, 0`. Here's some sample usage:

```powershell
# To stop all traces on sql2008
Stop-DbaTrace -SqlInstance sql2008

# To stop the trace with ID 2 on sql2008
Stop-DbaTrace -SqlInstance sql2008 -Id 2

# To stop selected traces on all servers within $serverlist using Out-GridView
Get-DbaTrace -SqlInstance $serverlist | Out-GridView -PassThru | Stop-DbaTrace
```

![](/images/stop.png)

## PowerShell Is Awesome

These commands really highlight my favorite thing about managing SQL Server with PowerShell. First, you can manage multiple servers as easily as managing one, and the naming convention is straight forward and easy to remember.

Even after years of using traces, I always had to look up the syntax for `sp_trace_setstatus` or `fn_trace_gettable`. Now, though, it's as easy as remembering Get, Start, Stop, Read and Remove 👍

\- Chrissy
