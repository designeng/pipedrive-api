# "https://api.pipedrive.com/v1/persons?api_token="

define ->

    protocol    = "https"
    domain      = "api.pipedrive.com"
    version     = "v1"

    #hardcoded:
    apiToken    = "7dacd3f1efaed95b707174872d2b8497e576fd73"
    userId      = 733958
    companyId   = 1

    prefix      = "#{protocol}://#{domain}/#{version}/"
    suffix      = "?api_token=#{apiToken}"

    api = 
        getSuffix: ->
            return suffix

        getProfilesCollectionUrl: ->
            return "#{prefix}persons#{suffix}"

        getUserCornerUrl: ->
            return "#{prefix}users/733958#{suffix}"

        getOrganizationUrl: ->
            return "#{prefix}organizations/#{companyId}#{suffix}"
