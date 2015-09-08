define [
    "marionette"
    "when"
], (Marionette, When) ->

    class AppController extends Marionette.Object

        currentRootFragment: null

        showPreloader: ->
            @regions.mainAreaRegion.show @preloader

        # DEFAULT ROUTE HANDLER:
        onRoute: (name, path, opts) =>
            @rootFragmentMutation(path.split("/")[0])
            @notFoundPage.hide() unless path is "*notFound"

        # remove and destroy cached context if root fragment is changed
        rootFragmentMutation: (rootFragment) ->
            if @currentRootFragment != rootFragment
                @container.destroyModule @currentRootFragment
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

        # COMMON API METHODS:

        showEntityList: (sandbox) ->
            sandbox.showList()

        showEntityDetailes: (sandbox, id) ->
            sandbox.showDetailes id