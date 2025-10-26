# Architecture
quiltmc.org is a [JAMStack](https://jamstack.org/) site, built using [TypeScript](https://typescriptlang.org), [Astro](https://astro.build), and [i18next](https://i18next.com); and hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages/). It is largely a static site, although there is some server-side functionality.

The architecture of the site is explained below in terms of its folder structure:
```
functions/
	api/
		internal/
		v1/
public/
	.gpg/
	.well-known/
	assets/
	favicon/
scripts/
	resources/
src/
	components/
		atoms/
		parts/
		setpieces/
	data/
		blog/
	layouts/
	locales/
		en/
		zh/
		...
	pages/
	util/
```

## Functions (`functions/`)
Files in this folder are added by Cloudflare to the deployed site and served dynamically using file-based routing. Most of them are auto-generated files that redirect users to the correct page based on their browser's `Accept-Language` header. Only the `api/` contains manually written functions that are tracked by git.

## Public (`public/`)
Files in the in the `/public` folder are copied directly to the built site without any processing. They are copied to the root of the site instead of a `public` directory, so they should be referenced without a leading `public` path (`/image.png`, not `/public/image.png`).

### `_headers` and `_redirects`
Files that Cloudflare Pages uses to send extra headers and HTTP redirects for certain requests. For more information, see the Cloudflare's documentation for [Headers](https://developers.cloudflare.com/pages/configuration/headers/) and [Redirects](https://developers.cloudflare.com/pages/configuration/redirects/).

### `.gpg/`
Holds public GPG keys for the Infrastructure Team and the Admin Board.

###  `.well-known/security.txt`
Outlines our security policy for reporting exploits and vulnerabilities using the proposed [security.txt standard](https://securitytxt.org).

### `api/`
Static routes for the API, including the OpenAPI specification and the incompatible mods JSON file.

### `assets/`
Static files used in various places on the website:
- `css/`: Custom CSS files.
- `img/`: Images used around the site.
- `license-templates/`: Templates for software licenses used as part of the Mod Generator.

### `favicon/`
Various incarnations of the site's favicon.

## Scripts (`scripts/`)
This folder contains scripts that are run during the build process of the site: They fetch and cache data from GitHub and [PluralKit](https://pluralkit.me) to use in the [teams page](https://quiltmc.org/about/teams) and [changelogs](https://quiltmc.org/en/changelog/), and they generate functions for routing the user based on their requested language (see "Functions").

Most functionality is in `preprocess.mjs`, the other scripts are utilities that it imports. `resources` contains the base code used to generate each auto-generated function. `clean` clears cached PluralKit data, and can be invoked using `pnpm clean`.

## Source (`src/`)
This folder contains all the files that are processed by Astro when the site is built. Many of its sub-folders have [TypeScript import path aliases](https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths) which you can use instead of relative paths in import statements. These are prefixed with an `@` and inside (parentheses)

### Components (`src/components/`)
Small pieces of code that form parts of larger pages. They are split into three categories:

**Atoms** (`@atoms`): Fundamental, reusable components that are designed to each do one thing well. They are widely used, often as building blocks for more complex pages.

**Parts** (`@parts`): More complex components that are specialised for a specific page or set piece. For example, the cards on the team page and the home page.

**Set Pieces** (`@setpieces`): Large components that form a part of many pages, such as the nav bar, header, and footer. Set Pieces are the highest-level components and should not be reused inside of other components.

### Data (`src/data`, `@data`)
This folder contains type definitions and objects for various pieces of data used elsewhere in the site, as well as pages which are available through [content collections](https://docs.astro.build/en/guides/content-collections/). Of particular interest is `TeamData.mjs`, which contains the information used to generate the info cards on the [Team Listings page](https://quiltmc.org/about/teams).
#### `src/data/blog`
This folder contains Markdown files with blog posts, which are available to the rest of the site through the `blog` [content collection](https://docs.astro.build/en/guides/content-collections/).

### Layouts (`src/layouts/`, `@layouts`)
While the content of pages is stored in `src/pages`, this folder stores their layouts separately, which makes translating the pages easier, and allows the same layouts to be shared by pages in multiple languages. Some layouts are used by multiple pages, such as `Page.astro` and `Post.astro`; while others are dedicated to a single page, such as `Home.astro` and `InstallPage.astro`. Some layouts build on top of others others: for example,`LatestVersions.astro` uses `Page.astro`.

### Locales (`src/locales/`)
This folder contains [Fluent](https://projectfluent.org) files with translations for terms and phrases that are commonly used throughout the site. Not all localization occurs in this folder: Only short words and phrases that are used in multiple places. Each language has a folder with its language code, containing files with phrases to be translated.

### Pages (`src/pages/`)
This folder stores the content of all the pages on the site, mostly in Markdown or [MDX](https://mdxjs.com) files, depending on the complexity of the page. Pages are stored in a folder specific to their language: English pages in `en/` and so on. Some special pages are excepted from this, for example, `api.astro`.

This folder is special to Astro: It is used to generate the routing and structure of the final site. Each file corresponds to a page, and they are structured in the same way that the site will be when it is generated, so `src/pages/api.astro` becomes `https://quiltmc.org/api`. Files called `index` are named after the folder they are inside, so `src/pages/en/about/index.astro` becomes `https://quiltmc.org/en/about/`. JavaScript and TypeScript files in this folder are executed at build time to generate a page in the final site, for example, `src/pages/feed.xml.js` generates the RSS feed at https://quiltmc.org/feed.xml .

Some files are surrounded by brackets, such as `src/en/blog/[page].astro`. These files generate multiple pages using Astro's [Dynamic Routes](https://docs.astro.build/en/guides/routing/#dynamic-routes).

#### `/src/pages/api`
Although most of the site is statically generated, some pages---notably those in `/src/pages/api`---are generated dynamically using [on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/). Dynamically-generated pages are marked with `export const prerender = false`.

- `api/internal`: Contains a function that downloads the [template mod](https://github.com/quiltmc/quilt-template-mod) from GitHub for the Mod Generator. This API is not designed to be used by external programs.
- `api/v1`: Contains the public website API. For more information about the available routes and their responses, see https://quiltmc.org/api/ .

### Utilities (`src/util`, `@util`)
This folder contains simple utility functions for things like localizing paths, sorting lists, and getting the last modified date of a page.
