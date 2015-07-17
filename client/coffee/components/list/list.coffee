define [
    "marionette"
    "./forkItemView"
    "./contributorItemView"
    "components/list/collections/forks"
    "components/list/collections/contributors"
], (Marionette, ForkItemView, ContributorItemView, ForksCollection, ContributorsCollection) ->

    ListCollectionView = Marionette.CollectionView.extend

        tagName: "div"
        className: "accordion"

        initialize: ->
            @onRenderCallback = Marionette.getOption @, "onRenderCallback"

        getChildView: (item) ->
            if item.get "id"
                return ForkItemView
            else
                return ContributorItemView

        setCollection: (mode) ->
            if mode is "contributors"
                @.collection = new ContributorsCollection()
                @collection.fetch()
            if mode is "forks"
                @.collection = new ForksCollection()
                @collection.fetch()

        onRender: ->
            @onRenderCallback()