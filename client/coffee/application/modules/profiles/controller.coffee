define [
    "underscore"
    "backbone"
    "marionette"
    "meld"
    "api"
], (_, Backbone, Marionette, meld, api) ->

    class ProfilesController extends Marionette.Object

        showList: ->
            @listRegion.show @list
            console.debug "@list.cid", @list.isRendered, @list.cid

        activateById: (id) ->
            console.debug "IS REND", @list.isRendered, @list.cid
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