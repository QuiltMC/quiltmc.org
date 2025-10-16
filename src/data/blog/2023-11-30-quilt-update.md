---
title: "Quilt Development Update: November 2023"
date: 2023-11-30 15:00:00 -00:00
authors:
  - ix0rai
layout: /src/layouts/Post.astro
---

Hello! This is the first entry in a newly consistent series on the blog, chronicling what's been going on in Quilt development.

<!-- MORE -->

We intend to publish an update at the end of each month, and they're going to replace the development update meetings hosted on [Discord](https://discord.quiltmc.org). We're still going to be hosting Q&A sessions there monthly (dates are TBD), but we'll no longer be having developers read out updates to you via the voice channels. With that said, we hope that this move will make development updates more accessible and easier to follow!

This has been a fairly slow month for Quilt, but we still have a few interesting changes to show you!

## Loader

Loader has seen a few big PRs this month, thanks to Alex's tireless work. First, the biggest PR in terms of code changed of *anything* in this post, is [solver pre-processing](https://github.com/QuiltMC/quilt-loader/pull/374). This is a large update to the way that Quilt Loader *optimises* the mod set, essentially making sure that mods and their dependencies are set up in the best way possible. In `0.21`, we limit the optimisation process to 5 seconds maximum. Thanks to improper implementation of that process, removing this limit means that the [Blanketcon 2023 pack](https://modrinth.com/modpack/blanketcon-23) takes over 20 minutes to optimise. With this newest PR it's now 60 milliseconds. Nice!

There are tons more [new APIs](https://github.com/QuiltMC/quilt-loader/pull/380), bug fixes, small changes, and improvements to logging in `0.22`, check it out!

## Quilt Standard Libraries

Quilt Standard Libraries hasn't seen any new merges since the update to `1.20.2` back at the start of October. The QSL developers are currently busy with school, making it hard to port Quilted Fabric API to 1.20.2+, and most [open pull requests](https://github.com/QuiltMC/quilt-standard-libraries/pulls) still need to be updated to the latest Minecraft version before they can be merged. If you're interested in contributing, helping to update them is a great place to start. Althought QSL's *APIs* haven't seen any proposed changes, there is [one new PR](https://github.com/QuiltMC/quilt-standard-libraries/pull/354): [Lambda has made a new licenser plugin based on quilt-gradle-licenser](https://github.com/YumiProject/yumi-gradle-licenser), and she's opened a pull request to move QSL over to the new plugin. We're still working hard on updating QFAPI to this new QSL release, and hope to have it done soon! We're also considering making some changes to the structure of QSL and QFAPI to make the updating process quicker and simpler in the future.

## Mappings

As always, QM has been updated to each and every snapshot this month, which includes `23w44a`, `23w45a`, `23w46a`, `1.20.3-pre1`, and `1.20.3-pre2`. Though new mappings have been a tad scarce, we saw some [important entity names](https://github.com/QuiltMC/quilt-mappings/pull/513
) from [HyperPidgeon](https://github.com/HyperPigeon), and a few [changes to item mappings](https://github.com/QuiltMC/quilt-mappings/pull/514) by yours truly to account for the changes Mojang made to accomodate the [Crafter](https://minecraft.wiki/w/Crafter). Along with those two small pull requests, I brought you [full coverage of `net.minecraft.data`](https://github.com/QuiltMC/quilt-mappings/pull/515) and [Platymemo](https://github.com/Platymemo) delivered [a huge update to advancement mappings](https://github.com/QuiltMC/quilt-mappings/pull/496).

Since the main team is busy toiling away on [Enigma](https://github.com/QuiltMC/enigma/)'s `2.0` update, QM has lost coverage this month, going from `94.42%` in the final `23w44a` version to `93.15%` in the current build of `1.20.3-pre2`.  Quilt Mappings development is incredibly simple to pick up, and anyone with experience developing Minecraft mods already has the knowledge needed to start mapping! You can read our [blog post](https://quiltmc.org/en/blog/2023-06-03-qm-needs-you/) for more info about contributing to QM or go straight to our [contributing guide](https://github.com/QuiltMC/quilt-mappings/blob/HEAD/CONTRIBUTING.md) to help!

Now: what is that `2.0` update that the team is so caught up with? Enigma is our *deobfuscator*, the program that we use to create mappings for Minecraft. It allows you to see and navigate Minecraft's obfuscated code, as well as apply names you come up with. This month we've been working on the final improvements to its plugin system, shipping two big changes. First, Iota added new parsing features for profiles, with allow you to pass in data to plugins. In QM we use this to pass in information on Minecraft classes to [our plugin](https://github.com/QuiltMC/quilt-enigma-plugin). Iota's [pull request](https://github.com/QuiltMC/enigma/pull/158) allows you to use a JSON list instead of an unwieldy string object, making parsing simpler for plugins and allowing JSON validation to act on lists.

Secondly, I worked on a [huge pull request](https://github.com/QuiltMC/enigma/pull/163) which overhauled the *name proposal API*, which allows plugins to automatically propose names for mappings. This means that an Enigma plugin is able to analyse compiled Java code, and guess — or _propose_ — new names based on it. This is incredibly useful for repetitive code, and reduces the workload for the humans who work on QM. We also added tons of documentation, and a priority system that decides which plugin takes priority if two plugins propose a name for the same entry. Additionally, we fixed some crashes, squashed some bugs, removed some Recaf mapping format support, updated some other APIs, and cleaned up and documented internals as always.

Currently, Enigma `2.0` is in the home stretch! Iota is busy porting our plugin and refining the updates to the API, and I'm moving Enigma's configuration backend to our own in-house [Quilt Config](https://github.com/quiltmc/quilt-config) API. Once those three items are complete, we should be ready to ship! Barring sudden disasters, of course.
