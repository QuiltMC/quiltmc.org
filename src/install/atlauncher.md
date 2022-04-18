---
layout: install
title: "Install: ATLauncher"
permalink: /install/atlauncher/
---

# ATLauncher <a href="https://atlauncher.com" class="button is-link is-pulled-right"><span class="icon"><i class="fas fa-globe"></i></span><span>Website</span></a>

{% admonition /info %}
Quilt support is included with ATLauncher's stable builds, but is not currently enabled for everyone. To do so, you'll
need to enable it yourself. To avoid adding to the ATLauncher project's support burden, we're not going to detail
exactly how to enable it early -- but if you know what you're doing, the following JSON may be of use to you.

```json
{
    "loaders": {
        "quilt": {
            "enabled": true
        }
    }
}
```

We expect Quilt support to be enabled around the beginning of Quilt's beta releases. This message will be removed at
that point.
{% endadmonition %}

ATLauncher is a simple, easy-to-use launcher, built around the concept of building game instances from "packs". To set 
up your own Quilt instance, simply follow these steps:

1. Download and install ATLauncher from [their website](https://atlauncher.com)
2. Open ATLauncher and click on the **Vanilla Packs** tab on the right side
3. Fill out the **Instance Name** and **Instance Description** boxes as required
4. Pick the version of Minecraft you'd like to use for your instance
5. Pick **Quilt** from the list of loaders below the Minecraft versions section
6. Select the Quilt Loader version you'd like to use
7. Click **Create Instance** to create your instance

That's all there is to it! You can find your new instance in the **Instances** tab on the right side of the window.
