define [
    'marionette'
], (Marionette) ->

    class ListItemTemplateView extends Marionette.ItemView
        tagName: "li"
        className: "list-item"

        templateHelpers:
            organizationName: ->
                @organization?.name