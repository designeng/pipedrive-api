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
            'boardBodyRegion'       : {$ref: 'boardBody'}

    stagesCollection:
        create: 'application/modules/deals/board/collections/stages'
        ready:
            fetch: {}

    boardGroups:
        applyTo:
            collection: {$ref: 'collection'}
            methods: [
                {"groupBy": "stage_id"}
                {"map": {$ref: 'mapper'}}
            ]

    boardHeader:
        create: 'blocks/views/board/header/index'
        properties:
            collection      : {$ref: 'stagesCollection'}
            childTemplate   : {$ref: 'hbs!templates/boardHeaderCell' }

    boardBody:
        create: 'blocks/views/board/body/index'
        properties:
            childView       : {$ref: 'stageColumn'}
            boardGroups     : {$ref: 'boardGroups'}
            collection      : {$ref: 'stagesCollection'}
            childViewOptions: (model, index) ->
                collection: _.find(@boardGroups, {id: "" + model.get("id")})?.collection

    stageColumn:
        module: 'blocks/views/board/body/column'

    stageColumnList:
        module: 'blocks/views/list/index'

    boardController:
        create: 'application/modules/deals/board/controller'
        properties:
            boardBody           : {$ref: 'boardBody'}
            StageColumnList     : {$ref: 'stageColumnList'}
            groups              : {$ref: 'boardGroups'}
            stagesCollection    : {$ref: 'stagesCollection'}
        ready:
            onReady: {}

    # @returns Object {id: ... , collection: Backbone.Collection}
    mapper:
        module: 'utils/groups/mapper'