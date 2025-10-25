---
title: "beginning the journey to 1.0 and a call for bug reports"
date: 2017-03-03
slug: "bugsplz"
aliases:
  - /bugsplz/
  - /bugsplz/index.html
categories: [announcements]
tags: [party]
draft: false
---

So, we've made the first step to 1.0 – we've stopped accepting Pull Requests that add new commands. It breaks my heart the most, but every moment that we spend vetting a new command is a moment we can't spend bug fixing and we really need to focus on standardization and bug fixes.

Our [pull request queue](https://dbatools.io/pr) is currently filled with new commands that we still need to review, along with a couple bug fixes. Early next week, we'll release an update with all these newer commands.

## what to expect in the next few months

We're going to be really busy! Here's a non-exhaustive list of what to expect:

- bug fixes and minor changes first
- increased command findability
- blog posts with updates about our progress and blog posts that highlight specific commands
- potentially outdated information on dbatools.io
- major breaking changes

Major breaking changes? Yep, mostly, command names and parameters will change. This means, for instance, that if you reference Copy-DbaDatabase in a script, suddenly PowerShell will report command not found, because that will soon become Copy-DbaDatabase. We'll also be removing many of the -Detailed parameters and show more output by default.

But while we will be introducing breaking changes, we're also hoping to provide a script converter that searches for the changes we're making and updates your scripts accordingly.

## we need you

We want 1.0 to be as solid as possible and **need you to report any bugs you've come across** to our **[issues](https://dbatools.io/issues)** list. If you've been putting it off, now is the time.

If you don't want to create a GitHub account, you can email clemaire@gmail.com, but GitHub offers two primary benefits: the developer fixing your issue can work directly with you to get more info, ask you to test and, ultimately, resolve the issue faster and more accurately. In addition, GitHub will keep you updated on the progress of your bug fix while I will not be able to.

We also need bug fixers and testers. We've got a number of people who have volunteered to help but the more help we have, the faster we can get 1.0 finalized. Right now, our hope is that 1.0 will be available on June 1, 2017.

## i want to help fix bugs, how do i start?

First, from all of us, THANK YOU 🙏 Second..

- Read Shawn's post, [Contributing with Code](https://dbatools.io/vscode), if you'd like an intro to contributing to our project using Microsoft's free editor, Visual Studio Code. Using Code will be greatly beneficial because it has GitHub integration, code formatting (which fits in line with our style guide) and a bunch of other stuff.
- Follow up with [Your First Pull Request](https://dbatools.io/firstpull) or watch the [accompanying video](https://dbatools.io/firstpullvideo) if you still don't really get how to do a PR with GitHub.
- Join us in #dbatools on the [SQL Server Community Slack](https://dbatools.io/slack)
- We'll guide you through how to participate and shower you with emoji gifts
- You'll be paired up, hopefully with someone in your timezone, so that your pull requests can be vetted, tested and merged in a timely manner. You'll also be vetting, testing and merging your buddy's pull requests.

And the big ol' bonus? Fixing a bunch of bugs will totally get you on the [team page](https://dbatools.io/team) which also means you can add dbatools.io to your experience on LinkedIn [like many Major Contributors do](https://dbatools.io/company). Whaaat!

Thanks for reading. We'll be back in touch next week.

\- Chrissy
