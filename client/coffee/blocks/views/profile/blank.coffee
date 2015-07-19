define [
    'marionette'
    'hbs!application/profiles/templates/blankProfile'
], (Marionette, blankProfileTemplate) ->

    class ProfileView extends Marionette.ItemView
        template: blankProfileTemplate