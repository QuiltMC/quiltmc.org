---
title: FAQ (Developers)
layout: about-page
permalink: /about/faq/developers/
description: Frequently asked questions, but for developers.
---

{% admonition %}

## Where's the developer documentation?

As Quilt hasn't yet reached a proper release, we haven't yet started working on our developer documentation. However,
when the time comes, we are planning on setting up an expansive wiki, as well as a forum where developers can seek
support (as an alternative to using Discord).

{% endadmonition %}
{% admonition %}

## Why should I choose Quilt for my mods instead of Fabric?

For developers, Quilt provides the following advantages over Fabric:

* A more fully-featured API for developing more compatible mods, faster and with less effort
* A modular approach to the API that extends to your mods, without requiring you to jar-in-jar API modules or ask your
  users to download them separately
* A vastly improved decompiler (compared to 
  [Fabric's fork of Fernflower](https://github.com/FabricMC/intellij-fernflower)) that provides much more readable,
  accurate and understandable output for when you need to dig into Minecraft's code
* An alternative approach to mappings, which is based on Yarn but removes the clean-room, which allows for more 
  accurate names without compromising on quality -- and makes it simpler to ask for support in official spaces when
  you're using a different set of mappings
* A more community-oriented approach that ensures that everyone's voice is heard when raising issues and opinions,
  regardless of how prolific a developer is, or how well-known they are
* **Future goal:** A new Collision Handling ASM backend (CHASM) which acts as the backbone for our mixin and access 
  widener implementations, allowing those and other bytecode manipulation tools to function without any special handling
  required in Quilt's build tools or loader, and helping mods to remain compatible with each other

{% endadmonition %}
{% admonition %}

## What does it mean to say that Quilt Mappings doesn't have a clean-room, and why does it matter?

When talking about _**the clean-room**_, we're referring to a specific approach to contributions taken by
[Fabric's Yarn mappings project](https://github.com/FabricMC/yarn). Yarn takes an approach that attempts to guarantee
the safety of the project by refusing names that have obviously been inspired by names from other mappings projects,
such as MCP and Mojang's official mappings. It also discourages contributors from looking at names from other mappings
projects, and requires discussions in Fabric's official community spaces to be free of non-Yarn names.

Quilt Mappings (shortened to QM below), on the other hand, takes a different approach. As the project uses the 
[Creative Commons Zero License](https://creativecommons.org/share-your-work/public-domain/cc0/) (similarly to Yarn),
QM explicitly doesn't claim ownership of the names and instead any names contributed that may be derivatives of other
mappings projects still have that ownership assigned to them. This, along with including license notices that 
explicitly show that ownership of some names may lie with other mappings projects (and that provide proper credit) -- 
among other things -- allows QM contributors to refer to other mappings projects to figure out what the best name for 
something should be. It also means that we don't have to disallow discussions involving names from other projects in
our official community spaces.

It's worth noting, however, that **a name being present in some other mappings project does not mean we'll accept it.**
All names contributed must stand up on their own, regardless of what Mojang -- or any other organisation -- provides as
a name.

{% endadmonition %}
{% admonition %}

## How hard will it be to port my Fabric mods?

We plan on trying to make this transition as painless as possible -- by matching Fabric's API surface, allowing you to
stick with Yarn mappings if you'd like, and providing support for developers that are porting their mods. It's worth
noting that -- as of this writing -- Fabric mods that contain mixin plugins (for example, for conditional mixins)  are 
supported by Quilt's backwards-compatibility efforts, but this will not be the case once [CHASM](#CHASM) has been 
added to the toolchain. Quilt will provide an alternative approach with proper toolchain support later on -- and we'll 
help you figure out how to move to it if you need support.

{% endadmonition %}
{% admonition %}

## How long will backwards compatibility for loading Fabric mods last?

As long as maintaining Fabric compatibility doesn't negatively impact the project, we'll keep doing it -- but if it 
does get to the point where maintaining it is no longer feasible, we'll help move it to a community-run project and 
provide its developers with the support they need to keep working on it.

In short, backwards compatibility will live on until it's no longer possible to maintain it.

{% endadmonition %}
{% admonition %}

## How do I get started with writing a Quilt mod?

While we're currently still working on developer documentation, we do have a
[template mod](https://github.com/QuiltMC/quilt-template-mod) that you can use as a template, or just to get started.
We'll be working on docs throughout the beta period and beyond, so please keep an eye out for them!

{% endadmonition %}
{% admonition %}

## What the heck is CHASM, exactly? {#CHASM}

CHASM is short for **_Collision Handling ASM_**. CHASM is a bytecode transformation library, acting as a backend that's
intended for use via separate frontends, rather than for mods to use directly. It intends to provide a safer way to
modify bytecode at runtime, handling collisions automatically and trying to help mods to stay compatible.

Frontends for use with CHASM will include Access Wideners and, of course, Mixin. However, there's no reason additional
frontends couldn't be written -- by Quilt, or by the community.

CHASM has not yet been implemented, but we're working on it!

{% endadmonition %}
