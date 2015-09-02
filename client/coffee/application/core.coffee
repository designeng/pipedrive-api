define
    $plugins: [
        # 'wire/debug'
        'plugins/radio/channel'
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
            'list:show'    : {$ref: 'profiles.showProfilesList'}
            'person:show'  : {$ref: 'profiles.showProfileDetailes'}

    dealsChannel:
        createChannel:
            name: 'deals'
        channelEvents:
            'list:show'             : {$ref: 'deals.showDealsList'}

    navigation:
        wire:
            spec: "application/modules/navigation/spec"

    profiles:
        wire:
            spec: "application/modules/profiles/spec"

    deals:
        wire:
            spec: "application/modules/deals/spec"
