---
title: "managing data compression with dbatools"
date: 2019-01-02
slug: "compression"
aliases:
  - /compression/
  - /compression/index.html
categories: [announcements]
tags: []
draft: false
---

Data compression is not a new feature in SQL Server. In fact it has been around since SQL Server 2008, so why does it matter now? Before SQL Server 2016 SP1 this feature was only available in Enterprise edition. Now that it's in Standard edition data compression can be an option for far more people.

dbatools has three functions available to help you work with data compression, and in true dbatools style it makes it easy and fast to compress your databases.

## Get-DbaDbCompression

This one is pretty straightforward, it shows you your current compression levels across one or more SQL Servers. You can either view all objects or narrow it down to a specific database, as shown below.

```powershell
Get-DbaDbCompression -SqlInstance Server1 -Database AdventureWorks2017 |
Select-Object Database, Schema, TableName, IndexName, IndexType, Partition, DataCompression
```

![Get-DbaDbCompression output](https://dbatools.io/wp-content/uploads/2018/12/Get-DbaDbCompression.jpg)

## Test-DbaDbCompression

Now this is where the magic happens. This function takes the leg work out of deciding whether compression is a good fit for your database. When you look to implement data compression you have two options (as far as rowstore compression goes), row or page compression. Page compression gives you superior space savings but it comes with more CPU overhead.

### inefficient data types and repeated data

When you start to analyze your database to make this decision you first need to look at your table structures. Do you have a lot of fixed length datatypes that aren't being fully utilized? Think bigint storing the number 1 or char(1000) storing 'Jess' – then row compression could be a good fit. Do you have a lot of repeating data, like State or Gender columns? Then page compression could do wonders for you.

### workload and I/O

Secondly, and perhaps more importantly, is your workload. As previously mentioned there is a CPU overhead associated with querying compressed data, so if you are doing a lot of seeks and/or updates the benefits might be outweighed by the costs. On the other hand if you do a lot of scans one of the benefits of data compression, more data stored per page, will greatly reduce your I/O costs and improve your performance overall.

This is a lot to think about for each object in each of your databases. Worry not friends! The SQL Server Tiger Team created a script (available on their [github](https://github.com/Microsoft/tigertoolbox/tree/master/Evaluate-Compression-Gains)) that will analyze both your table structures and your workload. This makes up the logic within Test-DbaDbCompression.

### compression in action

You can see below I've analyzed the entire AdventureWorks2017 database and saved the results to a variable. This makes it easy to work through the output, looking at certain objects/indexes of interest.

```powershell
$results = Test-DbaDbCompression -SqlInstance Server1 -Database AdventureWorks2017
$results | Where-Object TableName -eq 'SalesOrderDetail' |
Select-Object TableName, IndexName, IndexId, PercentScan, PercentUpdate, RowEstimatePercentOriginal, PageEstimatePercentOriginal, CompressionTypeRecommendation, SizeCurrent, SizeRequested, PercentCompression | Format-Table
```

![Test-DbaDbCompression output](https://dbatools.io/wp-content/uploads/2018/12/Test-DbaDbCompression.jpg)

This database is actually running in a container on my laptop so there isn't much activity, but when you use this command the PercentScan and PercentUpdate will be determined by your workload so the longer your instance has been up the more accurate these will be.

I've selected to look at the SalesOrderDetail table in the above example. You can see the function suggests we apply page compression to our primary key (IndexId of 1) and one of our Nonclustered indexes (IndexId of 3).

## Set-DbaDbCompression

The final compression function is used to apply compression to our objects. You can choose to apply row or page compression to your entire database, which could be useful to save space in your development or test environments.

```powershell
Set-DbaDbCompression -SqlInstance Server1 -Database AdventureWorks2017 -CompressionType Page
```

More useful however is to once again use the Tiger Team script to apply the recommended compression to your objects.

Running the following one line will first analyze your database using the same logic we discussed above, and then apply the suggested levels to each index and table within your database.

```powershell
Set-DbaDbCompression -SqlInstance Server1 -Database AdventureWorks2017 -CompressionType Recommended
```

### additional options

There are also some other options available to control this behavior. You can use the `-PercentCompression` parameter so objects will only be compressed if the calculated savings are greater than the specified percentage. You also can control the amount of time this command runs for. If you set `-MaxRunTime` to 60 it will finish the current compression command and then stop.

```powershell
Set-DbaDbCompression -SqlInstance Server1 -Database AdventureWorks2017 -CompressionType Recommended -PercentCompression 25 -MaxRunTime 60
```

### conclusion

One final idea I'll leave you with- earlier I ran Test-DbaDbCompression and saved the output to a variable. I did this because I like to be able to see what the suggestions are and can also save this output for a later date if needed. Once I'm happy and ready to run Set-DbaDbCompression I don't want to wait for the analysis to happen again. I can instead pass in the output I saved using the `-InputObject` and Set-DbaDbCompression will work through those suggestions applying the recommended compression levels immediately.

```powershell
Set-DbaDbCompression -SqlInstance Server1 -InputObject $results
```

Data compression can be a powerful tool in your DBA toolbelt for saving space and performance tuning. You can apply this with minimal effort and no application code changes. I'd recommend playing with the Test-DbaDbCompression function and see if you can't squeeze out some easy gains.

Cheers,

Jess
