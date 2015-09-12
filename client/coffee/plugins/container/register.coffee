define [
    "underscore"
    "backbone.radio"
    "when"
    "meld"
], (_, Radio, When, meld) ->

    class Container

        removers: []

        modules: {}

        sandboxes: {}

        containerChannel: Radio.channel("container")

        registerSandbox: (moduleName, sandbox) ->
            console.debug "sandbox...", moduleName, sandbox
            @sandboxes[moduleName] = sandbox

        # sandbox provides module functional api and hides other details of realization
        # wired context is cached (we should not wire the module twice!)
        registerModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            args = _.rest joinpoint.args
            context = @modules[moduleName]
            if !context?
                When(joinpoint.target[moduleName]({
                    _radio:
                        literal:
                            channel: @containerChannel
                })).then (moduleContext) =>
                    @modules[moduleName] = moduleContext
                    @registerSandbox(moduleName, moduleContext.sandbox)
                    joinpoint.proceed(moduleContext.sandbox, args)
            else
                joinpoint.proceed(context.sandbox, args)

        destroyModule: (name) ->
            @modules[name]?.destroy()
            delete @modules[name]

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
            _.each container.removers, (remover) ->
                remover.remove()
            resolver.resolve()

        pluginInstance = 
            facets:
                registerIntercessors:
                    "ready"     : registerIntercessorsFacet
                    "destroy"   : destroyFacet

        return pluginInstance