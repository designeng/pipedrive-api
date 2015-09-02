define [
    "wire"
    # "application/spec"
], (wire) ->

    define 'routerController', () ->
        class RouterController
            showProfilesList: ->

            showProfileDetailes: ->

    define 'appController', () ->
        class AppController
            onRoute: ->

    applicationCore = 
        $plugins:[
            "wire/debug"
            "plugins/marionette/router"
        ]

        appController:
            create: "appController"

        routerController:
            create: "routerController"

        router:
            createRouter:
                controller: {$ref: 'routerController'}
                routes:
                    'profiles'      : 'showProfilesList'
                    'profiles/:id'  : 'showProfileDetailes'
            onRoute: {$ref: 'appController.onRoute'}

    describe "application core", ->

        beforeEach (done) ->
            wire(applicationCore).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "application core should have router", (done) ->
            expect(@ctx.router).toBeDefined()
            done()