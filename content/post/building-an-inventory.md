---
title: "building an inventory view of SQL Servers with dbatools"
date: 2019-04-25
author: "Andreas Schubert"
slug: "building-an-inventory"
aliases:
  - /building-an-inventory/
  - /building-an-inventory/index.html
categories: [announcements]
draft: false
---

## The situation

Hey all, I am Andreas Schubert and I am working as a Principal Consultant and Database Reliability Engineer for SQL Server & Azure for multiple national and international companies. My focus is on implementing and operating complex 24/7 SQL environments with tens and hundreds of servers and multi-terrabyte databases.

With the multitude of environments that I am operating, it's impossible to remember every server, every database or the multiple different ways they are interacting with each other. Therefore, one of the first things I do when taking over a consulting engagement is mapping out all those different bits of information.

Since the environments usually change pretty fast, my goal is to automate this process as much as possible.

In this series of posts, I will try to show you how I am implementing this. Of course, your requirements or implementations may differ, but hopefully this blog post can give you some ideas about your tasks too.

## Enter dbatools

Before dbatools existed, I had to rely on either the various monitoring solutions that my customers are using or on scripts created by myself. There are a lot of really great 3rd party tools out there that do an awesome job. Unfortunately, they all differ in how they are used or what information they report back. I needed something that is easy to implement, with as few dependencies as possible and works across all SQL Server versions. That's when I started using dbatools.

I immediately felt in love with how flexible it is. And boy, did its functionality grow fast!

Today, there are tons of commands available that cover almost all, of the various, areas SQL Server has to offer.

## The task

Before I dive into specific SQL Servers for in-depth analysis, I want to see some sort of inventory. The minimum information I would like to collect is:

- What server is SQL running on?
- What edition and patch level does it have?
- How many cores and RAM is it equipped with?
- How many databases are on the SQL, what size are they and what's the biggest one?
- Is the SQL part of an Availability Group? If yes, what's the name of the AG, what role does the SQL have right now and what's the underlying cluster object name?
- On top of that, I find that SQL Instances usually get a "pet name" alias. This means, when people within the company are talking about the SQL Server, they don't call it by it's machine name, but rather something like "the production database" or "the cluster". Technically not correct, but that's how it is happening. Due to that, my overview should also contain that alias to make it easier for me until I remember all the mappings.

Whoever has built an inventory script in the past knows that collecting the above information requires quite a few scripts. On top of that, the underlying DMVs have been changed between SQL versions, so you need to account for that. Microsoft has made that much easier with providing SMO (SQL Server Management Objects), a set of libraries that abstract away the complexity of collecting that information. Thankfully, Microsoft also enabled the dbatools team to include SMO in their framework. My example solution relies solely on dbatools (which works – not only but also – with SMO).

OK, enough talk, let's jump straight into the code.

## The solution

Right at the beginning of any of my scripts, I am defining the root of the script itself. I do this because I re-use a lot of functions.

Since we want to collect the information for more than one SQL Server instance, we will first build a list of SQL Servers. We could query the list of instances from a central management server, but for the purpose of this post – and portability- we will keep it simple. We will also assume the account executing this script will have sufficient permissions on each SQL Server instance and that it can connect via Windows Authentication. I generally prefer Windows Authentication over SQL Server authentication due to security concerns, but that is a completely separate topic.

The names of the Servers will be coming from a simple text file in our example. Just do me a favour and do NOT put your server list into an unsecured network location – again, we need to keep security in mind.

