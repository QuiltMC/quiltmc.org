---
title: "Quilt Development Update: January 2024"
date: 2024-02-12 15:00:00 -00:00
authors:
  - ix0rai
layout: /src/layouts/Post.astro
---

As a homunculus constructed of mappings and Swing, barely tied together by a high-voltage web of electricity and emotion, I try to deliver a nuanced view of each month's development in the Quiltosphere, to varying degrees of success. Let's see what happened in the last 31 days of development.

<!-- MORE -->

As always, Mappings won the month, delivering two releases of Enigma and tons of changes to Quilt Mappings. Loader and QSL tried their best, but unfortunately can't even come close to comparing to the glory of the Quilt Mappings suite of projects. Let's get right into their pathetic attempts in the latest edition of Quilt Development Update: Unbiased Edition.

## qsl

After a long few months in the mines, [OroArmor](https://github.com/OroArmor) has completed the [port](https://github.com/QuiltMC/quilted-fabric-api/pull/144) of [Quilted Fabric API](https://github.com/QuiltMC/quilted-fabric-api) to Minecraft `1.20.2`! Due to many, many technical changes in Minecraft, Quilt Standard Libraries, and Fabric API, it was an enormous task to tie them all back together in Quilted Fabric API. We're sorry for the delay, and hope to find more help (perhaps you, dear reader?) and rethink the way QFAPI is set up so that we can update faster in the future! As with any big update, this came with a few issues, and we've continued to release new builds fixing them as soon as they come up. Next, on to `1.20.4`!

![A comparison of OroArmor's two profile pictures, featuring one head with blue eyes titled "oro (pre qfapi)" and one with red eyes titled "oro (post qfapi).](/assets/img/writing/blog/2024-02-12-quilt-update/oro_armor.png)

Now, as a special treat, I've convinced our lovely new hire [Up](https://upcraft.dev/) from the installer team to write up this month's Quilt Loader section. While she's absolutely brilliant in software development, she remains unproven in the blog post space. Make sure to [email me](mailto:ix0rai64@gmail.com) regarding her performance if you find the following section unsatisfactory or would like to throw her a compliment for the excellent section.

## loader

At least that was the plan. In a personal attack against me, Up's internet tragically went down just before she was about to research and write this section. It's still down as of writing. There seems to be some sort of cosmic force that prevents me from getting any help with writing these posts. Alas. Now let's see what the loader gang was up to in January.

The main event of note was Up joining the installer team. Right at the beginning of the month, we finally pushed through a major cleanup of our [new installer](https://github.com/QuiltMC/quilt-native-installer) (which is not quite done yet!), written by the ironically named [Rookie Coder](https://github.com/theRookieCoder). This clears the way for the team to continue working on getting the new installer as feature-complete as the old one!

Next, we wrote up an [RFC](https://github.com/QuiltMC/rfcs/pull/89) and a subsequent [implementation](https://github.com/QuiltMC/quilt-loader/pull/395) of *sided mixins*, a neat feature which allows you to better organise your mixins based on whether they apply to Minecraft's client or dedicated server. Neat!

## mappings

Mappings has had a big month this time around, thanks to Enigma `2.0` being pushed out last month, to excellent reviews from Enigma critics everywhere. One Enigma feature that has had the exact impact I hoped for in my nefarious plan is [bright green checkboxes on fully mapped packages](https://github.com/QuiltMC/enigma/pull/152): to quote a new contributor, [pyrox0](https://github.com/pyrox0), "Four easy checkboxes in the classes panel, I'm happy with that." The QM team continues to innovate by creating new ways to make mapping more fun and therefore get mappers mapping.

Speaking of Pyrox, she has absolutely dominated the mapping scene like a rather prolific blizzard or perhaps an unusually furious snowstorm. It has managed to commit more than 2500 new mappings in just a month and [only](https://github.com/QuiltMC/quilt-mappings/pull/539) [three](https://github.com/QuiltMC/quilt-mappings/pull/530) [PRs](https://github.com/QuiltMC/quilt-mappings/pull/528), which as a mapper myself is some fairly incredible output. However, she wasn't the only thing happening in the QM sphere this month — let's check out what the rest of the team was up to!

First off, Iota and I (rai minecraft) continued cooking up new Enigma goodness for you. At the very beginning of January, we released Enigma `2.1`, a release mainly aimed at refining `2.0` but nonetheless featuring a few additions. Because we couldn't help it. Firstly, we added two more development options: highlighting debug tokens in the UI, and showing the source plugin of automatically proposed mappings. This may not be exciting for you, the reader, but it allows us to more easily fix issues in the future! Speaking of issues, we fixed a longtime issue with interfaces: sometimes, a class could implement methods with the same names and signatures from two different interfaces. This would break the mappings if you renamed one of those, as Enigma wasn't aware that they needed to match. Now they'll be synced, making that impossible! And finally, we managed to sneak in a flashy feature: tokenization in the bytecode decompiler view, allowing you to more easily understand bytecode and rename tokens directly.

![The lovely new Enigma bytecode view.](/assets/img/writing/blog/2024-02-12-quilt-update/enigma_bytecode.png)


It also came with a [huge round of bugfixes](https://github.com/QuiltMC/enigma/blob/master/CHANGELOG.md#bugfixes-a-lot-of-them), since our team of two can't catch everything before release. But on to `2.2`! This one once again had a headline feature from Iota, hot off the tail of her bytecode view upgrade. The Enigma server, being the one component that didn't get much love in `2.0`, has finally gotten a facelift in `2.2`. Among the main features are a rework to the way clients are approved which improves security, another development option (mwahaha) to log packets, streamlined code, and adding tests to keep everything running smoothly. It also comes with a new command: `print-stats`, which prints data about the total mapping percentages of the project. "But rai, none of these help you map faster!" I hear you screaming. Fear not, Enigma `2.2` brings more information in the identifier panel, telling you the parents of inner classes and — more importantly — the types of each parameter. This second one helps a lot for lambda parameters, which don't clearly show their type like a regular one would. Now you no longer have to guess!

The Enigma sphere has one more thing to offer this month: Iota has been hard at work on the [plugin](https://github.com/QuiltMC/quilt-enigma-plugin) once again, implementing recursive constant field search, delegate parameter name proposal, allowing strings passed to constructors to be used as constant field names, and cleaning up tons of code. This is one of the most technical projects in all of Quilt, so here's a buzzword breakdown.
- recursive constant field search: now, if a constant field is initialized using *another* constant field as a parameter, the plugin is able to see that field's name and consider it as a name for the current field.
- strings passed to constructors as constant field names: previously, the constant field name finder could use strings passed to methods to come up with names, but was unable to do the same when the declaring looked like this: `new Thing("name")` instead of `createThing("name")`. Lovely!
- delegate parameter name proposal: we like to call this one "bubbling up parameters". It's similar to recursively searching for constant field names, but it's now searching for parameter names. Occasionally in Java you'll write an *overload method*, which means you'll have a method like `awesomeMethod(int value, int value2)`, where you usually want that second int value to be a constant value: let's say 5. You'd write a second method, the overload method, that looks like this: `awesomeMethod(int value) { awesomeMethod(value, 5); }`. Now, thanks to some cleverness on Iota's part, the `value` parameter name from the base method will now carry over to its overload method, as long as it's unmodified.

Now let's finally get into the actual mapping changes. As always, we updated to every snapshot this month: `24w03a`, `24w03b`, `24w04a`, `24w05a`, and `24w05b`. Our coverage went from `92.76%` in `23w51b` to `94.62%` in `24w05b`, thanks to 21 pull requests from 8 different contributors! We had dreams of being able to say we were above `95%` for this post, but unfortunately the latest snapshots knocked us down to 94 again. [We're always looking for new mappers](https://quiltmc.org/en/blog/2023-06-03-qm-needs-you/), so feel free to open up a PR of your own or stop by the [Discord](https://discord.quiltmc.org) any time. Here are the full stat differences:

![A comparison of the mapping stats in snapshot 23w51b and 24w05b.](/assets/img/writing/blog/2024-02-12-quilt-update/mapping_stats.png)


This month was heavy on the new additions, with very few refactors to speak of. We're continuing to work towards getting our completion up there with that of [yarn](https://github.com/fabricmc/yarn) again! Finally, our lovely OroArmor, QSL developer extraordinaire, came down from his throne to deliver a [couple new features](https://github.com/QuiltMC/quilt-mapping-tools/commit/bb96b21be34d4192b80b3016de9f4d51de3073d2) to [Quilt Mapping Tools](https://github.com/QuiltMC/quilt-mapping-tools), our work-in-progress redo of the mappings toolchain.

## misc

After about eight months without getting any features (\*unikitty voice* *emmm*barrassing!) [Quilt Config](https://github.com/QuiltMC/quilt-config), our solution to the Minecraft config library disaster, defrosted thanks to some hot new additions with its `1.2` release. The motivation of these additions, mostly made by a certain rai minecraft you may have heard of, was to get QConf working outside of Quilt Loader to be used as the config backend for the aforementioned Enigma `2.0`. Mission success! Let's look at what it took:
- instead of expecting programs using QConf to provide their own serializers (the programs which take config values and read and write them to config files), it now ships with two default options for the **TOML** and **JSON5** formats. This solves what was, dare I say, a pretty stupid situation before where Loader had to directly copy the code of the serializers used in QConf's unit tests for use in production. An additional benefit of this is that features that depend on serializer changes, such as one we're going to talk about next, no longer require programs using QConf to manually update their serializers. Instead they can just import the updated versions directly!
- I leveraged Quilt Config's powerful metadata system to set up a new annotation: `@SerializedName`. A mainstay in serialization libraries like [GSON](https://github.com/google/gson), this allows you to manually decide the name your config field will take in the serialized file instead of having to use the name from your code. For an example usage, you could name a field in your code `superCoolField` and then serialize it as `super_cool_field`, to conform to both Java and TOML name conventions at the same time. Thanks to the heavy lifting of implementing this, we already have some new ways you can customise your config files coming in `1.3`!
- While building those updates, I ran into a few high-profile issues that needed fixing. These are now fixed!
	- The metadata on config sections used to be ignored, meaning that you couldn't give them custom serialized names, comments, or any of Quilt Config's other handy pieces of metadata. Unfortunate.
	- Adding dots to a key when saving to TOML was completely broken and would produce an unreadable disaster in the config file. Thanks to the lovely [hibi](https://hibiscus.pet/) for finding this one!

That's not quite it for Quilt Config. I'm working on [comprehensive tutorials](https://github.com/QuiltMC/developer-wiki/pull/81) for the [developer wiki](https://github.com/QuiltMC/developer-wiki) on how to use Quilt Config! Now we're done.

Our [template mod](https://github.com/QuiltMC/quilt-template-mod) got a nice little update in the form of deduplicating the maven group value between the `gradle.properties` and `quilt.mod.json` files, the same way the version is synced. Thanks to [TheKodeToad](https://github.com/TheKodeToad) for that!

One of our other little-loved projects got pull requests this month: [Quilt Parsers](https://github.com/QuiltMC/quilt-parsers), the backend JSON parser for everything Quilt, has a couple minor improvements in the words thanks to [Leo](https://github.com/Leo40Git)! Delightful. We'll see you next month!
