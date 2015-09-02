# "https://api.pipedrive.com/v1/persons?api_token="

define ->

    localMocks = false

    if localMocks
        protocol    = "http"
        domain      = "localhost"
        port     = "7788"
        prefix      = "#{protocol}://#{domain}:#{port}/"
    else
        protocol    = "https"
        domain      = "api.pipedrive.com"
        version     = "v1"
        prefix      = "#{protocol}://#{domain}/#{version}/"

    #hardcoded:
    apiToken    = "7dacd3f1efaed95b707174872d2b8497e576fd73"
    userId      = 733958

    suffix      = "?api_token=#{apiToken}"

    api = 
        getSuffix: ->
            return suffix

        getProfilesCollectionUrl: ->
            return "#{prefix}persons#{suffix}"

        getPersonDealsUrl: (personId) ->
            return "#{prefix}persons/#{personId}/deals#{suffix}"

        getUserCornerUrl: ->
            return "#{prefix}users/733958#{suffix}"

        getOrganizationsUrl: ->
            return "#{prefix}organizations#{suffix}"
