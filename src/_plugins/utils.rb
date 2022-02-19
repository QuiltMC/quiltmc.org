module Jekyll
  module UtilFilters
    def startswith(str, query)
      return str.start_with? query
    end

    def count(str, query)
      return str.count query
    end

    def filter_count_gte(arr, key, query, minimum)
      return arr.select { |item| item[key].count(query) >= minimum }
    end
  end
end

Liquid::Template.register_filter(Jekyll::UtilFilters)

