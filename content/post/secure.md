---
title: "talking to your security team about powershell and dbatools"
date: 2018-09-26
author: "Chrissy LeMaire"
slug: "secure"
aliases:
  - /secure/
  - /secure/index.html
categories: [announcements]
tags: [security]
draft: false
---

Last year, during our [PASS Summit](https://sqlps.io/precon) and [SQL Bits](https://sqlps.io/bitsprecon) precons, we highlighted the reasons that PowerShell is even more secure than GUI administration.

I even created a cute lil logo for it 😊

[![](https://dbatools.io/wp-content/uploads/2018/09/security.png?fit=300%2C300&ssl=1)](https://sqlps.io/security)

Recently, our team had a [discussion](https://dbatools.io/slack) about security in [#dbatools-dev](https://sqlcommunity.slack.com/messages/C3EJ852JD/) and I realized I should probably highlight why PowerShell and dbatools are ideal for every organization, including security-minded organizations.

If you're questioned about PowerShell or dbatools, here are some handy facts to help prove we can help make your administration more, not less, secure.

# PowerShell

So how is using PowerShell more secure than GUI administration? [This shocking video](https://youtu.be/BIwe571zcWY?t=1m22s) from a few years back can help explain. In it, Microsoft Security MVP [Marcus Murray](https://twitter.com/marcusswede) highlights just how easy it is to [steal a token](https://attack.mitre.org/wiki/Technique/T1134) and impersonate an admin who is logged in via the GUI.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BIwe571zcWY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

JPG -> IIS -> cmd/.NET -> file system -> SQL Server -> token theft from GUI -> domain controller -> ☠️

Remote PowerShell sessions do not create tokens, and consequently do not subject us to the threat of token theft and privilege escalation.

## Remote PowerShell, you say?

I remember when I heard the term **PowerShell Remoting** and saw some book chapters on it, I was like "aw man, another thing I gotta learn?" but it's actually [pretty straight forward](https://docs.microsoft.com/en-us/powershell/scripting/core-powershell/running-remote-commands).

Windows PowerShell supports remote computing by using various technologies, including WMI, SQL WMI, RPC, SSH & WS-Management. Some commands require no remote configuration, including:

- Restart-Computer
- Test-Connection
- Get-HotFix
- Get-Process
- Get-Service
- Get-WinEvent

## Remoting

**Remoting** refers to commands that use [WS-Management](https://docs.microsoft.com/en-us/powershell/scripting/setup/winrmsecurity). And it's **Microsoft's recommended method of managing Windows**. Why?

- By default, it only allows connections from members of the Administrators group
- It uses single port: 5985 or 5986
- Regardless of the transport protocol used (HTTP or HTTPS), PowerShell Remoting always encrypts all communication after initial authentication with a per-session AES-256 symmetric key
- Initial authentication is NTLM, Kerberos and Certificates so no credentials are ever exposed

The PowerShell team's mantra is **Secure by Design** and you can see it in action with this remoting implementation.

## Secure by Design

The PowerShell team is very serious about security and their lead security architect, [Lee Holmes](https://www.leeholmes.com/blog/), is well-respected in the InfoSec community. He and Jeffrey Snover even did a [keynote at DerbyCon](https://youtu.be/BMreZZ1cgFI?t=2m13s) where they talked about PowerShell security in-depth.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BMreZZ1cgFI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Yet we'll sometimes see things like this:

[![](https://dbatools.io/wp-content/uploads/2019/09/clickbait.png?fit=300%2C300&ssl=1)](https://www.symantec.com/connect/blogs/powershell-threats-surge-954-percent-analyzed-scripts-were-malicious)

Click to Tweet 🤐 So why do anti-virus (AV) companies highlight the obvious fact that suspicious files uploaded to a suspicious-file-checker will probably be suspicious?

Lee Holmes addresses this very issue in the keynote:

> AV, they love to talk about ransomware attacks that use PowerShell, and the reason they do this is because they literally can't keep up with the plain old stuff like exes. But they also do this because we as a community encourage it. We blog it, we tweet about it, we talk about it. And the next thing you hear is that there's a PowerShell problem. They don't seem to ask how to solve their C++ problem or their darn x64 problem.

He then went on to say

> When security researchers leverage PowerShell, it is always in a **post-compromise** context. They have compromised a machine through some other avenue (phishing, SQL injection, etc.), and ultimately have the choice of any number of tools on the system. They were able to accomplish their goals before PowerShell, and will be able to accomplish their goals without PowerShell.

Pretty convincing argument there, Lee! Thank you 🎉

Looking for more? Check out [PowerShell, Remoting, and Security](https://github.com/devops-collective-inc/secrets-of-powershell-remoting/blob/master/manuscript/powershell-remoting-and-security.md) by Microsoft MVP Don Jones.

## Hackers avoid PowerShell

This tweet speaks volumes.

> "I'm a red teamer so I try and stay as far away from PowerShell as I can" @h4wkst3r while discussing SharPersist tool release at #DerbyCon https://t.co/wY67IlrlFJ
>
> This should make @Lee_Holmes proud

— Christopher Glyer (@cglyer) [September 7, 2019](https://twitter.com/cglyer/status/1170429449852112898?ref_src=twsrc%5Etfw)

# dbatools

dbatools is an open source project so all of our coding and discussions happen out in the open. Whether it be on [GitHub](https://dbatools.io/github) or [Slack](https://dbatools.io/slack). We even created a channel called #dbatools-github just to watch GitHub spam, which includes all Pull Requests, Issues and commits to master & development.

Open source is generally considered more secure, but as the SQLShack article "[SQL Server security considerations with open source tools](https://www.sqlshack.com/sql-server-security-considerations-with-open-source-tools/)" highlights, there are some concerns to address.

## Code signed

What data pro doesn't love integrity? #DBCCCHECK4EVER

Thanks to a donation from dbatools contributors, [Data Masterminds](https://www.datamasterminds.io/), dbatools is legit, code-signed, Enterprise software.

![](https://dbatools.io/wp-content/uploads/2017/10/8.gif)

Code signing requires a code signing certificate. Obtaining a globally recognized code signing certificate isn't easy and took me about a month. A ton of paperwork & multiple proofs of identity were required, but I did it because I wanted dbatools to be as professional as possible.

What are code signing certs? [DigiCert](https://www.digicert.com/code-signing/) says:

> Code Signing Certificates are used by software developers to digitally sign apps, drivers, and software programs as a way for end-users to verify that the code they receive has not been altered or compromised by a third party. They include your signature, your company's name, and if desired, a timestamp.

Our signatures do include a timestamp, and I personally sign every release that goes into the [PowerShell Gallery](https://dbatools.io/gallery) and [chocolately](https://dbatools.io/chocolatey). [Rob Sewell](http://sqldbawithabeard.com) and I are the only two people with access to the certificate. And while Rob can also potentially sign dbatools, he uses the certificate solely to sign our sister project, [dbachecks](https://dbachecks.io).

## Limited permissions to merge

Going back to that article on [SQLShack.com](https://www.sqlshack.com/): they talk about [diffusion of responsibility](https://en.wikipedia.org/wiki/Diffusion_of_responsibility). Basically, the human impulse to say "another developer is looking, so I don't have to."

Only six of us can merge code into the dbatools master branch, and only six of us ever have. How did we determine this number? We executed the following command and threw the results into Excel:

```sh
git log --graph --abbrev-commit --decorate --first-parent master --merges --pretty=format:%h-%aN
```

![](https://dbatools.io/wp-content/uploads/2019/09/master-commiters.png?ssl=1)

Five of the six people (Me, Shawn, Fred, Rob, Simone and Stuart) who can **currently** merge code intro dev/master are current/former MVPs or Microsoft employees. Our primary C# library developer, [Friedrich Weinmann](https://psframework.org/), is a former MVP and current Security PFE at Microsoft. Friedrich approves all C# code. The other dbatools code is mostly approved by me and fellow MVPs Shawn Melton and Stuart Moore.

We are all known by Microsoft and have visible community profiles. You'll notice that I'm the primary merger, but if you watch our repo, you'll also notice Shawn spends a good deal of time evaluating and testing code, even after I've merged it and after it's been [tested by appveyor](https://dbatools.io/ci) & [Pester](https://dbatools.io/tests).

## Manageable code base

dbatools also has a decently manageable code base. Here are some stats about our code, courtesy of Simone who used [cloc](https://github.com/AlDanial/cloc) to produce this pretty chart.

![](https://dbatools.io/wp-content/uploads/2019/09/sloc.png?ssl=1)

Note that over 35% of our PowerShell code is comments or comment-based help 😊

## You can compile dbatools.dll yourself

Our dbatools C# library code [can be found in our GitHub repo](https://github.com/dataplat/dbatools/tree/development/bin/projects/dbatools), AND! You can even set it to compile each time you import dbatools using the `$dbatools_alwaysbuildlibrary` variable instead of relying on our included dll.

```powershell
$dbatools_alwaysbuildlibrary = $true
Import-Module dbatools
```

The module itself [handles](https://github.com/dataplat/dbatools/blob/development/dbatools.psm1#L103) the [compile](https://github.com/dataplat/dbatools/blob/development/bin/build-project.ps1) so that's all you have to do.

Note that `$dbatools_alwaysbuildlibrary` is not supported by our PowerShell Gallery or chocolatey releases. If you need to compile the DLL, you'll need to either clone our repo or [download the zip](https://dbatools.io/zip) directly from GitHub.

## External libraries and programs

Our [external libraries and programs](https://github.com/dataplat/dbatools/tree/development/bin/smo) come primarily from Microsoft. But like SQL Server Management Studio, we also use community DLLs.

Our [XESmartTarget support](https://github.com/dataplat/dbatools/tree/development/bin/XESmartTarget) comes from [Data Platform MVP & Formula 1 DBA Gianluca Sartori](https://spaghettidba.com/) and [nuget](https://blog.nuget.org/20170417/Package-identity-and-trust.html).

We also obtained permission to include bcp.exe and sqlcmd.exe, and that came directly from my own installation of SQL Server Management Studio.

While it'd be foolish to make a guaranteed promise that our library is 💵, we do try our best and no malware has ever been detected in my repo root or in our PowerShell Gallery and chocolatey packages.

## We're on chocolatey

Thanks to [Paul Broadwith](https://blog.pauby.com/), dbatools is now available in the chocolatey repository, and [chocolatey takes package integrity very seriously](https://chocolatey.org/security).

> Every version of every package submitted must pass through a rigorous moderation review process before they become publicly available (includes checks for quality, consistency, installation, and validations against VirusTotal).

You can find out more about this review process at [chocolatey.org](https://chocolatey.org/security#rigorous-moderation-process-for-community-packages).

## We're in the Microsoft PowerShell Gallery

You can also find us on the [PowerShell Gallery](https://dbatools.io/gallery) which performs an "[antivirus scan by using System Center Endpoint Protection](https://blogs.msdn.microsoft.com/powershell/2015/08/06/powershell-gallery-new-security-scan/)"

According to Microsoft, all modules have to meet a minimum quality standard, which includes being free of malware and viruses.

## We're used by Microsoft

Amazingly enough, Microsoft also uses dbatools (and 1999 me is totally tripping out). So while Microsoft does not officially endorse us, they appear to trust that we're a project with integrity.

David Peter Hansen, SQL Server PFE, has [an awesome blog post](https://davidpeterhansen.com/2017/10/09/sql-server-performance-troubleshooting-free-scripts-and-tools-list/) where he details the tools he uses. dbatools is all up in the mix 😎 Another PFE and former Data Platform MVP, Ryan J. Adams, [actually suggests using dbatools](https://blogs.msdn.microsoft.com/sql_pfe_blog/2017/08/21/sync-sql-logins-and-jobs/) to sync logins for Availability Groups.

And I just noticed he even [made a video](https://www.youtube.com/watch?v=hRpLco6ysBo) about dbatools!

<iframe width="560" height="315" src="https://www.youtube.com/embed/hRpLco6ysBo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Also, SQL PFE Patrick Keisler [wrote a post on blogs.msdn.microsoft.com](https://blogs.msdn.microsoft.com/samlester/2017/12/29/sql-server-dba-morning-health-checks/) which doesn't use dbatools directly, but does use some of the shared code base that I wrote.

Word has it, we're also used in the banking industry, the airline industry, the super fancy speedcar industry, the insurance industry, the medical industry and more.

## Low-hanging fruit

There's also some low-hanging fruit that we address, like using ScriptAnalyzer to ensure we follow security best practices. We also update our website's backend regularly and each of our sites use HTTPS.

# Resources

Microsoft itself has written extensively about PowerShell security.

## Who's afraid of PowerShell security?

[Who's afraid of PowerShell security?](https://blogs.technet.microsoft.com/ashleymcglone/2016/06/29/whos-afraid-of-powershell-security/) by former Microsoft PFE Ashley McGlone was an instant classic because it was effective and succinct. This article made so many great points, including:

> The improvements in WMF 5.0 (or WMF 4.0 with KB3000850) make PowerShell the worst tool of choice for a hacker when you enable script block logging and system-wide transcription. Hackers will leave fingerprints everywhere, unlike popular CMD utilities. For this reason, PowerShell should be the only tool you allow for remote administration. These features allow you to answer the classic questions who, what, when, where, and how for activities on your servers.

## PowerShell Security at Enterprise Customers

[PowerShell Security at Enterprise Customers](https://blogs.msdn.microsoft.com/daviddasneves/2017/05/25/powershell-security-at-enterprise-customers/) by former Microsoft PFE David das Neves is another highly referenced article. I consider this the definitive, in-depth article about PowerShell security.

This post is practically a book, and even making an outline would be too long. If you need to know anything about PowerShell security, this post is a great reference. Bravo, David!

## A Comparison of Shell and Scripting Language Security

[A Comparison of Shell and Scripting Language Security](https://blogs.msdn.microsoft.com/powershell/2017/04/10/a-comparison-of-shell-and-scripting-language-security/) by PowerShell's Security Architect Lee Holmes is another ace.

My favorite part was this easy-to-understand visual bit that shows why PowerShell is mega-secure 💪

![](https://msdnshared.blob.core.windows.net/media/2017/04/comparitive_security.png)

I hope this addresses everything your security department needs. If not, post a comment or email me at clemaire@gmail.com and we'll see what we can do.

\- Chrissy
