module Jekyll
  class ColumnsBlock < Liquid::Block
    def render(context)
      text = super
      "<div class='columns'>#{text}</div>"
    end
  end

  class ColumnBlock < Liquid::Block
    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      "<div class='column'>#{converter.convert(text)}</div>"
    end
  end
end

Liquid::Template.register_tag('columns', Jekyll::ColumnsBlock)
Liquid::Template.register_tag('column', Jekyll::ColumnBlock)

