define
    $plugins: [
        # 'wire/debug'
    ]

    marionetteHooks:
        create: "bootstrap/hooks"

    container:
        create: "bootstrap/container"

    notFoundPage: {$ref: "element!.not-found"}