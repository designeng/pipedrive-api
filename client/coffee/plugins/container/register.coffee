define [
    "underscore"
    "backbone.radio"
    "when"
    "meld"
], (_, Radio, When, meld) ->

    class Container

        removers: []

        modules: {}

        containerChannel: Radio.channel("container")

        startModule: (module, moduleName) ->
            moduleChannel = Radio.channel(moduleName)
            moduleChannel.reply "default", (requestName, args) =>
                @containerChannel.trigger requestName, args
            return When.promise (resolve, reject) =>
                module({
                    sandbox:
                        literal:
                            channel: moduleChannel
                }).then (context) ->
                    resolve context

        stopModule: (name) ->
            Radio.reset(name) if Radio._channels[name]
            @modules[name]?.destroy()
            delete @modules[name]

        # sandbox provides module functional api and hides other details of realization
        # wired context is cached (we should not wire the module twice!)
        registerModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            args = _.rest joinpoint.args
            context = @modules[moduleName]
            if !context?
                @startModule(joinpoint.target[moduleName], moduleName).then (moduleContext) =>
                    @modules[moduleName] = moduleContext
                    moduleContext.wire(moduleContext.publicApi).then (api) ->
                        _.each api, (method, methodName) ->
                            moduleContext.sandbox[methodName] = method
                        joinpoint.proceed(moduleContext.sandbox, args)
            else
                joinpoint.proceed(context.sandbox, args)

    return (options) ->

        container = new Container()

        # what views the layout should show in its own regions
        registerIntercessorsFacet = (resolver, facet, wire) ->
            wire(facet.options).then (sandboxIntercessors) ->
                _.each sandboxIntercessors, (method) ->
                    container.removers.push meld.around facet.target, method, container.registerModuleSandbox
                facet.target.container = container
                resolver.resolve facet.target

        destroyFacet = (resolver, facet, wire) ->
            # TODO: if several marionette.application instances? All registered events will be removed (find solution)
            Radio.reset()
            _.each container.removers, (remover) ->
                remover.remove()
            resolver.resolve()

        pluginInstance = 
            facets:
                registerIntercessors:
                    "ready"     : registerIntercessorsFacet
                    "destroy"   : destroyFacet

        return pluginInstance