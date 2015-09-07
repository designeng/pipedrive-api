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
        console.debug "rawTemplate", rawTemplate
        Handlebars.compile(rawTemplate)

    # usualy template is loaded by 'hbs!' plugin. In this case template is returned by Handlebars 'function ret(context, execOptions)'
    # but we should have the most concise and simple way to define template: just by string.
    Marionette.TemplateCache::loadTemplate = (templateId, options) ->
        if _.isString templateId
            return templateId
  
        if !template or template.length == 0
            throw new Marionette.Error
                name: 'NoTemplateError',
                message: 'Could not find template: "' + templateId + '"'
  
        return template

    Marionette.Behaviors.behaviorsLookup = ->
        return Behaviors

    Marionette.Application::_initChannel = ->
        @channelName = _.result(@, 'channelName') || 'global'
        @channel = _.result(@, 'channel') || Radio.channel(@channelName)

    return () ->