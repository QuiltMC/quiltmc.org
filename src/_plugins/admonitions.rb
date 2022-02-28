# This tag provides an admonition construct, based on Bulma's message component.
#
# Aside from the text inside the tag (which is placed in the message body), you
# can also provide a header and/or style. For example:
#
# {% admonition Title goes here %}
# {% admonition /style %}
# {% admonition Title goes here/style %}
#
# Styles will be prefixed with "is-", and should match Bulma colour names,
# such as primary or info.

module Jekyll
  class AdmonitionBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @args = markup.to_s.strip
    end

    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      parts = @args.split("/")

      if parts.size > 1
        title = parts[0].strip
        style = " is-#{parts[1].strip}"
      else
        title = @args.strip
        style = ""
      end

      result = "<article class='message#{style}'>"

      unless title.to_s.strip.empty?
        result += "<div class='message-header'>#{title}</div>"
      end

      result + "<div class='message-body'>#{converter.convert(text)}</div></article>"
    end
  end
end

Liquid::Template.register_tag('admonition', Jekyll::AdmonitionBlock)
