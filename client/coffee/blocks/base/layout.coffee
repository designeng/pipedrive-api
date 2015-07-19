define [
    "underscore"
    "marionette"
], (_, Marionette) ->

    class BaseLayout extends Marionette.LayoutView

        displayQueue: []

        appendToDisplay: (displayObject) ->
            @displayQueue.push displayObject

        onRender: ->
            _.each @displayQueue, (obj) =>
                @getRegion(obj.regionName).show obj.view