define [
    'marionette'
], (Marionette) ->

    # TODO: in common case we should define default template
    class ListItemTemplateView extends Marionette.ItemView
        tagName: "li"