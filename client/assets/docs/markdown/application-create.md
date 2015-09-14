# Marionette Application

Creating Marionette.Application instanse is very simple: plugin `plugins/marionette/application` provides the factory `createApplication`:

```
define
    $plugins: [
        'plugins/marionette/application'
    ]

    appInstance:
        createApplication:
            withRegions:
                navigationRegion    : ".navigation"
                sidebarRegion       : ".sidebar"
                mainAreaRegion      : ".main-area"
            onStart: ->
                Backbone.history.start()
        addController: {$ref: 'appController'}
```

`createApplication` factory has two options: in object `withRegions` listed available regions. `onStart` function will be ivoked immediately as `app.start()` will be called somewhere in the code.

Note, that we pointed to object `{$ref: 'appController'}` - it will be extended with property `regions`, borrowed from Marionette.Application instanse.