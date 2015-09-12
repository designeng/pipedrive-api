define [
    "marionette"
    "./models/markdownModel"
], (Marionette, MarkdownModel) ->

    class DocsController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showList', 'showDetailes'

        showList: ->
            @listRegion.show @list

        showDetailes: (id) ->
            if id
                # @markdownLayout.model = new MarkdownModel({
                #         id: "introduction"
                #         # text: '###hello, markdown!'
                #     }).fetch()
                # @markdownLayout.render()
                @markdownLayout.fetchMarkdownDocument(id)
            return id

        activateById: (id) ->
            @list.activateById id