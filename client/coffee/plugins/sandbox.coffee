define [
    'underscore'
    'backbone.radio'
], (_, Radio) ->

    return ->

        createSandboxFactory = (resolver, compDef, wire) ->
            wire(compDef.options.api).then (api) ->
                sandbox = {
                    onReady: ->
                        console.debug "READY!!!"
                }
                _.each api, (method, methodName) ->
                    sandbox[methodName] = method
                resolver.resolve(sandbox)

        pluginInstance = 
            factories: 
                createSandbox: createSandboxFactory

        return pluginInstance