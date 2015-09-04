define [
    'underscore'
], (_) ->

    return (options) ->

        # here's only groupBy realized, but we can realize every underscore collection method
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