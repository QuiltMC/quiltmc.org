---
title: "Quilt Development Update: February 2024"
date: 2024-03-09 15:00:00 -00:00
authors:
  - ix0rai
  - OroArmor
---

Well gamers. Another month another late blog post from your local insomniac. This month, to break up the monotony of my ramblings, we've brought local QSL guy OroArmor onto the program to tell us about, you guessed it, QSL. Come sit by the fireside with him.

<!-- MORE -->

# Quilt Standard Libraries

It was barely one day into February when I was told that the registry sync system in QSL was running too late. This lead me on a wild chase as I hunted down and squashed the bug, upgrading QSL's configuration networking API in [QSL PR #363](https://github.com/QuiltMC/quilt-standard-libraries/pull/363). Later in the month, I went on another bug-squashing adventure, quickly taking out [#364](https://github.com/QuiltMC/quilt-standard-libraries/issues/364), [#365](https://github.com/QuiltMC/quilt-standard-libraries/issues/365), and [#358](https://github.com/QuiltMC/quilt-standard-libraries/issues/358) for `1.20.2`.

Now, I bet a lot of you are wondering when I will get around to QSL for `1.20.3` and `1.20.4`. I understand its been a while, but I am very busy. UNTIL NEXT WEEK. (editor's note: Mr Armor is always saying this. Take his words with a grain of salt)

That's right, a new QSL update is coming soon to a Mod Hosting Site near you! Hurry up, only while supplies last!

## Quilted Fabric API

As for the other half of Quilt's APIs, QFAPI was updated with the latest QSL version, making sure that you get those bug fixes. In addition, there were a few sync pull requests that brought older versions of QFAPI for `1.20.1` and `1.19.2` up to date with the latest Fabric API for those versions. Thanks [unilock](https://github.com/unilock) and [Kneelawk](https://github.com/Kneelawk) for these updates!

# Quilt Loader
Back to your regularly scheduled writer. Loader has mostly been getting minor fixes and keeping synced with Fabric compatibility this month, in preparation for a bigger release coming in March! This includes some improvements to error readablity for users, fixing compatibility with a few mods using Fabric Loader internals, and work towards the stabilization of loader plugins. As I write this, it's March and the release has come out. Because I'm mean, you, dear reader, will be told about it next month!

# Quilt Mappings

As always, your favourite team has delivered day 1 updates for every snapshot: `24w09a`, `24w07a`, and `24w06a` this month. Let's hit the highlights in terms of pull requests. Realms screens as well as particles have once again hit 100% completions thanks to work from Iota and pyrox, and we've seen lots of new coverage in snapshot features like trial spawners and world events. Despite the valiant efforts of our mappers, we've lost 0.5% coverage this month. A single perfect tear rolls down my smooth, emotionless visage.
![A beautiful comparison of mapping statistics, going from 94.8% to 93.3%](/assets/img/writing/blog/2024-03-09-quilt-update/mapping-comparison.png)

To discuss something *other* than coverage for once, we're planning to go ahead with a major change to QM in the future: [matching Mojang's package structure](https://github.com/QuiltMC/quilt-mappings/issues/550). Note that we've hardly started on the implementation of this change, so it's still very much to feedback from the community (including you, dear reader!). This means that while QM will still define its own package names, all classes will be organised in the same packages as they are in Mojmap. This allows for a few major benefits:
- It gives us the ability to map `package-info` files, which allow giving more context to users as to what an overall package is meant for.
- By mimicking Mojang's structure, we allow QM names to be more future-proof: instead of deciding our own names which may be contrary to Mojang's intentions, we follow their vision for the code exactly. This prevents situations where mappers organise things one way, and via game updates it becomes clear that Mojang intended the classes to be organised in a different manner, forcing us to refactor names.
- QM mappings will become more familiar to modders accustomed to using Mojmap.
- It eliminates the necessitity of remapping class access rules: QM's arbitrary former package structure meant that package-private elements could be put in any package, meaning that tooling would have to edit those access rules to make sure they functioned the same as an unmapped game. Without this step, it's easier to implement QM on platforms such as Neoforge that are moving to Mojmap-only.

And finally, [Enigma](https://github.com/QuiltMC/enigma) has of course been getting some love throughout the month. We've fixed a pile of bugs with version `2.2.1`, and started work on some features for `2.3`! `2.2.1` brings fixes for:
- Improper syncing of javadocs on the server
- A couple crashes
- A few false positives in the mapping uniqueness validator
- An edge case where valid Java code could be rejected
- The "decompile inner classes" Vineflower options causing decompilation failures

And in terms of features we have cooking, the `ctrl + f` quick find dialogue has been updated and we've stolen yet another feature from IntelliJ: the progress bar in the corner. More details will come in next month's post!

## Miscellaneous

### Developer Wiki

The Quilt Developer Wiki got not one, not two, but three new articles this month, thanks to a [rather enormous pull request](https://github.com/QuiltMC/developer-wiki/pull/81) from yours truly. These articles are:
- [Getting started with Quilt Config](https://wiki.quiltmc.org/en/configuration/getting-started), an overview of the most important features in Quilt Config and how to use them. It includes how to set up a config in a Quilt mod, how to add values, using annotations to add metadata, and saving values in maps and lists.
- [Advanced configuring](https://wiki.quiltmc.org/en/configuration/advanced-configuring), an article that goes into all the gorgeous features of Quilt Config that you *don't* need for a simple configuration. However, for those storing complex values in the config or making large configs, this is a must-read! It goes into detail on serializing custom values outside of basic types, maps, and lists, as well as giving details on using the powerful processor feature and organising your config into separate sections and files.
- [Annotation and metadata reference](https://wiki.quiltmc.org/en/configuration/metadata), a reference on all the different annotations Quilt Config allows you to apply to your configs, sections and fields. It currently includes:
	- [@Comment](https://wiki.quiltmc.org/en/configuration/metadata#comment)
	- [@FloatRange and @IntegerRange](https://wiki.quiltmc.org/en/configuration/metadata#floatrange-and-integerrange)
	- [@Matches](https://wiki.quiltmc.org/en/configuration/metadata#matches)
	- [@Processor](https://wiki.quiltmc.org/en/configuration/metadata#processor)
	- [@SerializedName](https://wiki.quiltmc.org/en/configuration/metadata#serializedname)
	- [@SerializedNameConvention (currently unreleased!)](https://wiki.quiltmc.org/en/configuration/metadata#serializednameconvention)
	- [@Alias (currently unreleased!)](https://wiki.quiltmc.org/en/configuration/metadata#alias)

We've also updated the url to `wiki.quiltmc.org` (from `modder.wiki.quiltmc.org`). The original idea behind the frankly grody old domain was to create an entirely separate wiki on `user.wiki.q.o` that was targeted specifically at users, to provide install information as well as tutorials for features like dependency overrides. We've decided that an entire dedicated domain is a tad overkill for the few tutorials that would be written for it.

### Quilt Config

Quilt Config has seen the merge of a few minor pull requests this month, with some bigger ones in the works for a future [1.3](https://github.com/QuiltMC/quilt-config/milestone/1) release! [Processors](https://wiki.quiltmc.org/en/configuration/metadata#processor) have gotten a pretty big update, getting full documentation and the ability to apply to sections, in addition to the fields and classes they could already work on. We've also removed some nonsense comments bloating config files with custom serialized values, added a new shortcut method to allow you to more easily set values, and fixed up some problematic Javadoc.

### Quilt Loom
Quilt Loom got updated to the latest Fabric Loom. Cool! Oro did this, so I probably should have made him write the section. As resident mappings girlie I hardly write mods and haven't used this. Burn me at the cross now. It's mostly about performance, with the headline feature being the way Loom remaps mixins being brought in line with the way everything else is remapped, for better consistency, more buglessness, and performance.

### Quilt Kotlin Libraries

Quilt Kotlin Libraries [has followed QSL in updating to `1.20.2`](https://github.com/QuiltMC/quilt-kotlin-libraries/pull/88)! It also fixes a few old bugs and new bugs. Have fun!

At last, that's it for me. See you next month quilters. Keep slaying.
