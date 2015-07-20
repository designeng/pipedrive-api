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
            li = $(event.target).closest("li")
            currentId = li.find(".person-name").attr("data-id")

            @items = @$el.find("li")

            _.each @items, (item) ->
                $(item).removeClass "active"

            li.addClass "active"

            # navigate to profile details route
            window.location.href = "#/profiles/#{currentId}"

        setChildTemplate: (tpl) ->
            @childTemplate = tpl

        childViewOptions: (model, index) ->
            template: @childTemplate