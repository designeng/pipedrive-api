define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    AppRouterController = Marionette.Object.extend
        initialize: ->

        showProfilesList: ->
            console.log "showProfilesList"

    return ->
        new Marionette.AppRouter
            controller: new AppRouterController
            appRoutes:
                "profiles"  : "showProfilesList"