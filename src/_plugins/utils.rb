module Jekyll
  module UtilFilters
    def startswith(str, query)
      return str.start_with? query
    end
  end
end

Liquid::Template.register_filter(Jekyll::UtilFilters)

