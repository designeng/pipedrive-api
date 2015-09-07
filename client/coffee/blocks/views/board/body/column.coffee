define [
    'marionette'
    'blocks/views/board/body/cell'
], (Marionette, ColumnCellView) ->

    class ColumnView extends Marionette.CompositeView
        tagName: 'td'
        childViewContainer: 'ul'
        childView: ColumnCellView
        template: '<ul></ul>'