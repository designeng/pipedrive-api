define
    $plugins: [
        'wire/debug'
        'plugins/router'
        'plugins/hbs'
    ]

    profilesCollection:
        create: 'application/profiles/collections/profiles'

    profilesList:
        create: 'blocks/list/index'
        properties:
            collection  : {$ref: 'profilesCollection'}

    profilesRouterController:
        create: 'application/profiles/router/controller'
        properties:
            sidebar                 : {$ref: 'sidebar'}
            mainArea                : {$ref: 'mainArea'}
            profilesList            : {$ref: 'profilesList'}
            profilesListItemTemplate: {$ref: 'hbs!application/profiles/templates/profilesListItem' }

    profilesRouter:
        createRouter:
            controller: {$ref: 'profilesRouterController'}
            routes:
                'profiles'  : 'showProfilesList'

    # in Marionette we are not restricted with creating Marionette.Application instances,
    # they can be treated as different modules. Here in our test app we need only one app instance.
    profilesInstance:
        create: 
            module: 'application/profiles/instance'
        properties:
            router      : {$ref: 'profilesRouter'}
            sidebar     : {$ref: 'sidebar'}

    start: ->
        @profilesInstance.start()