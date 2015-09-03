define [
    "underscore"
    "backbone"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Marionette, meld, api) ->

    class ProfilesController extends Marionette.Object

        activateById: (id) ->

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