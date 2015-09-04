define
    $plugins: [
        'wire/debug'
        'plugins/marionette/router'
        'plugins/marionette/module'
        'plugins/element'
    ]

    appInstance:
        createApplication:
            withRegions:
                navigationRegion    : ".navigation"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"
            onStart: ->
                Backbone.history.start()
        addController: {$ref: 'appController'}

    appController:
        create: "application/appController"
        properties:
            profiles            : {$ref: 'profiles'}
            deals               : {$ref: 'deals'}
            Preloader           : {$ref: 'preloader'}
            notFoundPage        : {$ref: 'notFoundPage'}

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'profiles'      : 'showProfilesModule'
                'profiles/:id'  : 'showProfilesModule'
                'deals'         : 'showDealsModule'
                'deals/:id'     : 'showDealsModule'
                '*notFound'     : 'notFound'
        onRoute: {$ref: 'appController.onRoute'}

    # APPLICATION MODULES

    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            waitParent: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}

    profiles:
        wire:
            spec: "application/modules/profiles/spec"
            defer: true
            provide:
                listRegion          : {$ref: 'appInstance.regions.sidebarRegion'}
                personProfileRegion : {$ref: 'appInstance.regions.mainAreaRegion'}

    deals:
        wire:
            spec: "application/modules/deals/spec"
            defer: true
            provide:
                listRegion          : {$ref: 'appInstance.regions.mainAreaRegion'}
                dealDetailsRegion   : {$ref: 'appInstance.regions.sidebarRegion'}

    # /APPLICATION MODULES

    start: ->
        @appInstance.start()
