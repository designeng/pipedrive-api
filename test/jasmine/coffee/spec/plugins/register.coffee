define [
    "wire"
    "when"
    "backbone.radio"
], (wire, When, Radio) ->

    sandboxDeferred = When.defer()

    startModuleSpy = jasmine.createSpy("startModuleSpy")

    sendMessageSpy = jasmine.createSpy("sendMessageSpy")
    fromModuleWithNameSpy = jasmine.createSpy("fromModuleWithNameSpy")

    define 'sandbox/modules/moduleOne/controller', ->
        class ModuleOneController

            sendMessage: (message) =>

    define 'sandbox/modules/moduleOne',
        $plugins: [
            'wire/debug'
        ]

        publicApi:
            literal:
                sendMessage: {$ref: 'controller.sendMessage'}

        controller:
            create: 'sandbox/modules/moduleOne/controller'
            properties:
                sandbox: {$ref: 'sandbox'}

    define 'sandbox/core/controller', ->
        class CoreController

            startModule: (sandbox, args) ->
                startModuleSpy(args[0])
                sandboxDeferred.resolve(sandbox)

            listenToModule: ->
                @container.channel.on "to:container:from:module", (name, data) ->
                    fromModuleWithNameSpy(name, data)

    # CORE SPEC
    sandboxCoreSpec = 
        $plugins: [
            'wire/debug'
            'plugins/container/register'
        ]

        appController:
            create: "sandbox/core/controller"
            properties:
                moduleOne: {$ref: 'moduleOne'}
            registerIntercessors: ['startModule']
            ready:
                listenToModule: {}

        # options.defer is true, so this module will be wired only after invocation: moduleOne()
        # but it's wrapped into 'plugins/container/register' plugin.
        moduleOne:
            wire:
                spec: 'sandbox/modules/moduleOne'
                defer: true

    # /CORE SPEC

    describe "register plugin (test suite 2)", ->

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