![Picture 1: our server list](https://dbatools.io/wp-content/uploads/2019/04/SQLInventory_servers.png)

Next, we need to load this file into our PowerShell session. For the sake of simplicity, I am loading it explicitely into my script. Normally, I have a variable populated with the servers in my profile, so I don't have to do this each time.

```powershell
$script:root = 'D:\AdminScripts'
$ProductionServers = Get-Content (Join-Path $script:root -ChildPath 'Production.txt')
```

Similar to the actual server list, I am using a text file "AliasList.txt" to store the alias information i mentioned above:

![Picture 2: the alias list](https://dbatools.io/wp-content/uploads/2019/04/SQLInventory_aliasList.png)

It's the same system: the name of the server or instance, followed by the alias name. Both values are separated by a semicolon. Loading and storing the alias information in a hash table is a simple one-liner in PowerShell:

```powershell
$AliasList = Get-Content (Join-Path $script:root -ChildPath 'AliasList.txt') | Select @{Name= "Instance";Expression={$_.ToString().Split(';')[0]}},@{Name= "Alias";Expression={$_.ToString().Split(';')[1]}}
```

Since I usually exclude system databases from my reports, I am defining a separate list of them as well for easier reuse:

```powershell
$systemDBs = "master","model","msdb","tempdb", "ReportServer","ReportServerTempDB"
```

At this point, we have all the preliminaries completed: A list of SQL Servers to query, a list of system databases that we will exclude and a list of alias information. Let's hit the servers and put the resulting data into a variable. I'll first show the complete code block, then we will talk about what it does.

```powershell
$rawData = $ProductionServers | Connect-DbaInstance | Sort-Object Computername | Select-Object ComputerName,
    # map the SQL version
    @{Name="SQL Version";Expression={ if ($_.VersionMajor -eq "11") {"SQL 2012"} elseif ($_.VersionMajor -eq "12") {"SQL 2014"} elseif ($_.VersionMajor -eq "13") {"SQL 2016"}
    elseif ($_.VersionMajor -eq "14") {"SQL 2017"} elseif ($_.VersionMajor -eq "15") {"SQL 2019"} elseif ($_.VersionMajor -lt "11") {"SQL 2008R2 or older"} else {"unknown"}}},
    ProductLevel, Edition,
    # RAM
    @{Name= "Memory (GB)";Expression={[math]::Round(($_.PhysicalMemory) / 1024)}},
    Processors, InstanceName,
    # total count of user dbs
    @{Name= "User DBs";Expression={($_.Databases | where {$_.Name -notin $systemDBs} | Measure).Count}},
    # total db size for all user dbs
    @{Name= "Total DB Size (GB)";Expression={[math]::Round(($_.Databases | where {$_.Name -notin $systemDBs} | Select size | Measure -Property Size -sum | Select sum).sum / 1024)}},
    # biggest DB (name, Size(GB)
    @{Name= "Biggest DB (GB)";Expression={"$($_.Databases | where {$_.Name -notin $systemDBs} | Sort Size -Descending | Select -ExpandProperty Name -First 1)
    ($([math]::Round(($_.Databases | where {$_.Name -notin $systemDBs} | Sort Size -Descending | Select -ExpandProperty Size -First 1)/1024)) GB)"}},
    # add the name of the Availability Group (if any)
    @{Name= "AG (s)";Expression={$_ | Select -ExpandProperty AvailabilityGroups | Select -ExpandProperty AvailabilityGroupListeners}},
    # add the current role of the server in the Availability Group (if any)
    @{Name= "Role (s)";Expression={$_ | Select -ExpandProperty AvailabilityGroups | Select -ExpandProperty LocalReplicaRole}}, ClusterName | Sort ComputerName
```

While this code may look complex, from a PowerShell point of view it's really pretty simple. First, we take the list of our `Productionservers` and pipe it to [Connect-DbaInstance](https://docs.dbatools.io/#Connect-DbaInstance) cmdlet. Connect-DbaInstance is the result of dbatools calling the SMO functionality, returning a complete SMO object of the SQL Server connected to.

Technically, the part with `$rawData = $ProductionServers | Connect-DbaInstance` already gives us all the information we need for our report. But since we don't want to return all the possible SMO properties and objects (that would result in a very long operation), we pipe the results of this directly to a Sort, followed by returning the actual information we are interested in:

```powershell
$rawData = $ProductionServers | Connect-DbaInstance | Sort Computername | Select ComputerName,
```

First we extract the Computername. On the next two lines, we map the SQL Server major version number to a clear-text string:

```powershell
# map the SQL version
@{Name="SQL Version";Expression={ if ($_.VersionMajor -eq "11") {"SQL 2012"} elseif ($_.VersionMajor -eq "12") {"SQL 2014"} elseif
($_.VersionMajor -eq "13") {"SQL 2016"} elseif ($_.VersionMajor -eq "14") {"SQL 2017"} elseif ($_.VersionMajor -eq "15") {"SQL 2019"}
elseif ($_.VersionMajor -lt "11") {"SQL 2008R2 or older"} else {"unknown"}}},
```

Right on, we extract the product level (e.g. RTM, SP1, …) and the Edition of the SQL Server (Standard, Enterprise…), followed by the available machine memory. Since this is returned in MB, we format and round it so that we get a nice number in GB (e.g. 12, 48 or 128).

Then we include the number of logical processors and the name of the instance – in case we have a named instance.

The number and size of user databases is a bit more complex. We need to query the "Databases" collection of the SMO Server object, filter out the system databases, get the size property of each object in the collection and measure it (count for the number and SUM for the combined size of the databases). Of course, we want those numbers to be nicely formatted and rounded to the full GB, so we add the formatting as well:

```powershell
# total count of user dbs
@{Name= "User DBs";Expression={($_.Databases | Where {$_.Name -notin $systemDBs} | Measure).Count}},
# total db size for all user dbs
@{Name= "Total DB Size (GB)";Expression={[math]::Round(($_.Databases | Where {$_.Name -notin $systemDBs} | Select size | Measure
-Property Size -sum | Select sum).sum / 1024)}},
```

To get the size of the biggest / largest database on the server, we use the same technique, only that we sort the database object list by size in descending order and take only the first object:

```powershell
# biggest DB (name, Size(GB)
@{Name= "Biggest DB (GB)";Expression={"$($_.Databases | Where {$_.Name -notin $systemDBs} | Sort Size -Descending | Select -ExpandProperty Name -First 1)
($([math]::Round(($_.Databases | Where {$_.Name -notin $systemDBs} | Sort Size -Descending | Select -ExpandProperty Size -First 1)/1024)) GB)"}},
```

The PowerShell pipeline can be really awesome!

Now let's add the information about the Availability Group Listener to our list. The AG information is another sub-object of the SMO collection which we first have to extract to get to the information below.

```powershell
# add the name of the Availability Group (if any)
@{Name= "AG (s)";Expression={$_ | Select -ExpandProperty AvailabilityGroups | Select -ExpandProperty AvailabilityGroupListeners}},
```

And exactly the same way for the role of the current replica as well as the cluster object name:

```powershell
# add the current role of the server in the Availability Group (if any)
@{Name= "Role (s)";Expression={$_ | Select -ExpandProperty AvailabilityGroups | Select -ExpandProperty LocalReplicaRole}}, ClusterName | Sort ComputerName
```

That's a whole lot of information retrieved by just one call to a PowerShell method. How awesome is that? Most of our script is logic around formatting and extracting information from sub-properties and objects.

And finally, we add the Alias to our result, matching them by computername:

```powershell
# add the alias to the rawdata
$rawData | % {
        $v = $_.ComputerName
        if ('' -ne $_.InstanceName){$v +="\$($_.InstanceName)"}
        $alias = $AliasList | Where {$_.Instance -eq $v } | Select -ExpandProperty Alias -First 1
        $_ | Add-Member -MemberType NoteProperty -Name AliasName -Value $alias
    }
```

The last step is to convert our object to HTML and add some css styling to it. Then we can either send it via eMail or store the generated html as a file for future reference.

```powershell
$css = Get-Content (Join-Path $script:root -ChildPath 'css.txt')
$html = $rawData | ConvertTo-Html -Fragment -PreContent "$($css)<h2>Instance KPI Summary</h2>" -PostContent "This summary has been generated with the help of the awesome PowerShell module dbatools!" | Out-File (Join-Path $script:root -ChildPath 'result.html')
```

The result is a nicely formatted html report:

![Picture 3: the result](https://dbatools.io/wp-content/uploads/2019/04/SQLInventory_results.png)

This was only a very basic example of what you can do with PSTools, PowerShell and a bit of magic piping. I hope you found this useful.

For questions and remarks please feel free to [message me](http://www.linkedin.com/in/schubertandreas) at any time!

You can find the complete script in my [GitHub repo](https://github.com/AndreasESchubert/Automation/blob/master/Inventory_Basic.ps1).
