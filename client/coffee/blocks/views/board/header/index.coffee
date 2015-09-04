define [
    'backbone'
    'marionette'
    'hbs!templates/boardHeader'
], (Backbone, Marionette, boardHeader) ->

    class BoardHeaderView extends Marionette.CollectionView
        
        template: boardHeader

        initialize: ->
            console.debug "BoardHeaderView......"