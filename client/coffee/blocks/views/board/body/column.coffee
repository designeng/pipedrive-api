define [
    'marionette'
    'blocks/views/board/header/item'
    'hbs!templates/boardBodyCell'
], (Marionette, ItemView, cell) ->

    class ColumnView extends Marionette.CollectionView
        tagName: "ul"
        className: "column-item"

        childView: ItemView

        childViewOptions: (model, index) ->
            template: cell