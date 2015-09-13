define [
    "marionette"
], (Marionette) ->

    class ProfilesController extends Marionette.Object

        activateById: (id) ->
            @list.activateById id

        createDetails: (personId) =>
            model = @collection.find (model) ->
                return model.get('id') == parseInt(personId)
            if model
                personProfile = new @PersonProfile({
                    model
                    PersonProfileDeals: @PersonProfileDeals
                    personId
                })

                @sandbox.channel.request "details:ready", "profiles", personProfile
            else
                @sandbox.channel.request "details:ready", "profiles", new @BlankProfile

            @activateById(personId)
            return personId

        createList: =>
            @sandbox.channel.request "list:ready", "profiles", @list
