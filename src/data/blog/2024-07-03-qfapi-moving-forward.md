---
title: "QSL and QFAPI for 1.20.6 and beyond"
date: 2024-07-03 20:00:00 -00:00
authors:
- glitch
---
QFAPI is out *now* for 1.20.6 and 1.21. However, the version of QSL (the Quilt-only tools we provide developers) bundled in these versions is much smaller than before, and currently only contains the `qsl_base` and `crash_info` modules. More APIs will be reintroduced to QSL as time goes on. This means that mods written using Quilt Standard Libraries may need extra work to be ported to 1.20.6 and beyond, while Fabric mods for these versions will work fine. Additionally, delays on updating to new versions should be significantly shorter in the future.

More importantly, however, you may have noticed that this is the second blog post in two days! That's not even enough time for Eminem to write another song. This is because rai (your usual blog post correspondent) now has competition! If she doesn't turn in the next monthly blog post on time, I'm replacing her with an AI trained on speeches given by members of the Canadian Parliament. What could go wrong?
<!-- MORE -->
## the meat of the story
<!--the actual blog post begins here-->
On a more serious note, you may have noticed that 1.20.6 has been out since late April, but QSL and QFAPI had (until this blog post) still not updated. And this has been a problem stretching all the way back to 2022, when QFAPI was first released. I want to take some time to describe why we've had so much trouble updating, what we're doing about it now, and some ideas we're considering for the future.

## why things have taken so darn long
QSL updates are slow for a few reasons. For one, it's huge! It spans several very complex problems that normal modders don't need to think much about, like the internals of networking, synchronizing registries, and loading mod-provided resources. Additionally, these huge APIs touch parts of the Minecraft codebase that are refactored by Mojang all the time, meaning even an update like 1.20.4 to 1.20.5 might require a rewrite of half the networking module.

Another hurdle for porting QSL is that its APIs must be implemented in a way that is compatible with QFAPI. This means that we not only have to design a new API that elegantly represents how the internal Minecraft code changed, while still being similar enough to Fabric that we can maintain compatability.

But perhaps the biggest problem with porting QSL is that these complex APIs are really old! The original contributors for these APIs, who intimately understood how they worked, have moved on from Quilt. That means that our "new guard" of core maintainers, who didn't write the now-broken APIs, have to learn how they work as we try to fix them, which is slow and very error-prone.

## what we're doing about it now, or "how i learned to stop worrying and love fabric api"
Clearly, QSL in its current form is not sustainable, and we're going to need to do significant work on it so that it can be updated quickly. However, we lack the contributions to both work on a rewrite of QSL and keep the behemoth old QSL updated. So, in the meantime we're going to distribute an extremely stripped down version of QSL. Currently, that means only `qsl_base`, the module that provides entrypoints and an event system, and `crash_info`, so that crash reports are still Quilt-y. Quilt modders looking to port to 1.20.6 and beyond should migrate their use of Quilt APIs to the relevant Fabric equivalents for the time being.

If you are a Quilt modder who relied on a Quilt API with no Fabric replacement, please tell us! We want to prioritize providing APIs that modders actually use, so please [open an issue](https://github.com/QuiltMC/quilt-standard-libraries/issues/new) and let us know.

## moving forward
Stripping QSL like this is meant to be a stop-gap solution to keep things moving along while we fix the underlying issues with QSL. We aren't sure exactly how things will change in the future. We may eventually restore all the old QSL APIs and continue business as usual, remove some modules which unnecessarily  share code with Fabric (like networking), or even move to QSL being only an extension on Fabric API.

No matter what happens, our first priority moving forward is to ensure that Quilt Loader users are able to play with their favorite mods on new versions as soon as possible.
