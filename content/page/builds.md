---
title: "Builds"
date: 2024-01-01
slug: "builds"
aliases:
  - /builds/
  - /builds/index.html
draft: false
---

# dbatools Builds

Here you can find information about dbatools builds, CI/CD pipelines, and testing infrastructure.

## Official Build Status

All dbatools builds are tested and verified through our continuous integration pipeline. Visit the official dbatools repository for the latest build information:

- **GitHub Actions** - [dbatools CI/CD Pipeline](https://github.com/dataplat/dbatools/actions)
- **AppVeyor** - [dbatools Build History](https://ci.appveyor.com/project/dataplat/dbatools)

## Latest Release

The latest version of dbatools is always available through PowerShell Gallery:

```powershell
Install-Module dbatools -Repository PSGallery
Update-Module dbatools
```

For detailed release notes and version history, visit the [GitHub Releases](https://github.com/dataplat/dbatools/releases) page.

## Development Branch

If you want to use the latest development version from the `development` branch:

```powershell
Install-Module dbatools -Repository PSGallery -AllowPrerelease
```

## Build Requirements

- PowerShell 7+ (Windows, Linux, macOS)
- .NET Framework 4.7.2+ or .NET Core equivalent
- SQL Server connectivity libraries

## Testing

All dbatools code is thoroughly tested with:
- Unit tests
- Integration tests
- Multi-platform tests (Windows, Linux, macOS)

Tests are run automatically on every pull request and commit.
