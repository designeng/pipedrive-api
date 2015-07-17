define [
    "backbone"
], (Backbone) ->

    Contributor = Backbone.Model.extend({})

    ContributorsCollection = Backbone.Collection.extend
        url: "https://api.github.com/repos/marionettejs/backbone.marionette/stats/contributors"
        model: Contributor

        comparator: (model) ->
            return -model.get("total")

        modelId: (attrs) ->
            return attrs.author.login