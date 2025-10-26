---
title: "VS Code and Task"
date: 2017-06-09
author: "Shawn Melton"
slug: "vscode-task"
aliases:
  - /vscode-task/
  - /vscode-task/index.html
categories: [announcements]
tags: []
draft: false
---

While we are still hard at work getting everything ready for the 1.0 release, thought I would share something I figured out with VS Code. If you are not familiar with [VS Code](/vscode) you can check the link out on how it is used to contribute to dbatools.

## Pester

One of the big initiatives we are working fearlessly on for the module is getting the [Pester](https://github.com/pester/Pester/wiki) test added and cleaned up. Appveyor is configured for the repository in GitHub so it will utilize the Pester test found in the [tests](https://github.com/dataplat/dbatools/tree/master/tests) folder. However, this also means that you, the developer, the ultimiate contributor, can utilize these test as you are working on a function.

Pester is a special syntax that lets you code in almost plain English. It is one of those that once it clicks you are like "where have you been all my life!". If you are interested in learning more on Pester I've included a short list of some excellent resources to help:

- [Adam Bertram – The Pester Book](https://leanpub.com/pesterbook) (*Could be the last book you buy on it.*)
- [Microsoft Virtual Academy – Testing PowerShell with Pester](https://mva.microsoft.com/en-us/training-courses/testing-powershell-with-pester-17650) (Ashley McGlone and Adam Bertram)
- [Test-Driven Development with Pester, June Blender (YouTube)](https://www.youtube.com/watch?v=gssAtCeMOoo)
- [Green is Good Red is Bad – Turning your Checklists into Pester Test, Rob Sewell (YouTube)](https://www.youtube.com/watch?v=Qy-uvT57pt8)
- [Testing PowerShell with Pester (Pluralsight)](https://www.pluralsight.com/courses/powershell-testing-pester)

## Task in VS Code

[Task](https://code.visualstudio.com/docs/editor/tasks) in VS Code allow you to integrate external tools into your development process/cycle. So in PowerShell one of those is utilizing Pester to drive test driven development. (*The Pester resources speak on this as writing your test before your functions.*) If you are developing or writing code it can improve the process by periodically running your test to validate if you broke anything. This is dependent upon your test validating the code. You can fix as many of the bugs you can find now before it gets pushed out.

Right off I want to show a caveat for using Task:

> Task in Code are only supported when you are working in a workspace folder.

A workspace is simply a folder of scripts/files, like the dbatools module. If you have dbatools open in VS Code, you can open the command palette (CTRL+SHIFT+P) and type *task* to see all the commands:

![VS Code Task commands](https://dbatools.io/wp-content/uploads/2017/05/vscode_task_1.png?ssl=1)

To generate the initial "task.json" file for your workspace just select the *Task: Configure Task Runner*. In the next prompt you can simply select *Others*.

![VS Code Task configuration](https://dbatools.io/wp-content/uploads/2017/05/vscode_task_2.png?ssl=1)

## Tasking

I will let you [go through the documentation on task](https://go.microsoft.com/fwlink/?LinkId=733558) to get down to the nitty-gritty on the options you have in the syntax. I can tell you reading through that documentation will make the remainder of this post much more clear.

I generated the configuration for these task by using Plaster in VS Code. The PowerShell extension includes [Plaster](https://github.com/powershell/plaster), which is a project around template-based project or module generation. When you build a module using Plaster for the first time it will ask you if you want to use Pester, and then proceeds to generate the *task.json* file for you. I simply took that file and expanded it. The repository for Plaster contains the [initial file](https://github.com/PowerShell/Plaster/blob/master/examples/NewModule/editor/VSCode/tasks_pester.json) which only contains one task.

## Our Task

The sample task that is generated comes with one simple task called *Test*, at this time. I renamed that task and then have added two additional task:

| Task | Purpose |
|------|---------|
| Run.AllTest | Runs every Pester test for the module. |
| Run.IntegrationTests | Run all the Pester test but only those tagged as *IntegrationTests*. |
| Run.CurrentFile | Will run the Pester test for for the function or file you have active/open, if one exist. |

The full json file is provided at the end of this post. I wanted to just go over a few areas to help you understand what it is doing.

### How do task Run?

As stated before a task allows you to run an external process, so our first step is to configure that external process. Which in our case is just the PowerShell.exe executable.

```ruby
"_runner": "terminal", // (1) forces process to run in terminal panel, instead of the output
// Start PowerShell
"windows": {
// (2)  "command": "${env.windir}\\sysnative\\windowspowershell\\v1.0\\PowerShell.exe"
"command": "powershell.exe"
```

1. This setting tells VS Code to run the task in the terminal panel and not the output. The output has no color by default so you don't see all those pretty green and purple colors from Pester.
2. The commented ("//") command is what the initial file provides. It utilizes a [predefined variable](https://code.visualstudio.com/docs/editor/tasks) called *env.windir*, which does the same thing that *$env:WINDIR* does in PowerShell.

I had errors always showing in the terminal using the default path, about the PowerShell.exe not being found as a cmdlet. I realized that since I am running this in the terminal I am already in the context of the console so I only needed to call *PowerShell.exe*. Trying to reference the full path was causing the problem. I changed this to just *powershell.exe* and it cleaned up the initial errors.

### Structure of a Task Configuration

```ruby
"taskName": "Run.Something", //(1) referenced in command palette
"isTestCommand": false, // (2) if set to true it maps to "Task: Run Test Task"
"showOutput": "always", //(3) options are always, never, silent
"args": [
    "PS comands to run Invoke-Pester" // (4)
    ],
"problemMatcher": [
    "Some fancy regex to place output in the problem pane" //(5)
]
```

I will go over each part in the above example, but you can find more on each property in the documentation on [schema for tasks.json](https://code.visualstudio.com/docs/editor/tasks-appendix). That document goes over each option and value.

1. When you run the task command in the command palette, the *taskName* is displayed when you select to run a task.
2. Setting *isTestCommand* to true will simply map the specific task to the command *Task: Run Test Task* in the command palette. You can also set that task command to a key binding if you want to save more time.
3. If you want to see the output when it executes set *showOutput* to *always*. You can check the schema for what the other values will do.
4. What is placed in *args* will be executed in the terminal window.
5. The *problemMatcher* is the fancy part. This would be where you do some regex to parse the output to set if any of it is an issue (info, warning or error). This allows you to utilize the problem panel in VS Code, a shortcut to find the exact test that failed.

### Test a Single Function

I wanted to have a task that would perform one main task for me: invoke the Pester test file for the current *function.ps1* file I have open in VS Code. It took a bit to work this out, because I was not focusing on what was right in front of me. Once I figured that out I set the task *isTestCommand* property to true. This means you can easily validate your changes for a function by running the test just for that function and see if it passes or not. In the command palette that is select/typing *Tasks: Run Test Task* or you can map that to a key binding to make it more accessible.

```ruby
"taskName": "Run.CurrentFile", // (1) name of the task
"suppressTaskName": true, // (2) don't want the task name as argument
"isTestCommand": true, // (3) map to run test task
"showOutput": "always", // (4) show the output and open terminal window each time
"args": [
    "Write-Host 'Invoking Pester' for ${fileBasename}; Invoke-Pester -PesterOption @{IncludeVSCodeMarker=$true} -Script '${workspaceRoot}/tests/${fileBasenameNoExtension}.Tests.ps1';",
    "Invoke-Command { Write-Host 'Completed Test task in task runner.' }"
],
```

To burst your bubble up front: *No you have to use Write-Host in this situation*. Just like you do in Pester as well.

1. The *taskName* I try to keep where the name explains what is being done. So simply named this one *Run.CurrentFile*.
2. The *supressTaskName* prevents the it from being added as an extra argument, which in most cases can cause it to fail or error.
3. I set *isTestCommand* to true so I can use the command palette shortcut. Again, you can also use key binding to make it easier.
4. I'm setting *showOutput* to always because I want to see the output in the terminal window. I will show you the difference in setting this to false later.

The *args* is where the meat of it all sits. This section calls Invoke-Pester on the script found in the: root folder of the current workspace (dbatools repository folder), the test folder and then takes the name of the function file (minus the extension, *.ps1*) and appends *.Tests.ps1* to it. So the end result if I run this task for Get-DbaDatabase would be *dbatools\tests\Get-DbaDatabase.Test.ps1*.

### Task for specific Pester Test

The additional task I added was to have only the integration test executed for the whole module. In Pester you can organize your test using tags, and we utilize this by setting it to *Integrationtests*. So I can use the Invoke-Pester command to only go through all the test and just run those context blocks.

```ruby
"Write-Host 'Invoking Pester'; Invoke-Pester -PesterOption @{IncludeVSCodeMarker=$true} -Tag 'Integrationtests';",
"Invoke-Command { Write-Host 'Completed Test task in task runner.' }"
```

The *args* value for this task is to simply use the *-Tag* parameter for Invoke-Pester and then pass it the tag I need to run. You can create additional task for each tag you use in your test if you wanted.

## Example Run Test Task

I have intentionally changed a test for the *Get-DbaDatabase* function to show a passed test and a failed test. The video below illustrates the output you see in the terminal panel. It also shows that you can use the problem panel to see the exact test that failed with simpler output.

One additional thing you can do in both panels is click on the failed test and VS Code will open the test file and put your cursor on that test. In the terminal panel you have a URL link for the test file, so it will require the CTRL+ clicking on the link to open it up.

`youtube: ufL5kE5_82Q`

## Full *task.json* file

```json
// Available variables which can be used inside of strings.
// ${workspaceRoot}: the root folder of the team
// ${file}: the current opened file
// ${relativeFile}: the current opened file relative to workspaceRoot
// ${fileBasename}: the current opened file's basename
// ${fileDirname}: the current opened file's dirname
// ${fileExtname}: the current opened file's extension
// ${cwd}: the current working directory of the spawned process
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "0.1.0",
    "_runner": "terminal",
    // Start PowerShell
    "windows": {
    //  "command": "C:\\WINDOWS\\Sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"
    "command": "powershell.exe"
    },
//  "linux": {
//      "command": "/usr/bin/powershell"
//  },
//  "osx": {
//      "command": "/usr/local/bin/powershell"
//  },
    // The command is a shell script
    "isShellCommand": true,
    // Show the output window always
    "showOutput": "always",
    "args": [
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass"
    ],
    // Associate with test task runner
    "tasks": [
        {
            "taskName": "Run.AllTest",
            "suppressTaskName": true,
            "isTestCommand": false,
            "showOutput": "always",
            "args": [
                "Write-Host 'Invoking Pester'; Invoke-Pester -PesterOption @{IncludeVSCodeMarker=$true};",
                "Invoke-Command { Write-Host 'Completed Test task in task runner.' }"
            ],
            "problemMatcher": [
                {
                    "owner": "powershell",
                    "fileLocation": [
                        "absolute"
                    ],
                    "severity": "error",
                    "pattern": [
                        {
                            "regexp": "^\\s*(\\[-\\]\\s*.*?)(\\d+)ms\\s*$",
                            "message": 1
                        },
                        {
                            "regexp": "^\\s+at\\s+[^,]+,\\s*(.*?):\\s+line\\s+(\\d+)$",
                            "file": 1,
                            "line": 2
                        }
                    ]
                }
            ]
        },
        {
            "taskName": "Run.IntegrationTests",
            "suppressTaskName": true,
            "isTestCommand": false,
            "showOutput": "always",
            "args": [
                "Write-Host 'Invoking Pester'; Invoke-Pester -PesterOption @{IncludeVSCodeMarker=$true} -Tag 'Integrationtests';",
                "Invoke-Command { Write-Host 'Completed Test task in task runner.' }"
            ],
            "problemMatcher": [
                {
                    "owner": "powershell",
                    "fileLocation": [
                        "absolute"
                    ],
                    "severity": "error",
                    "pattern": [
                        {
                            "regexp": "^\\s*(\\[-\\]\\s*.*?)(\\d+)ms\\s*$",
                            "message": 1
                        },
                        {
                            "regexp": "^\\s+at\\s+[^,]+,\\s*(.*?):\\s+line\\s+(\\d+)$",
                            "file": 1,
                            "line": 2
                        }
                    ]
                }
            ]
        },
        {
            "taskName": "Run.CurrentFile",
            "suppressTaskName": true,
            "isTestCommand": true,
            "showOutput": "always",
            "args": [
                "Write-Host 'Invoking Pester' for ${fileBasename}; Invoke-Pester -PesterOption @{IncludeVSCodeMarker=$true} -Script '${workspaceRoot}/tests/${fileBasenameNoExtension}.Tests.ps1';",
                "Invoke-Command { Write-Host 'Completed Test task in task runner.' }"
            ],
            "problemMatcher": [
                {
                    "owner": "powershell",
                    "fileLocation": [
                        "absolute"
                    ],
                    "severity": "error",
                    "pattern": [
                        {
                            "regexp": "^\\s*(\\[-\\]\\s*.*?)(\\d+)ms\\s*$",
                            "message": 1
                        },
                        {
                            "regexp": "^\\s+at\\s+[^,]+,\\s*(.*?):\\s+line\\s+(\\d+)$",
                            "file": 1,
                            "line": 2
                        }
                    ]
                }
            ]
        }
    ]
}
```
