define [
    'backbone'
    'marionette'
    'blocks/views/base/collectionView'
    'hbs!templates/boardHeader'
    './item'
], (Backbone, Marionette, CollectionView, boardHeader, ItemView) ->

    class BoardHeaderView extends CollectionView
        
        tagName: "ul"
        template: boardHeader

        childView: ItemView

        initialize: ->
            console.debug "BoardHeaderView......"

        childViewOptions: (model, index) ->
            template: @childTemplate