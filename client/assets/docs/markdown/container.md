#Container

Container is most important part of the application, because it provides mechanism for interaction with modules.

<div class="scheme"><a href="https://www.lucidchart.com/publicSegments/view/ad72fe85-195b-4cf4-bb5a-9d4612c7dba4/image.png" target="blank"><img src="https://www.lucidchart.com/publicSegments/view/ad72fe85-195b-4cf4-bb5a-9d4612c7dba4/image.png" width="550" height="500"/><a>

#Intercessors

In order to have ability to interact with module API out of the application controller, we should define `intercessors`.
Intercessors are listed in `registerIntercessors` facet and used to interact with module's sandbox in container's context.

Shortly, intercessors are registered in application container functions for starting module one way or another.

`registerIntercessors` facet can be applied to the key object where application logic is defined. In our case it's `appController`:

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

For each module a separate sandbox will be created.

If module provides public API, it should be declared in module spec:
```
publicApi:
    literal:
        createList          : {$ref: 'profilesController.createList'}
        createDetails       : {$ref: 'profilesController.createDetails'}
```

#Notifying core

To notify application core about something interesting, module can use property `channel` of the injected sandbox:

```
@sandbox.channel.request "list:ready", "deals", @list
```

#Broadcasting events

Application controller can listen to modules events using `container.channel` and broadcast them further to other modules:
```
listenToModules: ->
    @container.channel.on "list:ready", (module, list) =>
        @container.broadcastEvent "list:ready", list

    @container.channel.on "details:ready", (module, details) =>
        @container.broadcastEvent "details:ready", details
```

#Starting and stopping modules

If module will be started automaticaly at the intercessor invocation, to stop module we should use method `container.stopModule`:

```
@container.stopModule "profile"
```