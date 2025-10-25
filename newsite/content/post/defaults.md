---
title: "default parameter values"
date: 2018-08-15
slug: "defaults"
aliases:
  - /defaults/
  - /defaults/index.html
categories: [announcements]
tags: []
draft: false
---

When connecting to a SQL Server instance with alternative credentials, it can be tedious to repeat the SQL credential over and over.

The great news is that this repetition is not required, as it can be handled instead by `$PSDefaultParameterValues`

## Intro to $PSDefaultParameterValues

**$PSDefaultParameterValues** is a hashtable available in PowerShell that can set defaults for any command that you run. In it's simplest form, setting a default parameter value can look like this:

```ps
$PSDefaultParameterValues['Get-DbaDatabase:Verbose'] = $true
```

According to [Microsoft](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parameters_default_values?view=powershell-6), **$PSDefaultParameterValues**:

- Let you specify custom default values for any command
- Commands use the custom default value unless you specify another value
- Useful when you must specify the same value nearly every time

After running the above code, **Get-DbaDatabase** will show verbose output every time it's executed, without me having to specify **-Verbose**. If I need to override that verbose flag for some reason, I can simply add **-Verbose:$false** to my **Get-DbaDatabase** command.

![image](https://user-images.githubusercontent.com/8278033/44117888-d2730e3a-a014-11e8-955b-3a9985cd5ec5.png?w=800&ssl=1)

### Usage

Here's what I've used **$PSDefaultParameterValues** for:

- SqlCredential for SQL Authentication in docker
- ErrorAction Stop in Agent Jobs to ensure failures fail
- Confirm:$false in Agent Jobs to avoid prompting
- Verbose in Agent Jobs to see command output in the logs
- EnableException in dbachecks to ensure Pester tests fail
- SqlCredential for any alternative credential needs, actually
- Invoke-WebRequest Proxy and ProxyUseDefaultCredentials

You could even set a default SQL Server and get results from Get-DbaDatabase.

![image](https://user-images.githubusercontent.com/8278033/44118133-70744cf2-a015-11e8-9d04-2e7139c25b8b.png?w=800&ssl=1)

If you have configured a good amount of default parameters and want to see all of your default parameter values, you just need to run **$PSDefaultParameterValues** .

![image](https://user-images.githubusercontent.com/8278033/44141979-fed27ab4-a07e-11e8-9677-d2e8c7320184.png?w=800&ssl=1)

Oh, and it's no big deal if a command does not support the parameter, the parameter and its value just won't be passed. And also, like most things that support defaults, you can override the defaults, as mentioned previously.

## Syntax & real-world examples

[Michael Sorens awesome article on simple-talk](https://www.red-gate.com/simple-talk/sysadmin/powershell/powershell-time-saver-automatic-defaults/) goes in-depth about syntax, but here are some basics.

```ps
# EnableException for all dbatools commands using wildcards, overwrite previous $PSDefaultParameterValues
$PSDefaultParameterValues = @{ '*-Dba*:EnableException' = $true }

# Turn off confirmation prompts for all commands (useful in automation/scheduled jobs), add to existing $PSDefaultParameterValues
$PSDefaultParameterValues['*:Confirm'] = $false

# Use a saved credential for all commands, add to existing PSDefaultParameterValues
$sqlcredential = Import-CliXml -Path "$home\Documents\sqlcred.xml"
$wincredential = Import-CliXml -Path "$home\Documents\wincred.xml"

$PSDefaultParameterValues += @{
    '*-Dba*:SqlCredential' = $sqlcredential
    '*:Credential' = $wincredential
}

# Conditional default params, thanks Boe!
$PSDefaultParameterValues = @{
    "Format-Table:AutoSize" = {
        if ($host.Name -eq "ConsoleHost") { $true }
    }
}
```

In the real-world, I primarily use Default Parameter Values when running Scheduled Tasks/Agent Jobs. I like to see verbose output in my logs, so I enable that. I also make sure there are no confirmation prompts; that got me once as I waited over 24 hours for a job to complete ("daaang this code is slow") 😄

## Disabling $PSDefaultParameterValues

Your default parameter values can be temporarily disabled by adding the following key:

```ps
$PSDefaultParameterValues["Disabled"] = $true
```

And you can reenable it by setting Disabled to $false or by removing the Disabled key.

```ps
$PSDefaultParameterValues.Remove('Disabled')
```

## Persistence

Setting **$PSDefaultParameterValues** at the command-line only lasts during that session, meaning if you close your console, it will be reset. So, if you want it the default values to persist, you'll have to [add it to your profile](https://www.red-gate.com/simple-talk/sysadmin/powershell/persistent-powershell-the-powershell-profile/) (basically: **notepad $profile**, paste, save).

## Scopes are dope

In dbachecks, we [set $PSDefaultParameterValues](https://github.com/dataplat/dbachecks/blob/development/internal/scripts/postimport.ps1#L43) to EnableException across the board. This allows our Pester tests to fail when a failure occurs.

What's interesting is that setting the value within the module does not impact the end-user, so even after you import dbachecks, your **$PSDefaultParameterValues** will not be modified.

![image](https://user-images.githubusercontent.com/8278033/44141702-315748f8-a07e-11e8-8d5c-0b392d2a04c2.png?w=800&ssl=1)

## Resources

There are some great resources that go more in-depth about Parameters Default Values. Here are just a few:

- [Microsoft: About Parameters Default Values](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parameters_default_values?view=powershell-6)
- [Scripting Guys: Use PowerShell Default Parameter Values to Simplify Scripts](https://blogs.technet.microsoft.com/heyscriptingguy/2012/12/03/use-powershell-default-parameter-values-to-simplify-scripts/)
- [Boe Prox: Using PSDefaultParameterValues in PowerShell](https://learn-powershell.net/2013/12/11/using-psdefaultparametervalues-in-powershell/)
- [Michael Sorens: PowerShell Time Saver: Automatic Defaults](https://www.red-gate.com/simple-talk/sysadmin/powershell/powershell-time-saver-automatic-defaults/)

\- Chrissy
