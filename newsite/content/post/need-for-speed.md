---
title: "Need For Speed – Find-DbaStoredProcedure"
date: 2017-03-08
slug: "need-for-speed"
aliases:
  - /need-for-speed/
  - /need-for-speed/index.html
categories: [announcements]
tags: []
draft: false
---

This time it's not Chrissy, not Drew, not Stuart, not even Shawn…today it's Claudio writing to you! 😊

With our recent release, "[twentyfiveschmeckles (v0.8.694)](https://dbatools.io/twentyfiveschmeckles)", we introduced the command [Find-DbaStoredProcedure](https://docs.dbatools.io/Find-DbaStoredProcedure/).

This command allows us to find which stored procedures have a specific string or regular expression. While that may not be groundbreaking, what is new are the features we provide and the speed at which we return them.

## Use cases

Let me explain at least two cases where I think this command is (very) useful:

1. Back in the days when I was a full time T-SQL developer each time we needed to build a new feature or implement an improvement that required new columns in tables, we had to find which stored procedures to target for refactoring. Modifying stored procedures that perform CRUD (Create, Read, Update, Delete) operations was a common target because of the multiple phases required in maintaining data correctly:

   - we need to insert values on the new columns (Create)
   - we then need to read and retrieve those new columns (Read)
   - if the value is suitable of changes we need to update it (Update)
   - and finally if we need to delete records, that column may be part of some WHERE clause (Delete).

It's clear we need a way find all stored procedures that use a specific table or a sibling column and we want the results to be returned as quickly and with as little work as possible; often times you may need to implement many changes and simply searching through the database or results can be frustrating or inexact.

2. As a full-time DBA you may receive complaints like "a stored procedure is failing on instance A" or vague information like "I received an error incorrect syntax near 'blah'." Often we don't have further input and we need to narrow down which database, procedure, and now line this issue belongs to belongs.

If a developer asks for help, or you need to check a version of a module, you typically starts with determining which change was made, visiting the database on all environments (eg. DEV, QA, PRD and more!) to verify which environments it was made, when it happened, and in which environments changes might be missing

That's just two scenarios, I'm sure that you have encountered dozens more, or will in the future.

## Why should you care?

> $servers | Find-DbaStoredProcedure -Pattern lemaire 👉37,545 #SQLServer stored procedures on 9 servers evaluated in 8.67 seconds! https://t.co/uTBcP6bCHJ
>
> — Chrissy LeMaire (@cl) [February 9, 2017](https://twitter.com/cl/status/829642196345294848)

Chrissy tweeted her experience going through 9 servers and searching more than 37,000 objects in less than 9 seconds.

My first thought was "WOW! that's fast." but given the results I honestly wondered how and if it could actually be that fast (Chrissy did, too, actually.)

Turns out, it's true and I'm here to share my findings with you!

I've done four different tests comparing dbatools command and standard SSMS approaches I've used since the beginning of time:

1. Search only on one database in one server
2. Search on all databases (40) on one server
3. Search on one database in two different server
4. Search on all databases (47) in two different servers

Note: For the 3rd and 4th test I will be connected to a different instance (sql2012) in order to add the connect time. This will simulate better what dbatools uses.

### For 1st test:

We will use the following T-SQL:

```sql
USE AdventureWorks2014
GO

SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
FROM sys.sql_modules m
INNER JOIN sys.procedures p
ON m.object_id = p.object_id
WHERE m.[definition] like '%JobTitle%'
```

dbatools command:

```powershell
Find-DbaStoredProcedure -SqlInstance sql2016 -Databases AdventureWorks2014 -Pattern JobTitle
```

### For 2nd test:

T-SQL:

```sql
exec sp_MSforeachdb 'USE [?]
SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
FROM sys.sql_modules m
INNER JOIN sys.procedures p
ON m.object_id = p.object_id
WHERE m.[definition] like ''%JobTitle%'''
```

And the dbatools command looks like:

```powershell
Find-DbaStoredProcedure -SqlInstance sql2016 -Pattern JobTitle
```

### 3rd test:

T-SQL code (Note: sqlcmd mode must be enabled on SSMS to run this script – [please read this article to learn more](http://redglue.eu/it-is-possible-to-run-scripts-inside-ssms-on-multiple-instances-without-using-cms-yes-it-is/)):

```sql
:connect sql2016
Use AdventureWorks2014
GO
 SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
  FROM sys.sql_modules m
    INNER JOIN sys.procedures p
       ON m.object_id = p.object_id
 WHERE m.[definition] like '%JobTitle%'
GO

:connect sql2014
Use AdventureWorks2014
GO
 SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
  FROM sys.sql_modules m
    INNER JOIN sys.procedures p
       ON m.object_id = p.object_id
 WHERE m.[definition] like '%JobTitle%'
GO
```

dbatools command:

```powershell
Find-DbaStoredProcedure -SqlInstance sql2016, sql2014 -Databases AdventureWorks2014 -Pattern JobTitle
```

### 4th and final test:

T-SQL:

```sql
:connect sql2016
SET STATISTICS TIME ON
exec sp_MSforeachdb 'USE [?]
SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
  FROM sys.sql_modules m
    INNER JOIN sys.procedures p
       ON m.object_id = p.object_id
 WHERE m.[definition] like ''%JobTitle%'''
GO

:connect sql2014
SET STATISTICS TIME ON
exec sp_MSforeachdb 'USE [?]
SELECT db_name() AS DBName, p.[name], m.[definition] as TextBody
  FROM sys.sql_modules m
    INNER JOIN sys.procedures p
       ON m.object_id = p.object_id
 WHERE m.[definition] like ''%JobTitle%'''
```

dbatools command:

```powershell
Find-DbaStoredProcedure -SqlInstance sql2016, sql2014 -Pattern JobTitle
```

### Here are the results:

The values are in ms (less is better)

![Results chart](https://dbatools.io/wp-content/uploads/2017/03/img_58c010e0a791c.png?w=800&ssl=1)

## A tie?

Not even close. Lets look to the output and see which one appears richer.

### More detail in the results

T-SQL output:

![T-SQL output](https://dbatools.io/wp-content/uploads/2017/03/img_58bffc163d740.png?resize=700%2C304&ssl=1)

dbatools output:

![dbatools output](https://dbatools.io/wp-content/uploads/2017/03/img_58bffc7c5ba3b.png?resize=700%2C290&ssl=1)

We show the line number where pattern was found.

### And similarly, more powerful search abilities

Consider accurately searching for all occurrences the following regex pattern, which represents an email address:

```powershell
Find-DbaStoredProcedure -SqlInstance sql2016 -Pattern '\w+@\w+\.\w+'
```

We can even output this to a grid and filter:

![Grid output](https://dbatools.io/wp-content/uploads/2017/03/img_58bffd3d34b84.png?w=800&ssl=1)

## But I want nice GUI! – Redgate SQL Search for the rescue

Well, for some of us PowerShell console is a nice GUI 😊

If you want to do this type of search, you can download and use the free [SQL Search from Redgate](http://www.red-gate.com/products/sql-development/sql-search/). This is a great tool that allows us to search not only on Stored Procedures but also on other object definitions such as Tables, Views, Constraints, Triggers, Functions and even Agent Jobs.

![Redgate SQL Search](https://dbatools.io/wp-content/uploads/2017/03/img_58b808142629c.png?w=800&ssl=1)

This is fast! See it in action.

{{< youtube NELZDIOQHy4 >}}

You can see additional details in the grid result, such as:

- The type of object matched
- The type of match (such as column name, just a text match)
- The line of SQL that matches your search (Just like our Find-DbaStoredProcedure command)

![Grid details](https://dbatools.io/wp-content/uploads/2017/03/img_58b811219a53c.png?w=800&ssl=1)

## Wrap up

So for me and those that use the traditional query(SSMS) based methods, this is like night and day when dealing with multiple databases. It really is faster!

I wanted to blog this for you because I think this brings new ways to gather and filter the output we often need and hopefully you can use them further in the pipeline.

If you have experience with this scenario or others that that you would like to share, please drop us a message 😊

Thanks for reading.
Claudio
