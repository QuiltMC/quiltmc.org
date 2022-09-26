# Architecture of This Site

Contributors should also familiarize themselves with the architecture of this repository, which is best done by taking a look at the folder structure:

```
src/
	components/
		atoms/
		parts/
		setpieces/
	data/
		team/
	layouts/
	locales/
		en/
		zh/
		...
	pages/
	util/
public/
	assets/
	favicon/
```

## Source (`src/`)

This folder contains all of the code and content of the site.
As a rule of thumb, you should put all non-assets here.

### Components (`src/components/`)

The components folder contains components, which are divided into three kinds—atoms, parts and setpieces.

Atoms (available under `@atoms`) are simple, reusable components that follow the Unix philosophy—do one thing, and do one thing well.
They are practically found everywhere, often used as a building block of pages, parts, setpieces, and so on. Examples of atoms include buttons and messages.

Parts (`@parts`) are more complex components than atoms, and are often specialized for one purpose or for a single page—for example, the grid of launchers in the install page is a single part, which consists of several `InstallerButton`s, which are atoms.

Setpieces (`@setpieces`) are very complex structures that typically provide a large chunk of functionality of a page, such as the navbar, the footer and the sidebar.
These gigantic components are intended to be used alone in pages, and not in other components.

### Data (`src/data/`, `@data`)

The data folder contains some TypeScript files for storing some common variables used throughout the site, such as links, account names, localization settings, etc.

### Layouts (`src/layouts/`, `@layouts`)

This folder contains every layout of the site, used by all pages of the site. Nothing much to say about that.

### Locales (`src/locales/`)

This folder contains the translated strings used in the site. Under this folder, each locale gets its own folder—`en/` for English, `zh/` for Chinese, etc.
Under that, you will see a bunch of `.flt` files—they are [Fluent](https://projectfluent.org) files, parsed and substituted into the site.

It is worth noting that most of the site's text doesn't get translated this way—as you will see, we only use Fluent for short and common strings.
Long paragraphs of text remain in Astro and Markdown files, which need to be translated as Astro and Markdown files.

### Pages (`src/pages/`)

Pretty self-explanatory—the main content of this site. Edit this section if you're looking to add content, to fix a typo, etc.

### Utilities (`src/util`, `@util`)

This folder contains a bunch of TypeScript files containing common functions for doing tasks like localizing paths, getting the edit date of a page, fetching launcher updates, etc.

## Public (`public/`)

This folder stores assets that can be included in the built site *verbatim*—these files are not processed at all while building—good for images, processed stylesheets, favicons, and more!

Minutiae:
- Note that in the built site, the assets stored here are directly placed under the root path: for example, a file at `public/image.png` should be accessed with the path `/image.png`.
- Files under `public/assets/css/` are currently precompiled from SCSS files from the `quilt-bulma` package. This may change in the future!
- We currently bundle a CSS/WebFonts copy of Font Awesome 6 Free under `public/assets/fontawesome/` as a fallback option for users who have disabled JavaScript. This again, may change in the future.
