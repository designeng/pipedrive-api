define [
    'marionette'
    'hbs!application/profiles/templates/navigation'
], (Marionette, navigationTemplate) ->
    
    class Navigation extends Marionette.LayoutView

        template: navigationTemplate

        showNavigation: (view) ->