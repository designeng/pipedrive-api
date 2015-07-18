define [
    'marionette'
    'hbs!blocks/mainArea/template'
], (Marionette, mainAreaTemplate) ->

    class MainArea extends Marionette.LayoutView

        template: mainAreaTemplate

        showView: (view) ->
            console.debug "------MainArea", view