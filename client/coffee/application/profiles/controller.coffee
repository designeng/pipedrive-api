define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    class ApplicationController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showProfilesList', 'showProfileDetailes'

        profilesDefault: ->
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showProfilesList: () ->
            @profilesDefault()

        showProfileDetailes: (id) ->
            @profilesDefault()