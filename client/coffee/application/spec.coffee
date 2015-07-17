define
    $plugins: [
        'wire/debug'
    ]

    navigation:
        create: "blocks/navigation/index"

    sidebar:
        create: "blocks/sidebar/index"

    mainArea:
        create: "blocks/mainArea/index"

    router:
        create: "application/router"

    # in Marionette we are not restricted with creating Marionette.Application instances,
    # they can be treated as different modules. Here in our test app we need only one app instance.
    profilesApplicationInstance:
        create: 
            module: "application/instance"
        properties:
            router: {$ref: 'router'}

    start: ->
        @profilesApplicationInstance.start()