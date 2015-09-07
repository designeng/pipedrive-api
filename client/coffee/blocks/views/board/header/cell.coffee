define [
    'marionette'
], (Marionette) ->

    class HeaderCellView extends Marionette.ItemView
        tagName: "th"
        className: "header-list-item"