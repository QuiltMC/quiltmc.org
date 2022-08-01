module Jekyll
  class DetailsBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @args = markup.to_s.strip
    end

    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      "<details class='#{@args}'>#{converter.convert(text)}</details>"
    end
  end

  class SummaryBlock < Liquid::Block
    def initialize(tag_name, markup, tokens)
      super
      @args = markup.to_s.strip
    end

    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

      "
<summary class='#{@args}'>
    <i class=\"summary-icon is-ltr fa-solid fa-lg fa-circle-chevron-right\"></i>
    <i class=\"summary-icon is-rtl fa-solid fa-lg fa-circle-chevron-left\"></i>
    <span>#{converter.convert(text)}</span>
</summary>
"
    end
  end
end

Liquid::Template.register_tag('details', Jekyll::DetailsBlock)
Liquid::Template.register_tag('summary', Jekyll::SummaryBlock)
