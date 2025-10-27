---
title: "New-DbaSqlParameter"
slug: "New-DbaSqlParameter"
date: 2024-01-01
layout: "single"
author: "Chrissy LeMaire (@cl), netnerds.net"
availability: "Windows, Linux, macOS"
synopsis: "Creates a SqlParameter object for use with parameterized queries and stored procedures."
tags:
  - "Utility"
  - "Query"
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/New-DbaSqlParameter.ps1"
bohUrl: "https://dataplat.github.io/boh#New-DbaSqlParameter"
draft: false
---

# New-DbaSqlParameter

| Property | Value |
| --- | --- |
| **Author** | Chrissy LeMaire (@cl), netnerds.net |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [New-DbaSqlParameter](https://github.com/dataplat/dbatools/blob/master/public/New-DbaSqlParameter.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [New-DbaSqlParameter](https://dataplat.github.io/boh#New-DbaSqlParameter).

## Synopsis

Creates a SqlParameter object for use with parameterized queries and stored procedures.

## Description

Creates a Microsoft.Data.SqlClient.SqlParameter object with specified properties like data type, direction, size, and value. This is essential for executing parameterized queries and stored procedures safely through Invoke-DbaQuery, preventing SQL injection while providing precise control over parameter behavior. Supports all SqlParameter properties including output parameters, table-valued parameters, and column encryption for secure data handling.

## Syntax

```powershell
New-DbaSqlParameter
    [[-CompareInfo] <String>]
    [[-DbType] <String>]
    [[-Direction] <String>]
    [-ForceColumnEncryption]
    [-IsNullable]
    [[-LocaleId] <Int32>]
    [[-Offset] <String>]
    [[-ParameterName] <String>]
    [[-Precision] <String>]
    [[-Scale] <String>]
    [[-Size] <Int32>]
    [[-SourceColumn] <String>]
    [-SourceColumnNullMapping]
    [[-SourceVersion] <String>]
    [[-SqlDbType] <String>]
    [[-SqlValue] <Object>]
    [[-TypeName] <String>]
    [[-UdtTypeName] <String>]
    [[-Value] <Object>]
    [-EnableException]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example:  1 

```powershell
PS C:\> New-DbaSqlParameter -ParameterName json_result -SqlDbType NVarChar -Size -1 -Direction Output
```

Creates a SqlParameter object that can be used with Invoke-DbaQuery<br>

#####  Example:  2 

```powershell
PS C:\> $output = New-DbaSqlParameter -ParameterName json_result -SqlDbType NVarChar -Size -1 -Direction Output
PS C:\> Invoke-DbaQuery -SqlInstance localhost -Database master -CommandType StoredProcedure -Query my_proc -SqlParameter $output
PS C:\> $output.Value
```

Creates an output parameter and uses it to invoke a stored procedure.<br>

### Optional Parameters

##### -CompareInfo

Defines how string comparisons are performed when this parameter is used in SQL operations. Controls case sensitivity, accent sensitivity, and other collation behaviors.  
Use this when you need specific string comparison rules that differ from the database's default collation settings.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | None,IgnoreCase,IgnoreNonSpace,IgnoreKanaType,IgnoreWidth,BinarySort2,BinarySort |

##### -DbType

Specifies the .NET data type for the parameter using System.Data.DbType enumeration. This is an alternative to SqlDbType for cross-database compatibility.  
Use SqlDbType instead for SQL Server-specific operations, as it provides better type mapping and performance.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | AnsiString,Binary,Byte,Boolean,Currency,Date,DateTime,Decimal,Double,Guid,Int16,Int32,Int64,Object,SByte,Single,String,Time,UInt16,UInt32,UInt64,VarNumeric,AnsiStringFixedLength,StringFixedLength,Xml,DateTime2,DateTimeOffset |

##### -Direction

Specifies whether the parameter passes data into the query (Input), returns data from a stored procedure (Output), or both (InputOutput).  
Required when creating output parameters for stored procedures that return values through parameters rather than result sets.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Input,Output,InputOutput,ReturnValue |

##### -ForceColumnEncryption

Enforces encryption of a parameter when using Always Encrypted.  
If SQL Server informs the driver that the parameter does not need to be encrypted, the query using the parameter will fail.  
This property provides additional protection against security attacks that involve a compromised SQL Server providing incorrect encryption metadata to the client, which may lead to data disclosure.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -IsNullable

Indicates whether the parameter can accept null values, but does not enforce null validation during query execution.  
This is primarily used for metadata purposes and DataAdapter operations, not for runtime null checking.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -LocaleId

Specifies the locale identifier (LCID) that determines regional formatting conventions for the parameter value.  
Use this when working with locale-specific data formatting, particularly for date, time, and numeric values that need specific regional representation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -Offset

Specifies the starting position within the parameter value when working with binary or text data types.  
Useful when you need to read or write data starting from a specific byte position rather than the beginning of the value.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ParameterName

Specifies the name of the parameter as it appears in the SQL query or stored procedure, including the '@' prefix.  
Must match exactly with parameter names defined in your SQL statements for proper parameter binding.

| Property | Value |
| --- | --- |
| Alias | Name |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Precision

Defines the total number of digits for numeric data types like decimal or numeric columns.  
Required when working with precise financial calculations or when the target column has specific precision requirements.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Scale

Specifies the number of decimal places for numeric data types, working together with Precision.  
Essential for financial data and calculations where exact decimal representation is required to prevent rounding errors.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Size

Defines the maximum length for variable-length data types like varchar, nvarchar, or varbinary columns.  
Use -1 for MAX data types (varchar(max), nvarchar(max)) to handle large text or binary data without size restrictions.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | 0 |

##### -SourceColumn

Maps the parameter to a specific column name in a DataTable or DataSet for bulk operations.  
Used primarily with DataAdapter operations when you need to map parameter values to specific columns during data updates.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SourceColumnNullMapping

Indicates whether the source column allows null values, helping SqlCommandBuilder generate correct UPDATE statements.  
Important for DataAdapter scenarios where the framework needs to understand column nullability for proper SQL generation.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value | False |

##### -SourceVersion

Specifies which version of data to use from a DataRow when the parameter value comes from a DataSet.  
Use 'Current' for modified data, 'Original' for unchanged data, or 'Proposed' for uncommitted changes during DataAdapter operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | Original,Current,Proposed,Default |

##### -SqlDbType

Specifies the SQL Server data type for the parameter, ensuring proper type mapping and optimal performance.  
Prefer this over DbType for SQL Server operations as it provides exact type matching with SQL Server's native data types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |
| Accepted Values | BigInt,Binary,Bit,Char,DateTime,Decimal,Float,Image,Int,Money,NChar,NText,NVarChar,Real,UniqueIdentifier,SmallDateTime,SmallInt,SmallMoney,Text,Timestamp,TinyInt,VarBinary,VarChar,Variant,Xml,Udt,Structured,Date,Time,DateTime2,DateTimeOffset |

##### -SqlValue

Sets the parameter value using SQL Server-specific data types (like SqlString, SqlInt32) instead of standard .NET types.  
Use this when you need to handle SQL null values explicitly or work with SQL Server-specific type behaviors that differ from .NET types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TypeName

Specifies the user-defined table type name when passing DataTable objects as table-valued parameters to stored procedures.  
The type name must match a table type defined in the database schema and is essential for bulk data operations.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -UdtTypeName

Specifies the name of a user-defined data type (UDT) or CLR type when working with custom SQL Server data types.  
Required when passing complex objects or custom data structures that extend beyond standard SQL Server data types.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Value

Specifies the actual data value to pass to the SQL parameter, automatically handling type conversion from .NET to SQL types.  
The most commonly used parameter property for passing data into queries and stored procedures safely.

| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

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
