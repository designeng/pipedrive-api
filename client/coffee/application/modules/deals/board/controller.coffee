define [
    "underscore"
], (_) ->

    class BoardController extends Marionette.Object

        onReady: ->
            # @groups = _.map @groups, (item, index) ->
            #     obj = {}
            #     obj[index] = new Backbone.Collection(item)
            #     return obj

            console.debug "GROUPS", @groups, @stagesCollection

            # @boardBody.childViewOptions = (model, index) =>
            #     console.debug "........", model, index
            #     id = model.get "id"
            #     return {
            #         collection: @groups[id]
            #     }