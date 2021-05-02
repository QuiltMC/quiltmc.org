module Jekyll
  class AdmonitionBlock < Liquid::Block
    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      "<div class='admonition'>#{converter.convert(text)}</div>"
    end
  end
end

Liquid::Template.register_tag('admonition', Jekyll::AdmonitionBlock)
