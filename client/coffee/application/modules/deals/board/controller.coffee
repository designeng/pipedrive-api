define [
    "underscore"
], (_) ->

    class BoardController extends Marionette.Object

        onReady: ->
            console.debug "GROUPS", @groups