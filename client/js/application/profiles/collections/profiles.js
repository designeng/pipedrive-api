define(["backbone", "api"], function(Backbone, api) {
  var ProfileModel, ProfilesCollection;
  ProfileModel = Backbone.Model.extend({});
  return ProfilesCollection = Backbone.Collection.extend({
    url: api.getProfilesCollectionUrl(),
    model: ProfileModel
  });
});
