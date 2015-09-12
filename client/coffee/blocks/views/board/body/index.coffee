define [
    'backbone'
    'marionette'
    'hbs!templates/boardBody'
], (Backbone, Marionette, boardBody) ->

    class BoardBodyView extends Marionette.CompositeView
        tagName: 'tr'
        template: boardBody

        # all nested child views (BodyColumnItemView)
        cells: []

        activateById: (id) ->
            if !@cells.length
                @cells = _.flatten _.map @getChildren(), (child) ->
                    return _.values child.getChildren()
            _.each @cells, (cell) ->
                cell.toggleActive(id)