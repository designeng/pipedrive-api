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

        # region, where the layout should be rendered
        renderInFacet = (resolver, facet, wire) ->
            wire(facet.options).then (region) ->
                resolver.resolve region.show(facet.target)

        # what views the layout should show in its own regions
        showInRegionsFacet = (resolver, facet, wire) ->
            noop = ->
            wire(facet.options).then (options) ->
                _.each options, (view, region) ->
                    try
                        facet.target.showChildView region, view
                    catch err
                        # TODO: find why: TypeError: Cannot read property 'show' of undefined at boardLayout.Marionette.LayoutView.Marionette.ItemView.extend.showChildView
                        noop()
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createLayout: createLayoutFactory
            facets:
                showInRegions:
                    "ready"     : showInRegionsFacet
                renderIn:
                    "ready"     : renderInFacet

        return pluginInstance