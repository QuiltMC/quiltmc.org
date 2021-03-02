---
layout: install
title: Install
permalink: /install/multimc.html
js: true
---

# Instructions for MuliMC

## Select a Version

<form>
    <label for="mcselect">Select version: </label>
    <select id="mcselect"
            data-version-target="mcSelect"
            data-action="change->version#selected_mc_version">
        <option>Loading...</option>
    </select>
</form>


# Install Quilt for Minecraft <span data-version-target="mcLabel">(loading...)</span> in MultiMC

<img class="logo shadow right" style="border-radius: 12px;"
     alt="MultiMC Logo" src="/assets/img/launchers/multimc.svg" />

For MultiMC, we provide an instance with Quilt pre-installed which you can
import into MultiMC. Follow the steps below to install it.

1. Open MultiMC and click on "Add Instance" in the top left.
2. In the window that appears, click on "Import from zip".
3. Copy and paste the URL below into the "local file or link to a direct
   download" field.

<div data-version-target="snippet">
{% highlight plaintext %}
https://quiltmc.org/multimc/quilt_mc-{minecraft_version}_loader-{loader_version}.zip
{% endhighlight %}
</div>

