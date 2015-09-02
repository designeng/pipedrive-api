define ->
    class AppController

        onReady: (deals) ->
            console.debug "DEALS::::", deals()

        onRoute: ->
            console.debug "onRoute"

        # PROFILES
        showProfilesList: ->

        showProfileDetailes: ->

        # DEALS
        showDealsList: ->
            console.debug "showDealsList"