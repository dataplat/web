---
title: "The New dbatools Website: From Notepad++ to Cursor, Powered by AI"
date: 2025-10-26
author: "Chrissy LeMaire"
slug: "new-dbatools-website-2025"
categories: [announcements]
tags: [website, ai, development]
draft: true
---

Hey, what's up? So I redesigned the dbatools website and I wanted to tell you the story of how it happened and why it looks the way it does.

## The Origin Story: Notepad++

Back in 2016, when I first designed dbatools.io, I based it off of Notepad++. I had no idea they were open source - they just looked like another commercial product. That's exactly how I wanted to position dbatools: you didn't have to care who developed it, you didn't have to care if it was open source. You just had to use the product.

That worked for a while. But things changed.

## The Problem

About two or three years ago, somebody came to the repo and basically said: "Hey, I heard a lot about your project and I wanted to use it. I went to your web page and it was extremely not useful to me. I can't do anything with 'dbatools is free, fun, and open source.' Can you tell me what it actually does?"

They had a great point.

The site was designed to introduce dbatools, not to help people actually use it. And now we have people who want to come to the website to use the product, not just be introduced to it.

## The Pandemic Decision

In September 2020, during the pandemic, we were getting hacked all the time on WordPress. I was exhausted. I didn't even need the dynamics that WordPress provides, so I just exported everything to HTML and called it a day.

The site was designed in 2016 and I haven't updated it since. Until now.

## Enter Claude and the Cursor Inspiration

I tried like five different times to use someone else's theme. But with each of those themes, you have to go in and make so many small tweaks. I was like, "Wait, I could just be me and Claude designing this."

I went to cursor.com and I liked it. Actually, I think cursor.com is based off of openai.com - they all sort of look alike now. But what I like about Cursor's site is that it's made for developers. It's a very developer-centric web page.

So that's what I did with dbatools. I made it for developers.

## What's Different

The new site highlights commands that address actual business problems:

- **Copy-DbaDatabase** - migrations
- **Backup-DbaDatabase** / **Restore-DbaDatabase** - disaster recovery
- **Test-DbaLastBackup** - test your backups
- **Set-DbaDbEncryption** - compliance with encryption
- **Invoke-DbaDbLogShipping** - high availability (not a big fan of availability groups, but I do love some log shipping)
- **Update-DbaInstance** - easily patch all of your servers

These are extremely useful commands that needed to be highlighted.

Another thing - I actually put our book on the homepage now. A lot of people love the book written by me, Rob, Jess, and Claudio. It's useful and people love it. Instead of it just being a little link at the top, it's front and center.

Oh, and there's a fake database migration demo on the homepage that actually works. It cracks me up. You can see it migrating Northwind and pubs - throwback to the '90s. Those are still my favorite sample databases.

## The AI Part

I did this in a day. I had seen somebody talk about a project a day and I love that. With AI, you can do a project a day.

I use AI to augment my work. I provide the content and it just provides the grammar around it. It's almost like sending it through an editor. I don't produce slop - I produce informed content that somebody else just helped me word better.

And here's the thing: I have so many posts in draft that I just never got around to writing because it was so exhausting. Because of that, I lost out on sharing a lot of knowledge. There were times where I was really deep into SMO, really deep into replication, really deep into something esoteric that I needed to get through. I wanted to document it, but I just didn't have the energy because it was so hard. And we all lost out on that.

With AI, I don't lose that knowledge anymore.

## The Technical Details

If you're curious, I used Claude Code (specifically Haiku 4.5, which is finally useful) to help with a lot of the implementation. I even wrote a PowerShell module called AI Tools that wraps Claude Code, Cursor, GitHub Copilot, Gemini, and others so you can use them all from PowerShell without caring about their specific parameters.

I also wrote a VS Code extension for generating social media cards using AI that generates HTML instead of images, making them way more flexible and editable.

## The Lowercase Thing

One more thing: dbatools used to be all lowercase. I'm a fan of Linux and with a lot of open-source projects in Linux, it was always just lowercase. The problem is the internet totally made it "DBAtools" - capital D, capital B, capital A. Google named it that way, AI named it that way, even though it is all lowercase.

And whenever I started writing blog posts, I felt the need to title them in all lowercase too. I'm sure that annoyed people and it finally annoyed me. So now I'm having AI go through and fix all the title casing. Look at me, getting fancy.

## Come Check It Out

The new site should be live soon. It's clean, it's developer-focused, and it actually tells you what dbatools does.

Check it out at [dbatools.io](https://dbatools.io) and let me know what you think.

\- Chrissy
