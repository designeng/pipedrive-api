define [
    "marionette"
], (Marionette) ->

    class ProfilesController extends Marionette.Object

        showList: =>
            @listRegion.show @list

        activateById: (id) ->
            @list.activateById id

        showProfileDetailes: (personId) =>
            model = @collection.find (model) ->
                return model.get('id') == parseInt(personId)
            if model
                personProfile = new @PersonProfile({
                    model
                    PersonProfileDeals: @PersonProfileDeals
                    personId
                })

                @personProfileRegion.show personProfile
            else
                @personProfileRegion.show new @BlankProfile

            @activateById(personId)
            return personId