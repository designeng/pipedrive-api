define
    $plugins: [
        'wire/debug'
        'plugins/router'
    ]

    profilesRouterController:
        create: 'application/profiles/router/controller'
        properties:
            sidebar     : {$ref: 'sidebar'}
            mainArea    : {$ref: 'mainArea'}

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
            router: {$ref: 'profilesRouter'}

    start: ->
        @profilesInstance.start()