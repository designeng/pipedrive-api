define [
    'marionette'
    'hbs!templates/preloader'
], (Marionette, preloader) ->

    class PreloaderView extends Marionette.ItemView
        template: preloader