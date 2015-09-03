define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, meld, api) ->

    class ProfilesController extends Marionette.Object

        activateById: (id) ->
            @list.channel.trigger "profiles:list:activate", id

            # @list.trigger "list:activate", id

        showProfileDetailes: (personId) ->
            model = @collection.find (model) ->
                return model.get('id') == parseInt(personId)
            if model
                personProfile = new @PersonProfile({
                    model
                    PersonProfileDeals: @PersonProfileDeals
                    personId: personId
                })

                @personProfileRegion.show personProfile
            else
                @personProfileRegion.show new @BlankProfile