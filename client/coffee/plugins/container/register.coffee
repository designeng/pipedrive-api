define [
    'underscore'
    'meld'
], (_, meld) ->

    return (options) ->

        # what views the layout should show in its own regions
        registerApiFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                container = options.container
                api = options.api
                if !container.removers?
                    container.removers = []
                _.each options.api, (method) ->
                    container.removers.push meld.around facet.target, method, container.provideModuleSandbox
                facet.target.container = container
                resolver.resolve facet.target

        destroyFacet = (resolver, facet, wire) ->
            _.each facet.target.container.removers, (remover) ->
                remover.remove()
            resolver.resolve()

        pluginInstance = 
            facets:
                register:
                    "ready"     : registerApiFacet
                    "destroy"   : destroyFacet

        return pluginInstance