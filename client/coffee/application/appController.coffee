define ->
    class AppController

        onReady: (deals) ->
            console.debug "DEALS::::", deals()

        onRoute: ->
            console.debug "onRoute"


        # routes interaction:

        showProfilesList: ->
            console.debug "RouterController::showProfilesList"

        showProfileDetailes: (id) ->
            console.debug "RouterController::showProfileDetailes", id

        showDealsList: ->
            console.debug "RouterController::showDealsList"

        showDealsDetailes: (id) ->
            console.debug "RouterController::showDealsDetailes", id