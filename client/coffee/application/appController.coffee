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

        currentRootFragment: null

        initialize: ->
            @removers.push meld.around @, 'showEntityList', @provideModuleContext
            @removers.push meld.around @, 'showEntityDetailes', @provideModuleContext

        showPreloader: ->
            @regions.mainAreaRegion.show @preloader

        # sandbox provides module functional api and hides other details of realization
        wrapModuleContextInSandbox: (moduleContext) ->
            sandbox = {}
            for prop of moduleContext
                if _.isFunction(moduleContext[prop]) and moduleContext.hasOwnProperty(prop)
                    sandbox[prop] = moduleContext[prop].bind moduleContext
            return sandbox

        # wired context is cached (we should not wire the module twice!)
        provideModuleContext: (joinpoint) ->
            moduleName = joinpoint.args[0]
            id = joinpoint.args[1]
            context = @contextHash[moduleName]
            if !context?
                When(@[moduleName]()).then (moduleContext) =>
                    @contextHash[moduleName] = moduleContext
                    joinpoint.proceed(@wrapModuleContextInSandbox(moduleContext), id)
            else
                joinpoint.proceed(@wrapModuleContextInSandbox(context), id)

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @rootFragmentMutation(path.split("/")[0])
            @notFoundPage.hide() unless path is "*notFound"

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: (rootFragment) ->
            if @currentRootFragment != rootFragment
                @contextHash[@currentRootFragment]?.destroy()
                delete @contextHash[@currentRootFragment]
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        # note that the same handler is responsible for both 'profiles' and 'profiles/:id' (for 'deals' and 'deals/:id' as well) routes.

        # PROFILES:

        profilesModuleHandler: (personId) ->
            When(@showEntityList "profiles").then () =>
                @showEntityDetailes "profiles", personId

        # DEALS:

        dealsModuleHandler: (dealId) ->
            When(@showEntityList "deals").then () =>
                @showEntityDetailes "deals", dealId

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPage.show()

        # COMMON METHODS:

        showEntityList: (sandbox) ->
            sandbox.showList()

        showEntityDetailes: (sandbox, id) ->
            sandbox.showDetailes id