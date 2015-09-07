define [
    'marionette'
    'hbs!templates/boardBodyCell'
], (Marionette, boardBodyCell) ->

    class BodyColumnItemView extends Marionette.ItemView
        tagName: "li"
        className: "board-body-column-item"
        template: boardBodyCell

        onRender: ->
            console.debug "MODEL", @model