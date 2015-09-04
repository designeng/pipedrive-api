define [
    'marionette'
], (Marionette) ->

    class ListItemView extends Marionette.ItemView
        tagName: "li"
        className: "list-item"

        templateHelpers:
            organizationName: ->
                @organization?.name || @org_name