define [
    "underscore"
    "backbone.radio"
    "when"
    "meld"
], (_, Radio, When, meld) ->

    class Container

        removers: []

        contextHash: {}

        channels: {}

        # sandbox provides module functional api and hides other details of realization
        # wired context is cached (we should not wire the module twice!)
        registerModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            args = _.rest joinpoint.args
            context = @contextHash[moduleName]
            if !context?
                When(joinpoint.target[moduleName]({
                    _radio:
                        literal:
                            channel: Radio.channel(moduleName)
                    })).then (moduleContext) =>
                    @contextHash[moduleName] = moduleContext
                    @channels[moduleName] = moduleContext._radio.channel
                    joinpoint.proceed(moduleContext.sandbox, args)
            else
                joinpoint.proceed(context.sandbox, args)

        destroyModule: (name) ->
            @contextHash[name]?.destroy()
            delete @contextHash[name]
            @channels[name]?.reset()
            delete @channels[name]

    return (options) ->

        container = new Container()

        # what views the layout should show in its own regions
        registerApiFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                api = options.api
                _.each options.api, (method) ->
                    container.removers.push meld.around facet.target, method, container.registerModuleSandbox
                facet.target.container = container
                resolver.resolve facet.target

        destroyFacet = (resolver, facet, wire) ->
            _.each container.removers, (remover) ->
                remover.remove()
            resolver.resolve()

        pluginInstance = 
            facets:
                registerInContainer:
                    "ready"     : registerApiFacet
                    "destroy"   : destroyFacet

        return pluginInstance