---
title: "dbatools is moving to Azure Trusted Signing"
date: 2025-08-05
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "azure-trusted-signing"
aliases:
  - /azure-trusted-signing/
  - /azure-trusted-signing/index.html
categories: [announcements]
tags: [security]
featureImage: "/images/dbatoolstrustedpub.png"
shareImage: "/images/dbatoolstrustedpub.png"
draft: false
---

**TLDR:** dbatools is moving to Azure Trusted Signing, which means Microsoft backs our reputation and dbatools won't trigger as many antivirus false positives.

Users upgrading from older signed versions will need `-SkipPublisherCheck` only once during the initial transition. PowerShell users with strict ExecutionPolicies (AllSigned/RemoteSigned) will need to trust each new certificate after every update due to Azure Trusted Signing's daily cert rotation (but you can use the automation script provided below).

While Update-Module seems like the best route, Install-Module with its support for Force and SkipPublisherCheck can help automate updates, as Update-Module does not support these parameters.

```powershell
# For the initial upgrade from old cert to Azure Trusted Signing
Install-Module dbatools -Force -SkipPublisherCheck

# Or avoid the publisher check issue during install
Install-PSResource dbatools
Update-PSResource dbatools
```

Users who have their execution policies set to AllSigned or RemoteSigned will face ongoing challenges with certificate trust. This is going to start on August 5, 2025 with version 2.5.5.

## The reputation problem

