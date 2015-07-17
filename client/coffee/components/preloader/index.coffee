define [
    "marionette"
    "hbs!components/preloader/preloader"
], (Marionette, preloaderTemplate) ->

    PreloaderView = Marionette.ItemView.extend
        template: preloaderTemplate

        hide: ->
            @.$el.hide()

        show: ->
            @.$el.show()

    return new PreloaderView()