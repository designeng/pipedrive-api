define [
    "backbone"
    "backbone.radio"
    "marionette"
    "api"
], (Backbone, Radio, Marionette, api) ->

    class ApplicationController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'onRoute', 'showProfilesList', 'showProfileDetailes'

        onRoute: (name, path, opts) ->
            @profilesChannel.trigger "profiles:list:activate", opts[0]

        profilesDefault: ->
            @profilesCollection.fetch()
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            @profilesDefault()

        showProfileDetailes: (id) ->
            @profilesCollection.on 'sync', (collection, resp, options) =>
                model = collection.find (model) ->
                    return model.get('id') == parseInt(id)
                if model
                    @regions.mainAreaRegion.show new @PersonProfile({
                        model
                    })
                else
                    @regions.mainAreaRegion.show new @BlankProfile
            @profilesDefault()