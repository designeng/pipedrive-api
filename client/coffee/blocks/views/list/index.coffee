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

        activateCurrent: (event) ->
            li = $(event.target).closest("li")
            currentId = li.find(".person-name").attr("data-id")

            @items = @$el.find("li")

            _.each @items, (item) ->
                $(item).removeClass "active"

            li.addClass "active"

            # navigate to profile details route
            window.location.href = "#/profiles/#{currentId}"

        activateById: (id) ->
            @items = @$el.find("li")
            _.each @items, (item) ->
                $item = $(item)
                $item.removeClass "active"
                if parseInt($item.find(".person-name").attr("data-id")) == parseInt(id)
                    $item.addClass "active"

        onRender: ->
            @profilesChannel.on "profiles:list:activate", (id) =>
                setTimeout () =>
                    @activateById(id) 
                , 500

        setChildTemplate: (tpl) ->
            @childTemplate = tpl

        childViewOptions: (model, index) ->
            template: @childTemplate