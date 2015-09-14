# Application Router

As the result of wiring next spec will be context with property `router` (instance of Marionette.AppRouter):

```
define
    $plugins: [
        'plugins/marionette/router'
    ]

    router:
        createRouter:
            controller: {$ref: 'appController'}
            routes:
                'profiles'      : 'profilesModuleHandler'
                .....
                'deals'         : 'dealsModuleHandler'
                .....
                '*notFound'     : 'notFoundHandler'
        onRoute: {$ref: 'appController.onRoute'}
```

`createRouter` factory has two options: `controller` (where route handlers presented) and `routes` (= appRoutes in Marionette.AppRouter options).

Code above is identical to the next:

```
router = new Marionette.AppRouter({
    controller: appController
    appRoutes:
        'profiles'      : 'profilesModuleHandler'
        'deals'         : 'dealsModuleHandler'
        ...etc
    onRoute: appController.onRoute
})
```