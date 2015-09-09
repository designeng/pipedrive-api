define
    $plugins: [
        'wire/debug'
        'wire/aop'
        'plugins/hbs'
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
            radio               : {$ref: '_radio'}
        after:
            'showDealDetailes'  : 'activateById'
        ready:
            onReady: {}

    dealsBoard:
        wire:
            spec: 'application/modules/deals/board/spec'
            provide:
                collection          : {$ref: 'dealsCollection'}
                dealsBoardRegion    : {$ref: 'dealsBoardRegion'}

    showList: ->
        @dealsController.showList()

    showDetailes: (id) ->
        @dealsController.showDealDetailes id