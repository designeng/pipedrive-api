define [
    'marionette'
], (Marionette) ->

    class BodyColumnItemView extends Marionette.ItemView
        tagName: "li"
        className: "board-body-column-item"