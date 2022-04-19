---
permalink: /usage/troubleshooting
title: Troubleshooting
description: How to troubleshoot Quilt when there's an issue
redirect-from:
- /troubleshooting.html
---

{% admonition %}

## My game is crashing. Why is this happening?

If your game is crashing, the most likely cause is a problem with a mod you have installed. It's always worth trying
to figure out if this is the case, and you can attempt to do so by following these steps:

1. First, take a look at your `latest.log` - you can find this in the `logs/` folder located within your Minecraft
   profile, which will likely be in your `.minecraft/` by default.
2. If you notice errors in your log referring to a specific mod, try removing it and see whether you can reproduce the
   error.
3. You could also try using a binary search to track down a misbehaving mod - move half of your mods to another folder,
   and test the other half. If there's no issue in that half, switch to the other one. Continue to split your mods in
   half and test each half until you've managed to isolate the problematic mod.

If this doesn't help, or you have trouble reading the logs on your own, please feel free to drop into the
`#quilt-support` channel on [The Quilt Community Discord server](https://discord.quiltmc.org), and we'll try to
help you out. **Please remember to provide your `latest.log` and any other relevant issue when requesting support!**

{% endadmonition %}
