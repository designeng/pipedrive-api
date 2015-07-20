define [
    'backbone'
    'api'
    './item'
], (Backbone, api, ItemView) ->

    class ListView extends Marionette.CollectionView

        tagName: 'ul'
        className: 'listView'

        childView: ItemView

        initialize: ->

        events: ->
            "click li": "activateCurrent"

        activateCurrent: (event) ->
            @items = @$el.find("li")

            _.each @items, (item) ->
                $(item).removeClass "active"

            $(event.target).closest("li").addClass "active"

        setChildTemplate: (tpl) ->
            @childTemplate = tpl

        childViewOptions: (model, index) ->
            template: @childTemplate