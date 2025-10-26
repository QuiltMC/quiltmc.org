---
title: "Adding Cloudflare Web Analytics to quiltmc.org"
date: 2022-11-26 23:45:00 -00:00
authors:
  - Southpaw1496
excerpt: "Today, we're adding the Cloudflare Web Analytics to quiltmc.org. We know that analytics tools have a reputation of being both greedy and careless with user data, and that some people might feel that we're putting meaningless numbers before their privacy, which, given the general perception of web analytics, is not an unfair assumption. However, we have put thought and care into the decision, and so this article explains what data is collected, how we could use it, and how we collect it without impacting your privacy."
includeExcerptInMainPost: true
---

#### Contents:
- [Contents:](#contents)
- [Analytics and Privacy](#analytics-and-privacy)
- [What Data Is Collected](#what-data-is-collected)
- [How We Could Use the Data](#how-we-could-use-the-data)
- [Why Cloudflare?](#why-cloudflare)


## Analytics and Privacy
Analytics tools are not exactly known for their focus on user privacy. This is because the most well-known analytics tools are run by advertising companies, most notably Google Analytics, [which has an 85% market share in the analytics business, and is installed on over 55% of all websites](https://w3techs.com/technologies/overview/traffic_analysis). As well as collecting analytics for the website owner to use, these tools use various technologies (like cookies or local browser storage) to associate users with a central identity. Then, when a user visits a website, they log that user as having visited it to a central database. 

While knowing that a user visited a single website isn't very useful, if an analytics tool is installed on lots of websites (like how Google Analytics is on 55% of the web), it can get pretty accurate data of what websites a person is visiting and what they're doing there, which can then be used to target ads to them. The website owner essentially makes a deal with the analytics tool vendor: The vendor will provide collect and store the analytics data for free, and in return, they get to watch every user visiting your site, and use the data for whatever they want. This is a great deal for both the vendor and the website operator, but not so much for the website's users, and as a community-focused product, a deal that benefits us but hurts our users is not one that Quilt is willing to make. Fortunately, there is a better way.

In more recent years, spurred on by the advent of the GDPR and similar privacy laws, many companies have developed more privacy-focused analytics products, one of which is Cloudflare Web Analytics. While there are many similar products available, we'll be talking about it specifically, since it's what we're using for quiltmc.org. Critically,[ it doesn't use cookies, local storage, fingerprinting, or any other technologies to associate you with an identity](https://www.cloudflare.com/en-gb/web-analytics/), which means **it cannot track you around the web**. This means we won't need to ask you to consent to cookies when you visit our site (even though it would be a great opportunity to make a drawing of Cozy nomming a cookie), because we still don't use any.

## What Data Is Collected
The following list are the main things tracked by Cloudflare Web Analytics. It's important to remember that because Cloudflare doesn't log your IP address or use any other fingerprinting technologies, it's impossible to associate any of this data with any specific person or group. If we looked at site visitor metrics, for example, we wouldn't be able to see who those visitors were, or what each one of them did; only that some people visited some pages, and some people visited others.

Cloudflare Web Analytics collects:
- **Visits:** When someone visits a page from an external or direct link, rather than an internal link in another part of the website.
- **Page Views:** When someone successfully loads an HTML page on the website.
- **[Core Web Vitals](https://www.cloudflare.com/en-gb/learning/performance/what-are-core-web-vitals/):** Performance metrics reported by most Chromium-based browsers and used in Google's search rank algorithms
- **Country:** What country someone visits from, based on their IP address.
- **Referrer:** What website a person came from.
- **Device Type:** The type of device a person visited with: desktop, mobile, or tablet.
- **Browser:** The browser a person used when they visited.
- **Operating System**: What operating system the person used when they visited.
- **Page Load Time**: How long each stage of page loading took.

Additionally, Cloudflare Web Analytics [is fully GDPR-compliant](https://www.cloudflare.com/en-gb/gdpr/introduction/) and doesn't collect any information classed as Personally Identifiable Information (PII).

## How We Could Use the Data
Even though Cloudflare Web Analytics doesn't come with any privacy concerns, it does add complexity to the website that wouldn't be worth it if we just used the data it provides to make pretty graphs. However, there are real ways that we can use it to make the website better for the increasing number of people that visit it every day. Here are some examples:
- The data about what countries our visitors are from will help us know which languages to prioritize for localization.
- If we notice that a lot of visitors are coming from a particular social media post, video, or blog article, we can show it to the rest of our users as a way of saying thank you.
- If we notice people with certain device types, operating systems, or browsers are having bad experiences (for example, slow page loads), we can look into optimizing the website for them so that they have a better experience.
- If our Core Web Vital statistics are low for a large number of users, we can work on improving them to improve our SEO, since they are part of Google's search ranking algorithm.
- If a page is loading slowly for a lot of people, we can see exactly which part of the process is getting stuck and fix it, without them having to go through filing a GitHub issue.

As well as these more practical examples, there is another use for them, which is encouragement. Seeing Quilt's success in numbers, and how it's gradually growing and spreading through the web to more and more places, reminds us that what we're doing is in fact making an impact, even if it sometimes feels like Mojang breaks half our tooling every couple of minor releases. We know that our growth interests our community, too, and while it's not possible to make the analytics completely public, if all goes well we plan to write a series of blog articles every so often about the website's analytics, starting with December's analytics in January. 

## Why Cloudflare?
Cloudflare has attracted a lot of controversy recently, most notably its initial refusal to stop providing service to the harassment forum Kiwi Farms, so it's not unreasonable to wonder why we're choosing to use their offering over one from another company. The reason is that almost all privacy-focused analytics tools are paid, since they can't fund themselves by selling or utilizing the user data they collect, while Cloudflare offers a generous free tier in the hope that you'll soon upgrade or try one of their paid products. There aren't any other really reputable companies offering good free tiers, and the tradeoffs of using Cloudflare do not outweigh the costs that would be incurred from going with someone else.

I hope that after reading this article, your mind is at rest. As the world becomes increasingly chaotic in many respects, it's easy to think that we're going the same way as everyone else: launching something new without really thinking about it, and hurting our users in the process, but hopefully, you now understand the reasoning behind the decision. If you have any questions, you can visit `#discord-meta` in the [Community Discord Server](https://discord.quiltmc.org), or [the `Meta` section of the forum](https://forum.quiltmc.org/c/quilt/meta/).
