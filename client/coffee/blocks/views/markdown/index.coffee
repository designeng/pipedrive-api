define [
    'backbone'
    'marionette'
    'showdown'
    'utils/request/index'
    'hbs!templates/markdown'
    'coffeescript'
    'highlight'
], (Backbone, Marionette, showdown, AjaxRequest, markdownTemplate, coffeeScriptLang) ->

    class MarkdownView extends Marionette.LayoutView
        tagName: "div"
        className: "markdown"

        template: markdownTemplate

        initialize: (options) ->
            @model = options.model || new Backbone.Model()
            @converter = new showdown.Converter()
            hljs.configure
                tabReplace: '    '
            hljs.registerLanguage('coffeescript', coffeeScriptLang)

        fetchMarkdownDocument: (id) ->
            url = "../assets/docs/markdown/" + id + ".md"
            new AjaxRequest(url, {}, "GET").done (response) =>
                @model.set "text", response
                @render()

        onBeforeRender: ->
            @html = @converter.makeHtml(@model.get "text")

        onRender: ->
            @$el.html @html
            @$el.find('pre code').each (i, block) ->
                hljs.highlightBlock(block)