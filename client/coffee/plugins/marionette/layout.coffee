define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->
        createLayoutFactory = (resolver, compDef, wire) ->
            layout = new Marionette.LayoutView()
            wire(compDef.options).then (options) ->
                if options.fromTemplate
                    layout.template = options.fromTemplate
                layout.addRegions options.withRegions
                resolver.resolve layout

        showInRegionFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                _.each options, (view, region) ->
                    facet.target.onBeforeShow = ->
                        facet.target.showChildView region, view
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createLayout: createLayoutFactory
            facets:
                showInRegion:
                    "ready"     : showInRegionFacet

        return pluginInstance