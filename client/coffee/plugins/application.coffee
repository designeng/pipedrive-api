define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->

        createApplicationFactory = (resolver, compDef, wire) ->
            app = new Marionette.Application()
            app.on "start", () ->
                Backbone.history.start()

            wire(compDef.options).then (options) ->
                app.addRegions options.withRegions
                resolver.resolve app

        showInRegionFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                _.each options, (view, region) ->
                    facet.target[region].show view
                resolver.resolve facet.target

        addControllerFacet = (resolver, facet, wire) ->
            wire(facet.options).then (controller) ->
                controller.regions = facet.target.getRegions()
                facet.target.controller = controller
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createApplication: createApplicationFactory
            facets:
                showInRegion:
                    "ready"     : showInRegionFacet
                addController:
                    "ready"     : addControllerFacet

        return pluginInstance