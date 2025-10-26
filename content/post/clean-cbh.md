---
title: "cleaning up comment-based help"
date: 2017-11-29
author: "Andy Levy"
slug: "clean-cbh"
aliases:
  - /clean-cbh/
  - /clean-cbh/index.html
categories: [announcements]
tags: [party]
draft: false
---

Hey all! Andy Levy here. I'm a SQL Server DBA and major contributor for dbatools. My current focus within the project is fixing the docs and more specifically, the help content and documentation that's included with every function.

Most folks don't like writing documentation. It's seen as a necessary evil, something you do to just check a box, complete requirements, and move on. With many open source projects, you're lucky to get much documentation at all.

## dbatools & documentation

dbatools is different. Every function comes with extensive help including documentation of all parameters, examples for usage, and an explanation of what the function does, how and why. PowerShell's built-in [comment-based help system](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_comment_based_help?view=powershell-5.1&viewFallbackFrom=powershell-Microsoft.PowerShell.Core) is tremendously helpful with developing this; write documentation into your function using the standard template, and it's instantly accessible with `Get-Help`.

But there's always room for improvement. Just *having* up-to-date documentation is good, but little things can have a big impact on the perception of your open source project. Spelling & grammatical errors, broken sample code, and awkward composition can all make prospective users (and their managers) wary of using your code. Addressing these issues gives your project an extra level of polish, making it look like the solid, professionally-developed *product* that it is, not just another GitHub project.

## how i got involved

What started for me as a simple attempt to [correct spelling errors](https://flxsql.com/spell-checking-dbatools-with-visual-studio-code/) in dbatools has become a much larger mission – to review all of the comment-based help (CBH) and clean up examples, grammar, style and more. It's turned out to be a larger undertaking than expected, but it's come along far enough now that we're able bring more people into the process to distribute the work.

## how you can get involved

Working on the CBH is a great way to get started with the dbatools project, even (especially) if you're not a PowerShell expert or MVP-level DBA. Getting everything clean and consistent in the CBH is an important step on the road to 1.0. Along the way, you'll pick up on how dbatools is put together, discover functions that you can use in your day-to-day work, and get a feel for PowerShell best practices. You *will* learn from this experience! To get started:

1. Set up a GitHub account, fork the project, and clone it to your desktop. If you're new to the process, we've got [a few guides](https://dbatools.io/contributing/) to get you started.
2. Make sure your editor's formatting is configured to be consistent with the rest of the project. If you use Visual Studio Code, Shawn Melton has a [sample workspace settings file](https://dbatools.io/vscode/#workspace).
3. Take a look at the [dbatools-templates repository](https://github.com/dataplat/dbatools-templates). Here you'll find samples of the CBH style that should be used. You can also look at functions which have already been updated to the standard style.
4. Create a branch, pick a handful of functions and get to work! We try to keep each batch to 5-6 functions at most, to minimize code review time and mitigate the risk of merge issues. A sampling of items to tackle (this is not a complete list; please review the templates to get familiar with what we're looking for):
   - If you're working on a function which has not yet gotten "the treatment", please update *all* of the CBH in it, not just selected elements
   - Proper indenting/formatting of the CBH sections
   - Spelling and grammar
   - Remove manual linebreaks in sentences and paragraphs. The console will line-wrap as appropriate when the CBH is rendered to the user, and if you enable "soft wrap" in your code editor, the same will happen there.
   - Verify that examples are valid. In some cases, the `SqlInstance` used in calling the function in the example may not match the text description under it. This needs to be corrected.
   - For switch parameters, the description should start with "If this switch is enabled..."
   - For parameters which have valid values determined by the instance you're connecting to, the language "Options for this parameter are auto-populated from the server" should be used
   - Add `Tags:` to the `.NOTES` section if it's missing
   - (Optional) If you're using VS Code and have configured it with the appropriate formatting settings, format the code. **Be careful here!** In cases where there's a curly brace followed by a comment at the end of the line, the VS Code auto-formatter will break the code (the curly brace will end up *inside* the comment) and you'll have to seek these out and correct manually.
5. Commit your code, push it to GitHub, and issue a pull request. You can use [PR #2434](https://github.com/dataplat/dbatools/pull/2434) as a template and please reference [issue #2219](https://github.com/dataplat/dbatools/issues/2219) in your description.
6. Request a review of your PR from alevyinroc

Before you know it, you'll branch out from documentation and start working on bugs, just like I did.
