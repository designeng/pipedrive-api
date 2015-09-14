define
    $plugins: [
        # 'wire/debug'
        'plugins/hbs'
    ]

    publicApi:
        literal:
            createList          : {$ref: 'profilesController.createList'}
            createDetails       : {$ref: 'profilesController.createDetails'}

    profilesCollection:
        create: 'application/modules/profiles/collections/profiles'
        ready:
            fetch: {}

    profilesList:
        create: 'blocks/views/list/index'
        properties:
            collection          : {$ref: 'profilesCollection'}
            entity              : "profile"
            childTemplate       : {$ref: 'hbs!templates/profilesListItem' }

    personProfile:
        module: 'blocks/views/profile/index'

    blankProfile:
        module: 'blocks/views/profile/blank'

    personProfileDeals:
        module: 'blocks/views/profile/deals/index'

    profilesController:
        create: 'application/modules/profiles/controller'
        properties:
            sandbox             : {$ref: 'sandbox'}
            collection          : {$ref: 'profilesCollection'}
            list                : {$ref: 'profilesList'}
            PersonProfile       : {$ref: 'personProfile'}
            BlankProfile        : {$ref: 'blankProfile'}
            PersonProfileDeals  : {$ref: 'personProfileDeals'}
