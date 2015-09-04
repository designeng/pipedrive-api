define [
    'underscore'
    'backbone'
], (_, Backbone) ->

    return (options) ->

        # Backbone built-in feature: every underscore collection method can be called on Backbone.Collection
        applyMethods = (_collection, methods) ->
            _.reduce methods, (collection, method) ->
                if _.isObject method
                    methodName = _.keys(method)[0]
                    methodArgs = method[methodName]
                else if _.isString method
                    methodName = method

                if !collection[methodName]
                    throw new Error "There is no method '#{methodName}' in underscore library!"

                return collection[methodName](methodArgs)
            , _collection

        applyToFactory = (resolver, compDef, wire) ->
            wire(compDef.options).then (options) ->
                _collection = options.collection
                if !_collection.length
                    _collection.on 'sync', (collection) =>
                        resolver.resolve applyMethods(collection, options.methods)
                else
                    resolver.resolve applyMethods(collection, options.methods)

        pluginInstance = 
            factories: 
                applyTo: applyToFactory

        return pluginInstance