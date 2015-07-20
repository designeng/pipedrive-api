define [
    'backbone'
    'marionette'
    'api'
    'hbs!application/profiles/templates/userCorner'
], (Backbone, Marionette, api, userCornerTemplate) ->

    class UserCornerModel extends Backbone.Model
        url: api.getUserCornerUrl()

        parse: (resp) ->
            console.debug "resp", resp
            return resp.data


    class UserCornerView extends Marionette.ItemView
        tagName: "div"
        className: "user-corner"

        template: userCornerTemplate

        initialize: ->
            @model = new UserCornerModel()
            @model.fetch()

        onBeforeRender: ->
            console.debug "onBeforeRender"
            console.debug "@model", @model

        # templateHelpers:
        #     pphone: ->