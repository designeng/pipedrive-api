define [
    "marionette"
], (Marionette) ->

    class DealsController extends Marionette.Object

        createList: =>
            @sandbox.channel.request "list:ready", "deals", @list

        createDetails: (id) =>
            @sandbox.channel.request "details:ready", "deals", @dealsBoard.boardLayout
            @dealsBoard.activateById id
            @activateById(id)

        activateById: (id) ->
            @list.activateById id