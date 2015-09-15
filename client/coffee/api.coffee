# "https://api.pipedrive.com/v1/persons?api_token="

define ->

    #hardcoded:
    apiToken    = "c0f46d64fde6ceaa8815d79b7106ac5191187953"
    userId      = 798508

    # for local development on mocks without apiToken and internet connection
    localMocks = false

    if !localMocks
        protocol    = "https"
        domain      = "api.pipedrive.com"
        version     = "v1"
        prefix      = "#{protocol}://#{domain}/#{version}/"
        suffix      = "?api_token=#{apiToken}"
    else
        protocol    = "http"
        domain      = "localhost"
        port        = "7788"
        prefix      = "#{protocol}://#{domain}:#{port}/"
        suffix      = ""

    api = 
        getSuffix: ->
            return suffix

        getProfilesCollectionUrl: ->
            return "#{prefix}persons#{suffix}"

        getPersonDealsUrl: (personId) ->
            return "#{prefix}persons/#{personId}/deals#{suffix}"

        getUserCornerUrl: ->
            return "#{prefix}users/#{userId}#{suffix}"

        getOrganizationsUrl: ->
            return "#{prefix}organizations#{suffix}"

        getDealsCollectionUrl: ->
            return "#{prefix}deals#{suffix}"

        getStagesCollectionUrl: ->
            return "#{prefix}stages#{suffix}"