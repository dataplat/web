---
title: "Improving Tests: Code Coverage Use Case"
date: 2017-11-17
author: "Simone"
slug: "improving-tests"
aliases:
  - /improving-tests/
  - /improving-tests/index.html
categories: [announcements]
tags: [party]
draft: false
---

A recent addition to the release pipeline is the "code coverage" report. Although you can find several posts about the intricacies of code coverage for PowerShell (my favourite is [this post by June Blender](https://www.sapien.com/blog/2016/06/24/testing-pester-code-coverage/)), you may be asking yourself what is code coverage in simple terms.

## Defining Code Coverage

> Coupled with tests, code coverage is a metric that measures how much of the code is tested.

This is helpful to realize the test written is really covering for all the "features" of the code. A function with a test is a good thing. A function with a test that covers the 10% of the lines definitely helps, but tells you that a lot of the code involved may not be failproof.

While reaching 100% is not entirely possible due to Powershell limitations, it should be the goal for everyone. The more code coverage we reach:

- the more stable the module.
- the more "situations" are being checked and handled correctly
- the more tests will be complete, documenting what to expect from the function
- the more documentation about how a function needs to behave, the more users can fiddle with the code and add features being sure they don't break anything in the process

We run a suite of tests at each commit via [appveyor](https://appveyor.com). The service we chose for code coverage is [codecov](https://codecov.io). We chose them mostly due to the fact that their support is great and we needed their exclusive feature of "merge report" because we run different test suites for each build (even some C# code). Also, its interface is as good as a code coverage report can be, you can see the full source code and line-by-line coverage.

## dbatools Coverage

For public consumption, [our development branch](https://codecov.io/gh/sqlcollaborative/dbatools/branch/development) shows the most current coverage report for the whole project.

Now that the project is open about coverage metrics, you can contribute to the project writing more complete tests for all functions which are not 100% covered.

Let's see a practical example.

A few days ago, on 2017-11-13, the development branch showed Get-DbaDbRecoveryModel.ps1 with a [90% coverage](https://codecov.io/gh/sqlcollaborative/dbatools/tree/6870dccda543988eb952f574de9f758134ee85d5/functions). Codecov's urls are prettier but for the sake of this blogpost, which must point to specific commits, they'll be lengthy and ugly.

![original coverage](/images/blogpost_improving_tests_1.png)

Clicking on the [function itself](https://codecov.io/gh/sqlcollaborative/dbatools/src/6870dccda543988eb952f574de9f758134ee85d5/functions/Set-DbaDbRecoveryModel.ps1), you can see that only one line is specifically not covered

![original coverage – source details](/images/blogpost_improving_tests_2.png)

Line 87 basically is about the possibility to specify a specific recovery model as a filter to retrieve only matching databases.

If you run **Get-Help Get-DbaDbRecoveryModel** you'll see this parameter

```ps
-RecoveryModel <String[]>
       Filters the output based on Recovery Model. Valid options are Simple, Full and BulkLogged
       Details about the recovery models can be found here:
       https://docs.microsoft.com/en-us/sql/relational-databases/backup-restore/recovery-models-sql-server
```

If you inspect the [relevant test](https://github.com/dataplat/dbatools/blob/6870dcc/tests/Get-DbaDbRecoveryModel.Tests.ps1) you'll see there is nothing relative to that specific parameter.

Unfortunately, this means that if someone makes a modification to the function in the future, there won't be any assurance that parameter continues to work as expected. We want to extend that test to include that too, so that the behaviour will always be the same.

## Giving More Coverage

First, we need to create a database to test against the new case. Remembering that *dbatoolsci_* is the default prefix for any resource created, let's go with *dbatoolsci_getrecoverymodel*.

Cannibalizing a recurrent pattern seen in most tests, let's add a new Context with a BeforeAll and an AfterAll stanzas to keep everything clean

```ps
Context "RecoveryModel parameter works" {
    BeforeAll {
        $server = Connect-DbaInstance -SqlInstance $script:instance2
        $dbname = "dbatoolsci_getrecoverymodel"
        Get-DbaDatabase -SqlInstance $server -Database $dbname | Remove-DbaDatabase -Confirm:$false
        $server.Query("CREATE DATABASE $dbname; ALTER DATABASE $dbname SET RECOVERY BULK_LOGGED WITH NO_WAIT;")
    }
    AfterAll {
        Get-DbaDatabase -SqlInstance $script:instance2 -Database $dbname | Remove-DbaDatabase -Confirm:$false
    }
}
```

Summing up, *BeforeAll* runs before ANY test within the upper-level stanza (in our case, the brand new *Context*), while *AfterAll* runs after, no matter the results (keeping things clean is a priority, so cleanup needs to run no matter what)

You'll see the *BeforeAll* checks and removes any preexisting *dbatoolsci_getrecoverymodel* database, it then proceeds to create a new one with BULK_LOGGED. The *AfterAll* instead just removes the database we created. Then, we create the real test case:

```ps
It "gets the newly created database with the correct recovery model" {
    $results = Get-DbaDbRecoveryModel -SqlInstance $script:instance2 -Database $dbname
    $results.RecoveryModel -eq 'BulkLogged' | Should Be $true
}
It "honors the RecoveryModel parameter filter" {
    $results = Get-DbaDbRecoveryModel -SqlInstance $script:instance2 -RecoveryModel BulkLogged
    $results.Name -contains $dbname | Should Be $true
}
```

Now, let's run the test locally, before submitting our changes. Create a **C:\Temp\constants.ps1** or a **.\tests\local.constants.ps1** that points to a live instance (in my case, the simplest of them all, *localhost*, results in this)

```ps
PS C:\dbatools-dev\tests> get-content .\constants.local.ps1
$script:instance1 = "localhost"
$script:instance2 = "localhost"
$script:instance1_detailed = "localhost,1433"
$script:appveyorlabrepo = "C:\github\appveyor-lab"
$instances = @($script:instance1, $script:instance2)
$ssisserver = "localhost"
```

Then, let's launch the test

```ps
.\manual.pester.ps1 -path .\Get-DbaDbRecoveryModel.Tests.ps1 -TestIntegration
```

![manual test run](/images/blogpost_improving_tests_3.png)

## Merging to the dbatools Repository

Now that we've confirmed that everything checks out, let's create the pull request (PR).

First, we open a proper feature branch spawned from development

```ps
git checkout development
git checkout -b tests/Get-DbaRecoveryModel
```

add the relevant commits, then push the new branch

```ps
git push origin tests/Get-DbaRecoveryModel
```

wait a few seconds, go on github and create the PR

![open a PR](/images/blogpost_improving_tests_4.png)

change the base branch to development

![change base branch](/images/blogpost_improving_tests_5.png)

Once you filled out the details, you'll have written something like [this PR](https://github.com/dataplat/dbatools/pull/2646)

Now, we just wait for the build to complete (impatient ones, watch [appveyor's dbatools "homepage"](https://dbatools.io/ci) to monitor the status in real-time)

## Inspecting the Results

Once the build has done, the list of recent opened PRs on codecov is at [dbatools.io/coverage](https://codecov.io/gh/sqlcollaborative/dbatools/pulls)

If you inspect the one I created with this blogpost, which is [#2646](https://codecov.io/gh/sqlcollaborative/dbatools/pull/2646) , when you browse to the [functions folder](https://codecov.io/gh/sqlcollaborative/dbatools/pull/2646/tree/functions) to see what happened with the coverage of Get-DbaRecoveryModel.ps1 … voilà

![coverage increase](/images/blogpost_improving_tests_6.png)

You can click further to see the [details](https://codecov.io/gh/sqlcollaborative/dbatools/src/be3a3d976f1393a688bd2a437e452ab9c7d399f5/functions/Get-DbaDbRecoveryModel.ps1): you can see that the line which wasn't covered is now green.

![coverage increase line by line](/images/blogpost_improving_tests_7.png)

Enjoyed this post? Come join the Pester-lovers on [Slack's](https://dbatools.io/slack) #dbatools-pester to improve current tests!

Ciao!
Simone 🇮🇹

