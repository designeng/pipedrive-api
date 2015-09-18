define [
    "jquery"
    "wire/lib/context"
    "wire/lib/WireContext"
    "wire/lib/scope"
    "wire/lib/plugin/registry"
    "wire/lib/plugin/defaultPlugins"
    "wire/lib/graph/DirectedGraph"
    "wire/lib/graph/trackInflightRefs"
    "wire/lib/Map"
    "wire/lib/ComponentFactory"
    "wire/lib/lifecycle"
    "wire/lib/resolver"
    "wire/lib/graph/cyclesTracker"
    "wire/lib/instantiate"
    "wire/lib/plugin/wirePlugin"
    "wire/lib/plugin/basePlugin"
    "wire/lib/graph/tarjan"
    "wire/lib/graph/formatCycles"
    "wire/lib/ObjectProxy"
    "wire/lib/invoker"
    "wire/lib/pipeline"
], ($) ->
    # TODO: grunt concat task (not working now for deploy)
    # livereload: only for development, no error on deploy
    noop = ->
    try
        $('#livereload').html("<script src='http://" + "localhost" + ":35729/livereload.js?snipver=1' />")
    catch err
        noop()