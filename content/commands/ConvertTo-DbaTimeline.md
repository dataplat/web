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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>ConvertTo-DbaTimeline</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/ConvertTo-DbaTimeline.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Marcin Gminski (@marcingminski)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
{: data-copyable="true" data-clean-code="Get-DbaAgentJobHistory -SqlInstance sql-1 -StartDate '2018-08-13 00:00' -EndDate '2018-08-13 23:59' -ExcludeJobSteps | ConvertTo-DbaTimeline | Out-File C:\temp\DbaAgentJobHistory.html" }

-Encoding ASCII<br>
Creates an output file containing a pretty timeline for all of the agent job history results for sql-1 the whole day of 2018-08-13<br>

#####  Example:  2 

```powershell
PS C:\> Get-DbaRegServer -SqlInstance sqlcm | Get-DbaDbBackupHistory -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline | Out-File C:\temp\DbaBackupHistory.html -Encoding ASCII
```
{: data-copyable="true" data-clean-code="Get-DbaRegServer -SqlInstance sqlcm | Get-DbaDbBackupHistory -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline | Out-File C:\temp\DbaBackupHistory.html -Encoding ASCII" }

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
{: data-copyable="true" data-clean-code="$messageParameters = @{
Subject = &quot;Backup history for sql2017 and sql2016&quot;
Body = Get-DbaDbBackupHistory -SqlInstance sql2017, sql2016 -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline | Out-String
From = &quot;dba@ad.local&quot;
To = &quot;dba@ad.local&quot;
SmtpServer = &quot;smtp.ad.local&quot;
}
Send-MailMessage @messageParameters -BodyAsHtml" }

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
