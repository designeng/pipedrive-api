define
    $plugins: [
        'wire/debug'
        'plugins/radio/channel'
        'plugins/marionette/router'
        'plugins/marionette/module'
    ]

    appInstance:
        createModule:
            withRegions:
                navigationRegion    : ".navigation"
                userCornerRegion    : ".user-profile-corner"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"
            onStart: ->
                Backbone.history.start()
        showInRegion:
            'navigationRegion': {$ref: 'navigation.layout'}
        # addController: {$ref: 'appController'}

    appController:
        create: "application/appController"
        ready:
            onReady: [{$ref: 'deals'}]

    routerController:
        create: "application/routerController"

    router:
        createRouter:
            controller: {$ref: 'routerController'}
            routes:
                'profiles'      : 'showProfilesList'
                'profiles/:id'  : 'showProfileDetailes'
                'deals'         : 'showDealsList'
                'deals/:id'     : 'showDealsDetailes'
        onRoute: {$ref: 'appController.onRoute'}

    profilesChannel:
        createChannel:
            name: 'profiles'
        channelEvents:
            'list:show'    : {$ref: 'appController.showProfilesList'}
            'person:show'  : {$ref: 'appController.showProfileDetailes'}

    dealsChannel:
        createChannel:
            name: 'deals'
        channelEvents:
            'list:show'    : {$ref: 'appController.showDealsList'}

    # APPLICATION MODULES

    navigation:
        wire:
            spec: "application/modules/navigation/spec"

    profiles:
        wire:
            spec: "application/modules/profiles/spec"
            defer: true
            provide:
                channel: {$ref: 'profilesChannel'}

    deals:
        wire:
            spec: "application/modules/deals/spec"
            defer: true
            provide:
                channel: {$ref: 'dealsChannel'}

    # /APPLICATION MODULES

    start: ->
        console.debug "START"
        @appInstance.start()
