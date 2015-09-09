define [
    "underscore"
    "backbone.radio"
    "when"
    "meld"
], (_, Radio, When, meld) ->

    class Container

        removers: []

        contextHash: {}

        modulesApi: {}

        registerModuleApi: (moduleName, sandbox) ->
            @modulesApi[moduleName] = sandbox

        # sandbox provides module functional api and hides other details of realization
        # wired context is cached (we should not wire the module twice!)
        registerModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            args = _.rest joinpoint.args
            context = @contextHash[moduleName]
            if !context?
                When(joinpoint.target[moduleName]()).then (moduleContext) =>
                    @contextHash[moduleName] = moduleContext
                    @registerModuleApi(moduleName, moduleContext.sandbox)
                    joinpoint.proceed(moduleContext.sandbox, args)
            else
                joinpoint.proceed(context.sandbox, args)

        destroyModule: (name) ->
            @contextHash[name]?.destroy()
            delete @contextHash[name]
            delete @modulesApi[name]

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