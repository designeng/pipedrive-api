define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, meld, api) ->

    class ProfilesModuleController extends Marionette.Object

        removers: []

        initialize: ->
            @profilesListIsRendered = false
            _.bindAll @, 'onRoute', 'showProfilesList', 'showProfileDetailes'

            # profiles list should be rendered in case of child route
            @removers.push meld.before @, 'showProfileDetailes', @showProfilesList

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        onRoute: (name, path, opts) ->
            @profilesChannel.trigger "profiles:list:activate", opts[0]

        renderProfilesList: ->
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            if !@profilesListIsRendered
                @renderProfilesList()
                @profilesListIsRendered = true

        showProfileDetailes: (personId) ->
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