define [
    "backbone"
    "marionette"
    "handlebars"
    "behaviors/index"
], (Backbone, Marionette, Handlebars, Behaviors) ->

    # all nessesary marionette hooks can be listed here
    Marionette.TemplateCache::compileTemplate = (rawTemplate) ->
        console.debug "......Marionette.TemplateCache::compileTemplate"
        Handlebars.compile(rawTemplate)

    Marionette.Behaviors.behaviorsLookup = () ->
        console.debug "Marionette.Behaviors.behaviorsLookup"
        return Behaviors

    return () ->