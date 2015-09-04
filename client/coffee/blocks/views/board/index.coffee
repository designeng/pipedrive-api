define [
    'backbone'
    'marionette'
    'hbs!templates/boardBody'
], (Backbone, Marionette, boardBody) ->

    class BoardBodyView extends Marionette.CompositeView

        template: boardBody

        initialize: ->
            console.debug "boardBodyView......"