---
title: "Quilt Development Update: April, May & June 2024"
date: 2024-07-02 23:00:00 -00:00
authors:
- ix0rai
excerpt: "Welcome back to the blog, quilters. It's been three months since the last time I wrote up one of these big update posts, three months since you skipped to the parts you cared about without reading my whole post, and one month since Eminem released a new Slim Shady song and took away my chance to start this post with a \"guess who's back\" joke. Which is fine. I'm not mad. Not even a little. Let's see what happened with Quilt in the last few months!"
includeExcerptInMainPost: true
---

## Quilt Loader

As always, our beloved Alex has been cooking up endless amounts of features and fixes for Quilt Loader. We released two major updates in the past 3 months, [`0.25.0`](https://quiltmc.org/en/changelog/quilt-loader/0.25.0/) and [`0.26.0`](https://quiltmc.org/en/changelog/quilt-loader/0.26.0/)!

Starting things off, landing in `0.25` is a [feature](https://github.com/QuiltMC/quilt-loader/pull/414) by a new contributor, [Mega](https://github.com/FirstMegaGame4)! This is an annotation built into Loader that allows stripping code from your mod when another mod is not detected. This is an easy way to improve compatibility with other mods that don't implement their own entrypoints. To parrot the example from Mega's PR description, this is usable to make an item a [trinket](https://modrinth.com/mod/trinkets) only when that mod is loaded:
```java
public class MyOptionalTrinketItem extends Item implements @Requires("trinkets") Trinket {
	@Override
	@Requires("trinkets")
	public Multimap<EntityAttribute, EntityAttributeModifier> getModifiers(ItemStack stack, SlotReference slot, LivingEntity entity, UUID uuid) {
		// code that will only exist in the mod if Trinkets is loaded!
	}
}
```
When using this annotation, be careful to always test in production without the optional mod in order to ensure you properly stripped all references. This release also contains some minor features and fixes, such as providing the reason in inter-mod breakage errors.


Moving on to `0.26`, we have a release more geared towards backend improvements than new APIs for mod developers. The lovely [Lukebemish](https://github.com/lukebemish) contributed a [rework of how Loader manages its dependencies](https://github.com/quiltmc/quilt-loader/issues/418), making it much, *much* easier to depend on Loader outside of Loom. Another new contibutor, [voidpointer](https://github.com/voidpointer0x00), added a new commandline parameter, `-Dloader.ignore_unsupported_mods=true`, that allows ignoring the errors for mods in the mod folder that cannot be loaded by Quilt. This release also makes two improvements to crash reports, which the changelog will tell you about:
- Include the zone offset (raw time number like +0100) in the actual crash report file. This should help when assisting people in other timezones, as we can figure out how recently a crash report was generated.
- Change from CLOCK_HOUR_OF_DAY to HOUR_OF_DAY. This means we'll get digital time at 15 minutes past midnight (00:15) rather than analog time (24:15).
  Of course, this release also comes with some important bug fixes and minor changes. Which I would love to talk about. But corporate tells me I'm consistently exceeding my word budget on these posts, so on to another update under the Loader umbrella: Quilt Config!

### Quilt Config

Right at the beginning of April, we released Quilt Config's biggest update ever: [`1.3.0`](https://quiltmc.org/en/changelog/quilt-config/1.3.0/)! Quilt Loader has already updated, so all these features are already available to use in your mods as of Loader [`0.25.0`](https://quiltmc.org/en/changelog/quilt-loader/0.25.0/). The main highlight of this release is five new annotations, but we'll get to those in a second. Firstly, we solved two big issues with using [`1.2`](https://quiltmc.org/en/changelog/quilt-config/1.2.0/):
- The deprecated `WrappedConfig` system had some major flaws (on top of the ones that make it impractical and deprecated!) related to using simple types like `String`. Compiled code in Java will inline references to constant values (those prefixed with `final`), meaning that the hackery we did to change the values in the code according to the ones read from the config wouldn't always work. The inlined usages of those variables are no longer references, they just directly pass in the original value, ignoring what was read from the config file. We now allow using non-final fields in `WrappedConfig` configs, and print warnings when fields are final. This will resolve that issue, but make it easier to misuse the system and cause unexpected behaviour. We highly recommend using `ReflectiveConfig` instead.
- Processors were undocumented (besides on our [lovely wiki](https://wiki.quiltmc.org/en/configuration/advanced-configuring#using-processors)) and didn't work consistently. We've now added extensive Javadocs and fixed them not working on sections to make their behaviour more predictable.

Now for the exciting part! Composing the five new annotations in this version are:
- `@SerializedNameConvention`: this allows you to define a convention for automatically converting your field names to a specific casing for serialization. The most common use case for this is to convert the `camelCase` of your Java field names to the `snake_case` that is the TOML convention. You can apply this to every field in a class with just one annotation!
- `@Alias`: this annotation, in addition to being cutie baby, allows you to change the names of elements in your config while maintaining backwards compatibility. Note that there is no mechanism in Quilt Config to migrate the type of your field (yet!) so this will only be useful for direct name changes.
- `@ChangeWarning`: allows you to define how destructive changing a specific config value will be: gives the options of `RequiresRestart`, `Unsafe`, `Experimental`, and `Custom` (with `CustomTranslatable` also an option!).
- `@DisplayName` and `@DisplayNameConvention`: allows you to define a nicely formatted name for your value, to be displayed to users. Supports translations!

Those last three annotations have no real functionality in Quilt Config: you're simply defining more information to be attached to your config field as metadata. Quilt Config `1.3` is a huge step forward in terms of establishing the APIs and annotations we need in order to build a mod that will use that information to automatically generate config screens for all mods using Quilt Config. If you're a real Quilt Config aficionado, make sure to check the full changelogs for [`1.3.0`](https://quiltmc.org/en/changelog/quilt-config/1.3.0/) and [`1.3.1`](https://quiltmc.org/en/changelog/quilt-config/1.3.1/) to see all the smaller changes we made!

## Quilt Standard Libraries

QSL has received quite a bit of attention in the past few months, both on released versions and the work-in-progress ports to `1.20.6` and `1.21`. `1.20.4` got two minor features:
- A [new event](https://github.com/QuiltMC/quilt-standard-libraries/commit/7449ab2da1d652fce034751b44f49274e01c6765) for when networking configuration is complete and ready to move into the PLAY phase.
- An option to [reserialize custom packets](https://github.com/QuiltMC/quilt-standard-libraries/commit/f3f3ad054cc475b17e9209ed85423f3dbf504ff0), fixing edge cases with networking compatibility compared to Fabric API. Coincidentally, Mojang have implemented this same functionality in Minecraft `1.20.5+`, which means we'll be able to drop this hackfix in future versions. Which is cute for us. Not that you care.

We've been hard at work with the ports, and I'd like to use this post to explain part of why ports of Quilt Standard Libraries take so *long*. As you probably know already, we simply have less developer time available, making it more difficult to keep up with Mojang. However, that's not the only reason we release API much later than other loaders. Instead of prioritising maintaining the same API surface between Minecraft updates, our philosophy is to break as much as we need in order to make a more elegant API. This allows developers to better understand the way Minecraft's systems work, through molding QSL's APIs to Mojang's changes. However, reworking APIs takes time, and right now it's yet another barrier to quickly releasing updates.

This release schedule makes it very difficult to develop mods using QSL, so we're making a few changes to the process. Instead of creating a monolithic port to be released all at once, for future versions we'll be releasing QSL module-by-module, to ensure that developers have something to work with as soon as possible. Using this system, we'll be able to release core systems such as entrypoints day one. Until QSL is fully ported, unported modules will be disabled and unusable by mods. We've begun doing this with a core-only publication of QSL for 1.20.6.

### Quilted Fabric API

Moving on to QFAPI, we're also making major changes over there. Instead of a system where we maintain a full fork of the FAPI codebase, we're moving over to maintaining *patches* that will apply to the original codebase. Previously, for each update to the FAPI code we had to fight with git merges in order to get the new code into our parallel project. Each time we did so, we were adding commits and confusion to the git tree, making the next merge an even harder project. With patches, we'll have the much easier job of updating any out-of-date patches with each update to upstream FAPI instead of dealing with hundreds of files needing merge attention. Progress has been steady on this new system, and we're just as excited to have an easier time updating as you are to get faster updates.

In terms of actual releases and not just work-in-progress stuff, we've done a few updates! To shorten a *lot* of work (a lot of fighting with git) into just a sentence, we released `1.20.4` and synced it up to FAPI `0.97.0`, as well as updated our `1.20.1` version to FAPI `0.92.2`.

## Quilt Mappings

It's been [three months](https://github.com/QuiltMC/quilt-mappings/commits/1.21/?since=2024-04-01&until=2024-06-25) since we last updated you on the state of Quilt Mappings. Perhaps that lack of blog attention combined with a slight lack of maintainer attention is what's caused this drop in percentage. Either way, don't linger too long on my shame. We've lost nearly 1% in the last 3 months.
![A beautiful comparison of mapping statistics, going from 94.37% to 93.55%](/assets/img/writing/blog/2024-07-02-quilt-update/mapping-comparison.png)
At the very least, we're gaining once again as of 1.21! Contributions are always welcome, and Quilt Mappings is one of the easiest modding projects to hop into and start helping with. Check out our [CONTRIBUTING.md](https://github.com/QuiltMC/quilt-mappings/blob/HEAD/CONTRIBUTING.md) to get started!

### Enigma

Now on to my child. The software behind it all. Enigma. We made [three](https://quiltmc.org/en/changelog/enigma/2.3.0/) [enigma](https://quiltmc.org/en/changelog/enigma/2.3.1/) [releases](https://quiltmc.org/en/changelog/enigma/2.4.0/) in the last few months, with two big updates and a bugfix release!

Starting with [`2.3.0`](https://quiltmc.org/en/changelog/enigma/2.3.0/), we put out an update composed of mostly small features. We added some UI garnish, with a corner progress bar telling you what's going on in the background, more info in the info panel, and info on dockers when they're inactive instead of just an empty panel. For info lovers, this one's a treat! We also made lots of bugfixes, updated dependencies, and added a couple new config options. Then [`2.3.1`](https://quiltmc.org/en/changelog/enigma/2.3.1/) was released because the updated ASM dependency was a pinned snapshot that expired. Oops.

After relaxing with a mostly-UI update, for [`2.4.0`](https://quiltmc.org/en/changelog/enigma/2.4.0/) we went back to the backend and broke the API. The main change here was moving reading and writing mappings into services, which are defined by Enigma plugins. We did this in order to abstract out reading and writing, so that we can add support for different methods without continuing to complicate the internals. We'll be using this in the future to add [Mapping-IO](https://github.com/FabricMc/Mapping-IO) support. With this comes new features like active-by-default services that bypass the need to enable them in the profile, filters for the "open mappings" dialogue in the UI to make it easier to search for mappings, and validation for lambda parameter names. That last one is important -- lambda parameter names previously had no validation, but now it's impossible to introduce clashes between parameter names using the UI! And of course, we fixed tons of bugs, added more little features, and updated some dependencies.

And we've still got one more thing to share with you! Quilt Enigma is being [tested out](https://github.com/ParchmentMC/Parchment/pull/268) by [Parchment](https://parchmentmc.org/), another mappings project for Minecraft. Parchment takes Mojang's official mappings, and adds parameters and Javadoc to make it more usable. Parchment is a great project, and we're glad that we can help them out with our tooling!

## quiltmc.org

In the last few months, the website has received [quite a few updates](https://github.com/QuiltMC/quiltmc.org/commits/main/?since=2024-04-01&until=2024-06-25)! We could go in chronological order (yuck, boring, been doing it all post) to see the additions but I think it's more fun if we take a little tour.

Starting off in the top bar, you may immediately notice a big change: there's a [search bar now](https://github.com/QuiltMC/quiltmc.org/pull/200)! This search bar uses the [lunr.js](https://lunrjs.com/) backend, and allows you to search for any page on the site. As the dropdowns continue to expand with more and more pages, I'm glad those who don't spend 25 hours a day on https://quiltmc.org like me will still be able to find their way around.

Moving along the top bar, you may notice that the [usage](https://quiltmc.org/en/usage/) dropdown has grown in size a bit. Firstly, we've created a dedicated page for [known QFAPI incompatibilities](https://quiltmc.org/en/usage/known-incompatibilities/). This page lists off all mods that work when running [Fabric API](https://modrinth.com/mod/fabric-api), but not [Quilted Fabric API](https://modrinth.com/mod/fabric-api). If you're using QFAPI and run into issues, this is the first place to check! But let's move on. We've been busy, and there's more to look at on the website.

On the sidebar, there are now five items where there used to be two! We've just gone over one, but there are still more new pages to see. Firstly, we've created an official [import utility](https://quiltmc.org/en/usage/latest-versions/) for finding the latest versions of each Quilt project for a given Minecraft version. We previously had an unofficial utility maintained by [LambdAurora](https://github.com/lambdaurora), and all the same features that utility had have made their way to the official website. Finally, the biggest new addition: [the mod generator](https://quiltmc.org/en/usage/generator/)! This page, similar to the one recently launched by [Fabric](https://fabricmc.net/develop/template/), automatically customizes a mod template, so that you can just download and get right into modding. No more fiddling with renaming directories and messing with metadata before you can get up and running!

That's about it for the exciting new things, but thanks to the work of contributors like [Up](https://github.com/UpcraftLP) and [Pyro](https://github.com/Pyrofab), we've done plenty of updates to our existing pages and maintainance to keep the website running smoothly. Finally, while being a lovely engaged reader and clicking the many cute blue hyperlinks I've been feeding you, you may have noticed a small quirk of our website: right now, absolutely nothing has icons. We previously had a paid subscription to an icon kit, [FontAwesome](https://fontawesome.com/), but are now in between icon sets. Let me know if you like the new, weird-blank-space-abundant layout. I think I might push to keep it.

### Quilt Developer Wiki

If you turn your attention over to our [wiki](https://wiki.quiltmc.org/en), you'll also notice a few new things! We've written up a [beginner's guide](https://wiki.quiltmc.org/en/misc/mappings) to understanding and contributing to Quilt Mappings, and as per usual rewritten some sections of the other pages in order to increase clarity. We've also finally added a proper [landing page](https://wiki.quiltmc.org/en), giving our work-in-progress wiki the beginning of that finished project shine! Monthly reminder to thank [c-leri](https://github.com/c-leri) for doing much of the backend work to keep the Quilt wiki running.

### Quilt Infrastructure

Quilt's infrastructure has been, to be nice and pretty much give our servers a pat on the head and a good job, not working very well for a long while now. We've kept everything up (except the forum!) and reliable, but behind the scenes things have been pretty messy. In the last few months, our infrastructure team has been cleaning everything up in the background, as well as making sure that our infra won't become a disaster for a second time.

We moved to the platform [Argo CD](https://argo-cd.readthedocs.io/en/stable/) for *continuous delivery*, which is fancy way to say keeping everything running all the time. We're using Argo CD for a few reasons:
- It allows us to monitor and interact with resources on our servers through a nice user interface, diminishing the technological wizardry we have to go through on a regular basis.
- It allows us to define granular permissions, which we can use to allow teams who don't have access to all of our infrastructure to run maintenance like updates and restarts on the projects they work on.
- In general, it allows our deployments to be more reproducible and explictly defined, helping with the aforementioned keeping infrastructure from falling apart.

Moving on to updates our lovely users actually benefit from, the [Quilt Forum](https://forum.quiltmc.org/) has been brought back from the dead! Now that it's up and running again, we intend to post to the forum more often with changelogs and blog posts like this one! This took a lot of work, and we're still finishing it up: as of writing, the forum is readable, but not everyone can make posts yet. The full forum should be ready soon!

In order to prevent another long period of downtime for the forum, we've set up regular backups of all our databases. We'll be able to quickly restore one of these in case of another hardware failure like the one that took down the forum last time!

We also [cleaned up](https://github.com/QuiltMC/quilt-helm-charts/pull/5) the way we deploy new versions of our Discord bot, [Cozy](https://github.com/QuiltMC/cozy-discord), and gave her a little more memory to work with to make mappings lookup more reliable. Finally, we've moved all of our servers with sensitive data (such as Modmail), over to providers in the European Union. This guarantees we comply with the [GDPR](https://gdpr-info.eu/) privacy laws to protect your data.

And that's everything big that we worked on in the last few months! Come back next month for a hopefully-on-time July update.
