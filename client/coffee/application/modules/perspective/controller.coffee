define ->

    class PerspectiveController

        onReady: (channel) ->
            channel.on "list:ready", (list) =>
                @showInRegion("sidebarRegion", list)

            channel.on "details:ready", (details) =>
                @showInRegion("mainAreaRegion", details)

        showInRegion: (regionName, view) =>
            @[regionName].show view