---
title: "Using Set-DbaCmConnection to Reset Credentials and Cached Connection Status"
date: 2019-06-25
author: "Gareth N"
slug: "reset-credentials-cached-connection"
aliases:
  - /reset-credentials-cached-connection/
  - /reset-credentials-cached-connection/index.html
categories: [announcements]
tags: [authentication, caching, connections, set-dbacmconnection]
draft: false
---

Hi, I am Gareth N – a SQL Server DBA in the UK. I have started to blog over at [ifexists.blog](https://ifexists.blog) – today I want to share some information around how dbatools can cache connection information, and how to reset it.

dbatools is smart. It can do things in the background when you're using the commands, like cache connections and also cache the results of those connections. This can help speed things up as it will re-use the existing object.

But what if something changed since it cached the connection? Let's see how we can edit the existing connections if necessary.

### My Scenario

I was updating some dev instances using what has to be one of my favorite commands, [Update-DbaInstance](https://dbatools.io/Update-DbaInstance). Here's what my command looked like:

```powershell
Update-DbaInstance -ComputerName devbox1.domain.local -Restart -Path "\fileshare\sql updates" -Credential ad\gareth
```

For anyone new to dbatools, let's briefly talk about what this is doing for us based on this example.

- Prompt us for `ad\gareth`'s password
- Find all SQL Server instances on devbox1
- Search fileshare "\fileshare\sql updates" for updates relevant to any instances we found
- If a Windows restart is required before installing patches, then restart
- Prompt the user to install patches for any instances that were found and need updating
- Finally, it will restart the computer after patching

Works like a charm! For more details and examples, you can check out the [Update-DbaInstance help page](https://docs.dbatools.io/#Update-DbaInstance).

#### Back on Topic

I came to update one instance, and my credentials were not working, I received an Access Denied message in PowerShell. I did what was necessary to get my permissions added on the windows server, confident I was good to go I tried again, but still no luck. This time the error was slightly different, "Windows authentication was used, but is known to not work!". Hmmm, not sure what this means? I went off to the dbatools slack channel for advice and got the answer I needed.

dbatools was showing me this message because I recently tried to access this server and it knows I didn't have permission, it remembered and wasn't going to waste time trying again. But now I do have permission, so I do actually need it to forget and try again, to do that we use `Set-DbaCmConnection`.

```powershell
Set-DbaCmConnection -ComputerName devbox1.domain.local -ResetCredential -ResetConnectionStatus -DisableBadCredentialCache
```

This will give us a fresh start with this server and cause dbatools to try and authenticate again, resulting in a good connection object. Also using the -DisableBadCredentialCache flag we can stop it from caching bad credentials while we debug our access issues.

Check out the [Set-DbaCmConnection help page](https://docs.dbatools.io/#Set-DbaCmConnection) for further information.

\- Gareth 🇬🇧
