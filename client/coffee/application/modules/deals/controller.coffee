define [
    "marionette"
], (Marionette) ->

    class DealsController extends Marionette.Object

        showList: ->
            @listRegion.show @list

        showDealDetailes: (id) ->
            @dealsBoard.activateById id
            return id

        activateById: (id) ->
            @list.activateById id

        onReady: ->
            setTimeout () =>
                @radio.channel.trigger "deals:ready" 
            , 1000