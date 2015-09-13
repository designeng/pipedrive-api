define
    $plugins: [
        # 'wire/debug'
        'plugins/marionette/router'
        'plugins/marionette/module'
        'plugins/container/register'
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
            navigation          : {$ref: 'navigation'}
            profiles            : {$ref: 'profiles'}
            deals               : {$ref: 'deals'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerIntercessors: ['showEntityList', 'showEntityDetailes']
        ready:
            showPreloader: {$ref: 'preloader'}
            switchOn: [
                "navigation" : {}
            ]
            listenToDealsModule: {}

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'profiles'      : 'profilesModuleHandler'
                'profiles/:id'  : 'profilesModuleHandler'
                'deals'         : 'dealsModuleHandler'
                'deals/:id'     : 'dealsModuleHandler'
                '*notFound'     : 'notFoundHandler'
        onRoute: {$ref: 'appController.onRoute'}

    # APPLICATION MODULES
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            defer: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}

    perspective:
        wire:
            spec: "application/modules/perspective/spec"
            defer: true
            provide:
                sidebarRegion       : {$ref: 'appInstance.regions.sidebarRegion'}
                mainAreaRegion      : {$ref: 'appInstance.regions.mainAreaRegion'}

    profiles:
        wire:
            spec: "application/modules/profiles/spec"
            defer: true

    deals:
        wire:
            spec: "application/modules/deals/spec"
            defer: true
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
