define [
    'backbone'
    'marionette'
    'hbs!templates/board'
], (Backbone, Marionette, board) ->

    class BoardView extends Marionette.CompositeView

        tagName: 'table'
        template: board

        initialize: ->
            console.debug "BoardView......"