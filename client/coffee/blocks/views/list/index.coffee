define [
    'backbone'
    'api'
    './item'
], (Backbone, api, ItemView) ->

    class ListView extends Marionette.CollectionView

        tagName: 'ul'
        className: 'listView'

        childView: ItemView

        events: ->
            "click li": "activateCurrent"

        onBeforeRender: ->
            # hack to provide additional ul li with wight background
            # TODO: find the way to do it with clear css
            @collection.add new Backbone.Model()
            # calculate entities based on passed to the view 'entity' property
            @entities = @entity + "s"

        onRender: ->
            @channel.on "#{@entities}:list:activate", (id) =>
                @activateById(id)

        activateCurrent: (event) ->
            li = $(event.target).closest("li")
            currentId = li.find(".#{@entity}-name").attr("data-id")

            @items = @$el.find("li")

            _.each @items, (item) ->
                $(item).removeClass "active"

            li.addClass "active"

            # navigate to list item details route
            window.location.href = "#/#{@entities}/#{currentId}"

        activateById: (id) ->
            @items = @$el.find("li")
            _.each @items, (item) =>
                $item = $(item)
                $item.removeClass "active"
                if parseInt($item.find(".#{@entity}-name").attr("data-id")) == parseInt(id)
                    $item.addClass "active"

        setChildTemplate: (tpl) ->
            @childTemplate = tpl

        childViewOptions: (model, index) ->
            template: @childTemplate