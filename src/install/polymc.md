---
layout: install
title: "Install: PolyMC"
permalink: /install/polymc/
---

# PolyMC <a href="https://polymc.org" class="button is-link is-pulled-right"><span class="icon"><i class="fas fa-globe"></i></span><span>Website</span></a>

<div class="message is-danger">
<div class="message-body">
Quilt support is currently not included in PolyMC's stable builds. If you'd like to try this out before a full release 
is made, you can do so by downloading one of their development builds:

<ul class="mb-4">
    <li>
        For Windows, Mac and Linux builds, you can download the artefacts from 
        <a href="https://github.com/PolyMC/PolyMC/actions">one of their GitHub Actions builds</a>
    </li>
    <li>
        On some Linux distributions, you may be able to find a <code>-dev</code> or <code>`-git`</code> package &mdash; 
        for example, on Arch Linux, you can make use of 
        <a href="https://aur.archlinux.org/packages/polymc-git">the `polymc-git` package</a>
    </li>
</ul>

The instructions below assume that Quilt support is present in PolyMC's stable builds. This message will be removed
when that actually happens, but you can still follow the instructions below for their development builds.
</div>
</div>

PolyMC is a power-user launcher, designed to provide all the features an advanced user would need to manage their
instances. To set up a Quilt instance, simply follow these steps:

1. Download and install PolyMC from [their website](https://polymc.org)
2. Open PolyMC, follow the setup steps and click on the **Add Instance** button at the top of the window
3. Fill out the **Name** and **Group** boxes as required
4. Select **Vanilla** from the list on the left, and pick the version of Minecraft you'd like to use for your instance
5. Click **OK** to create a new vanilla instance
6. Right-click on the instance and select **Edit Instance**, or click on it once and select **Edit Instance** from the 
   menu on the right of the window
7. Select **Version** from the list on the left, and click the **Install Quilt** button in the menu on the right side 
   of the window
8. Select the Quilt Loader version you'd like to use and click **OK**
9. Set up the rest of your instance as normal

That's all there is to it! Once you've followed these steps, your instance should be ready to go &mdash; just add your 
mods and get playing.
