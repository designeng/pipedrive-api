define [
    "wire"
    "when"
    "marionette"
], (wire, When) ->


    activateModuleSpy = jasmine.createSpy("activateModuleSpy")

    triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy")

    define 'sandbox/modules/one/controller', ->
        class OneController extends Marionette.Object
            onReady: ->
                @trigger "onready:send:something"

    define 'sandbox/modules/two/controller', ->
        class TwoController extends Marionette.Object
            sendMessage: ->
                console.debug "sendMessage"

    define 'sandbox/core/controller', ->
        class CoreController extends Marionette.Object

            activateModule: (id) ->
                console.debug "activateModuleSpy...", id
                activateModuleSpy(id)

            triggerOneRoute: (id) ->
                triggerOneRouteSpy(id)
                When(@activateModule "two").then (res) =>
                    @activateModule "two", id
                    console.debug "RESULT:::", res

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

    define 'sandbox/modules/two',
        $plugins: [
            'wire/debug'
            'plugins/sandbox'
        ]

        sandbox:
            createSandbox:
                api: 
                    sendMessage: {$ref: 'controller.sendMessage'}
            eventsFlow: [
                "two:message"
            ]

        controller:
            create: 'sandbox/modules/two/controller'

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
            ready:
                triggerOneRoute: 123

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

        # it "core is defined", (done) ->
        #     expect(@ctx.one()).toBeDefined()
        #     done()

        it "triggerOneRouteSpy called with id 123", (done) ->
            expect(triggerOneRouteSpy).toHaveBeenCalledWith(123)
            done()

        it "activateModuleSpy called", (done) ->
            expect(activateModuleSpy).toHaveBeenCalled()
            done()

        it "activateModuleSpy called", (done) ->
            expect(activateModuleSpy).toHaveBeenCalled()
            done()

