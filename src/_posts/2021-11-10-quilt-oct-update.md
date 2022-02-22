---
title:  "Quilt's (VERY LATE) October Update"
date:   2021-11-10 14:00 -00:00
author: ToffeeMax
---

It is now _well_ past the End of October and closer to Halloween then I'd like to admit. Here is some of the more fleshed out updates about the Quilt Project:

<!-- MORE -->

## Quilt Mappings are now usable in Loom!
Have you wanted to use mappings other than Yarn or MojMap? 

Quilt Mappings is a Yarn derivative that allows inspiration from MojMap. This allows for Quilt Mappings to map the obscure constants in Minecraft code and more. 

However, this can mean that Quilt Mappings maybe be different from Yarn. 

[The provided gradle plugin](https://github.com/OroArmor/quilt-mappings-on-loom) allows Quilt Mappings to be used in Loom and Fabric environments. Currently, it is 1.17.1+ only; with no plans of backporting to earlier versions.

Benefits of Quilt Mappings:
1. Faster turn around. 
   - For the past couple weeks, Quilt Mappings has been out before intermediary. While this doesn't help too much in loom, it is something to look forward to in the future.
2. Consistent names. 
   - Quilt Mapping names are never mismatched, meaning you won't find issues where names swap between versions.
3. Familiarity of Yarn with the completeness of MojMap. 
   - While not complete, Quilt Mappings has the goal of 100% mapping coverage for Minecraft. Any help toward this goal would be appreciated as well!

### How to use Quilt Mapping (Gradle Plugin)

How to use Quilt Mappings:

#### settings.gradle

```groovy
pluginManagement {
    repositories {
        maven { url = "https://maven.oroarmor.com" }
    }
}
```

#### build.gradle

```groovy
plugins {
  // ...
  id "quilt-mappings-on-loom" version "2.0.0"
}

// ...

dependencies {
   mappings(loom.layered {
      addLayer(quiltmappings.mappings("org.quiltmc:quilt-mappings:${minecraft_version}+build.${project.quilt_mappings}:v2", true))
   })
}
```

## New Moderators
Quilt's community spaces are always looking for new moderators. If you think you'd be a good fit and like to be involved, you can submit an application via ModMail. 

Some key documents to be aware of **before** applying:
* [The Quilt Code of Conduct](https://quiltmc.org/community/code-of-conduct.html)
* [Quilt's Rules](https://quiltmc.org/community/rules.html)
* [Our Moderation Ethos](https://quiltmc.org/community/moderation.html)
* [RFC-7 (The Community Team Structure)](https://github.com/QuiltMC/rfcs/blob/master/structure/0007-community-team.md)

If the qualities outlined in the above documents, seem like you... please step forward and apply. The interview proccess will follow the steps outlined in RFC-7 (TL;DR):
* Apply Via ModMail
* Interview with a Community Manager (and the wider Community Team)
* Community team holds a vote based on the interview
* Result of the vote given to interviewee, and if successful the applicant will become a Trainee Moderator
