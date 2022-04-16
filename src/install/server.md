---
layout: install
title: "Install: Server"
permalink: /install/server/
has_downloads: true
---

# Server

Before getting started, you'll need to make sure you download a copy of the Quilt installer. You'll also need to make
sure you've [installed Java](https://java.com/en/download/).

<div class="field is-horizontal">
    <div class="field-label is-normal mt-1">
        <span class="title is-6" id="launcher-version">Download</span>
    </div>
    <div class="field-body">
        <div class="field">
            <div class="control">
               <a id="universal-download" href="https://maven.quiltmc.org/repository/release/org/quiltmc/quilt-installer/latest/quilt-installer-latest.jar" class="button is-primary mt-1">Universal (.jar)</a>
            </div>
        </div>
    </div>
</div>

## GUI Installation

Once you have a copy of the Quilt installer downloaded, follow these steps:

1. Find the Quilt installer you downloaded and run it
2. Ensure that you have the **Server** tab selected
3. Select the version of Minecraft you wish to install Quilt for
4. Select the version of the Quilt loader you'd like to use
5. Select the location you'd like to install the server to
6. Check the **Download server jar** and **Generate launch script** boxes
7. Click the **Install** button

This will download a copy of the Minecraft server to the location you specified, and install Quilt to it, providing a 
launcher JAR to start the server with. It'll also create a set of scripts you can use to launch the server - a `.bat` 
script for Windows and a `.sh` script for Mac and Linux.

That's all there is to it - use the corresponding launch script to start the server for the first time, then stop it
and set it up as you normally would.

## CLI Installation

Once you have a copy of the Quilt installer downloaded, you'll need to run it from your terminal, replacing 
`INSTALLER_VERSION` and `MINECRAFT_VERSION` as needed:

```bash
java -jar quilt-installer-INSTALLER_VERSION.jar \
  install server MINECRAFT_VERSION \
  --download-server \
  --create-scripts
```

This will download a copy of the Minecraft server to `server/` and install Quilt to it, providing a launcher JAR to
start the server with. It'll also create a set of scripts you can use to launch the server - a `.bat` script for
Windows and a `.sh` script for Mac and Linux.

That's all there is to it - use the corresponding launch script to start the server for the first time, then stop it
and set it up as you normally would.
