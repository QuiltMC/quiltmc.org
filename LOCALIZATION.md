# Localization Guide

Welcome! In this guide, we will cover how the site's localization system works, and how you can contribute translations of the site.

## Setup

First, please set up a development environment [as documented in the README](README.md#contributing)—for translators, we highly recommend installing the `vscode-fluent` and LanguageTools extensions, as they can catch potential mistakes and correct them for you.
You should also check that the site builds and runs by running `npm run dev` after installation.

## Adding a New Language

The next thing you need to do is to add your language to the site configuration.
Open `astro-i18next.config.ts` in the root folder, and you should see something like this:
```js
import type { AstroI18nextConfig } from "astro-i18next";

export default {
	defaultLanguage: "en",
	supportedLanguages: ["en"],		// (1)
	i18next: {
		debug: true,
		defaultNS: "common",
		// (2)
		ns: ["common", "footer", "home", "install"],
	},
	i18nextPlugins: {
		backend: "src/ersatz/i18next-fs-fluent-backend.mjs",
		fluent: "i18next-fluent",
	},
} as AstroI18nextConfig;
```

The only places you might need to change as a translator are (1) and (2).

(1) contains a list of [ISO 639-1 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), representing all languages the site currently supports.
To add your language to the site, you must add a new language code to this list.
For example, if you're adding a German translation, you must add the language code `de` to the list, like so:
```diff
-	supportedLanguages: ["en"],
+	supportedLanguages: ["en", "de"],
```

<details>

<summary><strong>Sidenote:</strong> Some subtleties with language codes</summary>

Note that `i18next`, the translation API we are using, mandates that a "macrolanguage code" must be added before "microlanguage codes" can be added. What I mean by that is, say you're translating the site to Simplified Chinese, which has the language code of `zh_CN`. (Or more technically, `zh-Hans`.) You **must** have `zh` added as a language code first.

This can be annoying for cases like Simplified vs. Traditional Chinese where there's not really an unbiased "universal" Chinese translation that's fitting for the `zh` language code. We will try to mitigate this in the future should issues arise, but as of now it is something translators simply have to keep in their mind.

</details>

(2) on the other hand is a list of *namespaces*—currently, every `.flt` file counts as its own namespace, so if you ever need to create a new `.flt` file for translations, you need to add it here, however this should (hopefully) be a rare occurrence.

## Copying and Translating the Strings

After adding your language, the next step is to copy the files containing all strings that are used in the site.

To do that, you need to go into `src/locales`, make a copy of the entire `en` folder, then rename the new folder with the language code of your language.
For example, if you're translating the site to German (yes, this example again), you should now have a `src/locales/de` folder that has the same contents as the `src/locales/en` folder.

Once you're done with that, you may have noticed that the files in the folder are all `.flt` files. These are in the [Fluent format](https://projectfluent.org) and if you have `vscode-fluent` installed, you should recognize the syntax fairly quickly, though I will explain the syntax very briefly here.

Take a look at the first few lines of `common.flt`:
```flt
lang-name = English

title = The Quilt Project
short-title = QuiltMC
description = The mod-loader that cares.

title-formatted = {$shortTitle} | {$title}
```

Fluent uses a fairly intuitive key-value syntax, with the key on the left side of the equals sign, and the value on the right side.
It also supports templating, using either "terms" or variables given to Fluent by the site. As a translator you shouldn't worry *too much* about how all of this works—after all, your task is to translate these strings to use in the site.

Note that the English version of the texts may not adapt very well to languages with more complex grammatical features, such as grammatical gender and cases. Fluent does handle these cases very well with its [selectors](https://projectfluent.org/fluent/guide/selectors.html), though if you can't figure out how to use them, I (@pluiedev) will gladly help you make the translation as natural-sounding and flexible as possible.

## Translating Content

Not every piece of translatable content is stored as strings in `.ftl` files—after all, this site is mostly long paragraphs of text that are better translated as a whole.

The pages themselves reside in `src/pages`—copy the `en` subfolder and rename it after the language code, as usual. Then, you can start translating away at the Markdown and Astro files, and they should just work—not much to say here.

When you're done, try to run the site in development mode and see if anything looks wrong, though that should not happen if you just stick to the text.

And that is all there is know about translating the site! I will cover a bit more about how the translation API actually works in the next section, but you wouldn't really need to understand all of it if you're just doing translation work.

## How the Translation API Actually Works

The central thing in our translation API is a function called `t`, from the `i18next` module. It basically retrieves a localized string given a key and some inputs, straight from the strings in `src/locales`.

For example, when under the English locale:
```js
import { t } from "i18next";

console.log(t("lang-name"));
```
This should print out `English`, since we specified `lang-name = English` in `common.ftl`.

Keys are also namespaced, so you have to prefix the key with a namespace and a colon (`:`) if the string is not in `common.ftl`, as `common` is the default namespace for our site.

Therefore, if you have some code like this:
```js
import { t } from "i18next";

console.log(t("lang-name"));
console.log(t("common:lang-name"));
console.log(t("team:n-a"));
```
And the string files look like this:
```flt
# src/locales/en/common.flt
lang-name = English
```
```flt
# src/locales/en/team.flt
n-a = N/A
```
This should be in the console output:
```
English
English
N/A
```

Alternatively you can also pass the namespace as a special parameter:
```js
import { t } from "i18next";

// prints "N/A"
console.log(t("n-a", { ns: "team" }));
```

Which brings us to parameters. `t` accepts a second argument which is a JavaScript object containing keys and values for the string. This is used for some strings like the formatted page title:
```flt
# src/locales/en/common.flt

title-formatted = ${shortTitle} | ${title}
```

Which we use in JS like this:
```js
import { t } from "i18next";

//...

const titleFormatted = t("title-formatted", {
	shortTitle: t("short-title"),
	title: props.title ?? t("description"),
});
```

Notice how the `${shortTitle}` is substituted with the value of `shortTitle` in the JS object—`t("short-title")`. This functionality makes the translation mechanism very flexible and adaptable to complex scenarios, such as printing out a list of authors with the serial comma, which needs to be localized since some languages (like Chinese) use a different symbol for the serial comma.
