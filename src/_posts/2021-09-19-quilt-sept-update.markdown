---
title:  "Quilt September Update"
date:   2021-09-19 15:00:00 -00:00
author: ToffeeMax
---

It has been a few months since the last update on the Quilt Project.

Quilt has progressed far since that initial "This is Quilt" blog with: new teams set up; several important RFCs being published and developments in many key areas.

## Clean Room RFC-33

[RFC-33 has been merged](https://github.com/QuiltMC/rfcs/blob/master/rfc/0033-quilt-mappings-and-clean-room.md). This RFC changes how Quilt is dealing with other mappings (such as MojMap, MCP and Yarn).

Key Take-Aways:
* Quilt's fork of Yarn will be renamed to "Quilt Mappings" (QM)
* All restrictions on referencing mappings projects (other than Quilt Mappings) within Quilt's community and development spaces will be lifted

The reasoning, possible outcomes, drawbacks and smaller changes are outlined further in the RFC document.

### Quilt Mappings
As noted above, Quilt Mappings (QM) exist and are open to contributions.

## Quilt Standard Library (QSL)

The Quilt Standard Library (Quilt's separation of the current Fabric API into distinct modules -- see [RFC-9](https://github.com/QuiltMC/rfcs/blob/master/rfc/0009-qsl-structure.md)), now has the resource loader and base (for events).

We are looking for help testing the resource loader. This can be done by using the snapshot maven repo with `org.quiltmc.qsl.core:resource-loader:1.0.0-SNAPSHOT`.

QSL is seeing new additions on top of the reorganization into modules. 

## Quilt Mod JSON
The Quilt Mod JSON has now been mostly implemented. The design of this is outlined in [RFC-2](https://github.com/QuiltMC/rfcs/blob/master/specification/0002-quilt.mod.json.md).

The majority of the work left is smooth out issues in the loader.

## QuiltFlower 
QuiltFlower (Quilt's Fork/Maintained version of FernFlower/ForgeFlower) has seen some smaller changes. 

These changes should make de-complied code more readable. An example of this can be seen in the following images:

**Output produced by FabricFlower**
![Output Produced by Fabric Flower](https://i.imgur.com/M81I32X.png)

**Same output, produced using QuiltFlower**
![Same output produced by Quilt Flower](https://i.imgur.com/1ICd4Nb.png)



## New Moderators
Quilt's community spaces are always looking for new moderators. If you think you'd be a good fit and like to be involved, you can submit an application via ModMail. 

Some key documents to be aware of **before** applying:
* [The Quilt Code of Conduct](https://quiltmc.org/community/code-of-conduct.html)
* [Quilt's Rules](https://quiltmc.org/community/rules.html)
* [Our Moderation Ethos](https://quiltmc.org/community/moderation.html)
* [RFC-7 (The Community Team Structure)](https://github.com/QuiltMC/rfcs/blob/master/structure/0007-community-team.md)

If the qualities outlined in the above documents, seem like you... please step forward and apply. The interview process will follow the steps outlined in RFC-7 (TL;DR):
* Apply Via ModMail
* Interview with a Community Manager (and the wider Community Team)
* Community team holds a vote based on the interview
* Result of the vote given to interviewee, and if successful the applicant will become a Trainee Moderator


## Modding with Quilt & Fabric

### Can I mod with Quilt at the moment?

It is currently not possible to mod with the Quilt framework. 

However, progress has been made. We are currently waiting on a Gradle Plugin.

**We are looking for contributors.** If you would like to help out with this part of the project, please reach out in [#build-tools-general](https://canary.discord.com/channels/833872081585700874/884090296068091965/885866814410723358) and express interest. A member of the relevant team will reach out.

### Are things still compatible with Fabric?

Things are largely compatible with loading mods.

Mixin Plugins may not be possible to maintain compatibility.  We may consider contributing to some mods that use them, to aid in replacing them.

## Round-off
That is all for now! When there are more things to talk about, they will be published here; for more bleeding edge changes and updates on the project, follow along on our [Discords](https://discord.quiltmc.org).

Thank-you to the Quilt Project's team for helping flesh this out; it would have otherwise been just an update on moderators.

