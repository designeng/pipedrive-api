define [
    'marionette'
    'blocks/views/board/body/item'
], (Marionette, ColumnItemView) ->

    class ColumnView extends Marionette.CollectionView
        tagName: "ul"
        className: "column-item stageDeals"
        childView: ColumnItemView