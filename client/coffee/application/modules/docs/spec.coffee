define
    $plugins: [
        'wire/debug'
        'plugins/hbs'
        'plugins/marionette/layout'
    ]

    publicApi:
        literal:
            showList        : {$ref: 'controller.showList'}
            showDetailes    : {$ref: 'controller.showDetailes'}

    # collection documents titles
    docsCollection:
        create: 'application/modules/docs/collections/docs'
        ready:
            fetch: {}

    docsList:
        create: 'blocks/views/list/index'
        properties:
            collection          : {$ref: 'docsCollection'}
            entity              : "doc"
            childTemplate       : {$ref: 'hbs!templates/docsListItem' }
        renderIn: {$ref: 'listRegion'}

    markdownLayout:
        create: 'blocks/views/markdown/index'
        renderIn: {$ref: 'markdownRegion'}

    controller:
        create: 'application/modules/docs/controller'
        properties:
            collection          : {$ref: 'docsCollection'}
            list                : {$ref: 'docsList'}
            markdownLayout      : {$ref: 'markdownLayout'}