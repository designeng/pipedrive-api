define [
    "underscore"
    "backbone"
    "backbone.radio"
    "marionette"
    "when"
    "meld"
    "api"
], (_, Backbone, Radio, Marionette, When, meld, api) ->

    class AppController extends Marionette.Object

        removers: []

        initialize: ->
            @profilesListIsRendered = false
            @dealsListIsRendered = false

            _.bindAll @,
                'onRoute', 
                'showProfilesList', 
                'showProfileDetailes'

            # profiles list should be rendered in case of child route
            @removers.push meld.before @, 'showProfileDetailes', @showProfilesList
            @removers.push meld.before @, 'showDealsDetailes'  , @showDealsList

        onDestroy: ->
            _.each @removers, (remover) ->
                remover.remove()

        onRoute: (name, path, opts) ->
            When(@profiles()).then (profilesContext) ->
                profilesContext.activateById opts[0]

        renderList: (entities) ->
            When(@[entities]()).then (moduleContext) =>
                console.debug "LIST>>>>>", entities, moduleContext[entities + "List"]
                @regions.sidebarRegion.show moduleContext[entities + "List"]

        # routes interaction:

        showProfilesList: () ->
            # TODO: move to profile module?
            @dealsListIsRendered = !@dealsListIsRendered
            if !@profilesListIsRendered
                @renderList "profiles"
                @profilesListIsRendered = true

        showProfileDetailes: (personId) ->
            When(@profiles()).then (profilesContext) ->
                profilesContext.showProfileDetailes personId

        showDealsList: ->
            # TODO: move to profile module?
            @profilesListIsRendered = !@profilesListIsRendered
            if !@dealsListIsRendered
                @renderList "deals"
                @dealsListIsRendered = true

        showDealsDetailes: (dealId) ->
            When(@deals()).then (dealsContext) ->
                dealsContext.showDealsDetailes dealId
