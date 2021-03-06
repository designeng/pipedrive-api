define
    $plugins: [
        # 'wire/debug'
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
        showInRegions:
            'boardHeaderRegion'     : {$ref: 'boardHeader'}
            'boardBodyRegion'       : {$ref: 'boardBody'}

    stagesCollection:
        create: 'application/modules/deals/board/collections/stages'
        ready:
            fetch: {}

    boardGroups:
        applyTo:
            collection: {$ref: 'dealsCollection'}
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
            childView       : {$ref: 'boardBodyColumn'}
            boardGroups     : {$ref: 'boardGroups'}
            collection      : {$ref: 'stagesCollection'}
            childViewOptions: (model, index) ->
                collection: _.find(@boardGroups, {id: "" + model.get("id")})?.collection

    boardBodyColumn:
        module: 'blocks/views/board/body/column'

    # @returns Object {id: ... , collection: Backbone.Collection}
    mapper:
        module: 'utils/groups/mapper'

    activateById: (id) ->
        @boardBody.activateById id