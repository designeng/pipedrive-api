define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    class Application

        constructor: ->
            app = new Marionette.Application()

            app.on "start", () ->
                Backbone.history.start()
                @router.navigate "#/profiles" if Backbone.history.getFragment() != "profiles"

            return app