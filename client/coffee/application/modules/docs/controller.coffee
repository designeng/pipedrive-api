define [
    "marionette"
], (Marionette) ->

    class DocsController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showList', 'showDetailes'

        showList: ->
            @listRegion.show @list

        showDetailes: (id) ->
            console.debug "showDetailes", id
            # @markdownRegion.show @markdownLayout
            if id
                @markdownLayout.model = new Backbone.Model({
                        text: '###hello, markdown!'
                    })
                @markdownLayout.render()
            return id

        activateById: (id) ->
            @list.activateById id