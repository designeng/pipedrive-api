define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "when"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, When, meld, api) ->

    class AppController extends Marionette.Object

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
            # TODO: should be cleared...
            # @profilesChannel.trigger "profiles:list:activate", opts[0]

            When(@profiles()).then (profilesContext) =>
                profilesContext.profilesController.activateById opts[0]

        renderProfilesList: ->
            When(@profiles()).then (profilesContext) =>
                @regions.sidebarRegion.show profilesContext.profilesList

        # routes interaction:

        showProfilesList: () ->
            if !@profilesListIsRendered
                @renderProfilesList()
                @profilesListIsRendered = true

        showProfileDetailes: (personId) ->
            @profilesChannel.trigger "profiles:person:details", personId

            When(@profiles()).then (profilesContext) =>
                profilesContext.profilesController.showProfileDetailes personId

            # model = @profilesCollection.find (model) ->
            #     return model.get('id') == parseInt(personId)
            # if model
            #     personProfile = new @PersonProfile({
            #         model
            #         PersonProfileDeals: @PersonProfileDeals
            #         personId: personId
            #     })
            #     @regions.mainAreaRegion.show personProfile
            # else
            #     @regions.mainAreaRegion.show new @BlankProfile

        showDealsList: ->
            console.debug "RouterController::showDealsList"

        showDealsDetailes: (id) ->
            console.debug "RouterController::showDealsDetailes", id