---
layout: home
---

{% columns %}
{% column %}
# The Quilt Project

The Quilt project is an open, community-driven modding toolchain designed
primarily for Minecraft. By focusing on speed, ease of use, and modularity,
Quilt aims to provide a sleek and modern modding toolchain with an open
ecosystem.

{% comment %}
# Links for Users
- [Installation Guide]()
- [Updating Quilt Loader]()
- [Updating QSL and Mods]()

# Links for Developers
- [Getting Started with Quilt]()
- [Quilt Versions Helper]()
- [Quilt Mod Template]()
{% endcomment %}

{% endcolumn %}

{% column %}
# Join the Community

In Quilt community spaces, you are expected to follow Quilt's [community
guidelines]({% link _community/rules.md %}).

{% columns %}
<a href="{{ site.discord_community }}" class="button discord column">
    <img alt="Discord Logo" src="/assets/img/icon/discord-light.svg" /> Discord
</a>
<a href="https://github.com/{{ site.github_username }}" class="button github column">
    <img alt="GitHub Logo" src="/assets/img/icon/github-dark.svg" /> GitHub
</a>
<a href="{% link _community/index.md %}" class="button column">
    <i class="fas fa-ellipsis-h"></i> More
</a>
{% endcolumns %}

{% endcolumn %}
{% endcolumns %}

# Recent posts

{% for post in site.posts limit:2 %}
<article class="blog-post">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    {% include post_info.html post=post %}
    <p>{{ post.excerpt }}</p>
    <a href="{{ post.url }}">More...</a>
</article>
{% endfor %}

