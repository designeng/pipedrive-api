define [
    'marionette'
    'blocks/views/board/body/item'
], (Marionette, ColumnItemView) ->

    class ColumnView extends Marionette.CompositeView
        tagName: "td"
        childViewContainer: 'ul'
        childView: ColumnItemView
        template: "<ul></ul>"