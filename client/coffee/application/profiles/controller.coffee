define [
    "backbone"
    "backbone.radio"
    "marionette"
    "api"
], (Backbone, Radio, Marionette, api) ->

    class ApplicationController extends Marionette.Object

        currentPersonId: undefined

        initialize: ->
            _.bindAll @, 'onRoute', 'showProfilesList', 'showProfileDetailes'

        onRoute: (name, path, opts) ->
            console.debug "onRoute triggered", opts[0]
            @currentPersonId = opts[0]
            @profilesChannel.trigger "profiles:list:activate", opts[0]

        profilesDefault: ->
            @profilesCollection.fetch()
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            @profilesDefault()

        showProfileDetailes: (id) ->
            @regions.mainAreaRegion.empty()
            
            @profilesCollection.on 'sync', (collection, resp, options) =>
                model = collection.find (model) ->
                    return model.get('id') == parseInt(id)
                if model
                    personProfile = new @PersonProfile({
                        model
                    })

                    personProfile.onRender = =>
                        personProfileDeals = new @PersonProfileDeals({personId: @currentPersonId})
                        personProfile.dealsRegion.show personProfileDeals

                    @regions.mainAreaRegion.show personProfile
                else
                    @regions.mainAreaRegion.show new @BlankProfile
            @profilesDefault()