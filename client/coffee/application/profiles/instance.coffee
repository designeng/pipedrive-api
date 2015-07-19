define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    class Application

        constructor: ->
            app = new Marionette.Application()

            app.addRegions
                navigationRegion    : ".navigation"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"

            app.on "start", () ->
                Backbone.history.start()
                @sidebarRegion.show @sidebar
                @router.navigate "#/profiles" if Backbone.history.getFragment() != "profiles"

            return app