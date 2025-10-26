---
title: "scheduling a migration"
date: 2016-09-20
author: "Chrissy LeMaire"
slug: "scheduling-a-migration"
aliases:
  - /scheduling-a-migration/
  - /scheduling-a-migration/index.html
categories: [announcements]
tags: [migration, party]
draft: false
---

Hey, Chrissy here. Recently, I had great success with scheduling a database migration and wanted to let you know how I did it in case you have a similar requirement.

My requirement comprised of copying two databases that were 30 GB in size, from one server to another, during a time that I wouldn't be at the office. Remote work was not possible.

## The Script

Here's the scheduled-migration.ps1 script that ultimately worked for me.

```powershell
Start-Transcript C:\logs\db-migration-9-1-2016.txt
Import-Module C:\scripts\dbatools\dbatools.psd1
Copy-DbaDatabase -Source sql01 -Destination sql02 -Databases WSS_Content, WSS_Content2 -BackupRestore -SharedPath \\nas\sql\migration
Stop-Transcript
```

## What it does

First, I did not need to migrate an entire instance, so I did not use [Start-DbaMigration](https://dbatools.io/Start-DbaMigration). Instead, I used [Copy-DbaDatabase](https://dbatools.io/Copy-DbaDatabase) which doesn't transcribe automatically like Start-DbaMigration. Because of this, I explicitly requested a transcript.

Also note that I already copied over all of the logins, jobs, etc that I needed. If you have any dependencies, make sure those are copied over as well.

Next, I imported the module to ensure that the Copy-DbaDatabase command would be available to the Scheduled Task. Potentially, I could put this in my path and hope for the best, but I'd rather be explicit.

Finally, I stopped the transcript.

## Testing and -WhatIf

Because Copy-DbaDatabase runs so many checks and supports -WhatIf, I then tested by doing the following:

1. **Added -WhatIf to the Copy-DbaDatabase command**
2. Ran scheduled-migration.ps1 from the command line, and it worked
3. Setup a scheduled task to run once, that night at 9pm, ensuring that the migration occurred no matter if I was logged in or not.

![scheduled](https://dbatools.io/wp-content/uploads/2016/09/scheduled.png?resize=696%2C301&ssl=1)

4. Then I executed the scheduled task manually, waited until it finished, then checked the transcript
5. All the tests passed!
6. I then removed the -WhatIf from Copy-DbaDatabase inside scheduled-migration.ps1 and went home for the night 😊
7. The next morning, I excitedly checked my transcript and boom, both databases had migrated as planned!

## In conclusion..

You don't need to be at the office to migrate your data. So schedule that migration. Go home to your family, your cats, and/or your video console. Or drink a craft beer and watch some Rick and Morty. You deserve it.
