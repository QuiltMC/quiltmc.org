---
layout: /src/layouts/install.astro
title: Install
permalink: /install/server/
jarname: fabric-installer-0.6.1.51.jar
jarurl: https://maven.fabricmc.net/net/fabricmc/fabric-installer/0.6.1.51/fabric-installer-0.6.1.51.jar
draft: true
---

# Instructions for a Minecraft Server

<img class="logo right fshadow" alt="Minecraft Logo" src="/assets/img/launchers/minecraft.png" />

<a href={frontmatter.jarurl} class="button primary">Download Installer (.jar)</a>

## Or download with wget

```bash
wget -O {frontmatter.jarname} {frontmatter.jarurl}
```

## Or download with curl

```bash
curl {frontmatter.jarurl} -o {frontmatter.jarname}
```

## Basic CLI usage

```bash
java -jar {frontmatter.jarname} server -downloadMinecraft
```
