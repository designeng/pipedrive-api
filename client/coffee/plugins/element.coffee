define [
    "jquery"
], ($) ->

    return (options) ->

        elementResolver = (resolver, name, refObj, wire) ->
            console.debug "NAME:::", name
            resolver.resolve $(name)

        return pluginInstance = 
            resolvers:
                element: elementResolver