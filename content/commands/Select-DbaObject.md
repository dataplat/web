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

<!-- Command Header Section -->
<div class="command-header">
  <div class="command-header-top">
    <h1>Select-DbaObject</h1>
    <a href="https://github.com/dataplat/dbatools/blob/master/public/Select-DbaObject.ps1" target="_blank" rel="noopener noreferrer" class="github-link" title="View source on GitHub">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      <span>View Source</span>
    </a>
  </div>
  <div class="command-meta">
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      <span>Friedrich Weinmann (@FredWeinmann)</span>
    </div>
    <div class="meta-item">
      <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      <span>Windows, Linux, macOS</span>
    </div>
  </div>
</div>

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
