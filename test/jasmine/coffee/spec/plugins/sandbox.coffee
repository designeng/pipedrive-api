define [
    "wire"
    "when"
], (wire, When) ->

    sandboxDeferred = When.defer()

    interactWithModuleSpy = jasmine.createSpy("interactWithModuleSpy")
    triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy")
    sendMessageSpy = jasmine.createSpy("triggerOneRouteSpy")

    define 'sandbox/modules/moduleOne/controller', ->
        class ModuleOneController
            sendMessage: (message) ->
                sendMessageSpy(message)
                sandboxDeferred.resolve()

    define 'sandbox/modules/moduleOne',
        $plugins: [
            'wire/debug'
            'plugins/sandbox'
        ]

        sandbox:
            createSandbox:
                api:
                    sendMessage: {$ref: 'controller.sendMessage'}

        controller:
            create: 'sandbox/modules/moduleOne/controller'

    define 'sandbox/core/controller', ->
        class CoreController

            interactWithModule: (sandbox, args) ->
                interactWithModuleSpy()
                sandbox.sendMessage(args[0])

            triggerOneRoute: (id) ->
                triggerOneRouteSpy(id)
                @interactWithModule "moduleOne", id

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

        it "sendMessageSpy should be called with id 123", (done) ->
            @ctx.appController.triggerOneRoute(123)
            When(sandboxDeferred.promise).then () =>
                expect(triggerOneRouteSpy).toHaveBeenCalledWith(123)
                expect(interactWithModuleSpy).toHaveBeenCalled()
                expect(sendMessageSpy).toHaveBeenCalledWith(123)
                done()