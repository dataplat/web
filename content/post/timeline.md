---
title: "Creating a History Timeline"
date: 2018-08-21
author: "Marcin"
slug: "timeline"
aliases:
  - /timeline/
  - /timeline/index.html
categories: [announcements]
tags: []
draft: false
---

Hey all, my name is Marcin and this is my first post and my first contribution to the dbatools. I hope you find it useful.

## Introduction

Part of a successful administration and management of any database is to know what happens over a period of time, when scheduled jobs and backups run and whether they are successful or not.

The common difficulty is getting this information out of SQL Server and then – the most difficult part – understanding what it means. In case of scheduled jobs, we want to make sure that there are no clashing and those heavy workloads such as ETL, backups, integrity checks and index maintenance run in isolation as much as possible.

Before dbatools, getting the information out of SQL Server was often a tedious task that often involved relatively complex T-SQL script, spreadsheet and some copying and pasting. Thanks to all the hard work of the dbatools team this is a history. A simple command can retrieve all the information we want and now with the new `ConvertTo-DbaTimeline`, it can be easily plotted on a graphical timeline!

## Concept

The concept of a timeline is very simple and based on a Gantt chart used in project management and time schedule:

> A Gantt chart is a type of bar chart that illustrates a project schedule, named after its inventor, Henry Gantt (1861–1919), who designed such a chart around the years 1910–1915
> https://en.wikipedia.org/wiki/Gantt_chart

The idea is to show a graphical representation of an item or items of interest (task, job, meeting duration) with the start and end dates on a common timeline:

> A *timeline* is a chart that depicts how a set of resources are used over time. If you're managing a software project and want to illustrate who is doing what and when, or if you're organizing a conference and need to schedule meeting rooms, a timeline is often a reasonable visualization choice. One popular type of timeline is the *Gantt chart*.
> https://developers.google.com/chart/interactive/docs/gallery/timeline

## Execution

Currently, the output from the following commands is supported:

- **Get-DbaAgentJobHistory**
- **Get-DbaDbBackupHistory**

You will run the above commands as you would normally do but pipe the output to `ConvertTo-DbaTimeline`, the same way as you would with any other `ConverTo-*` PowerShell function. The output is a string that most of the time you will save as file using the `Out-File` command in order to open it in a browser.

### Examples

#### Get-DbaAgentJobHistory

```ps
#To generate the timeline for agent job history and save as html file:
Get-DbaAgentJobHistory -SqlInstance sql-1 -StartDate '2018-08-18 00:00' -EndDate '2018-08-19 23:59' -ExcludeJobSteps | ConvertTo-DbaTimeline | Out-File C:\temp\DbaAgentJobHistory.html -Encoding ASCII
```

Note the `-Encoding ASCII` – this is required for correct JavaScript and HTML formatting.

![Get-DbaAgentJobHistory Timeline](/images/Get-DbaAgentJobHistory-html.jpg)

Colours are applied automatically based on the job status:

- **Succeeded** (green: #36b300)
- **Failed** (red: #ff3d3d)
- **Retry** (yellow: #ffff00)
- **Canceled** (grey: #c2c2c2)
- **In Progress** (cyan: #00ccff)

#### Get-DbaDbBackupHistory

```ps
#Backup history timeline:
Get-DbaDbBackupHistory -SqlInstance sql-1 -Since '2018-08-18 00:00' | ConvertTo-DbaTimeline | Out-File C:\temp\Get-DbaDbBackupHistory.html -Encoding ascii
```

![Get-DbaDbBackupHistory Timeline](/images/Get-DbaDbBackupHistory-html-1024x566.jpg)

And again, each backup type has its own colour. This time, however, they are not pre-configured but are set automatically by the Google's framework so could be random.

We can also run it for multiple servers at once AND THIS IS GREAT as it allows to produce a comprehensive overview of the entire estate which can help to assess the impact on the network, storage or virtual cluster. And without passing the `Out-File` command it will simply output an HTML as a string:

```ps
Get-DbaDbBackupHistory -SqlInstance sql2017, sql2016 -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline
```

Which can be assigned to a variable or used to compose an email as in the example below:

```ps
$messageParameters = @{
    Subject = "Backup history for sql2017 and sql2016"
    Body = Get-DbaDbBackupHistory -SqlInstance sql2017, sql2016 -Since '2018-08-13 00:00' | ConvertTo-DbaTimeline
    From = "dba@ad.local"
    To = "dba@ad.local"
    SmtpServer = "smtp.ad.local"
 }
Send-MailMessage @messageParameters -BodyAsHtml
```

## The Mechanics

We are using Google Charts Framework to generate the graph in the `ConvertTo-DbaTimeline`. The framework is JavaScript based, very easy to use and fast. The rendering happens on the client PC and no data is ever sent to Google or anywhere.

You can read more about the Google Chart Framework:

https://developers.google.com/chart/

And specifically about the Timeline object:

https://developers.google.com/chart/interactive/docs/gallery/timeline

The creation of the HTML file is not much different to how dynamic websites work. If we look at Google's generic example below, the part containing JavaScript Array data rows is generated dynamically from the pipe input. The rest of the code apart from few parameters is static. Once the input is transposed it is being returned as a string. That's it. It is very simple yet powerful.

```js
google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var container = document.getElementById('example3.1');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Position' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows([
    [ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
    [ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
    [ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
    [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
    [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
    [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
    [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
    [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
    [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
    [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
    [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
    [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
    [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
    [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
    [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
  ]);
  chart.draw(dataTable);
}
```

## Final Note

Although it's a Google framework, this works great on any browser not only on Google Chrome. As per the [Google Docs](https://developers.google.com/chart/interactive/docs/): *Charts are rendered using HTML5/SVG technology to provide cross-browser compatibility (including VML for older IE versions)*.

However, one last thing to keep in mind is that it does require access to the internet in order to access Google Charts and Bootstrap frameworks. As these are based on JavaScript, it is best to run on a client PC and not on Windows Server.

## My Experience as a Contributor

Although I have been using dbatools for quite some time now this was my first contribution to the project. I never really looked how it all works behind scenes but oh boy it is impressive. Chrissy has done a fantastic job designing the dbatools framework. All the internal functions are there, as a developer I did not have to worry about how to write a message or raise an error.

Chrissy is also a great mentor, she reviewed my code and tweaked it a bit where required with the full explanation of what she did and why, which made perfect sense. I probably learned more PowerShell in those couple of days working with Chrissy than in my whole career. Thank you!
