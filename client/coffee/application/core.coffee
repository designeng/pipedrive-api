define
    $plugins: [
        'wire/debug'
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
            profiles            : {$ref: 'profiles'}
            deals               : {$ref: 'deals'}
            preloader           : {$ref: 'preloader'}
            notFoundPageLayer   : {$ref: "element!.not-found"}
        registerInContainer: 
            api: ['showEntityList', 'showEntityDetailes']
        ready:
            showPreloader: {}

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

    # DIRECT WORKFLOW MODULES
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            waitParent: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}
    # /DIRECT WORKFLOW MODULES

    # SANDBOXED MODULES:
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
                listRegion          : {$ref: 'appInstance.regions.sidebarRegion'}
                dealsBoardRegion    : {$ref: 'appInstance.regions.mainAreaRegion'}

    # /SANDBOXED MODULES
    # /APPLICATION MODULES

    preloader:
        create: "blocks/views/preloader/index"

    start: ->
        @appInstance.start()
