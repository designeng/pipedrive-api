define
    $plugins: [
        'wire/debug'
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
        ready:
            setChildTemplate: {$ref: 'hbs!templates/dealsListItem' }

    dealsController:
        create: 'application/modules/deals/controller'
        properties:
            collection          : {$ref: 'dealsCollection'}
            list                : {$ref: 'dealsList'}
            listRegion          : {$ref: 'listRegion'}
        ready:
            onReady: {}

    activateById: (id) ->
        @dealsController.activateById id

    showList: ->
        @dealsController.showList()

    showDetailes: (id) ->