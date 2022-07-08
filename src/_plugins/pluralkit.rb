require 'net/https'

module Jekyll
  module PluralkitFilters
    def pk_list_members(id)
      # Check if the id starts wit pk:
      if id.start_with?('pk:')
        # Remove the pk: prefix
        id = id[3..-1]

        # Query the Pluralkit API for the list members
        url = "https://api.pluralkit.me/v2/systems/#{id}/members"
        response = Net::HTTP.get_response(URI.parse(url))
        data = JSON.parse(response.body)

        # Sort by creation date
        data = data.sort_by { |member| member['created'] }

        # Join the list members into a pipe separated string
        data.map { |member| "#{member['name']} | #{member['avatar_url']}" }.join('||')
      else
        id
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::PluralkitFilters)