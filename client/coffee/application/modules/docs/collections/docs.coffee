define [
    "backbone"
], (Backbone) ->

    class DocModel extends Backbone.Model

    class DocsCollection extends Backbone.Collection
        url: '../assets/docs/index.json'
        model: DocModel

        parse: (resp) ->
            return resp.data