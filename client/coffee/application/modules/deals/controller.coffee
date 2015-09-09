define [
    "marionette"
], (Marionette) ->

    class DealsController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showList', 'showDealDetailes'

        showList: ->
            @listRegion.show @list

        showDealDetailes: (id) ->
            @dealsBoard.activateById id
            @activateById(id)
            return id

        activateById: (id) ->
            @list.activateById id