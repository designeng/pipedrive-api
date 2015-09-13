define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
    ]

    publicApi:
        literal:
            createList        : {$ref: 'dealsController.createList'}
            createDetails     : {$ref: 'dealsController.createDetails'}

    dealsCollection:
        create: 'application/modules/deals/collections/deals'
        ready:
            fetch: {}

    dealsList:
        create: 'blocks/views/list/index'
        properties:
            collection          : {$ref: 'dealsCollection'}
            entity              : "deal"
            childTemplate       : {$ref: 'hbs!templates/dealsListItem' }
            activeCellClass     : "active-deal"

    dealsController:
        create: 'application/modules/deals/controller'
        properties:
            list                : {$ref: 'dealsList'}
            dealsBoard          : {$ref: 'dealsBoard'}
            sandbox             : {$ref: 'sandbox'}

    dealsBoard:
        wire:
            spec: 'application/modules/deals/board/spec'
            provide:
                dealsCollection     : {$ref: 'dealsCollection'}