---
title: "More Updates"
date: 2018-10-03
lastmod: 2025-10-29
author: "Chrissy LeMaire"
slug: "more-updates"
aliases:
  - /more-updates/
  - /more-updates/index.html
categories: [announcements]
tags: []
draft: false
---

Just a quick note that we've made more changes to align with 1.0, now available in version [0.9.453](https://dbatools.io/gallery).

## Renamed

### Log Shipping

[Get-DbaDbLogShipError](https://dbatools.io/Get-DbaDbLogShipError)
[Invoke-DbaDbLogShipping](https://dbatools.io/Invoke-DbaDbLogShipping)
[Invoke-DbaDbLogShipRecovery](https://dbatools.io/Invoke-DbaDbLogShipRecovery)
[Test-DbaDbLogShipStatus](https://dbatools.io/Test-DbaDbLogShipStatus)

### Registered Servers (Central Management Server)

[Add-DbaRegServer](https://dbatools.io/Add-DbaRegServer)
[Add-DbaRegServerGroup](https://dbatools.io/Add-DbaRegServerGroup)
[Get-DbaRegServer](https://dbatools.io/Get-DbaRegServer)
[Get-DbaRegServerGroup](https://dbatools.io/Get-DbaRegServerGroup)
[Get-DbaRegServerStore](https://dbatools.io/Get-DbaRegServerStore)
[Import-DbaRegServer](https://dbatools.io/Import-DbaRegServer)
[Move-DbaRegServer](https://dbatools.io/Move-DbaRegServer)
[Move-DbaRegServerGroup](https://dbatools.io/Move-DbaRegServerGroup)
[Remove-DbaRegServer](https://dbatools.io/Remove-DbaRegServer)
[Remove-DbaRegServerGroup](https://dbatools.io/Remove-DbaRegServerGroup)

And don't forget, you can use [Invoke-DbatoolsRenameHelper](https://dbatools.io/Invoke-DbatoolsRenameHelper) to rename commands in your scripts.

```powershell
Get-ChildItem .\scripts | Invoke-DbatoolsRenameHelper
```

## New

I'll write about these more soon, but until then, enjoy this piping hot batch of new HA commands.

### Windows Server Failover Clustering

[Get-DbaWsfcAvailableDisk](https://dbatools.io/Get-DbaWsfcAvailableDisk)
[Get-DbaWsfcCluster](https://dbatools.io/Get-DbaWsfcCluster)
[Get-DbaWsfcDisk](https://dbatools.io/Get-DbaWsfcDisk)
[Get-DbaWsfcNetwork](https://dbatools.io/Get-DbaWsfcNetwork)
[Get-DbaWsfcNetworkInterface](https://dbatools.io/Get-DbaWsfcNetworkInterface)
[Get-DbaWsfcNode](https://dbatools.io/Get-DbaWsfcNode)
[Get-DbaWsfcResource](https://dbatools.io/Get-DbaWsfcResource)
[Get-DbaWsfcResourceType](https://dbatools.io/Get-DbaWsfcResourceType)
[Get-DbaWsfcRole](https://dbatools.io/Get-DbaWsfcRole)
[Get-DbaWsfcSharedVolume](https://dbatools.io/Get-DbaWsfcSharedVolume)

\- Chrissy
