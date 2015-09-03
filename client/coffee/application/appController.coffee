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
                'showProfilesModule'
            
            @removers.push meld.around @, 'showEntityList', @aroundMethod
            @removers.push meld.around @, 'showEntityDetailes', @aroundMethod

        # wired context should be cached (we should not wire the module twice!)
        aroundMethod: (joinpoint) ->
            moduleName = joinpoint.args[0]
            id = joinpoint.args[1]

            if !@contextHash[moduleName]
                console.debug "MODULE NAME", moduleName

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
        # note that the same handler is responsible for both 'profiles' and 'profiles/:id' (for 'deals' and 'deals/:id' as well) routes.

        # PROFILES:

        showProfilesModule: (personId) ->
            When(@showEntityList "profiles").then () =>
                @showEntityDetailes "profiles", personId

        # DEALS:

        showDealsModule: (dealId) ->
            When(@showEntityList "deals").then () =>
                @showEntityDetailes "deals", dealId

        # COMMON METHODS:

        showEntityList: (moduleContext) ->
            moduleContext.showList()

        showEntityDetailes: (moduleContext, id) ->
            moduleContext.activateById id
            moduleContext.showDetailes id
