define [
    'marionette'
], (Marionette) ->

    class HeaderItemView extends Marionette.ItemView
        tagName: "li"
        className: "header-list-item"