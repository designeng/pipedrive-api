define
    $plugins: [
        'wire/debug'
        'wire/aop'
        'plugins/hbs'
    ]

    sandbox:
        createSandbox:
            api:    [
                "showList"      : {$ref: 'dealsController.showList'}
                "showDetailes"  : {$ref: 'dealsController.showDealDetailes'}
            ]

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
            collection          : {$ref: 'dealsCollection'}
            list                : {$ref: 'dealsList'}
            listRegion          : {$ref: 'listRegion'}
            dealsBoard          : {$ref: 'dealsBoard'}
        after:
            'showDealDetailes'  : 'activateById'

    dealsBoard:
        wire:
            spec: 'application/modules/deals/board/spec'
            provide:
                dealsCollection     : {$ref: 'dealsCollection'}
                dealsBoardRegion    : {$ref: 'dealsBoardRegion'}

    # showList: ->
    #     @dealsController.showList()

    # showDetailes: (id) ->
    #     @dealsController.showDealDetailes id