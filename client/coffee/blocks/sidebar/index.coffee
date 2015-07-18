define [
    'marionette'
    'hbs!blocks/sidebar/template'
], (Marionette, sidebarTemplate) ->

    class Sidebar extends Marionette.LayoutView

        template: sidebarTemplate

        regions:
            list: '.list'

        onRender: ->
            console.debug "Sidebar RENDERED"

        showList: (view) ->
            console.debug "@getRegion('list')", @getRegion('list')

            # TODO: $el must be in the DOM:
            # @getRegion('list').show view