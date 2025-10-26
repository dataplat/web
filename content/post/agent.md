---
title: "Scheduling PowerShell Tasks with SQL Agent"
date: 2017-09-26
author: "Chrissy LeMaire"
slug: "agent"
aliases:
  - /agent/
  - /agent/index.html
categories: [announcements]
tags: [party]
draft: false
---

We've had a lot of people ask about the best way to schedule dbatools tasks in SQL Server Agent. I recently switched Agent from Task Scheduler and here's what I learned.

**tl;dr** for those of you who just want to skip the commentary of pros vs cons and head straight to the tutorial, click [Scheduling PowerShell Tasks using Agent's CmdExec](#tutorial).

## Task Scheduler

Task Scheduler was decent but ultimately, not as cool as SQL Server Agent for a number of reasons:

- Task Scheduler lacks credential management
- The console can't be completely hidden without administrator access
- Email on failure is a pain
- Logging is lackluster
- Scheduling is not as granular as the Agent

#### Credentials

With regards to credentials, you can add a task under another credential but it's so manual. Got fifteen scheduled tasks? Get ready to add that credential fifteen different times. Need to update the password? Yep, fifteen times.

![](/images/img_59c633160e02e.png)

Scheduling PowerShell tasks in Task Scheduler

Now, as [Fred Weinmann](http://allthingspowershell.blogspot.be/) pointed out, you can also use PowerShell itself to manage credentials in a [number](https://gallery.technet.microsoft.com/Encrypt-Credential-71c46d07) [of](https://www.powershellgallery.com/packages/CredentialManager/) [ways](https://github.com/Jaykul/BetterCredentials). But I prefer built-in management.

#### The Dreaded Popup Window

Next is the PowerShell window that pops up for a millisecond when tasks are running. You can avoid this by selecting "Run whether the user is logged in or not" but this requires Administrator access.

[The internet](https://stackoverflow.com/questions/1802127/how-to-run-a-powershell-script-without-displaying-a-window) has a bunch of other suggestions that are usually cautioned with "but this does show for a moment". A moment too long, for sure.

#### Email

Options for emailing were nasty, too. Unlike SQL Server where it's managed and built-in, natively emailing in Task Scheduler is [awkward at best](https://superuser.com/questions/249103/make-windows-task-scheduler-alert-me-on-fail) and deprecated at worst.

![](/images/img_59c696c00368d.png)

Again, Fred pointed out that email can be sent using PowerShell's **Send-MailMessage** but the Agent handles emailing on failure in a more straightforward manner. Similar to credentials, email management is just easier and built-in to Agent.

#### Logging

Like email, logging in Task Scheduler leaves a lot to be desired. Unless you generate a log or write to Windows Events, it is difficult to find out why it failed. In Agent, it's easy to find the failures in Job History.

(What's fun about blogging is sometimes, you realize just how bad something is because you have to write it all out. Wow, Task Scheduler is really inferior to SQL Server Agent.)

#### Granularity of Scheduling

[Shawn Melton](http://blog.wsmelton.info) pointed out that in Task Scheduler, he was unable to setup a task that runs every hour between 8am and 6pm. However, this **is** possible in SQL Server Agent.

## SQL Server Agent

Agent is awesome and the solution to all of my issues so far. Well, Agent with a CmdExec Job Step is the solution to all of my issues so far. I really wanted to use the PowerShell Job Step but I've lost faith in it. I encountered all kinds of issues, including the inability to access UNC shares without prepending the variable with `Microsoft.PowerShell.Core\FileSystem::`

In [Shawn's fantastic post about Agent and dbatools](https://www.pythian.com/blog/dbatools-sql-agent/), he outlines other problems including the fact that many (all?) external modules can't load in the SQLPS host, which the PowerShell step still uses, even in SQL Server 2016. Note that the SQLPS host on the server-side [is different](https://blogs.technet.microsoft.com/dataplatforminsider/2016/06/30/sql-powershell-july-2016-update/) from the updated [SqlServer](https://www.powershellgallery.com/packages/SqlServer) module, which is now available in the PowerShell Gallery.

#### CmdExec Job Step vs PowerShell Job Step

[Derik Hammer also had a great post](https://www.sqlhammer.com/running-powershell-in-a-sql-agent-job/) back in 2015 that detailed the differences between the two most popular ways to invoke PowerShell in an Agent job.

Here's a (slightly updated) version of Derik's chart.

![](/images/img_59c7c59543fda.png)

So it basically boils down to this:

| **PowerShell Job Step** | **CmdExec Job Step** |
|--|--|
| sqlps.exe | powershell.exe via cmd.exe |
| Version varies by SQL Server version | Version is always the system version |
| Doesn't always (rarely?) work as expected | Often (always?) works as expected |
| | |

And now that we're all convinced to use the [CmdExec Job Step](https://docs.microsoft.com/en-us/sql/ssms/agent/create-a-cmdexec-job-step), let's set one up.

## Scheduling Tasks using Agent's CmdExec {#tutorial}

By default, [only members of the sysadmin role](https://docs.microsoft.com/en-us/sql/ssms/agent/create-a-cmdexec-job-step) are allowed to create jobs with the CmdExec Job Step, but adding non-sysadmins as principals to [the CmdExec proxy](https://technet.microsoft.com/en-us/library/ms187901(v=sql.105).aspx) works as well.

So here are the steps that I use to schedule my tasks:

- Create a Windows-based Login in SQL Server
- Ensure dbatools is available to the account
- Create a SQL Server Credential
- Create the Agent Proxy
- Create the PowerShell .ps1 file
- Create the Job and Job Step

#### Create a Windows-Based Login in SQL Server

This is out of scope for this post, but check out [Microsoft's page on logins](https://msdn.microsoft.com/en-us/library/aa337562%28v=sql.105%29.aspx) if you need.

Note that you can easily manage remote SQL Servers from a centralized SQL Server Agent. In order to do this, you will need to provide the login with appropriate permissions on the remote SQL and Windows servers.

#### Ensure dbatools is Available to the Account

Basically, you can do this by performing an explicit import of the module (*Import-Module path\to\dbatools\dbatools.psd1*) to the exact path **or**, my preference, ensuring dbatools is globally available to all accounts on the server.

You can do this by placing dbatools in **Program Files\WindowsPowerShell\Modules** or using **Install-Module dbatools** from an admin prompt, which will do the same.

![](/images/img_59c8c7ec2c957.png)

#### Setup a SQL Server credential

After the login has been created, I use the credentials (the AD username & password) to create a SQL Server Credential (Instance -> Security -> Credentials).

![](/images/img_59c8e723537e9.png)

In this example, I called it the PowerShell Service Account, but admittedly, that's a bit broad. In reality, I probably created an account like "SQL Server Audit Account" and limited my distinct auditing task requirements to that user.

![](/images/img_59c7d966d1cd4.png)

While the SQL Server Agent service account could be used across the board, it's better to use a distinct credential for my PowerShell tasks. This enables the granting of specific permissions to the account, as they are required.

#### Setup a SQL Agent Proxy

Once the credential has been created, it must be associated with the CmdExec proxy (Instance -> SQL Server Agent -> Proxies) to ensure it appears in the drop down once you create your SQL Agent Job Step.

![](/images/img_59c8e78fdd464.png)

In this case, I named the proxy "PowerShell Proxy" and gave it the credential I just created, "PowerShell Service Account".

![](/images/img_59c7e45bf3752.png)

#### Create the PowerShell .ps1 file

Since we'll be calling PowerShell from the command line, it's easiest to create a .ps1 file and save it to a location that is accessible by the the Windows Server running the SQL instance. Remember, the job will run from the SQL Server's perspective, so that instance should be able to access it.

I usually have a management SQL Server that runs all the jobs, so I save the file locally, but if I didn't, I'd likely have a repository of scripts on a file share.

It's also possible to [setup an internal PowerShell Gallery](https://kevinmarquette.github.io/2017-05-30-Powershell-your-first-PSScript-repository/) as a central repository for scripts and modules that Agent Job Scripts can import. This could make it simpler from a management, version control and updatability point of view.

#### Create the Job and Job Step

Next, create the job as whatever you like, then when you get to the Job Step, create it as **Operating System (CmdExec)** and change the **Run as:** to your newly created proxy account.

In the **Command:** area, enter *powershell.exe -File \\location\to\file.ps1*

![](/images/img_59c80d4fa0b0a.png)

Need to *Run As Administrator*? Use -Verb runAs

In place of a -File path\filename, you could actually [pass a base64 string into the -EncodedCommand parameter](https://blogs.technet.microsoft.com/heyscriptingguy/2015/10/27/powertip-encode-string-and-execute-with-powershell/), but I'd rather have the ability to easily modify the script without having to reencode it.

#### Now You're Set!

Now you're all set and can [schedule this job](https://logicalread.com/scheduling-sql-server-jobs-with-sql-agent-mo01/) just like you would any other. You can even have it [email an operator on failure](https://docs.microsoft.com/en-us/sql/ssms/agent/notify-an-operator-of-job-status) after [enabling Agent to use Database Mail](https://docs.microsoft.com/en-us/sql/relational-databases/database-mail/configure-sql-server-agent-mail-to-use-database-mail).

To see PowerShell and SQL Agent in practice, check out Björn Peters's post [Daily Database Copy using Powershell](http://www.sql-aus-hamburg.de/tsql2sday-94-daily-database-copy-using-powershell-dbatools/).

## Ensuring Failures Fail

To ensure your failed jobs show a failure in SQL Agent, you must throw a **terminating exception**.

![](/images/img_5a1d665d70540.png)

To throw a terminating exception in dbatools, use –EnableException. In most PowerShell commands, use try/catch with [–ErrorAction Stop](https://superwidgets.wordpress.com/2014/12/22/powershell-erroraction/).

If you're having issues and just can't get it to fail, throw in a `[System.Environment]::Exit(1)` and that should certainly work.

## In Conclusion

You may be wondering why I am showing you the GUI when we've probably got some PowerShell commands to do this for us (we have a lot of 'em!). The reason is that I wanted to convey a concept.

Once we've got the whole suite of commands, including creating a credential and proxy, we'll create a tutorial for doing all of this but with dbatools. For the curious, we do currently offer the following Agent commands, thanks to [Sander Stad](http://www.sqlstad.nl/).

- [New-DbaAgentJob](https://dbatools.io/New-DbaAgentJob)
- [New-DbaAgentJobStep](https://dbatools.io/New-DbaAgentJobStep)

Also, if you have any good posts about SQL Agent and PowerShell to recommend, please let me know in the comments and I'll update the post.

Hope that was helpful! Let us know if you have any questions.

\- Chrissy
