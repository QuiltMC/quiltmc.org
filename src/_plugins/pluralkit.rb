require 'net/https'
require 'time'

module Jekyll
  module PluralkitFilters
    @@system_data_cache = {}

    def pk_list_members(id)
      # Check if the id starts wit pk:
      if id.start_with?('pk:')
        # Remove the pk: prefix
        id = id[3..-1]

        # Check if the id is in the cache
        if !@@system_data_cache.has_key?(id)
          # Query the Pluralkit API for the list members
          url = "https://api.pluralkit.me/v2/systems/#{id}/members"
          response = Net::HTTP.get_response(URI.parse(url))
          data = JSON.parse(response.body)

          # Sort by creation date
          data = data.sort_by { |member| Time.parse(member['created'] || "0000-01-01T00:00:00+0000") }

          # Join the list members into a pipe separated string
          formatted = data.map { |member| "#{member['name']} | #{member['avatar_url']}" }.join('||')

          # Cache the formatted string
          @@system_data_cache[id] = formatted
        end

        # Return the cached string
        @@system_data_cache[id]
      else
        id
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::PluralkitFilters)