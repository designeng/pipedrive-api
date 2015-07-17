define [
    "backbone"
], (Backbone) ->

    Fork = Backbone.Model.extend({})

    ForksCollection = Backbone.Collection.extend
        url: "https://api.github.com/repos/marionettejs/backbone.marionette/forks"
        model: Fork

        comparator: (model) ->
            date = new Date(model.get "created_at")
            return -date.getTime()