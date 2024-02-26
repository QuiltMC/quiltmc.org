---
title: "Evil Modding Project Adds Telemetry"
date: 2023-06-26 12:00:00 -00:00
authors:
  - ix0rai
layout: /src/layouts/Post.astro
---

If you've been keeping tabs on our RFC, or Request For Comment, [repository](https://github.com/QuiltMC/rfcs), you may have noticed that we've
just merged a proposal for Quilt Loader to keep tabs on how many people are using it each month. All considered, it's unfortunate that it was RFC 81,
not RFC 1984.

<!-- MORE -->

## Why are we doing this?

Excellent question, dear user. Over the last couple years of Quilt, we've been running [a website](https://quiltmc.org/), 
[a repository of compiled binaries called a Maven](https://maven.quiltmc.org/), and other miscellaneous bits that we need hosting for.
One of the best ways for projects like us to pay for our infrastructure is by getting a sponsorship: a company agrees to pay some
of our costs, for the low low price of an icon on the website or something similar. Since they're a company, before agreeing to take
on the financial burden of an entire project, they first want to make sure that people will actually see that icon: that's where Monthly
Active Users, or MAU, come in. MAU is a pretty universal statistic that shows how popular something is: my personal website has one MAU,
which is just me coming back every once in a while when I add something interesting, while a big service like Github has millions of MAU
from people coming back all the time to view and commit code. Every unique person who visits that month bumps the MAU number by one.
Our potential sponsor gets to see that and go "ah, there are a pile of people playing on Quilt, that means a bunch of folks will see our
little ad and check us out!". 

Another huge benefit of having an MAU statistic is that Quilt developers like me get to see just how many people are using our passion
project, which is great motivation for us to keep improving it! I'm sure it'll always be fun to see how many of you are running around inside a Quilt-powered version of the silly block game.

## *How* are we doing this?

As neatly laid out [in the RFC](https://github.com/QuiltMC/rfcs/blob/main/specification/0081-active-user-beacon.md#explanations),
the process is very simple.
When you load up your game, Quilt Loader will check for a file that's shared by all your instances of Minecraft,
that contains the last date that it told our infrastructure you're a user.
If that month is the current month and you haven't opted out, Loader will move on to updating the stats. After running the opt-out and date checks, this process is entirely separate to loading your game, and won't slow anything down.

![A cute graph explaining the process Quilt Loader goes through to update the MAU beacon](/assets/img/writing/blog/2023-06-26-mau-beacon/beacon-update-process.png)

When Loader has assessed that you're not yet considered an active user for this month, it sends a simple request with no data;
no body or headers, to an endpoint at https://quiltmc.org. The server updates the counter without storing any identifying data.
Then, Loader updates its persistent file with the current month, and continues on its merry way.

### Will this steal my data, the family cat, and possibly my wife as well?

The biggest consideration when designing this feature was privacy: we want to get the numbers, and absolutely nothing else.
This means that while your IP address will be sent to our website once a month, we discard all information except the +1 to
our counter as per [the restrictions in the RFC](https://github.com/QuiltMC/rfcs/blob/main/specification/0081-active-user-beacon.md#beacon-server-restrictions).
The server accepting the signal is [fully open source](https://github.com/QuiltMC/beacon.quiltmc.org)
and will remain that way so anyone can see what we're doing with what you send us. Additionally, since Quilt Loader is open source as well, you can see all the code sending the signal in [the MAU beacon pull request](https://github.com/QuiltMC/quilt-loader/pull/326).

![A screenshot of the table of signals sent to the beacon, showing that it stores date, time and nothing else](/assets/img/writing/blog/2023-06-26-mau-beacon/beacon-signals.png)

## I don't like that, how can I say no?

There are two simple ways to opt out of being counted.
1. When running Quilt Loader, add a property, `-Dloader.disable_beacon=true`, to your Java Arguments. In the official Minecraft
launcher, you can do this by going to `installations -> edit -> more options -> jvm arguments` and appending that to the end.
If you're using another launcher, check its documentation or poke around to find the same thing. Loader also has a collection of
other useful properties, nicely documented in [its wiki](https://github.com/QuiltMC/quilt-loader/wiki/System-Properties).
2. Set the `QUILT_LOADER_DISABLE_BEACON` environment variable to `true`. An environment variable is a value that is visible to all programs,
so using this method will opt you out on *all* your installations.

Though it's easy to disable, it would be lovely if you left it on for us. Who doesn't love a number getting bigger?
