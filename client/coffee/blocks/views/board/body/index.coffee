define [
    'backbone'
    'marionette'
    'hbs!templates/boardBody'
    './column'
], (Backbone, Marionette, boardBody, Column) ->

    class BoardBodyView extends Marionette.CompositeView

        tagName: 'table'
        childViewContainer: 'tbody'

        childView: Column

        template: boardBody

        initialize: ->
            console.debug "BoardBodyView......"