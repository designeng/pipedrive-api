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
            return id

        activateById: (id) ->
            @list.activateById id