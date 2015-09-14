# Wire.js resolvers

This plugin is wire.js wrapper for requirejs `hbs!` plugin:

```
define ->
    return (options) ->
        hbsResolver = (resolver, name, refObj, wire) ->
            require ["hbs!" + name], (result) ->
                resolver.resolve result

        return pluginInstance = 
            resolvers:
                hbs: hbsResolver
```

The next code presents `jquery` wrapper:
```
define [
    "jquery"
], ($) ->

    return (options) ->

        elementResolver = (resolver, name, refObj, wire) ->
            resolver.resolve $(name)

        return pluginInstance = 
            resolvers:
                element: elementResolver
```

Usage in spec:
```
define
    $plugins: [
        'plugins/hbs'
        'plugins/element'
    ]

    someTemplate: {$ref: 'hbs!path-to-template'}

    someJqueryElement: {$ref: 'element!.class-name'}
```