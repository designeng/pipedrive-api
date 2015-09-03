define [
    "underscore"
    "backbone"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Marionette, meld, api) ->

    class ProfilesController extends Marionette.Object

        showList: ->
            console.debug "SHOW LIST", @list, @list.cid
            @listRegion.show @list

        activateById: (id) ->
            @list.activateById id

        showProfileDetailes: (personId) ->
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