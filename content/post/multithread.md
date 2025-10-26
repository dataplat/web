---
title: "Multithreading Commands"
date: 2019-01-04
author: "Kin Shah"
slug: "multithread"
aliases:
  - /multithread/
  - /multithread/index.html
categories: [announcements]
tags: []
draft: false
---

In this age of many companies adopting the ideas of either DevOps or [SRE](https://landing.google.com/sre/) (Site Reliability Engineer) roles, there is constant need for automation. Mundane tasks like collecting metrics, alerts, server and database asset info into a central database on which you can do reporting is now a common task that many DBAs or system admins are performing.

In SQL Server world, we are fortunate to have a vibrant community of [PowerShell enthusiasts](https://dbatools.io/team) that have open sourced [dbatools](https://dbatools.io/download) – a community driven PowerShell module to automate database development and administration.

This begs a question..

## Why Do We Need Automation?

We need automation to get rid of repetitive tasks that we have to perform on a daily basis. It is often said:

> If you have to repeat it, better automate it.

This makes sense as the room for common errors is alleviated when the same steps you are taking are automated. Also, with ever increasing data needs, the infrastructure footprint is ever increasing. To meet this ever increasing demand, the only way for a team to scale is to adopt automation.

For example, being a SQL Server DBA, you might have been involved in server migration projects wherein you are tasked to migrate from older version of SQL server (SQL server 2008, SQL server 2008R2) to a more modern & supported version (SQL server 2014, 2016, 2017, etc.).

In the stone age (before dbatools), we as DBA's spent countless hours scripting pre-migration tasks like logins, SQL Agent jobs, linked servers, system database custom objects, resource governor settings, certificates, etc. Even doing all this effort, often we miss few critical things due to non-standard process. dbatools takes care of the entire migration including pre-migration steps and migrating all or few databases from one instance to another along with error handling and logging. This is awesome, isn't it?

Once good thing about dbatools is that it has lots of commands to get all kinds of information that you want to gather. The commands name have the prefix **Get-Dba\***. Another beauty is the ability to pipe the output of the commands and write to SQL tables using [Write-DbaDataTable](https://dbatools.io/Write-DbaDataTable) command.

In a large organization where you have hundreds of servers to manage and you often face a situation where you want to query all your SQL server estate. For example, checking total RAM and the max memory setting or you want to get version and service pack info for your entire SQL Server estate. Doing these tasks single threaded against a ton of servers is often painful because it takes lot of time!

## Multithreading to the Rescue

#### What Is Multithreading and How Does PowerShell Offer Multithreading?

In simple terms, multithreading is the ability to run multiple threads on same or separate processors at the same time resulting in parallel execution.

PowerShell provides many ways to allow multi-threading in your scripts. Let's explore the most common ways:

- **Background jobs:** A powerful way of allowing commands to run in the background and then retrieve the results later thereby freeing up the terminal and allowing the users to continue their work without interruption. Whenever a new job is started using `Start-Job`, it ends up spawning a new `powershell.exe` process which you can easily see using windows task manager or just running `Get-Process` command. This means that the more background jobs you run, the more `powershell.exe` processes are created which is a resource hog! Also, there is no ability to throttle the jobs (i.e. all jobs are started and executed at the same time). There is limited ability to manage multiple threads and have them share variables as well.

- **PowerShell Runspaces:** A powerful and flexible way of leveraging .NET's [`system.management.automation.runspaces`](https://docs.microsoft.com/en-us/dotnet/api/system.management.automation.runspaces?redirectedfrom=MSDN&view=powershellsdk-1.1.0) namespace that exposes variety of classes designed to create, manipulate and orchestrate a pool of PowerShell processes. In simple terms, think of Runspaces as containers where everything is contained or stored and ran in an asynchronous fashion.

#### How to Efficiently Leverage PowerShell Runspaces With High Performance and Less Overhead?

Boe Prox has open sourced his awesome [PoshRSJob module](https://github.com/proxb/PoshRSJob) that provides an alternative to native PowerShell jobs with greater performance and less overhead to run commands in the background, freeing up the console and allowing throttling on the jobs.

We can use this module to leverage multi-threading in dbatools as well. The PoshRSJob module is [well-documented](https://learn-powershell.net/2015/03/31/introducing-poshrsjob-as-an-alternative-to-powershell-jobs/), so in this blog post, I will just get into the details of how to leverage PoshRSJob module with dbatools.

As of writing this blog post, there are total of 514 functions in 0.9.722 version of dbatools out of which 192 are for fetching data (Get-Dba*) from your SQL server instances. How did I get those? Easy enough:

```powershell
# How many functions are there in dbatools?
Get-Command -Module dbatools -Type Function | Measure-Object

# How many functions are there in dbatools that fetch data from SQL Server instances?
Get-Command -Module dbatools -Verb Get | Where CommandType -eq Function | Measure-Object
```

Now let's say you are tasked to get all the databases that are part of a given Availability Group. There are two ways to approach this: the traditional (sequential) way and multithreading.

#### The Traditional Sequential Way

```powershell
# Get the list of servers. You can read directly from a text file or you can connect to your central database to get the list using tsql.
$servers = Get-Content D:\DBA\serverList.txt

# store credential in a variable which will be used for SQL authentication to your sql servers
$cred = Get-Credential -UserName sqladmin -Message "Enter your sqladmin Password"

# use foreach to loop through the collection and get the desired data
foreach ($server in $servers) {
    # here you can use any dbatools commands (Get-Dba*)
    Get-DbaAgDatabase -SqlInstance $server -SqlCredential $cred
}
```

#### Using PoshRSJob Module to Leverage Runspaces & Multithreading

```powershell
# Get the list of servers. You can read directly from a text file or you can connect to your central database to get the list using tsql.
$servers = Get-Content D:\DBA\serverList.txt

# store credential in a variable which will be used for SQL authentication to your SQL Servers
$cred = Get-Credential -UserName sqladmin -Message "Enter your sqladmin Password"

# PoshRSJob has throttle parameter. I usually keep it to the number of processors installed on the server
$throttle = $env:NUMBER_OF_PROCESSORS

# Multithread! See below for a breakdown
Start-RSJob -InputObject $servers -Throttle $throttle -ModulesToImport dbatools -ScriptBlock {
    Param($server)
    Get-DbaAgDatabase -SqlInstance $server -SqlCredential $Using:cred
}

# Get-RSJob will display all jobs that are currently available to include completed and currently running jobs.
# Receive-RSJob Gets the results of the Windows PowerShell runspace jobs in the current session. Also you can use -OutVariable variableName e.g. -OutVariable Results and then do $Results to get all the output
Get-RSJob | Where-Object {$_.State -like "Completed" -and $_.HasMoreData -like "False" -and $_.HasErrors -like "False"} | Receive-RSJob

# cleanup only the jobs that are completed, does not have more data and no errors
Get-RSJob | Where-Object {$_.State -like "Completed" -and $_.HasMoreData -like "False" -and $_.HasErrors -like "False"} | Remove-RSJob
```

#### Breakdown

`-InputObject $servers`

Here we are passing the collection item – `$servers` as an input object that will take that object and use it as the first parameter in the script block as long as you add a Param() block in it.

`Param($server)`

This is added so that the -InputObject collection can be used as the first parameter

`-ModulesToImport dbatools`

Here you can use any dbatools commands as all the commands are imported as part of the module import

`-SqlCredential $Using:cred`

This is pretty cool way of passing a local variable to the script block i.e. you can use variables from parent PS Process into PSJob's scriptblock

On a side note, if you want to get the results or output of `Start-RSJob` into a variable, you can do it using `$results = Get-RSJob | Receive-RSJob` or `Get-RSJob | Receive-RSJob -OutVariable Results` (now you can use `$Results` same like former example) and then you can work with the result set as usual, and even write the entire result set to a database using `Write-DbaDataTable`.

## Results

Below test shows the performance difference between Sequential Execution vs Multithreaded execution using PoshRSJob:

- Total Servers in the serverList.txt: 134
- Total No. of logical CPUs: 16

| dbatools command | Sequential Execution | PoshRSJob | PercentGain |
|---|---|---|---|
| Get-DbaAgDatabase | TotalSeconds: **123.13** | TotalSeconds: **30.75** | **300.42 %** |

**Note:** When running using `Start-Job`, the CPU is pegged to 100% (since it spawns individual `powershell.exe` processes and does not have native throttling option) and it uses almost all the available RAM than the PoshRSJob. The execution time for `Start-Job` is more than double and exhaust CPU and available RAM on the machine.

References:

- [Background jobs](https://docs.microsoft.com/en-us/powershell/developer/command/background-jobs)
- [Multi Threaded PowerShell Cookbook](https://www.codeproject.com/Tips/895840/Multi-Threaded-PowerShell-Cookbook)
- [PoshRSJob](https://github.com/proxb/PoshRSJob)

Thanks for reading !
~ **Kin Shah**

Get in touch [@TheRockStarDBA](https://twitter.com/TheRockstarDBA) or at [dba.se](https://dba.stackexchange.com/users/8783/kin?tab=profile)
