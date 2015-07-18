define [
    "backbone"
    "marionette"
    "backbone.radio"
], (Backbone, Marionette, Radio) ->

    globalChannel = Radio.channel('global')

    AppRouterController = Marionette.Object.extend
        initialize: ->

        showProfilesList: ->
            console.log "showProfilesList"

    return ->
        new Marionette.AppRouter
            controller: new AppRouterController
            appRoutes:
                "profiles"  : "showProfilesList"