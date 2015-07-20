define [
    'backbone'
    'marionette'
    'api'
    'hbs!application/profiles/templates/deals'
    'hbs!application/profiles/templates/oneDeal'
], (Backbone, Marionette, api, dealsTemplate, oneDealTemplate) ->

    class PersonDealsCollection extends Backbone.Collection
        initialize: (options) ->
            @url = api.getPersonDealsUrl(options?.personId)

        parse: (resp) ->
            return resp.data

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