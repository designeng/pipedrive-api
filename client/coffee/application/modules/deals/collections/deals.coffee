define [
    "backbone"
    "api"
], (Backbone, api) ->

    class DealsModel extends Backbone.Model

    class DealsCollection extends Backbone.Collection
        url: api.getDealsCollectionUrl()
        model: DealsModel

        parse: (resp) ->
            resp.data = _.map resp.data, (item) ->
                organization = _.find resp.related_objects.organization, {id: item.id}
                item.organization = organization if organization
                return item
            return resp.data