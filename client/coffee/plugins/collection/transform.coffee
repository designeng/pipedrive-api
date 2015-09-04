define [
    'underscore'
], (_) ->

    return (options) ->

        transformFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                options.collection.on 'sync', (collection) =>
                    grouped = _.groupBy collection.models, (model) ->
                        return model.get options.groupBy
                    resolver.resolve grouped

        pluginInstance = 
            factories: 
                transform: transformFactory

        return pluginInstance