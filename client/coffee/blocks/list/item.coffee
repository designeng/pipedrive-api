define [
    'marionette'
], (Marionette) ->

    # TODO: in common case we shoul define default template
    class ListItemTemplateView extends Marionette.ItemView
        tagName: "li"