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

        setChildTemplate: (tpl) ->
            @childTemplate = tpl

        childViewOptions: (model, index) ->
            template: @childTemplate