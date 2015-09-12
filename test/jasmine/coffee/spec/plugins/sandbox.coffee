define [
    "wire"
    "when"
    "backbone.radio"
], (wire, When, Radio) ->

    sandboxDeferred = When.defer()

    interactWithModuleSpy = jasmine.createSpy("interactWithModuleSpy")
    sendMessageSpy = jasmine.createSpy("sendMessageSpy")
    fromModuleWithNameSpy = jasmine.createSpy("fromModuleWithNameSpy")

    define 'sandbox/modules/moduleOne/controller', ->
        class ModuleOneController

            sendMessage: (message) =>
                @sandbox.channel.request "to:container:from:module", "moduleOne", "Hello from moduleOne"
                sendMessageSpy(message)
                sandboxDeferred.resolve()

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

            interactWithModule: (sandbox, args) ->
                interactWithModuleSpy()
                sandbox.sendMessage(args[0])

            triggerOneRoute: (id) ->
                @interactWithModule "moduleOne", id

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
            registerIntercessors: ['interactWithModule']
            ready:
                listenToModule: {}

        # options.defer is true, so this module will be wired only after invocation: moduleOne()
        # but it's wrapped into 'plugins/container/register' plugin.
        moduleOne:
            wire:
                spec: 'sandbox/modules/moduleOne'
                defer: true

    # /CORE SPEC

    describe "sandbox plugin", ->

        beforeEach (done) ->
            wire(sandboxCoreSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "intercessor should interact directly with module sandbox", (done) ->
            @ctx.appController.triggerOneRoute(123)
            When(sandboxDeferred.promise).then () =>
                expect(interactWithModuleSpy).toHaveBeenCalled()
                expect(sendMessageSpy).toHaveBeenCalledWith(123)
                done()


        it "communication module - core", (done) ->
            @ctx.appController.triggerOneRoute(123)
            When(sandboxDeferred.promise).then () =>
                expect(fromModuleWithNameSpy).toHaveBeenCalledWith("moduleOne", "Hello from moduleOne")
                done()