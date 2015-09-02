define
    $plugins: [
        # 'wire/debug'
        'plugins/hbs'
        'plugins/channel'
        'plugins/marionette/router'
        'plugins/marionette/module'
    ]

    navigation:
        create: 'blocks/views/navigation/index'

    userCorner:
        create: 'blocks/views/user/corner/index'

    profilesCollection:
        create: 'application/profiles/collections/profiles'
        ready:
            fetch: {}

    profilesList:
        create: 'blocks/views/list/index'
        properties:
            collection          : {$ref: 'profilesCollection'}
            channel             : {$ref: 'profilesChannel'}
            entity              : "profile"
        ready:
            setChildTemplate: {$ref: 'hbs!templates/profilesListItem' }

    personProfile:
        module: 'blocks/views/profile/index'

    personProfileDeals:
        module: 'blocks/views/profile/deals/index'

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
        onRoute: {$ref: 'profilesApplicationController.onRoute'}

    profilesApplicationController:
        create: 'application/profiles/controller'
        properties:
            profilesList                : {$ref: 'profilesList'}
            PersonProfile               : {$ref: 'personProfile'}
            PersonProfileDeals          : {$ref: 'personProfileDeals'}
            profilesCollection          : {$ref: 'profilesCollection'}
            BlankProfile                : {$ref: 'blankProfile'}
            profilesChannel             : {$ref: 'profilesChannel'}
        destroy:
            onDestroy: {}

    profilesApplication:
        createModule:
            withRegions:
                navigationRegion    : ".navigation"
                userCornerRegion    : ".user-profile-corner"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"
        showInRegion:
            'navigationRegion': {$ref: 'navigation'}
            'userCornerRegion': {$ref: 'userCorner'}
        addController: {$ref: 'profilesApplicationController'}

    start: ->
        @profilesApplication.start()