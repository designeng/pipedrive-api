define [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->

        createRouterFactory = (resolver, compDef, wire) ->
            essentialProperties = ['controller', 'routes']

            for opt in essentialProperties
                if !compDef.options[opt]?
                    throw new Error '#{opt} option should be provided for createRouter factory!'

            wire(compDef.options.controller).then (routerController) ->
                router = new Marionette.AppRouter
                    controller: routerController
                    appRoutes: compDef.options.routes

                resolver.resolve(router)

        pluginInstance = 
            factories: 
                createRouter: createRouterFactory

        return pluginInstance