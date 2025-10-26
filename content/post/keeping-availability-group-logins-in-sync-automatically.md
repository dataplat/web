---
title: "Keeping Availability Group Logins in Sync Automatically"
date: 2019-05-20
author: "Andreas Schubert"
slug: "keeping-availability-group-logins-in-sync-automatically"
aliases:
  - /keeping-availability-group-logins-in-sync-automatically/
  - /keeping-availability-group-logins-in-sync-automatically/index.html
categories: [announcements]
tags: []
draft: false
---

I am Andreas Schubert and I am working as a Principal Consultant and Database Reliability Engineer for SQL Server & Azure for multiple national and international companies. My focus is on implementing and operating complex 24/7 SQL environments with tens and hundreds of servers and multi-terabyte databases.

Welcome to a quick post that should help you operate your SQL Server environment more consistently and reduce manual, repetitive work.

## The Problem

When you are running SQL Server Availability Groups, one of the most cumbersome tasks is to ensure that all logins are synchronised between all replicas. While not exactly rocket science, it is something that quickly means a lot of work if you are managing more than one or two Availability Groups.

Wouldn't it be nice to have a script that is flexible enough to

- be called by only specifying the Availability Group Listener
- detect all replicas and their roles automatically
- connect to the primary, read all SQL logins and apply them to EVERY secondary automatically?

Well, dbatools to the rescue again.

## The Solution

With dbatools, such a routine takes only a few lines of code.

The below script connects to the Availability Group Listener, queries it to get the current primary replica, as well as every secondary replica and then synchronizes all logins to each secondary.

In the template code, no changes are actually written due to the -WhatIf switch, so that you can safely test it to see what changes would be committed.

```powershell
<#
    Script : SyncLoginsToReplica.ps1
    Author : Andreas Schubert (http://www.linkedin.com/in/schubertandreas)
    Purpose: Sync logins between all replicas in an Availability Group automatically.
    --------------------------------------------------------------------------------------------
    The script will connect to the listener name of the Availability Group
    and read all replica instances to determine the current primary replica and all secondaries.
    It will then connect directly to the current primary, query all Logins and create them on each
    secondary.

    Attention:
    The script is provided so that no action is actually executed against the secondaries (switch -WhatIf).
    Change that line according to your logic, you might want to exclude other logins or decide to not drop
        any existing ones.
    --------------------------------------------------------------------------------------------
    Usage: Save the script in your file system, change the name of the AG Listener (AGListenerName in this template)
           and schedule it to run at your prefered schedule. I usually sync logins once per hour, although
           on more volatile environments it may run as often as every minute
#>

# define the AG name
    $AvailabilityGroupName = 'AGListenerName'

# internal variables
    $ClientName = 'AG Login Sync helper'
    $primaryInstance = $null
    $secondaryInstances = @{}


try {
    # connect to the AG listener, get the name of the primary and all secondaries
        $replicas = Get-DbaAgReplica -SqlInstance $AvailabilityGroupName
        $primaryInstance = $replicas | Where Role -eq Primary | select -ExpandProperty name
        $secondaryInstances = $replicas | Where Role -ne Primary | select -ExpandProperty name
    # create a connection object to the primary
        $primaryInstanceConnection = Connect-DbaInstance $primaryInstance -ClientName $ClientName
    # loop through each secondary replica and sync the logins
        $secondaryInstances | ForEach-Object {
            $secondaryInstanceConnection = Connect-DbaInstance $_ -ClientName $ClientName
            Copy-DbaLogin -Source $primaryInstanceConnection -Destination $secondaryInstanceConnection -ExcludeSystemLogins -WhatIf
        }
}
catch {
    $msg = $_.Exception.Message
    Write-Error "Error while syncing logins for Availability Group '$($AvailabilityGroupName): $msg'"
}
```

To make tools reusable, you could easily turn this script into a function by adding the 2 variables as parameters. Then you could call it from any other script like

```powershell
SyncLoginsToReplica.ps1 -AvailabilityGroupName YourAGListenerName -ClientName "Client"
```

For simplicity, I created this as a standalone script though.

I hope you find this post useful. For questions and remarks please feel free to [message me](http://www.linkedin.com/in/schubertandreas)!
