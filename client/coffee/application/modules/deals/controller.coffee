define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, meld, api) ->

    class DealsController extends Marionette.Object

        activateById: (id) ->
            @list.channel.trigger "deals:list:activate", id