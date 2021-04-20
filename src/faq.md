---
title: FAQ
permalink: /faq/
private: true
---

# Frequently Asked Questions

## What is Quilt?

Quilt is a modding toolchain developed primarily for Minecraft that has been
forked from The Fabric Project, primarily due to governing concerns.

## How does Quilt differ from Fabric?

The Quilt Project is governed by a set of autonomous teams overseeing different
parts of the project. These teams are given power to make decisions for their
component of the project. We hope that this will allow Quilt to incorporate
more PRs and other community suggestions and do so more fairly.


## Which parts of Fabric is Quilt forking?

All of them. Quilt is a hard fork of Fabric, and we aim to fork and maintain
all projects necessary to exist independently of it.


## Can Quilt load Fabric mods?

In most cases, yes. As Quilt is a fork, all Fabric mods should be compatible
with Quilt initially. See also ["how long will this backwards compatibility
last?"](#how-long-compatible)

## Can Fabric load Quilt mods?

Probably not. Quilt mods will eventually have their own metadata format which
will likely not be compatible with Fabric.


## What kind/amount of work can I expect to need to do to port my Fabric mod completely to Quilt?

Currently none! If your mod works with Fabric already, and does not access internals, it works with Quilt.

Note that in the future, Quilt does plan to add some new APIs and other
changes, and these may require some work in order to take advantage of them,
but your mod should still work without them.


## How long will this backwards compatibility last? {#how-long-compatible}

Probably for quite a while. It is unclear how long it will be until Quilt
diverges enough from Fabric to be fundamentally incompatible, but compatibility
will be maintained for as long as it realistically can be. Rest assured, we
will give notice if the time comes for compatibility to be broken.


## Where can I find Quilt mods?

Wherever the mod developer distributes them. This is mostly on CurseForge or
Modrinth.


## Where can I get support for Quilt?

We provide user and developer support mostly on [Discord]({{ site.discord_invite }}).

## How do I start making Quilt mods?

You can find information about this [on our development page here](/dev/).


## How will the administration and moderation teams be managed?

You can find more about this on our [community page](/community/).


## How can I support Quilt?

However you like! [Join our community](/community/), use Quilt in your
modpacks, [develop mods for Quilt](/dev/), or [contribute to the project itself](/dev/).


## How do I install quilt?

See the [Install page](/install/).


## Who owns Quilt?

The community! Quilt doesn't really have the concept of an owner per-se. It is
controlled by a set of teams which are staffed by members of the community who
have taken an interest in contributing to the project. These teams vote on
various measures in order to decide what will happen with the part of the
project they oversee.

