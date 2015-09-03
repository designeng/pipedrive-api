define [
    "underscore"
    "backbone"
    "marionette"
    "when"
    "meld"
    "api"
], (_, Backbone, Marionette, When, meld, api) ->

    class AppController extends Marionette.Object

        removers: []

        initialize: ->
            _.bindAll @,
                'onRoute', 
                'showProfilesList', 
                'showProfileDetailes'

            # profiles/deals list should be rendered anyway
            @removers.push meld.before @, 'showProfileDetailes', @showProfilesList
            @removers.push meld.before @, 'showDealsDetailes'  , @showDealsList

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) ->
            moduleName = path.split("/")[0]
            When(@[moduleName]()).then (moduleContext) ->
                moduleContext.activateById opts[0]

        # ROUTES HANDLERS:
        # PROFILES:

        showProfilesList: () ->
            @showEntityList "profiles"

        showProfileDetailes: (personId) ->
            @showEntityDetailes "profiles", personId

        # DEALS:

        showDealsList: ->
            @showEntityList "deals"

        showDealsDetailes: (dealId) ->
            @showEntityDetailes "deals", dealId

        # COMMON METHODS:

        showEntityList: (moduleName) ->
            When(@[moduleName]()).then (moduleContext) ->
                moduleContext.showList()

        showEntityDetailes: (moduleName, id) ->
            When(@[moduleName]()).then (moduleContext) ->
                moduleContext.showDetailes id
