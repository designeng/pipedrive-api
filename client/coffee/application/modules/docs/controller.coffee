define [
    "marionette"
    "./models/markdownModel"
], (Marionette, MarkdownModel) ->

    class DocsController extends Marionette.Object

        createList: =>
            @sandbox.channel.request "list:ready", "docs", @list

        createDetails: (id) =>
            if id
                @markdownLayout.fetchMarkdownDocument(id)
                @sandbox.channel.request "details:ready", "docs", @markdownLayout
            return id

        activateById: (id) ->
            @list.activateById id