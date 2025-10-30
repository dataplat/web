---
title: "dbatools Advanced Configuration"
date: 2019-08-20
lastmod: 2025-10-29
author: "Claudio Silva"
slug: "configuration"
aliases:
  - /configuration/
  - /configuration/index.html
categories: [announcements]
tags: [dbatools Configs, dbatools Settings, defaults]
draft: false
---

Some dbatools functionality that has not been talked about much on the blog are our internal configuration options. This functionality was added back in October 2017. Kind of like how in ADS or SSMS, you can go to **File -> Preferences -> Settings** or **Edit -> Preferences** to edit advanced preferences and options, you can do something similar in dbatools!

Since dbatools is command-line based, you can view/modify your current options using our various config commands.

- Get-dbatoolsConfig
- Get-dbatoolsConfigValue
- Set-dbatoolsConfig
- Reset-dbatoolsConfig
- Import-dbatoolsConfig
- Export-dbatoolsConfig
- Register-dbatoolsConfig
- Unregister-dbatoolsConfig

We offer the ability to configure various options such as connection timeouts, datetime formatting and default export paths. All-in-all, we offer nearly 100 configuration options to help customize and enhance your dbatools experience.

## Exploring Our Options

To see a list of all of the options offered, open a PowerShell console and type `Get-dbatoolsConfig`.

![Get-dbatoolsConfig Output](/images/Get-DbatoolsConfig_Output.png)

In the image above, you can find some of the configuration options that you can set and will be widely used by dbatools.

These settings are scoped at the session-level. This means that if you use dbatools module within [SQL Agent jobs](https://dbatools.io/agent) and you have a different account to run it, you will need to set the options for the user/credential running your SQL Agent jobs. You can do this by logging into the server as that user and editing the options. You can also run PowerShell as that user by right-clicking the PowerShell logo in the taskbar, then pressing `Shift + right-click` over the PowerShell logo. There, you will be offered the option to run as a different user.

![Right-click menu](/images/rightclick.png)

Because there are nearly 100 configuration options, you can take advantage of `Out-Gridview` to easily view and sort them.

![Get-dbatoolsConfig OGV Output](/images/Get-DbatoolsConfig_OGV_Output.png)

You can then filter out the results in a easier manner.

![Get-dbatoolsConfig OGV Filtered Output](/images/Get-DbatoolsConfig_OGV__Filtered_Output.png)

### "I Saw That Settings Are Grouped by Modules. Which Modules Are Available?"

If you run the following command, you will find all the distinct modules we have:

```powershell
Get-dbatoolsConfig | Select-Object -Property Module -Unique
```

As you can see there are a good amount of different modules.

![Get-dbatoolsConfig Distinct Module Output](/images/Get-DbatoolsConfig_Distinct_Module_Output.png)

### Get-dbatoolsConfig vs. Get-dbatoolsConfigValue

You may have noticed two similarly named commands: `Get-dbatoolsConfig` and `Get-dbatoolsConfigValue`. Let's take a look at the differences.

### Get-dbatoolsConfig - A Rich Object

This command returns not only the value for a setting but also the module where it belongs and a useful description about it.
You can specify the `-FullName` (preferable because it is unique) or only the `-Name` (same as `-FullName` but without the prefix which is the module name).

`-FullName` example:

```powershell
Get-dbatoolsConfig -FullName sql.connection.timeout
```

`-Name` example:

```powershell
Get-dbatoolsConfig -Name connection.timeout
```

We also provide a validation script to a configuration. If you want to know how we validate it, you can see the `Validation` property, as example if you run:

```powershell
Get-dbatoolsConfig -FullName formatting.size.digits | Select-Object *
```

You will get:

![Get-dbatoolsConfig Full Output](/images/Get-DbatoolsConfig_FullOutput.png)

### Get-dbatoolsConfigValue - Is What You Are Thinking but We Have Interesting Options

If you just want to get the configured value as a string, you should use the `Get-dbatoolsConfigValue` command. This command is widely used internally within the dbatools module.

You may find that we also use the `-FallBack`, as stated on documentation "*A fallback value to use, if no value was registered to a specific configuration element. This basically is a default value that only applies on a "per call" basis, rather than a system-wide default.*"

Also if we don't want to get a *null* result we can specify the `-NotNull` parameter "*…the function will throw an error if no value was found at all.*"

### Set a New Configuration Value

To update a value you need to use the `Set-dbatoolsConfig` command. Unfortunately, you will not find documentation for this command on our [docs page](https://dbatools.io/commands). This is a known issue and it happens because that command is a cmdlet so the help is in the dbatools library itself.

For this particular case, you can and should rely on the `Get-Help` command.

```powershell
Get-Help -Name Set-dbatoolsConfig -Full
```

The easier way to update a value is provide the `-FullName` and `-Value` parameters. Example:

```powershell
Set-dbatoolsConfig -FullName formatting.size.digits -Value 3
```

Note that changes made by `Set-dbatoolsConfig` only persists for the current session. To permanently persist your changes, use `Register-dbatoolsConfig`. This command will be covered next.

### Let's See Other Examples

Want to clean the logs more frequently? Or keep them longer than the default of 7 days? Let's change to 8 days by setting the `Logging.MaxLogFileAge` configuration.

```powershell
Set-dbatoolsConfig -FullName Logging.MaxLogFileAge -Value (New-TimeSpan -Days 8)
```

### Want to Format Dates and Times Differently?

Take a look at the formatting section and find a couple of configurations to set the format as you would like.

If you want to change from `dd MMM yyyy` format to `yyyy MM dd` you can run the following command:

```powershell
Set-dbatoolsConfig -FullName formatting.date -Value 'yyyy MM dd'
```

### What About SQL Connection Timeout?

15 seconds (the default) is not enough? Change it using the `sql.connection.timeout` configuration.

```powershell
Set-dbatoolsConfig -FullName Logging.MaxLogFileAge -Value 30
```

### Do You Use dbatools with Azure?

There are a couple of configs that you can set in the Azure section. Take a look at them:

```powershell
Get-dbatoolsConfig -Module azure
```

Note that only a few of our commands have been tested to work with Azure. Better support for Azure is a long-term goal.

### Permanently Persist Changes

As mentioned previously, when you use the `Set` command, it is set only for your current session. To make the change permanent, use `Register-dbatoolsConfig`.

```powershell
Get-dbatoolsConfig | Register-dbatoolsConfig
```

This will write all configuration values, by default, in the registry.
Like all of our config commands, this works on Windows, Linux and macOS.

### Reset Configured Value to Its Default

To reset all of your configured values to dbatools default, run the following:

```powershell
Reset-dbatoolsConfig -FullName sql.connection.timeout
```

This will set the configuration value back to 15. To reset all of your dbatools options to default, run the following:

```powershell
Get-dbatoolsConfig | Reset-dbatoolsConfig
```

### What's New?
Since last dbatools version 1.0.32, new PowerShell Remoting configurations are available. You can read more about it on Claudio Silva's blog to learn more.

### Just Remember…

Next time you catch yourself thinking about changing some default behaviour remember to take a look into these configurations. If you found something that is not available for your use case, talk with us on Slack or just open a [feature request](https://github.com/dataplat/dbatools/issues/new?assignees=&labels=&template=Feature_request.md&title=) explaining your needs and we will try to guide/help you.

Thanks for reading!
Cláudio 🇵🇹
