---
title: "Update-Module dbatools Authenticode Issuer Error"
date: 2023-09-21
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "update-module-error"
aliases:
  - /update-module-error/
  - /update-module-error/index.html
categories: [announcements]
tags: [security, troubleshooting]
draft: false
---

TLDR: This error is expected and the change is legitimate. To update, switch to `Install-Module`, then slap on the `-SkipPublisherCheck` and `-Force` parameters and continue your update.

```powershell
Install-Module dbatools -Force -SkipPublisherCheck
```

I've always been very proud that dbatools is Code Signed like a "real" application. These certs prove the identity of the creator and help prevent tampering. The certificates cost a bunch of money and are hard to obtain. You gotta send in tons of paperwork, including your passport and business papers. But again, the payoff is fantastic -- basically, it makes dbatools ready for the Enterprise and ready to deploy at organizations with strict security.

The [new private key storage requirement for Code Signing certificates](https://knowledge.digicert.com/generalinformation/new-private-key-storage-requirement-for-standard-code-signing-certificates-november-2022.html) were implemented this year, making the signing process a whole lot harder. This change lead to us not publishing a new module for a little over three months.

Validating the dbatools organization identity for a code signing certificate is always a pain, and it's required to recur every 3 years. This year, though, I had to do that PLUS I also had to figure out this whole new signing process.

After months of working with Jess Pomfret and weeks of working with Jordan Borean, WE FINALLY FIGURED IT OUT!! But unfortunately, the new requirements breaks the catalog check for `Update-Module` because all of the Certificate Authorities had to update their CA Servers.

This causes the following error (or something similar):

> PS> Update-Module dbatools
> PackageManagement\Install-Package : Authenticode issuer 'CN=dbatools, O=dbatools, L=Vienna, S=Virginia, C=US' of the new module 'dbatools' with version '2.0.4' from root certificate authority 'CN=DigiCert Global G3 Code Signing ECC SHA384 2021 CA1, O="DigiCert, Inc.", C=US' is not matching with the authenticode issuer 'CN=dbatools, O=dbatools, L=Vienna, S=Virginia, C=US' of the previously-installed module 'dbatools' with version '1.1.99' from root certificate authority 'CN=DigiCert Assured ID Root CA, OU=www.digicert.com, O=DigiCert Inc, C=US'. If you still want to install or update, use -SkipPublisherCheck parameter.

**This is expected and the change is legitimate. To update, switch to `Install-Module`, then slap on the `-SkipPublisherCheck` and `-Force` parameters and continue your update.** As people update over time, this should become less and less of a support issue for us, I presume in 2-3 years.

Likely in part due to these new requirements, Microsoft is coming up with a new version (sorta) of `Update-Module` that does not perform this check so stay tuned.

And again, this change and the subsequent errors are expected.
