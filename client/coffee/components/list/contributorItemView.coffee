define [
    "jquery"
    "underscore"
    "marionette"
    "hbs!components/list/contributor"
], ($, _, Marionette, contributorTemplate) ->

    ContributorItemView = Marionette.ItemView.extend
        tagName: "div"
        className: "accordion-section"
        template: contributorTemplate

        templateHelpers:
            avatar50x50: ->
                @.author.avatar_url + "&s=50"

            additions: ->
                return _.reduce @.weeks, (result, obj) ->
                    return result + obj.a
                , 0

            deletions: ->
                return _.reduce @.weeks, (result, obj) ->
                    return result + obj.d
                , 0

        behaviors:
            accordion: {}

        onBeforeRender: ->
            author = @.model.get "author"
            @.model.set "avatar150x150", author.avatar_url + "&s=150"

        getEntityType: ->
            return "contributor"

        getEntityId: ->
            author = @.model.get "author"
            return author.login