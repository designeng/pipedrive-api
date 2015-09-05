define [
    'backbone'
    'api'
    'blocks/views/base/collectionView'
    './item'
], (Backbone, api, CollectionView, ItemView) ->

    class ListView extends CollectionView

        tagName: 'ul'
        className: 'listView'
        activeCellClass: 'active'

        childView: ItemView

        activeElements: []

        events: ->
            "click li": "activateCurrent"

        onBeforeRender: ->
            # calculate entities based on passed to the view 'entity' property
            @entities = @entity + "s"
            
            # hack to provide additional ul li with wight background
            # TODO: find the way to do it with clear css
            @collection.add new Backbone.Model()

        activateCurrent: (event) ->
            li = $(event.target).closest("li")
            currentId = li.find(".#{@entity}-name").attr("data-id")

            @items = @$el.find("li")

            _.each @items, (item) =>
                $(item).removeClass @activeCellClass

            li.addClass @activeCellClass

            # navigate to list item details route
            window.location.href = "#/#{@entities}/#{currentId}"

        activateById: (id) ->
            @items = @$el.find("li")

            _.each @items, (item) =>
                $item = $(item)
                $item.removeClass @activeCellClass
                if parseInt($item.find(".#{@entity}-name").attr("data-id")) == parseInt(id)
                    $item.addClass @activeCellClass