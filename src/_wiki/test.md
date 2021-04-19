---
title: Test Page
slug: test
---

This is a sample wiki page.

Here is some code

{% highlight ruby %}
require 'git'

# HACK: Finds the git root dir by getting the parent of the source directory.
# This relies on the project's structure where jekyll's source dir is a child
# of the git root.
def find_git_dir(site)
  File.expand_path("..", site.source)
end

module Jekyll
  class EditDateTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      site = context.registers[:site]
      path = File.expand_path(context.registers[:page]["path"], site.source)

      last = Git.open(find_git_dir(site)).log.path(path).first
      if last != nil then
        "#{@text} #{last.date.strftime('%B %-d, %Y')}"
      else
        "#{@text} &lt;no commits found&gt;"
      end
    end
  end
end

Liquid::Template.register_tag('edit_date', Jekyll::EditDateTag)
{% endhighlight %}

