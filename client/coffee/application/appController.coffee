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
                @[module](options)

        # demonstration of module - core interaction
        listenToDealsModule: ->
            @container.channel.on "item:activated", (module, id) =>
                console.debug "'#{module}' module says: activated item id: ", id
                # send transformed event further to modules
                @container.broadcastEvent "doSomething", id

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
            When(@showEntityList "profiles").then () =>
                @showEntityDetailes "profiles", personId

        # DEALS:

        dealsModuleHandler: (dealId) ->
            When(@showEntityList "deals").then () =>
                @showEntityDetailes "deals", dealId

        # DOCUMENTATION:

        docsModuleHandler: (id) ->
            When(@startModule "docs").then () =>
                @showEntityDetailes "docs", id

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->
            console.debug "sandbox", sandbox
            # all is done in container/register plugin
            return sandbox

        showEntityList: (sandbox) ->
            sandbox.showList()

        showEntityDetailes: (sandbox, args) ->
            sandbox.showDetailes args[0]