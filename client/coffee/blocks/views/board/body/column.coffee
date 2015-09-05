define [
    'marionette'
    'blocks/views/board/body/item'
    'hbs!templates/boardBodyCell'
], (Marionette, ColumnItemView, cell) ->

    class ColumnView extends Marionette.CollectionView
        tagName: "ul"
        className: "column-item"

        childView: ColumnItemView

        childViewOptions: (model, index) ->
            template: cell