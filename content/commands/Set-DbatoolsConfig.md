---
title: "Set-DbatoolsConfig"
slug: "Set-DbatoolsConfig"
date: 2024-01-01
layout: "single"
author: "Friedrich Weinmann (@FredWeinmann)"
availability: "Windows, Linux, macOS"
synopsis: "Sets configuration entries."
sourceUrl: "https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsConfig.ps1"
bohUrl: "https://dataplat.github.io/boh#Set-DbatoolsConfig"
draft: false
---

# Set-DbatoolsConfig

| Property | Value |
| --- | --- |
| **Author** | Friedrich Weinmann (@FredWeinmann) |
| **Availability** | Windows, Linux, macOS |

&nbsp;

Want to see the source code for this command? Check out [Set-DbatoolsConfig](https://github.com/dataplat/dbatools/blob/master/public/Set-DbatoolsConfig.ps1) on GitHub.
<br>
Want to see the Bill Of Health for this command? Check out [Set-DbatoolsConfig](https://dataplat.github.io/boh#Set-DbatoolsConfig).

## Synopsis

Sets configuration entries.

## Description

This function creates or changes configuration values. These can be used to provide dynamic configuration information outside the PowerShell variable system.

## Syntax

```powershell
Set-DbatoolsConfig -FullName <String>
    [-Value <Object>]
    [-Description <String>]
    [-Validation <String>]
    [-Handler <ScriptBlock>]           
    [-Hidden]
    [-Default]
    [-Initialize]
    [-DisableValidation]
    [-DisableHandler]
    [-EnableException]
    [-SimpleExport]
    [-ModuleExport]           
    [-PassThru]
    [-AllowDelete]
    [<CommonParameters>]            

Set-DbatoolsConfig -FullName <String>
    [-Description <String>]
    [-Validation <String>]
    [-Handler <ScriptBlock>]
    [-Hidden]           
    [-Default]
    [-Initialize]
    [-DisableValidation]
    [-DisableHandler]
    [-EnableException]
    -PersistedValue <String>
    [-PersistedType            <ConfigurationValueType>]
    [-SimpleExport]
    [-ModuleExport]
    [-PassThru]
    [-AllowDelete]
    [<CommonParameters>]            

Set-DbatoolsConfig -Name <String>
    [-Module <String>]
    [-Value <Object>]
    [-Description <String>]
    [-Validation <String>]
    [-Handler            <ScriptBlock>]
    [-Hidden]
    [-Default]
    [-Initialize]
    [-DisableValidation]
    [-DisableHandler]
    [-EnableException]
    [-SimpleExport]           
    [-ModuleExport]
    [-PassThru]
    [-AllowDelete]
    [<CommonParameters>]

```

&nbsp;

## Examples

&nbsp;


#####  Example 1: Simple 
            C:\PS> Set-DbatoolsConfig -FullName Path.DbatoolsData -Value E:\temp\dbatools<br>
            Updates the configuration entry for Path.DbatoolsData to E:\temp\dbatools<br>

### Required Parameters

##### -FullName



| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -Name



| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

##### -PersistedValue



| Property | Value |
| --- | --- |
| Alias |  |
| Required | True |
| Pipeline | false |
| Default Value |  |

### Optional Parameters

##### -Default



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Description



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableHandler



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -DisableValidation



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -EnableException



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Handler



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Hidden



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Initialize



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Module



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -ModuleExport



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PassThru



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -PersistedType



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Register



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -SimpleExport



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Validation



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |

##### -Value



| Property | Value |
| --- | --- |
| Alias |  |
| Required | False |
| Pipeline | false |
| Default Value |  |


&nbsp;
