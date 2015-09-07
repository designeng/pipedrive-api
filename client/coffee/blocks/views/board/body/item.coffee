define [
    'marionette'
    'hbs!templates/boardBodyCell'
], (Marionette, boardBodyCell) ->

    class BodyColumnItemView extends Marionette.ItemView
        tagName: "li"
        className: "board-body-column-item"
        template: boardBodyCell
        activeCellClass: "activeCell"

        toggleActive: (id) ->
            if parseInt(id) == parseInt @model.get("id")
                @$el.toggleClass @activeCellClass
            else
                @$el.removeClass @activeCellClass