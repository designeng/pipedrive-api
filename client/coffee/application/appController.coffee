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

        contextHash: {}

        initialize: ->
            _.bindAll @,
                'onRoute', 
                'showProfilesList', 
                'showProfileDetailes'

            # profiles/deals list should be rendered anyway
            @removers.push meld.before @, 'showProfileDetailes', @showProfilesList
            @removers.push meld.before @, 'showDealsDetailes'  , @showDealsList
            
            @removers.push meld.around @, 'showEntityList', @aroundMethod
            @removers.push meld.around @, 'showEntityDetailes', @aroundMethod

        # wired context should be cached (we should not wire the module twice!)
        aroundMethod: (joinpoint) ->
            moduleName = joinpoint.args[0]
            id = joinpoint.args[1]

            if !@contextHash[moduleName]
                When(@[moduleName]()).then (moduleContext) =>
                    @contextHash[moduleName] = moduleContext
                    joinpoint.proceed(moduleContext, id)
            else
                joinpoint.proceed(@contextHash[moduleName], id)

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) ->
            

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

        showEntityList: (moduleContext) ->
            moduleContext.showList()

        showEntityDetailes: (moduleContext, id) ->
            moduleContext.activateById id
            moduleContext.showDetailes id
