---
title: "Quilt Development Update: March 2024"
date: 2024-04-08 15:00:00 -00:00
authors:
  - ix0rai
---

In my journeys through the many QuiltMC codebases, I've learned many things. One of those teachings is that I should keep this intro short and sweet. This month saw tons of work on QSL, a big release of Quilt Loader, and a ton of new mappings. Simply delightful. Grab your machete, and I'll show you the path to enlightenment via learning about updates to our block game modding toolchain.

<!-- MORE -->

# Quilt Standard Libraries
Despite not officially being on the program today, OroArmor has been hard at work updating [Quilt Standard Libraries](https://github.com/QuiltMC/quilt-standard-libraries) and [Quilted Fabric API](https://github.com/QuiltMC/quilted-fabric-api). This time, they've been updated to 1.20.4, squashing countless bugs, including one from 2021! In addition, he squeezed in a rework of the Recipe Remainder API.

In the old Remainder API, there was [a long-standing bug](https://github.com/QuiltMC/quilt-standard-libraries/issues/251) which allowed duplicating items in a few mods. This would happen when smelting a water bucket to create an item like Modern Industrialization's Steam Bucket: while the mod relied on the vanilla behaviour of the furnace input being destroyed, the QSL API erroneously saw a bucket being destroyed and assumed it should be kept as a remainder. Since the recipe creates a new bucket as output, this would result in smelting a water bucket giving you a bucketful of steam as well as an empty bucket left behind. The new version of the API solves this by requiring mods to explicitly state that they'd like to leave a remainder when it wouldn't follow the vanilla behaviour.

# Quilt Loader
At the very beginning of March, the Loader team satisfied the Minecraft community's eternal hunger for updates by delivering a major upgrade. There are headlines here for both users *and* developers! First off, here are the new treats that users are getting.
- The dependency error interface has been updated to be much more human readable for lists of versions. No longer do you need to take pre-calc and understand that `version range [0.5.7, 0.5.7] U [0.5.8, 0.5.8]` means you need either version `0.5.7` or `0.5.8`. We'll instead simply display a list of versions: `version 0.5.7 or 0.5.8`.
- We've added a new startup screen which shows mods that Quilt Loader cannot load. Currently, it'll recognise Neoforge, Forge, or Risugami's Modloader mods, and inform you what's going on.

Now let's get to the fun bit: the API stuff! Loader plugins have taken a huge step towards stability with the merge of the path retention system, which means that loader retains information on files and folders after finding them, allowing plugins loaded later to still scan those files and folders for mods. In terms of the non-plugin API, many GUI classes have been moved to the public-facing API, allowing the few mods that need them to work with Quilt Loader GUIs.

Additionally, you may have noticed that a new project has cropped up under the Quilt GitHub organisation: [Quilt Loader Bootstrap](https://github.com/QuiltMC/quilt-loader-bootstrap)! This new project will, in the future, allow Quilt Loader to update itself, saving you a trip to https://quiltmc.org to go grab an installer file to run every time you need to update Quilt Loader. It solves the issue of adding Quilt Loader and its libraries to be added to the Java classpath after launch, the main blocker to allowing painless updates. Its [README](https://github.com/QuiltMC/quilt-loader-bootstrap?tab=readme-ov-file#quilt-loader-bootstrap) file has more information!

The loader team is already hard at work on the next updates!

# Quilt Mappings
Like a glorious phoenix, Quilt Mappings' completion of Minecraft has risen 1% this month. Well, 0.95% to be exact. But let me have this, ok? Let's start with the beautiful imagery.
![A beautiful comparison of mapping statistics, going from 93.3% to 94.3%](/assets/img/writing/blog/2024-04-08-quilt-update/mapping-comparison.png)

Now I know, looking at that image, your first thought is "how, pray tell, has Quilt's *creme de la creme* in terms of developers managed to achieve this feat?" An understandable question, dear reader. Over `24w10a`, `24w11a`, `24w12a`, and `24w13a`, nine pull requests have been merged adding new mappings, as well as two refactor pull requests! These pull requests were all made by [myself](https://github.com/ix0rai), [supersaiyansubtlety](https://github.com/supersaiyansubtlety) and [pyrox0](https://github.com/pyrox0) in a truly incredible run that we'd rather not repeat this month. If you'd like to help us increase our coverage, our [CONTRIBUTING.md](https://github.com/QuiltMC/quilt-mappings/blob/HEAD/CONTRIBUTING.md) is a great place to start!

The most notable achievements this month are completing mappings of Mojang's new item component system added in [24w09a](https://quiltmc.org/en/mc-patchnotes/#24w09a), completing mappings for entities. We've also added tons of new mappings in areas such as networking, screens, datafixers, potions, and more!

Enigma got quite a bit of minor work as well this month, working towards the release of the `2.3.0` update. The highlights are:
- an improved for look for the `ctrl + f` quick find dialogue
- cleaned up information in the identifier panel
- fixing desyncs between the entry navigator and the actual mappings
- the merge of `2.3`'s major feature, the new [progress bar](https://github.com/QuiltMC/enigma/pull/183) which indicates what enigma is doing in the background as you map

Stay tuned for the release, coming soon! You know it's actually coming soon because it's me saying it, and not Oro.

# Miscellaneous

Lots of work has been happening on smaller Quilt projects this month, with the [website](https://quiltmc.org), the [developer wiki](https://wiki.quiltmc.org/en), [Quilt Config](https://github.com/QuiltMC/quilt-config) and [Quilt Loom](https://github.com/QuiltMC/quilt-loom) getting attention.

First, there's a new page on our website! [The changelog page](https://quiltmc.org/en/changelog/) is here to save you from needing to sift through Discord and GitHub to find changelogs for Quilt projects. Currently, it supports Enigma and Quilt Config, and will be updated to include more projects and more versions in the future! It automatically updates as new changelogs are written for each project. Eventually, we hope to include every major Quilt project on this page! In addition, we've reorganised the install page and updated it in order to reflect the release of GDLauncher Carbon, the latest launcher to add support for Quilt.

The developer wiki has received a big update thanks to [celeri](https://github.com/c-leri), who translated every single page to French! We also reworked the "Creating your first item" page in order to be more clear and useful.

Finally, Quilt Config got tons of work towards its `1.3` release and Quilt Loom was updated to pull in Fabric's changes in Loom `1.6`! Thanks for reading, and I'll be back with more updates next month. You can't stop me. Many have tried.
