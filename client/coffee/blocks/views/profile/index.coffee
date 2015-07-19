define [
    'marionette'
    'hbs!application/profiles/templates/profileDetails'
], (Marionette, profileDetailsTemplate) ->

    class ProfileView extends Marionette.ItemView
        tagName: "div"

        template: profileDetailsTemplate