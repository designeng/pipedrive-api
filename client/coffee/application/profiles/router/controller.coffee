define ->

    # separated in module to provide space for additional route actions:
    class AppRouterController

        showProfilesList: ->
            @profilesChannel.trigger "profiles:list:show"

        showProfile: (id) ->
            @profilesChannel.trigger "profiles:person:show", id