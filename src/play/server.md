---
layout: install
title: Play with Quilt
permalink: /play/server.html
jarname: fabric-installer-0.6.1.51.jar
jarurl: https://maven.fabricmc.net/net/fabricmc/fabric-installer/0.6.1.51/fabric-installer-0.6.1.51.jar
---

# Install Quilt for Minecraft Server

<img class="logo right fshadow" alt="Minecraft Logo" src="/assets/img/launchers/minecraft.png" />

<a href="{{ page.jarurl }}" class="button primary">Download Installer (.jar)</a>

## Or download with wget
{% highlight bash %}
wget -O {{ page.jarname }} {{ page.jarurl }}
{% endhighlight %}

## Or download with curl
{% highlight bash %}
curl {{ page.jarurl }} -o {{ page.jarname }}
{% endhighlight %}


## Basic CLI usage

{% highlight bash %}
java -jar {{ page.jarname }} server -downloadMinecraft
{% endhighlight %}

**Most mods will also require you to install Quilt API into the mods folder.**

