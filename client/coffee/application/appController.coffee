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
            When(@profiles()).then (profilesContext) ->
                profilesContext.activateById opts[0]

        renderProfilesList: ->
            When(@profiles()).then (profilesContext) =>
                @regions.sidebarRegion.show profilesContext.profilesList

        # routes interaction:

        showProfilesList: () ->
            # TODO: move to profile module?
            if !@profilesListIsRendered
                @renderProfilesList()
                @profilesListIsRendered = true

        showProfileDetailes: (personId) ->
            When(@profiles()).then (profilesContext) ->
                profilesContext.showProfileDetailes personId

        showDealsList: ->
            When(@deals()).then (dealsContext) =>
                @regions.sidebarRegion.show dealsContext.dealsList

        showDealsDetailes: (dealId) ->
            When(@deals()).then (dealsContext) ->
                dealsContext.showDealsDetailes dealId
