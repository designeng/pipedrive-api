define [
    'backbone'
    'marionette'
    'api'
    'utils/currency/converter'
    'hbs!templates/deals'
    'hbs!templates/oneDeal'
    'hbs!templates/dealEmpty'
], (Backbone, Marionette, api, convertCurrency, dealsTemplate, oneDealTemplate, dealEmptyTemplate) ->

    class PersonDealsCollection extends Backbone.Collection
        initialize: (options) ->
            @url = api.getPersonDealsUrl(options?.personId)

        # provide only opened deals
        parse: (resp) ->
            deals = _.filter resp.data, (deal) ->
                return deal.status == "open"
            return deals

    class PersonDealView extends Marionette.ItemView
        tagName: "tr"
        template: oneDealTemplate
        
        templateHelpers:
            convertedValue: ->
                convertCurrency @formatted_value if @formatted_value

    class PersonDealEmptyView extends Marionette.ItemView
        tagName: "tr"
        template: dealEmptyTemplate

    class PersonDealsView extends Marionette.CompositeView
        tagName: "table"
        className: "deals-list-wrapper"
        childViewContainer: "tbody"

        template: dealsTemplate

        childView: PersonDealView
        emptyView: PersonDealEmptyView

        ui:
            preloader: ".deals-preloader"

        initialize: (options) ->
            @collection = new PersonDealsCollection({personId: options.personId})
            @collection.fetch()

            @collection.on "sync", =>
                @ui.preloader.remove()