---
title: page-title-teams
description: page-description-teams
layout: /src/layouts/Page.astro
---

Quilt's governance is split up into many independent teams, some of which have their own subteams and/or leadership
structure. Teams are largely responsible for their own management, taking an internally democratic approach towards
restructuring and elections.

Additionally, each team also has its own responsibilities. Below, you'll find a full list of each team and a list of
team members, including a description of the team and any relevant subteams and team roles.

# Admin Board

The Admin Board is responsible for breaking voting ties, managing permissions on GitHub, managing operational platforms 
that concern multiple teams and steering the project's general direction. The Admin Board must always have an odd 
number of members, to help ensure that ties can be broken cleanly.

<div class="admin team-grid">
    {% include team/HavenKing.liquid %}
    {% include team/MrMangoHands.liquid %}
    {% include team/OroArmor.liquid %}
</div>

# Community Team

The Community Team is a wide-ranging team that is in charge of managing all Quilt community spaces, as well as its
social media accounts and public relations tasks. Because this work varies a lot, the Community Team is split up into
several sub-teams, which have specific responsibilities.

## Keyholders

A Keyholder is only technically a member of the Community Team. Keyholders exist to act as the de-facto owner of a space
that doesn't support the concept of managed group ownership, like Discord. They oversee the rest of the Community Team, 
promoting and demoting Community Managers as required by the internal voting process. Aside from this, they have no 
direct involvement with The Quilt Project.

Keyholders are well-known, reputable members of the wider Minecraft modding community. This, along with their lack of
involvement or investment in the Quilt project, is important to try to avoid situations where a hostile takeover of a
space may be possible.

<div class="keyholder team-grid">
    {% include team/kashike.liquid %}
</div>

## Community Managers

Community Managers are administrative Community Team members that deal with the day-to-day tasks of maintaining Quilt's
community spaces, as well as supporting and managing the rest of the community team. They're responsible for properly
running elections, interviewing and training new Community Team members, managing the structure of Quilt's community
spaces, writing and receiving feedback on Quilt's community policies -- while also acting as a moderator and inheriting
the responsibilities from that position.

<div class="moderator team-grid">
    {% include team/AppleTheGolden.liquid %}
    {% include team/gdude2002.liquid %}
    {% include team/MrMangoHands.liquid %}
    {% include team/Starchild.liquid %}
</div>

## Moderators

Quilt's Moderator team is responsible for daily moderation tasks in Quilt community spaces. This includes conflict
resolution, defensive and reactive moderation tasks and general rule and policy enforcement. Moderators are the
backbone of any Community Team, and Quilt's is no exception -- a diverse, active Moderator team has always been
instrumental for Quilt's success.

<div class="moderator team-grid">
    {% include team/Ember.liquid %}
    {% include team/Forkk.liquid %}
    {% include team/Larry.liquid %}
    {% include team/Dichotomy.liquid %}
    {% include team/NoComment.liquid %}
    {% include team/Orchid.liquid %}
    {% include team/SilverAndro.liquid %}
    {% include team/Southpaw.liquid %}
    {% include team/Redblueflame.liquid %}
</div>

## Events Team

The Events Team is responsible for organising and managing events within our community spaces, which can include
anything from AMAs to fully-blown online modding conventions. While they aren't Moderators, they are always backed up
by the rest of the Community Team, and also have the ability to directly moderate events.

<div class="community team-grid">
    {% include team/Fusion.liquid %}
    {% include team/Lemma.liquid %}
    {% include team/Octal.liquid %}
</div>

## Outreach Team

The outreach team is responsible for communications outside of and within Quilt. They write blog posts, manage social media and website content, and run developer meetings, among other things.

<div class="community team-grid">
    {% include team/gdude2002.liquid %}
    {% include team/Orchid.liquid %}
    {% include team/Southpaw.liquid %}
    {% include team/Starchild.liquid %}
</div>


# Development Teams

Development teams are responsible for specific parts of The Quilt Project, which itself comprises a number of projects.
Developent teams operate largely independently, allowing for self-governance as long as the relevant RFCs are followed.

## Build Tools

