#Testing Strategy

```
define [
    "wire"
    "when"
    "backbone.radio"
], (wire, When, Radio) ->

    sandboxDeferred = When.defer()

    startModuleSpy = jasmine.createSpy("startModuleSpy")

    define 'test/plugins/register/modules/moduleOne/controller', ->
        class ModuleOneController

            sendMessage: (message) =>

    define 'test/plugins/register/modules/moduleOne',
        $plugins: [
            'wire/debug'
        ]

        publicApi:
            literal:
                sendMessage: {$ref: 'controller.sendMessage'}

        controller:
            create: 'test/plugins/register/modules/moduleOne/controller'
            properties:
                sandbox: {$ref: 'sandbox'}

    define 'test/plugins/register/core/controller', ->
        class CoreController

            startModule: (sandbox, args) ->
                startModuleSpy(args[0])
                sandboxDeferred.resolve(sandbox)

    # CORE SPEC
    sandboxCoreSpec = 
        $plugins: [
            'wire/debug'
            'plugins/container/register'
        ]

        appController:
            create: "test/plugins/register/core/controller"
            properties:
                moduleOne: {$ref: 'moduleOne'}
            registerIntercessors: ['startModule']

        # options.defer is true, so this module will be wired only after invocation: moduleOne()
        # but it's wrapped into 'plugins/container/register' plugin.
        moduleOne:
            wire:
                spec: 'test/plugins/register/modules/moduleOne'
                defer: true

    # /CORE SPEC

    describe "register plugin", ->

        beforeEach (done) ->
            wire(sandboxCoreSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "intercessor should interact directly with module sandbox", (done) ->
            @ctx.appController.startModule "moduleOne", "some_arg"
            When(sandboxDeferred.promise).then () =>
                expect(startModuleSpy).toHaveBeenCalledWith "some_arg"
                done()

        it "sandbox should be an object with channel property", (done) ->
            @ctx.appController.startModule "moduleOne"
            When(sandboxDeferred.promise).then (sandbox) =>
                expect(sandbox).toBeObject()
                expect(sandbox.channel).toBeObject()
                done()
```

#Jasmine plugin?
```
define "jasmine/plugins/suite", [
    'underscore'
    'marionette'
], (_, Marionette) ->

    return (options) ->

        suiteStarterResolver = (resolver, amdId, refObj, wire) ->
            require [amdId], (starter) ->
                resolver.resolve starter

        testSuiteFacet = (resolver, facet, wire) ->
            wire(facet.options).then (options) ->
                options.starter(facet.target, options.type)
                resolver.resolve facet.target

        pluginInstance = 
            resolvers:
                starter: suiteStarterResolver

            facets:
                testSuite:
                    "ready"     : testSuiteFacet

        return pluginInstance
```

And then:
```
define [
    "wire"
    "when"
], (wire, When) ->

    define 'behaviorController', () ->
        class behaviorController
            constructor: ->


    define 'tests/Marionette/CollectionView/starter', () ->
        return  (target, type) ->
            describe "list view test suite", ->
                it "list view element exists", (done) ->
                    expect(target).toBeDefined()
                    done()

        beforeEach (done) ->
            wire(behaviorSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "profiles controller exists", (done) ->
            expect(@ctx.controller).toBeDefined()
            done()

    # spec
    behaviorSpec = 
        $plugins:[
            "wire/debug"
            "wire/debug"
            "jasmine/plugins/suite"
        ]

        controller:
            create: "behaviorController"

        list:
            create: "blocks/views/list/index"
            testSuite:
                starter: {$ref: 'starter!tests/Marionette/CollectionView/starter'}
                type: "Marionette.CollectionView"

    describe "profiles module", ->

        beforeEach (done) ->
            wire(behaviorSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "profiles controller exists", (done) ->
            expect(@ctx.controller).toBeDefined()
            done()

        it "profiles list exists", (done) ->
            expect(@ctx.list).toBeDefined()
            done()
```
