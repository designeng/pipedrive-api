define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
        'plugins/backbone/collection/underscore/apply'
    ]

    boardLayout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/boardLayout'}
            withRegions:
                'boardHeaderRegion'   : ".board-header"
                'boardBodyRegion'     : ".board-body"
        renderIn: {$ref: 'dealsBoardRegion'}
        showInRegions:
            'boardHeaderRegion'     : {$ref: 'boardHeader'}

    stagesCollection:
        create: 'application/modules/deals/board/collections/stages'
        ready:
            fetch: {}

    boardHeader:
        create: 'blocks/views/board/header/index'
        properties:
            collection      : {$ref: 'stagesCollection'}
            childTemplate   : {$ref: 'hbs!templates/boardHeaderCell' }

    boardBody:
        create: 'blocks/views/board/body/index'

    boardGroups:
        applyTo:
            collection: {$ref: 'collection'}
            methods: [
                "groupBy": ["stage_id"]
            ]

    boardController:
        create: 'application/modules/deals/board/controller'
        properties:
            boardLayout         : {$ref: 'boardLayout'}
            boardHeader         : {$ref: 'boardHeader'}
            groups              : {$ref: 'boardGroups'}
            stagesCollection    : {$ref: 'stagesCollection'}
        ready:
            onReady: {}