The build tools team is responsible for several projects that are instrumental for creating Quilt mods, including
compilation tooling and build system plugins. This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="dev-launch-injector" %}
    {% include project_button.liquid name="gradle-convention-plugins" %}
    {% include project_button.liquid name="quilt-template-mod" %}
    {% include project_button.liquid name="quilt-loom" %}
    {% include project_button.liquid name="sponge-mixin-compile-extensions" %}
</div>

<div class="developer team-grid">
    {% include team/CheaterCodes.liquid %}
    {% include team/glitch.liquid %}
    {% include team/TibiNonEst.liquid %}
</div>

## Chasm

The Chasm team is responsible for maintaining Chasm, the Collision Handling ASM toolset. Chasm aims to provide a safer
backend for modifying JVM bytecode at runtime, allowing for more compatible mixins and extra bytecode modification 
frontends. 

**Note:** You may see projects with "ASMR" in the name on the QuiltMC GitHub organisation. This was the old, internal
codename for Chasm, so those projects are associated with the CHASM team.

This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="asmr-processor-prototype" %}
    {% include project_button.liquid name="chasm" %}
</div>

<div class="developer team-grid">
    {% include team/CheaterCodes.liquid %}
    {% include team/Earthcomputer.liquid %}
    {% include team/Kroppeb.liquid %}
    {% include team/Pyrofab.liquid %}
    {% include team/RTTV.liquid %}
</div>

## Community Tooling

The Community Tooling team is responsible for projects that power Quilt's community spaces, such as custom Discord bots.
This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="cozy-discord" %}
</div>

<div class="developer team-grid">
    {% include team/AppleTheGolden.liquid %}
    {% include team/gdude2002.liquid %}
    {% include team/glitch.liquid %}
    {% include team/Redblueflame.liquid %}
    {% include team/sschr15.liquid %}
    {% include team/Starchild.liquid %}
</div>

## Decompilers

The Decompilers team is responsible for projects relating to JVM bytecode decompilation. These projects are important
because they allow modders to view a version of Minecraft's source code, which is instrumental for figuring out what
they need to do to extend the game. This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="cfr" %}
    {% include project_button.liquid name="procyon" %}
    {% include project_button.liquid name="quiltflower" %}
</div>

<div class="developer team-grid">
    {% include team/Geolykt.liquid %}
    {% include team/SuperCoder79.liquid %}
    {% include team/Kroppeb.liquid %}
    {% include team/MartrixX.liquid %}
    {% include team/skyrising.liquid %}
</div>

## Infrastructure

The Infrastructure team is responsible for Quilt's service infrastructure, including managing cloud platforms, server
tooling, file repositories and API services for modders. This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="quilt-meta" %}
</div>

<div class="developer team-grid">
    {% include team/HavenKing.liquid %}
    {% include team/Starchild.liquid %}
</div>

## Kotlin

The Kotlin Team is responsible for maintaining the Quilt Kotlin Libraries (QKL), a set of libraries based off QSL and designed for use with the Kotlin programming language. These libraries provide an official way to use Kotlin on Quilt, as well as wrappers for QSL and the Minecraft codebase for easier use in Kotlin.

<div class="developer team-grid">
    {% include team/NoComment.liquid %}
    {% include team/Octal.liquid %}
    {% include team/Potatoboy.liquid %}
    {% include team/SilverAndro.liquid %}
</div>

## Loader

The Loader team is responsible for projects relating to Quilt Loader, the project that actually handles loading mods
into the game. This also includes projects like the installer and libraries used for parsing and generating mod 
metadata. This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="access-widener" %}
    {% include project_button.liquid name="Mixin" %}
    {% include project_button.liquid name="quilt-installer" %}
    {% include project_button.liquid name="quilt-json5" %}
    {% include project_button.liquid name="quilt-loader" %}
    {% include project_button.liquid name="quilt-loader-sat4j" %}
</div>

<div class="developer team-grid">
    {% include team/AlexIIL.liquid %}
    {% include team/Earthcomputer.liquid %}
    {% include team/glitch.liquid %}
    {% include team/HavenKing.liquid %}
</div>

## Mappings

