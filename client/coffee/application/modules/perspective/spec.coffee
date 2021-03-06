# A perspective is a visual container for a set of views.
define
    $plugins: [
        # 'wire/debug'
    ]

    publicApi:
        literal:
            showInRegion        : {$ref: 'controller.showInRegion'}

    controller:
        create: 'application/modules/perspective/controller'
        properties:
            sidebarRegion       : {$ref: 'sidebarRegion'}
            mainAreaRegion      : {$ref: 'mainAreaRegion'}
        ready:
            onReady: {$ref: 'sandbox.channel'}