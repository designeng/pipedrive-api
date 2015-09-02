define
    $plugins: [
        # 'wire/debug'
        'plugins/channel'
        'plugins/marionette/router'
        'plugins/marionette/module'
    ]

    appController:
        create: "application/appController"

    routerController:
        create: "application/routerController"

    router:
        createRouter:
            controller: {$ref: 'routerController'}
            routes:
                'profiles'      : 'showProfilesList'
                'profiles/:id'  : 'showProfileDetailes'
        onRoute: {$ref: 'appController.onRoute'}

    profilesChannel:
        createChannel:
            name: 'profiles'
        channelEvents:
            'profiles:list:show'    : {$ref: 'profiles.showProfilesList'}
            'profiles:person:show'  : {$ref: 'profiles.showProfileDetailes'}

    navigation:
        wire:
            spec: "application/modules/navigation/spec"

    profiles:
        wire:
            spec: "application/modules/profiles/spec"

    deals:
        wire:
            spec: "application/modules/deals/spec"
