#Contexts

In wire.js we work with `specifications` and `contexts`. When specification is loaded we can deal with its resolved context.

<div class="scheme"><a href="https://www.lucidchart.com/publicSegments/view/5d99b817-25e4-417b-b8a3-fee49924c88d/image.png" target="blank"><img src="https://www.lucidchart.com/publicSegments/view/5d99b817-25e4-417b-b8a3-fee49924c88d/image.png" width="700" height="500"/><a>

Look at enter point of our single-page application:
```
require [
    "wire!bootstrap/spec,application/core"
], (applicationContext) ->
    applicationContext.start()
```
We loaded listed by comma specifications with `wire!` resolver. `bootstrap/spec` context was merged with `application/core` context. Now we can call defined in resulted `application context` method `start`.

Module contexts will be wired by `wire` factory.

```
    navigation:
        wire:
            spec: "application/modules/navigation/spec"
            defer: true
            provide:
                navigationRegion    : {$ref: 'appInstance.regions.navigationRegion'}

    perspective:
        wire:
            spec: "application/modules/perspective/spec"
            defer: true
            provide:
                sidebarRegion       : {$ref: 'appInstance.regions.sidebarRegion'}
                mainAreaRegion      : {$ref: 'appInstance.regions.mainAreaRegion'}

    profiles:
        wire:
            spec: "application/modules/profiles/spec"
            defer: true

    deals:
        wire:
            spec: "application/modules/deals/spec"
            defer: true

    docs:
        wire:
            spec: "application/modules/docs/spec"
            defer: true
```
Option `defer` by default is false, but when being defined as `true` it allows for child contexts not to be wired immediately.

To know more about this aspect [go to the full documentation for the wire factory](https://github.com/cujojs/wire/blob/master/docs/components.md#wire)