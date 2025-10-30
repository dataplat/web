---
title: "Import-DbaCsv Design Considerations"
date: 2022-05-24
lastmod: 2025-10-30
author: "Chrissy LeMaire"
slug: "import-csv-design"
aliases:
  - /import-csv-design/
  - /import-csv-design/index.html
categories: [announcements]
tags: [csv, import]
draft: false
---

This post is about [Import-DbaCsv](https://dbatools.io/Import-DbaCsv), a command within the [dbatools](https://dbatools.io) PowerShell module for SQL Server.

I've been writing about CSV imports using PowerShell for a pretty long time and in VBScript for even longer. Initially, my primary concerns were ease-of-use and speed. Over time, I realized that what mattered most was:

1. Ease-of-use
2. Reliability
3. Data quality management

I learned a ton about performance from my speed experiments but in the end, I threw most of that out in favor of a higher quality and mildly slower solution using a .NET compiled library called [LumenWorks.Framework.IO](https://github.com/phatcher/CsvReader/tree/master/code/LumenWorks.Framework.IO).

The best part about using LumenWorks instead of rolling my own solution is that it handles imperfect data very well. My solutions were fast but had no error handling and only the cleanest of CSVs would work. Clean CSVs are ideal but not always found in real-world data sets.

## Ease-of-use

Ease and enjoyment is extremely important when designing and using a tool because if something is a headache to use, you'll probably start avoiding it. Like me with the Import and Export Wizard. I haven't used it in over a decade, because nearly every time I tried, this happened:

<center><img src=/images/error.png></center>

Ughhh just figure it out and let me import my data! Initial versions of [Import-DbaCsv](https://dbatools.io/Import-DbaCsv) only accepted perfect data too, though, so I get it ¯\\_(ツ)_/¯.

Now, [Import-DbaCsv](https://dbatools.io/Import-DbaCsv) just figures everything out and lets you import your data, whether it's perfect or not. When it comes to ease-of-use, it really can't get any easier than this to import a whole directory full of varied CSVs:

```powershell
Get-ChildItem C:\temp\csv | Import-DbaCsv -SqlInstance sql01 -Database tempdb -AutoCreateTable
```

This will get a list of all CSV files in `C:\temp\csv`, then import them to the `tempdb` database on `sql01`, using the basename of the file as the table name. If the table doesn't already exist, it'll auto-create it using nvarchar(MAX), which is inefficient/slow but guaranteed to be big enough.

<center><img src=/images/import-dir.png></center>

Once the data has been imported, you can massage this data however you like within SQL Server, which is much more suited for data manipulation than PowerShell due to the focus and power of T-SQL.

As suggested by [Import-DbaCsv](https://dbatools.io/Import-DbaCsv)'s verbose messages, if you're looking for the fastest import possible, you should pre-create the table with appropriate datatypes. But if you just want the data in SQL Server with no fuss, `-AutoCreateTable` will do.

### Pre-creating tables to increase performance

Here's the DDL of a sample table which was automatically created to accommodate a CSV import.

```sql
CREATE TABLE allcountries (
	GeoNameId nvarchar(max) NULL,
	Name nvarchar(max) NULL,
	AsciiName nvarchar(max) NULL,
	AlternateNames nvarchar(max) NULL,
	Latitude nvarchar(max) NULL,
	Longitude nvarchar(max) NULL,
	FeatureClass nvarchar(max) NULL,
	FeatureCode nvarchar(max) NULL,
	CountryCode nvarchar(max) NULL,
	Cc2 nvarchar(max) NULL,
	Admin1Code nvarchar(max) NULL,
	Admin2Code nvarchar(max) NULL,
	Admin3Code nvarchar(max) NULL,
	Admin4Code nvarchar(max) NULL,
	Population nvarchar(max) NULL,
	Elevation nvarchar(max) NULL,
	Dem nvarchar(max) NULL,
	Timezone nvarchar(max) NULL,
	ModificationDate nvarchar(max) NULL
)
```

This resulted in an import of 4.4 million rows in 2 minutes and 4 seconds, or 35446 rows per second.

```
ComputerName  : workstation
InstanceName  : MSSQLSERVER
SqlInstance   : workstation
Database      : tempdb
Table         : allcountries
Schema        : dbo
RowsCopied    : 4400000
Elapsed       : 00:02:04
RowsPerSecond : 35446.7
Path          : C:\Archive\csv\allcountries.csv
```

Acceptable enough, especially for a wide table. The import can be sped up by creating more accurate data types, however. After optimizing the datatypes for the data that will actually be in the table, the DDL looks like this:

```sql
CREATE TABLE allcountries (
   GeoNameId int PRIMARY KEY,
   Name nvarchar(200),
   AsciiName nvarchar(200),
   AlternateNames nvarchar(max),
   Latitude float,
   Longitude float,
   FeatureClass char(1),
   FeatureCode varchar(10),
   CountryCode char(2),
   Cc2 varchar(255),
   Admin1Code varchar(20),
   Admin2Code varchar(80),
   Admin3Code varchar(20),
   Admin4Code varchar(20),
   Population bigint,
   Elevation varchar(255),
   Dem int,
   Timezone varchar(40),
   ModificationDate smalldatetime,
)
```

This resulted in an import of 4.4 million rows in about 59 seconds, or 74754 rows per second. This doubles the performance!

```
ComputerName  : workstation
InstanceName  : MSSQLSERVER
SqlInstance   : workstation
Database      : tempdb
Table         : allcountries
Schema        : dbo
RowsCopied    : 4400000
Elapsed       : 58.86 s
RowsPerSecond : 74754.9
Path          : C:\Archive\csv\allcountries.csv
```

If you did just stuff your data into the database, you can use INSERT...SELECT to import the data into the properly structured table. In my case, it took 32 seconds to insert 4.4 million rows from the import table to the optimized table.

## Reliability

The most important part of importing data is that the data remains the same. But I found that some data could disappear if multithreading was used. Multithreading got me up to 260,000 rows per second for some data sets, but sometimes like 4 rows out of millions would be missing. Not good enough, it needs to be perfect.

I've seen this behavior in other PowerShell runspace/multithreading projects (C# can deliver perfection but PS and multithreading is complicated), so by default, I removed runspaces which reduced the import speed by half. That was hard to let go of, but opened me up to using a third-party solution like LumenWorks.

## Data quality management

As I mentioned earlier, real-world CSVs are filled with imperfect data. For example, let's say that you have a CSV and it uses quotes when a comma is present in the actual data.

```csv
101152, Skies of Ores Sunblock, "This 30 SPF sunblock is light, scent-free and safe for all skin types."
```

This has to be handled within the importer, because if the data is imported as-is, the quotes will be included in the database and that's not what we want.

Handling this data introduced nanosecond slowdowns so my initial projects didn't support it because I was _obsessed_ with speed. As it turns out, though, most CSVs contain these types of exceptions, so most people couldn't even use initial versions of `Import-DbaCsv` (then called _Import-CsvToSql_) to import their data.

When I let go of my dreams of achieving speeds that matched `bcp` (a program compiled in c, which is known for its blazing speeds even moreso than other compiled languages), I ended up with a smarter tool that works for most people and most datasets.

## My favorite things

It's near impossible to quickly (milliseconds) determine how many rows are going to be uploaded within in a large file. Because of this, I couldn't add a progress bar for the rows left to upload, but I could show how many rows were imported and the elapsed time, updated every 50,000 rows.

<center><img src=/images/rowspersecond.png></center>

I also like the output, which includes things I'm always curious about.

```
ComputerName  : workstation
InstanceName  : MSSQLSERVER
SqlInstance   : workstation
Database      : tempdb
Table         : AirlineDemoSmall
Schema        : dbo
RowsCopied    : 600000
Elapsed       : 4.99 s
RowsPerSecond : 120168.2
Path          : C:\temp\csv\AirlineDemoSmall.csv
```

I appreciate that [Import-DbaCsv](https://dbatools.io/Import-DbaCsv) just makes it so easy to import a bunch of CSVs, especially when I'm using it for my own projects. Yeah, the newly created tables are inefficient but the data is there and I can just use that table structure to create a new table and go about my day.

My most favorite thing, though, is feeling confident that Lumenworks will properly import user data, even at the expense of speed.
