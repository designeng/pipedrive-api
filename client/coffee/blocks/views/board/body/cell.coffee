define [
    'marionette'
    'moment'
    'hbs!templates/boardBodyCell'
], (Marionette, moment, boardBodyCell) ->

    class ColumnCellView extends Marionette.ItemView
        tagName: "li"
        className: "board-body-column-item"
        template: boardBodyCell
        activeCellClass: "activeCell"

        ui:
            'additionalInfo': '.board-body-cell-additional-info'

        templateHelpers:
            addTime: ->
                moment(@add_time).format("DD MM YYYY")
            stageChangeTime: ->
                moment(@stage_change_time).format("DD MM YYYY")

        toggleActive: (id) ->
            if parseInt(id) == parseInt @model.get("id")
                @$el.toggleClass @activeCellClass
                @additionalInfo "show"
            else
                @$el.removeClass @activeCellClass
                @additionalInfo "hide"

        additionalInfo: (state) ->
            if state == "show"
                effect = "fast"
            @ui.additionalInfo[state](effect)