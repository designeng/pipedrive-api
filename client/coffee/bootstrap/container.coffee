define [
    "underscore"
    "when"
    "meld"
], (_, When, meld) ->

    class Container

        contextHash: {}

        # sandbox provides module functional api and hides other details of realization
        wrapModuleContextInSandbox: (moduleContext) =>
            sandbox = {}
            for prop of moduleContext
                if _.isFunction(moduleContext[prop]) and moduleContext.hasOwnProperty(prop)
                    sandbox[prop] = moduleContext[prop].bind moduleContext
            return sandbox

        # wired context is cached (we should not wire the module twice!)
        provideModuleSandbox: (joinpoint) =>
            moduleName = joinpoint.args[0]
            args = _.rest joinpoint.args
            context = @contextHash[moduleName]
            if !context?
                When(joinpoint.target[moduleName]()).then (moduleContext) =>
                    @contextHash[moduleName] = moduleContext
                    joinpoint.proceed(@wrapModuleContextInSandbox(moduleContext), args)
            else
                joinpoint.proceed(@wrapModuleContextInSandbox(context), args)

        destroyModule: (name) ->
            @contextHash[name]?.destroy()
            delete @contextHash[name]