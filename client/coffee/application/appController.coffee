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
            _.bindAll @,
                'onRoute', 
                'showProfilesList', 
                'showProfileDetailes'

            # profiles list should be rendered in case of child route
            @removers.push meld.before @, 'showProfileDetailes', @showProfilesList
            @removers.push meld.before @, 'showDealsDetailes'  , @showDealsList

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) ->
            console.debug "name, path, opts", name, path, opts
            When(@profiles()).then (profilesContext) ->
                profilesContext.activateById opts[0]

        # ROUTES HANDLERS:
        # PROFILES:

        showProfilesList: () ->
            When(@profiles()).then (profilesContext) ->
                profilesContext.showProfilesList()

        showProfileDetailes: (personId) ->
            When(@profiles()).then (profilesContext) ->
                profilesContext.showProfileDetailes personId

        # DEALS:

        showDealsList: ->
            When(@deals()).then (dealsContext) ->
                dealsContext.showDealsList()

        showDealsDetailes: (dealId) ->
            When(@deals()).then (dealsContext) ->
                dealsContext.showDealsDetailes dealId
