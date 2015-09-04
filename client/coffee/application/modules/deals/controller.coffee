define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, meld, api) ->

    class DealsController extends Marionette.Object

        onReady: ->
            console.debug "DEALS LIST:::::", @list

        showList: ->
            @listRegion.show @list

        activateById: (id) ->
            @list.activateById id