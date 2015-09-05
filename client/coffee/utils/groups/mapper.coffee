define [
    "backbone"
], (Backbone) ->
    (item, index) -> 
        return {
            id: index
            collection: new Backbone.Collection(item)
        }