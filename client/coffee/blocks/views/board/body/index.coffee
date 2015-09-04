define [
    'backbone'
    'marionette'
    'hbs!templates/boardBody'
], (Backbone, Marionette, boardBody) ->

    class BoardBodyView extends Marionette.CompositeView

        tagName: 'table'
        template: boardBody

        initialize: ->
            console.debug "BoardView......"