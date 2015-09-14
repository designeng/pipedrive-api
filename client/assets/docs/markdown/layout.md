# Marionette.LayoutView

Also, it's very simple to create instance of Marionette.LayoutView with factory `createLayout` directly in specification:

```
define
    $plugins: [
        'plugins/hbs'
        'plugins/marionette/layout'
    ]

    layout:
        createLayout:
            fromTemplate: {$ref: 'hbs!templates/navigation'}
            withRegions:
                userCornerRegion: ".user-corner"
        renderIn: {$ref: 'navigationRegion'}
        showInRegions:
            'userCornerRegion': {$ref: 'userCorner'}
```

The template for layout was taken by `hbs!` [resolver](#/docs/resolver).

To render layout instance immediately use `renderIn` facet.

All nested views can be rendered with `showInRegions` facet.