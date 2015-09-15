#Container

In order to have ability to work with module, we should define `intercessors`.
Intercessors are listed in `registerIntercessors` facet and used to interact with module's sandbox in container's context.

`registerIntercessors` facet can be used with the key object where application logic is defined. In our case it's `appController`:

```
define
    $plugins: [
        ...
        'plugins/container/register'
    ]

    appController:
        create: "application/appController"
        properties:
            navigation          : {$ref: 'navigation'}
            perspective         : {$ref: 'perspective'}
            profiles            : {$ref: 'profiles'}
            ...
        registerIntercessors: ['startModule', 'createEntityList', 'createEntityDetails']
```

Intercessor method has the next signature:
```
doSomething = (sandbox, args) ->
    #sandbox is injected by container 
```

Here's the example of intercessor call in application controller class:
```
someRouteHandler: ->
    @createEntityList "profiles"
```

Some misunderstanding can be caused by the fact that we call intercessor with `{String}`, but realy it will be invoked with `{Object}` in first argument. When intercessor method is invoked, the appropriate module is started: module's context resolved and registered in container. Moreover, modules context is augmented with `sandbox` object.

<div class="scheme"><a href="https://www.lucidchart.com/publicSegments/view/ad72fe85-195b-4cf4-bb5a-9d4612c7dba4/image.png" target="blank"><img src="https://www.lucidchart.com/publicSegments/view/ad72fe85-195b-4cf4-bb5a-9d4612c7dba4/image.png" width="550" height="500"/><a>