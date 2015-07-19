define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    class ApplicationController extends Marionette.Object

        initialize: ->
            _.bindAll @, 'showList', 'showPersonProfile'

        profilesDefault: ->
            @profilesList.setChildTemplate @profilesListItemTemplate
            @regions.sidebarRegion.show @profilesList

        showList: () ->
            @profilesDefault()

        showPersonProfile: (id) ->
            @profilesDefault()