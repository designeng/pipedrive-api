define [
    'marionette'
    'hbs!templates/navigation'
], (Marionette, navigationTemplate) ->
    
    class Navigation extends Marionette.LayoutView

        template: navigationTemplate

        showNavigation: (view) ->