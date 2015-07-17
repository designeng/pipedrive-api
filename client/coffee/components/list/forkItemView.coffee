define [
    "marionette"
    "moment"
    "hbs!components/list/fork"
], (Marionette, moment, forkTemplate) ->

    ForkItemView = Marionette.ItemView.extend
        tagName: "div"
        className: "accordion-section"
        template: forkTemplate

        templateHelpers:
            forkedBy: ->
                @.full_name.split("/")[0]

            originalForkName: ->
                @.full_name.split("/")[1]

            createdAt: ->
                moment(@.created_at).format("DD/MM/YYYY hh:mm:ss")

            updatedAt: ->
                moment(@.updated_at).format("DD/MM/YYYY hh:mm:ss")

        behaviors:
            accordion: {}

        getEntityType: ->
            return "fork"

        getEntityId: ->
            return @.model.get "id"