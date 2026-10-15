#!/usr/bin/env pwsh
# Keep the search index, command pages, platform metadata, and source links on
# the same upstream branch. Development includes commands awaiting release.
$DbatoolsBranch = "development"
$IndexUrl = "https://raw.githubusercontent.com/dataplat/dbatools/$DbatoolsBranch/bin/dbatools-index.json"
$ModuleUrl = "https://raw.githubusercontent.com/dataplat/dbatools/$DbatoolsBranch/dbatools.psm1"
$CommandSourceUrl = "https://github.com/dataplat/dbatools/blob/$DbatoolsBranch/public"
