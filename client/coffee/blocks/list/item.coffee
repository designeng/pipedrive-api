define [
    'marionette'
    'hbs!application/profiles/templates/profilesListItem'
], (Marionette, listItemTemplate) ->

    class ListItemTemplateView extends Marionette.ItemView
        tagName: "li"
        # template: listItemTemplate