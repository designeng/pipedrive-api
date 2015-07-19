define [
    "underscore"
    'marionette'
    'hbs!blocks/sidebar/template'
], (_, Marionette, sidebarTemplate) ->

    class Sidebar extends Marionette.LayoutView

        template: sidebarTemplate

        regions:
            list: '.list'

        displayQueue: []

        onRender: ->
            _.each @displayQueue, (obj) =>
                @getRegion(obj.regionName).show obj.view

        appendToDisplay: (displayObject) ->
            @displayQueue.push displayObject