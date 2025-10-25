---
title: "Your First Pull Request"
date: 2019-01-16
slug: "github"
aliases:
  - /github/
  - /github/index.html
categories: []
tags: []
draft: false
---

Here's a quick tutorial on creating your first pull request.

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes:

```shell
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/dbatools.git
# Navigate to the newly cloned directory
cd dbatools
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/dataplat/dbatools.git
```

2. If you cloned a while ago, get the latest changes from upstream:

```shell
git checkout development
git pull upstream development
```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

```shell
git checkout -b <topic-branch-name>
```

4. Commit your changes in logical chunks. For any Git project, some good rules for commit messages are

- the first line is commit summary, 50 characters or less,
- followed by an empty line
- followed by an explanation of the commit, wrapped to 72 characters.

See [a note about git commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) for more.

The first line of a commit message becomes the **title** of a pull request on GitHub, like the subject line of an email. Including the key info in the first line will help us respond faster to your pull.

5. Push your topic branch up to your fork:

```shell
git push origin <topic-branch-name>
```

6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.

7. Done!

Tutorial used from: [pointcloudlibrary](https://github.com/PointCloudLibrary/pcl/wiki/A-step-by-step-guide-on-preparing-and-submitting-a-pull-request)
