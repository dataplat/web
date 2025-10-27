---
title: "Select-DbaObject"
slug: "Select-DbaObject"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Wrapper around Select-Object, extends property parameter."
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Select-DbaObject.ps1"
bohUrl: "https://dataplat.github.io/boh#Select-DbaObject"
draft: false
---

# Select-DbaObject

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Select-DbaObject](https://github.com/dataplat/dbatools/blob/master/public/Select-DbaObject.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Select-DbaObject](https://dataplat.github.io/boh#Select-DbaObject).

## Synopsis

Wrapper around Select-Object, extends property parameter.

## Description

Wrapper around Select-Object, extends property parameter.  
  
            This function allows specifying in-line transformation of the properties specified without needing to use complex hashtables.  
            For example, renaming a property becomes as simple as 'Length as Size'  
  
            Also supported:  
  
            - Specifying a typename  
  
            - Picking the default display properties  
  
            - Adding to an existing object without destroying its type  
  
            See the description of the Property parameter for an exhaustive list of legal notations for in-line transformations.

## Syntax

```powershell
Select-DbaObject
    [-Property <DbaSelectParameter[]>]
    [-Alias <SelectAliasParameter[]>]
    [-ScriptProperty <SelectScriptPropertyParameter[]>]
    [-ScriptMethod <SelectScriptMethodParameter[]>]
    [-InputObject ]
    [-ExcludeProperty <string[]>]
    [-ExpandProperty ]
    -Unique
    [-Last ]
    [-First ]
    [-Skip ]
    -Wait
    [-ShowProperty <string[]>]
    [-ShowExcludeProperty <string[]>]
    [-TypeName ]
    -KeepInputObject
    []            

Select-DbaObject
    [-Property <DbaSelectParameter[]>]
    [-Alias <SelectAliasParameter[]>]
    [-ScriptProperty <SelectScriptPropertyParameter[]>]
    [-ScriptMethod <SelectScriptMethodParameter[]>]
    [-InputObject ]
    [-ExcludeProperty <string[]>]
    [-ExpandProperty ]
    -Unique
    [-SkipLast ]
    [-ShowProperty <string[]>]
    [-ShowExcludeProperty <string[]>]
    [-TypeName ]
    -KeepInputObject
    []            

Select-DbaObject
    [-InputObject ]
    -Unique
    -Wait
    [-Index <int[]>]
    [-ShowProperty <string[]>]
    [-ShowExcludeProperty <string[]>]
    [-TypeName ]
    -KeepInputObject
    []

```

&nbsp;

## Examples

&nbsp;


#####      Example 1: Renaming a property 
            Get-ChildItem | Select-DbaObject Name, "Length as Size"<br>
            Selects the properties Name and Length, renaming Length to Size in the process.<br>

#####              Example 2: Converting type 
            Import-Csv .\file.csv | Select-DbaObject Name, "Length as Size to DbaSize"<br>
            Selects the properties Name and Length, renaming Length to Size and converting it to [DbaSize] (a userfriendly representation of<br>
            size numbers contained in the dbatools module)<br>

#####              Example 3: Selecting from another object 1 
            $obj = [PSCustomObject]@{ Name = "Foo" }<br>
            Get-ChildItem | Select-DbaObject FullName, Length, "Name from obj"<br>
            Selects the properties FullName and Length from the input and the Name property from the object stored in $obj<br>

#####              Example 4: Selecting from another object 2 
            $list = @()<br>
            $list += [PSCustomObject]@{ Type = "Foo"; ID = 1 }<br>
            $list += [PSCustomObject]@{ Type = "Bar"; ID = 2 }<br>
            $obj | Select-DbaObject Name, "ID from list WHERE Type = Name"<br>
            This allows you to LEFT JOIN contents of another variable. Note that it can only do simple property-matching at this point.<br>
            It will select Name from the objects stored in $obj, and for each of those the ID Property on any object in $list that has a<br>
            Type property of equal value as Name on the input.<br>

#####              Example 5: Naming and styling 
            Get-ChildItem | Select-DbaObject Name, Length, FullName, Used, LastWriteTime, Mode -TypeName MyType -ShowExcludeProperty Mode,<br>
            Used<br>
            Lists all items in the current path, selects the properties specified (whether they exist or not) , then ...<br>
            - Sets the name to "MyType"<br>
            - Hides the properties "Mode" and "Used" from the default display set, causing them to be hidden from default view<br>

### Optional Parameters

##### -Alias



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExcludeProperty



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ExpandProperty



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -First



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Index



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -InputObject



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | true (ByValue) |
| Default Value |  |

##### -KeepInputObject



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Last



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Property



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScriptMethod



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ScriptProperty



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ShowExcludeProperty



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ShowProperty



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Skip



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SkipLast



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -TypeName



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Unique



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Wait



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
