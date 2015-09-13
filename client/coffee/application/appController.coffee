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
        listenToModules: ->
            @container.channel.on "item:activated", (module, id) =>
                console.debug "'#{module}' module says: activated item id: ", id
                # send transformed event further to modules
                @container.broadcastEvent "doSomething", id

            @container.channel.on "list:ready", (module, list) =>
                console.debug "'#{module}' module says: LIST READY: ", list
                # send transformed event further to modules
                @container.broadcastEvent "list:ready", list

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
            console.debug "profilesModuleHandler"
            @startModule "profiles", personId
            console.debug "profilesModuleHandler_____"
            
            
            # When(@createEntityList "profiles").then () =>
            #     @createEntityDetailes "profiles", personId

        # DEALS:

        dealsModuleHandler: (dealId) ->
            When(@createEntityList "deals").then () =>
                @createEntityDetailes "deals", dealId

        # 404 ERROR:

        notFoundHandler: ->
            @notFoundPageLayer.show()

        # COMMON INTERCESSORS:

        startModule: (sandbox) ->
            console.debug "START MODULE>>>>>>>>", sandbox

        createEntityList: (sandbox) ->
            console.debug "sandbox", sandbox
            sandbox.createList()

        createEntityDetailes: (sandbox, args) ->
            sandbox.showDetailes args[0]