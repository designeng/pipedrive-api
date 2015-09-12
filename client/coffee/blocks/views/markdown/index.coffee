define [
    'backbone'
    'marionette'
    'showdown'
    'hbs!templates/markdown'
], (Backbone, Marionette, showdown, markdownTemplate) ->

    class MarkdownView extends Marionette.LayoutView
        tagName: "div"
        className: "markdown"

        template: markdownTemplate

        initialize: (options) ->
            @model = options.model || new Backbone.Model()
            @converter = new showdown.Converter()

        onBeforeRender: ->
            @html = @converter.makeHtml(@model.get "text")

        onRender: ->
            @$el.html @html
            console.debug "onRender html", @html