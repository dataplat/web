---
title: "Guidelines"
date: 2016-07-06
slug: "guidelines"
aliases:
  - /join-us/guidelines/
  - /join-us/guidelines/index.html
categories: []
tags: []
draft: false
---

Here are a few things to keep in mind when programming for dbatools.

## Minimum Requirements

One source of pride for this project is that it works on most systems. We at least try to make it work on SQL Server 2000, though sometimes it's not possible. SQL Server 2005 and above usually works well.

Also, remember that this module is intended for migrations and hence older systems, so PowerShell v3 is the base that we'll be using to program. Some modern methods and cmdlets won't be available to you, but it's a really solid version.

Often times, clusters have to be handled differently. Try to test your command against a cluster if you've got access. If not, we're working on things with Jenkins to help automate testing.

## Program Thoroughly and Optimistically

Does the user need a table to be created? Create it for them and populate the database name (dbatools) and table names with defaults.

Program as if there is a solution. Locked out of your SQL Server because of a bad logon trigger? Program as though you can somehow populate a list of logon triggers, because we can probably find a way 😄 Let's work together to find a way.

Is there something you always forget as a DBA like Trace Flags? Perhaps your command can have a dictionary or your command could be the dictionary.

## Use T-SQL Only When Appropriate

I can't emphasize this enough. SMO takes care of all the SQL commands for you, so use SMO by default. That way, the module will be compatible with all the different versions of SQL Server.

SMO can slow down on servers with thousands of databases, but we're optimistic we can get it to work quickly. Just give us a few weeks 😁

Don't know which SMO object you need? Look up the T-SQL syntax first; that's what I do. I needed to change the password for a credential, saw that it's [ALTER CREDENTIAL](https://msdn.microsoft.com/en-us/library/ms187923.aspx) in T-SQL and guessed that the issue could be resolved with [$credential.alter()](https://msdn.microsoft.com/en-us/library/ms204501.aspx) and sure enough that was it.

When is it appropriate to use T-SQL? When SMO can't be used. Like to find out supported features for a particular edition, in use right now by the database (stored in sys.dm_db_persisted_sku_features), if you need info from sys.key_encryptions or actually, if you want to detach a database but not modify the $databases collection. It happens, but it's rare.

## Don't Rely on SQLPS

Do not require the user to load SQLPS or the new awesome version of SQLPS, SqlServer. This is for a number of reasons, but [here's three](https://blog.netnerds.net/2016/03/can-we-get-these-3-sqlps-issues-fixed-before-sql-server-2016-rtms/). Remember, we program for the lowest common denominator and expect that the user is running old versions of things.

## Use These Templates

The GitHub repo, [dbatools-templates](https://github.com/dataplat/dbatools-templates) is dedicated to templates for commands. You can also look to similar commands for templates.

## Get Familiar with the Current Code

The code structure is as follows:

- [dbatools\](https://github.com/ctrlbold/dbatools/)
  - functions\
    - Copy-SqlDatabase.ps1
    - Copy-SqlLogin.ps1
    - DynamicParams.ps1
    - SharedFunctions.ps1
    - …
  - tests\
    - InModule.Help.Tests.ps1
  - dbatools.psd1
  - dbatools.psm1
  - LICENSE.txt
  - README.md

DynamicParams.ps1 stores all of the DynamicParameters. These are all of the functions that provide tab completion. Tab completion/dynamic parameters look like this:

![dropdown](/images/dropdown.gif)

SharedFunctions.ps1 are functions that are shared between the commands like Copy-SqlDatabase, etc.

I suggest examining both of these files to see what's available to you. Also, recall there's TONS of code for you to copy/paste from, and you're encouraged to do so. If you're duplicating any functionality, just look at similar functions and copy/paste away.

## This Is Important

In order to get your function to access the shared environment that dbatools creates, you must do the following.

- Create your .ps1 file from the template mentioned above and place it in the functions directory
- Add the function to dbatools.psd1 with the rest of the functions in FunctionsToExport=@()
- Reload the module (Import-Module .\dbatools.psd1 -Force)

This will allow your function to access all the other functions in SharedFunctions.ps1 that are not exported such as Connect-SqlServer.

Note that the .psd1 **should not** be included in your pull request because it causes conflicts. We will take care of adding your function to the psd1.

## Got Questions?

We're available in the [Slack](https://dbatools.io/slack) channel #dbatools and via email (clemaire@gmail.com)
