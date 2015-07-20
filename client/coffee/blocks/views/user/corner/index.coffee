define [
    'backbone'
    'marionette'
    'api'
    'utils/request/index'
    'hbs!application/profiles/templates/userCorner'
], (Backbone, Marionette, api, AjaxRequest, userCornerTemplate) ->

    class UserCornerModel extends Backbone.Model
        url: api.getUserCornerUrl()

        parse: (resp) ->
            obj = 
                name                : resp.data.name
                userPicUrl          : resp.data.icon_url
                companyId           : resp.additional_data.company_id
            return obj

    class UserCornerView extends Marionette.ItemView
        tagName: "div"
        className: "user-corner"

        template: userCornerTemplate

        initialize: ->
            @$el.hide()
            @model = new UserCornerModel()
            @model.fetch()

            @model.on "sync", (model) =>
                new AjaxRequest(api.getOrganizationUrl(), {}, "GET").done (res) =>
                    model.set "organizationName", res.data.name
                    @render()
                    @$el.show()