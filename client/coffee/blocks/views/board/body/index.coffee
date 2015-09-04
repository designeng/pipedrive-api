define [
    'backbone'
    'marionette'
    'blocks/views/base/collectionView'
    'hbs!templates/boardBody'
], (Backbone, Marionette, CollectionView, boardBody) ->

    class BoardBodyView extends CollectionView

        tagName: 'table'
        template: boardBody

        initialize: ->
            console.debug "BoardView......"