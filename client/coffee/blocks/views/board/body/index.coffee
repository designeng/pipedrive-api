define [
    'backbone'
    'marionette'
    'hbs!templates/boardBody'
], (Backbone, Marionette, boardBody) ->

    class BoardBodyView extends Marionette.CompositeView
        tagName: 'div'
        className: 'dealsTable'
        template: boardBody