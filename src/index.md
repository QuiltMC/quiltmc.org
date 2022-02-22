---
layout: hero-content
---

{% columns is-centered mb-5 %}
{% column is-6 mt-2 %}

# The Quilt Project

The Quilt project is an open-source, community-driven modding toolchain designed primarily for Minecraft. By focusing
on speed, ease of use and modularity, Quilt aims to provide a sleek and modern modding toolchain with an open ecosystem.

Quilt is a project that was born out of a need for change in the Minecraft modding ecosystem. Our teams contain many
experienced members of the modding community, providing a level of familiarity that helps us to avoid the mistakes of
the past - whether those mistakes relate to community management, diversity and inclusivity, project governance or
transparency. For more information on how we hope to do this, [please see our "about" pages](/about/).
{% endcolumn %}

{% column is-4 %}
{% admonition /danger %}

<h2 class="has-text-centered">
  <span class="icon-text">
    <span class="icon has-text-danger mr-3">
      <i class="fas fa-warning"></i>
    </span>

    <span>WIP</span>
  </span>
</h2>

**Quilt is currently still in development.** This means that it's not ready for
use just yet, but we're working on it!

If you'd like to keep an eye on what's going on, please feel free to check out
[the launch roadmap](https://github.com/orgs/QuiltMC/projects/1), or join us on
Discord using the links you'll find further down this page.
{% endadmonition %}
{% endcolumn %}

{% endcolumns %}

{% columns mb-5 %}
{% column %}

{% admonition /primary is-fullheight %}

<h2 class="has-text-centered">
  <span class="icon-text">
    <span class="icon has-text-primary mr-3">
      <i class="fas fa-heart"></i>
    </span>

    <span>Caring</span>
  </span>
</h2>

Quilt is community-driven, and couldn't exist without its users and contributors. We care about our community; whether
you're a member of our community spaces, an occasional contributor to one of our projects or simply a user: **Quilt
exists for your needs** - not in spite of them.
{% endadmonition %}
{% endcolumn %}

{% column has-text-centered %}

{% admonition /link has-text-left is-fullheight %}

<h2 class="has-text-centered">
  <span class="icon-text">
    <span class="icon has-text-link mr-3">
      <i class="fas fa-cubes"></i>
    </span>

    <span>Modular</span>
  </span>
</h2>

Quilt's modularity doesn't just exist to help with organising its code - **it extends to its users and modders too**.
If you're a modder, our build tools will keep track of the Quilt libraries your mod uses. If you're a user, Quilt can
automatically download the Quilt libraries needed to run your mods.
{% endadmonition %}
{% endcolumn %}

{% column has-text-centered %}
{% admonition /success has-text-left is-fullheight %}

<h2 class="has-text-centered">
  <span class="icon-text">
    <span class="icon has-text-success mr-3">
      <i class="fas fa-wrench"></i>
    </span>

    <span>Powerful</span>
  </span>
</h2>

Quilt has the extra features and tools your mods need to succeed. From a rich library of modules that help you to write
more compatible mods with less effort, to one of the most accurate decompilers provided by any Minecraft modding
toolchain, you can be sure that **your mod is in good hands**.
{% endadmonition %}
{% endcolumn %}
{% endcolumns %}


{% columns is-centered %}
{% column is-10 %}

<div class="button-grid">
    <a href="/mc-patchnotes/" class="button is-info">
        <span class="icon"><i class="fas fa-notebook"></i></span>
        <span>Minecraft Patch Notes</span>
    </a>

    <a href="https://maven.quiltmc.org" class="button is-gradle">
        <span class="icon"><i class="fas fa-feather-pointed"></i></span>
        <span>Maven Repo</span>
    </a>
</div>

{% endcolumn %}
{% endcolumns %}

{% columns is-centered %}
{% column is-10 %}

{% columns %}
{% column %}
# Join the Community

Please feel free to join us on one of our official community spaces by clicking the buttons below. Please note that 
**all users of our community (and development) spaces are expected to abide by 
[our Code of Conduct](/community/code-of-conduct/) and [our rules](/community/rules/).** We recommend that you read 
and become familiar with them before joining or interacting with us.

<div class="button-grid">
    <a href="{{ site.discord_community }}" class="button is-discord">
        <span class="icon"><i class="fab fa-discord"></i></span>
        <span>Community</span>
    </a>

    <a href="https://twitter.com/{{ site.twitter_username }}" class="button is-twitter">
        <span class="icon"><i class="fab fa-twitter"></i></span> 
        <span>Twitter</span>
    </a>

    <a href="{% link _community/index.md %}" class="button is-primary">
        <span class="icon"><i class="fas fa-ellipsis-h"></i></span> 
        <span>More</span>
    </a>
</div>

# Get Involved

If you'd like to help us, the best thing you can do right now is to join us on GitHub or the toolchain Discord server,
and offer your expertise. There's plenty of things to do, so we can always use more help!

<div class="button-grid">
    <a href="{{ site.discord_toolchain }}" class="button is-discord">
        <span class="icon"><i class="fab fa-discord"></i></span>
        <span>Toolchain</span>
    </a>

    <a href="https://github.com/{{ site.github_username }}" class="button is-github">
        <span class="icon"><i class="fab fa-github"></i></span>
        <span>GitHub</span>
    </a>
</div>

If you're looking for specific jobs, the following places are always worth checking:

<ul>
    <li><a href="https://github.com/QuiltMC/rfcs/pulls">RFCs with open Pull Requests</a></li>
    <li><a href="https://github.com/QuiltMC/quilt-mappings/pulls">Quilt Mappings Pull Requests</a></li>
    <li><a href="https://github.com/orgs/QuiltMC/projects/1">Quilt's Launch Roadmap project</a></li>
</ul>
{% endcolumn %}

{% column %}
# Latest Posts

{% for post in site.posts limit:3 %}
<article class="blog-post with-divider">
    <h2 class="subtitle"><a href="{{ post.url }}">{{ post.title }}</a></h2>

    {% include post_info.liquid post=post %}

    <p>{{ post.excerpt }}</p>
</article>
{% endfor %}

<div class="is-flex mt-4 is-justify-content-right">
    <a class="button is-primary" href="/blog">
        <span class="icon"><i class="fas fa-ellipsis-h"></i></span>
        <span>More Posts</span>
    </a>
</div>

{% endcolumn %}
{% endcolumns %}
{% endcolumn %}
{% endcolumns %}
