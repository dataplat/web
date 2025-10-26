---
title: "more updates"
date: 2018-10-03
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

[Get-DbaDbLogShipError](http://docs.dbatools.io/#Get-DbaDbLogShipError)
[Invoke-DbaDbLogShipping](http://docs.dbatools.io/#Invoke-DbaDbLogShipping)
[Invoke-DbaDbLogShipRecovery](http://docs.dbatools.io/#Invoke-DbaDbLogShipRecovery)
[Test-DbaDbLogShipStatus](http://docs.dbatools.io/#Test-DbaDbLogShipStatus)

### Registered Servers (Central Management Server)

[Add-DbaCmsRegServer](http://docs.dbatools.io/#Add-DbaCmsRegServer)
[Add-DbaCmsRegServerGroup](http://docs.dbatools.io/#Add-DbaCmsRegServerGroup)
[Get-DbaCmsRegServer](http://docs.dbatools.io/#Get-DbaCmsRegServer)
[Get-DbaCmsRegServerGroup](http://docs.dbatools.io/#Get-DbaCmsRegServerGroup)
[Get-DbaCmsRegServerStore](http://docs.dbatools.io/#Get-DbaCmsRegServerStore)
[Import-DbaCmsRegServer](http://docs.dbatools.io/#Import-DbaCmsRegServer)
[Move-DbaCmsRegServer](http://docs.dbatools.io/#Move-DbaCmsRegServer)
[Move-DbaCmsRegServerGroup](http://docs.dbatools.io/#Move-DbaCmsRegServerGroup)
[Remove-DbaCmsRegServer](http://docs.dbatools.io/#Remove-DbaCmsRegServer)
[Remove-DbaCmsRegServerGroup](http://docs.dbatools.io/#Remove-DbaCmsRegServerGroup)

And don't forget, you can use [Invoke-DbatoolsRenameHelper](http://docs.dbatools.io/#Invoke-DbatoolsRenameHelper) to rename commands in your scripts.

```powershell
Get-ChildItem .\scripts | Invoke-DbatoolsRenameHelper
```

## New

I'll write about these more soon, but until then, enjoy this piping hot batch of new HA commands.

### Windows Server Failover Clustering

[Get-DbaWsfcAvailableDisk](http://docs.dbatools.io/#Get-DbaWsfcAvailableDisk)
[Get-DbaWsfcCluster](http://docs.dbatools.io/#Get-DbaWsfcCluster)
[Get-DbaWsfcDisk](http://docs.dbatools.io/#Get-DbaWsfcDisk)
[Get-DbaWsfcNetwork](http://docs.dbatools.io/#Get-DbaWsfcNetwork)
[Get-DbaWsfcNetworkInterface](http://docs.dbatools.io/#Get-DbaWsfcNetworkInterface)
[Get-DbaWsfcNode](http://docs.dbatools.io/#Get-DbaWsfcNode)
[Get-DbaWsfcResource](http://docs.dbatools.io/#Get-DbaWsfcResource)
[Get-DbaWsfcResourceType](http://docs.dbatools.io/#Get-DbaWsfcResourceType)
[Get-DbaWsfcRole](http://docs.dbatools.io/#Get-DbaWsfcRole)
[Get-DbaWsfcSharedVolume](http://docs.dbatools.io/#Get-DbaWsfcSharedVolume)

\- Chrissy
