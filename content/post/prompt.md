---
title: "Our Prompt"
date: 2017-10-25
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "prompt"
aliases:
  - /prompt/
  - /prompt/index.html
categories: [announcements]
tags: [party]
draft: false
---

A few months back, dbatools wizard Fred created a prompt that was so awesome, I never had to use `Measure-Command` again. It was cool enough that a number of us ended up adopting it, so I figured I'd share.

Performance is important to us so that's what the prompt is all about. Nothing fancy, just the current working directory and how long the command took to run.

{{< powershell-console >}}
[16:46:06] C:\github\dbatools> Get-DbaDatabase -SqlInstance sql2016 -Database master

ComputerName         : sql2016
InstanceName         : MSSQLSERVER
SqlInstance          : sql2016
Name                 : master
Status               : Normal
IsAccessible         : True
RecoveryModel        : Full
LogReuseWaitStatus   : Nothing
SizeMB               : 92
Compatibility        : Version130
Collation            : SQL_Latin1_General_CP1_CI_AS
Owner                : sa
LastFullBackup       : 10/11/2017 2:39:07 PM
LastDiffBackup       : 1/1/0001 12:00:00 AM
LastLogBackup        : 1/1/0001 12:00:00 AM

[16:46:21][740.43 ms] C:\github\dbatools> Get-DbaDatabase -SqlInstance sql2016 -Database master

ComputerName         : sql2016
InstanceName         : MSSQLSERVER
SqlInstance          : sql2016
Name                 : master
Status               : Normal
IsAccessible         : True
RecoveryModel        : Full
LogReuseWaitStatus   : Nothing
SizeMB               : 92
Compatibility        : Version130
Collation            : SQL_Latin1_General_CP1_CI_AS
Owner                : sa
LastFullBackup       : 10/11/2017 2:39:07 PM
LastDiffBackup       : 1/1/0001 12:00:00 AM
LastLogBackup        : 1/1/0001 12:00:00 AM

[16:47:19][110.55 ms] C:\github\dbatools>
{{< /powershell-console >}}

As you can see in the output above, the first time `Get-DbaDatabase` runs, it takes 740 ms. This is because we're caching the database names, login names, and some other auto-populated variables in the background.

When the command runs again, it takes a more reasonable 110ms to complete because it is not performing any caching.

Want this prompt for yourself? Here it is. Just `notepad $profile`, paste this in, save and restart your console. Note that you may have to restart ISE twice if you're using the ISE.

```powershell
function Prompt
{
    Write-Host "[" -NoNewline
    Write-Host (Get-Date -Format "HH:mm:ss") -ForegroundColor Gray -NoNewline

    try
    {
        $history = Get-History -ErrorAction Ignore
        if ($history)
        {
            Write-Host "][" -NoNewline
            if (([System.Management.Automation.PSTypeName]'Sqlcollaborative.Dbatools.Utility.DbaTimeSpanPretty').Type)
            {
                Write-Host ([Sqlcollaborative.Dbatools.Utility.DbaTimeSpanPretty]($history[-1].EndExecutionTime - $history[-1].StartExecutionTime)) -ForegroundColor Gray -NoNewline
            }
            else
            {
                Write-Host ($history[-1].EndExecutionTime - $history[-1].StartExecutionTime) -ForegroundColor Gray -NoNewline
            }
        }
    }
    catch { }

    Write-Host "] $($executionContext.SessionState.Path.CurrentLocation.ProviderPath)" -NoNewline
    "> "
}
```

What the heck is `DbaTimeSpanPretty`? I asked Fred for a pretty timespan and he created a C# type to make timespans a bit tidier and… pretty 😂

Thanks, Fred, for all the features!

\- Chrissy
