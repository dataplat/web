---
title: "Hacktoberfest – dbatools Edition"
date: 2018-10-09
author: "Patrick Flynn"
slug: "hacktoberfest"
aliases:
  - /hacktoberfest/
  - /hacktoberfest/index.html
categories: [announcements]
tags: []
draft: false
---

During the month of October 2018 DigitalOcean is again running [Hacktoberfest](https://hacktoberfest.digitalocean.com/) to support open source projects. They are offering a limited edition T-Shirt for any person making five pull requests to any public repo on GitHub.

> To get a shirt, you must make five pull requests (PRs) between October 1–31 in any timezone. PRs can be to any public repo on GitHub, not just the ones highlighted. The PR must contain commits you made yourself. This year, the first 50,000 of you can earn a T-shirt (compared with 30,000 in 2017).

Full details can be found [here](https://hacktoberfest.digitalocean.com/details).

# dbatools

As part of dbatools participation in this event we are encouraging contributors to assist "the road towards 1.0" by improving the examples available in the comment-based help, which power the new docs site at [docs.dbatools.io](https://docs.dbatools.io).

The activity is available to anyone who wants to help and does not require any expertise in PowerShell. Any of the following actions are desirable:

- Fix typos in examples
- Fix obvious errors in examples
- Add examples to illustrate use of all possible parameters
- Add examples to illustrate use of pipeline support
- Add examples to illustrate combining multiple dbatools commands.
- Add examples that illustrate use of dbatools commands in new or interesting ways.

We are a looking for a max of 6-8 examples per command.

# Not Sure How to Commit?

If you'd like to participate but aren't familiar with GitHub, cloning and repos, we've got **good news!** You can update our help files using the web interface at [GitHub.com](https://github.com). Here's how:

First, [create an account](https://github.com/join). GitHub is free and you do not need to pay to participate. Then head over to the dbatools repository using the shortlink [dbatools.io/git](https://dbatools.io/git).

After creating your GitHub account don't forget to [register](https://hacktoberfest.digitalocean.com/sign_up/register) at hacktoberfest if you want your contributions to be recorded and to qualify for a T-Shirt.

## Find the Command You Want to Edit

In this case, we'll add an example to [Get-DbaClientAlias](https://docs.dbatools.io/#Get-DbaClientAlias). We can do this by clicking on the **functions** directory.

![](/images/functions.png)

Next, click on the Get-DbaClientAlias function.

![](/images/get-clientalias-list.png)

Then the edit button.

![](/images/point.png)

## Add an Example

If you haven't forked our repo before, you'll get a notice that GitHub has done all the work for you.

![](/images/2018-10-08_14-15-35.png)

Proceed to adding the example by scrolling down to find the list of examples.

![](/images/example-list.png)

Copy/paste/modify.

If you are unsure of how to write or format examples you can look at some existing examples. eg

- [Invoke-DbaDbLogShipping](https://docs.dbatools.io/#Invoke-DbaDbLogShipping)
- [Restore-DbaDatabase](https://docs.dbatools.io/#Restore-DbaDatabase)

Then proceed to saving your changes by filling out the form at the bottom. Click the green "Propose file changes". Congrats! You've made your first commit.

![](/images/commit.png)

## Create the Pull Request

You will now be prompted to create a Pull Request. Click the button that says "Create pull request".

![](/images/pr.png)

Things are filled out for you already.

![](/images/pr2.png)

Modify as necessary and click "Create Pull Request".

![](/images/pr3.png)

## Celebrate

After a review is complete and the changes are approved, your request will be merged 👍

![](/images/tada.png)

And now they will show up on [docs.dbatools.io](https://docs.dbatools.io/#Get-DbaClientAlias)

![](/images/docs.png)

If you'd like more examples, check out [Möltz Jensen's](https://twitter.com/splaxi) last [two](https://github.com/dataplat/dbatools/pull/4161) [pull requests](https://github.com/dataplat/dbatools/pull/4159) where he added some useful examples.

### Remember You Will Need Five Pull Requests Before End of October for a T-Shirt!
