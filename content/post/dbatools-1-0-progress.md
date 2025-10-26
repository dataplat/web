---
title: "dbatools 1.0 Progress!"
date: 2018-11-14
author: "Chrissy LeMaire"
slug: "dbatools-1-0-progress"
aliases:
  - /dbatools-1-0-progress/
  - /dbatools-1-0-progress/index.html
categories: [announcements]
draft: false
---

Thanks to several of our team members, we're now [progressing quickly](https://dbatools.io/boh) towards dbatools 1.0! 🙌

The progress is so encouraging, I believe 1.0 is around the corner. Because of this, I wanted to let you all know that tomorrow, we'll start introducing breaking changes.

## Output Changes

Things like output and parameter names will change. For example, the output for the command [Get-DbaPrivilege](https://dbatools.io/Get-DbaPrivilege) will be updated. Currently, it looks like this:

![Get-DbaPrivilege output](https://user-images.githubusercontent.com/8278033/48320069-87180480-e615-11e8-8e7b-4ea3a5b9dd3d.png)

Privilege being repeated in the column names seems unnecessary, so it'll soon have shortened column names:

- LogonAsBatch
- InstantFileInitialization
- LockPagesInMemory

Tomorrow I'll be updating the max memory series:

- Get-DbaMaxMemory
- Set-DbaMaxMemory
- Test-DbaMaxMemory

This update includes updated output and parameter names. Basically, I removed the "MB" and updated the docs to let people know that the output and params are measured in megabytes.

## Parameter Name Changes

Sometime in the next month, I'll also be updating [Start-DbaMigration](https://dbatools.io/Start-DbaMigration) to more closely match the parameters of [Export-DbaInstance](https://dbatools.io/Export-DbaInstance). Parameters like `NoDatabases` and `NoLogins` will be replaced by `-Exclude Databases, Logins`.

So the functionality won't necessarily change, but if you have scheduled tasks or scripts that perform migrations, you will need to update your parameters once you update dbatools once these changes are made.

I'll be sending regular updates via email, but no more than once per day. You can [follow us](https://dbatools.io/twitter) on Twitter for more frequent updates.

\- Chrissy
