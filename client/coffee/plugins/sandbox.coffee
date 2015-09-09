define [
    'underscore'
    'backbone.radio'
], (_, Radio) ->

    return ->

        createSandboxFactory = (resolver, compDef, wire) ->
            wire(compDef.options.api).then (api) ->
                sandbox = {}
                # if !sandbox.emitter?
                #     sandbox.emitter = Radio.channel("application")
                _.each api, (method, methodName) ->
                    sandbox[methodName] = method
                resolver.resolve(sandbox)

        eventsFlowFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createSandbox: createSandboxFactory
            facets:
                eventsFlow:
                    "configure": eventsFlowFacet

        return pluginInstance