define [
    "backbone"
    "api"
], (Backbone, api) ->

    ProfileModel = Backbone.Model.extend({})

    ProfilesCollection = Backbone.Collection.extend
        url: api.getProfilesCollectionUrl()
        model: ProfileModel