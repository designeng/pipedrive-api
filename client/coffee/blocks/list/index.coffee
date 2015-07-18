define [
    "backbone"
    "api"
], (Backbone, api) ->

    class ListView extends Marionette.CollectionView

        tagName: "ul"
        className: "listView"

        initialize: ->

        getChildView: (item) ->
            @itemView

        onBeforeRender: ->
            @collection.fetch()

        onRender: ->
            console.debug "RENDERED ListView"