For years, dbatools has been plagued by antivirus false positives. [Search our GitHub issues for "malicious"](https://github.com/dataplat/dbatools/issues?q=is%3Aissue%20malicious) and you can see that Carbon Black, Windows Defender, FireEye, Avast have all, at some point in time, flagged our legitimate module as malware.

This issue affected other legitimate PowerShell modules, especially ones that are code-signed, which never made sense. We really seemed to have been penalized by AV for doing the right thing.

## How I got here

This whole journey started when I accidentally deleted my private key while rebuilding my Azure VM (and copy/pasting from AI, lol). When I contacted DigiCert about recovery, they informed me I'd need to go through their entire validation process again - another 2+ months of proving my identity. Hell no, not again. I was complaining to PowerShell genius [Jordan Borean](https://github.com/jborean93) and he told me about Azure Trusted Signing.

I was actually considering not even signing anymore but this is a way better option. dbatools get to stay signed and I can do it all without DigiCert headache.

## Introducing Azure Trusted Signing

Microsoft now offers [Azure Trusted Signing](https://azure.microsoft.com/en-us/products/trusted-signing) (formerly Azure Code Signing) as a new way to sign software. The identity validation process is dramatically faster than traditional code signing:

- **Immediate reputation** - Microsoft's backing means instant trust from Windows SmartScreen and antivirus software
- **Identity-based trust** - Reputation is tied to your verified identity, not a specific certificate
- **Lightning-fast validation** - My identity was approved in 30 minutes (compared to DigiCert's 2+ months!)

The catch? Azure Trusted Signing rotates certificates daily. For most software this is fine, but PowerShell's execution policies were designed for certificates that last years, not days. So users with strict execution policies (AllSigned/RemoteSigned) will get prompted to trust the new certificate after every dbatools update.

We're essentially trading months of waiting for DigiCert validation every 3 years for a minor inconvenience for some users with each update. The good news is that after the initial migration, installation won't require `-SkipPublisherCheck` anymore since the subject and root CA remain constant.

This service has been used internally for all Microsoft's products and close partners for years. It works well for executables and DLLs, though PowerShell support for daily certificate rotation is lacking, as we've discovered.

## Microsoft ID Verified

I'm particularly amazed that our certificate now displays Microsoft's name. Check out this beauty:

```
# Quick way to check the dbatools certificate details
$moduleBase = (Get-Module dbatools -ListAvailable | Select-Object -First 1).ModuleBase
$moduleManifest = Join-Path $moduleBase dbatools.psd1
(Get-AuthenticodeSignature -FilePath $moduleManifest).SignerCertificate | Format-List *

[Subject]
  CN=dbatools, O=dbatools, L=Vienna, S=Virginia, C=US
[Issuer]
  CN=Microsoft ID Verified CS AOC CA 02, O=Microsoft Corporation, C=US
[Serial Number]
  330004B7A6E29F81DCCBBF7F7F00000004B7A6
[Not Before]
  8/5/2025 2:39:41 PM
[Not After]
  8/8/2025 2:39:41 PM
[Thumbprint]
  33C788A6A72BEEF315CF9C10FF093048A9608B72

TimeStamperCertificate:
[Subject]
  CN=Microsoft Public RSA Time Stamping Authority,
  OU=nShield TSS ESN:7D00-05E0-D947,
  OU=Microsoft America Operations, O=Microsoft Corporation,
  L=Redmond, S=Washington, C=US
[Issuer]
  CN=Microsoft Public RSA Timestamping CA 2020,
  O=Microsoft Corporation, C=US
```

"Microsoft Corporation" in the issuer field gives instant credibility with enterprise security teams, including yours. If you have to get approval to use dbatools, let them know that it's Microsoft ID Verified.

You can also view this directly in Windows Certificate Manager. After importing dbatools, you'll find it in your Trusted Publishers store:

1. Press Win+R and type `certmgr.msc` (or search for "Manage user certificates" in the Start menu)
2. Navigate to Trusted Publishers > Certificates
3. Look for the dbatools entries

![dbatools certificates in Windows Certificate Manager](/images/dbatoolstrustedpub.png)

The certificate is valid for only 3 days (8/5/2025 to 8/8/2025 in this example), which is why automation becomes important for users with strict execution policies. You might see multiple dbatools certificates if you've been using the module for a while - the older DigiCert-signed versions alongside the new Microsoft-backed one.

## Understanding the two different issues

Thanks to Jordan's clarification, there are actually two separate issues at play here. The confusion comes from the fact that installing and importing modules are handled differently by PowerShell.

ExecutionPolicy only affects Import-Module, not Install-Module. You can install modules even with the most restrictive execution policy because Install-Module is just downloading and copying files. But when you try to import (use) the module, that's when ExecutionPolicy kicks in and checks if the scripts are allowed to run. This is why you might successfully install dbatools but then get blocked when trying to use it.

### 1. Installation time: The `-SkipPublisherCheck` issue
This affects `Install-Module` (but not `Update-Module` which doesn't support it) when upgrading from a module signed with one certificate to another with a different subject or root CA. PowerShellGet checks if:
- The leaf certificate subject has changed (e.g., CN=dbatools,O=dbatools,...)
- The root CA subject has changed

When this happens, you'll see an error like this:

```
PackageManagement\Install-Package : Authenticode issuer 'CN=dbatools, O=dbatools,
L=Vienna, S=Virginia, C=US' of the new module 'dbatools' with version '2.5.5' from
root certificate authority 'CN=Microsoft Identity Verification Root Certificate
Authority 2020, O=Microsoft Corporation, C=US' is not matching with the authenticode
issuer 'CN=dbatools, O=dbatools, L=Vienna, S=Virginia, C=US' of the previously-installed
module 'dbatools' with version '2.5.1' from root certificate authority 'CN=DigiCert
Global Root G3, OU=www.digicert.com, O=DigiCert Inc, C=US'. If you still want to
install or update, use -SkipPublisherCheck parameter.
```

Notice how it's comparing the root certificate authorities - DigiCert Global Root G3 (old) vs Microsoft Identity Verification Root Certificate Authority 2020 (new). You might also see this same error for `dbatools.library` since it's a dependency that's also being re-signed.

**Good news:** This only happens once! When you upgrade from the old DigiCert-signed dbatools to the new Azure Trusted Signing version, you'll need `-SkipPublisherCheck`. But after that initial transition, you won't need it again because Azure Trusted Signing keeps the same subject and root CA (valid until 2045).

Is `-SkipPublisherCheck` safe? Yes, in this context. You're still getting dbatools from the PowerShell Gallery (a trusted source) and the module is still signed.

### 2. Runtime: The execution policy thumbprint issue
This affects `Import-Module` when you have an execution policy enabled (AllSigned or RemoteSigned). PowerShell checks if the exact certificate thumbprint is in your TrustedPublisher store. Since Azure Trusted Signing rotates certificates daily, this means:
- Every update brings a new certificate with a new thumbprint
- Users need to trust each new certificate manually
- This happens every time you update dbatools

This is the issue tracked in [PowerShell issue #21550](https://github.com/PowerShell/PowerShell/issues/21550) (please go upvote it!).

**UPDATE**: Jordan already [created a Pull Request](https://github.com/PowerShell/PowerShell/pull/25824) to address this in future versions of PowerShell 7, please upvote this as well.

## Workaround for the runtime issue

For users with strict execution policies, Jordan helped me with a script that automates the trust process.

```powershell
function Import-Dbatools {
    # Check and trust the certificate if needed
    $moduleBase = (Get-Module dbatools -ListAvailable | Select-Object -First 1).ModuleBase
    $moduleManifest = Join-Path $moduleBase dbatools.psd1
    $cert = (Get-AuthenticodeSignature -FilePath $moduleManifest).SignerCertificate

    if (-not (Test-Path -Path "Cert:\CurrentUser\TrustedPublisher\$($cert.Thumbprint)")) {
        Write-Host "Trusting new dbatools certificate..." -ForegroundColor Yellow
        $store = Get-Item Cert:\CurrentUser\TrustedPublisher
        $store.Open('ReadWrite')
        $store.Add($cert)
        $store.Close()
    }

    # Now import the module
    Import-Module dbatools
}
```

This function will automatically trust the certificate whenever you import dbatools, eliminating the manual trust prompt. Since Azure Trusted Signing rotates certificates daily, you'll benefit from having this automation - it will seamlessly handle the new certificate after each update.

The long-term solution Jordan referenced would be for PowerShell itself to recognize Azure Trusted Signing certificates by their OID rather than requiring thumbprint matching, which would eliminate the need for this workaround entirely. But until then, this script provides a practical solution. Unfortunately that one will never be implemented in PS 5.1

## Execution policies vs. modern code signing

According to [Microsoft's docs](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5), execution policies are a safety feature, not a security system. Users can easily bypass a policy by typing the script contents at the command line. It's like having a "Please Don't Touch" sign instead of a locked door.

This becomes obvious when you look at how different platforms handle PowerShell. On non-Windows computers, the default execution policy is Unrestricted and cannot be changed. Linux and macOS users have been running PowerShell with zero restrictions from day one:

```
# Trying to change the execution policy to strict on Linux
PS /mnt/c/github> Set-ExecutionPolicy AllSigned
Set-ExecutionPolicy: Operation is not supported on this platform.
```

Many experienced Windows PowerShell users end up setting their policy to Bypass anyway. We start cautious with RemoteSigned, realize we're constantly fighting it, and eventually just turn it off. Microsoft making Unrestricted the default for all non-Windows platforms shows they've recognized that strict execution policies create more hassle than value.

The real problem is that execution policies assumed certificates would last years, not days. They're designed to prevent accidental script execution - not to handle cryptographic signatures that rotate every 24 hours. Azure Trusted Signing's daily certificate rotation breaks this model completely.

Here's how different execution policies handle daily certificate rotation:

| ExecutionPolicy | Impact | Workaround |
|----------------|---------|------------|
| **Restricted** | Can't run scripts at all | Change policy or use PowerShell 7 |
| **AllSigned** | Prompts to trust new publisher daily | Manually trust cert or use `Install-PSResource` |
| **RemoteSigned** | Prompts to trust new publisher daily (for downloaded scripts) | Manually trust cert or use `Install-PSResource` |
| **Unrestricted** | No impact | None needed |
| **Bypass** | No impact | None needed |

The irony is that dbatools is now more trusted than ever, backed by Microsoft's own signing infrastructure, yet it's harder to use for people with strict execution policies. That's not a security improvement; it's just added complexity.

## What about existing installations?

Good news! All existing versions of dbatools (2.5.1 and earlier) will remain valid forever with their current signatures. There's no grace period or forced migration - you can keep using older versions if needed. Version 2.5.5 onwards (starting today) will use Azure Trusted Signing.

## What this means for you

For most users running PowerShell 7, this transition will eventually be seamless once PowerShell adds proper support. You'll get:
- No more false positive virus warnings
- Faster module updates without certificate delays due to Digicert's identity process
- Better integration with enterprise security policies
- Continued assurance that dbatools code hasn't been tampered with

One potential bonus for users who check digital signatures: Azure Trusted Signing may offer faster module load times. Usually, certificate validation adds noticeable delays when loading modules, especially in environments with strict certificate checking. Since Azure Trusted Signing certificates come from Microsoft's infrastructure, the validation process could be faster. I still need to test.

## What can you do?

1. **Upvote [PowerShell issue #21550](https://github.com/PowerShell/PowerShell/issues/21550)** - community engagement drives prioritization (add a thumbs up)
1. **Give Jordan's [Pull Request](https://github.com/PowerShell/PowerShell/pull/25824) some support** - again, community engagement drives prioritization (add a thumbs up)
1. **Consider using PSResourceGet** - `Install-PSResource` bypasses the install/update issues entirely
1. **Update your documentation** - add `-SkipPublisherCheck` to your initial upgrade scripts
1. **Create an Import-Dbatools function** - automate certificate trust for your team
1. **Spread the word** - help other dbatools users understand this change

For a module downloaded over 90,000 times in just the past two weeks, reducing friction matters even if that means educating users about the differences between install-time and runtime certificate validation for a while.
