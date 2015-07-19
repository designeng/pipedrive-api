define [
    "backbone"
    "marionette"
    "api"
], (Backbone, Marionette, api) ->

    # class ProfileModel extends Backbone.Model 
    #     initialize: (options) ->
    #         @url = api.getProfileUrl(options.id)

    #     parse: (response, options) ->
    #         console.debug "response", response

    #         return {
    #             name: response.data.name
    #         }

    class ApplicationController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showProfilesList', 'showProfileDetailes'

        profilesDefault: ->
            @profilesCollection.fetch()
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            @profilesDefault()

        showProfileDetailes: (id) ->
            @profilesCollection.on 'sync', (collection, resp, options) =>
                @regions.mainAreaRegion.show new @personProfile({
                    model: collection.find (model) ->
                        return model.get('id') == parseInt(id)
                })
            @profilesDefault()