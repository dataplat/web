---
title: "ConvertTo-DbaTimeline"
slug: "ConvertTo-DbaTimeline"
date: 2024-01-01
layout: "single"
author: "Marcin Gminski (@marcingminski)"
availability: "Windows, Linux, macOS"
synopsis: "Generates interactive HTML timeline visualizations from SQL Server job history and backup history data"
tags:
  - "Utility"
  - "Chart"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaTimeline.ps1"
bohUrl: "https://dataplat.github.io/boh#ConvertTo-DbaTimeline"
draft: false
---

# ConvertTo-DbaTimeline

| Property | Value |
| --- | --- |
| **Author** | Marcin Gminski (@marcingminski) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [ConvertTo-DbaTimeline](https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaTimeline.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [ConvertTo-DbaTimeline](https://dataplat.github.io/boh#ConvertTo-DbaTimeline).

## Synopsis

Generates interactive HTML timeline visualizations from SQL Server job history and backup history data

## Description

Transforms SQL Server job execution and backup operation data into visual timeline reports for analysis and troubleshooting. Takes piped output from Get-DbaAgentJobHistory and Get-DbaDbBackupHistory and generates a complete HTML file with an interactive Google Charts timeline.  
  
Perfect for analyzing job schedules, identifying backup windows, troubleshooting overlapping operations, or creating visual reports for management. The timeline shows execution duration, status, and timing relationships across multiple instances, with hover tooltips displaying detailed information including start/end times and duration calculations.  
  
Output is a self-contained HTML file that can be viewed in any browser, emailed to stakeholders, or archived for historical analysis. Supports both single and multi-instance scenarios with automatic labeling and color-coded status indicators.

## Syntax

```powershell
ConvertTo-DbaTimeline
    [-InputObject] <Object[]>
    [-ExcludeRowLabel]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> Get-DbaAgentJobHistory -SqlInstance sql-1 -StartDate '2018-08-13 00:00' -EndDate '2018-08-13 23:59' -ExcludeJobSteps | ConvertTo-DbaTimeline | Out-File C:\temp\DbaAgentJobHistory.html
```

-Encoding ASCII<br>
Creates an output file containing a pretty timeline for all of the agent job history results for sql-1 the whole day of 2018-08-13<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcm | Get-DbaDbBackupHistory -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline | Out-File C:\temp\DbaBackupHistory.html -Encoding ASCII
```

Creates an output file containing a pretty timeline for the agent job history since 2018-08-13 for all of the registered servers on sqlcm<br>

#####  Example:  3 

```powershell
PS C:\> $messageParameters = @{
>> Subject = "Backup history for sql2017 and sql2016"
>> Body = Get-DbaDbBackupHistory -SqlInstance sql2017, sql2016 -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline | Out-String
>> From = "dba@ad.local"
>> To = "dba@ad.local"
>> SmtpServer = "smtp.ad.local"
>> }
>>
PS C:\> Send-MailMessage @messageParameters -BodyAsHtml
```

Sends an email to dba@ad.local with the results of Get-DbaDbBackupHistory. Note that viewing these reports may not be supported in all email clients.<br>

### Required Parameters

##### -InputObject

Specifies the SQL Server data to convert into timeline visualization. Accepts piped output from Get-DbaAgentJobHistory or Get-DbaDbBackupHistory.  
Use this to transform job execution history or backup operation data into an interactive HTML timeline chart.  
The function automatically detects the input type and formats the timeline appropriately with status colors and duration calculations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | true (ByValue) |
| Default Value |  |

### Optional Parameters

##### -ExcludeRowLabel

Removes the row labels showing SQL instance and item names from the left side of the timeline chart. By default, labels display "[InstanceName] JobName" or "[InstanceName] DatabaseName" for each   
timeline row.  
Use this when you need to maximize chart space for better visualization of timeline data, especially with long instance or job names.  
All label information remains available in the hover tooltips when you mouse over timeline bars.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -EnableException

By default, when something goes wrong we try to catch it, interpret it and give you a friendly warning message.  
This avoids overwhelming you with "sea of red" exceptions, but is inconvenient because it basically disables advanced scripting.  
Using this switch turns this "nice by default" feature off and enables you to catch exceptions with your own try/catch.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |


&nbsp;
