define [
    "backbone"
    "marionette"
], (Backbone, Marionette) ->

    AppRouterController = Marionette.Object.extend
        initialize: ->

        showProfilesList: ->
            # here we are customising our profilesList, created as common list component
            # passing childView template
            @profilesList.setChildTemplate @profilesListItemTemplate

            @sidebar.appendToDisplay 
                regionName  : 'list'
                view        : @profilesList