The Mappings team is responsible for projects relating to remapping obfuscated names to human-readable names. This
includes tools for matching names, mappings storage formats, javadoc generation tools, and much more besides. This team 
is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="enigma" %}
    {% include project_button.liquid name="javadoc-draftsman" %}
    {% include project_button.liquid name="lorenz-tiny" %}
    {% include project_button.liquid name="mapping-poet" %}
    {% include project_button.liquid name="mappings-hasher" %}
    {% include project_button.liquid name="quilt-mappings" %}
    {% include project_button.liquid name="stitch" %}
    {% include project_button.liquid name="tiny-mappings-parser" %}
    {% include project_button.liquid name="tiny-remapper" %}
    {% include project_button.liquid name="unpick" %}
</div>

<div class="developer team-grid">
    {% include team/2xsaiko.liquid %}
    {% include team/CheaterCodes.liquid %}
    {% include team/LambdaFoxes.liquid %}
    {% include team/MartrixX.liquid %}
    {% include team/NoComment.liquid %}
    {% include team/OroArmor.liquid %}
</div>

# Quilt Standard Libraries (QSL)

The QSL team is responsible for maintaining a library of modules that provide extra APIs for modders to use when
creating their mods. These APIs are designed to make certain tasks easier, and to help mods remain compatible with each
other.

The QSL team is divided into subteams, and each team is responsible for specific QSL modules. These modules represent
specific, distinct sets of library functionality -- while they may depend on each other, they're maintained individually.

This team is responsible for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="quilt-standard-libraries" %}
    {% include project_button.liquid name="quilted-fabric-api" %}
</div>

## Core (Team Leaders)

The Core QSL team represents the QSL team's leadership. The QSL Core team is responsible for the overall direction of
the QSL project, as well as setting project standards and handling governance tasks, including assigning and removing
team members from the QSL sub-teams.

<div class="developer team-grid">
    {% include team/EnnuiL.liquid %}
    {% include team/LambdaFoxes.liquid %}
    {% include team/OroArmor.liquid %}
</div>

## Sub-Team: Block

This sub-team doesn't have any members, so its modules are maintained by the Core team.

## Sub-Team: Data

<div class="developer team-grid">
    {% include team/ADudeCalledLeo.liquid %}
    {% include team/LambdaFoxes.liquid %}
</div>

## Sub-Team: Entity

<div class="developer team-grid">
    {% include team/Bubblie.liquid %}
    {% include team/WillBL.liquid %}
</div>

## Sub-Team: GUI

<div class="developer team-grid">
    {% include team/AlphaMode.liquid %}
    {% include team/EnnuiL.liquid %}
    {% include team/maximum.liquid %}
</div>

## Sub-Team: Item

<div class="developer team-grid">
    {% include team/OroArmor.liquid %}
</div>

## Sub-Team: Management

<div class="developer team-grid">
    {% include team/WillBL.liquid %}
</div>

## Sub-Team: Rendering

<div class="developer team-grid">
    {% include team/Pepper.liquid %}
</div>

## Sub-Team: Transfer

<div class="developer team-grid">
    {% include team/AlphaMode.liquid %}
</div>

## Sub-Team: Worldgen

<div class="developer team-grid">
    {% include team/Noah.liquid %}
    {% include team/OliviaTheVampire.liquid %}
    {% include team/snoozestudios.liquid %}
    {% include team/zOnlyKroks.liquid %}
</div>

## Sub-Team: Quilted Fabric API

<div class="developer team-grid">
    {% include team/EnnuiL.liquid %}
</div>

# Triage Teams

Triage teams aren't directly involved with development, but they're still very important. They're mostly responsible for
reviewing pull requests to active Quilt repositories, ensuring that they're up to spec and ready be merged. This
allows for the development teams overseeing these repositories to focus on development, rather than reviewing PRs.

## Mappings {#triage-mappings}

This team is responsible for handling triage tasks for the following projects:

<div class="button-grid">
    {% include project_button.liquid name="enigma" %}
    {% include project_button.liquid name="quilt-mappings" %}
</div>

<div class="developer team-grid">
    {% include team/Bubblie.liquid %}
    {% include team/Jamalam.liquid %}
    {% include team/Noah.liquid %}
    {% include team/Orchid.liquid %}
    {% include team/supersaiyansubtlety.liquid %}
    {% include team/Sylv.liquid %}
</div>
