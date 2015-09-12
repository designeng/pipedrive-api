define [
    'backbone'
    'marionette'
    'showdown'
    'utils/request/index'
    'hbs!templates/markdown'
], (Backbone, Marionette, showdown, AjaxRequest, markdownTemplate) ->

    class MarkdownView extends Marionette.LayoutView
        tagName: "div"
        className: "markdown"

        template: markdownTemplate

        initialize: (options) ->
            @model = options.model || new Backbone.Model()
            @converter = new showdown.Converter()

        fetchMarkdownDocument: (id) ->
            console.debug "fetchMarkdownDocument", id
            url = "../assets/docs/markdown/" + id + ".md"
            new AjaxRequest(url, {}, "GET").done (response) =>
                @model.set "text", response
                @render()

        onBeforeRender: ->
            console.debug "@model:::::::", @model
            @html = @converter.makeHtml(@model.get "text")

        onRender: ->
            @$el.html @html