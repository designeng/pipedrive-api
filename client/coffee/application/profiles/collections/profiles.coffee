define [
    "backbone"
    "api"
], (Backbone, api) ->

    class ProfileModel extends Backbone.Model

    class ProfilesCollection extends Backbone.Collection
        url: api.getProfilesCollectionUrl()
        model: ProfileModel

        parse: (resp, options) ->
            return resp.data