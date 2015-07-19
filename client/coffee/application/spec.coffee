define
    $plugins: [
        'wire/debug'
        'plugins/router'
        'plugins/hbs'
        'plugins/channel'
        'plugins/application'
    ]

    profilesCollection:
        create: 'application/profiles/collections/profiles'

    profilesList:
        create: 'blocks/views/list/index'
        properties:
            collection  : {$ref: 'profilesCollection'}

    personProfile:
        module: 'blocks/views/profile/index'

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
            profilesList: {$ref: 'profilesList'}
            profilesListItemTemplate: {$ref: 'hbs!application/profiles/templates/profilesListItem' }
            personProfile: {$ref: 'personProfile'}
            profilesCollection: {$ref: 'profilesCollection'}

    # in Marionette we are not restricted with creating Marionette.Application instances,
    # they can be treated as different modules. Here in our test app we need only one app instance.
    profilesApplication:
        createApplication: {}
        withRegions:
            navigationRegion    : ".navigation"
            sidebarRegion       : ".sidebar"
            mainAreaRegion      : ".main-area"
        addController: {$ref: 'profilesApplicationController'}

    start: ->
        @profilesApplication.start()