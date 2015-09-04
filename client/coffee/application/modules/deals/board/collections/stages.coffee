define [
    "backbone"
    "api"
], (Backbone, api) ->

    class StagesModel extends Backbone.Model

    class StagesCollection extends Backbone.Collection
        url: api.getStagesCollectionUrl()
        model: StagesModel

        parse: (resp) ->
            console.debug "STAGES RESP", resp
            return resp.data