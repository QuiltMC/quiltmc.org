require 'git'

# HACK: Finds the git root dir by getting the parent of the source directory.
# This relies on the project's structure where jekyll's source dir is a child
# of the git root.
def find_git_dir(site)
  File.expand_path("..", site.source)
end

module Jekyll
  class EditDateTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @format = markup
    end

    def render(context)
      site = context.registers[:site]
      path = File.expand_path(context.registers[:page]["path"], site.source)
      last = Git.open(find_git_dir(site)).log.path(path).first

      if last != nil then
        "#{last.date.strftime(context[@format] || @format)}"
      else
        "&nbsp;"  # We can't do a translation here, so don't return anything.
      end
    end
  end
end

Liquid::Template.register_tag('edit_date', Jekyll::EditDateTag)

