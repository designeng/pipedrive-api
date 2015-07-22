define [
    'underscore'
    'backbone'
    'marionette'
    'api'
    'utils/request/index'
    'hbs!templates/userCorner'
], (_, Backbone, Marionette, api, AjaxRequest, userCornerTemplate) ->

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
        className: "user-profile-corner"

        template: userCornerTemplate

        initialize: ->
            @$el.hide()
            @model = new UserCornerModel()
            @model.fetch()

            @model.on "sync", (model) =>
                new AjaxRequest(api.getOrganizationsUrl(), {}, "GET").done (organizations) =>
                    organizationObject = _.find organizations.data, {company_id: model.get('companyId')}
                    model.set "organizationName", organizationObject.name if organizationObject
                    @render()
                    @$el.show()