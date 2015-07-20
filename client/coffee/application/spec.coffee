define
    $plugins: [
        'wire/debug'
        'plugins/router'
        'plugins/hbs'
        'plugins/channel'
        'plugins/application'
    ]

    navigation:
        create: 'blocks/views/navigation/index'

    profilesCollection:
        create: 'application/profiles/collections/profiles'

    profilesList:
        create: 'blocks/views/list/index'
        properties:
            collection  : {$ref: 'profilesCollection'}

    personProfile:
        module: 'blocks/views/profile/index'

    blankProfile:
        module: 'blocks/views/profile/blank'

    profilesChannel:
        createChannel:
            name: 'profiles'
        channelEvents:
            'profiles:list:show'    : {$ref: 'profilesApplicationController.showProfilesList'}
            'profiles:person:show'  : {$ref: 'profilesApplicationController.showProfileDetailes'}

    profilesRouterController:
        create: 'application/profiles/router/controller'
        properties:
            profilesChannel         : {$ref: 'profilesChannel'}

    profilesRouter:
        createRouter:
            controller: {$ref: 'profilesRouterController'}
            routes:
                'profiles'      : 'showProfilesList'
                'profiles/:id'  : 'showProfileDetailes'

    profilesApplicationController:
        create: 'application/profiles/controller'
        properties:
            profilesList                : {$ref: 'profilesList'}
            profilesListItemTemplate    : {$ref: 'hbs!application/profiles/templates/profilesListItem' }
            PersonProfile               : {$ref: 'personProfile'}
            profilesCollection          : {$ref: 'profilesCollection'}
            BlankProfile                : {$ref: 'blankProfile'}

    # in Marionette we are not restricted with creating Marionette.Application instances,
    # they can be treated as different modules. Here in our test app we need only one app instance.
    profilesApplication:
        createApplication: {}
        withRegions:
            navigationRegion    : ".navigation"
            sidebarRegion       : ".sidebar"
            mainAreaRegion      : ".main-area"
        showInRegion:
            'navigationRegion': {$ref: 'navigation'}
        addController: {$ref: 'profilesApplicationController'}

    start: ->
        @profilesApplication.start()