define [
    "marionette"
], (Marionette) ->

    class DealsController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showList', 'showDealDetailes'

        showList: ->
            @listRegion.show @list, {priventDestroy: true}

        showDealDetailes: (id) ->
            @dealsBoard.activateById id
            @activateById(id)
            return id

        activateById: (id) ->
            @list.activateById id

            # demonstration of module's communication with the core
            @sandbox.channel.request "deals:item:activated", id