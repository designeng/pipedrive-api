define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->

        createApplicationFactory = (resolver, compDef, wire) ->
            app = new Marionette.Application()
            app.on "start", () ->
                Backbone.history.start()

            # TODO: router.navigation facet?
            # @router.navigate "#/profiles" if Backbone.history.getFragment() != "profiles"

            resolver.resolve app

        withRegionsFacet = (resolver, facet, wire) ->
            facet.target.addRegions facet.options
            resolver.resolve facet.target

        addControllerFacet = (resolver, facet, wire) ->
            wire(facet.options).then (controller) ->
                controller.regions = facet.target.getRegions()
                controller.regionManager = facet.target._regionManager
                facet.target.controller = controller
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createApplication: createApplicationFactory
            facets:
                withRegions:
                    "ready"     : withRegionsFacet
                addController:
                    "ready"     : addControllerFacet

        return pluginInstance