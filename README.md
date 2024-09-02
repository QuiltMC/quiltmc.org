# Quilt Project Website

Website for the Quilt Project.

## Contributing

This site built with [Astro](https://astro.build), [MDX](https://mdxjs.com), and [i18next](https://www.i18next.com). It is hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages/).

### IDE/Editor Choice

The simplest editor to use is [Visual Studio Code](https://code.visualstudio.com) (VSCode), because it has official language extensions for [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) and [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx). When you open the repository in VSCode, you will see a popup in the bottom-right corner offering to install some recommended extensions. You can also type `@recommended` in the extension search bar to browse the recommended extensions and manually install the ones you want.

<img src="./public/assets/img/writing/recommended-extensions.jpg" width="300">

If you would prefer not to use VSCode, you can use any editor that supports a subset of the following tools, based on what you're doing:

- If you just want to write blog articles or edit pages that are mostly simple text, you only need an editor that supports [Markdown](https://en.wikipedia.org/wiki/Markdown)
- If you want to work with layouts or components, you need an editor with support for .astro files, such as:
  - [Sublime Text](https://www.sublimetext.com) with the [Astro extension](https://packagecontrol.io/packages/Astro)
  - [Neovim](https://neovim.io) with [tree-sitter-astro](https://github.com/virchau13/tree-sitter-astro) and the [Astro lspconfig](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro)
  - [JetBrains IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/) or [WebStorm](https://www.jetbrains.com/webstorm/) with the [Astro extension](https://plugins.jetbrains.com/plugin/20959-astro)
- If you want to work with more complex pages, you may want an editor with support for MDX, though many editors with Markdown support render MDX fairly accurately.
- If you want work with the i18n system, you may want an editor with support for [Fluent](https://projectfluent.org). However, this isn't strictly necessary if you only want to translate the website.

### Building or running in Dev mode
As mentioned previously, the website is built using Astro, which is written in [TypeScript](https://www.typescriptlang.org).

#### Installing Node.js
Node.js is a cross-platform JavaScript runtime. It can be [installed directly](https://nodejs.org/en), or is likely available for your favourite package manager.

#### Installing PNPM
We use [PNPM](https://pnpm.io) as our Node.js package manager. It can be installed in the following ways:
- Using NPM (included with Node.js): `npm install -g pnpm`
- Using [a different package manager](https://pnpm.io/installation#using-other-package-managers)

For more options, see [PNPM's docs](https://pnpm.io/installation#on-posix-systems)

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

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

15:05:32 watching for file changes...
```
The dev server builds pages as you visit them to reduce start time, so its performance is worse than the fully built site.
#### Building the site
To build a full copy of the final site:
```
pnpm build
```
The site will be built into the `dist` folder. Building the site is a useful way to check that you haven't broken anything without noticing.

You can preview the built site using `pnpm astro preview`, but in most cases the only advantage this has over the dev server is performance.

### Previewing with Cloudflare Wrangler
If you need to test Cloudflare Pages-sepcific functionality (such as anything in the `functions` directory), you can preview the site using Cloudflare's [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) to emulate a Cloudflare Pages deployment.

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

Unlike the dev server, Wrangler can only preview a site that is fully built.