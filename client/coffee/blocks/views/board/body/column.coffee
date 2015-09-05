define [
    'marionette'
], (Marionette) ->

    class ColumnView extends Marionette.CollectionView
        tagName: "ul"
        className: "column-item"