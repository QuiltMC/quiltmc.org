---
layout: home
---

{% columns %}
{% column %}
# The Quilt Project

The Quilt project is an open, community-driven modding toolchain designed
primarily for Minecraft. By focusing on speed, ease of use and modularity,
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

<div class="field is-grouped is-grouped-centered font-header">
    <p class="control">
        <a href="{{ site.discord_community }}" class="button is-discord">
            <span class="icon"><i class="fab fa-discord"></i></span>
            <span>Discord</span>
        </a>
    </p>

    <p class="control">
        <a href="https://github.com/{{ site.github_username }}" class="button is-github">
            <span class="icon"><i class="fab fa-github"></i></span>
            <span>GitHub</span>
        </a>
    </p>
</div>

<div class="field is-grouped is-grouped-centered font-header">
    <p class="control">
        <a href="{% link _community/index.md %}" class="button is-primary">
            <span class="icon"><i class="fas fa-ellipsis-h"></i></span> 
            <span>More</span>
        </a>
    </p>
</div>

{% endcolumn %}
{% endcolumns %}

# Recent Posts

{% for post in site.posts limit:2 %}
<article class="blog-post">
    <h2 class="subtitle"><a href="{{ post.url }}">{{ post.title }}</a></h2>
    {% include post_info.html post=post %}
    <p>{{ post.excerpt }}</p>
    <a href="{{ post.url }}">More...</a>
    <br />
    <br />
</article>
{% endfor %}

