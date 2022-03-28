---
setup: import Message from "/src/components/message.astro";
layout: /src/layouts/staff-outreach.astro
title: Writing Guidelines
description: Tips and best-practices for writing content on the site.
author: gdude2002
edit_date: February 28, 2022
---

## TODO this page needs to be rewritten to explain astro instead of jekyll and remove the line wrapping stuff

Writing work can be tricky at times, and Quilt doesn't have a large group of professional writers to hand for advice.
This document is intended to be a set of guidelines, tips and tricks to use when writing documents, articles, blog posts
and other written content for the site.

# General Info

When writing any type of document, you'll need to do the following things:

-   Include a title in the document's Front Matter
-   Wrap your document's lines at 120 characters

For more information on these concepts -- and for some other ideas and tips -- please see the following sections.

## Spelling, Punctuation & Grammar

This goes without saying, but proper spelling and grammar is fairly important. That said, nobody is perfect and there
are tools out there that make everyone's lives easier. The use of one is highly recommended, even if you usually have
excellent spelling and grammar -- everyone makes mistakes!

-   [LanguageTool](https://languagetool.org) remains one of the best tools available for this, even the free version.
-   If you prefer, composing in VSCode with
    [the LanguageTool extension](https://marketplace.visualstudio.com/items?itemName=adamvoss.vscode-languagetool) -- or
    IntelliJ IDEA -- will have the same effect as using LanguageTool directly.
-   [Grammarly](https://www.grammarly.com) exists as an alternative, but LanguageTool's open-source approach tends to
    result in a more trustable tool.

A somewhat formal tone in your writing is also recommended, but there's absolutely no need to completely avoid an
informal approach. The site even supports emojis (`WIN` + `.` on Windows), if that's something you're into. 🥔

It's also worth thinking a little about punctuation -- you can use `-` for a hyphen, with `--` and `---` existing for
progressively longer dashes. If you're looking to join to words together (like-this), use a single hyphen. To break
apart a sentence -- like this -- use two dashes.

## Front Matter

A Front Matter block must be placed at the top of every document or page that's written for the site. It takes the form
of a block of YAML surrounded by triple dashes (`---`), and should contain _at least_ a `title` variable.

```yaml
---
title: This is the title of the page or blog post.
---
```

Pages that don't contain a Front Matter block will not be processed by Jekyll, meaning they'll be presented to readers
directly as-is -- something you almost certainly don't want to happen. A number of variables exist that are predefined
by Jekyll:

-   `layout` -- Each category of pages uses a default layout, but you can provide the name of a layout here if you want to
    use a different one. Layouts are defined as HTML files in the `_layouts` folder, and you specify them without the
    `.html` suffix.
-   `permalink` -- If needed, this is the relative path to the URL the page should eventually use as a link. You can use
    this if you need to change the location of the page after it's generated, for cases where Jekyll doesn't put it where
    it's needed. Bear in mind, however, that Jekyll will use the location of your source file by default -- if it's in the
    wrong place, then fix that before setting a new permalink!
-   `published` -- If you're working on something that needs to be committed but not visible to the public on the site, you
    can set this to `false`.

More information on Front Matter and how it works can be found in
[the Jekyll documentation](https://jekyllrb.com/docs/front-matter/).

### Author Information

Author information can be specified using one of two variables. For the sake of SEO, though, there's a specific process
to be followed when setting up author information:

1. In `_data/authors.yml`, ensure an entry exists for the author/s you're crediting a document or page to. If not,
   create as needed, with the following information:
    - `picture`: A link to an image representing that author
    - `twitter`: If the author has a Twitter account, their Twitter username
    - `url`: A link to a page that represents the author -- can be their own website, a social media account, a GitHub
      profile, etc
2. For pages with a single author, simply provide the author name in the `author` key. For pages with multiple authors,
   use the `authors` key and set it to an array of authors. **Ensure that the primary author is the first one in the
   array,** as a lot of sites do not support multiple authors and will just use the first one.

In `_data/authors.yml`:

```yaml
person-one:
    picture: /assets/img/team/person-one.png
    twitter: person-one
    url: https://example.com

person-two:
    picture: /assets/img/team/person-two.png
    twitter: person-two
    url: https://example.com
```

In a page's Front Matter:

```yaml
---
authors:
    - person-one
    - person-two
---
```

Providing this information will ensure that everyone is properly credited for their work when the page is linked to from
social media sites.

### Additional Front Matter variables

As we're using several extra Jekyll plugins and a very custom theme, you'll want to be aware of the following variables
that you can set in addition to the above:

-   `image` -- For embedding on other sites, you can provide a link to an image here (including a link to a file that's
    part of the site's assets, in `/assets`).

## File Formatting

When dealing with Markdown or HTML documents, pages and blog posts, please try to stick to a wrapping margin of 120
chars. Both formats support wrapping nicely at whatever margin is needed, so there's really no reason to go over a
width of 120 chars. Limiting the width this way is easy to configure in most editors, and makes the files more
accessible for editors using different editors and screen sizes.

Additionally, it's worth noting that all documents are also [Liquid templates](https://shopify.github.io/liquid/). While
this templating language is actually quite limiting, it does provide quite a few useful features. Going into detail on
the tags and filters that [Jekyll](https://jekyllrb.com/docs/liquid/) (and Liquid itself) provides is out of scope of
this page, but we've created a few custom ones that you might find useful in your templates.

### Tags

#### Messages

`message` -- this allows you to create an message, as shown below. Messages are essentially boxes that draw
attention to a specific block of text, and our tag also supports an argument of the form `[title]/[style]`, where
`[title]` can be replaced with an optional message title and `[style]` can be replaced with semantic CSS types --
specifically, any of `primary`, `secondary`, `white`, `black`, `light`, `dark`, `success`, `warning`, `danger`,
`info` or `link`.

<div class="columns">
<div class="column">

##### Example

```astro
<Message class="is-success">
    This message has no title, but it has the "success" styling.
</Message>

<Message title="Title goes here" class="danger">
    This message has a title, and the "danger" styling.
</Message>
```

</div>
<div class="column">

##### Result

<Message class="is-success">
    This message has no title, but it has the "success" styling.
</Message>

<Message title="Title goes here" class="danger">
    This message has a title, and the "danger" styling.
</Message>

</div>

</div>

#### Columns

Columns aren't particularly complex, but this gives you a simple way to define them in any type of document, with
the option to provide extra classes as arguments if you need them. Columns on this site will collapse nicely for mobile
users, with the leftmost column showing first.

<div class="columns">
<div class="column">

##### Example

```astro
<div class="columns">
    <div class="column is-narrow">
        <Message>
            This is column 1.
        </Message>
    </div>
    <div class="column">
        <Message>
            This is column 2.
        </Message>
    </div>
</div>
```

</div>
<div class="column">

##### Result

<div class="columns">
    <div class="column is-narrow">
        <Message>
            This is column 1.
        </Message>
    </div>
    <div class="column">
        <Message>
            This is column 2.
        </Message>
    </div>
</div>

</div>
</div>

### Filters

A few miscellaneous Liquid filters have been defined for use in templates.

-   `startswith: "string"` -- Returns `true` if the given argument is contained within the value being filtered, `false`
    otherwise.
-   `count: "string"` -- Returns the number of times `string` was found withing the value being filtered
-   `gt: comparison` -- Equivalent to `value > comparison`, checking whether the filtered value is greater than the
    comparison value -- `lt`, `gte` and `lte` are also included, matching `<`, `>=` and `<=` respectively.
-   `count_gte: key, query, minimum` -- This is an excessively on the nose filter that, when the filtered value is
    an array, returns a new array staffd on whether the number of times `query` is found within the variable contained
    within `item` referenced by `key` is greater than or equal to `minimum`. This really only exists because there was no
    other way to do this in Liquid.

# Articles, Documents and Pages

When working on non-blog content, it's worth keeping the following points in mind.

## Front Matter (Pages)

For non-blog content, the following Front Matter variables may be useful:

-   `description` -- This is the page's meta description that will be shown in search engines and on social media. If you
    skip this, then the site's default description (which you can find in `_config.yml`) will be used instead.

# Blog Posts

As writing blog posts is somewhat different from writing an article or document, you'll need to do the following things
**in addition to [the requirements for any other type of page](#general-info)**:

-   Include a date in the post's Front Matter
-   Include author information in the post's Front Matter, [as detailed above](#author-information).
-   Include at least one category, if possible
-   Define an excerpt in your post

For more information on these concepts, please see the following sections.

## Front Matter (Blog)

For blog posts, the following Front Matter variables may be useful:

-   `date` -- This is the post's publishing date, which should be in a standard ISO format. This is required for all blog
    posts, as the site relies on it for post ordering and to display metadata.
-   `tags` -- An array or space-separated string containing post tags. These are mostly used for metadata, but could be
    displayed if we think that's a good idea.

## Categories

When writing a blog post, you can place the file within a subfolder. Subfolders like this are known as Categories, and
these can be used both for display and metadata. A post may have multiple categories too, specified using the
`categories` variable in the post's Front Matter -- either a space-separated string, or an array.

Ideally, all posts should have at least one category. If you're creating categories, **please list them here with a
description so that other editors will know when to use them.**

## Excerpts

Excerpts are meant to be a summary of what's in a blog post. **Every blog post must have an excerpt** -- failing to
provide one will make Jekyll use the entire post as the exerpt, which is definitely not what you want.

Typically, excerpts are generated from the first couple of paragraphs in a post. There are two ways to define an excerpt
for your post, and you must use either one:

-   Place it in the page's Front Matter block, under the `excerpt` key
-   Use the special HTML comment `<!-- MORE -->` to mark all content above it as the excerpt

The second approach is most likely to be what you want -- one approach would be to write a summary at the top of an
article, mark it as the excerpt and add a horizontal rule to split it from the rest of the page content:

```markdown
A summary of the post goes here.

<!-- MORE -->

---

The actual post content starts here.
```

There are many ways to approach this, of course -- it's best left to the creative liberty of whoever's writing the post,
so this is just a suggestion.
