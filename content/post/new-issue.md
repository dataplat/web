---
title: "submitting an issue"
date: 2018-03-14
author: "Shawn Melton"
slug: "new-issue"
aliases:
  - /new-issue/
  - /new-issue/index.html
categories: [announcements]
tags: []
draft: false
---

## An Issue Defined

In software development, an "issue" can be anything from you hit an error running an application or you get an unexpected result from an operation. You can also say an issue is [a spelling error in our documentation](https://dbatools.io/clean-cbh/). Our goal is to fix any "issue" whether it is a bug, an unexpected error (especially these) or considering a feature you think is missing from the module.

However, before we can fix it…you have to let us know.

![help me help you](https://dbatools.io/wp-content/uploads/2017/12/help-me-help-you.gif?resize=540%2C312&ssl=1)

## Where to begin

This is purely based on what type of an issue you need to submit, but all of them will start by going to our repository and filling out an issue on GitHub. You can do this in 4 easy steps:

![4 step process](https://dbatools.io/wp-content/uploads/2017/12/4stepprocess.png?resize=800%2C238&ssl=1)

1. Open your favorite browser, go to our GitHub issues shortlink [dbatools.io/issues](https://dbatools.io/issues)
2. Click on the "Issues" tab of the repository
3. Take a minute or two and search the current issues (helps us to keep duplicate count low; if you find a match [give it a thumbs up](https://github.blog/2119-add-reactions-to-pull-requests-issues-and-comments).)
4. If you do not find anything in the current issues, click on "new issue" button and fill out a new one.

The remainder of this post is going to do a review of filling out a new issue. The more information you can provide helps our unpaid developers in getting a fix!

### Before you start your new issue

Just like you submit a request to your own internal IT support, it helps to give as much information as you can up front when you submit an issue. Understand that this project is 100% community supported and we do this in our free time. If we get all the information up front, it is a huge time saver for us to fix the issue and return a resolution in a timely manner.

## Feature Request

A feature that you want is to submit is basically: tell the story of what problem you are looking to solve. When you open a new issue we have a template setup. You can delete everything up to where you see the text *## Feature Request*, below that, is where we need you to answer the question. Remember that even with a feature request the more details you can provide will help your cause in potentially getting the feature added.

### What problem or scenario would you like to solve with dbatools?

This is the primary question we need you to answer for the feature you desire. We provide some header sections but you can add/remove those if it helps to organize your thoughts. We are not asking for an essay mind you but think of it as if you were going down an elevator with one of us, you have about 2-3 minutes to verbally explain what you wanted. Obviously, you can provide more information and detail, but consider putting that conversation down as a synopsis so we know where you are coming from and such.

## Bugs and Errors

Bugs and errors are both a little different but in the area of submitting an issue, we will treat them the same for this post. While some errors may be expected we cannot really help you determine that unless you give us all the details. There are just some scenarios that you may find bugs and errors that we have not, or cannot account for due to limitations in our test lab(s). Every environment will be different and telling us about it all will aid in getting it fixed.

### A few general steps

The top section of our issue template has 3 items that we ask you to verify, sometimes this can resolve your problem right off the bat…sometimes not.

#### Verified running the latest release of dbatools?

We push a new release to our master branch and the PowerShell Gallery on average every 2-3 days (based on when [Chrissy's on vacation](https://dbatools.io/vacation/)). A release, on average, will always contain bug and error fixes, so just doing an `Update-Module dbatools` and restarting your PowerShell session may resolve your issue.

#### Verified errors are not related to permissions?

You would be surprised how often this can happen, so we have to ask. With the number of security issues, companies are having that affect their profits the whole least-privilege administration is more common nowadays. So if you know you are not sysadmin in SQL Server or local administrator if the command happens to touch the OS in some manner, it is a good thing to double-check before continuing.

#### Can duplicate in new/clean PowerShell session?

Not all modules play nice with each other. We have found in particular that the [sqlserver module](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-ps-module) can cause issues with our module loading properly. So if you happen to import modules prior to or after importing dbatools, it helps to identify that none of those modules are adversely affecting dbatools execution.

#### Version and Edition information

Just the basics. This information is pivotal when we get down to debugging bugs and errors, helps to ensure we have a similar setup in our lab(s) to more closely get root cause. As well, we may identify flavors of each that may not play well together (e.g. [credential prompts](https://github.com/dataplat/dbatools/issues/2003) when using CIM/WMI). In particular, if you happen to be working with the migration commands (Copy-Dba* commands) or moving an object in some other process, it can help to include the version information for your source and destination/target.

### Steps to Reproduce

Reproducible issues are the best kind, they also tend to be the ones that are the easiest to fix (tend to be mind you).

In order to reproduce the problem, we will need you to provide the command you are executing. If you can provide the values you are passing into the command it will help, but if for security reasons you cannot provide it all try to give some example values. You may also need to obfuscate the output from your PowerShell session if you want to provide screenshots.

#### Collecting logs and errors

We have added two commands to the module that can help us more quickly determine the issue if you are able to provide them.

##### Get-DbatoolsLog

This command simply outputs the messaging that has been generated since you imported the module into your session. This is one reason why duplicating your issue in a new/fresh console can help. Reissue the command and let the error or bug occur again, then run this command and you will see all the output generated from the command. This output includes an internal command that may have been executed as well.

##### New-DbatoolsSupportPackage

This command will generate a compressed file of collected information from the client machine, one you are using dbatools on. Think of this like you submit a support ticket to Microsoft support, they will have your run a few utilities on the offending machine to let it collect various logs and in-memory information. We do not capture as much as Microsoft, but information pertinent to the PowerShell session you have in use. I encourage you to run this and review the contents of that compressed file before attaching to an issue; ensure you are not violating any security policies.

##### Error record

This is a quick and dirty method and depends on the number of errors you may have encountered. PowerShell has a buffer or cache that errors from your PowerShell session are stored in. Checking this cache of errors right after you encounter an error will let you get the low down on what happened.

In order to see this you simply need to execute `$error`, that variable will contain the recent errors. To pull out the last error that happened you can run the following line:

```powershell
$error[0] | Select-Object *
```

## Closure

Just to give some closure…The process that follows once you submit an issue will on average be:

1. One of the team will post the issue either verifying the information, providing some things to try, or confirming the issue.
2. Once the issue is confirmed that a code change will be required, as time permits, a developer will take on getting the code fixed.
3. You will see the issue closed either by the developer or once the change is committed to the master branch.

Thanks for reading,
Shawn 🇺🇸
