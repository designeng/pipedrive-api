define [
    "wire"
    "when"
    "marionette"
], (wire, When) ->

    sandboxDeferred = When.defer()

    activateModuleSpy = jasmine.createSpy("activateModuleSpy")
    triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy")
    sendMessageSpy = jasmine.createSpy("triggerOneRouteSpy")

    define 'sandbox/modules/one/controller', ->
        class OneController extends Marionette.Object
            onReady: ->
                @trigger "onready:send:something"

    define 'sandbox/modules/one',
        $plugins:[
            'wire/debug'
            'plugins/sandbox'
        ]

        sandbox:
            createSandbox:
                api: {}
            eventsFlow: [
            ]

        controller:
            create: 'sandbox/modules/one/controller'
            ready:
                onReady: {}

    define 'sandbox/modules/two/controller', ->
        class TwoController
            sendMessage: (message) ->
                sendMessageSpy(message)
                sandboxDeferred.resolve()

    define 'sandbox/modules/two',
        $plugins: [
            'wire/debug'
            'plugins/sandbox'
        ]

        sandbox:
            createSandbox:
                api:
                    sendMessage: {$ref: 'controller.sendMessage'}

        controller:
            create: 'sandbox/modules/two/controller'

    define 'sandbox/core/controller', ->
        class CoreController extends Marionette.Object

            activateModule: (sandbox, args) ->
                activateModuleSpy()
                sandbox.sendMessage(args[0])

            triggerOneRoute: (id) ->
                triggerOneRouteSpy(id)
                When(@activateModule "two", id).then (res) =>

    # CORE SPEC
    sandboxCoreSpec = 
        $plugins: [
            'wire/debug'
            'plugins/container/register'
        ]

        appController:
            create: "sandbox/core/controller"
            properties:
                one: {$ref: 'one'}
                two: {$ref: 'two'}
            registerInContainer:
                api: ['activateModule']

        one:
            wire:
                spec: 'sandbox/modules/one'
                defer: true

        two:
            wire:
                spec: 'sandbox/modules/two'
                defer: true

    # CORE SPEC

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
            

        # it "activateModuleSpy called", (done) ->
            # expect(activateModuleSpy).toHaveBeenCalled()
        #     done()

        # it "activateModuleSpy called", (done) ->
        #     expect(activateModuleSpy).toHaveBeenCalled()
        #     done()

