define [
    "marionette"
], (Marionette) ->

    class ProfilesController extends Marionette.Object

        # activateById: (id) ->
        #     @list.activateById id

        # showProfileDetailes: (personId) =>
        #     model = @collection.find (model) ->
        #         return model.get('id') == parseInt(personId)
        #     if model
        #         personProfile = new @PersonProfile({
        #             model
        #             PersonProfileDeals: @PersonProfileDeals
        #             personId
        #         })

        #         @personProfileRegion.show personProfile
        #     else
        #         @personProfileRegion.show new @BlankProfile

        #     @activateById(personId)
        #     return personId

        createList: ->
            console.debug "profile create list", @sandbox
            # @sandbox.channel.request "list:ready", @list

        createDetails: ->
