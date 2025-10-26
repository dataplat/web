---
title: "working with file sizes in dbatools"
date: 2019-09-12
author: "Chrissy LeMaire"
slug: "size"
aliases:
  - /size/
  - /size/index.html
categories: [announcements]
tags: []
draft: false
---

Within dbatools, you may notice file sizes are pretty and human-readable.

![disksize](https://dbatools.io/wp-content/uploads/2019/09/disksize.png?resize=800%2C370&ssl=1)

That was some C# based magic created by Microsoft PFE and creator of [PSFramework](http://psframework.org/), [Fred Weinmann](https://twitter.com/FredWeinmann). In the background, SQL Server often gives us different types of numbers to represent file sizes. Sometimes it's bytes, sometimes it's megabytes. We wanted to standardize the sizing in dbatools, and thus the `dbasize` type was born.

## Usage

This size type is cool because it looks beautiful, showing KB, MB, GB, TB and PB. But it's also packed with usable data behind-the-scenes. This can be seen when you expand the property, either by using `.ColumnName` or `Select -ExpandProperty ColumnName`.

![usedspace](https://dbatools.io/wp-content/uploads/2019/09/usedspace.png?resize=800%2C155&ssl=1)

This means that you don't have to parse the results to get the bits and bytes – it's all there in the background. Here's the code used in the above screenshot:

```powershell
# Evaluate UsedSpace details
Get-DbaDbSpace -SqlInstance sql2017 -Database master | Select -First 1 | Select -ExpandProperty UsedSpace
```

When using this type in practice, your code will likely look something like this:

```powershell
# Use the type with Where-Object
Get-DbaDbSpace -SqlInstance sql2017 | Where-Object { $_.UsedSpace.Megabyte -gt 10 }

# Write it to file using foreach
Set-Content -Path C:\temp\mb.csv -Value 'Name,UsedMB'
foreach ($file in (Get-DbaDbSpace -SqlInstance sql2017 -Database master)) {
    $name = $file.Database
    $usedmb = $file.UsedSpace.Megabyte
    Add-Content -Path C:\temp\mb.csv -Value "$name,$usedmb"
}

# Write it to CSV using calculated properties
Get-DbaDbSpace -SqlInstance sql2017 -Database master |
    Select-Object -Property Database, @{ Name = 'UsedMB'; Expression = {  $_.UsedSpace.Megabyte } } |
    Export-Csv -Path C:\temp\mb.csv -NoTypeInformation
```

## Configuration

You can also [configure](https://dbatools.io/config) the output. Want more than 2 numbers after the decimal points? Can do! Don't want the human-readable display by default? It can be disabled using `Set-DbatoolsConfig` 👍

```powershell
# Get the two properties you'll be working with
Get-DbatoolsConfig formatting.size.* | Out-GridView
```

This ultimately shows details for formatting.size.digits and formatting.size.style.

![sizeconfig](https://dbatools.io/wp-content/uploads/2019/09/sizeconfig.png?resize=800%2C100&ssl=1)

### formatting.size.digits

This setting controls how many digits are displayed after the decimal. By default, two digits are shown. Let's change that to four.

```powershell
# Change value to 4
Set-DbatoolsConfig -FullName formatting.size.digits -Value 4 | Register-DbatoolsConfig
```

Piping to `Register-DbatoolsConfig` persists the value across sessions. Otherwise, your digits would revert back to two when you create a new session.

![four](https://dbatools.io/wp-content/uploads/2019/09/four.png?resize=800%2C370&ssl=1)

Now you can see that there are 4 digits after the decimal! Cool. I didn't even realize this before writing this blog post 😄

### formatting.size.style

By default, we use the "Dynamic" styling size. This basically means that we'll show file sizes similar to way Explorer does: the biggest size is used. So if something is 2.5 megabytes, it won't use B or KB, but 2.5 MB.

Now let's disable styling altogether and show values in bytes, but only for the current session.

```powershell
# Removing formatting, show in bytes
Set-DbatoolsConfig -FullName formatting.size.style -Value plain
```

![plain](https://dbatools.io/wp-content/uploads/2019/09/plain.png?resize=800%2C370&ssl=1)

Note in the screenshot above that UsedSpace is now an unformatted number.

Prefer that everything be displayed in terabytes by default? We support that too.

```powershell
# Set default value to terabyte
Set-DbatoolsConfig -FullName formatting.size.style -Value Tb
```

Here are all the options available:

- Dynamic
- Plain
- Byte
- B
- Kilobyte
- KB
- Megabyte
- MB
- Gigabyte
- GB
- Terabyte
- TB

If you're wondering how I got that, I researched how to show an enum in PowerShell, found [this TechNet article](https://social.technet.microsoft.com/wiki/contents/articles/26436.how-to-create-and-use-enums-in-powershell.aspx) then executed:

```powershell
# Use .NET to enumerate the available values of SizeStyle
[System.Enum]::GetNames([Sqlcollaborative.Dbatools.Utility.SizeStyle])
```

Hope that helps with number formatting in dbatools! And thanks to Fred for such a beautiful, standardized way to show numbers 😊

\- Chrissy
