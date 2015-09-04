define
    $plugins: [
        'wire/debug'
        'plugins/collection/transform'
    ]

    board:
        create: 'blocks/views/board/index'

    boardCollectionGroups:
        transform:
            collection: {$ref: 'collection'}
            groupBy: "stage_id"

    boardController:
        create: 'application/modules/deals/board/controller'
        properties:
            groups: {$ref: 'boardCollectionGroups'}
        ready:
            onReady: {}