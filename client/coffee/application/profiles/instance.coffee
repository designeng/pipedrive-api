define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    Marionette.TemplateCache::compileTemplate = (rawTemplate) ->
        Handlebars.compile(rawTemplate)

    Marionette.Behaviors.behaviorsLookup = ->
        console.debug "Marionette.Behaviors.behaviorsLookup"
        return Behaviors

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