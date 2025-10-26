---
title: "I ❤ Invoke-DbaQuery"
date: 2018-01-08
author: "Pétur Grétarsson"
slug: "i-love-invoke-query"
aliases:
  - /i-love-invoke-query/
  - /i-love-invoke-query/index.html
categories: [announcements]
tags: [party]
draft: false
---

Pétur Grétarsson, here. Long time dbatools fan, first time blogger. I really love the new [Invoke-DbaQuery](https://dbatools.io/Invoke-DbaQuery) command and wanted to share how I use it.

I have well over 100 Availability Groups to look after in different domains so it can be a bit difficult to check things when needed. We have opened required ports allowing connections from one SQL management server to those for monitoring purposes including using [Idera SQL Inventory Manager](https://www.idera.com/productssolutions/sqlserver/sql-elements) for basic health checks.

Having said that, there's some additional monitoring I like to be able to do such as checking the health status of Availability Groups to see if there are any potential resource issues.

## Invoke-DbaQuery makes monitoring easy

I've used Invoke-DbaQuery for so many things. Here's one example: how I used the new function in my latest Availability Group check.

1. I created and stored a SQL Server Credential on the SQL management server using Credential Manager (found from Control Panel) using the account that executes the PowerShell scripts in schedule.
2. I scheduled the script below to run via Visual Studio Team Services online (or the Agent on my SQL management server)
3. I executed a procedure from PowerShell script that for example checks if any Availability Group is unhealthy and if so then sends email to our support team

```powershell
# DOMAIN1 SQL Replica Nodes (this one has 90% of the availability groups).
$result = Get-DbaRegisteredServer -SqlServer [INSTANCENAME] -Group SqlAlwaysOnReplicaNodes | Invoke-DbaQuery -File "FULL_PATH\aog_health.sql"  | SELECT INSTANCE_NAME, SQL_VERSION, MAX_SERVER_MEMORY,NAME, PAGE_LIFE_EXPECTANCY, MAX_DEGREE_OF_PARALLELISM, LOGICAL_CPU_COUNT, TEMPDB_FILE_COUNT, PERCENTAGE_CPU_SIGNAL_WAIT, PERCENTAGE_RESOURCE_WAITS, DNS_NAME, DATABASE_COUNT, IP_CONFIGURATION_STRING_FROM_CLUSTER, ROLE_DESC, AVAILABILITY_MODE_DESC, FAILOVER_MODE_DESC, SYNCHRONIZATION_HEALTH_DESC, AUTOMATED_BACKUP_PREFERENCE_DESC |  ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAvailabilityGroupsHealth -Confirm:$false

# DOMAIN2 SQL Replica Nodes
$cred1 = Get-StoredCredential -Target DOMAIN2
$result = "INSTANCE1", "INSTANCE2", "ETCINSTANCES" | Invoke-DbaQuery -SqlCredential $cred1 -File "FULL_PATH\aog_health.sql"  | SELECT INSTANCE_NAME, SQL_VERSION, MAX_SERVER_MEMORY,NAME, PAGE_LIFE_EXPECTANCY, MAX_DEGREE_OF_PARALLELISM, LOGICAL_CPU_COUNT, TEMPDB_FILE_COUNT, PERCENTAGE_CPU_SIGNAL_WAIT, PERCENTAGE_RESOURCE_WAITS, DNS_NAME, DATABASE_COUNT, IP_CONFIGURATION_STRING_FROM_CLUSTER, ROLE_DESC, AVAILABILITY_MODE_DESC, FAILOVER_MODE_DESC, SYNCHRONIZATION_HEALTH_DESC, AUTOMATED_BACKUP_PREFERENCE_DESC |  ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAvailabilityGroupsHealth -Confirm:$false

# DOMAIN3 SQL Replica Nodes
$cred2 = Get-StoredCredential -Target DOMAIN2
$result = "INSTANCE1", "INSTANCE2", "ETCINSTANCES"| Invoke-DbaQuery -SqlCredential $cred2 -File " FULL_PATH\aog_health.sql"  | SELECT INSTANCE_NAME, SQL_VERSION, MAX_SERVER_MEMORY,NAME, PAGE_LIFE_EXPECTANCY, MAX_DEGREE_OF_PARALLELISM, LOGICAL_CPU_COUNT, TEMPDB_FILE_COUNT, PERCENTAGE_CPU_SIGNAL_WAIT, PERCENTAGE_RESOURCE_WAITS, DNS_NAME, DATABASE_COUNT, IP_CONFIGURATION_STRING_FROM_CLUSTER, ROLE_DESC, AVAILABILITY_MODE_DESC, FAILOVER_MODE_DESC, SYNCHRONIZATION_HEALTH_DESC, AUTOMATED_BACKUP_PREFERENCE_DESC |  ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAvailabilityGroupsHealth -Confirm:$false
```

This script:

- Gets a list of servers using [Get-DbaRegisteredServer](https://dbatools.io/Get-DbaRegisteredServer)
- Pipes that list to Invoke-DbaQuery which executes a script against each of the servers
- Converts the results of the script to a datatable
- Writes the converted output to a table in my management database

And here is the simple T-SQL script I use in the above example. It is now so nice to be able to see version, max memory, PLE, logical CPU count, tempdb files, CPU signal wait, listener name, IP Address, failover mode, synchronization health etc. for all of the availability groups from one table which gets updated frequently values.

```tsql
SELECT (SELECT @@SERVERNAME) instance_name,
       (SELECT @@VERSION) sql_version,
       (SELECT value_in_use FROM sys.configurations WHERE name = 'max server memory (MB)') max_server_memory,
       (SELECT cntr_value / 3600 AS PLE_HOURS FROM sys.dm_os_performance_counters WHERE object_name LIKE '%Manager%' AND counter_name = 'Page life expectancy') page_life_expectancy,
       (SELECT value_in_use FROM sys.configurations WHERE name = 'max degree of parallelism') max_degree_of_parallelism,
       (SELECT cpu_count FROM sys.dm_os_sys_info) logical_cpu_count,
       (SELECT COUNT(name) FROM sys.master_files WHERE database_id = 2 AND type_desc = 'ROWS') tempdb_file_count,
       (SELECT CAST(100.0 * SUM(signal_wait_time_ms) / SUM(wait_time_ms) AS NUMERIC(20,2))  FROM sys.dm_os_wait_stats) percentage_cpu_signal_wait,
       (SELECT CAST(100.0 * SUM(wait_time_ms - signal_wait_time_ms) / SUM(wait_time_ms) AS NUMERIC(20, 2)) FROM sys.dm_os_wait_stats) percentage_resource_waits,
       name,
       dns_name,
       (SELECT COUNT(*) FROM sys.databases WHERE state_desc = 'ONLINE' AND database_id > 4) database_count,
       ip_configuration_string_from_cluster,
       role_desc,
       availability_mode_desc,
       failover_mode_desc,
       synchronization_health_desc,
       automated_backup_preference_desc
FROM sys.availability_groups_cluster AS AGC
     INNER JOIN [master].sys.dm_hadr_availability_replica_cluster_states AS RCS ON RCS.group_id = AGC.group_id
     INNER JOIN [master].sys.dm_hadr_availability_replica_states AS ARS ON ARS.replica_id = RCS.replica_id
     INNER JOIN [master].sys.availability_group_listeners AS AGL ON AGL.group_id = ARS.group_id
     INNER JOIN [master].sys.availability_replicas AS ARN ON ARS.replica_id = ARN.replica_id
     AND ars.is_local = 1;
```

We have thousands of databases in these Availability Groups so it is important to ensure that they are healthy. We have monitoring systems for the most important ones but you can imagine the cost. Therefore, it is nice to be able to build some basic checks like these. Running customized scripts and using the [Get-DbaRegisteredServer](https://dbatools.io/Get-DbaRegisteredServer) is just fantastic 😊.

## Additional uses for dbatools

I also use other dbatools commands for getting a daily summary email report for all our SQL Agent jobs which are either failing or not having failure notifications configured from all our environments. We have many people adding SQL Agent Jobs and sometimes the notifications get forgotten so this allows me to catch that immediately and get daily status report of all our SQL Agent failed jobs.

I scheduled the script below to run via Visual Studio Team Services online (or the Agent on my SQL management server). This script runs just before office hours, so we can have the most recent status in the morning.

```powershell
# Get SQL Agent Job information
# Fetch from DOMAIN1
$result = DbaRegisteredServer -SqlServer [INSTANCENAME] -Group SqlAlwaysOnReplicaNodes | Get-DbaAgentJob | SELECT ComputerName, InstanceName, SqlInstance, Name, Category, OwnerLoginName, CurrentRunStatus, CurrentRunRetryAttempt, Enabled, LastRunDate, LastRunOutcome, DateCreated, HasSchedule, OperatorToEmail, CreateDate | ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAgentJobs -Truncate -Confirm:$false
$result = Get-DbaRegisteredServer -SqlServer [INSTANCENAME] -Group SqlStandalone | Get-DbaAgentJob | SELECT ComputerName, InstanceName, SqlInstance, Name, Category, OwnerLoginName, CurrentRunStatus, CurrentRunRetryAttempt, Enabled, LastRunDate, LastRunOutcome, DateCreated, HasSchedule, OperatorToEmail, CreateDate | ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAgentJobs -Confirm:$false

# Fetch from DOMAIN2
$cred1 = Get-StoredCredential -Target DOMAIN2
$result = "INSTANCE1", "INSTANCE2", "ETCINSTANCES" | Get-DbaAgentJob -SqlCredential $cred1 | SELECT ComputerName, InstanceName, SqlInstance, Name, Category, OwnerLoginName, CurrentRunStatus, CurrentRunRetryAttempt, Enabled, LastRunDate, LastRunOutcome, DateCreated, HasSchedule, OperatorToEmail, CreateDate |  ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAgentJobs -Confirm:$false

# Fetch from DOMAIN3
$cred2 = Get-StoredCredential -Target DOMAIN3
$result = "INSTANCE1", "INSTANCE2", "ETCINSTANCES" | Get-DbaAgentJob -SqlCredential $cred2 | SELECT ComputerName, InstanceName, SqlInstance, Name, Category, OwnerLoginName, CurrentRunStatus, CurrentRunRetryAttempt, Enabled, LastRunDate, LastRunOutcome, DateCreated, HasSchedule, OperatorToEmail, CreateDate | ConvertTo-DbaDataTable
Write-DbaDataTable -InputObject $result -SqlServer [INSTANCENAME] -Table SqlManagementRepository.dbo.SqlAgentJobs -Confirm:$false
```

Then I have a job that runs soon after the above check. This job is also PowerShell script that just executes a procedure in the database management repository and if the procedure has result set then it gets sent to the database team.

The procedure is just very basic and simple check from the table that is created in the above check.

```tsql
CREATE PROCEDURE [dbo].[SqlAgentJobsSummary]
AS
     IF
     (SELECT COUNT(*)
        FROM SqlAgentJobs
        WHERE Enabled = 'True'
        AND LastRunOutcome NOT IN('Succeeded', 'Cancelled')
     ) >= 1

        BEGIN
             SELECT SqlInstance AS "SQL Instance.............",
                    Name          AS "SQL Agent Job............" ,
                    LastRunDate AS "Last Run.................",
                    LastRunOutcome AS "Last Run Status.....",
                    OperatorToEmail AS "Notified To.............."
             FROM SqlAgentJobs
             WHERE Enabled = 'True'
             AND LastRunOutcome NOT IN('Succeeded', 'Cancelled')
             ORDER BY LastRunDate;
     END;
GO
```

Alternatively, I could use some dbatools commands and [Send-MailMessage](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/send-mailmessage) but I appreciated the fact that I could so easily integrate with my existing SQL solutions.

I also use the command for many of our functions which run against all our +300 instances and +12.000 databases and store the result in central management database. Other validations I use dbatools for: file allocation unit size is incorrect, proper power plan is being used, SPN is configured, transaction log VLF count does not exceed threshold, SQL orphaned files do not exist, invalid SQL logins do not exist and much more. All those checks are done with dbatools and visible in one central database repository.

Thanks for reading!
Pétur 🇮🇸
