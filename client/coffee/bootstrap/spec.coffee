define
    $plugins: [
        # 'wire/debug'
    ]

    marionetteHooks:
        module: "bootstrap/hooks"

    preloader:
        module: "blocks/views/preloader/index"

    notFoundPage: {$ref: "element!.not-found"}