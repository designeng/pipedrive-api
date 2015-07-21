define [
    "backbone"
    "backbone.radio"
    "marionette"
    "api"
], (Backbone, Radio, Marionette, api) ->

    class ApplicationController extends Marionette.Object

        initialize: ->
            @profilesListIsRendered = false
            _.bindAll @, 'onRoute', 'showProfilesList', 'showProfileDetailes'

        onRoute: (name, path, opts) ->
            @profilesChannel.trigger "profiles:list:activate", opts[0]

        renderProfilesList: ->
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            if !@profilesListIsRendered
                @renderProfilesList()
                @profilesListIsRendered = true

        showProfileDetailes: (personId) ->
            @showProfilesList()
            
            model = @profilesCollection.find (model) ->
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