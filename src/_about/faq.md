---
title: FAQ
layout: about-page-faq
description: Frequently asked questions, for the burning topics that need addressing regularly.

redirect_from:
- /faq/
- /faq.html
---

# General Questions {#general-questions}

{% admonition %}

## What is Quilt?

Quilt is a modding toolchain developed primarily for Minecraft that has been forked from The Fabric Project, primarily 
due to concerns around governance, project management and moderation. You can read more about the Quilt project and 
where it came from on [the About Us page](/about).

{% endadmonition %}
{% admonition %}

## Which parts of Fabric is Quilt forking?

All of them. Quilt is a hard fork of Fabric, and we aim to fork and maintain all projects necessary to exist
independently of it.

{% endadmonition %}
{% admonition %}

## Why should I use Quilt?

For users, Quilt provides the following advantages:

* Mods that should be more compatible with each other, despite their use of powerful modding tools
* Automatic downloading of Quilt's libraries (which can be disabled), so you always have exactly -- and only -- what you 
  need for your mods to work
* Better errors when your mod list has problems with missing or incompatible mods, with more friendly instructions
* Initial compatibility with both Fabric and Quilt mods, meaning you don't need to stop using your favourites
* An inclusive, transparent and friendly official community that cares about social issues, has an experienced staff 
  team, and works with its users to improve over time

{% endadmonition %}
{% admonition %}

## How can I support Quilt?

If you'd like to help us out, here's just a few ways we've come up with:

* Join [our community spaces](/community), hang out and give your input
* Contribute to [our projects on GitHub](https://github.com/quiltmc), either directly or by providing reviews and
  opinions
* Support other projects that make use of Quilt, or Quilt's tools and libraries
* Spread the good word on social media (in a responsible manner)

[//]: # (* Help with ongoing costs by [supporting us financially on OpenCollective]&#40;https://opencollective.com/quiltmc&#41;)

Ultimately, even simply making use of Quilt or hanging out in our community spaces helps us. All activity, input and
contributions are appreciated!

{% endadmonition %}

# Usage Questions {#usage-questions}

{% admonition %}

## Can Quilt load Forge mods?

No, Quilt can't load Forge mods and support for this is not planned. There are third-party projects (such as Patchwork)
that plan to add this functionality, but they're not maintained by Quilt -- and they're not part of The Quilt Project.

{% endadmonition %}
{% admonition %}

## Can Quilt load Fabric mods?

In most cases, yes. As Quilt is a fork, most Fabric mods should be compatible with Quilt initially -- but this may not be
the case forever. Once Quilt is properly-established, we do plan on dropping first-party support for Fabric mods. That
said, there's no reason the community can't continue to maintain that support, and we'll provide the required resources
if someone else decides to continue that part of the project after we stop maintaining it.

It's also worth noting that -- as of this writing -- Fabric mods that contain conditional mixins are not supported. This
isn't a major issue as the vast majority of mods don't use conditional mixins, but we're happy to work with mod 
developers that need an alternative approach for Quilt.

{% endadmonition %}
{% admonition %}

## Can Fabric load Quilt mods?

No. Quilt mods are distinct from Fabric mods, and not defined in the same way.

{% endadmonition %}
{% admonition %}

## When will Quilt be released?

As of this writing, we're not providing any final ETAs. Projects like this have a lot of moving parts and are generally
difficult to develop, so it can take quite a long time for things to be considered stable.

That said, we're tentatively aiming to start releasing basic beta builds around April 20th, 2022. 
[<i class="fas fa-cannabis has-text-dark is-pulled-right"></i>](https://www.youtube.com/watch?v=DJfg39WkMvE)

{% endadmonition %}

# Management Questions {#management-questions}

{% admonition %}

## How is Quilt structured?

Quilt's staff is split into three distinct groups:

* The Admin Board, which exists to oversee the project’s direction, manage permissions on GitHub, and break voting ties
* The Community Team, which handles community management and moderation tasks, as well as social media accounts and public relations
* The development teams, which independently oversee specific project that are assigned to them

Between these three groups, the structure is more or less flat -- no one group of people has the final say over the
whole project. Additionally, the Community Team doesn't have direct ownership over any of the official community 
spaces, acting under the oversight of an otherwise uninvolved, elected keyholder.

You can find more about this in the governance section on [the About Us page](/about/#governance).

{% endadmonition %}
{% admonition %}

## What's an RFC? How do they work?

**RFC** is short for **R**equest **F**or **C**omment. The RFC process refers to a system whereby important process and
policy changes, technical standards and definitions are created, discussed and approved by the community before being
put into place. This is done by creating long-form documents that explain exactly what's being proposed, and what the
rationale is for the proposal.

RFCs are proposed via a pull request to [the RFCs repository on GitHub](https://github.com/QuiltMC/rfcs), with the RFC
number matching the pull request number (unless it's an amendment). Anyone is welcome to submit a proposal, but we
recommend that anyone who's considering doing so talks with us about it on Discord, or raises an issue on GitHub.

Quilt's RFC process is documented in 
[RFC 0001: The RFC Process](https://github.com/QuiltMC/rfcs/blob/master/structure/0001-rfc-process.md).

{% endadmonition %}
