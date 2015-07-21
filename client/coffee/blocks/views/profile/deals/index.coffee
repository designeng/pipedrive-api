define [
    'backbone'
    'marionette'
    'api'
    'hbs!templates/deals'
    'hbs!templates/oneDeal'
], (Backbone, Marionette, api, dealsTemplate, oneDealTemplate) ->

    class PersonDealsCollection extends Backbone.Collection
        initialize: (options) ->
            @url = api.getPersonDealsUrl(options?.personId)

        # provide only opened deals
        parse: (resp) ->
            deals = _.filter resp.data, (deal) ->
                return deal.status == "open"
            return deals

    class PersonDealView extends Marionette.ItemView
        tagName: "li"
        template: oneDealTemplate

    class PersonDealsView extends Marionette.CompositeView
        tagName: "table"
        childViewContainer: "tbody"

        template: dealsTemplate

        childView: PersonDealView

        initialize: (options) ->
            @collection = new PersonDealsCollection({personId: options.personId})
            @collection.fetch()