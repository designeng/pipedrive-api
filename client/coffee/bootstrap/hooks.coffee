define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "handlebars"
    "behaviors/index"
], (_, Backbone, Radio, Marionette, Handlebars, Behaviors) ->

    # all nessesary marionette hooks can be listed here
    Marionette.TemplateCache::compileTemplate = (rawTemplate) ->
        Handlebars.compile(rawTemplate)

    Marionette.Behaviors.behaviorsLookup = ->
        console.debug "Marionette.Behaviors.behaviorsLookup"
        return Behaviors

    Marionette.Application::_initChannel = ->
        @channelName = _.result(@, 'channelName') || 'global'
        @channel = _.result(@, 'channel') || Radio.channel(@channelName)

    return () ->