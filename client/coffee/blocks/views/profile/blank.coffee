define [
    'marionette'
    'hbs!templates/blankProfile'
], (Marionette, blankProfileTemplate) ->

    class ProfileView extends Marionette.ItemView
        template: blankProfileTemplate