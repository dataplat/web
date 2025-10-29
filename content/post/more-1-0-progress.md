---
title: "More 1.0 Progress"
date: 2018-11-22
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "more-1-0-progress"
aliases:
  - /more-1-0-progress/
  - /more-1-0-progress/index.html
categories: [announcements]
tags: [party]
draft: false
---

We've made even more progress in the past week! Here are some highlights of 0.9.520.

## Non-Breaking Changes

Aliases have been added for the changes, so these are not breaking changes:

- Mismatched **Copy** commands have been renamed to match their corresponding **Get** command names (ie. Copy-DbaCentralManagementServer is now Copy-DbaCmsRegServer).
- Most parameters named **Password** have been changed to **SecurePassword**. They've always been a `SecureString` data type but this makes that clear.
- The parameters **ExcludeAllSystemDb** and **ExcludeAllUserDb** have been changed to **ExcludeSystem** and **ExcludeUser**, respectively.

### Reset-DbaAdmin

Reset-DbaAdmin actually has output now! This was a big oversight for an otherwise incredibly useful and cool command.

![image](/images/reset-dbaadmin-output-1.png)

![image](/images/reset-dbaadmin-output-2.png)

I also added a `-SqlCredential` parameter to make passing secure passwords easier while still staying secure.

### Connect-DbaInstance

The **Credential** parameter in [Connect-DbaInstance](https://dbatools.io/Connect-DbaInstance) has been changed to **SqlCredential** and an alias to Credential has been added. Also, we fixed trusted domain support in both our internal and external Connect commands. So if you've ever had a problem with that before, it should work now.

## Breaking Changes

Aliases have not been created for commands using these parameters so these are breaking changes.

- Parameters and output columns containing `MB` have been changed to the parameter or column name without MB. For instance SizeMB -> Size. Corresponding documentation and examples have been updated as well.
- Parameters such as **NoSystemLogins** have been changed to **ExcludeSystemLogins**. The basic rule I followed when determining what would change was keep No for Verbs and Exclude for nouns: NoVerb, ExcludeNoun.

[Invoke-DbatoolsRenameHelper](https://dbatools.io/Invoke-DbatoolsRenameHelper) has been updated to handle the No to Exclude changes, so don't forget you can auto-update your scripts. Running it is as simple as:

`Get-ChildItem *.ps1 -Recurse | Invoke-dbatoolsRenameHelper`

Note that it does *not* work for the breaking changes released below (they are massive) or any of the Exclude parameters in Start-DbaMigration since the change wouldn't be a one-to-one and I'm not good with regex.

![image](/images/invoke-dbatoolsrenamehelper.png)

### Get-DbaProductKey

This command had been rewritten pretty much from the ground up. It no longer requires remote registry access, just SQLWMI and PowerShell Remoting. It also accepts servers from CMS natively instead of relying on the terribly named `-CmsServer` parameter. To find out more, check out [Get-DbaProductKey](https://dbatools.io/Get-DbaProductKey)

### Invoke-DbaDbShrink

[Invoke-DbaDbShrink](https://dbatools.io/Invoke-DbaDbShrink) now has better column names.

![image](/images/invoke-dbadbshrink-output.png)

### Import-DbaCsv

I'm so happy to announce that Import-DbaCsvToSql has been renamed to [Import-DbaCsv](https://dbatools.io/Import-DbaCsv) and is now usable and reliable for most CSVs. The original command was ultra fast, but it came at the price of reliability. I found myself never using a fast command because it so rarely handled my imperfect data. That's been fixed and the command is still pretty darn fast.

![image](/images/import-dbacsv-speed.png)

Writing more in-depth about this command is on my todo list, but I love that you can pipe in a bunch of CSVs from a directory and smash them into a database. Everything is done within a transaction, too, so if the import fails, the transaction is rolled back and no changes persist.

![image](/images/import-dbacsv-transaction.png)

## No More Breaking Changes for a While

K that should do it for breaking changes, at least until we're closer to 1.0.

We're trying our best to ensure you don't get too frustrated while we make necessary changes, and we thank you for your patience.

## Big Ol' Bug Bash 🐛

The bug bash is going incredibly well! We're now down from 90+ open bugs to **just 25 minor bugs** 😊 Huge thanks to everyone who has helped bring our count down to such a manageable number.

\- Chrissy
