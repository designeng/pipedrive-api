define [
    "wire"
    "when"
    "marionette"
], (wire, When) ->

    sandboxDeferred = When.defer()

    activateModuleSpy = jasmine.createSpy("activateModuleSpy")
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
        class CoreController extends Marionette.Object

            activateModule: (sandbox, args) ->
                activateModuleSpy()
                sandbox.sendMessage(args[0])

            triggerOneRoute: (id) ->
                triggerOneRouteSpy(id)
                @activateModule "moduleOne", id

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
            registerInContainer:
                api: ['activateModule']

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

        it "sendMessageSpy called with id 123", (done) ->
            @ctx.appController.triggerOneRoute(123)
            When(sandboxDeferred.promise).then () =>
                expect(triggerOneRouteSpy).toHaveBeenCalledWith(123)
                expect(activateModuleSpy).toHaveBeenCalled()
                expect(sendMessageSpy).toHaveBeenCalledWith(123)
                done()