define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    AppRouterController = Marionette.Object.extend
        initialize: ->

        showProfilesList: ->
            @sidebar.showList @profilesList