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

            @channel.on "profiles:person:details", (id) =>
                console.debug "ProfilesController:::::profiles:person:details", id

        activateById: (id) ->
            @list.channel.trigger "profiles:list:activate", id

        showProfileDetailes: (personId) ->
            model = @collection.find (model) ->
                return model.get('id') == parseInt(personId)
            if model
                personProfile = new @PersonProfile({
                    model
                    PersonProfileDeals: @PersonProfileDeals
                    personId: personId
                })
                
                @profilesLayout.showChildView "mainAreaRegion", personProfile
            else
                @profilesLayout.showChildView "mainAreaRegion", new @BlankProfile