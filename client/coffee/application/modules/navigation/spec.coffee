define
    $plugins: [
        'wire/debug'
    ]

    layout:
        create: 'blocks/views/navigation/index'

    getLayout: ->
        console.debug "getLayout", @layout
        return @layout