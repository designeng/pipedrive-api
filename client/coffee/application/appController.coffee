define [
    "marionette"
    "when"
], (Marionette, When) ->

    class AppController extends Marionette.Object

        currentRootFragment: null

        showPreloader: (preloader) ->
            @regions.mainAreaRegion.show preloader

        # switch on all service modules
        switchOn: (modules) ->
            _.each modules, (options, module) =>
                # @[module](options)
                @startModule module

        # demonstration of module - core interaction
        listenToModules: ->
            @container.channel.on "list:ready", (module, list) =>
                @container.broadcastEvent "list:ready", list

            @container.channel.on "details:ready", (module, details) =>
                @container.broadcastEvent "details:ready", details

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @rootFragmentMutation(path.split("/")[0])
            @notFoundPageLayer.hide() unless path is "*notFound"

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: (rootFragment) ->
            if @currentRootFragment != rootFragment
                @container.stopModule @currentRootFragment
                @currentRootFragment = rootFragment

        # ROUTES HANDLERS:

        # note that the same handler is responsible for both 'profiles' and 'profiles/:id' (for 'deals' and 'deals/:id' as well) routes.

        # PROFILES:

        profilesModuleHandler: (personId) ->
            When(@createEntityList "profiles").then () =>
                @createEntityDetails "profiles", personId

        # DEALS:

        dealsModuleHandler: (dealId) ->
            When(@createEntityList "deals").then () =>
                @createEntityDetails "deals", dealId

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->

        createEntityList: (sandbox) ->
            sandbox.createList()

        createEntityDetails: (sandbox, args) ->
            sandbox.createDetails args[0]