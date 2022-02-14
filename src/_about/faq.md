---
title: FAQ
layout: about-page-faq

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

## How does Quilt differ from Fabric?

The Quilt Project is governed by a set of autonomous teams overseeing different parts of the project. These teams are 
given power to make decisions for their component of the project. We hope that this will allow Quilt to incorporate 
more PRs and other community suggestions and do so more fairly.

{% endadmonition %}
{% admonition %}

## Which parts of Fabric is Quilt forking?

All of them. Quilt is a hard fork of Fabric, and we aim to fork and maintain all projects necessary to exist 
independently of it.

{% endadmonition %}
{% admonition %}

## How can I support Quilt?

However you like! [Join our community](/community/), use Quilt in your modpacks, [develop mods for Quilt](/dev/), or 
[contribute to the project itself](/dev/).

{% endadmonition %}

# Usage Questions {#usage-questions}

{% admonition %}

## Can Quilt load Forge mods?

No, Quilt can't load Forge mods and support for this is not planned. There are third-party projects (such as Patchwork)
that plan to add this functionality, but they're not maintained by Quilt - and they're not part of The Quilt Project.

{% endadmonition %}
{% admonition %}

## Can Quilt load Fabric mods?

In most cases, yes. As Quilt is a fork, most Fabric mods should be compatible with Quilt initially - but this may not be
the case forever. Once Quilt is properly-established, we do plan on dropping first-party support for Fabric mods. That
said, there's no reason the community can't continue to maintain that support, and we'll provide the required resources
if someone else decides to continue that part of the project after we stop maintaining it.

It's also worth noting that - as of this writing - Fabric mods that contain conditional mixins are not supported. This
isn't a major issue as the vast majority of mods don't use conditional mixins, but we're happy to work with mod 
developers that need an alternative approach for Quilt.

{% endadmonition %}
{% admonition %}

## Can Fabric load Quilt mods?

Probably not. Quilt mods will eventually have their own metadata format which will likely not be compatible with Fabric.

{% endadmonition %}
{% admonition %}

## Where can I find Quilt mods?

Wherever the mod developer distributes them. This is mostly on CurseForge or Modrinth.

{% endadmonition %}
{% admonition %}

## Where can I get support for Quilt?

We provide user and developer support mostly on [Discord]({{ site.discord_community }}).

{% endadmonition %}
{% admonition %}

## How do I install Quilt?

See the [Install page](/install/).

{% endadmonition %}

# Management Questions {#management-questions}

{% admonition %}

## How will the administration and moderation teams be managed?

You can find more about this on our [community page](/community/).

{% endadmonition %}
{% admonition %}

## Who owns Quilt?

The community! Quilt doesn't really have the concept of an owner per-se. It is controlled by a set of teams which are 
staffed by members of the community who have taken an interest in contributing to the project. These teams vote on 
various measures in order to decide what will happen with the part of the project they oversee.

{% endadmonition %}
