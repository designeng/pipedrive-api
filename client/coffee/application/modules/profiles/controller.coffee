define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, meld, api) ->

    class ProfilesController extends Marionette.Object

        onReady: ->
            @channel.on "profiles:list:activate", (id) =>
                @list.activateById id

            @channel.on "profiles:person:details", (id) =>
                console.debug "ProfilesController:::::profiles:person:details", id