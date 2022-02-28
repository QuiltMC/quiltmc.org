module Jekyll
  class ColumnsBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @args = markup.to_s.strip
    end

    def render(context)
      text = super
      "<div class='columns #{@args}'>#{text}</div>"
    end
  end

  class ColumnBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @args = markup.to_s.strip
    end

    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      "<div class='column #{@args}'>#{converter.convert(text)}</div>"
    end
  end
end

Liquid::Template.register_tag('columns', Jekyll::ColumnsBlock)
Liquid::Template.register_tag('column', Jekyll::ColumnBlock)

