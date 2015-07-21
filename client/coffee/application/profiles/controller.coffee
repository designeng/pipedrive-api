define [
    "backbone"
    "backbone.radio"
    "marionette"
    "api"
], (Backbone, Radio, Marionette, api) ->

    class ApplicationController extends Marionette.Object

        path: undefined

        initialize: ->
            _.bindAll @, 'onProfilesCollectionSync', 'onRoute', 'showProfilesList', 'showProfileDetailes'

        onProfilesCollectionSync: (collection, resp, options) ->
            personId = options.personId
            model = collection.find (model) ->
                return model.get('id') == parseInt(personId)
            if model
                personProfile = new @PersonProfile({
                    model
                    PersonProfileDeals: @PersonProfileDeals
                    personId: personId
                })
                @regions.mainAreaRegion.show personProfile
            else
                @regions.mainAreaRegion.show new @BlankProfile

        onRoute: (name, path, opts) ->
            @profilesChannel.trigger "profiles:list:activate", opts[0]

        profilesDefault: (personId) ->
            @profilesCollection.fetch({
                personId
            })
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            @profilesDefault()

        showProfileDetailes: (personId) ->
            @profilesDefault(personId)