define [
    'marionette'
], (Marionette) ->

    class HeaderItemView extends Marionette.ItemView
        tagName: "th"
        className: "header-list-item"