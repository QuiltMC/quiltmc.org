# Quilt Project Website

Website for the Quilt Project.

## Contributing

This site is built with [Astro](https://astro.build), [MDX](https://mdxjs.com), and [i18next](https://www.i18next.com). It is hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages/). If you want to get more familiar with Astro, you can read [its documentation](https://docs.astro.build). The following articles from the documentation explain how Astro works without being tutorials for anything specific:
- [Why Astro](https://docs.astro.build/en/concepts/why-astro/)
- [Project Structure](https://docs.astro.build/en/basics/project-structure/)
- [Develop and Build](<https://docs.astro.build/en/develop-and-build/>)
- [Routing](https://docs.astro.build/en/guides/routing/)
- [Markdown](https://docs.astro.build/en/guides/markdown-content/) and [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/#usage)

If you get stuck or have questions, please join us in the [`#Website`](https://discord.com/channels/817576132726620200/1103986836415713300) thread on our [Discord server](https://discord.quiltmc.org).

### IDE/Editor Choice
The simplest editor to use is [Visual Studio Code](https://code.visualstudio.com) (VSCode), because it has official language extensions for [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) and [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx). When you open the repository in VSCode, you will see a popup in the bottom-right corner offering to install some recommended extensions. You can also type `@recommended` in the extension search bar to browse the recommended extensions and manually install the ones you want.

<img src="./public/assets/img/writing/recommended-extensions.jpg" width="300">

If you would prefer not to use VSCode, you can use any editor that supports a subset of the following tools, based on what you're doing:

- If you just want to write blog articles or edit pages that are mostly simple text, you only need an editor that supports [Markdown](https://en.wikipedia.org/wiki/Markdown).
- If you want to work with layouts or components, you need an editor with support for .astro files, such as:
	- [Sublime Text](https://www.sublimetext.com) with the [Astro extension](https://packagecontrol.io/packages/Astro)
	- [Neovim](https://neovim.io) with [tree-sitter-astro](https://github.com/virchau13/tree-sitter-astro) and the [Astro lspconfig](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro)
- If you want to work with more complex pages, you may want an editor with support for MDX, though many editors with Markdown support render MDX fairly accurately.
- If you want work with the i18n system, you may want an editor with support for [Fluent](https://projectfluent.org). However, this isn't strictly necessary if you only want to translate the website.

### Setting up a development environment
As mentioned previously, the website is built using Astro, which is written in [TypeScript](https://www.typescriptlang.org), so you will need a Node.js-compatible JavaScript runtime in order to build and run it for development. If you only making a simple contribution, such as an [incompatible mod](#adding-an-incompatible-mod) or a [blog post](#writing-a-blog-post), setting up a development environment isn't essential: A preview version of the site will be built when you submit a pull request to ensure that everything works as expected.

#### Installing Node.js
Node.js is a cross-platform JavaScript runtime. It can be [installed directly](https://nodejs.org/en), or is likely available for your favourite package manager.

#### Installing PNPM
We use [PNPM](https://pnpm.io) as our Node.js package manager. It can be installed in the following ways:
- Using NPM (included with Node.js): `npm install -g pnpm`
- Using [a different package manager](https://pnpm.io/installation#using-other-package-managers)

For more options, see [PNPM's docs](https://pnpm.io/installation).

#### Setting up the project
Inside the project, install all the required packages using PNPM:
```shell
pnpm i
```

#### Running the dev server
Astro includes a development server that automatically reloads itself as you change files inside the project. To start it, run `pnpm dev`:
```
> pnpm dev
15:05:32 [types] Generated 1ms

 astro  v4.15.2 ready in 702 ms

┃ Local	http://localhost:4321/
┃ Network  use --host to expose

15:05:32 watching for file changes...
```
The dev server builds pages as you visit them to reduce start time, so its performance is worse than the fully built site.

> [!Note]
> In Astro 5, the dev server has introduced some strange encoding issues, like displaying apostrophes as "â€™". These issues do not appear in the finally built site.

#### Building the site
To build a full copy of the final site:
```
pnpm build
```
The site will be built into the `dist/` folder. Building the site is a useful way to check that you haven't broken anything without noticing.

You can preview the built site using `pnpm astro preview`. This has similar performance to the production website, and avoids the strange encoding issues that the dev server seems to have.

### Previewing with Cloudflare Wrangler
If you need to test Cloudflare Pages-specific functionality (such as anything in the `functions/` directory), you can preview the site using Cloudflare's [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)to emulate a Cloudflare Pages deployment.

First, install Wrangler
```shell
pnpm install -g wrangler
```
Build the site:
```shell
pnpm build
```
Run the outputted `dist` folder using Wrangler:
```
wrangler pages dev dist
```

Unlike Astro's dev server, Wrangler can only preview a site that is fully built.

### Architecture
For a detailed explanation of how the repository is laid out, see [`ARCHITECTURE.md`](ARCHITECTURE.md)

### Common Contributions
Instructions for making various common types of contributions.

#### Adding an Incompatible Mod
Open the `incompatible-mods.json` file in `src/data/incompatible-mods.json` and add a new entry at the bottom of the list.

Your entry must have the following fields:

- `"ids":` - A list of mod IDs that are affected.
- `"Name":`	- The full name of the affected mod.
- `"type":` - The type of incompatibility. Can be one of the following:
	- `"GAME"` - Crashes or breaks the vanilla game.
	- `"OTHERS"` - Breaks one or more other mods.
	- `"SELF"` - Breaks itself.
	- `"WORKAROUND"` - Has a workaround that allows it to function properly.
- `"Status":` - How close the incompatibility is to being fixed. Can be one of the following:
	- `"BLOCKED"` - The mod authors are aware of the issue, but a fix is blocked by an external factor.
	- `"IN_PROGRESS"` - The mod authors are implementing a fix.
	- `"NO_ANSWER"` - The issue has been reported, but the mod authors have not responded.
	- `"ON_HOLD"` 	- The mod authors are waiting to implement or release the fix.
	- `"UNKNOWN"` 	- The issue hasn't been reported to the mod authors, or you can't find a report.
	- `"WONT_FIX"` - The issue has been reported, but the mod authors refuse to fix it.
- `"tracking":` - A link to the report tracking the incompatibility, for example, a GitHub issue. Set to `"UNKNOWN"` if you don't know.
- `icon`: A link to a file that will be used as an icon on the incompatible mods page.
- `"notes":` (optional) - Any other notes, for example, the a known workaround.

To validate your changes, You can build the site locally (see ["Building the Site"](#Building-the-site)) to validate your changes. They will also be validated when you open a pull request.

#### Writing a Blog Post
Create a new Markdown file in `src/data/blog`, named with the current date and a shortened version of the title. The date should be in the format `yyyy-mm-dd`, and the title should be in lowercase and separated by hyphens (`-`), for example, `2024-03-09-example-post.md`. The file *must* end with `.md` and *not* `.mdx`

At the top of the file, you need to add *front matter*, which is metadata written in YAML, enclosed by three hyphens (`---`) The front matter for a blog post looks like this:
```yaml
---
title: "An Example Title" # The full title of the post
date: 2024-09-03 20:00:00 -00:00 #	The date, time, and timezone that the post was written, relative to UTC. It is best practice to give the time in UTC and use an offset of -00:00, as shown.
authors: # A list of one or more authors
  - Pineapple
excerpt: "An example post showing you how to write a real one" # A short summary or teaser for the post, which is shown on the front page and the main blog page. Markdown is supported.
includeExcerptInMainPost: true # Optional: Whether you want the excerpt to be the first paragraph of the full post, to prevent duplicating text.
---
```
From here on, you can keep writing Markdown to your heart's content. Syntax highlighting in code blocks is also supported.

#### Updating your team member card
If you are a part of one of Quilt's developer or community teams, you likely have a card on the website's [Team Listings](https://quiltmc.org/about/teams) page. The data inside the cards on this page is built from the `TeamData.mjs` file in `src/data/`.

Each team member has an object in this file with data about them. The section(s) of the page that you're listed in is based on which teams you're in on GitHub.

You can change the following data to customise your card:

- `name:` - The name at the top of your card. It can be anything you want.
- `discord:` - Your Discord username.
- `github:` - Your GitHub username. This is used to identify which teams you're in on GitHub.
- `avatar:` - This is a URL to any image you like. For best results, it should be square and not too large. You can put a file in `public/assets/team/images` to have it hosted on the website, or use any other image URL you like.
- `description:` (optional) - A sentence or small paragraph about who you are.
- `links:` (optional) - A list of links to your various webpages or social media profiles. Each link is represented by the following object:
	- `icon`: An icon that represents the link. You can choose from the icon sets [CoreUI Brands](https://icon-sets.iconify.design/cib/?keyword=cib)(`cib:`),  [Material Design Icons](https://icon-sets.iconify.design/cib/?keyword=mdi) (`mdi:`), or [Material Symbols](https://icon-sets.iconify.design/material-symbols) (`material-symbols:`); or use our custom icons for CurseForge (`curseforge`) and Modrinth (`modrinth-small`). When using an icon from an icon set (as opposed to a custom one), you must prefix the icon name with the name of the icon set, for example, `cib:youtube` to use the `youtube` icon from CoreUI Brands.
	- `url`: The link to the webpage.
- `systemMembers:` (optional) - This field is intended for plural systems to display each of their members. It has a few possible values:
	- `"---"` will show you as being a plural system with your members hidden.
	- A [PluralKit](https://pluralkit.me) system ID will automatically fetch and display the names and avatars of all the public members of that system.
	- You can manually build a system using a list of the following objects:
		- `name:` The name of the system member.
		- `icon:` - An avatar for the member. You can use any URL you want, or host an image on this site in `public/assets/team/images/<your-system-name>/`.
