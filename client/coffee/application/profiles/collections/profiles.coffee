define [
    "backbone"
    "api"
], (Backbone, api) ->

    class ProfileModel extends Backbone.Model

    class ProfilesCollection extends Backbone.Collection
        url: api.getProfilesCollectionUrl()
        model: ProfileModel

        parse: (resp, options) ->
            resp.data = _.map resp.data, (item) ->
                organization = _.find resp.related_objects.organization, {id: item.id}
                item.organization = organization if organization
                return item
            return resp.data