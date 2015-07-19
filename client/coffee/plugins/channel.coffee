define [
    'underscore'
    'backbone.radio'
], (_, Radio) ->

    return (options) ->

        createChannelFactory = (resolver, compDef, wire) ->
            resolver.resolve Radio.channel(compDef.options.name)

        channelEventsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (onDef) ->
                _.each onDef, (method, eventName) ->
                    facet.target.on eventName, method
                resolver.resolve facet.target

        pluginInstance = 
            factories: 
                createChannel: createChannelFactory
            facets:
                channelEvents:
                    "ready"     : channelEventsFacet

        return pluginInstance